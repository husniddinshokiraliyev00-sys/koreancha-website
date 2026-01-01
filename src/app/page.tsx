'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useLanguage, type Lang, useUser } from './providers';

const translations = {
  uz: {
    logo: "Koreancha.uz",
    nav: ["Bosh sahifa", "Mashqlar", "Mock Testlar", "Biz haqimizda"],
    heroTitle: "TOPIK tayyorgarligi uchun professional platforma",
    heroDesc: "Hangul, so'zlar, tinglash, o'qish va yozish mashqlari bilan koreys tilini o'rganing. Shaxsiy progress va tezkor natijalar.",
    cta: "Boshlash",
    activitiesTitle: "Eng ommabop mashg'ulotlar",
    activities: [
      { title: "So'z yodlash", icon: 'book' },
      { title: "Tinglab tushunish", icon: 'headphones' },
      { title: "O'qish", icon: 'file' },
      { title: "Yozish", icon: 'pencil' },
      { title: "TOPIK namunalari", icon: 'star' },
      { title: "To'liq mock", icon: 'timer' },
      { title: "Gapirish", icon: 'mic' }
    ],
    login: "Kirish",
    signup: "Ro'yxatdan o'tish",
    progressCheck: "Progress Tekshirish",
    featuresTitle: "Asosiy imkoniyatlar",
    features: [
      { title: "Flashcards & SRS", desc: "So'zlarni uzoq muddat eslab qolish uchun" },
      { title: "Tinglash mashqlari", desc: "Haqiqiy audio va dialogues" },
      { title: "O'qish va yozish", desc: "TOPIK formatida mashqlar" },
      { title: "To'liq mock testlar", desc: "Vaqt cheklovi va baholash bilan" }
    ],
    modalTitle: "Kirish / Ro'yxatdan o'tish",
    email: "Email",
    password: "Parol",
    modalLogin: "Kirish",
    modalSignup: "Ro'yxatdan o'tish"
  },
  ru: {
    logo: "Koreancha.uz",
    nav: ["Главная", "Упражнения", "Тесты", "О нас"],
    heroTitle: "Профессиональная платформа для подготовки к TOPIK",
    heroDesc: "Изучайте корейский язык с помощью упражнений по хангылю, лексике, аудированию, чтению и письму.",
    cta: "Начать",
    activitiesTitle: "Самые популярные разделы",
    activities: [
      { title: "Слова", icon: 'book' },
      { title: "Аудирование", icon: 'headphones' },
      { title: "Чтение", icon: 'file' },
      { title: "Письмо", icon: 'pencil' },
      { title: "Примеры TOPIK", icon: 'star' },
      { title: "Пробный тест", icon: 'timer' },
      { title: "Говорение", icon: 'mic' }
    ],
    login: "Войти",
    signup: "Регистрация",
    progressCheck: "Прогресс",
    featuresTitle: "Основные возможности",
    features: [
      { title: "Флэшкарты", desc: "Запоминайте слова надолго" },
      { title: "Аудирование", desc: "Настоящие диалоги и аудио" },
      { title: "Чтение и письмо", desc: "Упражнения в формате TOPIK" },
      { title: "Пробные тесты", desc: "С таймером и оценкой" }
    ],
    modalTitle: "Вход / Регистрация",
    email: "Email",
    password: "Пароль",
    modalLogin: "Войти",
    modalSignup: "Зарегистрироваться"
  },
  en: {
    logo: "Koreancha.uz",
    nav: ["Home", "Exercises", "Mock Tests", "About Us"],
    heroTitle: "Professional TOPIK Preparation Platform",
    heroDesc: "Learn Korean with Hangul, vocabulary, listening, reading, and writing exercises.",
    cta: "Get Started",
    activitiesTitle: "Most popular activities",
    activities: [
      { title: "Learn Vocabulary", icon: 'book' },
      { title: "Listening Practice", icon: 'headphones' },
      { title: "Reading Practice", icon: 'file' },
      { title: "Writing Practice", icon: 'pencil' },
      { title: "TOPIK Samples", icon: 'star' },
      { title: "Full Mock", icon: 'timer' },
      { title: "Speaking Practice", icon: 'mic' }
    ],
    login: "Login",
    signup: "Sign Up",
    progressCheck: "My Progress",
    featuresTitle: "Key Features",
    features: [
      { title: "Flashcards & SRS", desc: "Long-term vocabulary retention" },
      { title: "Listening Practice", desc: "Authentic audio and dialogues" },
      { title: "Reading & Writing", desc: "TOPIK format exercises" },
      { title: "Mock Tests", desc: "Timed tests with scoring" }
    ],
    modalTitle: "Login / Sign Up",
    email: "Email",
    password: "Password",
    modalLogin: "Login",
    modalSignup: "Sign Up"
  }
};

