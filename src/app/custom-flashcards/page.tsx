'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useLanguage, useUser } from '../providers';
import { translations } from '../../lib/translations';
import { supabase } from '../../lib/supabase';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import MobileNav from '../../components/MobileNav';

type CustomCard = {
  korean: string;
  uzbek: string;
  russian?: string;
  english?: string;
};

type InvalidLine = {
  line: number;
  raw: string;
};

type SavedSet = {
  id: string;
  name: string;
  description: string | null;
  cards: CustomCard[] | null;
  created_at: string;
};

function splitLine(rawLine: string): string[] {
  if (rawLine.includes('\t')) return rawLine.split('\t');
  if (rawLine.includes('|')) return rawLine.split('|');
  if (rawLine.includes(' - ')) return rawLine.split(' - ');
  return rawLine.split(/\s{2,}/);
}

function parseCards(text: string): { cards: CustomCard[]; invalid: InvalidLine[] } {
  const lines = text.split(/\r?\n/);
  const cards: CustomCard[] = [];
  const invalid: InvalidLine[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i] ?? '';
    const trimmed = raw.trim();
    if (!trimmed) continue;

    const parts = splitLine(trimmed)
      .map((p) => p.trim())
      .filter(Boolean);

    if (parts.length < 2) {
      invalid.push({ line: i + 1, raw });
      continue;
    }

    const korean = parts[0] ?? '';
    const uzbek = parts[1] ?? '';
    const russian = parts[2];
    const english = parts[3];

    if (!korean || !uzbek) {
      invalid.push({ line: i + 1, raw });
      continue;
    }

    const key = `${korean}::${uzbek}`;
    if (seen.has(key)) continue;
    seen.add(key);

    cards.push({
      korean,
      uzbek,
      russian: russian || undefined,
      english: english || undefined
    });
  }

  return { cards, invalid };
}

