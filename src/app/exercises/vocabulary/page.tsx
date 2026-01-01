'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function VocabularyExercisesPage() {
  const availableUnits = useMemo(
    () => ['1과', '2과', '3과', '4과', '5과', '6과', '7과', '8과'],
    []
  );
  const comingSoonUnits = useMemo(
    () => ['9과', '10과', '11과', '12과', '13과', '14과', '15과', '16과', '17과', '18과'],
    []
  );

  const [selectedUnit, setSelectedUnit] = useState<string>(availableUnits[0] ?? '1과');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-gray-600">Exercises</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Vocabulary</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/exercises" className="text-sm font-semibold text-blue-700 hover:text-blue-800 transition">
              Back
            </Link>
            <Link href="/" className="text-sm font-semibold text-blue-700 hover:text-blue-800 transition">
              Home
            </Link>
          </div>
        </div>

        <div className="mt-8 bg-white/70 backdrop-blur rounded-2xl border border-white shadow-sm p-6">
          <div className="text-gray-800 font-semibold">Flashcards</div>
          <div className="mt-1 text-sm text-gray-600">Choose a unit and start learning. (Units 1–8 available now)</div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {availableUnits.map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setSelectedUnit(u)}
                className={`px-4 py-3 rounded-xl font-bold border transition text-sm sm:text-base ${
                  selectedUnit === u
                    ? 'bg-blue-700 text-white border-blue-700'
                    : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {u}
              </button>
            ))}

            {comingSoonUnits.map((u) => (
              <div
                key={u}
                className="px-4 py-3 rounded-xl font-bold border border-gray-200 bg-white/60 text-gray-400 text-sm sm:text-base text-center"
                title="Coming soon"
              >
                {u}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-gray-700">
              Selected: <span className="font-semibold">{selectedUnit}</span>
            </div>
            <Link
              href={`/flashcards?unit=${encodeURIComponent(selectedUnit)}`}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition"
            >
              Start Flashcards
            </Link>
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 opacity-75">
            <div className="text-lg font-bold text-gray-900">Vocabulary Quiz</div>
            <div className="mt-1 text-sm text-gray-600">Quick test after learning</div>
            <div className="mt-4 text-sm font-semibold text-gray-500">Coming soon</div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 opacity-75">
            <div className="text-lg font-bold text-gray-900">Spelling</div>
            <div className="mt-1 text-sm text-gray-600">Type what you hear/see</div>
            <div className="mt-4 text-sm font-semibold text-gray-500">Coming soon</div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 opacity-75">
            <div className="text-lg font-bold text-gray-900">Review Mistakes</div>
            <div className="mt-1 text-sm text-gray-600">Focus on weak words</div>
            <div className="mt-4 text-sm font-semibold text-gray-500">Coming soon</div>
          </div>
        </div>
      </div>
    </main>
  );
}
