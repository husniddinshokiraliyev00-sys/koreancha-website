'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useLanguage, type Lang, useUser } from './providers';
import MobileNav from '../components/MobileNav';

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
  en: {
    logo: "Koreancha.uz",
    nav: ["Home", "Exercises", "Mock Tests", "About"],
    heroTitle: "Professional platform for TOPIK preparation",
    heroDesc: "Learn Korean with Hangul, vocabulary, listening, reading and writing exercises. Personal progress and fast results.",
    cta: "Get Started",
    activitiesTitle: "Most Popular Activities",
    activities: [
      { title: "Vocabulary", icon: 'book' },
      { title: "Listening Practice", icon: 'headphones' },
      { title: "Reading Practice", icon: 'file' },
      { title: "Writing Practice", icon: 'pencil' },
      { title: "TOPIK Samples", icon: 'star' },
      { title: "Full Mock", icon: 'timer' },
      { title: "Speaking Practice", icon: 'mic' }
    ],
    login: "Login",
    signup: "Sign Up",
    progressCheck: "Check Progress",
    featuresTitle: "Key Features",
    features: [
      { title: "Flashcards & SRS", desc: "Long-term vocabulary retention" },
      { title: "Listening Exercises", desc: "Real audio and dialogues" },
      { title: "Reading & Writing", desc: "TOPIK format exercises" },
      { title: "Full Mock Tests", desc: "Time limits and grading" }
    ],
    modalTitle: "Login / Sign Up",
    email: "Email",
    password: "Password",
    modalLogin: "Login",
    modalSignup: "Sign Up"
  },
  ko: {
    logo: "Koreancha.uz",
    nav: ["홈", "연습", "모의 테스트", "소개"],
    heroTitle: "TOPIK 준비를 위한 전문 플랫폼",
    heroDesc: "한글, 어휘, 듣기, 읽기, 쓰기 연습으로 한국어를 배우세요. 개인 진행과 빠른 결과.",
    cta: "시작하기",
    activitiesTitle: "가장 인기 있는 활동",
    activities: [
      { title: "어휘", icon: 'book' },
      { title: "듣기 연습", icon: 'headphones' },
      { title: "읽기 연습", icon: 'file' },
      { title: "쓰기 연습", icon: 'pencil' },
      { title: "TOPIK 샘플", icon: 'star' },
      { title: "전체 모의", icon: 'timer' },
      { title: "말하기 연습", icon: 'mic' }
    ],
    login: "로그인",
    signup: "가입",
    progressCheck: "진행 확인",
    featuresTitle: "주요 기능",
    features: [
      { title: "플래시카드 & SRS", desc: "장기 어휘 기억" },
      { title: "듣기 연습", desc: "실제 오디오 및 대화" },
      { title: "읽기 & 쓰기", desc: "TOPIK 형식 연습" },
      { title: "전체 모의 테스트", desc: "시간 제한 및 채점" }
    ],
    modalTitle: "로그인 / 가입",
    email: "이메일",
    password: "비밀번호",
    modalLogin: "로그인",
    modalSignup: "가입"
  }
};

