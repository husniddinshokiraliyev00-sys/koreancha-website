'use client';

import { useEffect, useMemo, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useLanguage, type Lang, useUser } from '../providers';

type ReadingQuestion = {
  id: string;
  question: string;
  options: {
    uz: string;
    ru: string;
    en: string;
  }[];
  correctAnswer: number;
};

type ReadingExercise = {
  id: string;
  unit: string;
  title: string;
  passage: {
    korean: string;
    romanization: string;
  };
  questions: ReadingQuestion[];
};

// Sample reading exercises data
const readingExercises: Record<string, ReadingExercise[]> = {
  '1과': [
    {
      id: '1-1',
      unit: '1과',
      title: 'Self Introduction',
      passage: {
        korean: '안녕하세요. 제 이름은 김민수입니다. 저는 한국 사람입니다. 저는 서울에서 삽니다. 저는 학생입니다. 저는 한국어를 공부합니다.',
        romanization: 'Annyeonghaseyo. Je ireum-eun Kim Minsu-imnida. Jeo-eun hanguk saram-imnida. Jeo-eun seoul-eseo samnida. Jeo-eun haksaeng-imnida. Jeo-eun hangugeo-reul gongbuhapnida.'
      },
      questions: [
        {
          id: '1-1-q1',
          question: '이 사람의 이름은 무엇입니까?',
          options: [
            { uz: 'Kim Minso', ru: 'Ким Минсу', en: 'Kim Minsu' },
            { uz: 'Lee Jihyun', ru: 'Ли Чихён', en: 'Lee Jihyun' },
            { uz: 'Park Jimin', ru: 'Пак Чимин', en: 'Park Jimin' },
            { uz: 'Jeong Hoseok', ru: 'Чон Хосок', en: 'Jeong Hoseok' }
          ],
          correctAnswer: 0
        },
        {
          id: '1-1-q2',
          question: '이 사람은 어디에 삽니까?',
          options: [
            { uz: 'Busan', ru: 'Пусан', en: 'Busan' },
            { uz: 'Seoul', ru: 'Сеул', en: 'Seoul' },
            { uz: 'Daegu', ru: 'Тэгу', en: 'Daegu' },
            { uz: 'Incheon', ru: 'Инчхон', en: 'Incheon' }
          ],
          correctAnswer: 1
        },
        {
          id: '1-1-q3',
          question: '이 사람의 직업은 무엇입니까?',
          options: [
            { uz: 'O\'qituvchi', ru: 'Учитель', en: 'Teacher' },
            { uz: 'Shifokor', ru: 'Врач', en: 'Doctor' },
            { uz: 'O\'quvchi', ru: 'Студент', en: 'Student' },
            { uz: 'Muhandis', ru: 'Инженер', en: 'Engineer' }
          ],
          correctAnswer: 2
        }
      ]
    },
    {
      id: '1-2',
      unit: '1과',
      title: 'Daily Life',
      passage: {
        korean: '저는 매일 아침 6시에 일어납니다. 그리고 아침을 먹습니다. 저는 빵과 우유를 먹습니다. 저는 8시에 학교에 갑니다. 저는 한국어 수업을 좋아합니다.',
        romanization: 'Jeo-eun maeil achim yeoseot-si-e ireonapnida. Geurigo achim-eul meokseupnida. Jeo-eun ppang-gu uyureul meokseupnida. Jeo-eun yeodeol-si-e hakgyo-e gapnida. Jeo-eun hangugeo sueop-eul joahapnida.'
      },
      questions: [
        {
          id: '1-2-q1',
          question: '이 사람은 몇 시에 일어납니까?',
          options: [
            { uz: '5 soat', ru: '5 часов', en: '5 o\'clock' },
            { uz: '6 soat', ru: '6 часов', en: '6 o\'clock' },
            { uz: '7 soat', ru: '7 часов', en: '7 o\'clock' },
            { uz: '8 soat', ru: '8 часов', en: '8 o\'clock' }
          ],
          correctAnswer: 1
        },
        {
          id: '1-2-q2',
          question: '이 사람은 아침에 무엇을 먹습니까?',
          options: [
            { uz: 'Guruch va go\'sht', ru: 'Рис и мясо', en: 'Rice and meat' },
            { uz: 'Non va sut', ru: 'Хлеб и молоко', en: 'Bread and milk' },
            { uz: 'Meva', ru: 'Фрукты', en: 'Fruits' },
            { uz: 'Sabzavot', ru: 'Овощи', en: 'Vegetables' }
          ],
          correctAnswer: 1
        }
      ]
    }
  ],
  '2과': [
    {
      id: '2-1',
      unit: '2과',
      title: 'Weekend Plans',
      passage: {
        korean: '이번 주말에 친구를 만납니다. 우리는 영화를 보러 갈 것입니다. 영화는 재미있습니다. 영화 후에 우리는 식당에 갈 것입니다. 우리는 김치찌개를 먹을 것입니다.',
        romanization: 'Ibeon jumal-e chingu-reul mannampnida. Uri-eun yeonghwa-reul boreo gal geosimnida. Yeonghwa-neun jaemi-iseupnida. Yeonghwa hue uri-eun sikdang-e gal geosimnida. Uri-eun gimchijjigae-reul meogeul geosimnida.'
      },
      questions: [
        {
          id: '2-1-q1',
          question: '이번 주말에 무엇을 합니까?',
          options: [
            { uz: 'Uyda qolaman', ru: 'Останусь дома', en: 'I will stay home' },
            { uz: 'Do\'kon boraman', ru: 'Пойду в магазин', en: 'I will go shopping' },
            { uz: 'Do\'st bilan uchrashaman', ru: 'Встречусь с другом', en: 'I will meet a friend' },
            { uz: 'Kutubxonaga boraman', ru: 'Пойду в библиотеку', en: 'I will go to the library' }
          ],
          correctAnswer: 2
        },
        {
          id: '2-1-q2',
          question: '영화 후에 어디에 갑니까?',
          options: [
            { uz: 'Uyga', ru: 'Домой', en: 'Home' },
            { uz: 'Parkga', ru: 'В парк', en: 'To the park' },
            { uz: 'Oshxonaga', ru: 'На кухню', en: 'To the kitchen' },
            { uz: 'Restoranga', ru: 'В ресторан', en: 'To the restaurant' }
          ],
          correctAnswer: 3
        }
      ]
    }
  ]
};

