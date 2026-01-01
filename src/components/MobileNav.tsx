'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage, type Lang } from '../app/providers';

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

const translations = {
  uz: {
    home: "Bosh sahifa",
    exercises: "Mashqlar",
    mockTests: "Mock Testlar",
    about: "Biz haqimizda",
    login: "Kirish",
    signup: "Ro'yxatdan o'tish",
    dashboard: "Dashboard",
    flashcards: "So'z yodlash",
    listening: "Tinglash",
    reading: "O'qish"
  },
  en: {
    home: "Home",
    exercises: "Exercises",
    mockTests: "Mock Tests",
    about: "About",
    login: "Login",
    signup: "Sign Up",
    dashboard: "Dashboard",
    flashcards: "Flashcards",
    listening: "Listening",
    reading: "Reading"
  },
  ko: {
    home: "홈",
    exercises: "연습",
    mockTests: "모의 테스트",
    about: "소개",
    login: "로그인",
    signup: "가입",
    dashboard: "대시보드",
    flashcards: "플래시카드",
    listening: "듣기",
    reading: "읽기"
  }
};

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const router = useRouter();
  const { lang, user, logout } = useLanguage();
  const [exercisesOpen, setExercisesOpen] = useState(false);
  const [mockOpen, setMockOpen] = useState(false);

  const t = translations[lang as keyof typeof translations];

  const handleLinkClick = (href: string) => {
    router.push(href);
    onClose();
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Mobile Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white z-50 md:hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          <button
            onClick={() => handleLinkClick('/')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium"
          >
            {t.home}
          </button>

          {/* Exercises Dropdown */}
          <div>
            <button
              onClick={() => setExercisesOpen(!exercisesOpen)}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium flex items-center justify-between"
            >
              {t.exercises}
              <svg 
                className={`w-4 h-4 transition-transform ${exercisesOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {exercisesOpen && (
              <div className="ml-4 mt-2 space-y-2">
                <button
                  onClick={() => handleLinkClick('/flashcards')}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition text-white/80"
                >
                  {t.flashcards}
                </button>
                <button
                  onClick={() => handleLinkClick('/listening')}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition text-white/80"
                >
                  {t.listening}
                </button>
                <button
                  onClick={() => handleLinkClick('/reading')}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition text-white/80"
                >
                  {t.reading}
                </button>
              </div>
            )}
          </div>

          {/* Mock Tests Dropdown */}
          <div>
            <button
              onClick={() => setMockOpen(!mockOpen)}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium flex items-center justify-between"
            >
              {t.mockTests}
              <svg 
                className={`w-4 h-4 transition-transform ${mockOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mockOpen && (
              <div className="ml-4 mt-2 space-y-2">
                <button
                  onClick={() => handleLinkClick('/mock/topik1')}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition text-white/80"
                >
                  TOPIK I
                </button>
                <button
                  onClick={() => handleLinkClick('/mock/topik2')}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition text-white/80"
                >
                  TOPIK II
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleLinkClick('/#about')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium"
          >
            {t.about}
          </button>

          {/* Auth Links */}
          {user ? (
            <>
              <button
                onClick={() => handleLinkClick('/dashboard')}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium"
              >
                {t.dashboard}
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
              >
                Chiqish
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleLinkClick('/login')}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium"
              >
                {t.login}
              </button>
              <button
                onClick={() => handleLinkClick('/signup')}
                className="w-full text-left px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
              >
                {t.signup}
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  );
}
