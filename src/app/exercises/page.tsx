
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useLanguage, useUser } from '../providers';
import { translations } from '../../lib/translations';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import MobileNav from '../../components/MobileNav';
import flashcardsData from '../../data/flashcardsData.json';
import { getAllUnits, getListeningExercisesByUnit } from '../../data/listeningExercises';
import { getAllReadingUnits, getReadingExercisesByUnit } from '../../data/readingExercises';

type HubTab = 'flashcards' | 'listening' | 'reading';

const BOOKS = ['1A', '1B'] as const;
type Book = (typeof BOOKS)[number];

type FlashcardsDataEntry = {
  book: '1A' | '1B';
  unit: string;
  cards: Array<{
    korean: string;
    uzbek: string;
    russian?: string;
    english?: string;
  }>;
};

type FlashcardsProgressV1 = {
  version: 1;
  units: Record<
    string,
    {
      masteredIndices: number[];
      lastIndex: number;
      totalCards: number;
      againIndices?: number[];
      mode?: 'all' | 'again';
      shuffleEnabled?: boolean;
      deckOrder?: number[];
      deckPosition?: number;
      updatedAt: string;
    }
  >;
};

const FLASHCARDS_PROGRESS_KEY = 'koreancha_flashcards_progress_v1';

const unitSortKey = (unit: string): number => {
  if (unit === 'Hangul') return 0;
  const n = Number(unit.replace(/\D/g, ''));
  return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER;
};

