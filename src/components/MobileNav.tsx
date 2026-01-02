'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage, useUser } from '../app/providers';
import { translations } from '../lib/translations';

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const router = useRouter();
  const { lang } = useLanguage();
  const { user, logout } = useUser();
  const [exercisesOpen, setExercisesOpen] = useState(false);

  const t = translations[lang];

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
          <h2 className="text-xl font-bold">{t.menu}</h2>
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

          <button
            onClick={() => handleLinkClick('/flashcards')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium"
          >
            {t.flashcards}
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

          <button
            onClick={() => handleLinkClick('/progress')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium"
          >
            {t.progress}
          </button>

          <button
            onClick={() => handleLinkClick('/contacts')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium"
          >
            {t.contact}
          </button>

          <button
            onClick={() => handleLinkClick('/donate')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium"
          >
            {t.donate}
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
                {t.logout}
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
