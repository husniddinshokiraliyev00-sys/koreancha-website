'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Lang = 'uz' | 'en' | 'ko' | 'ru';

interface LanguageContextType {
  currentLang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Lang>('uz');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('preferredLanguage') as Lang | null;
      if (savedLang && ['uz', 'en', 'ko', 'ru'].includes(savedLang)) {
        setCurrentLang(savedLang);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setLang = (lang: Lang) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('preferredLanguage', lang);
    } catch {
      // Ignore localStorage errors
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
