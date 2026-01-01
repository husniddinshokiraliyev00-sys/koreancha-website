// 서울대 한국어 1A (Seoul National University Korean 1A) Listening Exercises
// Beginner level - 8 units + Hangul introduction

export interface ListeningExercise {
  id: string;
  unit: string;
  type: 'word-recognition' | 'sentence-comprehension' | 'dialogue' | 'fill-blank';
  difficulty: 'easy' | 'medium' | 'hard';
  audioUrl?: string;
  korean: string;
  uzbek: string;
  english: string;
  options?: string[];
  correctAnswer: number;
  grammarPoint?: string;
  context?: string;
}

export const listeningExercises: Record<string, ListeningExercise[]> = {
  'Hangul': [
    {
      id: 'h1',
      unit: 'Hangul',
      type: 'word-recognition',
      difficulty: 'easy',
      korean: '안녕하세요',
      uzbek: 'Assalomu alaykum',
      english: 'Hello',
      options: ['안녕하세요', '감사합니다', '죄송합니다', '안녕히 가세요'],
      correctAnswer: 0,
      grammarPoint: 'Basic greeting'
    },
    {
      id: 'h2',
      unit: 'Hangul',
      type: 'word-recognition',
      difficulty: 'easy',
      korean: '감사합니다',
      uzbek: 'Rahmat',
      english: 'Thank you',
      options: ['안녕하세요', '감사합니다', '죄송합니다', '안녕히 가세요'],
      correctAnswer: 1,
      grammarPoint: 'Expressing thanks'
    },
    {
      id: 'h3',
      unit: 'Hangul',
      type: 'sentence-comprehension',
      difficulty: 'easy',
      korean: '저는 김민준입니다.',
      uzbek: 'Men Kim Minjunman.',
      english: 'I am Kim Minjun.',
      options: [
        'Men Kim Minjunman.',
        'Men talaba man.',
        'Men o\'qituvchiman.',
        'Men Koreyadanman.'
      ],
      correctAnswer: 0,
      grammarPoint: 'Introduction: ~입니다'
    }
  ],
  '1과': [
    {
      id: '1-1',
      unit: '1과',
      type: 'word-recognition',
      difficulty: 'easy',
      korean: '이름',
      uzbek: 'Ism',
      english: 'Name',
      options: ['이름', '나이', '국적', '직업'],
      correctAnswer: 0,
      grammarPoint: 'Basic nouns'
    },
    {
      id: '1-2',
      unit: '1과',
      type: 'sentence-comprehension',
      difficulty: 'easy',
      korean: '제 이름은 마리아입니다.',
      uzbek: 'Mening ismim Mariya.',
      english: 'My name is Maria.',
      options: [
        'Mening ismim Mariya.',
        'Mening yoshim 20.',
        'Men Koreyadanman.',
        'Men talabaman.'
      ],
      correctAnswer: 0,
      grammarPoint: 'Introduction: 제 이름은 ~입니다'
    },
    {
      id: '1-3',
      unit: '1과',
      type: 'dialogue',
      difficulty: 'medium',
      korean: 'A: 안녕하세요? B: 네, 안녕하세요. A: 제 이름은 토니입니다. B: 만나서 반갑습니다.',
      uzbek: 'A: Assalomu alaykum? B: Ha, assalomu alaykum. A: Mening ismim Toni. B: Tanishganimdan xursandman.',
      english: 'A: Hello? B: Yes, hello. A: My name is Tony. B: Nice to meet you.',
      options: [
        'Uchrashuvda ular ismlarini tanishtirishmoqda.',
        'Ular yoshlari haqida gapirishmoqda.',
        'Ular Koreya haqida gapirishmoqda.',
        'Ular mashg\'ulotlar haqida gapirishmoqda.'
      ],
      correctAnswer: 0,
      grammarPoint: 'Greetings and introductions'
    },
    {
      id: '1-4',
      unit: '1과',
      type: 'fill-blank',
      difficulty: 'medium',
      korean: '만나서 ______.',
      uzbek: 'Tanishganimdan ______.',
      english: 'Nice to meet you.',
      options: ['반갑습니다', '감사합니다', '죄송합니다', '안녕하세요'],
      correctAnswer: 0,
      grammarPoint: 'Meeting expressions'
    },
    {
      id: '1-5',
      unit: '1과',
      type: 'sentence-comprehension',
      difficulty: 'medium',
      korean: '저는 미국 사람입니다.',
      uzbek: 'Men AQSHlikman.',
      english: 'I am American.',
      options: [
        'Men AQSHlikman.',
        'Men Koreyadanman.',
        'Men Yaponiyadanman.',
        'Men Xitoylikman.'
      ],
      correctAnswer: 0,
      grammarPoint: 'Nationality: ~사람입니다'
    }
  ],
  '2과': [
    {
      id: '2-1',
      unit: '2과',
      type: 'word-recognition',
      difficulty: 'easy',
      korean: '나이',
      uzbek: 'Yosh',
      english: 'Age',
      options: ['이름', '나이', '국적', '직업'],
      correctAnswer: 1,
      grammarPoint: 'Question words'
    },
    {
      id: '2-2',
      unit: '2과',
      type: 'sentence-comprehension',
      difficulty: 'easy',
      korean: '저는 스물세 살입니다.',
      uzbek: 'Mening yoshim yigirma uch.',
      english: 'I am 23 years old.',
      options: [
        'Mening yoshim yigirma.',
        'Mening yoshim yigirma uch.',
        'Mening yoshim o\'n sakkiz.',
        'Mening yoshim o\'ltmish.'
      ],
      correctAnswer: 1,
      grammarPoint: 'Age: ~살입니다'
    },
    {
      id: '2-3',
      unit: '2과',
      type: 'dialogue',
      difficulty: 'medium',
      korean: 'A: 몇 살이에요? B: 스물네 살이에요. A: 정말요? 저는 스물다섯 살이에요.',
      uzbek: 'A: Nechta yoshdasiz? B: Yigirma to\'rt yosh. A: Rostdanmi? Men yigirma besh yoshman.',
      english: 'A: How old are you? B: I\'m 24. A: Really? I\'m 25.',
      options: [
        'Ular yoshlari haqida suhbatlashishmoqda.',
        'Ular ismlari haqida suhbatlashishmoqda.',
        'Ular millatlari haqida suhbatlashishmoqda.',
        'Ular kasblari haqida suhbatlashishmoqda.'
      ],
      correctAnswer: 0,
      grammarPoint: 'Asking and answering age'
    },
    {
      id: '2-4',
      unit: '2과',
      type: 'fill-blank',
      difficulty: 'medium',
      korean: '몇 ______이에요?',
      uzbek: 'Nechta ______?',
      english: 'How old?',
      options: ['살', '명', '개', '권'],
      correctAnswer: 0,
      grammarPoint: 'Age question pattern'
    },
    {
      id: '2-5',
      unit: '2과',
      type: 'sentence-comprehension',
      difficulty: 'hard',
      korean: '저는 스무 살이 아니에요. 스물한 살이에요.',
      uzbek: 'Men yigirma yosh emasman. Yigirma bir yoshman.',
      english: 'I\'m not 20. I\'m 21.',
      options: [
        'Men yigirma yoshman.',
        'Men yigirma bir yoshman.',
        'Men yigirma yosh emasman, yigirma bir yoshman.',
        'Men yigirma ikki yoshman.'
      ],
      correctAnswer: 2,
      grammarPoint: 'Negation: ~이/가 아니에요'
    }
  ],
  '3과': [
    {
      id: '3-1',
      unit: '3과',
      type: 'word-recognition',
      difficulty: 'easy',
      korean: '직업',
      uzbek: 'Kasb',
      english: 'Job/Occupation',
      options: ['이름', '나이', '국적', '직업'],
      correctAnswer: 3,
      grammarPoint: 'Occupation vocabulary'
    },
    {
      id: '3-2',
      unit: '3과',
      type: 'sentence-comprehension',
      difficulty: 'easy',
      korean: '저는 학생이에요.',
      uzbek: 'Men talabaman.',
      english: 'I am a student.',
      options: [
        'Men o\'qituvchiman.',
        'Men talabaman.',
        'Men shifokorman.',
        'Men muhandisman.'
      ],
      correctAnswer: 1,
      grammarPoint: 'Occupation: ~이에요'
    },
    {
      id: '3-3',
      unit: '3과',
      type: 'dialogue',
      difficulty: 'medium',
      korean: 'A: 무슨 일을 해요? B: 저는 회사원이에요. A: 아, 그래요? 저는 학생이에요.',
      uzbek: 'A: Qaysi ish bilan shug\'ullanasiz? B: Men kompaniya xodimiman. A: Ah, shundaymi? Men talabaman.',
      english: 'A: What do you do? B: I\'m an office worker. A: Ah, really? I\'m a student.',
      options: [
        'Ular kasblari haqida gapirishmoqda.',
        'Ular o\'qish joylari haqida gapirishmoqda.',
        'Ular oilalari haqida gapirishmoqda.',
        'Ular do\'stlari haqida gapirishmoqda.'
      ],
      correctAnswer: 0,
      grammarPoint: 'Asking about occupation'
    },
    {
      id: '3-4',
      unit: '3과',
      type: 'fill-blank',
      difficulty: 'medium',
      korean: '무슨 ______을 해요?',
      uzbek: 'Qaysi ______ bilan shug\'ullanasiz?',
      english: 'What do you do?',
      options: ['일', '음식', '나라', '언어'],
      correctAnswer: 0,
      grammarPoint: 'Occupation question pattern'
    },
    {
      id: '3-5',
      unit: '3과',
      type: 'sentence-comprehension',
      difficulty: 'hard',
      korean: '저는 선생님이 아니에요. 의사이에요.',
      uzbek: 'Men o\'qituvchi emasman. Shifokorman.',
      english: 'I\'m not a teacher. I\'m a doctor.',
      options: [
        'Men o\'qituvchiman.',
        'Men shifokorman.',
        'Men o\'qituvchi emasman, shifokorman.',
        'Men ham o\'qituvchi, ham shifokorman.'
      ],
      correctAnswer: 2,
      grammarPoint: 'Occupation negation and affirmation'
    }
  ],
  '4과': [
    {
      id: '4-1',
      unit: '4과',
      type: 'word-recognition',
      difficulty: 'easy',
      korean: '시간',
      uzbek: 'Vaqt',
      english: 'Time',
      options: ['날씨', '시간', '요일', '계절'],
      correctAnswer: 1,
      grammarPoint: 'Time vocabulary'
    },
    {
      id: '4-2',
      unit: '4과',
      type: 'sentence-comprehension',
      difficulty: 'easy',
      korean: '지금 몇 시예요?',
      uzbek: 'Hozir soat nechda?',
      english: 'What time is it now?',
      options: [
        'Hozir qaysi kun?',
        'Hozir soat nechda?',
        'Hozir qanday ob-havo?',
        'Hozir qaysi fasl?'
      ],
      correctAnswer: 1,
      grammarPoint: 'Time questions: 몇 시예요?'
    },
    {
      id: '4-3',
      unit: '4과',
      type: 'dialogue',
      difficulty: 'medium',
      korean: 'A: 지금 몇 시예요? B: 아홉 시 오 분이에요. A: 수업 시간이에요? B: 네, 맞아요.',
      uzbek: 'A: Hozir soat nechda? B: Soat to\'qqiz daqiqa besh. A: Bu dars vaqtimi? B: Ha, to\'g\'ri.',
      english: 'A: What time is it now? B: It\'s 9:05. A: Is it class time? B: Yes, that\'s right.',
      options: [
        'Ular vaqt haqida gapirishmoqda.',
        'Ular ob-havo haqida gapirishmoqda.',
        'Ular dars jadvali haqida gapirishmoqda.',
        'Ular dam olish vaqti haqida gapirishmoqda.'
      ],
      correctAnswer: 2,
      grammarPoint: 'Time and class schedule'
    },
    {
      id: '4-4',
      unit: '4과',
      type: 'fill-blank',
      difficulty: 'medium',
      korean: '지금 ______ 시예요.',
      uzbek: 'Hozir ______ soat.',
      english: 'It\'s ____ o\'clock now.',
      options: ['몇', '어디', '누구', '무엇'],
      correctAnswer: 0,
      grammarPoint: 'Time question word'
    },
    {
      id: '4-5',
      unit: '4과',
      type: 'sentence-comprehension',
      difficulty: 'hard',
      korean: '수업은 아홉 시에 시작해요. 열 시에 끝나요.',
      uzbek: 'Dars soat to\'qqizda boshlanadi. Soat o\'nda tugaydi.',
      english: 'Class starts at 9 o\'clock. It ends at 10 o\'clock.',
      options: [
        'Dars soat sakkizda boshlanadi.',
        'Dars soat to\'qqizda boshlanadi, soat o\'nda tugaydi.',
        'Dars soat o\'nda boshlanadi.',
        'Dars butun kun davom etadi.'
      ],
      correctAnswer: 1,
      grammarPoint: 'Class schedule: ~에 시작해요, ~에 끝나요'
    }
  ],
  '5과': [
    {
      id: '5-1',
      unit: '5과',
      type: 'word-recognition',
      difficulty: 'easy',
      korean: '요일',
      uzbek: 'Hafta kuni',
      english: 'Day of the week',
      options: ['날씨', '시간', '요일', '계절'],
      correctAnswer: 2,
      grammarPoint: 'Days of the week'
    },
    {
      id: '5-2',
      unit: '5과',
      type: 'sentence-comprehension',
      difficulty: 'easy',
      korean: '오늘은 월요일이에요.',
      uzbek: 'Bugun dushanba.',
      english: 'Today is Monday.',
      options: [
        'Bugun seshanba.',
        'Bugun dushanba.',
        'Bugun chorshanba.',
        'Bugun payshanba.'
      ],
      correctAnswer: 1,
      grammarPoint: 'Days: ~요일이에요'
    },
    {
      id: '5-3',
      unit: '5과',
      type: 'dialogue',
      difficulty: 'medium',
      korean: 'A: 오늘이 무슨 요일이에요? B: 수요일이에요. A: 내일은 목요일이네요.',
      uzbek: 'A: Bugun qaysi kun? B: Chorshanba. A: Ertak payshanbaku.',
      english: 'A: What day is it today? B: It\'s Wednesday. A: Tomorrow is Thursday.',
      options: [
        'Ular hafta kunlari haqida gapirishmoqda.',
        'Ular oylar haqida gapirishmoqda.',
        'Ular fasllar haqida gapirishmoqda.',
        'Ular bayramlar haqida gapirishmoqda.'
      ],
      correctAnswer: 0,
      grammarPoint: 'Days of the week conversation'
    },
    {
      id: '5-4',
      unit: '5과',
      type: 'fill-blank',
      difficulty: 'medium',
      korean: '오늘이 무슨 ______이에요?',
      uzbek: 'Bugun qaysi ______?',
      english: 'What day is it today?',
      options: ['요일', '시간', '날씨', '계절'],
      correctAnswer: 0,
      grammarPoint: 'Day question pattern'
    },
    {
      id: '5-5',
      unit: '5과',
      type: 'sentence-comprehension',
      difficulty: 'hard',
      korean: '저는 월요일과 수요일에 한국어 수업이 있어요.',
      uzbek: 'Men dushanba va chorshanba kunlari koreys tili darslarim bor.',
      english: 'I have Korean class on Monday and Wednesday.',
      options: [
        'Men faqat dushanba kuni dars bor.',
        'Men dushanba va chorshanba kunlari koreys tili darslarim bor.',
        'Men har kuni dars bor.',
        'Men faqat chorshanba kuni dars bor.'
      ],
      correctAnswer: 1,
      grammarPoint: 'Schedule with particles: ~과/와 ~에'
    }
  ],
  '6과': [
    {
      id: '6-1',
      unit: '6과',
      type: 'word-recognition',
      difficulty: 'easy',
      korean: '날씨',
      uzbek: 'Ob-havo',
      english: 'Weather',
      options: ['날씨', '시간', '요일', '계절'],
      correctAnswer: 0,
      grammarPoint: 'Weather vocabulary'
    },
    {
      id: '6-2',
      unit: '6과',
      type: 'sentence-comprehension',
      difficulty: 'easy',
      korean: '오늘 날씨가 좋아요.',
      uzbek: 'Bugun ob-havo yaxshi.',
      english: 'The weather is good today.',
      options: [
        'Bugun ob-havo yomon.',
        'Bugun ob-havo yaxshi.',
        'Bugun ob-havo issiq.',
        'Bugun ob-havo sovuq.'
      ],
      correctAnswer: 1,
      grammarPoint: 'Weather expressions: 날씨가 좋아요/나빠요'
    },
    {
      id: '6-3',
      unit: '6과',
      type: 'dialogue',
      difficulty: 'medium',
      korean: 'A: 오늘 날씨가 어때요? B: 비 와요. A: 우산 가져왔어요? B: 네, 가져왔어요.',
      uzbek: 'A: Bugun ob-havo qanday? B: Yomg\'ir yog\'moqda. A: Soyabon olib keldingizmi? B: Ha, olib keldim.',
      english: 'A: How\'s the weather today? B: It\'s raining. A: Did you bring an umbrella? B: Yes, I did.',
      options: [
        'Ular ob-havo va tayyorgarlik haqida gapirishmoqda.',
        'Ular kiyim-kechak haqida gapirishmoqda.',
        'Ular sayohat haqida gapirishmoqda.',
        'Ular sport haqida gapirishmoqda.'
      ],
      correctAnswer: 0,
      grammarPoint: 'Weather conversation and preparation'
    },
    {
      id: '6-4',
      unit: '6과',
      type: 'fill-blank',
      difficulty: 'medium',
      korean: '오늘 날씨가 ______.',
      uzbek: 'Bugun ob-havo ______.',
      english: 'Today\'s weather is ____.',
      options: ['좋아요', '많아요', '적어요', '빨라요'],
      correctAnswer: 0,
      grammarPoint: 'Weather adjectives'
    },
    {
      id: '6-5',
      unit: '6과',
      type: 'sentence-comprehension',
      difficulty: 'hard',
      korean: '어제는 눈이 왔지만 오늘은 해가 나와요.',
      uzbek: 'Kecha qor yog\'di, lekin bugun quyosh chiqmoqda.',
      english: 'It snowed yesterday, but the sun is out today.',
      options: [
        'Bugun ham qor yog\'moqda.',
        'Kecha quyosh chiqdi, bugun qor yog\'moqda.',
        'Kecha qor yog\'di, lekin bugun quyosh chiqmoqda.',
        'Bugun ob-havo bulutli.'
      ],
      correctAnswer: 2,
      grammarPoint: 'Contrast: ~지만'
    }
  ],
  '7과': [
    {
      id: '7-1',
      unit: '7과',
      type: 'word-recognition',
      difficulty: 'easy',
      korean: '음식',
      uzbek: 'Taom',
      english: 'Food',
      options: ['음식', '음료', '과일', '채소'],
      correctAnswer: 0,
      grammarPoint: 'Food vocabulary'
    },
    {
      id: '7-2',
      unit: '7과',
      type: 'sentence-comprehension',
      difficulty: 'easy',
      korean: '저는 김치를 좋아해요.',
      uzbek: 'Men kimchini yaxshi ko\'raman.',
      english: 'I like kimchi.',
      options: [
        'Men kimchini yaxshi ko\'raman.',
        'Men kimchini yomon ko\'raman.',
        'Men kimchi yemayman.',
        'Men faqat koreys taomlarini yeyman.'
      ],
      correctAnswer: 0,
      grammarPoint: 'Preferences: ~를/을 좋아해요'
    },
    {
      id: '7-3',
      unit: '7과',
      type: 'dialogue',
      difficulty: 'medium',
      korean: 'A: 뭐 먹어요? B: 비빔밥 먹어요. A: 맛있어요? B: 네, 아주 맛있어요.',
      uzbek: 'A: Nima tanlaysiz? B: Bibimpap tanlayman. A: Mazali? B: Ha, juda mazali.',
      english: 'A: What are you eating? B: I\'m eating bibimbap. A: Is it delicious? B: Yes, it\'s very delicious.',
      options: [
        'Ular taomlar haqida gapirishmoqda.',
        'Ular ichimliklar haqida gapirishmoqda.',
        'Ular mevalar haqida gapirishmoqda.',
        'Ular restoran haqida gapirishmoqda.'
      ],
      correctAnswer: 0,
      grammarPoint: 'Food conversation and taste'
    },
    {
      id: '7-4',
      unit: '7과',
      type: 'fill-blank',
      difficulty: 'medium',
      korean: '뭐 ______?',
      uzbek: 'Nima ______?',
      english: 'What are you eating?',
      options: ['먹어요', '마셔요', '보아요', '들어요'],
      correctAnswer: 0,
      grammarPoint: 'Eating verbs'
    },
    {
      id: '7-5',
      unit: '7과',
      type: 'sentence-comprehension',
      difficulty: 'hard',
      korean: '저는 매운 음식을 잘 못 먹어요. 하지만 김치는 맛있어요.',
      uzbek: 'Men achchiq taomlarni yeta olmayman. Lekin kimchi mazali.',
      english: 'I can\'t eat spicy food well. But kimchi is delicious.',
      options: [
        'Men barcha achchiq taomlarni yeyman.',
        'Men achchiq taomlarni yeta olmayman, lekin kimchi mazali.',
        'Men faqat kimchi yeyman.',
        'Men achchiq taomlarni yaxshi ko\'raman.'
      ],
      correctAnswer: 1,
      grammarPoint: 'Ability and preference: ~를/을 잘 못 먹어요'
    }
  ],
  '8과': [
    {
      id: '8-1',
      unit: '8과',
      type: 'word-recognition',
      difficulty: 'easy',
      korean: '장소',
      uzbek: 'Joy',
      english: 'Place/Location',
      options: ['시간', '요일', '날씨', '장소'],
      correctAnswer: 3,
      grammarPoint: 'Location vocabulary'
    },
    {
      id: '8-2',
      unit: '8과',
      type: 'sentence-comprehension',
      difficulty: 'easy',
      korean: '저는 집에 있어요.',
      uzbek: 'Men uydaman.',
      english: 'I am at home.',
      options: [
        'Men maktabdaman.',
        'Men uydaman.',
        'Men kutubxonadaman.',
        'Men parkdaman.'
      ],
      correctAnswer: 1,
      grammarPoint: 'Location: ~에 있어요'
    },
    {
      id: '8-3',
      unit: '8과',
      type: 'dialogue',
      difficulty: 'medium',
      korean: 'A: 어디에 가요? B: 도서관에 가요. A: 거기서 뭐 해요? B: 책을 읽어요.',
      uzbek: 'A: Qayerga boryapsiz? B: Kutubxonaga boryapman. A: U yerda nima qilyapsiz? B: Kitob o\'qiyapman.',
      english: 'A: Where are you going? B: I\'m going to the library. A: What are you doing there? B: I\'m reading books.',
      options: [
        'Ular joylar va faoliyatlar haqida gapirishmoqda.',
        'Ular vaqt haqida gapirishmoqda.',
        'Ular ob-havo haqida gapirishmoqda.',
        'Ular taomlar haqida gapirishmoqda.'
      ],
      correctAnswer: 0,
      grammarPoint: 'Location and activity questions'
    },
    {
      id: '8-4',
      unit: '8과',
      type: 'fill-blank',
      difficulty: 'medium',
      korean: '어디에 ______?',
      uzbek: 'Qayerga ______?',
      english: 'Where are you going?',
      options: ['가요', '와요', '와요', '먹어요'],
      correctAnswer: 0,
      grammarPoint: 'Direction questions'
    },
    {
      id: '8-5',
      unit: '8과',
      type: 'sentence-comprehension',
      difficulty: 'hard',
      korean: '저는 학교에 가요. 친구는 집에 있어요.',
      uzbek: 'Men maktabga boryapman. Do\'stim uyda.',
      english: 'I am going to school. My friend is at home.',
      options: [
        'Ikkalasi ham maktabga boryapman.',
        'Men uyda, do\'stim maktabga boryapman.',
        'Men maktabga boryapman, do\'stim uyda.',
        'Ikkalasi ham uyda.'
      ],
      correctAnswer: 2,
      grammarPoint: 'Contrasting locations and movements'
    }
  ]
};

export const getListeningExercisesByUnit = (unit: string): ListeningExercise[] => {
  return listeningExercises[unit] || [];
};

export const getAllUnits = (): string[] => {
  return Object.keys(listeningExercises);
};
