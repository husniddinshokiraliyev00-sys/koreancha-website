'use client';

import Link from 'next/link';
import { useLanguage } from './providers';
import { translations } from '../lib/translations';

export default function NotFound() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <main className="min-h-screen bg-[#0b0f1a] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-white/70 mb-8">The page you're looking for doesn't exist.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            {t.home}
          </Link>
          <Link href="/exercises" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition">
            {t.exercises}
          </Link>
        </div>
      </div>
    </main>
  );
}
