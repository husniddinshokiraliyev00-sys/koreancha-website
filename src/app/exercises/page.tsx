'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useLanguage, useUser } from '../providers';
import { translations } from '../../lib/translations';
import LanguageSwitcher from '../../components/LanguageSwitcher';

export default function ExercisesPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const { user, logout } = useUser();

  const t = translations[lang];

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const exercises = [
    {
      icon: '📚',
      title: t.flashcards,
      description: 'Interactive flashcards with smart SRS algorithm',
      href: '/flashcards',
      color: 'from-blue-500 to-blue-600',
      difficulty: 'All Levels',
      duration: '10-15 min'
    },
    {
      icon: '🎧',
      title: t.listening,
      description: 'Improve listening comprehension with audio exercises',
      href: '/listening',
      color: 'from-purple-500 to-purple-600',
      difficulty: 'Beginner to Advanced',
      duration: '15-20 min'
    },
    {
      icon: '📖',
      title: t.reading,
      description: 'Practice reading with real Korean texts',
      href: '/reading',
      color: 'from-green-500 to-green-600',
      difficulty: 'Beginner to Advanced',
      duration: '20-30 min'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KO</span>
              </div>
              <span className="text-white font-semibold text-lg">Koreancha.uz</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white/80 hover:text-white transition">
                {t.home}
              </Link>
              <Link href="/exercises" className="text-white hover:text-white transition">
                {t.exercises}
              </Link>
              <Link href="/progress" className="text-white/80 hover:text-white transition">
                {t.progress}
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              
              {user ? (
                <>
                  <Link href="/dashboard" className="hidden md:block text-white/80 hover:text-white transition">
                    {t.dashboard}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    {t.logout}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="hidden md:block text-white/80 hover:text-white transition">
                    {t.login}
                  </Link>
                  <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                    {t.signup}
                  </Link>
                </>
              )}

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

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.exercises}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Choose your learning activity and start practicing Korean with our interactive exercises
            </p>
          </div>

          {/* Exercise Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {exercises.map((exercise, index) => (
              <Link
                key={index}
                href={exercise.href}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className={`h-32 bg-gradient-to-r ${exercise.color} flex items-center justify-center`}>
                  <span className="text-5xl">{exercise.icon}</span>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-white/60 bg-white/10 px-2 py-1 rounded">
                      {exercise.difficulty}
                    </span>
                    <span className="text-xs text-white/60">
                      {exercise.duration}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3">{exercise.title}</h3>
                  <p className="text-white/60 mb-6">{exercise.description}</p>
                  
                  <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition">
                    <span className="text-sm font-medium">Start Learning</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Learning Progress</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">8</div>
                <div className="text-white/60 text-sm">Units Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">500+</div>
                <div className="text-white/60 text-sm">Flashcards</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">80+</div>
                <div className="text-white/60 text-sm">Exercises</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">4</div>
                <div className="text-white/60 text-sm">Languages</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">KO</span>
                </div>
                <span className="text-white font-semibold text-lg">Koreancha.uz</span>
              </div>
              <p className="text-white/60 text-sm">
                Learn Korean with interactive exercises and smart flashcards.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Learning</h3>
              <ul className="space-y-2">
                <li><Link href="/flashcards" className="text-white/60 hover:text-white text-sm transition">Flashcards</Link></li>
                <li><Link href="/listening" className="text-white/60 hover:text-white text-sm transition">Listening</Link></li>
                <li><Link href="/reading" className="text-white/60 hover:text-white text-sm transition">Reading</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Account</h3>
              <ul className="space-y-2">
                <li><Link href="/login" className="text-white/60 hover:text-white text-sm transition">{t.login}</Link></li>
                <li><Link href="/signup" className="text-white/60 hover:text-white text-sm transition">{t.signup}</Link></li>
                <li><Link href="/progress" className="text-white/60 hover:text-white text-sm transition">{t.progress}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-white/60 hover:text-white text-sm transition">Contact</Link></li>
                <li><Link href="/donate" className="text-white/60 hover:text-white text-sm transition">Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/40 text-sm">
              © 2024 Koreancha.uz. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
