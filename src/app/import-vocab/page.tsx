'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type TranslationField = 'uzbek' | 'russian' | 'english';

type Card = {
  korean: string;
  uzbek?: string;
  russian?: string;
  english?: string;
};

type Entry = {
  book: string;
  unit: string;
  cards: Card[];
};

const normalizeLine = (line: string) => {
  return line
    .replace(/\uFEFF/g, '')
    .replace(/[\r\t]/g, ' ')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
};

const detectUnit = (line: string): string | null => {
  const m = line.match(/^\s*(\d+)\s*과\b/);
  if (m) return `${m[1]}과`;
  return null;
};

const stripLeadingNumber = (s: string) => {
  return s.replace(/^\s*\d+\s*[.)]?\s*/, '').trim();
};

const splitTermTranslation = (line: string): { term: string; translation: string } | null => {
  const m = line.match(/^(.+?)\s*-\s*(.+)$/);
  if (!m) return null;

  const term = stripLeadingNumber(m[1]);
  const translation = m[2].trim();

  if (!term || !translation) return null;
  return { term, translation };
};

const parseVocabulary = (raw: string, book: string, field: TranslationField): Entry[] => {
  const lines = raw
    .split('\n')
    .map(normalizeLine)
    .filter((l) => l.length > 0);

  const byUnit = new Map<string, Card[]>();
  let currentUnit: string | null = null;

  const pushCard = (unit: string, card: Card) => {
    const arr = byUnit.get(unit) || [];
    arr.push(card);
    byUnit.set(unit, arr);
  };

  for (const line of lines) {
    const unit = detectUnit(line);
    if (unit) {
      currentUnit = unit;
      if (!byUnit.has(unit)) byUnit.set(unit, []);
      continue;
    }

    const parsed = splitTermTranslation(line);
    if (!parsed) continue;

    const unitKey = currentUnit || 'Unknown';
    const card: Card = { korean: parsed.term };
    card[field] = parsed.translation;
    pushCard(unitKey, card);
  }

  const out: Entry[] = Array.from(byUnit.entries()).map(([unit, cards]) => ({
    book: book.trim() || 'Unknown',
    unit,
    cards
  }));

  out.sort((a, b) => {
    const ax = a.unit.match(/^(\d+)과$/);
    const bx = b.unit.match(/^(\d+)과$/);
    if (ax && bx) return Number(ax[1]) - Number(bx[1]);
    if (ax) return -1;
    if (bx) return 1;
    return a.unit.localeCompare(b.unit);
  });

  return out;
};

export default function ImportVocabPage() {
  const [book, setBook] = useState('2B');
  const [field, setField] = useState<TranslationField>('uzbek');
  const [raw, setRaw] = useState('');

  const parsed = useMemo(() => {
    if (!raw.trim()) return [] as Entry[];
    return parseVocabulary(raw, book, field);
  }, [raw, book, field]);

  const stats = useMemo(() => {
    const unitCount = parsed.length;
    const cardCount = parsed.reduce((sum, e) => sum + e.cards.length, 0);
    return { unitCount, cardCount };
  }, [parsed]);

  const output = useMemo(() => {
    return JSON.stringify(parsed, null, 2);
  }, [parsed]);

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      // ignore
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0f1a] text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-8 pt-8 pb-20">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Import Vocabulary</h1>
            <p className="mt-1 text-sm text-white/60">
              Paste vocab text, auto-detect units like <span className="text-white/80">1과</span>, and generate JSON entries.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/flashcards" className="text-sm font-semibold text-white/70 hover:text-white transition">
              Flashcards
            </Link>
            <Link href="/exercises" className="text-sm font-semibold text-white/70 hover:text-white transition">
              Exercises
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2">Book ID</label>
                <input
                  value={book}
                  onChange={(e) => setBook(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-white/10 text-sm bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                  placeholder="2B"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/70 mb-2">Translation field</label>
                <select
                  value={field}
                  onChange={(e) => setField(e.target.value as TranslationField)}
                  className="w-full px-4 py-2 rounded-lg border border-white/10 text-sm bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                >
                  <option value="uzbek" className="bg-[#0b0f1a]">uzbek</option>
                  <option value="russian" className="bg-[#0b0f1a]">russian</option>
                  <option value="english" className="bg-[#0b0f1a]">english</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-white/70 mb-2">Paste text</label>
              <textarea
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
                className="w-full h-80 px-4 py-3 rounded-xl border border-white/10 text-sm bg-black/20 text-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                placeholder="Example:\n1과\n1달다 - shirin\n짜다 - sho’r\n..."
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="text-sm text-white/60">
                Units: <span className="text-white/80 font-semibold">{stats.unitCount}</span> | Cards:{' '}
                <span className="text-white/80 font-semibold">{stats.cardCount}</span>
              </div>
              <button
                type="button"
                onClick={copyOutput}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-bold text-white transition"
              >
                Copy JSON
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-white/70">Generated JSON</div>
                <div className="mt-1 text-xs text-white/50">Copy this and paste into flashcardsData.json</div>
              </div>
            </div>
            <pre className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4 text-xs overflow-auto h-[28rem]">
              {output}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
