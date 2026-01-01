'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useLanguage, type Lang, useUser } from '../providers';

type DashboardTranslations = {
  welcome: string;
  title: string;
  overallStats: string;
  totalCardsStudied: string;
  masteryRate: string;
  currentStreak: string;
  topikLevel: string;
  masteryByUnit: string;
  recentActivity: string;
  noActivity: string;
  daysAgo: string;
  today: string;
  yesterday: string;
  premium: string;
  free: string;
  logout: string;
  upgrade: string;
  activities: string;
  unlimited: string;
  limitedPerDay: string;
  limitedAccess: string;
  flashcardProgress: string;
  flashcardDesc: string;
  continue: string;
  noFlashcardProgress: string;
  guestMode: string;
  loginRequired: string;
  signIn: string;
};

const dashboardTranslations: Record<Lang, DashboardTranslations> = {
  uz: {
    welcome: 'Xush kelibsiz',
    title: 'Progress Dashboard',
    overallStats: 'Umumiy statistika',
    totalCardsStudied: 'Jami o\'rganilgan kartalar',
    masteryRate: 'Ustalik darajasi',
    currentStreak: 'Joriy seriya',
    topikLevel: 'TOPIK darajasi',
    masteryByUnit: 'Bo\'limlar bo\'yicha ustalik',
    recentActivity: 'So\'nggi faoliyat',
    noActivity: 'Faoliyat yo\'q',
    daysAgo: 'kun oldin',
    today: 'Bugun',
    yesterday: 'Kecha',
    premium: 'Premium',
    free: 'Bepul',
    logout: 'Chiqish',
    upgrade: 'Yangilash',
    activities: 'Faoliyatlar',
    unlimited: 'Cheksiz',
    limitedPerDay: 'Kuniga cheklangan',
    limitedAccess: 'Cheklangan kirish',
    flashcardProgress: 'Flashcard progress',
    flashcardDesc: 'Continue learning where you left off',
    continue: 'Davom eting',
    noFlashcardProgress: 'No flashcard progress yet',
    guestMode: 'Mehmon rejimi',
    loginRequired: 'To\'liq statistika uchun tizimga kiring',
    signIn: 'Kirish'
  },
  ru: {
    welcome: 'Добро пожаловать',
    title: 'Панель прогресса',
    overallStats: 'Общая статистика',
    totalCardsStudied: 'Всего изучено карточек',
    masteryRate: 'Уровень владения',
    currentStreak: 'Текущая серия',
    topikLevel: 'Уровень TOPIK',
    masteryByUnit: 'Владение по юнитам',
    recentActivity: 'Последняя активность',
    noActivity: 'Нет активности',
    daysAgo: 'дней назад',
    today: 'Сегодня',
    yesterday: 'Вчера',
    premium: 'Премиум',
    free: 'Бесплатный',
    logout: 'Выйти',
    upgrade: 'Обновить',
    activities: 'Активности',
    unlimited: 'Безлимитный',
    limitedPerDay: 'Ограничено в день',
    limitedAccess: 'Ограниченный доступ',
    flashcardProgress: 'Прогресс карточек',
    flashcardDesc: 'Продолжайте обучение с того места, где остановились',
    continue: 'Продолжить',
    noFlashcardProgress: 'Прогресса по карточкам пока нет',
    guestMode: 'Гостевой режим',
    loginRequired: 'Войдите для полной статистики',
    signIn: 'Войти'
  },
  en: {
    welcome: 'Welcome',
    title: 'Progress Dashboard',
    overallStats: 'Overall Statistics',
    totalCardsStudied: 'Total Cards Studied',
    masteryRate: 'Mastery Rate',
    currentStreak: 'Current Streak',
    topikLevel: 'TOPIK Level',
    masteryByUnit: 'Mastery by Unit',
    recentActivity: 'Recent Activity',
    noActivity: 'No activity',
    daysAgo: 'days ago',
    today: 'Today',
    yesterday: 'Yesterday',
    premium: 'Premium',
    free: 'Free',
    logout: 'Logout',
    upgrade: 'Upgrade',
    activities: 'Activities',
    unlimited: 'Unlimited',
    limitedPerDay: 'Limited per day',
    limitedAccess: 'Limited access',
    flashcardProgress: 'Flashcard progress',
    flashcardDesc: 'Continue learning where you left off',
    continue: 'Continue',
    noFlashcardProgress: 'No flashcard progress yet',
    guestMode: 'Guest Mode',
    loginRequired: 'Sign in for full statistics',
    signIn: 'Sign In'
  }
};

