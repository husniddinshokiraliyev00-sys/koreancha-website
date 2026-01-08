-- Users table (extends auth.users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Gamification
  xp integer default 0,
  level integer default 1,
  streak_current integer default 0,
  streak_longest integer default 0,
  last_active_date date,
  
  -- Subscription
  subscription_tier text default 'free' check (subscription_tier in ('free', 'premium')),
  subscription_expires_at timestamp with time zone,
  
  constraint profiles_subscription_check check ((subscription_tier = 'free') or (subscription_expires_at is not null))
);

-- Activity logging
create table public.activity_log (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles not null,
  activity_type text not null check (activity_type in ('flashcard_review', 'quiz_complete', 'daily_login', 'streak_save', 'listening_exercise', 'listening_correct', 'reading_exercise', 'reading_correct')),
  metadata jsonb default '{}',
  xp_earned integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User stats (for fast queries)
create table public.user_stats (
  user_id uuid references public.profiles not null primary key,
  flashcards_reviewed integer default 0,
  quizzes_completed integer default 0,
  total_xp integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Badges/achievements
create table public.badges (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  description text,
  icon text,
  xp_reward integer default 0,
  condition_type text not null check (condition_type in ('streak', 'xp', 'flashcards_total', 'unit_mastered')),
  condition_value integer not null
);

create table public.user_badges (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles not null,
  badge_id uuid references public.badges not null,
  earned_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, badge_id)
);

-- Daily usage limits for free tier
create table public.daily_usage (
  user_id uuid references public.profiles not null primary key,
  date date default current_date not null,
  flashcards_reviewed integer default 0,
  quizzes_taken integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, date)
);

-- RLS policies
alter table public.profiles enable row level security;
alter table public.activity_log enable row level security;
alter table public.user_stats enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;
alter table public.daily_usage enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Public leaderboard access" on public.profiles for select using (true);

create policy "Users can view own activity" on public.activity_log for select using (auth.uid() = user_id);
create policy "Users can insert own activity" on public.activity_log for insert with check (auth.uid() = user_id);

create policy "Users can view own stats" on public.user_stats for select using (auth.uid() = user_id);
create policy "Users can update own stats" on public.user_stats for update using (auth.uid() = user_id);
create policy "Users can insert own stats" on public.user_stats for insert with check (auth.uid() = user_id);

create policy "Everyone can view badges" on public.badges for select using (true);
create policy "Users can view own badges" on public.user_badges for select using (auth.uid() = user_id);
create policy "Users can insert own badges" on public.user_badges for insert with check (auth.uid() = user_id);

create policy "Users can view own daily usage" on public.daily_usage for select using (auth.uid() = user_id);
create policy "Users can update own daily usage" on public.daily_usage for update using (auth.uid() = user_id);
create policy "Users can insert own daily usage" on public.daily_usage for insert with check (auth.uid() = user_id);

-- Functions for XP and streaks
create or replace function calculate_level(xp_input integer)
returns integer as $$
begin
  return floor(1 + (xp_input / 100)::integer);
end;
$$ language plpgsql immutable;

create or replace function check_and_update_streak(user_uuid uuid)
returns void as $$
declare
  last_active date;
  today date := current_date;
begin
  select last_active_date into last_active from public.profiles where id = user_uuid;
  
  if last_active is null or last_active < today - interval '1 day' then
    -- Streak broken
    update public.profiles 
    set streak_current = 0, last_active_date = today 
    where id = user_uuid;
  elsif last_active = today - interval '1 day' then
    -- Streak continues
    update public.profiles 
    set streak_current = streak_current + 1,
        streak_longest = greatest(streak_longest, streak_current + 1),
        last_active_date = today
    where id = user_uuid;
  elsif last_active < today then
    -- Same day or first time today
    update public.profiles 
    set last_active_date = today
    where id = user_uuid;
  end if;
end;
$$ language plpgsql;

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  insert into public.user_stats (user_id, total_xp)
  values (new.id, 0);
  return new;
end;
$$ language plpgsql security definer;

create or replace function update_user_stats()
returns trigger as $$
begin
  update public.user_stats
  set total_xp = total_xp + new.xp_earned,
      flashcards_reviewed = flashcards_reviewed + case when new.activity_type = 'flashcard_review' then 1 else 0 end,
      quizzes_completed = quizzes_completed + case when new.activity_type = 'quiz_complete' then 1 else 0 end,
      updated_at = now()
  where user_id = new.user_id;
  
  -- Update profile XP and level
  update public.profiles
  set xp = xp + new.xp_earned,
      level = calculate_level(xp + new.xp_earned),
      updated_at = now()
  where id = new.user_id;
  
  -- Update streak if this is a learning activity
  if new.activity_type in ('flashcard_review', 'quiz_complete') then
    perform check_and_update_streak(new.user_id);
  end if;
  
  return new;
end;
$$ language plpgsql;

