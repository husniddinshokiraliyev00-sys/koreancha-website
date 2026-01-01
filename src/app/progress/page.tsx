'use client';

import { useEffect, useMemo, useState, Suspense } from 'react';
import Link from 'next/link';

import { useLanguage, useUser } from '../providers';
import { translations } from '../../lib/translations';

function ProgressPageContent() {
  const { lang } = useLanguage();
  const { user, profile, getDisplayName } = useUser();
  const t = translations[lang];

  if (!user) {
    return (
      <main className="min-h-screen bg-[#0b0f1a] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-8 pt-6 pb-28">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">{t.login} Required</h1>
            <p className="text-white/70 mb-8">Please login to view your progress</p>
            <Link href="/login" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
              {t.login}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const progressData = useMemo(() => {
    // Mock progress data - in real app this would come from your backend
    return {
      flashcards: {
        totalCards: 500,
        masteredCards: 120,
        reviewCards: 30,
        newCards: 350,
        accuracy: 85
      },
      listening: {
        totalExercises: 40,
        completedExercises: 15,
        accuracy: 78
      },
      reading: {
        totalExercises: 40,
        completedExercises: 12,
        accuracy: 82
      },
      overall: {
        studyDays: 15,
        totalXP: 450,
        currentStreak: 5,
        longestStreak: 8
      }
    };
  }, []);

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
              <p className="text-white/70">Level {Math.floor((progressData.overall.totalXP || 0) / 100)} • {progressData.overall.totalXP} XP</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-400">{progressData.overall.currentStreak}</div>
              <div className="text-sm text-white/70">Day Streak</div>
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
                <span className="text-white/70">Mastered</span>
                <span className="font-bold">{progressData.flashcards.masteredCards}/{progressData.flashcards.totalCards}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(progressData.flashcards.masteredCards / progressData.flashcards.totalCards) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Accuracy</span>
                <span>{progressData.flashcards.accuracy}%</span>
              </div>
            </div>
          </div>

          {/* Listening Progress */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">{t.listening}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">Completed</span>
                <span className="font-bold">{progressData.listening.completedExercises}/{progressData.listening.totalExercises}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${(progressData.listening.completedExercises / progressData.listening.totalExercises) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Accuracy</span>
                <span>{progressData.listening.accuracy}%</span>
              </div>
            </div>
          </div>

          {/* Reading Progress */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">{t.reading}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">Completed</span>
                <span className="font-bold">{progressData.reading.completedExercises}/{progressData.reading.totalExercises}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${(progressData.reading.completedExercises / progressData.reading.totalExercises) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Accuracy</span>
                <span>{progressData.reading.accuracy}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Overall Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{progressData.overall.studyDays}</div>
              <div className="text-sm text-white/70">Study Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{progressData.overall.totalXP}</div>
              <div className="text-sm text-white/70">Total XP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{progressData.overall.currentStreak}</div>
              <div className="text-sm text-white/70">Current Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{progressData.overall.longestStreak}</div>
              <div className="text-sm text-white/70">Longest Streak</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/flashcards" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            Continue {t.flashcards}
          </Link>
          <Link href="/listening" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            Practice {t.listening}
          </Link>
          <Link href="/reading" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            Practice {t.reading}
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
