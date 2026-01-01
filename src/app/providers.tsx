'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createClient, type Session, type User } from '@supabase/supabase-js';
import { supabase, type Database } from '../lib/supabase';

export type Lang = 'uz' | 'en' | 'ko' | 'ru';

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
};

const UserContext = createContext<UserContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('uz');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('preferredLanguage') as Lang | null;
      if (savedLang === 'uz' || savedLang === 'en' || savedLang === 'ko' || savedLang === 'ru') {
        setLangState(savedLang);
      }
    } catch {
      return;
    }
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== 'preferredLanguage') return;
      const next = e.newValue as Lang | null;
      if (next === 'uz' || next === 'en' || next === 'ko' || next === 'ru') {
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
  };

  const logActivity = async (
    type: Database['public']['Tables']['activity_log']['Row']['activity_type'],
    metadata: Record<string, any> = {},
    xp: number = 0
  ) => {
    if (!user) return;

    const { error } = await supabase.from('activity_log').insert({
      user_id: user.id,
      activity_type: type,
      metadata,
      xp_earned: xp,
    });

    if (!error) {
      await refreshProfile();
    }
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
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
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
  }), [user, profile, stats, loading, isPremium]);

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
