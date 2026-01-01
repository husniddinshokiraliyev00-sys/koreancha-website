'use client';

import Link from 'next/link';
import { useLanguage } from './providers';

export default function NotFound() {
  const { lang } = useLanguage();

  const translations = {
    uz: {
      title: "Sahifa topilmadi",
      description: "Siz qidirayotgan sahifa mavjud emas.",
      backHome: "Bosh sahifaga qaytish",
      backExercises: "Mashqlarga qaytish"
    },
    en: {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist.",
      backHome: "Back to Home",
      backExercises: "Back to Exercises"
    },
    ko: {
      title: "페이지를 찾을 수 없습니다",
      description: "찾으시는 페이지가 존재하지 않습니다.",
      backHome: "홈으로 돌아가기",
      backExercises: "연습으로 돌아가기"
    }
  };

  const t = translations[lang as keyof typeof translations];

  return (
    <main className="min-h-screen bg-[#0b0f1a] text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-blue-500 mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
        <p className="text-white/70 mb-8">{t.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            {t.backHome}
          </Link>
          <Link
            href="/exercises"
            className="border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
          >
            {t.backExercises}
          </Link>
        </div>
      </div>
    </main>
  );
}
