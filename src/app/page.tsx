'use client';

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

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white">
      {/* Header */}
      <header className="bg-[#0b0f1a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-white">
                Koreancha.uz
              </Link>
              <LanguageSwitcher />
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-white/80 hover:text-white transition">
                {t.home}
              </Link>
              <Link href="/exercises" className="text-white/80 hover:text-white transition">
                {t.exercises}
              </Link>
              <Link href="/progress" className="text-white/80 hover:text-white transition">
                {t.progress}
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button className="md:hidden p-2 rounded-lg hover:bg-white/10 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {user ? (
                <>
                  <Link href="/dashboard" className="hidden md:block text-white/80 hover:text-white transition">
                    {t.dashboard}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    {t.logout}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="hidden md:block text-white/80 hover:text-white transition">
                    {t.login}
                  </Link>
                  <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
                    {t.signup}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t.welcome}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8">
            {t.learnKorean}
          </p>
          <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
            {t.description}
          </p>
          <Link
            href="/exercises"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105"
          >
            {t.getStarted}
          </Link>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t.exercises}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              href="/flashcards"
              className="bg-white/10 border border-white/20 rounded-xl p-8 hover:bg-white/20 transition text-center"
            >
              <h3 className="text-xl font-bold mb-4">{t.flashcards}</h3>
              <p className="text-white/70">Learn vocabulary with flashcards</p>
            </Link>
            <Link
              href="/listening"
              className="bg-white/10 border border-white/20 rounded-xl p-8 hover:bg-white/20 transition text-center"
            >
              <h3 className="text-xl font-bold mb-4">{t.listening}</h3>
              <p className="text-white/70">Practice listening skills</p>
            </Link>
            <Link
              href="/reading"
              className="bg-white/10 border border-white/20 rounded-xl p-8 hover:bg-white/20 transition text-center"
            >
              <h3 className="text-xl font-bold mb-4">{t.reading}</h3>
              <p className="text-white/70">Improve reading comprehension</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