export default function ExercisesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const { user, logout } = useUser();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const t = translations[lang];

  const initialTab = (searchParams.get('tab') as HubTab | null) ?? null;
  const initialBookParam = (searchParams.get('book') as Book | null) ?? null;
  const initialUnitParam = searchParams.get('unit');
  const [activeTab, setActiveTab] = useState<HubTab>(
    initialTab === 'flashcards' || initialTab === 'listening' || initialTab === 'reading' ? initialTab : 'flashcards'
  );
  const [modalBook, setModalBook] = useState<Book | null>(
    initialBookParam === '1A' || initialBookParam === '1B' ? initialBookParam : null
  );
  const [modalUnit, setModalUnit] = useState<string | null>(initialUnitParam);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };


  const flashcardsCounts = useMemo(() => {
    const entries = flashcardsData as unknown as FlashcardsDataEntry[];
    const totalCards = entries.reduce((sum, e) => sum + (Array.isArray(e.cards) ? e.cards.length : 0), 0);
    const unitCount = new Set(entries.map((e) => `${e.book}:${e.unit}`)).size;

    let masteredCount = 0;
    try {
      if (typeof window !== 'undefined') {
        const raw = window.localStorage.getItem(FLASHCARDS_PROGRESS_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as FlashcardsProgressV1;
          if (parsed && parsed.version === 1 && parsed.units) {
            masteredCount = Object.values(parsed.units).reduce((sum, u) => {
              const m = Array.isArray(u.masteredIndices) ? u.masteredIndices.length : 0;
              return sum + m;
            }, 0);
          }
        }
      }
    } catch {
      masteredCount = 0;
    }

    return {
      totalCards,
      unitCount,
      masteredCount
    };
  }, []);

  const flashcardsUnitsByBook = useMemo(() => {
    const entries = flashcardsData as unknown as FlashcardsDataEntry[];
    const keys: Record<Book, Set<string>> = { '1A': new Set(), '1B': new Set() };
    const cardsByBookUnit = new Map<string, number>();

    for (const entry of entries) {
      if (!entry || !entry.book || !entry.unit || !Array.isArray(entry.cards)) continue;
      if (entry.book !== '1A' && entry.book !== '1B') continue;
      keys[entry.book].add(entry.unit);
      cardsByBookUnit.set(`${entry.book}:${entry.unit}`, entry.cards.length);
    }

    return {
      units: {
        '1A': Array.from(keys['1A']).sort((a, b) => unitSortKey(a) - unitSortKey(b)),
        '1B': Array.from(keys['1B']).sort((a, b) => unitSortKey(a) - unitSortKey(b))
      } as Record<Book, string[]>,
      cardsByBookUnit
    };
  }, []);

  const listeningCounts = useMemo(() => {
    return {
      unitCount: getAllUnits('1A').length + getAllUnits('1B').length
    };
  }, []);

  const readingCounts = useMemo(() => {
    return {
      unitCount: getAllReadingUnits('1A').length + getAllReadingUnits('1B').length
    };
  }, []);

  const activityCards = useMemo(() => {
    return {
      flashcards: {
        icon: '📚',
        title: t.flashcards,
        description: t.featureFlashcardsDesc,
        href: '/flashcards',
        accent: 'from-blue-500/20 via-blue-500/10 to-transparent',
        ctaClass: 'bg-orange-600 hover:bg-orange-500'
      },
      listening: {
        icon: '🎧',
        title: t.listening,
        description: t.featureListeningDesc,
        href: '/listening',
        accent: 'from-violet-500/20 via-violet-500/10 to-transparent',
        ctaClass: 'bg-emerald-600 hover:bg-emerald-500'
      },
      reading: {
        icon: '📖',
        title: t.reading,
        description: t.featureReadingDesc,
        href: '/reading',
        accent: 'from-cyan-500/20 via-cyan-500/10 to-transparent',
        ctaClass: 'bg-orange-600 hover:bg-orange-500'
      }
    } satisfies Record<HubTab, any>;
  }, [t]);

  const tabs = useMemo(() => {
    return [
      { key: 'flashcards' as const, label: t.tabFlashcards || t.flashcards },
      { key: 'listening' as const, label: t.tabListening || t.listening },
      { key: 'reading' as const, label: t.tabReading || t.reading }
    ];
  }, [t]);

  const setTab = (next: HubTab) => {
    setActiveTab(next);
    setModalBook(null);
    setModalUnit(null);
    router.replace(`/exercises?tab=${next}`);
  };

  const openBookModal = (book: Book) => {
    setModalBook(book);
    setModalUnit(null);
    router.replace(`/exercises?tab=${activeTab}&book=${book}`);
  };

  const closeBookModal = () => {
    setModalBook(null);
    setModalUnit(null);
    router.replace(`/exercises?tab=${activeTab}`);
  };

  const selectModalUnit = (unit: string) => {
    if (!modalBook) return;
    setModalUnit(unit);
    router.replace(`/exercises?tab=${activeTab}&book=${modalBook}&unit=${encodeURIComponent(unit)}`);
  };

  const books = useMemo(() => {
    return [
      { key: '1A' as const, label: t.book1A, icon: '📗', isNew: false },
      { key: '1B' as const, label: t.book1B, icon: '📘', isNew: true }
    ];
  }, [t.book1A, t.book1B]);

  const unitsByBookForTab = useMemo(() => {
    if (activeTab === 'flashcards') return flashcardsUnitsByBook.units;
    if (activeTab === 'listening') return { '1A': getAllUnits('1A'), '1B': getAllUnits('1B') } as Record<Book, string[]>;
    return { '1A': getAllReadingUnits('1A'), '1B': getAllReadingUnits('1B') } as Record<Book, string[]>;
  }, [activeTab, flashcardsUnitsByBook.units]);

  const getUnitHref = (tab: HubTab, book: Book, unit: string) => {
    const qs = `?book=${book}&unit=${encodeURIComponent(unit)}`;
    if (tab === 'flashcards') return `/flashcards${qs}`;
    if (tab === 'listening') return `/listening${qs}`;
    return `/reading${qs}`;
  };

  const getUnitCount = (tab: HubTab, book: Book, unit: string): number => {
    if (tab === 'flashcards') {
      return flashcardsUnitsByBook.cardsByBookUnit.get(`${book}:${unit}`) || 0;
    }
    if (tab === 'listening') return getListeningExercisesByUnit(unit, book).length;
    return getReadingExercisesByUnit(unit, book).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KC</span>
              </div>
              <span className="text-white font-semibold text-lg">Koreancha.uz</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white/80 hover:text-white transition">
                {t.home}
              </Link>
              <Link href="/exercises" className="text-white hover:text-white transition">
                {t.exercises}
              </Link>
              <Link href="/progress" className="text-white/80 hover:text-white transition">
                {t.progress}
              </Link>
              <Link href="/contacts" className="text-white/80 hover:text-white transition">
                {t.contact}
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              
              {user ? (
                <>
                  <Link href="/dashboard" className="hidden md:block text-white/80 hover:text-white transition">
                    {t.dashboard}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    {t.logout}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="hidden md:block text-white/80 hover:text-white transition">
                    {t.login}
                  </Link>
                  <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                    {t.signup}
                  </Link>
                </>
              )}

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
                aria-label="Open menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              <span className="h-2 w-2 rounded-full bg-orange-400" />
              <span>{t.exercises}</span>
            </div>

            <h1 className="mt-5 text-4xl md:text-5xl font-bold text-white mb-4">
              {t.exercisesHubTitle || t.exercises}
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
              {t.exercisesHubSubtitle || t.exercisesDescription}
            </p>
          </div>

          {/* Tabs */}
          <div className="mx-auto max-w-3xl">
            <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
              {tabs.map((tab) => {
                const isActive = tab.key === activeTab;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setTab(tab.key)}
                    className={`rounded-xl px-3 py-2 text-sm sm:text-base font-semibold transition border ${
                      isActive
                        ? 'bg-orange-600 text-white border-orange-500/40 shadow-sm'
                        : 'bg-transparent text-white/70 border-transparent hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards under tabs */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <div className={`p-6 bg-gradient-to-br ${activityCards[activeTab].accent}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-3xl">{activityCards[activeTab].icon}</div>
                      <div className="mt-3 flex items-center gap-2">
                        <h2 className="text-2xl font-bold text-white">{activityCards[activeTab].title}</h2>
                        {activeTab === 'flashcards' && (
                          <span className="inline-flex items-center rounded-full bg-orange-500/15 border border-orange-500/30 px-2.5 py-1 text-xs font-semibold text-orange-200">
                            {t.newBadge}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-white/70 max-w-xl">
                        {activityCards[activeTab].description}
                      </p>
                    </div>
                    <Link
                      href={activityCards[activeTab].href}
                      className={`shrink-0 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-bold text-white transition ${activityCards[activeTab].ctaClass}`}
                    >
                      {t.getStartedShort}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="p-6 border-t border-white/10">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <div className="text-xs font-semibold text-white/60">{t.available}</div>
                      <div className="mt-1 text-2xl font-bold text-white">
                        {activeTab === 'flashcards'
                          ? flashcardsCounts.totalCards
                          : activeTab === 'listening'
                            ? listeningCounts.unitCount
                            : readingCounts.unitCount}
                      </div>
                      <div className="mt-1 text-xs text-white/50">
                        {activeTab === 'flashcards' ? t.statsFlashcards : t.statsUnits}
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <div className="text-xs font-semibold text-white/60">{t.statsUnits}</div>
                      <div className="mt-1 text-2xl font-bold text-white">
                        {activeTab === 'flashcards' ? flashcardsCounts.unitCount : activeTab === 'listening' ? listeningCounts.unitCount : readingCounts.unitCount}
                      </div>
                      <div className="mt-1 text-xs text-white/50">{t.selectUnit}</div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <div className="text-xs font-semibold text-white/60">{t.mastered}</div>
                      <div className="mt-1 text-2xl font-bold text-white">
                        {activeTab === 'flashcards' ? flashcardsCounts.masteredCount : '—'}
                      </div>
                      <div className="mt-1 text-xs text-white/50">{activeTab === 'flashcards' ? t.flashcards : t.comingSoon}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book accordions */}
              <div className="mt-6 space-y-4">
                {books.map((book) => {
                  const unitKeys = unitsByBookForTab[book.key] || [];
                  const totalInBook = unitKeys.reduce((sum, unit) => sum + getUnitCount(activeTab, book.key, unit), 0);

                  return (
                    <details
                      key={book.key}
                      className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
                    >
                      <summary className="cursor-pointer list-none select-none p-5 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-black/20 border border-white/10 flex items-center justify-center text-xl">
                            {book.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="text-lg font-bold text-white">{t.selectBook}: {book.label}</div>
                              {book.isNew && (
                                <span className="inline-flex items-center rounded-full bg-orange-500/15 border border-orange-500/30 px-2.5 py-1 text-xs font-semibold text-orange-200">
                                  {t.newBadge}
                                </span>
                              )}
                            </div>
                            <div className="mt-1 text-sm text-white/60">
                              {t.statsUnits}: {unitKeys.length} • {t.available}: {totalInBook}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              openBookModal(book.key);
                            }}
                            className="hidden sm:inline-flex items-center rounded-xl border border-white/10 bg-black/20 hover:bg-white/5 px-3 py-2 text-sm font-semibold text-white transition"
                          >
                            {t.selectUnit}
                          </button>

                          <div className="h-9 w-9 rounded-xl border border-white/10 bg-black/20 flex items-center justify-center text-white/70 transition group-open:rotate-180">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </summary>

                      <div className="px-5 pb-5">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {unitKeys.map((unit) => {
                            const count = getUnitCount(activeTab, book.key, unit);
                            return (
                              <Link
                                key={unit}
                                href={getUnitHref(activeTab, book.key, unit)}
                                className="rounded-xl border border-white/10 bg-black/20 hover:bg-white/5 transition p-4"
                              >
                                <div className="text-sm font-bold text-white">{unit}</div>
                                <div className="mt-1 text-xs text-white/60">{count} • {t.getStartedShort}</div>
                              </Link>
                            );
                          })}
                        </div>

                        {unitKeys.length === 0 && (
                          <div className="text-sm text-white/60 py-6">{t.comingSoon}</div>
                        )}
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>

            {/* Unit modal */}
            {modalBook && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                role="dialog"
                aria-modal="true"
                aria-label={`${t.selectUnit} ${modalBook}`}
                onMouseDown={(e) => {
                  if (e.currentTarget === e.target) closeBookModal();
                }}
              >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                <div className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl">
                  <div className="p-5 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm text-white/60">{t.selectBook}: {modalBook}</div>
                      <div className="mt-1 text-xl sm:text-2xl font-bold text-white">{t.selectUnit}</div>
                      <div className="mt-1 text-sm text-white/60">{activityCards[activeTab].title}</div>
                    </div>

                    <button
                      type="button"
                      onClick={closeBookModal}
                      className="h-10 w-10 rounded-xl border border-white/10 bg-black/20 hover:bg-white/5 text-white/80 flex items-center justify-center transition"
                      aria-label={t.close || 'Close'}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {(unitsByBookForTab[modalBook] || []).map((unit) => {
                        const count = getUnitCount(activeTab, modalBook, unit);
                        const isActive = modalUnit === unit;
                        return (
                          <button
                            key={unit}
                            type="button"
                            onClick={() => selectModalUnit(unit)}
                            className={`aspect-square rounded-xl border p-4 text-left transition flex flex-col justify-between ${
                              isActive
                                ? 'border-orange-500/60 bg-orange-500/10'
                                : 'border-white/10 bg-black/20 hover:bg-white/5'
                            }`}
                          >
                            <div className="text-sm font-bold text-white">{unit}</div>
                            <div className="text-xs text-white/60">{count} • {t.available}</div>
                          </button>
                        );
                      })}
                    </div>

                    {!modalUnit && (
                      <div className="mt-4 text-sm text-white/60">{t.pleaseSelectUnit}</div>
                    )}
                  </div>

                  <div className="p-5 sm:p-6 border-t border-white/10 flex items-center justify-between gap-4">
                    <div className="text-sm text-white/60">
                      {modalUnit ? (
                        <span>
                          {t.selectUnit}: <span className="text-white font-semibold">{modalUnit}</span>
                        </span>
                      ) : (
                        <span>{t.selectUnit}</span>
                      )}
                    </div>

                    {modalUnit ? (
                      <Link
                        href={getUnitHref(activeTab, modalBook, modalUnit)}
                        className="inline-flex items-center justify-center rounded-xl bg-orange-600 hover:bg-orange-500 px-5 py-3 text-sm font-bold text-white transition"
                      >
                        {t.start}
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/10 px-5 py-3 text-sm font-bold text-white/50 cursor-not-allowed"
                      >
                        {t.start}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Right column */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">{t.history}</div>
                  <span className="text-xs text-white/60">{t.comingSoon}</span>
                </div>
                <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
                  {user ? (
                    <div>
                      <div className="font-semibold text-white">{t.continue}</div>
                      <div className="mt-1 text-white/60">{t.comingSoon}</div>
                    </div>
                  ) : (
                    <div>
                      <div className="font-semibold text-orange-200">{t.loginRequired}</div>
                      <div className="mt-1 text-white/60">{t.comingSoon}</div>
                      <Link href="/login" className="inline-flex mt-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2 text-sm font-semibold text-white transition">
                        {t.login}
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">{t.customFlashcards}</div>
                  <span className="text-xs text-white/60">{t.newBadge}</span>
                </div>
                <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
                  <div className="font-semibold text-white">{t.customFlashcardsTitle}</div>
                  <div className="mt-1 text-white/60">{t.customFlashcardsSubtitle}</div>
                  <Link
                    href="/custom-flashcards"
                    className="inline-flex mt-4 rounded-xl bg-orange-600 hover:bg-orange-500 px-4 py-2 text-sm font-bold text-white transition"
                  >
                    {t.getStartedShort}
                  </Link>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">{t.comingSoon}</div>
                  <span className="text-xs text-white/60">2026</span>
                </div>
                <div className="mt-4 text-sm text-white/60">
                  {t.vocabularyQuiz}
                </div>
                <div className="mt-2 text-sm text-white/60">
                  {t.spelling}
                </div>
                <div className="mt-2 text-sm text-white/60">
                  {t.reviewMistakes}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">{t.learningProgress}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">8</div>
                <div className="text-white/60 text-sm">{t.statsUnits}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">500+</div>
                <div className="text-white/60 text-sm">{t.statsFlashcards}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">80+</div>
                <div className="text-white/60 text-sm">{t.statsExercises}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">4</div>
                <div className="text-white/60 text-sm">{t.statsLanguages}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">KC</span>
                </div>
                <span className="text-white font-semibold text-lg">Koreancha.uz</span>
              </div>
              <p className="text-white/60 text-sm">
                {t.description}
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">{t.footerLearning}</h3>
              <ul className="space-y-2">
                <li><Link href="/flashcards" className="text-white/60 hover:text-white text-sm transition">{t.flashcards}</Link></li>
                <li><Link href="/listening" className="text-white/60 hover:text-white text-sm transition">{t.listening}</Link></li>
                <li><Link href="/reading" className="text-white/60 hover:text-white text-sm transition">{t.reading}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">{t.footerAccount}</h3>
              <ul className="space-y-2">
                <li><Link href="/login" className="text-white/60 hover:text-white text-sm transition">{t.login}</Link></li>
                <li><Link href="/signup" className="text-white/60 hover:text-white text-sm transition">{t.signup}</Link></li>
                <li><Link href="/progress" className="text-white/60 hover:text-white text-sm transition">{t.progress}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">{t.footerAbout}</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-white/60 hover:text-white text-sm transition">{t.contact}</Link></li>
                <li><Link href="/donate" className="text-white/60 hover:text-white text-sm transition">{t.footerSupport}</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/40 text-sm">
              © 2024 Koreancha.uz. {t.footerRights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
