'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useLanguage, useUser } from './providers';
import { translations } from '../lib/translations';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Home() {
  const router = useRouter();
  const { lang } = useLanguage();
  const { user, logout } = useUser();

  const t = translations[lang];

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const features = [
    {
      icon: '📚',
      title: t.flashcards,
      description: 'Interactive flashcards with smart SRS',
      href: '/flashcards',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '🎧',
      title: t.listening,
      description: 'Improve listening comprehension',
      href: '/listening',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '📖',
      title: t.reading,
      description: 'Practice reading with real content',
      href: '/reading',
      color: 'from-green-500 to-green-600'
    }
  ];

  const stats = [
    { number: '8+', label: 'Units' },
    { number: '500+', label: 'Flashcards' },
    { number: '80+', label: 'Exercises' },
    { number: '4', label: 'Languages' }
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
              <Link href="/exercises" className="text-white/80 hover:text-white transition">
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
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t.learnKorean}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              {t.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/exercises"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition transform hover:scale-105"
            >
              {t.getStarted}
            </Link>
            <Link
              href="/flashcards"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition border border-white/20"
            >
              Try Flashcards
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.exercises}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Comprehensive learning tools designed to help you master Korean
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
                <div className="mt-6 flex items-center text-blue-400 group-hover:text-blue-300 transition">
                  <span className="text-sm font-medium">Get Started</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to start learning?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Join thousands of students learning Korean with our interactive platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <>
                  <Link
                    href="/signup"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition"
                  >
                    {t.signup}
                  </Link>
                  <Link
                    href="/login"
                    className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold transition border border-white/30"
                  >
                    {t.login}
                  </Link>
                </>
              ) : (
                <Link
                  href="/dashboard"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition"
                >
                  Go to Dashboard
                </Link>
              )}
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
