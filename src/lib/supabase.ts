import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          updated_at: string;
          xp: number;
          level: number;
          streak_current: number;
          streak_longest: number;
          last_active_date: string | null;
          subscription_tier: 'free' | 'premium';
          subscription_expires_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      activity_log: {
        Row: {
          id: string;
          user_id: string;
          activity_type: 'flashcard_review' | 'quiz_complete' | 'daily_login' | 'streak_save';
          metadata: Record<string, any>;
          xp_earned: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['activity_log']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['activity_log']['Insert']>;
      };
      user_stats: {
        Row: {
          user_id: string;
          flashcards_reviewed: number;
          quizzes_completed: number;
          total_xp: number;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_stats']['Row'], 'user_id' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['user_stats']['Insert']>;
      };
      badges: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          icon: string | null;
          xp_reward: number;
          condition_type: 'streak' | 'xp' | 'flashcards_total' | 'unit_mastered';
          condition_value: number;
        };
        Insert: Omit<Database['public']['Tables']['badges']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['badges']['Insert']>;
      };
      user_badges: {
        Row: {
          id: string;
          user_id: string;
          badge_id: string;
          earned_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_badges']['Row'], 'id' | 'earned_at'>;
        Update: Partial<Database['public']['Tables']['user_badges']['Insert']>;
      };
      daily_usage: {
        Row: {
          user_id: string;
          date: string;
          flashcards_reviewed: number;
          quizzes_taken: number;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['daily_usage']['Row'], 'user_id' | 'date' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['daily_usage']['Insert']>;
      };
      flashcard_progress: {
        Row: {
          id: string;
          user_id: string;
          unit: string;
          card_index: number;
          mastered: boolean;
          again: boolean;
          last_reviewed: string;
          ease_factor: number;
          interval: number;
          repetitions: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['flashcard_progress']['Row'], 'id' | 'user_id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['flashcard_progress']['Insert']>;
      };
    };
  };
};
