# Gamification System Deployment Guide

## Overview
Your Korean learning app now has a complete gamification system with:
- **XP & Levels**: Users earn XP from activities, level up every 100 XP
- **Streaks**: Daily activity tracking with current/longest streak
- **Badges**: Hierarchical achievement system (Bronze → Silver → Gold → Platinum → Legend)
- **Daily Goals**: Track flashcards reviewed and quizzes/exercises completed
- **Public Leaderboard**: Top 10 users by XP
- **Scaled XP Rewards**: Harder exercises (higher book levels) award more XP

## XP Rewards
- **Flashcards**: 10 XP for mastered, 1 XP for "again"
- **Listening/Reading**: Base 2 XP, scaled by book difficulty:
  - Books 1A/1B: 1x (2 XP)
  - Books 2A/2B: 1.5x (3 XP)
  - Books 3A/3B: 2.5x (5 XP)
  - Books 4A/4B: 4x (8 XP)

## Badge Tiers
### Streaks
- 🥉 Bronze: 3 days (10 XP)
- 🥈 Silver: 7 days (25 XP)
- 🥇 Gold: 14 days (50 XP)
- 💎 Platinum: 30 days (150 XP)
- 👑 Legend: 100 days (500 XP)

### XP Milestones
- 🥉 Bronze: 50 XP (5 XP reward)
- 🥈 Silver: 200 XP (20 XP)
- 🥇 Gold: 500 XP (50 XP)
- 💎 Platinum: 1000 XP (100 XP)
- 👑 Legend: 5000 XP (500 XP)

### Vocabulary (Flashcards Reviewed)
- 🥉 Bronze: 50 cards (10 XP)
- 🥈 Silver: 200 cards (30 XP)
- 🥇 Gold: 500 cards (75 XP)
- 💎 Platinum: 1000 cards (150 XP)
- 👑 Legend: 3000 cards (500 XP)

### Book Mastery
- 📘 Book 1A/1B Master: 50 XP each
- 📗 Book 2A/2B Master: 75 XP each
- 📙 Book 3A/3B Master: 100 XP each
- 📕 Book 4A/4B Master: 150 XP each

## Deployment Steps

### Option 1: Fresh Database (Recommended)
If you're setting up a new Supabase project or can reset your database:

1. Run the complete schema:
   ```bash
   psql -h your-project.supabase.co -U postgres -d postgres -f supabase/schema_clean.sql
   ```

### Option 2: Existing Database
If you already have users and data:

1. **Add missing columns to profiles** (if needed):
   ```sql
   ALTER TABLE public.profiles 
   ADD COLUMN IF NOT EXISTS xp integer DEFAULT 0,
   ADD COLUMN IF NOT EXISTS level integer DEFAULT 1,
   ADD COLUMN IF NOT EXISTS streak_current integer DEFAULT 0,
   ADD COLUMN IF NOT EXISTS streak_longest integer DEFAULT 0,
   ADD COLUMN IF NOT EXISTS last_active_date date;
   ```

2. **Update activity_log constraint**:
   ```sql
   ALTER TABLE public.activity_log 
   DROP CONSTRAINT IF EXISTS activity_log_activity_type_check;
   
   ALTER TABLE public.activity_log 
   ADD CONSTRAINT activity_log_activity_type_check 
   CHECK (activity_type IN (
     'flashcard_review', 
     'quiz_complete', 
     'daily_login', 
     'streak_save', 
     'listening_exercise', 
     'listening_correct', 
     'reading_exercise', 
     'reading_correct'
   ));
   ```

3. **Add public leaderboard policy**:
   ```bash
   psql -h your-project.supabase.co -U postgres -d postgres -f supabase/migration_public_leaderboard.sql
   ```

4. **Create missing tables** (if they don't exist):
   ```sql
   -- Run the CREATE TABLE statements from schema_clean.sql for:
   -- - badges
   -- - user_badges
   -- - daily_usage
   ```

5. **Seed badges**:
   ```sql
   -- Run the INSERT INTO badges statement from schema_clean.sql
   ```

### Verify Deployment

Check that these queries work:

```sql
-- Check profiles have gamification columns
SELECT id, xp, level, streak_current FROM profiles LIMIT 1;

-- Check badges exist
SELECT COUNT(*) FROM badges;

-- Check public leaderboard access works (run as anonymous user)
SELECT id, xp, level, full_name FROM profiles ORDER BY xp DESC LIMIT 10;

-- Check activity logging works
SELECT * FROM activity_log ORDER BY created_at DESC LIMIT 5;
```

## Frontend Features

### /progress Page
- Real-time XP, level, and streak display
- Level progress bar
- Flashcard mastery counts
- Listening/reading completion counts
- Badge showcase (earned vs available)
- Daily goals progress bars
- Top 10 leaderboard

### Activity Logging
- Automatic XP awarding on flashcard mastery
- Scaled XP for listening/reading based on book difficulty
- Daily usage tracking for free tier limits
- Streak calculation on daily activity
- Badge auto-awarding after profile refresh

## Troubleshooting

### Leaderboard shows "Coming soon"
- Check RLS policy: `SELECT * FROM pg_policies WHERE tablename = 'profiles';`
- Ensure "Public leaderboard access" policy exists
- Test with: `SELECT id, xp FROM profiles LIMIT 1;` (as anonymous)

### Badges not appearing
- Verify badges table has data: `SELECT COUNT(*) FROM badges;`
- Check RLS: `SELECT * FROM badges LIMIT 1;` (should work for everyone)
- Reseed if needed using INSERT statement from schema

### XP not updating
- Check activity_log inserts: `SELECT * FROM activity_log ORDER BY created_at DESC LIMIT 5;`
- Verify trigger exists: `SELECT * FROM pg_trigger WHERE tgname = 'update_stats_on_activity';`
- Check user_stats updates: `SELECT * FROM user_stats WHERE user_id = 'your-user-id';`

### Activity type errors
- If you see constraint violations, the app will automatically retry as 'quiz_complete'
- Update the constraint using the SQL in Option 2 above
- Check current constraint: `SELECT conname, pg_get_constraintdef(oid) FROM pg_constraint WHERE conname LIKE '%activity_type%';`

## Environment Variables

Ensure these are set in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Optional (for audio):
```
FORVO_API_KEY=your-forvo-key
```

## Next Steps

After deployment:
1. Test user registration and profile creation
2. Complete a few flashcards and verify XP awards
3. Check /progress page displays correctly
4. Verify leaderboard shows other users
5. Test badge awarding by reaching milestones
6. Monitor daily_usage for free tier limits

## Support

If you encounter issues:
1. Check Supabase logs in dashboard
2. Verify RLS policies are correct
3. Test queries directly in SQL editor
4. Ensure triggers are firing on activity_log inserts