type ReadingTranslations = {
  title: string;
  unit: string;
  selectUnit: string;
  selectExercise: string;
  passage: string;
  questions: string;
  submit: string;
  next: string;
  previous: string;
  correct: string;
  incorrect: string;
  score: string;
  completed: string;
  tryAgain: string;
  backToExercises: string;
  showResults: string;
  hideResults: string;
};

const translations: Record<Lang, ReadingTranslations> = {
  uz: {
    title: 'O\'qish mashqlari',
    unit: 'Bo\'lim',
    selectUnit: 'Bo\'limni tanlang',
    selectExercise: 'Mashqni tanlang',
    passage: 'Matn',
    questions: 'Savollar',
    submit: 'Javobni tekshirish',
    next: 'Keyingi',
    previous: 'Oldingi',
    correct: 'To\'g\'ri!',
    incorrect: 'Noto\'g\'ri',
    score: 'Ball',
    completed: 'Tamomlandi',
    tryAgain: 'Qayta urinish',
    backToExercises: 'Mashqlarga qaytish',
    showResults: 'Natijalarni ko\'rsatish',
    hideResults: 'Natijalarni yashirish'
  },
  ru: {
    title: 'Упражнения на чтение',
    unit: 'Урок',
    selectUnit: 'Выберите урок',
    selectExercise: 'Выберите упражнение',
    passage: 'Текст',
    questions: 'Вопросы',
    submit: 'Проверить ответы',
    next: 'Следующий',
    previous: 'Предыдущий',
    correct: 'Правильно!',
    incorrect: 'Неправильно',
    score: 'Баллы',
    completed: 'Завершено',
    tryAgain: 'Попробовать снова',
    backToExercises: 'Вернуться к упражнениям',
    showResults: 'Показать результаты',
    hideResults: 'Скрыть результаты'
  },
  en: {
    title: 'Reading Exercises',
    unit: 'Unit',
    selectUnit: 'Select unit',
    selectExercise: 'Select exercise',
    passage: 'Passage',
    questions: 'Questions',
    submit: 'Check answers',
    next: 'Next',
    previous: 'Previous',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    score: 'Score',
    completed: 'Completed',
    tryAgain: 'Try again',
    backToExercises: 'Back to exercises',
    showResults: 'Show results',
    hideResults: 'Hide results'
  }
};

