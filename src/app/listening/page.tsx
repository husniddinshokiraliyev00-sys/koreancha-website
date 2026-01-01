'use client';

import { useEffect, useMemo, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useLanguage, type Lang, useUser } from '../providers';
import { getListeningExercisesByUnit, getAllUnits, type ListeningExercise } from '../../data/listeningExercises';

type ListeningTranslations = {
  title: string;
  selectUnit: string;
  startExercise: string;
  playAudio: string;
  selectAnswer: string;
  submit: string;
  next: string;
  previous: string;
  correct: string;
  incorrect: string;
  score: string;
  completed: string;
  progress: string;
  noExercises: string;
  backToExercises: string;
  listening: string;
  comprehension: string;
  wordRecognition: string;
  dialogue: string;
  fillBlank: string;
  easy: string;
  medium: string;
  hard: string;
  grammarPoint: string;
  context: string;
};

const translations: Record<Lang, ListeningTranslations> = {
  uz: {
    title: "Tinglash mashqlari",
    selectUnit: "Bo'limni tanlang",
    startExercise: "Mashqni boshlang",
    playAudio: "Audioni tinglang",
    selectAnswer: "Javobni tanlang",
    submit: "Javobni tekshiring",
    next: "Keyingi",
    previous: "Oldingi",
    correct: "To'g'ri!",
    incorrect: "Noto'g'ri!",
    score: "Ball",
    completed: "Tamomlandi",
    progress: "Progress",
    noExercises: "Bu bo'lim uchun tinglash mashqlari hali tayyor emas.",
    backToExercises: "Mashqlarga qaytish",
    listening: "Tinglash",
    comprehension: "Tushunish",
    wordRecognition: "So'zni tanish",
    dialogue: "Dialog",
    fillBlank: "Bo'sh joyni to'ldiring",
    easy: "Oson",
    medium: "O'rta",
    hard: "Qiyin",
    grammarPoint: "Grammatika nuqtasi",
    context: "Kontekst"
  },
  en: {
    title: "Listening Exercises",
    selectUnit: "Select Unit",
    startExercise: "Start Exercise",
    playAudio: "Listen to Audio",
    selectAnswer: "Select Answer",
    submit: "Submit Answer",
    next: "Next",
    previous: "Previous",
    correct: "Correct!",
    incorrect: "Incorrect!",
    score: "Score",
    completed: "Completed",
    progress: "Progress",
    noExercises: "No listening exercises available for this unit yet.",
    backToExercises: "Back to Exercises",
    listening: "Listening",
    comprehension: "Comprehension",
    wordRecognition: "Word Recognition",
    dialogue: "Dialogue",
    fillBlank: "Fill in the Blank",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    grammarPoint: "Grammar Point",
    context: "Context"
  },
  ko: {
    title: "듣기 연습",
    selectUnit: "단원 선택",
    startExercise: "연습 시작",
    playAudio: "오디오 듣기",
    selectAnswer: "답변 선택",
    submit: "답변 제출",
    next: "다음",
    previous: "이전",
    correct: "정답!",
    incorrect: "오답!",
    score: "점수",
    completed: "완료",
    progress: "진행률",
    noExercises: "이 단원에 대한 듣기 연습이 아직 준비되지 않았습니다.",
    backToExercises: "연습으로 돌아가기",
    listening: "듣기",
    comprehension: "이해",
    wordRecognition: "단어 인식",
    dialogue: "대화",
    fillBlank: "빈칸 채우기",
    easy: "쉬움",
    medium: "보통",
    hard: "어려움",
    grammarPoint: "문법 포인트",
    context: "문맥"
  }
};