create or replace function increment_daily_usage(p_user_id uuid, p_date date, p_field text)
returns void as $$
begin
  insert into public.daily_usage (user_id, date, flashcards_reviewed, quizzes_taken)
  values (p_user_id, p_date, 
    case when p_field = 'flashcards_reviewed' then 1 else 0 end,
    case when p_field = 'quizzes_taken' then 1 else 0 end
  )
  on conflict (user_id, date) do update set
    flashcards_reviewed = case when p_field = 'flashcards_reviewed' 
      then daily_usage.flashcards_reviewed + 1 
      else daily_usage.flashcards_reviewed 
    end,
    quizzes_taken = case when p_field = 'quizzes_taken' 
      then daily_usage.quizzes_taken + 1 
      else daily_usage.quizzes_taken 
    end,
    updated_at = now();
end;
$$ language plpgsql;

-- Triggers
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  insert into public.user_stats (user_id, total_xp)
  values (new.id, 0);
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create or replace function update_user_stats()
returns trigger as $$
begin
  insert into public.user_stats (user_id, flashcards_reviewed, quizzes_completed, total_xp)
  values (
    new.user_id,
    case when new.activity_type = 'flashcard_review' then 1 else 0 end,
    case when new.activity_type = 'quiz_complete' then 1 else 0 end,
    new.xp_earned
  )
  on conflict (user_id) do update set
    flashcards_reviewed = user_stats.flashcards_reviewed + excluded.flashcards_reviewed,
    quizzes_completed = user_stats.quizzes_completed + excluded.quizzes_completed,
    total_xp = user_stats.total_xp + excluded.total_xp,
    updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_stats_on_activity
  after insert on public.activity_log
  for each row execute procedure update_user_stats();

-- Function to increment daily usage
create or replace function increment_daily_usage(p_user_id uuid, p_date date, p_field text)
returns void as $$
begin
  insert into public.daily_usage (user_id, date, flashcards_reviewed, quizzes_taken)
  values (p_user_id, p_date, 
    case when p_field = 'flashcards_reviewed' then 1 else 0 end,
    case when p_field = 'quizzes_taken' then 1 else 0 end
  )
  on conflict (user_id, date) do update set
    flashcards_reviewed = case when p_field = 'flashcards_reviewed' 
      then daily_usage.flashcards_reviewed + 1 
      else daily_usage.flashcards_reviewed 
    end,
    quizzes_taken = case when p_field = 'quizzes_taken' 
      then daily_usage.quizzes_taken + 1 
      else daily_usage.quizzes_taken 
    end,
    updated_at = now();
end;
$$ language plpgsql;

-- Initial badges
insert into public.badges (slug, name, description, icon, xp_reward, condition_type, condition_value) values
('streak_bronze', 'Bronze Streak', 'Complete a 3-day streak', '🥉', 10, 'streak', 3),
('streak_silver', 'Silver Streak', 'Maintain a 7-day streak', '🥈', 25, 'streak', 7),
('streak_gold', 'Gold Streak', 'Keep a 14-day streak', '🥇', 50, 'streak', 14),
('streak_platinum', 'Platinum Streak', 'Achieve a 30-day streak', '💎', 150, 'streak', 30),
('streak_legend', 'Legendary Streak', 'Reach a 100-day streak', '👑', 500, 'streak', 100),
('xp_bronze', 'XP Bronze', 'Earn your first 50 XP', '🥉', 5, 'xp', 50),
('xp_silver', 'XP Silver', 'Accumulate 200 XP', '🥈', 20, 'xp', 200),
('xp_gold', 'XP Gold', 'Reach 500 XP', '🥇', 50, 'xp', 500),
('xp_platinum', 'XP Platinum', 'Achieve 1000 XP', '💎', 100, 'xp', 1000),
('xp_legend', 'XP Legend', 'Master 5000 XP', '👑', 500, 'xp', 5000),
('vocab_bronze', 'Vocabulary Bronze', 'Review 50 flashcards', '🥉', 10, 'flashcards_total', 50),
('vocab_silver', 'Vocabulary Silver', 'Review 200 flashcards', '🥈', 30, 'flashcards_total', 200),
('vocab_gold', 'Vocabulary Gold', 'Review 500 flashcards', '🥇', 75, 'flashcards_total', 500),
('vocab_platinum', 'Vocabulary Platinum', 'Review 1000 flashcards', '💎', 150, 'flashcards_total', 1000),
('vocab_legend', 'Vocabulary Legend', 'Review 3000 flashcards', '👑', 500, 'flashcards_total', 3000),
('unit_1a_master', 'Book 1A Master', 'Master all cards in Book 1A', '📘', 50, 'unit_mastered', 1),
('unit_1b_master', 'Book 1B Master', 'Master all cards in Book 1B', '📘', 50, 'unit_mastered', 2),
('unit_2a_master', 'Book 2A Master', 'Master all cards in Book 2A', '📗', 75, 'unit_mastered', 3),
('unit_2b_master', 'Book 2B Master', 'Master all cards in Book 2B', '📗', 75, 'unit_mastered', 4),
('unit_3a_master', 'Book 3A Master', 'Master all cards in Book 3A', '📙', 100, 'unit_mastered', 5),
('unit_3b_master', 'Book 3B Master', 'Master all cards in Book 3B', '📙', 100, 'unit_mastered', 6),
('unit_4a_master', 'Book 4A Master', 'Master all cards in Book 4A', '📕', 150, 'unit_mastered', 7),
('unit_4b_master', 'Book 4B Master', 'Master all cards in Book 4B', '📕', 150, 'unit_mastered', 8);
