'use client';

import Link from 'next/link';

export default function ExercisesPage() {
  return (
    <main className="min-h-screen bg-[#0b0f1a] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold">Exercises</h1>
          <Link href="/" className="text-sm font-semibold text-white/70 hover:text-white transition">
            Home
          </Link>
        </div>

        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="text-white font-semibold">Choose an activity</div>
          <div className="mt-1 text-sm text-white/60">Pick what you want to practice today.</div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/flashcards"
            className="bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition p-6"
          >
            <div className="text-lg font-bold text-white">So'z yodlash</div>
            <div className="mt-1 text-sm text-white/60">Flashcards, SRS, unit learning</div>
            <div className="mt-4 text-sm font-semibold text-blue-400">Open</div>
          </Link>

          <Link
            href="/listening"
            className="bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition p-6"
          >
            <div className="text-lg font-bold text-white">Tinglash mashqlari</div>
            <div className="mt-1 text-sm text-white/60">Audio exercises, multiple choice</div>
            <div className="mt-4 text-sm font-semibold text-blue-400">Open</div>
          </Link>

          <Link
            href="/reading"
            className="bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition p-6"
          >
            <div className="text-lg font-bold text-white">O'qish mashqlari</div>
            <div className="mt-1 text-sm text-white/60">Reading passages, comprehension</div>
            <div className="mt-4 text-sm font-semibold text-blue-400">Open</div>
          </Link>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 opacity-50">
            <div className="text-lg font-bold text-white/70">Writing</div>
            <div className="mt-1 text-sm text-white/50">Practice writing skills</div>
            <div className="mt-4 text-sm font-semibold text-white/30">Coming soon</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 opacity-50">
            <div className="text-lg font-bold text-white/70">Speaking</div>
            <div className="mt-1 text-sm text-white/50">Practice speaking skills</div>
            <div className="mt-4 text-sm font-semibold text-white/30">Coming soon</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 opacity-50">
            <div className="text-lg font-bold text-white/70">Mock Tests</div>
            <div className="mt-1 text-sm text-white/50">TOPIK practice exams</div>
            <div className="mt-4 text-sm font-semibold text-white/30">Coming soon</div>
          </div>
        </div>
      </div>
    </main>
  );
}