type FlashcardsProgressV1 = {
  version: 1;
  units: Record<
    string,
    {
      masteredIndices: number[];
      lastIndex: number;
      totalCards: number;
      updatedAt: string;
    }
  >;
};

const FLASHCARDS_PROGRESS_KEY = 'koreancha_flashcards_progress_v1';

export default function DashboardPage() {
  const { lang } = useLanguage();
  const { user, profile, stats, loading, isPremium, getDisplayName } = useUser();
  const router = useRouter();

  const t = dashboardTranslations[lang];

  const [flashcardsProgress, setFlashcardsProgress] = useState<FlashcardsProgressV1 | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FLASHCARDS_PROGRESS_KEY);
      if (!raw) {
        setFlashcardsProgress(null);
        return;
      }
      const parsed = JSON.parse(raw) as FlashcardsProgressV1;
      if (!parsed || parsed.version !== 1 || !parsed.units) {
        setFlashcardsProgress(null);
        return;
      }
      setFlashcardsProgress(parsed);
    } catch {
      setFlashcardsProgress(null);
    }
  }, []);

  const flashcardsUnits = useMemo(() => {
    if (!flashcardsProgress?.units) return [];

    return Object.entries(flashcardsProgress.units)
      .map(([unit, u]) => {
        const total = typeof u.totalCards === 'number' ? u.totalCards : 0;
        const masteredCount = Array.isArray(u.masteredIndices) ? u.masteredIndices.length : 0;
        const updatedAt = typeof u.updatedAt === 'string' ? u.updatedAt : '';
        return { unit, total, masteredCount, updatedAt };
      })
      .filter((u) => u.total > 0)
      .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
  }, [flashcardsProgress]);

  const mostRecentFlashcardsUnit = flashcardsUnits[0] || null;

  // Guest mode handling
  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.guestMode}</h1>
            <p className="text-gray-600 mb-8">{t.loginRequired}</p>
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              {t.signIn}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-700 font-semibold">Loading...</div>
      </main>
    );
  }

  const displayName = getDisplayName();
  const plan = isPremium ? 'premium' : 'free';

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-white/80">{t.welcome}</div>
            <div className="text-xl font-bold">{displayName}</div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                plan === 'premium'
                  ? 'bg-yellow-400/10 border-yellow-400/40 text-yellow-200'
                  : 'bg-white/10 border-white/20 text-white'
              }`}
            >
              {plan === 'premium' ? t.premium : t.free}
            </div>

            <Link
              href="/login"
              onClick={() => {
                // Handle logout logic here
                router.replace('/login');
              }}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              {t.logout}
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Streak Widget */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-800">🔥 {t.currentStreak}</div>
                <div className="text-xs text-gray-600 mt-1">Daily learning</div>
              </div>
              <div className="text-xl font-bold text-orange-600">{profile?.streak_current || 0}</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Longest: {profile?.streak_longest || 0} days
            </div>
          </div>

          {/* XP Widget */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-800">⭐ XP</div>
                <div className="text-xs text-gray-600 mt-1">Experience</div>
              </div>
              <div className="text-xl font-bold text-purple-600">{profile?.xp || 0}</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Level {profile?.level || 1}
            </div>
          </div>

          {/* Stats Widget */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-800">📊 {t.totalCardsStudied}</div>
                <div className="text-xs text-gray-600 mt-1">Progress</div>
              </div>
              <div className="text-xl font-bold text-blue-600">{stats?.flashcards_reviewed || 0}</div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Flashcards reviewed
            </div>
          </div>
        </div>

        {/* Flashcards Progress */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <div className="text-sm font-semibold text-gray-800">{t.flashcardProgress}</div>
              <div className="mt-1 text-sm text-gray-600">{t.flashcardDesc}</div>
            </div>

            {mostRecentFlashcardsUnit && (
              <Link
                href={`/flashcards?unit=${encodeURIComponent(mostRecentFlashcardsUnit.unit)}`}
                className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-xl font-bold transition"
              >
                {t.continue}
              </Link>
            )}
          </div>

          {flashcardsUnits.length === 0 ? (
            <div className="text-sm text-gray-700">{t.noFlashcardProgress}</div>
          ) : (
            <div className="space-y-3">
              {flashcardsUnits.slice(0, 3).map(({ unit, total, masteredCount, updatedAt }) => {
                const percentage = total > 0 ? Math.round((masteredCount / total) * 100) : 0;
                return (
                  <div key={unit} className="flex items-center justify-between gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-gray-900">{unit}</span>
                        <span className="text-xs text-gray-500">{masteredCount}/{total}</span>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{percentage}%</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Enhanced Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Mastery Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.masteryByUnit}</h3>
            {flashcardsUnits.length > 0 ? (
              <div className="h-64">
                <div className="relative h-full flex items-end justify-between gap-2 px-2">
                  {flashcardsUnits.slice(0, 6).map(({ unit, masteredCount, total }, index) => {
                    const masteredHeight = total > 0 ? (masteredCount / total) * 100 : 0;
                    const remainingHeight = 100 - masteredHeight;
                    
                    return (
                      <div key={unit} className="flex-1 flex flex-col items-center justify-end">
                        <div className="text-xs text-gray-600 mb-1 text-center">
                          {masteredCount}/{total}
                        </div>
                        <div className="w-full flex flex-col-reverse" style={{ height: '200px' }}>
                          <div 
                            className="w-full bg-blue-500 rounded-t"
                            style={{ height: `${masteredHeight * 2}px` }}
                            title={`Mastered: ${masteredCount}`}
                          />
                          <div 
                            className="w-full bg-gray-200 rounded-b"
                            style={{ height: `${remainingHeight * 2}px` }}
                            title={`Remaining: ${total - masteredCount}`}
                          />
                        </div>
                        <div className="text-xs text-gray-700 mt-1 text-center font-medium">
                          {unit}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-center gap-6 mt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-gray-600">Mastered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-200 rounded"></div>
                    <span className="text-gray-600">Remaining</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                {t.noActivity}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.recentActivity}</h3>
            <div className="space-y-3">
              {flashcardsUnits.slice(0, 5).map(({ unit, masteredCount, updatedAt }) => {
                const date = new Date(updatedAt);
                const now = new Date();
                const daysDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
                
                let timeAgo = t.today;
                if (daysDiff === 1) timeAgo = t.yesterday;
                else if (daysDiff > 1) timeAgo = `${daysDiff} ${t.daysAgo}`;
                
                return (
                  <div key={unit} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{unit}</div>
                      <div className="text-sm text-gray-600">{masteredCount} cards mastered</div>
                    </div>
                    <div className="text-xs text-gray-500">{timeAgo}</div>
                  </div>
                );
              })}
              {flashcardsUnits.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  {t.noActivity}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TOPIK Level */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl border border-gray-100 shadow-sm p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">{t.topikLevel}</h3>
              <div className="text-3xl font-bold">
                {profile?.level && profile.level >= 10 ? 'TOPIK II' : 'TOPIK I'}
              </div>
              <div className="text-sm opacity-80 mt-1">
                Based on your XP and progress
              </div>
            </div>
            <div className="text-6xl opacity-20">
              🎯
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link
            href="/exercises"
            className="text-blue-600 hover:text-blue-700 font-medium transition"
          >
            ← {t.activities}
          </Link>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium transition"
          >
            {t.home}
          </Link>
        </div>
      </div>
    </main>
  );
}
