﻿// 서울대 한국어 1A (Seoul National University Korean 1A) Listening Exercises
// Beginner level - 8 units + Hangul introduction

 import flashcardsData from './flashcardsData.json';

export interface ListeningExercise {
  id: string;
  book?: string;
  unit: string;
  type: 'word-recognition' | 'sentence-comprehension' | 'dialogue' | 'fill-blank';
  difficulty: 'easy' | 'medium' | 'hard';
  audioUrl?: string;
  korean: string;
  uzbek: string;
  english: string;
  russian?: string;
  options?: string[];
  optionsEn?: string[];
  optionsRu?: string[];
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
  ],
  '9과': [
    {
      id: '1b9-1',
      book: '1B',
      unit: '9과',
      type: 'word-recognition',
      difficulty: 'easy',
      korean: '할머니',
      uzbek: 'buvi',
      russian: 'бабушка',
      english: 'grandmother',
      options: ['buvi', 'buva', 'ona', 'ota'],
      optionsEn: ['grandmother', 'grandfather', 'mother', 'father'],
      optionsRu: ['бабушка', 'дедушка', 'мама', 'папа'],
      correctAnswer: 0,
      grammarPoint: 'Family members'
    },
    {
      id: '1b9-2',
      book: '1B',
      unit: '9과',
      type: 'word-recognition',
      difficulty: 'easy',
      korean: '남편',
      uzbek: 'er',
      russian: 'муж',
      english: 'husband',
      options: ['er', 'xotin', 'uka', 'singil'],
      optionsEn: ['husband', 'wife', 'younger brother', 'younger sister'],
      optionsRu: ['муж', 'жена', 'младший брат', 'младшая сестра'],
      correctAnswer: 0,
      grammarPoint: 'Family members'
    },
    {
      id: '1b9-3',
      book: '1B',
      unit: '9과',
      type: 'sentence-comprehension',
      difficulty: 'medium',
      korean: '저는 딸이 있어요.',
      uzbek: 'Mening qiz farzandim bor.',
      russian: 'У меня есть дочь.',
      english: 'I have a daughter.',
      options: [
        "Mening o'g'il farzandim bor.",
        "Mening qiz farzandim bor.",
        'Mening erim bor.',
        'Mening buvim bor.'
      ],
      optionsEn: ['I have a son.', 'I have a daughter.', 'I have a husband.', 'I have a grandmother.'],
      optionsRu: ['У меня есть сын.', 'У меня есть дочь.', 'У меня есть муж.', 'У меня есть бабушка.'],
      correctAnswer: 1,
      grammarPoint: '~이/가 있어요'
    },
    {
      id: '1b9-4',
      book: '1B',
      unit: '9과',
      type: 'dialogue',
      difficulty: 'medium',
      korean: 'A: 가족이 몇 명이에요? B: 다섯 명이에요. 할머니, 아버지, 어머니, 동생하고 저예요.',
      uzbek: "A: Oilangizda necha kishi bor? B: Besh kishi. Buvi, ota, ona, ukam va men.",
      russian: 'A: Сколько человек в вашей семье? B: Пять. Бабушка, папа, мама, младший брат и я.',
      english: 'A: How many people are in your family? B: Five. Grandmother, father, mother, younger brother, and me.',
      options: ['Oilada uch kishi bor.', 'Oilada besh kishi bor.', 'Oilada faqat ota-ona bor.', 'Oilada yetti kishi bor.'],
      optionsEn: ['There are three people in the family.', 'There are five people in the family.', 'Only the parents are in the family.', 'There are seven people in the family.'],
      optionsRu: ['В семье три человека.', 'В семье пять человек.', 'В семье только родители.', 'В семье семь человек.'],
      correctAnswer: 1,
      grammarPoint: 'Counters: ~명'
    },
    {
      id: '1b9-5',
      book: '1B',
      unit: '9과',
      type: 'fill-blank',
      difficulty: 'hard',
      korean: '저는 ______이 있어요.',
      uzbek: 'Mening ______ bor.',
      russian: 'У меня есть ______.',
      english: 'I have ______.',
      options: ['아들', '사과', '학교', '책'],
      correctAnswer: 0,
      grammarPoint: '아들/딸'
    }
  ],
  '10과': [
    {
      id: '1b10-1',
      book: '1B',
      unit: '10과',
      type: 'word-recognition',
      difficulty: 'easy',
      korean: '아침',
      uzbek: 'ertalab',
      russian: 'утро',
      english: 'morning',
      options: ['ertalab', 'kechqurun', 'tun', 'kunduzi'],
      optionsEn: ['morning', 'evening', 'night', 'daytime'],
      optionsRu: ['утро', 'вечер', 'ночь', 'днём'],
      correctAnswer: 0,
      grammarPoint: 'Time of day'
    },
    {
      id: '1b10-2',
      book: '1B',
      unit: '10과',
      type: 'sentence-comprehension',
      difficulty: 'easy',
      korean: '저는 아침에 일어나요.',
      uzbek: "Men ertalab uyg'onaman.",
      russian: 'Я просыпаюсь утром.',
      english: 'I wake up in the morning.',
      options: ["Men kechqurun uyg'onaman.", "Men ertalab uyg'onaman.", 'Men tun bo\'yi uxlayman.', 'Men tushlik qilaman.'],
      optionsEn: ['I wake up in the evening.', 'I wake up in the morning.', 'I sleep all night.', 'I eat lunch.'],
      optionsRu: ['Я просыпаюсь вечером.', 'Я просыпаюсь утром.', 'Я сплю всю ночь.', 'Я обедаю.'],
      correctAnswer: 1,
      grammarPoint: 'Time + action: ~에'
    },
    {
      id: '1b10-3',
      book: '1B',
      unit: '10과',
      type: 'dialogue',
      difficulty: 'medium',
      korean: 'A: 몇 시에 회사에 가요? B: 아침 일곱 시에 가요. 버스를 타요.',
      uzbek: "A: Ishxonaga soat nechada borasiz? B: Ertalab soat yettida boraman. Avtobusga minaman.",
      russian: 'A: Во сколько вы идёте на работу? B: В семь утра. Еду на автобусе.',
      english: 'A: What time do you go to the office? B: At 7 a.m. I take the bus.',
      options: ['U ishga kechqurun boradi.', 'U ishga ertalab soat yettida boradi.', 'U ishga piyoda boradi.', 'U ishga poyezdda boradi.'],
      optionsEn: ['He goes to work in the evening.', 'He goes to work at 7 a.m.', 'He walks to work.', 'He goes to work by train.'],
      optionsRu: ['Он ходит на работу вечером.', 'Он ходит на работу в семь утра.', 'Он ходит на работу пешком.', 'Он ездит на работу на поезде.'],
      correctAnswer: 1,
      grammarPoint: 'Schedule + transport'
    },
    {
      id: '1b10-4',
      book: '1B',
      unit: '10과',
      type: 'fill-blank',
      difficulty: 'medium',
      korean: '저는 저녁에 ______.',
      uzbek: 'Men kechqurun ______.',
      russian: 'Вечером я ______.',
      english: 'In the evening, I ______.',
      options: ['청소해요', '가요', '해요', '읽어요'],
      correctAnswer: 0,
      grammarPoint: 'Daily routine'
    },
    {
      id: '1b10-5',
      book: '1B',
      unit: '10과',
      type: 'word-recognition',
      difficulty: 'hard',
      korean: '전화해요',
      uzbek: 'telefon qilaman',
      russian: 'звоню',
      english: 'call',
      options: ['telefon qilaman', 'kir yuvaman', 'ovqat pishiraman', 'uy tozalayman'],
      optionsEn: ['call', 'do laundry', 'cook', 'clean'],
      optionsRu: ['звоню', 'стираю', 'готовлю', 'убираю'],
      correctAnswer: 0,
      grammarPoint: 'Action verbs'
    }
  ],
  '11과': [
    {
      id: '1b11-1',
      book: '1B',
      unit: '11과',
      type: 'word-recognition',
      difficulty: 'easy',
      korean: '머리',
      uzbek: 'bosh',
      russian: 'голова',
      english: 'head',
      options: ["bosh", "qo'l", "oyoq", "ko'z"],
      optionsEn: ['head', 'hand', 'foot', 'eye'],
      optionsRu: ['голова', 'рука', 'нога/ступня', 'глаз'],
      correctAnswer: 0,
      grammarPoint: 'Body parts'
    },
    {
      id: '1b11-2',
      book: '1B',
      unit: '11과',
      type: 'sentence-comprehension',
      difficulty: 'easy',
      korean: '머리가 아파요.',
      uzbek: "Boshim og'riyapti.",
      russian: 'У меня болит голова.',
      english: 'I have a headache.',
      options: ["Qornim og'riyapti.", "Boshim og'riyapti.", "Ko'zim og'riyapti.", "Belim og'riyapti."],
      optionsEn: ['My stomach hurts.', 'I have a headache.', 'My eye hurts.', 'My waist hurts.'],
      optionsRu: ['У меня болит живот.', 'У меня болит голова.', 'У меня болит глаз.', 'У меня болит поясница.'],
      correctAnswer: 1,
      grammarPoint: '~이/가 아파요'
    },
    {
      id: '1b11-3',
      book: '1B',
      unit: '11과',
      type: 'dialogue',
      difficulty: 'medium',
      korean: 'A: 어디가 아파요? B: 목이 아파요. 기침도 해요.',
      uzbek: "A: Qayeringiz og'riyapti? B: Tomog'im og'riyapti. Yo'tal ham bor.",
      russian: 'A: Что у вас болит? B: Горло болит. Ещё кашляю.',
      english: 'A: What hurts? B: My throat hurts. I also cough.',
      options: ["Uning oyog'i og'riyapti.", "Uning tomog'i og'riyapti va yo'talayapti.", "Uning qorni og'riyapti.", 'U sog\'lom.'],
      optionsEn: ['His leg hurts.', 'His throat hurts and he coughs.', 'His stomach hurts.', 'He is healthy.'],
      optionsRu: ['У него болит нога.', 'У него болит горло и он кашляет.', 'У него болит живот.', 'Он здоров.'],
      correctAnswer: 1,
      grammarPoint: 'Health expressions'
    },
    {
      id: '1b11-4',
      book: '1B',
      unit: '11과',
      type: 'fill-blank',
      difficulty: 'medium',
      korean: '기침이 ______.',
      uzbek: 'Yo\'tal ______.',
      russian: 'Кашель ______.',
      english: 'I ______ (cough).',
      options: ['나요', '가요', '봐요', '있어요'],
      correctAnswer: 0,
      grammarPoint: 'Symptoms: ~이/가 나요'
    },
    {
      id: '1b11-5',
      book: '1B',
      unit: '11과',
      type: 'sentence-comprehension',
      difficulty: 'hard',
      korean: '목이 아파서 병원에 가요.',
      uzbek: "Tomog'im og'rigani uchun shifoxonaga boraman.",
      russian: 'Потому что болит горло, я иду в больницу.',
      english: 'Because my throat hurts, I go to the hospital.',
      options: [
        "Tomog'im og'rigani uchun shifoxonaga boraman.",
        "Men sog'lomman, shifoxonaga bormayman.",
        'Men ishxonaga boraman.',
        'Men kutubxonaga boraman.'
      ],
      optionsEn: [
        'Because my throat hurts, I go to the hospital.',
        'I am healthy, so I don\'t go to the hospital.',
        'I go to the office.',
        'I go to the library.'
      ],
      optionsRu: [
        'Потому что болит горло, я иду в больницу.',
        'Я здоров, поэтому не иду в больницу.',
        'Я иду в офис.',
        'Я иду в библиотеку.'
      ],
      correctAnswer: 0,
      grammarPoint: 'Reason: ~아서/어서'
    }
  ],
  '12과': [
    {
      id: '1b12-1',
      book: '1B',
      unit: '12과',
      type: 'word-recognition',
      difficulty: 'easy',
      korean: '전화번호',
      uzbek: 'telefon raqam',
      russian: 'номер телефона',
      english: 'phone number',
      options: ['telefon raqam', 'pasport', 'taksi', 'mehmonxona'],
      optionsEn: ['phone number', 'passport', 'taxi', 'hotel'],
      optionsRu: ['номер телефона', 'паспорт', 'такси', 'отель'],
      correctAnswer: 0,
      grammarPoint: 'Phone vocabulary'
    },
    {
      id: '1b12-2',
      book: '1B',
      unit: '12과',
      type: 'sentence-comprehension',
      difficulty: 'easy',
      korean: '문자를 보냈어요.',
      uzbek: "SMS jo'natdim.",
      russian: 'Я отправил(а) сообщение.',
      english: 'I sent a text message.',
      options: ["SMS oldim.", "SMS jo'natdim.", "Qo'ng'iroq keldi.", "Telefon raqamni yozdim."],
      optionsEn: ['I received a text.', 'I sent a text.', 'I got a call.', 'I wrote down the phone number.'],
      optionsRu: ['Я получил(а) сообщение.', 'Я отправил(а) сообщение.', 'Мне позвонили.', 'Я записал(а) номер телефона.'],
      correctAnswer: 1,
      grammarPoint: 'Past tense: ~았/었어요'
    },
    {
      id: '1b12-3',
      book: '1B',
      unit: '12과',
      type: 'dialogue',
      difficulty: 'medium',
      korean: 'A: 오랜만이에요! B: 네, 오랜만이에요. 잘 지냈어요? A: 네, 잘 지냈어요.',
      uzbek: "A: Ko'rishmaganimizga ancha bo'ldi! B: Ha, ancha bo'ldi. Yaxshimisan? A: Ha, yaxshiman.",
      russian: 'A: Давно не виделись! B: Да, давно. Как дела? A: Хорошо.',
      english: 'A: Long time no see! B: Yes, long time. How have you been? A: I\'ve been well.',
      options: ["Ular birinchi marta uchrashishmoqda.", "Ular uzoq vaqtdan keyin ko'rishishyapti.", 'Ular telefonda janjallashyapti.', 'Ular yo\'lda adashyapti.'],
      optionsEn: ['They are meeting for the first time.', 'They are meeting after a long time.', 'They are arguing on the phone.', 'They are lost on the road.'],
      optionsRu: ['Они встречаются впервые.', 'Они встречаются после долгого времени.', 'Они ругаются по телефону.', 'Они заблудились.'],
      correctAnswer: 1,
      grammarPoint: '오랜만이에요'
    },
    {
      id: '1b12-4',
      book: '1B',
      unit: '12과',
      type: 'fill-blank',
      difficulty: 'medium',
      korean: '좀 늦게 ______.',
      uzbek: 'Biroz kech ______.',
      russian: 'Я немного поздно ______.',
      english: 'I ______ a little late.',
      options: ['일어났어요', '갔어요', '먹었어요', '봤어요'],
      correctAnswer: 0,
      grammarPoint: '늦게 일어나다'
    },
    {
      id: '1b12-5',
      book: '1B',
      unit: '12과',
      type: 'sentence-comprehension',
      difficulty: 'hard',
      korean: '회의가 있어서 사무실에 늦게 갔어요.',
      uzbek: "Majlis bo'lgani uchun ofisga kech bordim.",
      russian: 'Потому что было совещание, я поздно пошёл(шла) в офис.',
      english: 'Because there was a meeting, I went to the office late.',
      options: [
        "Majlis bo'lgani uchun ofisga kech bordim.",
        "Uxlashim uchun ofisga kech bordim.",
        "Bugun dam oldim, shuning uchun ishga bormadim.",
        "Men do'konga bordim."
      ],
      optionsEn: [
        'Because there was a meeting, I went to the office late.',
        'Because I slept, I went to the office late.',
        'I rested today, so I did not go to work.',
        'I went to a store.'
      ],
      optionsRu: [
        'Потому что было совещание, я поздно пошёл(шла) в офис.',
        'Потому что я спал(а), я поздно пошёл(шла) в офис.',
        'Я сегодня отдыхал(а), поэтому не пошёл(шла) на работу.',
        'Я пошёл(шла) в магазин.'
      ],
      correctAnswer: 0,
      grammarPoint: 'Reason: ~아서/어서'
    }
  ],
  '13과': [
    {
      id: '1b13-1',
      book: '1B',
      unit: '13과',
      type: 'word-recognition',
      difficulty: 'easy',
      korean: '지하철',
      uzbek: 'metro',
      russian: 'метро',
      english: 'subway',
      options: ['metro', 'avtobus', 'poyezd', 'taksi'],
      optionsEn: ['subway', 'bus', 'train', 'taxi'],
      optionsRu: ['метро', 'автобус', 'поезд', 'такси'],
      correctAnswer: 0,
      grammarPoint: 'Transportation'
    },
    {
      id: '1b13-2',
      book: '1B',
      unit: '13과',
      type: 'sentence-comprehension',
      difficulty: 'easy',
      korean: '버스를 타고 가요.',
      uzbek: 'Avtobusga minib boraman.',
      russian: 'Еду на автобусе.',
      english: 'I go by bus.',
      options: ['Piyoda boraman.', 'Avtobusga minib boraman.', 'Samolyotda boraman.', 'Velosiped minaman.'],
      optionsEn: ['I walk.', 'I go by bus.', 'I go by plane.', 'I ride a bicycle.'],
      optionsRu: ['Я иду пешком.', 'Я еду на автобусе.', 'Я лечу на самолёте.', 'Я еду на велосипеде.'],
      correctAnswer: 1,
      grammarPoint: '~을/를 타다'
    },
    {
      id: '1b13-3',
      book: '1B',
      unit: '13과',
      type: 'dialogue',
      difficulty: 'medium',
      korean: 'A: 여기에서 지하철을 갈아타요? B: 네, 2호선으로 갈아타세요.',
      uzbek: "A: Shu yerda metro almashasizmi? B: Ha, 2-yo'nalishga o'ting.",
      russian: 'A: Здесь пересадка на метро? B: Да, сделайте пересадку на линию 2.',
      english: 'A: Do I transfer to the subway here? B: Yes, transfer to Line 2.',
      options: ['Ular qayerda tushish haqida gapirishmoqda.', 'Ular metro almashish haqida gapirishmoqda.', 'Ular avtobus bekati haqida gapirishmoqda.', "Yo'l yopiq haqida gapirishmoqda."],
      optionsEn: ['They are talking about where to get off.', 'They are talking about transferring to the subway.', 'They are talking about a bus stop.', 'They are talking about a road closure.'],
      optionsRu: ['Они говорят о том, где выйти.', 'Они говорят о пересадке в метро.', 'Они говорят об автобусной остановке.', 'Они говорят о закрытой дороге.'],
      correctAnswer: 1,
      grammarPoint: '갈아타다'
    },
    {
      id: '1b13-4',
      book: '1B',
      unit: '13과',
      type: 'fill-blank',
      difficulty: 'medium',
      korean: '여기에서 ______.',
      uzbek: 'Shu yerda ______.',
      russian: 'Здесь ______.',
      english: 'Here, ______.',
      options: ['갈아타요', '자요', '먹어요', '읽어요'],
      correctAnswer: 0,
      grammarPoint: '갈아타요'
    },
    {
      id: '1b13-5',
      book: '1B',
      unit: '13과',
      type: 'sentence-comprehension',
      difficulty: 'hard',
      korean: '지하철역에서 내려서 버스 정류장에 가요.',
      uzbek: "Metro bekatida tushib, avtobus bekatiga boraman.",
      russian: 'Выхожу на станции метро и иду к автобусной остановке.',
      english: 'I get off at the subway station and go to the bus stop.',
      options: [
        "Metro bekatida tushib, avtobus bekatiga boraman.",
        "Metroda qolib, poyezdga o'taman.",
        'Men uyda qolaman.',
        'Men taksida boraman.'
      ],
      optionsEn: [
        'I get off at the subway station and go to the bus stop.',
        'I stay on the subway and transfer to a train.',
        'I stay at home.',
        'I go by taxi.'
      ],
      optionsRu: [
        'Выхожу на станции метро и иду к автобусной остановке.',
        'Остаюсь в метро и пересаживаюсь на поезд.',
        'Я остаюсь дома.',
        'Я еду на такси.'
      ],
      correctAnswer: 0,
      grammarPoint: 'Sequence: ~어서/아서'
    }
  ],
  '14과': [
    {
      id: '1b14-1',
      book: '1B',
      unit: '14과',
      type: 'word-recognition',
      difficulty: 'easy',
      korean: '코트',
      uzbek: 'palto',
      russian: 'пальто',
      english: 'coat',
      options: ['palto', 'shim', 'bosh kiyim', 'yubka'],
      optionsEn: ['coat', 'pants', 'hat', 'skirt'],
      optionsRu: ['пальто', 'брюки', 'шапка', 'юбка'],
      correctAnswer: 0,
      grammarPoint: 'Clothes'
    },
    {
      id: '1b14-2',
      book: '1B',
      unit: '14과',
      type: 'sentence-comprehension',
      difficulty: 'easy',
      korean: '치마가 길어요.',
      uzbek: 'Yubka uzun.',
      russian: 'Юбка длинная.',
      english: 'The skirt is long.',
      options: ['Yubka kalta.', 'Yubka uzun.', 'Palto kichkina.', 'Shim katta.'],
      optionsEn: ['The skirt is short.', 'The skirt is long.', 'The coat is small.', 'The pants are big.'],
      optionsRu: ['Юбка короткая.', 'Юбка длинная.', 'Пальто маленькое.', 'Брюки большие.'],
      correctAnswer: 1,
      grammarPoint: '길어요/짧아요'
    },
    {
      id: '1b14-3',
      book: '1B',
      unit: '14과',
      type: 'dialogue',
      difficulty: 'medium',
      korean: 'A: 이 옷 어때요? B: 조금 커요. 작은 사이즈 있어요?',
      uzbek: "A: Bu kiyim qanday? B: Biroz katta. Kichik o'lchami bormi?",
      russian: 'A: Как эта одежда? B: Немного большая. Есть маленький размер?',
      english: 'A: How is this outfit? B: It\'s a bit big. Do you have a smaller size?',
      options: ['Kiyim juda kichkina.', 'Kiyim biroz katta.', 'Kiyim juda uzun.', 'Kiyim juda arzon.'],
      optionsEn: ['The clothing is very small.', 'The clothing is a bit big.', 'The clothing is very long.', 'The clothing is very cheap.'],
      optionsRu: ['Одежда очень маленькая.', 'Одежда немного большая.', 'Одежда очень длинная.', 'Одежда очень дешёвая.'],
      correctAnswer: 1,
      grammarPoint: 'Size: 커요/작아요'
    },
    {
      id: '1b14-4',
      book: '1B',
      unit: '14과',
      type: 'fill-blank',
      difficulty: 'medium',
      korean: '신발을 ______.',
      uzbek: 'Poyabzal ______.',
      russian: 'Я ______ обувь.',
      english: 'I ______ shoes.',
      options: ['신어요', '입어요', '봐요', '먹어요'],
      correctAnswer: 0,
      grammarPoint: 'Wear: 신어요'
    },
    {
      id: '1b14-5',
      book: '1B',
      unit: '14과',
      type: 'sentence-comprehension',
      difficulty: 'hard',
      korean: '저는 오늘 코트를 입고 운동화를 신었어요.',
      uzbek: 'Men bugun palto kiyib, krasovka kiydim.',
      russian: 'Сегодня я надел(а) пальто и обул(а) кроссовки.',
      english: 'Today I wore a coat and sneakers.',
      options: ['Men bugun palto kiyib, krasovka kiydim.', 'Men bugun yubka kiyib, tufli kiydim.', 'Men bugun hech nima kiymadim.', 'Men bugun kostyum kiydim.'],
      optionsEn: ['Today I wore a coat and sneakers.', 'Today I wore a skirt and shoes.', 'I did not wear anything today.', 'I wore a suit today.'],
      optionsRu: ['Сегодня я надел(а) пальто и обул(а) кроссовки.', 'Сегодня я надел(а) юбку и обувь.', 'Сегодня я ничего не надел(а).', 'Сегодня я надел(а) костюм.'],
      correctAnswer: 0,
      grammarPoint: 'Past tense'
    }
  ],
  '15과': [
    {
      id: '1b15-1',
      book: '1B',
      unit: '15과',
      type: 'word-recognition',
      difficulty: 'easy',
      korean: '여행',
      uzbek: 'sayohat',
      russian: 'путешествие',
      english: 'travel',
      options: ['sayohat', 'ish', 'ovqat', 'kiyim'],
      optionsEn: ['travel', 'work', 'food', 'clothes'],
      optionsRu: ['путешествие', 'работа', 'еда', 'одежда'],
      correctAnswer: 0,
      grammarPoint: 'Travel vocabulary'
    },
    {
      id: '1b15-2',
      book: '1B',
      unit: '15과',
      type: 'sentence-comprehension',
      difficulty: 'easy',
      korean: '비행기 표를 예약했어요.',
      uzbek: 'Samolyot biletini zakaz qildim.',
      russian: 'Я забронировал(а) авиабилет.',
      english: 'I booked a flight ticket.',
      options: ['Men mehmonxona bron qildim.', 'Men samolyot biletini zakaz qildim.', 'Men pul almashtirdim.', 'Men uyga qaytdim.'],
      optionsEn: ['I booked a hotel.', 'I booked a flight ticket.', 'I exchanged money.', 'I returned home.'],
      optionsRu: ['Я забронировал(а) отель.', 'Я забронировал(а) авиабилет.', 'Я обменял(а) деньги.', 'Я вернулся(лась) домой.'],
      correctAnswer: 1,
      grammarPoint: '예약하다'
    },
    {
      id: '1b15-3',
      book: '1B',
      unit: '15과',
      type: 'dialogue',
      difficulty: 'medium',
      korean: 'A: 여행사에 갔어요? B: 네, 비행기 표하고 호텔을 예약했어요.',
      uzbek: "A: Sayohat agentligiga bordingizmi? B: Ha, samolyot bileti va mehmonxonani bron qildim.",
      russian: 'A: Вы ходили в туристическое агентство? B: Да, забронировал(а) билет и отель.',
      english: 'A: Did you go to a travel agency? B: Yes, I booked a flight ticket and a hotel.',
      options: ["U sayohat agentligiga bormagan.", 'U bilet va mehmonxonani bron qilgan.', 'U pul almashtirmagan.', 'U mashina sotib olgan.'],
      optionsEn: ['He did not go to a travel agency.', 'He booked a ticket and a hotel.', 'He did not exchange money.', 'He bought a car.'],
      optionsRu: ['Он не ходил в туристическое агентство.', 'Он забронировал билет и отель.', 'Он не обменял деньги.', 'Он купил машину.'],
      correctAnswer: 1,
      grammarPoint: 'Travel planning'
    },
    {
      id: '1b15-4',
      book: '1B',
      unit: '15과',
      type: 'fill-blank',
      difficulty: 'medium',
      korean: '돈을 ______.',
      uzbek: 'Pulni ______.',
      russian: 'Я ______ деньги.',
      english: 'I ______ money.',
      options: ['바꿔요', '타요', '가요', '읽어요'],
      correctAnswer: 0,
      grammarPoint: '돈을 바꾸다'
    },
    {
      id: '1b15-5',
      book: '1B',
      unit: '15과',
      type: 'sentence-comprehension',
      difficulty: 'hard',
      korean: '여행을 가기 전에 여권을 준비해야 해요.',
      uzbek: 'Sayohatga borishdan oldin pasportni tayyorlash kerak.',
      russian: 'Перед путешествием нужно подготовить паспорт.',
      english: 'Before traveling, you need to prepare your passport.',
      options: [
        'Sayohatga borishdan oldin pasportni tayyorlash kerak.',
        'Sayohatdan keyin pasportni tayyorlash kerak.',
        'Bugun pasport kerak emas.',
        'Sayohatga avtobusda borish kerak.'
      ],
      optionsEn: [
        'Before traveling, you need to prepare your passport.',
        'After traveling, you need to prepare your passport.',
        'You do not need a passport today.',
        'You need to travel by bus.'
      ],
      optionsRu: [
        'Перед путешествием нужно подготовить паспорт.',
        'После путешествия нужно подготовить паспорт.',
        'Сегодня паспорт не нужен.',
        'Нужно путешествовать на автобусе.'
      ],
      correctAnswer: 0,
      grammarPoint: '~기 전에'
    }
  ]
};

 type FlashcardsDataEntry = {
   book: string;
   unit: string;
   cards: Array<{
     korean: string;
     uzbek: string;
     russian?: string;
     english?: string;
   }>;
 };

 const flashcardsEntries = flashcardsData as unknown as FlashcardsDataEntry[];

 const getFlashcardsForBookUnit = (book: string, unit: string) => {
   const entry = flashcardsEntries.find((e) => e?.book === book && e?.unit === unit);
   return Array.isArray(entry?.cards) ? entry.cards : [];
 };

 const pickUnique = <T,>(items: T[], count: number, exclude: Set<T> = new Set<T>()): T[] => {
   const out: T[] = [];
   for (const it of items) {
     if (exclude.has(it)) continue;
     if (out.includes(it)) continue;
     out.push(it);
     if (out.length >= count) break;
   }
   return out;
 };

 const normalizeMeaning = (c: { korean: string; uzbek?: string; english?: string; russian?: string }) => {
   const uz = (c.uzbek || '').trim() || c.english?.trim() || c.russian?.trim() || c.korean;
   const en = (c.english || '').trim() || uz;
   const ru = (c.russian || '').trim() || uz;
   return { uz, en, ru };
 };

 const generateListeningExercisesFromFlashcards = (book: string, unit: string): ListeningExercise[] => {
   const cards = getFlashcardsForBookUnit(book, unit)
     .map((c) => ({ ...c, korean: String(c.korean ?? '').trim() }))
     .filter((c) => c.korean.length > 0);

   if (cards.length === 0) return [];

   const bankUz = cards.map((c) => normalizeMeaning(c).uz);
   const bankEn = cards.map((c) => normalizeMeaning(c).en);
   const bankRu = cards.map((c) => normalizeMeaning(c).ru);
   const bankKo = cards.map((c) => c.korean);

   const exercises: ListeningExercise[] = [];

   // Generate 12-15 word recognition exercises
   const wordCount = Math.min(15, Math.max(12, cards.length));
   for (let i = 0; i < wordCount; i++) {
     const c = cards[i % cards.length];
     const m = normalizeMeaning(c);

     const distractorsUz = pickUnique(bankUz, 3, new Set([m.uz]));
     const distractorsEn = pickUnique(bankEn, 3, new Set([m.en]));
     const distractorsRu = pickUnique(bankRu, 3, new Set([m.ru]));

     const options = [m.uz, ...distractorsUz].slice(0, 4);
     const optionsEn = [m.en, ...distractorsEn].slice(0, 4);
     const optionsRu = [m.ru, ...distractorsRu].slice(0, 4);

     exercises.push({
       id: `gen-${book}-${unit}-wr-${i + 1}`,
       book,
       unit,
       type: 'word-recognition',
       difficulty: i < 8 ? 'easy' : i < 12 ? 'medium' : 'hard',
       korean: c.korean,
       uzbek: m.uz,
       english: m.en,
       russian: m.ru,
       options,
       optionsEn,
       optionsRu,
       correctAnswer: 0,
       grammarPoint: 'Vocabulary recognition'
     });
   }

   // Generate 8-10 sentence comprehension exercises
   const sentenceCount = Math.min(10, Math.max(8, cards.length));
   for (let i = 0; i < sentenceCount; i++) {
     const c = cards[(i + wordCount) % cards.length];
     const m = normalizeMeaning(c);

     const distractorsUz = pickUnique(bankUz, 3, new Set([m.uz]));
     const distractorsEn = pickUnique(bankEn, 3, new Set([m.en]));
     const distractorsRu = pickUnique(bankRu, 3, new Set([m.ru]));

     exercises.push({
       id: `gen-${book}-${unit}-sc-${i + 1}`,
       book,
       unit,
       type: 'sentence-comprehension',
       difficulty: i < 4 ? 'medium' : 'hard',
       korean: `${c.korean}`,
       uzbek: m.uz,
       english: m.en,
       russian: m.ru,
       options: [m.uz, ...distractorsUz].slice(0, 4),
       optionsEn: [m.en, ...distractorsEn].slice(0, 4),
       optionsRu: [m.ru, ...distractorsRu].slice(0, 4),
       correctAnswer: 0,
       grammarPoint: 'Meaning selection'
     });
   }

   // Generate 6-8 fill-in-the-blank exercises
   const blankCount = Math.min(8, Math.max(6, bankKo.length));
   for (let i = 0; i < blankCount; i++) {
     const answerKo = bankKo[(i * 2) % bankKo.length];
     const m = normalizeMeaning(cards.find((x) => x.korean === answerKo) ?? { korean: answerKo, uzbek: '' });
     const distractorsKo = pickUnique(bankKo, 3, new Set([answerKo]));

     const templates = [
       { ko: `저는 ______을/를 공부해요.`, uz: `Men ______ni o'rganaman.`, en: `I study ______.`, ru: `Я изучаю ______.` },
       { ko: `저는 ______을/를 좋아해요.`, uz: `Men ______ni yoqtiraman.`, en: `I like ______.`, ru: `Мне нравится ______.` },
       { ko: `저는 ______을/를 먹어요.`, uz: `Men ______ni yeyman.`, en: `I eat ______.`, ru: `Я ем ______.` },
       { ko: `저는 ______을/를 봐요.`, uz: `Men ______ni ko'raman.`, en: `I watch ______.`, ru: `Я смотрю ______.` }
     ];
     
     const template = templates[i % templates.length];
     
     exercises.push({
       id: `gen-${book}-${unit}-fb-${i + 1}`,
       book,
       unit,
       type: 'fill-blank',
       difficulty: i < 3 ? 'medium' : 'hard',
       korean: template.ko,
       uzbek: template.uz,
       english: template.en,
       russian: template.ru,
       options: [answerKo, ...distractorsKo].slice(0, 4),
       correctAnswer: 0,
       grammarPoint: 'Fill in the blank'
     });
   }

   // Generate 2-3 dialogue exercises
   const dialogueCount = Math.min(3, cards.length);
   for (let i = 0; i < dialogueCount; i++) {
     const d1 = cards[i % cards.length];
     const d2 = cards[(i + 1) % cards.length];
     const d1m = normalizeMeaning(d1);
     const d2m = normalizeMeaning(d2);
     
     const dialogues = [
       {
         ko: `A: 이거 뭐예요? B: ${d1.korean}예요.\nA: 그럼 이건요? B: ${d2.korean}예요.`,
         uz: `A: Bu nima? B: ${d1m.uz}.\nA: Unda bu-chi? B: ${d2m.uz}.`,
         en: `A: What is this? B: It's ${d1m.en}.\nA: Then what about this? B: It's ${d2m.en}.`,
         ru: `A: Что это? B: Это ${d1m.ru}.\nA: А это? B: Это ${d2m.ru}.`,
         context: 'Ular narsalarni so\'rayapti va nomini aytyapti.',
         contextEn: 'They ask what something is and name it.',
         contextRu: 'Они спрашивают, что это, и называют предмет.',
         grammar: '뭐예요? / ~예요'
       },
       {
         ko: `A: ${d1.korean}이/가 있어요? B: 네, 있어요.\nA: ${d2.korean}은/는요? B: 없어요.`,
         uz: `A: ${d1m.uz} bormi? B: Ha, bor.\nA: ${d2m.uz}chi? B: Yo'q.`,
         en: `A: Do you have ${d1m.en}? B: Yes, I do.\nA: What about ${d2m.en}? B: I don't have it.`,
         ru: `A: У вас есть ${d1m.ru}? B: Да, есть.\nA: А ${d2m.ru}? B: Нет.`,
         context: 'Bor-yo\'q mavjudligi haqida su\'rash.',
         contextEn: 'Asking about existence.',
         contextRu: 'Спрашивают о наличии.',
         grammar: '~이/가 있어요?'
       },
       {
         ko: `A: ${d1.korean}을/를 좋아해요? B: 네, 좋아해요.\nA: ${d2.korean}은/는요? B: 싫어해요.`,
         uz: `A: ${d1m.uz}ni yoqtirasizmi? B: Ha, yoqtiraman.\nA: ${d2m.uz}chi? B: Yoqtirmayman.`,
         en: `A: Do you like ${d1m.en}? B: Yes, I like it.\nA: What about ${d2m.en}? B: I dislike it.`,
         ru: `A: Вам нравится ${d1m.ru}? B: Да, нравится.\nA: А ${d2m.ru}? B: Не нравится.`,
         context: 'Yoqtirish-yoqtirmaslik haqida su\'rash.',
         contextEn: 'Asking about likes and dislikes.',
         contextRu: 'Спрашивают о предпочтениях.',
         grammar: '~을/를 좋아해요?'
       }
     ];
     
     const dialogue = dialogues[i % dialogues.length];
     
     exercises.push({
       id: `gen-${book}-${unit}-dlg-${i + 1}`,
       book,
       unit,
       type: 'dialogue',
       difficulty: i === 0 ? 'medium' : 'hard',
       korean: dialogue.ko,
       uzbek: dialogue.uz,
       english: dialogue.en,
       russian: dialogue.ru,
       options: [
         dialogue.context,
         'Ular ob-havo haqida gapiryapti.',
         'Ular vaqt haqida gapiryapti.',
         'Ular yo\'l so\'rayapti.'
       ],
       optionsEn: [
         dialogue.contextEn,
         'They talk about weather.',
         'They talk about time.',
         'They ask for directions.'
       ],
       optionsRu: [
         dialogue.contextRu,
         'Они говорят о погоде.',
         'Они говорят о времени.',
         'Они спрашивают дорогу.'
       ],
       correctAnswer: 0,
       grammarPoint: dialogue.grammar
     });
   }

   return exercises;
 };

