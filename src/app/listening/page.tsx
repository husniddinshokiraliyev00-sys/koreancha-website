'use client';

import { useEffect, useMemo, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useLanguage, type Lang, useUser } from '../providers';

type ListeningExercise = {
  id: string;
  korean: string;
  romanization: string;
  audioUrl?: string;
  options: {
    uz: string;
    ru: string;
    en: string;
  }[];
  correctAnswer: number;
  unit: string;
};

// Sample listening exercises data
const listeningExercises: Record<string, ListeningExercise[]> = {
  '1과': [
    {
      id: '1-1',
      korean: '안녕하세요',
      romanization: 'annyeonghaseyo',
      audioUrl: '/audio/1-1.mp3',
      options: [
        { uz: 'Salom', ru: 'Здравствуйте', en: 'Hello' },
        { uz: 'Xayr', ru: 'До свидания', en: 'Goodbye' },
        { uz: 'Rahmat', ru: 'Спасибо', en: 'Thank you' },
        { uz: 'Kechirasiz', ru: 'Извините', en: 'Excuse me' }
      ],
      correctAnswer: 0,
      unit: '1과'
    },
    {
      id: '1-2',
      korean: '제 이름은 김민수입니다',
      romanization: 'je ireum-eun Kim Minsu-imnida',
      audioUrl: '/audio/1-2.mp3',
      options: [
        { uz: 'Men Kim Minsuman', ru: 'Я Ким Минсу', en: 'I am Kim Minsu' },
        { uz: 'Men o\'qiyman', ru: 'Я читаю', en: 'I read' },
        { uz: 'Men ishlayman', ru: 'Я работаю', en: 'I work' },
        { uz: 'Men uchiman', ru: 'Я лечу', en: 'I fly' }
      ],
      correctAnswer: 0,
      unit: '1과'
    },
    {
      id: '1-3',
      korean: '한국어를 공부해요',
      romanization: 'hangug-eo-reul gongbuhaeyo',
      audioUrl: '/audio/1-3.mp3',
      options: [
        { uz: 'Koreys tilini o\'rganaman', ru: 'Я изучаю корейский язык', en: 'I study Korean' },
        { uz: 'Koreys yeguliman', ru: 'Я ем корейскую еду', en: 'I eat Korean food' },
        { uz: 'Koreysda yashayman', ru: 'Я живу в Корее', en: 'I live in Korea' },
        { uz: 'Koreys qo\'shiqini kuylayman', ru: 'Я пою корейские песни', en: 'I sing Korean songs' }
      ],
      correctAnswer: 0,
      unit: '1과'
    }
  ],
  '2과': [
    {
      id: '2-1',
      korean: '오늘 날씨가 좋네요',
      romanization: 'oneul nalssi-ga joneyo',
      audioUrl: '/audio/2-1.mp3',
      options: [
        { uz: 'Bugun ob-havo yaxshi', ru: 'Сегодня хорошая погода', en: 'The weather is nice today' },
        { uz: 'Bugun yomg\'ir yog\'yapti', ru: 'Сегодня идет дождь', en: 'It\'s raining today' },
        { uz: 'Bugun issiq', ru: 'Сегодня жарко', en: 'It\'s hot today' },
        { uz: 'Bugun sovuq', ru: 'Сегодня холодно', en: 'It\'s cold today' }
      ],
      correctAnswer: 0,
      unit: '2과'
    },
    {
      id: '2-2',
      korean: '식사 맛있게 드세요',
      romanization: 'siksa mas-issege deuseyo',
      audioUrl: '/audio/2-2.mp3',
      options: [
        { uz: 'Ovqatngiz yoqimli bo\'lsin', ru: 'Приятного аппетита', en: 'Enjoy your meal' },
        { uz: 'Xayrli kun', ru: 'Добрый день', en: 'Good day' },
        { uz: 'Uxlayotgan bo\'lsingiz', ru: 'Спокойной ночи', en: 'Good night' },
        { uz: 'Sog\' bo\'ling', ru: 'Будьте здоровы', en: 'Be healthy' }
      ],
      correctAnswer: 0,
      unit: '2과'
    }
  ]
};

type ListeningTranslations = {
  title: string;
  unit: string;
  selectUnit: string;
  playAudio: string;
  selectAnswer: string;
  submit: string;
  next: string;
  previous: string;
  correct: string;
  incorrect: string;
  score: string;
  completed: string;
  tryAgain: string;
  backToExercises: string;
  noAudio: string;
};

const translations: Record<Lang, ListeningTranslations> = {
  uz: {
    title: 'Tinglash mashqlari',
    unit: 'Bo\'lim',
    selectUnit: 'Bo\'limni tanlang',
    playAudio: 'Audioni tinglang',
    selectAnswer: 'Javobni tanlang',
    submit: 'Javobni tekshirish',
    next: 'Keyingi',
    previous: 'Oldingi',
    correct: 'To\'g\'ri!',
    incorrect: 'Noto\'g\'ri',
    score: 'Ball',
    completed: 'Tamomlandi',
    tryAgain: 'Qayta urinish',
    backToExercises: 'Mashqlarga qaytish',
    noAudio: 'Audio hali tayyor emas'
  },
  ru: {
    title: 'Упражнения на аудирование',
    unit: 'Урок',
    selectUnit: 'Выберите урок',
    playAudio: 'Прослушайте аудио',
    selectAnswer: 'Выберите ответ',
    submit: 'Проверить ответ',
    next: 'Следующий',
    previous: 'Предыдущий',
    correct: 'Правильно!',
    incorrect: 'Неправильно',
    score: 'Баллы',
    completed: 'Завершено',
    tryAgain: 'Попробовать снова',
    backToExercises: 'Вернуться к упражнениям',
    noAudio: 'Аудио еще не готово'
  },
  en: {
    title: 'Listening Exercises',
    unit: 'Unit',
    selectUnit: 'Select unit',
    playAudio: 'Listen to audio',
    selectAnswer: 'Select answer',
    submit: 'Check answer',
    next: 'Next',
    previous: 'Previous',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    score: 'Score',
    completed: 'Completed',
    tryAgain: 'Try again',
    backToExercises: 'Back to exercises',
    noAudio: 'Audio not yet available'
  }
};

