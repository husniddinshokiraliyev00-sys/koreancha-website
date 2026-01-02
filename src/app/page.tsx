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

  // Redirect logged-in users to dashboard
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  // Show loading while checking auth
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">{t.redirecting}</div>
        <div className="text-white/60 text-sm mt-2">{t.pleaseWait}</div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const learningPaths = [
    {
      icon: '📚',
      title: t.pathFlashcardsTitle,
      description: t.pathFlashcardsDesc,
      href: '/flashcards',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '🎧',
      title: t.pathListeningTitle,
      description: t.pathListeningDesc,
      href: '/listening',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '📖',
      title: t.pathReadingTitle,
      description: t.pathReadingDesc,
      href: '/reading',
      color: 'from-green-500 to-green-600'
    }
  ];

  const upcomingFeatures = [
    t.countdownFeature1,
    t.countdownFeature2,
    t.countdownFeature3
  ];

  const activities = [
    { name: t.activityFlashcards, href: '/flashcards', icon: '📚' },
    { name: t.activityListening, href: '/listening', icon: '🎧' },
    { name: t.activityReading, href: '/reading', icon: '📖' },
    { name: t.activityExercises, href: '/exercises', icon: '✍️' },
    { name: t.activityProgress, href: '/progress', icon: '📊' }
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
                <span className="text-white font-bold text-sm">KC</span>
              </div>
              <span className="text-white font-semibold text-lg">Koreancha</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white/90 hover:text-white transition-colors">
                {t.home}
              </Link>
              <Link href="/exercises" className="text-white/90 hover:text-white transition-colors">
                {t.exercises}
              </Link>
              <Link href="/progress" className="text-white/90 hover:text-white transition-colors">
                {t.progress}
              </Link>
              {user && (
                <Link href="/dashboard" className="text-white/90 hover:text-white transition-colors">
                  {t.dashboard}
                </Link>
              )}
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  {t.logout}
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/login" className="text-white/90 hover:text-white transition-colors">
                    {t.login}
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {t.signup}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            {t.heroSubtitle}
          </p>
          <Link
            href={user ? "/dashboard" : "/signup"}
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            {t.heroCta}
          </Link>
        </div>
      </section>

      {/* Choose Path Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t.choosePathTitle}
            </h2>
            <p className="text-xl text-white/80">
              {t.choosePathSubtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <Link
                key={index}
                href={path.href}
                className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${path.color} rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  {path.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {path.title}
                </h3>
                <p className="text-white/70">
                  {path.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Activity Cards Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t.activityTitle}
            </h2>
            <p className="text-xl text-white/80">
              {t.activitySubtitle}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {activities.map((activity, index) => (
              <Link
                key={index}
                href={activity.href}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="text-3xl mb-3">{activity.icon}</div>
                <h3 className="text-white font-medium">{activity.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown/Coming Soon Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.countdownTitle}
          </h2>
          <p className="text-xl text-white/80 mb-12">
            {t.countdownSubtitle}
          </p>
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {upcomingFeatures.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-white font-medium">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">{t.footerLearning}</h3>
              <ul className="space-y-2">
                <li><Link href="/flashcards" className="text-white/70 hover:text-white transition-colors">{t.flashcards}</Link></li>
                <li><Link href="/listening" className="text-white/70 hover:text-white transition-colors">{t.listening}</Link></li>
                <li><Link href="/reading" className="text-white/70 hover:text-white transition-colors">{t.reading}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">{t.footerAccount}</h3>
              <ul className="space-y-2">
                <li><Link href="/login" className="text-white/70 hover:text-white transition-colors">{t.login}</Link></li>
                <li><Link href="/signup" className="text-white/70 hover:text-white transition-colors">{t.signup}</Link></li>
                <li><Link href="/progress" className="text-white/70 hover:text-white transition-colors">{t.progress}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">{t.footerAbout}</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-white/70 hover:text-white transition-colors">{t.contact}</Link></li>
                <li><Link href="/donate" className="text-white/70 hover:text-white transition-colors">Donate</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">{t.footerSupport}</h3>
              <ul className="space-y-2">
                <li><a href="https://t.me/koreancha" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">Telegram</a></li>
                <li><a href="https://instagram.com/koreancha" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-white/60">{t.footerRights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