export const getListeningExercisesByUnit = (unit: string, book: string = '1A'): ListeningExercise[] => {
  const list = (listeningExercises[unit] || []).filter((ex) => (ex.book ?? '1A') === book);
  if (list.length > 0) return list;
  return generateListeningExercisesFromFlashcards(book, unit);
};

export const getAllUnits = (book?: string): string[] => {
  const units = new Set<string>();

  for (const u of Object.keys(listeningExercises)) {
    if (!book) {
      units.add(u);
      continue;
    }
    const list = listeningExercises[u] || [];
    if (list.some((ex) => (ex.book ?? '1A') === book)) units.add(u);
  }

  for (const entry of flashcardsEntries) {
    if (!entry || !entry.book || !entry.unit) continue;
    if (!book || entry.book === book) units.add(entry.unit);
  }

  return Array.from(units).sort((a, b) => {
    const na = a === 'Hangul' ? 0 : Number(a.replace(/\D/g, ''));
    const nb = b === 'Hangul' ? 0 : Number(b.replace(/\D/g, ''));
    const ka = Number.isFinite(na) ? na : Number.MAX_SAFE_INTEGER;
    const kb = Number.isFinite(nb) ? nb : Number.MAX_SAFE_INTEGER;
    return ka - kb;
  });
};

export const getAllBooks = (): string[] => {
  const books = new Set<string>();
  for (const unit of Object.keys(listeningExercises)) {
    const list = listeningExercises[unit] || [];
    for (const ex of list) {
      books.add(ex.book ?? '1A');
    }
  }

  for (const entry of flashcardsEntries) {
    if (entry?.book) books.add(entry.book);
  }

  return Array.from(books).sort();
};
