'use client';

import { useLanguage } from '../app/providers';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  
  const languages = [
    { code: 'uz', name: 'UZ', flag: '🇺🇿' },
    { code: 'ru', name: 'RU', flag: '🇷🇺' },
    { code: 'en', name: 'EN', flag: '🇬🇧' }
  ] as const;

  return (
    <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
      {languages.map(({ code, name, flag }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition ${
            lang === code
              ? 'bg-white text-gray-900'
              : 'text-white hover:bg-white/20'
          }`}
        >
          <span className="mr-1">{flag}</span>
          {name}
        </button>
      ))}
    </div>
  );
}
