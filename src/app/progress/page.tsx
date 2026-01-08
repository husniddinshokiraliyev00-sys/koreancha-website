'use client';

import { useEffect, useMemo, useState, Suspense } from 'react';
import Link from 'next/link';

import { useLanguage, useUser } from '../providers';
import { translations } from '../../lib/translations';
import { supabase } from '../../lib/supabase';
import flashcardsData from '../../data/flashcardsData.json';

function ProgressPageContent() {
  const { lang } = useLanguage();
  const { user, profile, getDisplayName } = useUser();
  const t = translations[lang];

  const [flashcardCounts, setFlashcardCounts] = useState<{ total: number; mastered: number; again: number } | null>(null);
  const [listeningCounts, setListeningCounts] = useState<{ completed: number } | null>(null);
  const [readingCounts, setReadingCounts] = useState<{ completed: number } | null>(null);
  const [badges, setBadges] = useState<Array<{ id: string; slug: string; name: string; description: string | null; icon: string | null; xp_reward: number }> | null>(null);
  const [earnedBadgeIds, setEarnedBadgeIds] = useState<Set<string>>(new Set());
  const [dailyUsage, setDailyUsage] = useState<{ flashcards_reviewed: number; quizzes_taken: number } | null>(null);
  const [studyDays, setStudyDays] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<Array<{ id: string; xp: number; level: number; full_name: string | null }> | null>(null);

  if (!user) {
    return (
      <main className="min-h-screen bg-[#0b0f1a] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-8 pt-6 pb-28">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">{t.loginRequired}</h1>
            <p className="text-white/70 mb-8">{t.pleaseLoginToViewProgress}</p>
            <Link href="/login" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
              {t.login}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const totals = useMemo(() => {
    const entries = flashcardsData as unknown as Array<{ book: string; unit: string; cards: unknown[] }>;
    const totalCards = entries.reduce((sum, e) => sum + (Array.isArray(e?.cards) ? e.cards.length : 0), 0);
    return { totalCards };
  }, []);

  useEffect(() => {
    const load = async () => {
      if (!user) return;

      try {
        const [{ count: masteredCount, error: masteredError }, { count: againCount, error: againError }] = await Promise.all([
          supabase
            .from('flashcard_progress')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('mastered', true),
          supabase
            .from('flashcard_progress')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('again', true)
        ]);

        setFlashcardCounts({
          total: totals.totalCards,
          mastered: masteredError ? 0 : masteredCount ?? 0,
          again: againError ? 0 : againCount ?? 0
        });
      } catch {
        setFlashcardCounts({ total: totals.totalCards, mastered: 0, again: 0 });
      }

      try {
        const [
          { count: listeningDirect, error: listeningDirectError },
          { count: readingDirect, error: readingDirectError },
          { count: listeningFallback, error: listeningFallbackError },
          { count: readingFallback, error: readingFallbackError }
        ] = await Promise.all([
          supabase
            .from('activity_log')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('activity_type', 'listening_correct'),
          supabase
            .from('activity_log')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('activity_type', 'reading_correct'),
          supabase
            .from('activity_log')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('activity_type', 'quiz_complete')
            .contains('metadata', { subtype: 'listening_correct' }),
          supabase
            .from('activity_log')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('activity_type', 'quiz_complete')
            .contains('metadata', { subtype: 'reading_correct' })
        ]);

        const listeningTotal =
          (listeningDirectError ? 0 : listeningDirect ?? 0) + (listeningFallbackError ? 0 : listeningFallback ?? 0);
        const readingTotal = (readingDirectError ? 0 : readingDirect ?? 0) + (readingFallbackError ? 0 : readingFallback ?? 0);

        setListeningCounts({ completed: listeningTotal });
        setReadingCounts({ completed: readingTotal });
      } catch {
        setListeningCounts({ completed: 0 });
        setReadingCounts({ completed: 0 });
      }

      try {
        const { data: badgesData, error: badgesError } = await supabase
          .from('badges')
          .select('id, slug, name, description, icon, xp_reward')
          .order('xp_reward', { ascending: false });
        setBadges(badgesError ? [] : ((badgesData as any[]) || []));
      } catch {
        setBadges([]);
      }

      try {
        const { data: userBadgesData, error: userBadgesError } = await supabase
          .from('user_badges')
          .select('badge_id')
          .eq('user_id', user.id);
        setEarnedBadgeIds(new Set(userBadgesError ? [] : ((userBadgesData as any[]) || []).map((b) => b.badge_id)));
      } catch {
        setEarnedBadgeIds(new Set());
      }

      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const dateKey = `${yyyy}-${mm}-${dd}`;

      try {
        const { data: dailyData, error: dailyError } = await supabase
          .from('daily_usage')
          .select('flashcards_reviewed, quizzes_taken')
          .eq('user_id', user.id)
          .eq('date', dateKey)
          .maybeSingle();

        if (dailyError) {
          setDailyUsage({ flashcards_reviewed: 0, quizzes_taken: 0 });
        } else {
          setDailyUsage(
            dailyData
              ? {
                  flashcards_reviewed: Number((dailyData as any).flashcards_reviewed || 0),
                  quizzes_taken: Number((dailyData as any).quizzes_taken || 0)
                }
              : { flashcards_reviewed: 0, quizzes_taken: 0 }
          );
        }
      } catch {
        setDailyUsage({ flashcards_reviewed: 0, quizzes_taken: 0 });
      }

      try {
        const { count: daysCount, error: daysError } = await supabase
          .from('daily_usage')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);
        setStudyDays(daysError ? 0 : daysCount ?? 0);
      } catch {
        setStudyDays(0);
      }

      try {
        const { data: lbData, error: lbError } = await supabase
          .from('profiles')
          .select('id, xp, level, full_name')
          .order('xp', { ascending: false })
          .limit(10);

        if (!lbError) setLeaderboard((lbData as any[]) || []);
        else setLeaderboard(null);
      } catch {
        setLeaderboard(null);
      }
    };

    load();
  }, [totals.totalCards, user]);

  const xp = Number(profile?.xp || 0);
  const level = Number(profile?.level || 1);
  const streakCurrent = Number(profile?.streak_current || 0);
  const streakLongest = Number(profile?.streak_longest || 0);
  const levelBase = (level - 1) * 100;
  const nextLevelXp = level * 100;
  const levelProgress = nextLevelXp > levelBase ? Math.min(100, Math.max(0, ((xp - levelBase) / (nextLevelXp - levelBase)) * 100)) : 0;

  const dailyGoalFlashcards = 30;
  const dailyGoalQuizzes = 3;

  return (
    <main className="min-h-screen bg-[#0b0f1a] text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-6 pb-28">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{t.progress}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm font-semibold text-white/70 hover:text-white transition">
              {t.dashboard}
            </Link>
            <Link href="/exercises" className="text-sm font-semibold text-white/70 hover:text-white transition">
              {t.exercises}
            </Link>
            <Link href="/" className="text-sm font-semibold text-white/70 hover:text-white transition">
              {t.home}
            </Link>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{getDisplayName()}</h2>
              <p className="text-white/70">{t.level} {level} • {t.totalXp}: {xp}</p>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-white/60 mb-2">
                  <span>{t.level} {level}</span>
                  <span>{xp}/{nextLevelXp}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${levelProgress}%` }} />
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-400">{streakCurrent}</div>
              <div className="text-sm text-white/70">{t.dayStreak}</div>
              <div className="mt-2 text-xs text-white/60">{t.longestStreak}: {streakLongest}</div>
            </div>
          </div>
        </div>

        {/* Progress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Flashcards Progress */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">{t.flashcards}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">{t.mastered}</span>
                <span className="font-bold">{flashcardCounts?.mastered ?? 0}/{flashcardCounts?.total ?? totals.totalCards}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${flashcardCounts && flashcardCounts.total > 0 ? (flashcardCounts.mastered / flashcardCounts.total) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">{t.again}</span>
                <span>{flashcardCounts?.again ?? 0}</span>
              </div>
            </div>
          </div>

          {/* Listening Progress */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">{t.listening}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">{t.completed}</span>
                <span className="font-bold">{listeningCounts?.completed ?? 0}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `100%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">{t.points}</span>
                <span>{(listeningCounts?.completed ?? 0) * 2}</span>
              </div>
            </div>
          </div>

          {/* Reading Progress */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">{t.reading}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">{t.completed}</span>
                <span className="font-bold">{readingCounts?.completed ?? 0}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `100%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">{t.points}</span>
                <span>{(readingCounts?.completed ?? 0) * 2}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">{t.dailyGoals}</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-white/70 mb-2">
                  <span>{t.flashcards}</span>
                  <span>{dailyUsage?.flashcards_reviewed ?? 0}/{dailyGoalFlashcards}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${Math.min(100, ((dailyUsage?.flashcards_reviewed ?? 0) / dailyGoalFlashcards) * 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-white/70 mb-2">
                  <span>{t.quizzesCompleted}</span>
                  <span>{dailyUsage?.quizzes_taken ?? 0}/{dailyGoalQuizzes}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${Math.min(100, ((dailyUsage?.quizzes_taken ?? 0) / dailyGoalQuizzes) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">{t.badges}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(badges || []).map((b) => {
                const earned = earnedBadgeIds.has(b.id);
                return (
                  <div key={b.id} className={`rounded-xl border p-3 ${earned ? 'border-green-500/30 bg-green-500/10' : 'border-white/10 bg-black/20'}`}>
                    <div className="flex items-center justify-between">
                      <div className="text-xl">{b.icon || '🏅'}</div>
                      <div className="text-xs text-white/60">+{b.xp_reward} XP</div>
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white">{b.name}</div>
                    <div className="mt-1 text-xs text-white/60">{earned ? t.completed : t.available}</div>
                  </div>
                );
              })}
              {(!badges || badges.length === 0) && <div className="text-sm text-white/60">{t.comingSoon}</div>}
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">{t.leaderboard}</h3>
          {leaderboard ? (
            <div className="space-y-2">
              {leaderboard.map((u, idx) => (
                <div key={u.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-4 py-2">
                  <div className="text-sm text-white/80">
                    <span className="text-white/50 mr-2">#{idx + 1}</span>
                    {u.full_name ? u.full_name : `User ${u.id.slice(0, 6)}`}
                  </div>
                  <div className="text-sm font-semibold text-white">{u.xp} XP</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-white/60">{t.comingSoon}</div>
          )}
        </div>

        {/* Overall Stats */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">{t.overallStatistics}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{studyDays}</div>
              <div className="text-sm text-white/70">{t.studyDays}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{xp}</div>
              <div className="text-sm text-white/70">{t.totalXp}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{streakCurrent}</div>
              <div className="text-sm text-white/70">{t.currentStreak}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{streakLongest}</div>
              <div className="text-sm text-white/70">{t.longestStreak}</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/flashcards" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            {t.continue} {t.flashcards}
          </Link>
          <Link href="/listening" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            {t.practice} {t.listening}
          </Link>
          <Link href="/reading" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            {t.practice} {t.reading}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ProgressPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#0b0f1a] text-white flex items-center justify-center">
        <div className="text-white">{translations.uz.loading}</div>
      </main>
    }>
      <ProgressPageContent />
    </Suspense>
  );
}