function ListeningPageContent() {
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const { user, logActivity } = useUser();
  
  const t = translations[lang];
  
  const units = useMemo(() => getAllUnits(), []);
  const initialUnitFromQuery = searchParams.get('unit');
  const [selectedUnit, setSelectedUnit] = useState<string>(
    initialUnitFromQuery && units.includes(initialUnitFromQuery) ? initialUnitFromQuery : units[0] || '1과'
  );
  
  const exercises = useMemo(() => getListeningExercisesByUnit(selectedUnit), [selectedUnit]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(exercises.length).fill(null));
  const [isPlaying, setIsPlaying] = useState(false);

  const currentExercise = exercises[currentExerciseIndex];

  useEffect(() => {
    if (user && currentExercise) {
      logActivity('listening_exercise', { 
        unit: selectedUnit, 
        exerciseId: currentExercise.id,
        exerciseType: currentExercise.type 
      }, 1);
    }
  }, [user, currentExercise, selectedUnit, logActivity]);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers];
    newAnswers[currentExerciseIndex] = selectedAnswer;
    setAnswers(newAnswers);
    
    const isCorrect = selectedAnswer === currentExercise.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      if (user) {
        logActivity('listening_correct', { 
          unit: selectedUnit, 
          exerciseId: currentExercise.id 
        }, 2);
      }
    }
    
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setSelectedAnswer(answers[currentExerciseIndex + 1]);
      setShowResult(false);
      setIsPlaying(false);
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setSelectedAnswer(answers[currentExerciseIndex - 1]);
      setShowResult(false);
      setIsPlaying(false);
    }
  };

  const resetExercise = () => {
    setCurrentExerciseIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
    setAnswers(new Array(exercises.length).fill(null));
    setIsPlaying(false);
  };

  const playAudio = () => {
    setIsPlaying(true);
    // Simulate audio playing
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const getExerciseTypeLabel = (type: string) => {
    switch (type) {
      case 'word-recognition': return t.wordRecognition;
      case 'sentence-comprehension': return t.comprehension;
      case 'dialogue': return t.dialogue;
      case 'fill-blank': return t.fillBlank;
      default: return type;
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return t.easy;
      case 'medium': return t.medium;
      case 'hard': return t.hard;
      default: return difficulty;
    }
  };

  if (exercises.length === 0) {
    return (
      <main className="min-h-screen bg-[#0b0f1a] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-8 pt-6 pb-28">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
            <p className="text-white/70">{t.noExercises}</p>
            <Link href="/exercises" className="inline-block mt-6 text-blue-400 hover:text-blue-300">
              ← {t.backToExercises}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (completed) {
    const percentage = Math.round((score / exercises.length) * 100);
    return (
      <main className="min-h-screen bg-[#0b0f1a] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-8 pt-6 pb-28">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">{t.completed}</h1>
            <div className="text-6xl font-bold text-blue-400 mb-4">{score}/{exercises.length}</div>
            <div className="text-2xl text-white/70 mb-8">{percentage}%</div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetExercise}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Qayta boshlash
              </button>
              <Link
                href="/exercises"
                className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold transition"
              >
                {t.backToExercises}
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0f1a] text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-8 pt-6 pb-28">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{t.title}</h1>
            <div className="hidden sm:block text-sm text-white/60">{selectedUnit}</div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/exercises" className="text-sm font-semibold text-white/70 hover:text-white transition">
              Exercises
            </Link>
            <Link href="/" className="text-sm font-semibold text-white/70 hover:text-white transition">
              Home
            </Link>
          </div>
        </div>

        {/* Unit Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/70 mb-2">{t.selectUnit}</label>
          <select
            value={selectedUnit}
            onChange={(e) => {
              setSelectedUnit(e.target.value);
              resetExercise();
            }}
            className="px-4 py-2 rounded-lg border border-white/10 text-sm bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/60"
          >
            {units.map((unit) => (
              <option key={unit} value={unit} className="bg-[#0b0f1a]">
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-white/60 mb-2">
            <span>{t.progress}: {currentExerciseIndex + 1} / {exercises.length}</span>
            <span>{t.score}: {score}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentExerciseIndex + 1) / exercises.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Exercise */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          {/* Exercise Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/70">{getExerciseTypeLabel(currentExercise.type)}</span>
              <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                {getDifficultyLabel(currentExercise.difficulty)}
              </span>
            </div>
            <span className="text-sm text-white/50">#{currentExerciseIndex + 1}</span>
          </div>

          {/* Audio Player */}
          <div className="text-center mb-6">
            <button
              onClick={playAudio}
              disabled={isPlaying}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 mx-auto"
            >
              {isPlaying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Playing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                  {t.playAudio}
                </>
              )}
            </button>
          </div>

          {/* Korean Text */}
          <div className="text-center mb-6">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {currentExercise.korean}
            </div>
            {currentExercise.context && (
              <div className="text-sm text-white/60 italic">
                {currentExercise.context}
              </div>
            )}
          </div>

          {/* Grammar Point */}
          {currentExercise.grammarPoint && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-6">
              <div className="text-sm text-blue-300">
                <strong>{t.grammarPoint}:</strong> {currentExercise.grammarPoint}
              </div>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            {currentExercise.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && setSelectedAnswer(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border transition ${
                  showResult
                    ? index === currentExercise.correctAnswer
                      ? 'bg-green-500/20 border-green-500 text-green-300'
                      : selectedAnswer === index
                      ? 'bg-red-500/20 border-red-500 text-red-300'
                      : 'bg-white/5 border-white/10 text-white/70'
                    : selectedAnswer === index
                    ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && index === currentExercise.correctAnswer && (
                    <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                  {showResult && selectedAnswer === index && index !== currentExercise.correctAnswer && (
                    <svg className="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Result */}
          {showResult && (
            <div className={`mt-4 p-3 rounded-lg text-center ${
              selectedAnswer === currentExercise.correctAnswer
                ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                : 'bg-red-500/20 border border-red-500/30 text-red-300'
            }`}
            >
              {selectedAnswer === currentExercise.correctAnswer ? t.correct : t.incorrect}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentExerciseIndex === 0}
              className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ← {t.previous}
            </button>

            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold transition"
              >
                {t.submit}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
              >
                {currentExerciseIndex === exercises.length - 1 ? t.completed : t.next}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ListeningPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#0b0f1a] text-white flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    }>
      <ListeningPageContent />
    </Suspense>
  );
}