export default function Home() {
  const router = useRouter();
  const { lang, setLang } = useLanguage();
  const { user } = useUser();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [openNavDropdown, setOpenNavDropdown] = useState<null | 'exercises' | 'mock'>(null);
  const closeNavDropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setShowLangDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLangChange = (newLang: 'uz' | 'ru' | 'en') => {
    setLang(newLang);
    setShowLangDropdown(false);
  };

  const getLangName = (code: string) => {
    switch (code) {
      case 'uz': return 'O\'Z';
      case 'ru': return 'РУ';
      case 'en': return 'EN';
      default: return code;
    }
  };

  const renderActivityIcon = (name: string) => {
    const className = 'w-4 h-4';

    switch (name) {
      case 'book':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19a2 2 0 0 0 2 2h12" />
            <path d="M6 3h12a2 2 0 0 1 2 2v16" />
            <path d="M6 3a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h12" />
          </svg>
        );
      case 'headphones':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 13a8 8 0 0 1 16 0" />
            <path d="M4 13v6a2 2 0 0 0 2 2h1v-8H6a2 2 0 0 0-2 2" />
            <path d="M20 13v6a2 2 0 0 1-2 2h-1v-8h1a2 2 0 0 1 2 2" />
          </svg>
        );
      case 'file':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
          </svg>
        );
      case 'pencil':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        );
      case 'star':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 17.27 18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      case 'timer':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 2h4" />
            <path d="M12 14v-4" />
            <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        );
      case 'mic':
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <path d="M12 19v4" />
            <path d="M8 23h8" />
          </svg>
        );
      default:
        return null;
    }
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getActivityTitleByIcon = (icon: string) => {
    const found = (t.activities as any[]).find((a) => a.icon === icon);
    return found?.title || '';
  };

  const cancelCloseNavDropdown = () => {
    if (closeNavDropdownTimeoutRef.current) {
      clearTimeout(closeNavDropdownTimeoutRef.current);
      closeNavDropdownTimeoutRef.current = null;
    }
  };

  const openNav = (key: 'exercises' | 'mock') => {
    cancelCloseNavDropdown();
    setOpenNavDropdown(key);
  };

  const scheduleCloseNavDropdown = () => {
    cancelCloseNavDropdown();
    closeNavDropdownTimeoutRef.current = setTimeout(() => {
      setOpenNavDropdown(null);
    }, 250);
  };

  useEffect(() => {
    return () => {
      cancelCloseNavDropdown();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">
              {t.logo}
            </h1>
            <div className="relative" ref={langDropdownRef}>
              <button 
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-1 text-white hover:text-blue-300 transition"
              >
                {getLangName(lang)}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showLangDropdown && (
                <div className="absolute left-0 mt-2 w-32 bg-white rounded-lg shadow-lg p-2 z-50">
                  {Object.entries({
                    'uz': "O'zbekcha",
                    'ru': "Русский",
                    'en': "English"
                  }).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => handleLangChange(code as 'uz' | 'ru' | 'en')}
                      className={`block w-full text-left px-4 py-2 rounded text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition ${
                        lang === code ? 'bg-blue-50 text-blue-700 font-medium' : ''
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <nav className="hidden md:flex gap-6 lg:gap-10 text-base lg:text-lg">
            <button
              type="button"
              onClick={() => scrollToId('home')}
              className="text-white hover:text-blue-300 transition whitespace-nowrap font-medium"
            >
              {t.nav[0]}
            </button>

            <div
              className="relative"
              onMouseEnter={() => openNav('exercises')}
              onMouseLeave={scheduleCloseNavDropdown}
            >
              <button
                type="button"
                onClick={() => scrollToId('activities')}
                className="text-white hover:text-blue-300 transition whitespace-nowrap font-medium inline-flex items-center gap-1"
              >
                {t.nav[1]}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openNavDropdown === 'exercises' && (
                <div
                  className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                  onMouseEnter={cancelCloseNavDropdown}
                  onMouseLeave={scheduleCloseNavDropdown}
                >
                  {(t.activities as any[])
                    .filter((a) => a.icon !== 'star' && a.icon !== 'timer')
                    .map((a: any) => (
                      <button
                        key={a.title}
                        type="button"
                        onClick={() => {
                          setOpenNavDropdown(null);
                          if (a.icon === 'book') {
                            router.push('/exercises/vocabulary');
                            return;
                          }

                          scrollToId('activities');
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition inline-flex items-center gap-2"
                      >
                        <span className="text-blue-700">{renderActivityIcon(a.icon)}</span>
                        <span className="font-semibold">{a.title}</span>
                      </button>
                  ))}
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => openNav('mock')}
              onMouseLeave={scheduleCloseNavDropdown}
            >
              <button
                type="button"
                onClick={() => scrollToId('activities')}
                className="text-white hover:text-blue-300 transition whitespace-nowrap font-medium inline-flex items-center gap-1"
              >
                {t.nav[2]}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openNavDropdown === 'mock' && (
                <div
                  className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                  onMouseEnter={cancelCloseNavDropdown}
                  onMouseLeave={scheduleCloseNavDropdown}
                >
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    TOPIK Level 1
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setOpenNavDropdown(null);
                      scrollToId('activities');
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition inline-flex items-center gap-2"
                  >
                    <span className="text-blue-700">{renderActivityIcon('headphones')}</span>
                    <span className="font-semibold">{getActivityTitleByIcon('headphones')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOpenNavDropdown(null);
                      scrollToId('activities');
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition inline-flex items-center gap-2"
                  >
                    <span className="text-blue-700">{renderActivityIcon('file')}</span>
                    <span className="font-semibold">{getActivityTitleByIcon('file')}</span>
                  </button>

                  <div className="mt-1 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-t border-gray-100">
                    TOPIK Level 2
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setOpenNavDropdown(null);
                      scrollToId('activities');
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition inline-flex items-center gap-2"
                  >
                    <span className="text-blue-700">{renderActivityIcon('headphones')}</span>
                    <span className="font-semibold">{getActivityTitleByIcon('headphones')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOpenNavDropdown(null);
                      scrollToId('activities');
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition inline-flex items-center gap-2"
                  >
                    <span className="text-blue-700">{renderActivityIcon('file')}</span>
                    <span className="font-semibold">{getActivityTitleByIcon('file')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOpenNavDropdown(null);
                      scrollToId('activities');
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 transition inline-flex items-center gap-2"
                  >
                    <span className="text-blue-700">{renderActivityIcon('pencil')}</span>
                    <span className="font-semibold">{getActivityTitleByIcon('pencil')}</span>
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => scrollToId('features')}
              className="text-white hover:text-blue-300 transition whitespace-nowrap font-medium"
            >
              {t.nav[3]}
            </button>

            <button
              onClick={() => router.push('/contact')}
              className="text-white hover:text-blue-300 transition whitespace-nowrap font-medium"
            >
              Contact
            </button>
            <button
              onClick={() => router.push('/donate')}
              className="text-white hover:text-blue-300 transition whitespace-nowrap font-medium"
            >
              Donate
            </button>
            
            {user ? (
              <Link
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition border border-white/20"
                >
                  Kirish
                </Link>
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Ro'yxatdan o'tish
                </Link>
              </>
            )}
          </nav>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="hidden md:block bg-transparent border-2 border-white text-white hover:bg-white/10 px-4 py-1.5 rounded-full font-medium transition text-sm sm:text-base"
            >
              {t.progressCheck}
            </button>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => router.push('/login?mode=signup')} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-sm sm:text-base"
              >
                {t.signup}
              </button>
              <button 
                onClick={() => router.push('/login')} 
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full font-medium transition text-sm sm:text-base"
              >
                {t.login}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-32">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight">{t.heroTitle}</h2>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-95 leading-relaxed">
            {t.heroDesc}
          </p>
          <button className="bg-white text-blue-800 hover:bg-blue-50 px-10 py-5 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            {t.cta} 🚀
          </button>

          <div id="activities" className="mt-14">
            <div className="text-sm font-semibold tracking-wide opacity-90 mb-6">
              {t.activitiesTitle}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {t.activities.map((a: any) => (
                <button
                  key={a.title}
                  type="button"
                  onClick={() => {
                    if (a.icon === 'book') {
                      router.push('/exercises/vocabulary');
                      return;
                    }
                  }}
                  className="bg-white/95 text-blue-900 hover:bg-white px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition inline-flex items-center gap-2 transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-blue-800"
                >
                  <span className="text-blue-700">{renderActivityIcon(a.icon)}</span>
                  <span className="font-semibold text-sm sm:text-base">{a.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            {t.featuresTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {t.features.map((f) => (
              <div 
                key={f.title}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{f.title}</h3>
                <p className="text-gray-700 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}