function ReadingPageContent() {
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const { user, logActivity } = useUser();
  const t = translations[lang];

  const unitKeys = useMemo(() => Object.keys(readingExercises), []);
  const initialUnitFromQuery = searchParams.get('unit');
  const [selectedUnit, setSelectedUnit] = useState<string>(
    initialUnitFromQuery && readingExercises[initialUnitFromQuery] ? initialUnitFromQuery : unitKeys[0] || '1과'
  );

  const exercises = useMemo(() => readingExercises[selectedUnit] || [], [selectedUnit]);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentExercise = exercises[selectedExerciseIndex];

  useEffect(() => {
    if (currentExercise) {
      setAnswers(new Array(currentExercise.questions.length).fill(null));
      setShowResults(false);
    }
  }, [currentExercise]);

  const handleSubmit = () => {
    if (answers.includes(null)) return;

    let correctCount = 0;
    currentExercise.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setShowResults(true);
    setCompleted(true);

    if (user) {
      logActivity('reading_exercise', { 
        unit: selectedUnit, 
        exerciseId: currentExercise.id, 
        score: correctCount,
        total: currentExercise.questions.length
      }, correctCount * 2);
    }
  };

  const handleReset = () => {
    setAnswers(new Array(currentExercise.questions.length).fill(null));
    setShowResults(false);
    setScore(0);
    setCompleted(false);
  };

  const handleExerciseChange = (index: number) => {
    setSelectedExerciseIndex(index);
  };

  if (exercises.length === 0) {
    return (
      <main className="min-h-screen bg-[#0b0f1a] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-8 pt-6 pb-28">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
            <p className="text-white/70">Bu bo\'lim uchun o\'qish mashqlari hali tayyor emas.</p>
            <Link href="/exercises" className="inline-block mt-6 text-blue-400 hover:text-blue-300">
              ← Mashqlarga qaytish
            </Link>
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

        {/* Unit and Exercise Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">{t.selectUnit}</label>
            <select
              value={selectedUnit}
              onChange={(e) => {
                setSelectedUnit(e.target.value);
                setSelectedExerciseIndex(0);
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
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">{t.selectExercise}</label>
            <select
              value={selectedExerciseIndex}
              onChange={(e) => handleExerciseChange(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/60"
            >
              {exercises.map((exercise, index) => (
                <option key={exercise.id} value={index} className="bg-[#0b0f1a]">
                  {exercise.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Exercise Content */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          {/* Title */}
          <h2 className="text-xl font-bold mb-6 text-center">{currentExercise.title}</h2>

          {/* Passage */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">{t.passage}</h3>
            <div className="bg-white/5 rounded-lg p-6">
              <div className="text-lg leading-relaxed mb-4">
                {currentExercise.passage.korean}
              </div>
              <div className="text-sm text-white/60 italic">
                {currentExercise.passage.romanization}
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">{t.questions}</h3>
            <div className="space-y-6">
              {currentExercise.questions.map((question, qIndex) => (
                <div key={question.id} className="bg-white/5 rounded-lg p-6">
                  <div className="font-medium mb-4">
                    {qIndex + 1}. {question.question}
                  </div>
                  <div className="space-y-3">
                    {question.options.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        onClick={() => !showResults && setAnswers(prev => {
                          const newAnswers = [...prev];
                          newAnswers[qIndex] = oIndex;
                          return newAnswers;
                        })}
                        disabled={showResults}
                        className={`w-full text-left p-3 rounded-lg border transition ${
                          showResults
                            ? oIndex === question.correctAnswer
                              ? 'bg-green-600/20 border-green-500 text-green-400'
                              : answers[qIndex] === oIndex
                              ? 'bg-red-600/20 border-red-500 text-red-400'
                              : 'bg-white/5 border-white/10 text-white/50'
                            : answers[qIndex] === oIndex
                            ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                        }`}
                      >
                        <div className="font-medium">
                          {String.fromCharCode(65 + oIndex)}. {lang === 'uz' && option.uz}
                          {lang === 'ru' && option.ru}
                          {lang === 'en' && option.en}
                        </div>
                      </button>
                    ))}
                  </div>
                  {showResults && answers[qIndex] !== question.correctAnswer && (
                    <div className="mt-3 text-sm text-green-400">
                      To'g'ri javob: {String.fromCharCode(65 + question.correctAnswer)}. {
                        lang === 'uz' && question.options[question.correctAnswer].uz
                      }
                      {lang === 'ru' && question.options[question.correctAnswer].ru}
                      {lang === 'en' && question.options[question.correctAnswer].en}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          {showResults && (
            <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">
                  {t.score}: {score} / {currentExercise.questions.length}
                </div>
                <div className="text-lg text-blue-400">
                  {Math.round((score / currentExercise.questions.length) * 100)}%
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg font-semibold transition border border-white/20"
              >
                {t.tryAgain}
              </button>
              <button
                onClick={() => setShowResults(!showResults)}
                disabled={answers.includes(null)}
                className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {showResults ? t.hideResults : t.showResults}
              </button>
            </div>
            <Link
              href="/exercises"
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg font-semibold transition border border-white/20"
            >
              {t.backToExercises}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ReadingPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#0b0f1a] text-white flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    }>
      <ReadingPageContent />
    </Suspense>
  );
}
