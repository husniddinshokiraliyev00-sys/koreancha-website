'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Lang = 'uz' | 'ru' | 'en';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('uz');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('preferredLanguage') as Lang | null;
      if (savedLang && ['uz', 'ru', 'en'].includes(savedLang)) {
        setLangState(savedLang);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setLang = (lang: Lang) => {
    setLangState(lang);
    try {
      localStorage.setItem('preferredLanguage', lang);
    } catch {
      // Ignore localStorage errors
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
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