export default function Home() {
  const router = useRouter();
  const { lang, setLang } = useLanguage();
  const { user } = useUser();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [openNavDropdown, setOpenNavDropdown] = useState<null | 'exercises' | 'mock'>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeNavDropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const navDropdownRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setShowLangDropdown(false);
      }
      if (navDropdownRef.current && !navDropdownRef.current.contains(event.target as Node)) {
        setOpenNavDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLangChange = (newLang: 'uz' | 'en' | 'ko') => {
    setLang(newLang);
    setShowLangDropdown(false);
  };

  const renderIcon = (name: string) => {
    const className = 'w-6 h-6';
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">
              {t.logo}
            </h1>
            {/* Language Switcher */}
            <div className="relative" ref={langDropdownRef}>
              <button 
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-1 text-white hover:text-blue-300 transition"
              >
                <span className="text-lg font-bold">
                  {lang === 'uz' ? 'UZ' : lang === 'en' ? 'EN' : 'KO'}
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showLangDropdown && (
                <div className="absolute left-0 mt-2 w-32 bg-white rounded-lg shadow-lg p-2 z-50">
                  {[
                    { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' },
                    { code: 'en', name: 'English', flag: '🇬🇧' },
                    { code: 'ko', name: '한국어', flag: '🇰🇷' }
                  ].map(({ code, name, flag }) => (
                    <button
                      key={code}
                      onClick={() => handleLangChange(code as 'uz' | 'en' | 'ko')}
                      className={`w-full text-left px-4 py-2 rounded text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition flex items-center gap-2 ${
                        lang === code ? 'bg-blue-50 text-blue-700 font-medium' : ''
                      }`}
                    >
                      <span>{flag}</span>
                      <span>{name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <nav className="hidden md:flex gap-4 lg:gap-8 text-base lg:text-lg">
            <button
              type="button"
              onClick={() => scrollToId('home')}
              className="text-white hover:text-blue-300 transition whitespace-nowrap font-medium px-3 py-2 rounded-lg hover:bg-white/10"
            >
              {t.nav[0]}
            </button>

            <div
              className="relative"
              ref={navDropdownRef}
              onMouseEnter={() => {
                if (closeNavDropdownTimeoutRef.current) {
                  clearTimeout(closeNavDropdownTimeoutRef.current);
                  closeNavDropdownTimeoutRef.current = null;
                }
                setOpenNavDropdown('exercises');
              }}
              onMouseLeave={() => {
                closeNavDropdownTimeoutRef.current = setTimeout(() => {
                  setOpenNavDropdown(null);
                }, 150);
              }}
            >
              <button
                type="button"
                className="text-white hover:text-blue-300 transition whitespace-nowrap font-medium px-3 py-2 rounded-lg hover:bg-white/10 flex items-center gap-1"
              >
                {t.nav[1]}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openNavDropdown === 'exercises' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100">
                  <Link
                    href="/flashcards"
                    className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 19a2 2 0 0 0 2 2h12" />
                        <path d="M6 3h12a2 2 0 0 1 2 2v16" />
                        <path d="M6 3a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h12" />
                      </svg>
                      <span>{t.activities[0].title}</span>
                    </div>
                  </Link>
                  <Link
                    href="/listening"
                    className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 13a8 8 0 0 1 16 0" />
                        <path d="M4 13v6a2 2 0 0 0 2 2h1v-8H6a2 2 0 0 0-2 2" />
                        <path d="M20 13v6a2 2 0 0 1-2 2h-1v-8h1a2 2 0 0 1 2 2" />
                      </svg>
                      <span>{t.activities[1].title}</span>
                    </div>
                  </Link>
                  <Link
                    href="/reading"
                    className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                      </svg>
                      <span>{t.activities[2].title}</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <div
              className="relative"
              ref={navDropdownRef}
              onMouseEnter={() => {
                if (closeNavDropdownTimeoutRef.current) {
                  clearTimeout(closeNavDropdownTimeoutRef.current);
                  closeNavDropdownTimeoutRef.current = null;
                }
                setOpenNavDropdown('mock');
              }}
              onMouseLeave={() => {
                closeNavDropdownTimeoutRef.current = setTimeout(() => {
                  setOpenNavDropdown(null);
                }, 150);
              }}
            >
              <button
                type="button"
                className="text-white hover:text-blue-300 transition whitespace-nowrap font-medium px-3 py-2 rounded-lg hover:bg-white/10 flex items-center gap-1"
              >
                {t.nav[2]}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openNavDropdown === 'mock' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100">
                  <Link
                    href="/mock/topik1"
                    className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition font-medium"
                  >
                    TOPIK I
                  </Link>
                  <Link
                    href="/mock/topik2"
                    className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition font-medium"
                  >
                    TOPIK II
                  </Link>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => scrollToId('about')}
              className="text-white hover:text-blue-300 transition whitespace-nowrap font-medium px-3 py-2 rounded-lg hover:bg-white/10"
            >
              {t.nav[3]}
            </button>
          </nav>
          
          <nav className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden md:block text-white hover:text-blue-300 transition font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  {t.progressCheck}
                </Link>
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Chiqish
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden md:block text-white hover:text-blue-300 transition font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  {t.login}
                </Link>
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  {t.signup}
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {t.heroDesc}
          </p>
          <button
            onClick={() => scrollToId('activities')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            {t.cta}
          </button>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            {t.activitiesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.activities.map((activity, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer transform hover:scale-105 transition-transform"
                onClick={() => {
                  if (activity.icon === 'book') {
                    router.push('/flashcards');
                  } else if (activity.icon === 'headphones') {
                    router.push('/listening');
                  } else if (activity.icon === 'file') {
                    router.push('/reading');
                  }
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-blue-600">
                    {renderIcon(activity.icon)}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {activity.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {activity.title} mashqlari bilan mahoratingizni oshiring
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            {t.featuresTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4" />
                    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.39 0 4.68.94 6.36 2.64" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Koreancha.uz. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}
