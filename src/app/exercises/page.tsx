'use client';

import Link from 'next/link';

export default function ExercisesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Exercises</h1>
          <Link href="/" className="text-sm font-semibold text-blue-700 hover:text-blue-800 transition">
            Home
          </Link>
        </div>

        <div className="mt-8 bg-white/70 backdrop-blur rounded-2xl border border-white shadow-sm p-6">
          <div className="text-gray-800 font-semibold">Choose an activity</div>
          <div className="mt-1 text-sm text-gray-600">Pick what you want to practice today.</div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/exercises/vocabulary"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-6"
          >
            <div className="text-lg font-bold text-gray-900">Vocabulary</div>
            <div className="mt-1 text-sm text-gray-600">Flashcards, review, unit learning</div>
            <div className="mt-4 text-sm font-semibold text-blue-700">Open</div>
          </Link>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 opacity-75">
            <div className="text-lg font-bold text-gray-900">Listening</div>
            <div className="mt-1 text-sm text-gray-600">Practice listening skills</div>
            <div className="mt-4 text-sm font-semibold text-gray-500">Coming soon</div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 opacity-75">
            <div className="text-lg font-bold text-gray-900">Reading</div>
            <div className="mt-1 text-sm text-gray-600">Practice reading skills</div>
            <div className="mt-4 text-sm font-semibold text-gray-500">Coming soon</div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 opacity-75">
            <div className="text-lg font-bold text-gray-900">Writing</div>
            <div className="mt-1 text-sm text-gray-600">Practice writing skills</div>
            <div className="mt-4 text-sm font-semibold text-gray-500">Coming soon</div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 opacity-75">
            <div className="text-lg font-bold text-gray-900">Speaking</div>
            <div className="mt-1 text-sm text-gray-600">Practice speaking skills</div>
            <div className="mt-4 text-sm font-semibold text-gray-500">Coming soon</div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 opacity-75">
            <div className="text-lg font-bold text-gray-900">Mock Tests</div>
            <div className="mt-1 text-sm text-gray-600">TOPIK practice exams</div>
            <div className="mt-4 text-sm font-semibold text-gray-500">Coming soon</div>
          </div>
        </div>
      </div>
    </main>
  );
}
