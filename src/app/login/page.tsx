'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter, useSearchParams } from 'next/navigation';

import { useLanguage, type Lang } from '../providers';

type AuthTranslations = {
  headerSignup: string;
  headerLogin: string;
  subheaderSignup: string;
  subheaderLogin: string;
  fullName: string;
  continueWithEmail: string;
  titleLogin: string;
  titleSignup: string;
  email: string;
  password: string;
  primarySignup: string;
  primaryLogin: string;
  login: string;
  signup: string;
  google: string;
  or: string;
  switchToSignup: string;
  switchToLogin: string;
  errorFallback: string;
  missingEnv: string;
  backHome: string;
};

const translations: Record<Lang, AuthTranslations> = {
  uz: {
    headerSignup: "Bepul akkaunt yarating",
    headerLogin: 'Kirish',
    subheaderSignup: 'Free kursga kirish uchun ro\'yxatdan o\'ting',
    subheaderLogin: 'Akkauntingizga kiring',
    fullName: 'To\'liq ism',
    continueWithEmail: 'EMAIL BILAN DAVOM ETISH',
    titleLogin: 'Kirish',
    titleSignup: "Ro'yxatdan o'tish",
    email: 'Email',
    password: 'Parol',
    primarySignup: 'Bepul akkaunt yaratish',
    primaryLogin: 'Kirish',
    login: 'Kirish',
    signup: "Ro'yxatdan o'tish",
    google: 'Google bilan kirish',
    or: 'yoki',
    switchToSignup: "Hisobingiz yo‘qmi? Ro'yxatdan o'tish",
    switchToLogin: 'Allaqachon hisobingiz bormi? Kirish',
    errorFallback: 'Xato yuz berdi',
    missingEnv: "Supabase sozlanmagan. .env.local ga NEXT_PUBLIC_SUPABASE_URL va NEXT_PUBLIC_SUPABASE_ANON_KEY qo‘shing.",
    backHome: 'Bosh sahifaga qaytish'
  },
  ru: {
    headerSignup: 'Создайте бесплатный аккаунт',
    headerLogin: 'Вход',
    subheaderSignup: 'Зарегистрируйтесь, чтобы получить доступ',
    subheaderLogin: 'Войдите в свой аккаунт',
    fullName: 'Полное имя',
    continueWithEmail: 'ИЛИ ПРОДОЛЖИТЬ С EMAIL',
    titleLogin: 'Вход',
    titleSignup: 'Регистрация',
    email: 'Email',
    password: 'Пароль',
    primarySignup: 'Создать аккаунт',
    primaryLogin: 'Войти',
    login: 'Войти',
    signup: 'Регистрация',
    google: 'Войти через Google',
    or: 'или',
    switchToSignup: 'Нет аккаунта? Регистрация',
    switchToLogin: 'Уже есть аккаунт? Войти',
    errorFallback: 'Произошла ошибка',
    missingEnv: 'Supabase не настроен. Добавьте NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY в .env.local.',
    backHome: 'На главную'
  },
  en: {
    headerSignup: 'Create Your Free Account',
    headerLogin: 'Sign in',
    subheaderSignup: 'Sign up to access the course',
    subheaderLogin: 'Sign in to your account',
    fullName: 'Full Name',
    continueWithEmail: 'OR CONTINUE WITH EMAIL',
    titleLogin: 'Login',
    titleSignup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    primarySignup: 'Create Free Account',
    primaryLogin: 'Sign in',
    login: 'Login',
    signup: 'Sign Up',
    google: 'Continue with Google',
    or: 'or',
    switchToSignup: "Don't have an account? Sign up",
    switchToLogin: 'Already have an account? Login',
    errorFallback: 'Something went wrong',
    missingEnv: 'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.',
    backHome: 'Back to home'
  }
};

const getLangName = (code: Lang) => (code === 'uz' ? "O'Z" : code === 'ru' ? 'РУ' : 'EN');

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialMode = searchParams.get('mode');
  const [isSignup, setIsSignup] = useState(initialMode === 'signup');

  const { lang, setLang } = useLanguage();
  const t = translations[lang];

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setShowLangDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsSignup(initialMode === 'signup');
  }, [initialMode]);

  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) return null;
    return createClient(url, anonKey);
  }, []);

  useEffect(() => {
    if (!supabase) return;

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (data.session) router.replace('/dashboard');
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mounted) return;
      if (newSession) router.replace('/dashboard');
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
  };

  const handleAuth = async () => {
    setErrorText(null);

    if (!supabase) {
      setErrorText(t.missingEnv);
      return;
    }

    if (!email || !password) {
      setErrorText(t.errorFallback);
      return;
    }

    if (isSignup && !fullName.trim()) {
      setErrorText(t.errorFallback);
      return;
    }

    setLoading(true);
    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName.trim()
            }
          }
        });
        if (error) throw error;
        router.push('/dashboard');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/dashboard');
      }
    } catch (e: any) {
      setErrorText(e?.message || t.errorFallback);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setErrorText(null);

    if (!supabase) {
      setErrorText(t.missingEnv);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/dashboard` }
      });
      if (error) throw error;
    } catch (e: any) {
      setErrorText(e?.message || t.errorFallback);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
          >
            {t.backHome}
          </button>

          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setShowLangDropdown((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
            >
              <span className="text-sm font-medium text-gray-700">{getLangName(lang)}</span>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${showLangDropdown ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showLangDropdown && (
              <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-100">
                {(['uz', 'ru', 'en'] as Lang[]).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      handleLangChange(code);
                      setShowLangDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm transition hover:bg-gray-50 ${
                      lang === code ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {getLangName(code)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            {isSignup ? t.headerSignup : t.headerLogin}
          </h1>
          <p className="mt-2 text-sm text-gray-600 text-center">
            {isSignup ? t.subheaderSignup : t.subheaderLogin}
          </p>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 py-3 rounded-lg font-semibold transition disabled:opacity-50 border border-gray-300 flex items-center justify-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.855 32.655 29.303 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.047 6.053 29.273 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.341-.138-2.65-.389-3.917z" />
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 16.108 19.002 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.047 6.053 29.273 4 24 4c-7.682 0-14.344 4.337-17.694 10.691z" />
                <path fill="#4CAF50" d="M24 44c5.172 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.279 0-9.774-3.318-11.239-7.946l-6.52 5.02C9.558 39.556 16.227 44 24 44z" />
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.704 1.986-1.98 3.66-3.594 4.765l.002-.001 6.19 5.238C36.311 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
              </svg>
              {t.google}
            </button>

            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-gray-200 flex-1" />
              <div className="text-[11px] font-semibold tracking-wide text-gray-500">{t.continueWithEmail}</div>
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            <div className="space-y-4">
              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.fullName}</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    disabled={loading}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.password}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  disabled={loading}
                />
              </div>
            </div>

            {errorText && (
              <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {errorText}
              </div>
            )}

            <button
              type="button"
              onClick={handleAuth}
              disabled={loading}
              className="mt-5 w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-bold transition disabled:opacity-50"
            >
              {loading ? '...' : isSignup ? t.primarySignup : t.primaryLogin}
            </button>

            <div className="mt-4 text-center text-sm text-gray-600">
              <button
                type="button"
                onClick={() => {
                  const next = !isSignup;
                  setIsSignup(next);
                  router.replace(next ? '/login?mode=signup' : '/login');
                }}
                className="text-blue-700 hover:text-blue-800 font-semibold transition"
              >
                {isSignup ? t.switchToLogin : t.switchToSignup}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
