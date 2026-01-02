'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useLanguage, useUser } from '../providers';
import { translations } from '../../lib/translations';
import LanguageSwitcher from '../../components/LanguageSwitcher';

export default function DashboardPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const { user, profile, stats, loading, isPremium, getDisplayName, logout } = useUser();

  const t = translations[lang];

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const quickStats = [
    {
      icon: '📚',
      label: t.flashcardsStudied,
      value: stats?.flashcards_reviewed || 0,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '🎯',
      label: t.quizzesCompleted,
      value: stats?.quizzes_completed || 0,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '⭐',
      label: t.totalXp,
      value: profile?.xp || 0,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: '🔥',
      label: t.currentStreak,
      value: profile?.streak_current || 0,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const recentActivity = [
    { type: 'flashcard_review' as const, unit: '1과', hoursAgo: 2, xp: 10 },
    { type: 'quiz_complete' as const, unit: '2과', hoursAgo: 5, xp: 25 },
    { type: 'flashcard_review' as const, unit: '1과', daysAgo: 1, xp: 8 },
  ];

  const upcomingUnits = [
    { unit: '3과', title: t.unitFamilyPeople, progress: 65 },
    { unit: '4과', title: t.unitFoodDrinks, progress: 30 },
    { unit: '5과', title: t.unitDailyLife, progress: 0 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">{t.loading}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KC</span>
              </div>
              <span className="text-white font-semibold text-lg">Koreancha.uz</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white/80 hover:text-white transition">
                {t.home}
              </Link>
              <Link href="/exercises" className="text-white/80 hover:text-white transition">
                {t.exercises}
              </Link>
              <Link href="/progress" className="text-white/80 hover:text-white transition">
                {t.progress}
              </Link>
              <Link href="/dashboard" className="text-white hover:text-white transition font-medium">
                {t.dashboard}
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              
              <button
                onClick={handleLogout}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                {t.logout}
              </button>

              {/* Mobile menu button */}
              <button className="md:hidden p-2 rounded-lg hover:bg-white/10 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {t.welcomeBack.replace('{name}', getDisplayName())}
          </h1>
          <p className="text-white/70 text-lg">
            {(isPremium ? t.premiumMember : t.freeMember)} • {t.level} {profile?.level || 1}
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">{t.recentActivity}</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-blue-400">📝</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {activity.type === 'flashcard_review' ? t.flashcardReview : t.quizComplete}
                        </div>
                        <div className="text-white/60 text-sm">
                          {activity.unit} • {typeof activity.hoursAgo === 'number'
                            ? t.timeHoursAgo.replace('{n}', String(activity.hoursAgo))
                            : t.timeDaysAgo.replace('{n}', String(activity.daysAgo ?? 0))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-medium">+{activity.xp} {t.xp}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Link href="/progress" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition">
                  <span className="text-sm font-medium">{t.viewAllActivity}</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Continue Learning */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{t.continueLearning}</h3>
              <div className="space-y-3">
                <Link href="/flashcards" className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition">
                  📚 {t.flashcards}
                </Link>
                <Link href="/listening" className="block w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition">
                  🎧 {t.listening}
                </Link>
                <Link href="/reading" className="block w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition">
                  📖 {t.reading}
                </Link>
              </div>
            </div>

            {/* Upcoming Units */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{t.upcomingUnits}</h3>
              <div className="space-y-3">
                {upcomingUnits.map((unit, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{unit.unit}</span>
                      <span className="text-white/60 text-sm">{unit.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                        style={{ width: `${unit.progress}%` }}
                      />
                    </div>
                    <div className="text-white/60 text-sm">{unit.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Banner (if not premium) */}
            {!isPremium && (
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{t.upgradeToPremium}</h3>
                <p className="text-white/80 text-sm mb-4">{t.upgradeSubtitle}</p>
                <Link href="/donate" className="block w-full bg-white text-purple-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition text-center">
                  {t.upgradeNow}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
