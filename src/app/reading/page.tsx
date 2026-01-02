'use client';

import { useEffect, useMemo, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useLanguage, type Lang, useUser } from '../providers';
import { translations } from '../../lib/translations';
import { getReadingExercisesByUnit, getAllReadingUnits, type ReadingExercise } from '../../data/readingExercises';

type ReadingTranslations = {
  title: string;
  selectUnit: string;
  startExercise: string;
  passage: string;
  questions: string;
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
  reading: string;
  comprehension: string;
  shortPassage: string;
  trueFalse: string;
  matching: string;
  easy: string;
  medium: string;
  hard: string;
  grammarPoint: string;
  vocabulary: string;
  explanation: string;
  true: string;
  false: string;
};

const readingTranslations: Record<Lang, ReadingTranslations> = {
  uz: {
    title: "O'qish mashqlari",
    selectUnit: "Bo'limni tanlang",
    startExercise: "Mashqni boshlang",
    passage: "Matn",
    questions: "Savollar",
    submit: "Javobni tekshiring",
    next: "Keyingi",
    previous: "Oldingi",
    correct: "To'g'ri!",
    incorrect: "Noto'g'ri!",
    score: "Ball",
    completed: "Tamomlandi",
    progress: "Progress",
    noExercises: "Bu bo'lim uchun o'qish mashqlari hali tayyor emas.",
    backToExercises: "Mashqlarga qaytish",
    reading: "O'qish",
    comprehension: "Tushunish",
    shortPassage: "Qisqa matn",
    trueFalse: "To'g'ri/Noto'g'ri",
    matching: "Moslashtirish",
    easy: "Oson",
    medium: "O'rta",
    hard: "Qiyin",
    grammarPoint: "Grammatika nuqtasi",
    vocabulary: "Lug'at",
    explanation: "Tushuntirish",
    true: "To'g'ri",
    false: "Noto'g'ri"
  },
  en: {
    title: "Reading Exercises",
    selectUnit: "Select Unit",
    startExercise: "Start Exercise",
    passage: "Passage",
    questions: "Questions",
    submit: "Submit Answer",
    next: "Next",
    previous: "Previous",
    correct: "Correct!",
    incorrect: "Incorrect!",
    score: "Score",
    completed: "Completed",
    progress: "Progress",
    noExercises: "No reading exercises available for this unit yet.",
    backToExercises: "Back to Exercises",
    reading: "Reading",
    comprehension: "Comprehension",
    shortPassage: "Short Passage",
    trueFalse: "True/False",
    matching: "Matching",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    grammarPoint: "Grammar Point",
    vocabulary: "Vocabulary",
    explanation: "Explanation",
    true: "True",
    false: "False"
  },
  ru: {
    title: "Упражнения на чтение",
    selectUnit: "Выберите раздел",
    startExercise: "Начать упражнение",
    passage: "Текст",
    questions: "Вопросы",
    submit: "Отправить ответ",
    next: "Далее",
    previous: "Назад",
    correct: "Правильно!",
    incorrect: "Неправильно!",
    score: "Счет",
    completed: "Завершено",
    progress: "Прогресс",
    noExercises: "Пока нет упражнений на чтение для этого раздела.",
    backToExercises: "Назад к упражнениям",
    reading: "Чтение",
    comprehension: "Понимание",
    shortPassage: "Короткий текст",
    trueFalse: "Верно/Неверно",
    matching: "Сопоставление",
    easy: "Легко",
    medium: "Средне",
    hard: "Сложно",
    grammarPoint: "Грамматика",
    vocabulary: "Словарь",
    explanation: "Пояснение",
    true: "Верно",
    false: "Неверно"
  }
};