function ListeningPageContent() {
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const { user, logActivity } = useUser();
  const t = translations[lang];

  const unitKeys = useMemo(() => Object.keys(listeningExercises), []);
  const initialUnitFromQuery = searchParams.get('unit');
  const [selectedUnit, setSelectedUnit] = useState<string>(
    initialUnitFromQuery && listeningExercises[initialUnitFromQuery] ? initialUnitFromQuery : unitKeys[0] || '1과'
  );

  const exercises = useMemo(() => listeningExercises[selectedUnit] || [], [selectedUnit]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(exercises.length).fill(null));

  const currentExercise = exercises[currentExerciseIndex];

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentExercise.correctAnswer;
    setShowResult(true);
    
    const newAnswers = [...answers];
    newAnswers[currentExerciseIndex] = selectedAnswer;
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (user) {
      logActivity('listening_exercise', { 
        unit: selectedUnit, 
        exerciseId: currentExercise.id, 
        correct: isCorrect 
      }, isCorrect ? 2 : 1);
    }
  };

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setSelectedAnswer(answers[currentExerciseIndex + 1]);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setSelectedAnswer(answers[currentExerciseIndex - 1]);
      setShowResult(false);
    }
  };

  const handleReset = () => {
    setCurrentExerciseIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
    setAnswers(new Array(exercises.length).fill(null));
  };

  if (exercises.length === 0) {
    return (
      <main className="min-h-screen bg-[#0b0f1a] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-8 pt-6 pb-28">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
            <p className="text-white/70">Bu bo\'lim uchun tinglash mashqlari hali tayyor emas.</p>
            <Link href="/exercises" className="inline-block mt-6 text-blue-400 hover:text-blue-300">
              ← Mashqlarga qaytish
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
                onClick={handleReset}
                className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-semibold transition"
              >
                {t.tryAgain}
              </button>
              <Link
                href="/exercises"
                className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition border border-white/20"
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
            <h1 className="text-2xl font-bold">{t.title}</h1>
            <div className="text-white/60">{selectedUnit}</div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/exercises" className="text-white/70 hover:text-white transition">
              ← Mashqlar
            </Link>
            <Link href="/" className="text-white/70 hover:text-white transition">
              Bosh sahifa
            </Link>
          </div>
        </div>

        {/* Unit Selector */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-white/70 mb-2">{t.selectUnit}</label>
          <select
            value={selectedUnit}
            onChange={(e) => {
              setSelectedUnit(e.target.value);
              handleReset();
            }}
            className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/60"
          >
            {unitKeys.map((unit) => (
              <option key={unit} value={unit} className="bg-[#0b0f1a]">
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-white/60 mb-2">
            <span>Mashq {currentExerciseIndex + 1} / {exercises.length}</span>
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
        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          {/* Korean Text */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold mb-4">{currentExercise.korean}</div>
            <div className="text-lg text-white/70">{currentExercise.romanization}</div>
          </div>

          {/* Audio Player */}
          <div className="text-center mb-8">
            <button
              className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-lg font-semibold transition inline-flex items-center gap-3"
              onClick={() => {
                // Audio playback logic here
                console.log('Playing audio:', currentExercise.audioUrl);
              }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              {t.playAudio}
            </button>
            <p className="text-sm text-white/50 mt-2">{t.noAudio}</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-white/70 mb-4">{t.selectAnswer}:</p>
            {currentExercise.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && setSelectedAnswer(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border transition ${
                  showResult
                    ? index === currentExercise.correctAnswer
                      ? 'bg-green-600/20 border-green-500 text-green-400'
                      : selectedAnswer === index
                      ? 'bg-red-600/20 border-red-500 text-red-400'
                      : 'bg-white/5 border-white/10 text-white/50'
                    : selectedAnswer === index
                    ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                }`}
              >
                <div className="font-medium">
                  {lang === 'uz' && option.uz}
                  {lang === 'ru' && option.ru}
                  {lang === 'en' && option.en}
                </div>
              </button>
            ))}
          </div>

          {/* Result and Navigation */}
          {showResult && (
            <div className={`mt-6 p-4 rounded-lg text-center ${
              selectedAnswer === currentExercise.correctAnswer
                ? 'bg-green-600/20 border border-green-500 text-green-400'
                : 'bg-red-600/20 border border-red-500 text-red-400'
            }`}>
              <div className="font-bold text-lg mb-2">
                {selectedAnswer === currentExercise.correctAnswer ? t.correct : t.incorrect}
              </div>
              {selectedAnswer !== currentExercise.correctAnswer && (
                <div className="text-sm">
                  To'g'ri javob: {lang === 'uz' && currentExercise.options[currentExercise.correctAnswer].uz}
                  {lang === 'ru' && currentExercise.options[currentExercise.correctAnswer].ru}
                  {lang === 'en' && currentExercise.options[currentExercise.correctAnswer].en}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentExerciseIndex === 0}
              className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ← {t.previous}
            </button>

            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {t.submit}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-semibold transition"
              >
                {currentExerciseIndex < exercises.length - 1 ? t.next : t.completed}
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