export default function CustomFlashcardsPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const { user, loading: userLoading, logout } = useUser();
  const t = translations[lang];

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [setName, setSetName] = useState('');
  const [setDescription, setSetDescription] = useState('');
  const [rawText, setRawText] = useState('');

  const [cards, setCards] = useState<CustomCard[]>([]);
  const [invalid, setInvalid] = useState<InvalidLine[]>([]);

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isTableMissing, setIsTableMissing] = useState(false);

  const [savedSets, setSavedSets] = useState<SavedSet[]>([]);
  const [loadingSets, setLoadingSets] = useState(false);

  const previewCards = useMemo(() => cards.slice(0, 12), [cards]);
  const invalidPreview = useMemo(() => invalid.slice(0, 6), [invalid]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const runParse = () => {
    const res = parseCards(rawText);
    setCards(res.cards);
    setInvalid(res.invalid);
    setSaveMessage(null);
  };

  const clearAll = () => {
    setRawText('');
    setCards([]);
    setInvalid([]);
    setSaveMessage(null);
  };

  const loadSets = async () => {
    if (!user) return;
    setLoadingSets(true);
    setSaveMessage(null);
    setIsTableMissing(false);

    const { data, error } = await supabase
      .from('custom_flashcard_sets')
      .select('id, name, description, cards, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      const msg = (error as any)?.message as string | undefined;
      const missing = Boolean(msg && msg.toLowerCase().includes('custom_flashcard_sets')) &&
        Boolean(msg && msg.toLowerCase().includes('does not exist'));
      if (missing) {
        setIsTableMissing(true);
        setSaveMessage(t.tableMissing);
        setSavedSets([]);
      }
      setLoadingSets(false);
      return;
    }

    setSavedSets((data as SavedSet[]) || []);
    setLoadingSets(false);
  };

  useEffect(() => {
    if (!user) return;
    void loadSets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const saveSet = async () => {
    if (!user) return;
    if (!setName.trim()) return;
    if (cards.length === 0) return;
    if (invalid.length > 0) return;
    if (isTableMissing) return;

    setSaving(true);
    setSaveMessage(null);

    const { error } = await supabase.from('custom_flashcard_sets').insert({
      user_id: user.id,
      name: setName.trim(),
      description: setDescription.trim() ? setDescription.trim() : null,
      cards
    });

    if (error) {
      const msg = (error as any)?.message as string | undefined;
      const isMissingTable = Boolean(msg && msg.toLowerCase().includes('custom_flashcard_sets')) &&
        Boolean(msg && msg.toLowerCase().includes('does not exist'));
      if (isMissingTable) {
        setIsTableMissing(true);
        setSaveMessage(t.tableMissing);
      } else {
        setSaveMessage(t.saveFailed);
      }
      setSaving(false);
      return;
    }

    setSaveMessage(t.saved);
    setSaving(false);
    await loadSets();
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">{t.loading}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <nav className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KC</span>
              </div>
              <span className="text-white font-semibold text-lg">Koreancha.uz</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white/80 hover:text-white transition">{t.home}</Link>
              <Link href="/exercises" className="text-white/80 hover:text-white transition">{t.exercises}</Link>
              <Link href="/progress" className="text-white/80 hover:text-white transition">{t.progress}</Link>
              <Link href="/contacts" className="text-white/80 hover:text-white transition">{t.contact}</Link>
            </div>

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
                  <Link
                    href="/signup"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    {t.signup}
                  </Link>
                </>
              )}

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

      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              <span className="h-2 w-2 rounded-full bg-orange-400" />
              <span>{t.customFlashcards}</span>
            </div>

            <h1 className="mt-5 text-4xl md:text-5xl font-bold text-white mb-4">{t.customFlashcardsTitle}</h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">{t.customFlashcardsSubtitle}</p>
          </div>

          {!user ? (
            <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <div className="text-white/80 font-semibold">{t.loginRequired}</div>
              <div className="mt-2 text-white/60">{t.customFlashcardsLoginHint}</div>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-xl bg-orange-600 hover:bg-orange-500 px-5 py-3 text-sm font-bold text-white transition"
                >
                  {t.login}
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-5 py-3 text-sm font-bold text-white transition"
                >
                  {t.signup}
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                  <div className="p-6 bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-3xl">✨</div>
                        <h2 className="mt-3 text-2xl font-bold text-white">{t.customFlashcards}</h2>
                        <p className="mt-2 text-white/70 max-w-xl">{t.pasteFormatHint}</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-2">
                        <button
                          type="button"
                          onClick={runParse}
                          className="inline-flex items-center justify-center rounded-xl bg-orange-600 hover:bg-orange-500 px-4 py-2 text-sm font-bold text-white transition"
                        >
                          {t.parse}
                        </button>
                        <button
                          type="button"
                          onClick={clearAll}
                          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-sm font-bold text-white transition"
                        >
                          {t.clear}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t border-white/10 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white/80">{t.setName}</label>
                        <input
                          value={setName}
                          onChange={(e) => setSetName(e.target.value)}
                          className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-orange-500/50"
                          placeholder={t.setName}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white/80">{t.setDescriptionOptional}</label>
                        <input
                          value={setDescription}
                          onChange={(e) => setSetDescription(e.target.value)}
                          className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-orange-500/50"
                          placeholder={t.setDescriptionOptional}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/80">{t.pasteHere}</label>
                      <textarea
                        value={rawText}
                        onChange={(e) => setRawText(e.target.value)}
                        rows={10}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-orange-500/50"
                        placeholder={t.pasteFormatHint}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={runParse}
                          className="inline-flex items-center justify-center rounded-xl bg-orange-600 hover:bg-orange-500 px-5 py-3 text-sm font-bold text-white transition"
                        >
                          {t.parse}
                        </button>
                        <button
                          type="button"
                          onClick={clearAll}
                          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-5 py-3 text-sm font-bold text-white transition"
                        >
                          {t.clear}
                        </button>
                      </div>

                      <div className="text-sm text-white/60">
                        {t.cardsParsed}: <span className="text-white font-semibold">{cards.length}</span> • {t.invalidLines}: <span className="text-white font-semibold">{invalid.length}</span>
                      </div>
                    </div>

                    {saveMessage && (
                      <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                        {saveMessage}
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-bold text-white">{t.cardsParsed}</div>
                      <div className="mt-1 text-sm text-white/60">{t.comingSoonAutoTranslate}</div>
                    </div>

                    <button
                      type="button"
                      onClick={saveSet}
                      disabled={saving || isTableMissing || !setName.trim() || cards.length === 0 || invalid.length > 0}
                      className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition ${
                        saving || isTableMissing || !setName.trim() || cards.length === 0 || invalid.length > 0
                          ? 'bg-white/10 border border-white/10 text-white/50 cursor-not-allowed'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {saving ? t.saving : t.saveSet}
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {previewCards.map((c, idx) => (
                      <div key={`${c.korean}-${idx}`} className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <div className="text-sm font-bold text-white">{c.korean}</div>
                        <div className="mt-1 text-sm text-white/70">{c.uzbek}</div>
                        <div className="mt-2 text-xs text-white/50">
                          {c.russian ? `RU: ${c.russian}` : 'RU: —'} • {c.english ? `EN: ${c.english}` : 'EN: —'}
                        </div>
                      </div>
                    ))}

                    {cards.length === 0 && (
                      <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
                        {t.pasteHere}
                      </div>
                    )}
                  </div>

                  {invalid.length > 0 && (
                    <div className="mt-5 rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">
                      <div className="text-sm font-bold text-orange-200">{t.invalidLines}: {invalid.length}</div>
                      <div className="mt-2 space-y-1 text-xs text-orange-100/80">
                        {invalidPreview.map((e) => (
                          <div key={`${e.line}-${e.raw}`}>
                            #{e.line}: {e.raw}
                          </div>
                        ))}
                        {invalid.length > invalidPreview.length && (
                          <div>…</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-white">{t.customFlashcards}</div>
                    <span className="text-xs text-white/60">{loadingSets ? t.loading : ''}</span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {savedSets.map((s) => (
                      <div key={s.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <div className="text-sm font-bold text-white">{s.name}</div>
                        {s.description && <div className="mt-1 text-sm text-white/60">{s.description}</div>}
                        <div className="mt-2 text-xs text-white/50">
                          {t.cardsParsed}: {Array.isArray(s.cards) ? s.cards.length : 0}
                        </div>
                        <div className="mt-3 text-xs text-white/60">{t.comingSoon}</div>
                      </div>
                    ))}

                    {!loadingSets && savedSets.length === 0 && (
                      <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
                        {t.comingSoon}
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="text-sm font-semibold text-white">{t.comingSoon}</div>
                  <div className="mt-3 text-sm text-white/60">{t.comingSoonAutoTranslate}</div>
                  <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
                    {t.exercises}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-black/20 border-t border-white/10 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-white/60 text-sm">{t.description}</div>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/exercises" className="text-white/60 hover:text-white transition">{t.exercises}</Link>
              <Link href="/flashcards" className="text-white/60 hover:text-white transition">{t.flashcards}</Link>
              <Link href="/progress" className="text-white/60 hover:text-white transition">{t.progress}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