function ReadingPageContent() {
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const { user, logActivity } = useUser();
  
  const t = readingTranslations[lang];
  const common = translations[lang];
  
  const units = useMemo(() => getAllReadingUnits(), []);
  const initialUnitFromQuery = searchParams.get('unit');
  const [selectedUnit, setSelectedUnit] = useState<string>(
    initialUnitFromQuery && units.includes(initialUnitFromQuery) ? initialUnitFromQuery : units[0] || '1과'
  );
  
  const exercises = useMemo(() => getReadingExercisesByUnit(selectedUnit), [selectedUnit]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentExercise = exercises[currentExerciseIndex];

  useEffect(() => {
    if (user && currentExercise) {
      logActivity('reading_exercise', { 
        unit: selectedUnit, 
        exerciseId: currentExercise.id,
        exerciseType: currentExercise.type 
      }, 1);
    }
  }, [user, currentExercise, selectedUnit, logActivity]);

  const handleAnswerSelect = (questionId: string, answer: number | boolean) => {
    if (showResults) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    if (!currentExercise.questions) return;
    
    let correctCount = 0;
    currentExercise.questions.forEach(question => {
      const userAnswer = selectedAnswers[question.id];
      if (userAnswer === question.correctAnswer) {
        correctCount++;
        if (user) {
          logActivity('reading_correct', { 
            unit: selectedUnit, 
            exerciseId: currentExercise.id,
            questionId: question.id 
          }, 2);
        }
      }
    });
    
    setScore(score + correctCount);
    setShowResults(true);
  };

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setSelectedAnswers({});
      setShowResults(false);
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setSelectedAnswers({});
      setShowResults(false);
    }
  };

  const resetExercise = () => {
    setCurrentExerciseIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setCompleted(false);
  };

  const getExerciseTypeLabel = (type: string) => {
    switch (type) {
      case 'short-passage': return t.shortPassage;
      case 'comprehension': return t.comprehension;
      case 'true-false': return t.trueFalse;
      case 'matching': return t.matching;
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
    const totalQuestions = exercises.reduce((sum, ex) => sum + (ex.questions?.length || 0), 0);
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    
    return (
      <main className="min-h-screen bg-[#0b0f1a] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-8 pt-6 pb-28">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">{t.completed}</h1>
            <div className="text-6xl font-bold text-blue-400 mb-4">{score}/{totalQuestions}</div>
            <div className="text-2xl text-white/70 mb-8">{percentage}%</div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetExercise}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                {translations[lang].reset}
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
              {common.exercises}
            </Link>
            <Link href="/" className="text-sm font-semibold text-white/70 hover:text-white transition">
              {common.home}
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

          {/* Korean Passage */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-300">{t.passage}</h3>
            <div className="text-lg leading-relaxed text-white">
              {currentExercise.korean}
            </div>
          </div>

          {/* Translation */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium mb-2 text-white/70">
              {common.translation} ({lang === 'uz' ? common.languageUzbek : common.languageEnglish})
            </h3>
            <div className="text-base leading-relaxed text-white/90">
              {lang === 'uz' ? currentExercise.uzbek : currentExercise.english}
            </div>
          </div>

          {/* Grammar Point */}
          {currentExercise.grammarPoint && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-6">
              <div className="text-sm text-blue-300">
                <strong>{t.grammarPoint}:</strong> {currentExercise.grammarPoint}
              </div>
            </div>
          )}

          {/* Vocabulary */}
          {currentExercise.vocabulary && currentExercise.vocabulary.length > 0 && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 mb-6">
              <div className="text-sm text-purple-300">
                <strong>{t.vocabulary}:</strong> {currentExercise.vocabulary.join(', ')}
              </div>
            </div>
          )}

          {/* Questions */}
          {currentExercise.questions && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{t.questions}</h3>
              {currentExercise.questions.map((question, qIndex) => (
                <div key={question.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="mb-3">
                    <span className="text-sm text-white/70">{common.question} {qIndex + 1}:</span>
                    <p className="text-white mt-1">{question.question}</p>
                  </div>

                  {question.options ? (
                    // Multiple choice
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          onClick={() => handleAnswerSelect(question.id, oIndex)}
                          disabled={showResults}
                          className={`w-full text-left p-3 rounded-lg border transition ${
                            showResults
                              ? oIndex === question.correctAnswer
                                ? 'bg-green-500/20 border-green-500 text-green-300'
                                : selectedAnswers[question.id] === oIndex
                                ? 'bg-red-500/20 border-red-500 text-red-300'
                                : 'bg-white/5 border-white/10 text-white/70'
                              : selectedAnswers[question.id] === oIndex
                              ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                              : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {showResults && oIndex === question.correctAnswer && (
                              <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                            )}
                            {showResults && selectedAnswers[question.id] === oIndex && oIndex !== question.correctAnswer && (
                              <svg className="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                              </svg>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    // True/False
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleAnswerSelect(question.id, true)}
                        disabled={showResults}
                        className={`flex-1 p-3 rounded-lg border transition ${
                          showResults
                            ? question.correctAnswer === true
                              ? 'bg-green-500/20 border-green-500 text-green-300'
                              : selectedAnswers[question.id] === true
                              ? 'bg-red-500/20 border-red-500 text-red-300'
                              : 'bg-white/5 border-white/10 text-white/70'
                            : selectedAnswers[question.id] === true
                            ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                            : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span>{t.true}</span>
                          {showResults && question.correctAnswer === true && (
                            <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          )}
                          {showResults && selectedAnswers[question.id] === true && question.correctAnswer !== true && (
                            <svg className="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          )}
                        </div>
                      </button>
                      <button
                        onClick={() => handleAnswerSelect(question.id, false)}
                        disabled={showResults}
                        className={`flex-1 p-3 rounded-lg border transition ${
                          showResults
                            ? question.correctAnswer === false
                              ? 'bg-green-500/20 border-green-500 text-green-300'
                              : selectedAnswers[question.id] === false
                              ? 'bg-red-500/20 border-red-500 text-red-300'
                              : 'bg-white/5 border-white/10 text-white/70'
                            : selectedAnswers[question.id] === false
                            ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                            : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span>{t.false}</span>
                          {showResults && question.correctAnswer === false && (
                            <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          )}
                          {showResults && selectedAnswers[question.id] === false && question.correctAnswer !== false && (
                            <svg className="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          )}
                        </div>
                      </button>
                    </div>
                  )}

                  {/* Explanation */}
                  {showResults && question.explanation && (
                    <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <div className="text-sm text-blue-300">
                        <strong>{t.explanation}:</strong> {question.explanation}
                      </div>
                    </div>
                  )}
                </div>
              ))}
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

            {!showResults ? (
              <button
                onClick={handleSubmit}
                disabled={!currentExercise.questions || currentExercise.questions.some(q => selectedAnswers[q.id] === undefined)}
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

export default function ReadingPage() {
  const { lang } = useLanguage();

  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#0b0f1a] text-white flex items-center justify-center">
        <div className="text-white">{translations[lang].loading}</div>
      </main>
    }>
      <ReadingPageContent />
    </Suspense>
  );
}
