'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createClient, type Session, type User } from '@supabase/supabase-js';
import { supabase, type Database } from '../lib/supabase';

export type Lang = 'uz' | 'ru' | 'en';

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type UserProfile = Database['public']['Tables']['profiles']['Row'];
type UserStats = Database['public']['Tables']['user_stats']['Row'];

type UserContextValue = {
  user: User | null;
  profile: UserProfile | null;
  stats: UserStats | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  logActivity: (type: Database['public']['Tables']['activity_log']['Row']['activity_type'], metadata?: Record<string, any>, xp?: number) => Promise<void>;
  isPremium: boolean;
  canAccessFeature: (feature: 'flashcards' | 'quiz') => boolean;
  saveFlashcardProgress: (unit: string, cardIndex: number, mastered: boolean, again: boolean) => Promise<void>;
  loadFlashcardProgress: (unit: string) => Promise<{ mastered: number[]; again: number[] }>;
  syncLocalProgress: (unit: string, localMastered: number[], localAgain: number[]) => Promise<void>;
  logout: () => Promise<void>;
  getDisplayName: () => string;
};

const UserContext = createContext<UserContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('uz');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('preferredLanguage') as Lang | null;
      if (savedLang === 'uz' || savedLang === 'ru' || savedLang === 'en') {
        setLangState(savedLang);
      }
    } catch {
      return;
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('preferredLanguage', lang);
    } catch {
      return;
    }
  }, [lang]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== 'preferredLanguage') return;
      const next = e.newValue as Lang | null;
      if (next === 'uz' || next === 'ru' || next === 'en') {
        setLangState(next);
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('preferredLanguage', lang);
    } catch {
      return;
    }
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => {
    return {
      lang,
      setLang: setLangState
    };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  const calculateLevel = (xp: number) => {
    const safe = Number.isFinite(xp) ? xp : 0;
    return Math.floor(1 + safe / 100);
  };

  const awardBadgesIfEligible = async (nextProfile: UserProfile | null, nextStats: UserStats | null) => {
    if (!user) return;
    if (!nextProfile) return;

    const { data: badgesData, error: badgesError } = await supabase
      .from('badges')
      .select('id, slug, name, description, icon, xp_reward, condition_type, condition_value');

    if (badgesError || !badgesData) return;

    const { data: userBadgesData, error: userBadgesError } = await supabase
      .from('user_badges')
      .select('badge_id')
      .eq('user_id', user.id);

    if (userBadgesError) return;

    const owned = new Set((userBadgesData || []).map((b) => b.badge_id));

    const reviewed = Number(nextStats?.flashcards_reviewed || 0);
    const xp = Number(nextProfile.xp || 0);
    const streak = Number(nextProfile.streak_current || 0);

    const toAward = badgesData.filter((b) => {
      if (owned.has(b.id)) return false;
      const v = Number(b.condition_value || 0);
      if (b.condition_type === 'xp') return xp >= v;
      if (b.condition_type === 'streak') return streak >= v;
      if (b.condition_type === 'flashcards_total') return reviewed >= v;
      return false;
    });

    if (toAward.length === 0) return;

    await supabase.from('user_badges').insert(
      toAward.map((b) => ({
        user_id: user.id,
        badge_id: b.id
      }))
    );

    const reward = toAward.reduce((sum, b) => sum + Number(b.xp_reward || 0), 0);
    if (reward > 0) {
      const nextXp = xp + reward;
      await supabase
        .from('profiles')
        .update({ xp: nextXp, level: calculateLevel(nextXp) })
        .eq('id', user.id);
    }
  };

  const refreshProfile = async () => {
    if (!user) return;
    
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (profileData) setProfile(profileData);

    const { data: statsData } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (statsData) setStats(statsData);

    try {
      await awardBadgesIfEligible(profileData, statsData);
    } catch {
      return;
    }
  };

  const logActivity = async (
    type: Database['public']['Tables']['activity_log']['Row']['activity_type'],
    metadata: Record<string, any> = {},
    xp: number = 0
  ) => {
    if (!user) return;

    let insertedType: Database['public']['Tables']['activity_log']['Row']['activity_type'] | null = null;

    const first = await supabase.from('activity_log').insert({
      user_id: user.id,
      activity_type: type,
      metadata,
      xp_earned: xp,
    });

    if (!first.error) {
      insertedType = type;
    } else {
      const isListeningOrReading =
        type === 'listening_exercise' ||
        type === 'listening_correct' ||
        type === 'reading_exercise' ||
        type === 'reading_correct';

      if (isListeningOrReading) {
        const fallbackMetadata = { ...metadata, subtype: type };
        const fallback = await supabase.from('activity_log').insert({
          user_id: user.id,
          activity_type: 'quiz_complete',
          metadata: fallbackMetadata,
          xp_earned: xp,
        });

        if (!fallback.error) {
          insertedType = 'quiz_complete';
        } else {
          return;
        }
      } else {
        return;
      }
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      const field =
        insertedType === 'flashcard_review'
          ? 'flashcards_reviewed'
          : insertedType === 'quiz_complete'
            ? 'quizzes_taken'
            : null;

      if (field) {
        await supabase.rpc('increment_daily_usage', {
          p_user_id: user.id,
          p_date: today,
          p_field: field,
        });
      }
    } catch {}

    await refreshProfile();
  };

  const isPremium = useMemo(() => {
    if (!profile) return false;
    return profile.subscription_tier === 'premium' && 
           (!profile.subscription_expires_at || new Date(profile.subscription_expires_at) > new Date());
  }, [profile]);

  const canAccessFeature = (feature: 'flashcards' | 'quiz') => {
    if (isPremium) return true;
    
    // Free tier limits (can be adjusted)
    const limits = {
      flashcards: 50, // per day
      quiz: 3, // per day
    };
    
    // For now, allow access - we'll enforce limits in components
    return true;
  };

  const saveFlashcardProgress = async (unit: string, cardIndex: number, mastered: boolean, again: boolean) => {
    if (!user) return;

    const { error } = await supabase.from('flashcard_progress').upsert({
      user_id: user.id,
      unit,
      card_index: cardIndex,
      mastered,
      again,
      last_reviewed: new Date().toISOString(),
    });

    if (error) {
      console.error('Error saving flashcard progress:', error);
    }
  };

  const loadFlashcardProgress = async (unit: string) => {
    if (!user) return { mastered: [], again: [] };

    const { data, error } = await supabase
      .from('flashcard_progress')
      .select('card_index, mastered, again')
      .eq('user_id', user.id)
      .eq('unit', unit);

    if (error) {
      console.error('Error loading flashcard progress:', error);
      return { mastered: [], again: [] };
    }

    const mastered = data?.filter(item => item.mastered).map(item => item.card_index) || [];
    const again = data?.filter(item => item.again).map(item => item.card_index) || [];

    return { mastered, again };
  };

  const syncLocalProgress = async (unit: string, localMastered: number[], localAgain: number[]) => {
    if (!user) return;

    // Save all local progress to backend
    const progressData = [
      ...localMastered.map(index => ({ unit, card_index: index, mastered: true, again: false })),
      ...localAgain.map(index => ({ unit, card_index: index, mastered: false, again: true }))
    ];

    const { error } = await supabase.from('flashcard_progress').upsert(
      progressData.map(item => ({
        user_id: user.id,
        unit: item.unit,
        card_index: item.card_index,
        mastered: item.mastered,
        again: item.again,
        last_reviewed: new Date().toISOString(),
      }))
    );

    if (error) {
      console.error('Error syncing local progress:', error);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      refreshProfile();
    } else {
      setProfile(null);
      setStats(null);
    }
  }, [user]);

  const logout = async () => {
    console.log('Logout called');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
    // Clear local state immediately for better UX
    console.log('Clearing local state');
    setUser(null);
    setProfile(null);
    setStats(null);
  };

  const getDisplayName = () => {
    if (profile?.full_name) return profile.full_name;
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    if (user?.email) return user.email;
    return 'User';
  };

  const value = useMemo<UserContextValue>(() => ({
    user,
    profile,
    stats,
    loading,
    refreshProfile,
    logActivity,
    isPremium,
    canAccessFeature,
    saveFlashcardProgress,
    loadFlashcardProgress,
    syncLocalProgress,
    logout,
    getDisplayName,
  }), [user, profile, stats, loading, refreshProfile, logActivity, isPremium, canAccessFeature, saveFlashcardProgress, loadFlashcardProgress, syncLocalProgress, logout, getDisplayName]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used within UserProvider');
  }
  return ctx;
}

export function useSupabase() {
  return supabase;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <UserProvider>{children}</UserProvider>
    </LanguageProvider>
  );
}
