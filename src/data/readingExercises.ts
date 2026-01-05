﻿// 서울대 한국어 1A (Seoul National University Korean 1A) Reading Exercises
// Beginner level - 8 units + Hangul introduction

export interface ReadingExercise {
  id: string;
  book?: string;
  unit: string;
  type: 'short-passage' | 'comprehension' | 'true-false' | 'matching';
  difficulty: 'easy' | 'medium' | 'hard';
  korean: string;
  uzbek: string;
  english: string;
  russian?: string;
  questions?: {
    id: string;
    question: string;
    questionEn?: string;
    questionRu?: string;
    options?: string[];
    optionsEn?: string[];
    optionsRu?: string[];
    correctAnswer: number | boolean;
    explanation?: string;
    explanationEn?: string;
    explanationRu?: string;
  }[];
  grammarPoint?: string;
  vocabulary?: string[];
}

export const readingExercises: Record<string, ReadingExercise[]> = {
  'Hangul': [
    {
      id: 'h1',
      unit: 'Hangul',
      type: 'short-passage',
      difficulty: 'easy',
      korean: '안녕하세요. 저는 김민준입니다. 저는 한국 사람입니다.',
      uzbek: 'Assalomu alaykum. Men Kim Minjunman. Men koreyslikman.',
      english: 'Hello. I am Kim Minjun. I am Korean.',
      questions: [
        {
          id: 'h1-q1',
          question: 'Kim Minjun qaysi mamlakatdan?',
          options: ['Koreyadan', 'O\'zbekistondan', 'Yaponiyadan', 'Xitoydan'],
          correctAnswer: 0,
          explanation: 'Matnda "저는 한국 사람입니다" (Men koreyslikman) deyilgan.'
        },
        {
          id: 'h1-q2',
          question: 'Uning ismi nima?',
          options: ['Kim Minjun', 'Lee Jihyun', 'Park Sojin', 'Choi Yuna'],
          correctAnswer: 0,
          explanation: 'Matnda "저는 김민준입니다" (Men Kim Minjunman) deyilgan.'
        }
      ],
      grammarPoint: 'Introduction: ~입니다',
      vocabulary: ['안녕하세요', '저는', '한국 사람', '입니다']
    },
    {
      id: 'h2',
      unit: 'Hangul',
      type: 'true-false',
      difficulty: 'easy',
      korean: '안녕하세요. 저는 학생입니다. 저는 스무 살입니다.',
      uzbek: 'Assalomu alaykum. Men talabaman. Men yigirma yoshman.',
      english: 'Hello. I am a student. I am 20 years old.',
      questions: [
        {
          id: 'h2-q1',
          question: 'U o\'qituvchi.',
          correctAnswer: false,
          explanation: 'U talaba, chunki "저는 학생입니다" deyilgan.'
        },
        {
          id: 'h2-q2',
          question: 'U yigirma yoshda.',
          correctAnswer: true,
          explanation: 'Matnda "저는 스무 살입니다" (Men yigirma yoshman) deyilgan.'
        }
      ],
      grammarPoint: 'Basic statements: ~입니다',
      vocabulary: ['학생', '스무 살']
    }
  ],
  '1과': [
    {
      id: '1-1',
      unit: '1과',
      type: 'short-passage',
      difficulty: 'easy',
      korean: '안녕하세요. 제 이름은 마리아입니다. 저는 미국 사람입니다. 만나서 반갑습니다.',
      uzbek: 'Assalomu alaykum. Mening ismim Mariya. Men AQSHlikman. Tanishganimdan xursandman.',
      english: 'Hello. My name is Maria. I am American. Nice to meet you.',
      questions: [
        {
          id: '1-1-q1',
          question: 'Mariya qayerdan?',
          options: ['Koreyadan', 'AQSHdan', 'Yaponiyadan', 'Xitoydan'],
          correctAnswer: 1,
          explanation: 'Matnda "저는 미국 사람입니다" (Men AQSHlikman) deyilgan.'
        },
        {
          id: '1-1-q2',
          question: 'U qanday so\'z bilan tanishtiriladi?',
          options: ['Xayr', 'Rahmat', 'Tanishganimdan xursandman', 'Kechirasiz'],
          correctAnswer: 2,
          explanation: 'U "만나서 반갑습니다" (Tanishganimdan xursandman) deydi.'
        }
      ],
      grammarPoint: 'Introduction and greeting',
      vocabulary: ['이름', '미국 사람', '만나서 반갑습니다']
    },
    {
      id: '1-2',
      unit: '1과',
      type: 'comprehension',
      difficulty: 'medium',
      korean: 'A: 안녕하세요? B: 네, 안녕하세요. A: 제 이름은 토니입니다. B: 만나서 반갑습니다. A: 저는 캐나다 사람입니다. B: 아, 그래요?',
      uzbek: 'A: Assalomu alaykum? B: Ha, assalomu alaykum. A: Mening ismim Toni. B: Tanishganimdan xursandman. A: Men Kanadalikman. B: Ah, shundaymi?',
      english: 'A: Hello? B: Yes, hello. A: My name is Tony. B: Nice to meet you. A: I am Canadian. B: Oh, really?',
      questions: [
        {
          id: '1-2-q1',
          question: 'Toni qaysi mamlakatdan?',
          options: ['AQSH', 'Koreya', 'Kanada', 'Yaponiya'],
          correctAnswer: 2,
          explanation: 'Toni "저는 캐나다 사람입니다" (Men Kanadalikman) deydi.'
        },
        {
          id: '1-2-q2',
          question: 'Ular qanday tartibda tanishishadi?',
          options: [
            'Ism, millat, salomlashish',
            'Millat, ism, salomlashish',
            'Salomlashish, ism, millat',
            'Ism, salomlashish, millat'
          ],
          correctAnswer: 3,
          explanation: 'Ular avval ismlarini, keyin salomlashishadi, so\'ngra millatini aytishadi.'
        }
      ],
      grammarPoint: 'Dialogue flow and introduction sequence',
      vocabulary: ['캐나다 사람', '아, 그래요?']
    }
  ],
  '2과': [
    {
      id: '2-1',
      unit: '2과',
      type: 'short-passage',
      difficulty: 'easy',
      korean: '저는 스물세 살입니다. 저는 대학교 학생입니다. 저는 한국어를 공부해요.',
      uzbek: 'Men yigirma uch yoshman. Men universitet talabaman. Men koreys tilini o\'rganaman.',
      english: 'I am 23 years old. I am a university student. I study Korean.',
      questions: [
        {
          id: '2-1-q1',
          question: 'U necha yoshda?',
          options: ['Yigirma', 'Yigirma bir', 'Yigirma uch', 'Yigirma to\'rt'],
          correctAnswer: 2,
          explanation: 'Matnda "저는 스물세 살입니다" (Men yigirma uch yoshman) deyilgan.'
        },
        {
          id: '2-1-q2',
          question: 'U qayerda o\'qiydi?',
          options: ['Maktab', 'Universitet', 'Kollej', 'Akademiya'],
          correctAnswer: 1,
          explanation: 'U "대학교 학생입니다" (Universitet talabaman) deydi.'
        }
      ],
      grammarPoint: 'Age and education: ~살입니다, ~학생입니다',
      vocabulary: ['스물세 살', '대학교 학생', '공부해요']
    },
    {
      id: '2-2',
      unit: '2과',
      type: 'true-false',
      difficulty: 'medium',
      korean: '저는 스무 살이 아니에요. 스물다섯 살이에요. 저는 고등학교 학생이에요.',
      uzbek: 'Men yigirma yosh emasman. Yigirma besh yoshman. Men o\'rta maktab o\'quvchisiman.',
      english: 'I\'m not 20. I\'m 25. I am a high school student.',
      questions: [
        {
          id: '2-2-q1',
          question: 'U yigirma yoshda.',
          correctAnswer: false,
          explanation: 'U yigirma yosh emas, balki yigirma besh yoshda.'
        },
        {
          id: '2-2-q2',
          question: 'U universitet talabasi.',
          correctAnswer: false,
          explanation: 'U o\'rta maktab o\'quvchisi, universitet talabasi emas.'
        }
      ],
      grammarPoint: 'Negation: ~이/가 아니에요',
      vocabulary: ['스무 살', '스물다섯 살', '고등학교 학생']
    }
  ],
  '3과': [
    {
      id: '3-1',
      unit: '3과',
      type: 'comprehension',
      difficulty: 'medium',
      korean: '저는 회사원이에요. 저는 아침에 일을 해요. 저는 저녁에 집에 가요. 저는 밤에 잠을 자요.',
      uzbek: 'Men kompaniya xodimiman. Men ertalab ish qilaman. Men kech uyga boraman. Men kechasi uxlayman.',
      english: 'I am an office worker. I work in the morning. I go home in the evening. I sleep at night.',
      questions: [
        {
          id: '3-1-q1',
          question: 'U qachon ishlaydi?',
          options: ['Kechada', 'Tunda', 'Ertalab', 'Peshinda'],
          correctAnswer: 2,
          explanation: 'Matnda "저는 아침에 일을 해요" (Men ertalab ish qilaman) deyilgan.'
        },
        {
          id: '3-1-q2',
          question: 'U qachon uyga boradi?',
          options: ['Ertalab', 'Peshin', 'Kech', 'Tun'],
          correctAnswer: 2,
          explanation: 'Matnda "저는 저녁에 집에 가요" (Men kech uyga boraman) deyilgan.'
        }
      ],
      grammarPoint: 'Daily routine and time expressions',
      vocabulary: ['회사원', '아침', '저녁', '밤']
    },
    {
      id: '3-2',
      unit: '3과',
      type: 'matching',
      difficulty: 'hard',
      korean: 'A: 무슨 일을 해요? B: 저는 선생님이에요. A: 어디에서 가르쳐요? B: 저는 대학교에서 가르쳐요. A: 무엇을 가르쳐요? B: 저는 한국어를 가르쳐요.',
      uzbek: 'A: Qaysi ish bilan shug\'ullanasiz? B: Men o\'qituvchiman. A: Qayerda o\'qitasiz? B: Men universitetda o\'qitaman. A: Nima o\'qitasiz? B: Men koreys tilini o\'qitaman.',
      english: 'A: What do you do? B: I am a teacher. A: Where do you teach? B: I teach at a university. A: What do you teach? B: I teach Korean.',
      questions: [
        {
          id: '3-2-q1',
          question: 'U qaysi kasbda?',
          options: ['Shifokor', 'O\'qituvchi', 'Muhandis', 'Huquqshunos'],
          correctAnswer: 1,
          explanation: 'U "저는 선생님이에요" (Men o\'qituvchiman) deydi.'
        },
        {
          id: '3-2-q2',
          question: 'U qayerda ishlaydi?',
          options: ['Maktab', 'Universitet', 'Kasalxona', 'Bank'],
          correctAnswer: 1,
          explanation: 'U "대학교에서 가르쳐요" (Universitetda o\'qitaman) deydi.'
        },
        {
          id: '3-2-q3',
          question: 'U nima o\'qitadi?',
          options: ['Ingliz tili', 'Matematika', 'Koreys tili', 'Fizika'],
          correctAnswer: 2,
          explanation: 'U "한국어를 가르쳐요" (Koreys tilini o\'qitaman) deydi.'
        }
      ],
      grammarPoint: 'Occupation and workplace questions',
      vocabulary: ['선생님', '대학교', '가르쳐요', '한국어']
    }
  ],
  '4과': [
    {
      id: '4-1',
      unit: '4과',
      type: 'short-passage',
      difficulty: 'easy',
      korean: '지금은 아홉 시입니다. 수업 시간입니다. 학생들이 교실에 있어요. 선생님도 교실에 있어요.',
      uzbek: 'Hozir soat to\'qqiz. Dars vaqti. O\'quvchilar darsxonada. O\'qituvchi ham darsxonada.',
      english: 'It is 9 o\'clock now. It is class time. The students are in the classroom. The teacher is also in the classroom.',
      questions: [
        {
          id: '4-1-q1',
          question: 'Hozir soat nechda?',
          options: ['Sakkiz', 'To\'qqiz', 'O\'n', 'O\'n bir'],
          correctAnswer: 1,
          explanation: 'Matnda "지금은 아홉 시입니다" (Hozir soat to\'qqiz) deyilgan.'
        },
        {
          id: '4-1-q2',
          question: 'Qayerda dars bormoqda?',
          options: ['Kutubxona', 'Darsxona', 'Stadion', 'Kafeteriya'],
          correctAnswer: 1,
          explanation: 'Matnda "학생들이 교실에 있어요" (O\'quvchilar darsxonada) deyilgan.'
        }
      ],
      grammarPoint: 'Time and location: ~시, ~에 있어요',
      vocabulary: ['아홉 시', '수업 시간', '교실', '학생']
    },
    {
      id: '4-2',
      unit: '4과',
      type: 'comprehension',
      difficulty: 'medium',
      korean: '수업은 아홉 시에 시작해요. 열 시에 끝나요. 점심 시간은 열두 시입니다. 오후 수업은 두 시에 시작해요.',
      uzbek: 'Dars soat to\'qqizda boshlanadi. Soat o\'nda tugaydi. Tushlik vaqti soat o\'n ikkida. Tushki dars soat ikkida boshlanadi.',
      english: 'Class starts at 9 o\'clock. It ends at 10 o\'clock. Lunch time is 12 o\'clock. The afternoon class starts at 2 o\'clock.',
      questions: [
        {
          id: '4-2-q1',
          question: 'Tushlik vaqti qachon?',
          options: ['Soat o\'n', 'Soat o\'n bir', 'Soat o\'n ikki', 'Soat o\'n uch'],
          correctAnswer: 2,
          explanation: 'Matnda "점심 시간은 열두 시입니다" (Tushlik vaqti soat o\'n ikkida) deyilgan.'
        },
        {
          id: '4-2-q2',
          question: 'Tushki dars qachon boshlanadi?',
          options: ['Soat bir', 'Soat ikki', 'Soat uch', 'Soat to\'rt'],
          correctAnswer: 1,
          explanation: 'Matnda "오후 수업은 두 시에 시작해요" (Tushki dars soat ikkida boshlanadi) deyilgan.'
        }
      ],
      grammarPoint: 'Schedule and time expressions',
      vocabulary: ['시작해요', '끝나요', '점심 시간', '오후 수업']
    }
  ],
  '5과': [
    {
      id: '5-1',
      unit: '5과',
      type: 'true-false',
      difficulty: 'easy',
      korean: '오늘은 월요일입니다. 내일은 화요일입니다. 모레는 수요일입니다.',
      uzbek: 'Bugun dushanba. Ertak seshanba. Uch kun chorshanba.',
      english: 'Today is Monday. Tomorrow is Tuesday. The day after tomorrow is Wednesday.',
      questions: [
        {
          id: '5-1-q1',
          question: 'Bugun seshanba.',
          correctAnswer: false,
          explanation: 'Bugun dushanba, seshanba emas.'
        },
        {
          id: '5-1-q2',
          question: 'Ertak seshanba.',
          correctAnswer: true,
          explanation: 'Matnda "내일은 화요일입니다" (Ertak seshanba) deyilgan.'
        }
      ],
      grammarPoint: 'Days of the week: ~요일입니다',
      vocabulary: ['월요일', '화요일', '수요일', '내일', '모레']
    },
    {
      id: '5-2',
      unit: '5과',
      type: 'comprehension',
      difficulty: 'medium',
      korean: '저는 월요일과 수요일에 한국어 수업이 있어요. 화요일과 목요일에 영어 수업이 있어요. 금요일에는 수업이 없어요.',
      uzbek: 'Men dushanba va chorshanba kunlari koreys tili darslarim bor. Seshanba va payshanba kunlari ingliz tili darslarim bor. Juma kuni darsim yo\'q.',
      english: 'I have Korean class on Monday and Wednesday. I have English class on Tuesday and Thursday. I have no class on Friday.',
      questions: [
        {
          id: '5-2-q1',
          question: 'U qaysi kunlari koreys tilini o\'rganadi?',
          options: ['Seshanba va payshanba', 'Dushanba va chorshanba', 'Chorshanba va juma', 'Juma va shanba'],
          correctAnswer: 1,
          explanation: 'Matnda "월요일과 수요일에 한국어 수업이 있어요" (Dushanba va chorshanba kunlari koreys tili darslarim bor) deyilgan.'
        },
        {
          id: '5-2-q2',
          question: 'Juma kuni nima bor?',
          options: ['Koreys tili darsi', 'Ingliz tili darsi', 'Ikkala dars ham bor', 'Dars yo\'q'],
          correctAnswer: 3,
          explanation: 'Matnda "금요일에는 수업이 없어요" (Juma kuni darsim yo\'q) deyilgan.'
        }
      ],
      grammarPoint: 'Weekly schedule: ~에 ~이/가 있어요/없어요',
      vocabulary: ['한국어 수업', '영어 수업', '없어요']
    }
  ],
  '6과': [
    {
      id: '6-1',
      unit: '6과',
      type: 'short-passage',
      difficulty: 'easy',
      korean: '오늘 날씨가 좋아요. 해가 나와요. 바람이 불지 않아요. 비가 오지 않아요.',
      uzbek: 'Bugun ob-havo yaxshi. Quyosh chiqmoqda. Shamol esmayapti. Yomg\'ir yog\'mayapti.',
      english: 'The weather is good today. The sun is out. The wind is not blowing. It is not raining.',
      questions: [
        {
          id: '6-1-q1',
          question: 'Bugun ob-havo qanday?',
          options: ['Yomon', 'Yaxshi', 'Bulutli', 'Sovuq'],
          correctAnswer: 1,
          explanation: 'Matnda "오늘 날씨가 좋아요" (Bugun ob-havo yaxshi) deyilgan.'
        },
        {
          id: '6-1-q2',
          question: 'Bugun quyosh chiqadimi?',
          correctAnswer: true,
          explanation: 'Matnda "해가 나와요" (Quyosh chiqmoqda) deyilgan.'
        }
      ],
      grammarPoint: 'Weather descriptions: ~가 좋아요/나와요/불지 않아요/오지 않아요',
      vocabulary: ['날씨', '좋아요', '해가 나와요', '바람', '비']
    },
    {
      id: '6-2',
      unit: '6과',
      type: 'comprehension',
      difficulty: 'medium',
      korean: '어제는 눈이 왔어요. 오늘은 해가 나와요. 내일은 비가 올 거예요. 우산을 가져가세요.',
      uzbek: 'Kecha qor yog\'di. Bugun quyosh chiqmoqda. Ertak yomg\'ir yog\'adi. Soyabon olib boring.',
      english: 'It snowed yesterday. The sun is out today. It will rain tomorrow. Take an umbrella.',
      questions: [
        {
          id: '6-2-q1',
          question: 'Kecha qanday ob-havo edi?',
          options: ['Quyoshli', 'Yomg\'irli', 'Qorli', 'Bulutli'],
          correctAnswer: 2,
          explanation: 'Matnda "어제는 눈이 왔어요" (Kecha qor yog\'di) deyilgan.'
        },
        {
          id: '6-2-q2',
          question: 'Ertak nima olib kerak?',
          options: ['Palto', 'Quyosh ko\'zoynak', 'Soyabon', 'Shapka'],
          correctAnswer: 2,
          explanation: 'Matnda "우산을 가져가세요" (Soyabon olib boring) deyilgan.'
        }
      ],
      grammarPoint: 'Weather changes and predictions',
      vocabulary: ['눈이 왔어요', '비가 올 거예요', '우산', '가져가세요']
    }
  ],
  '7과': [
    {
      id: '7-1',
      unit: '7과',
      type: 'short-passage',
      difficulty: 'easy',
      korean: '저는 김치를 좋아해요. 김치는 매워요. 하지만 맛있어요. 저는 매일 김치를 먹어요.',
      uzbek: 'Men kimchini yaxshi ko\'raman. Kimchi achchiq. Lekin mazali. Men har kuni kimchi yeyman.',
      english: 'I like kimchi. Kimchi is spicy. But it\'s delicious. I eat kimchi every day.',
      questions: [
        {
          id: '7-1-q1',
          question: 'Kimchi qanday ta\'mga ega?',
          options: ['Shirin', 'Nordon', 'Achchiq', 'Nosoz'],
          correctAnswer: 2,
          explanation: 'Matnda "김치는 매워요" (Kimchi achchiq) deyilgan.'
        },
        {
          id: '7-1-q2',
          question: 'U kimchini qachon yeydi?',
          options: ['Haftada bir', 'Oyda bir', 'Har kuni', 'Hech qachon'],
          correctAnswer: 2,
          explanation: 'Matnda "저는 매일 김치를 먹어요" (Men har kuni kimchi yeyman) deyilgan.'
        }
      ],
      grammarPoint: 'Food preferences: ~를/을 좋아해요, ~지만',
      vocabulary: ['김치', '매워요', '맛있어요', '매일', '먹어요']
    },
    {
      id: '7-2',
      unit: '7과',
      type: 'matching',
      difficulty: 'medium',
      korean: '한국 음식: 김치, 비빔밥, 불고기, 냉면. 저는 비빔밥을 가장 좋아해요. 김치도 좋아해요. 하지만 불고기는 안 좋아해요.',
      uzbek: 'Koreys taomlari: Kimchi, Bibimpap, Bulgogi, Naengmyon. Men Bibimpapni eng yaxshi ko\'raman. Kimchini ham yaxshi ko\'raman. Lekin Bulgogini yaxshi ko\'rmayman.',
      english: 'Korean foods: Kimchi, Bibimbap, Bulgogi, Cold noodles. I like bibimbap the most. I also like kimchi. But I don\'t like bulgogi.',
      questions: [
        {
          id: '7-2-q1',
          question: 'U qaysi taomni eng yaxshi ko\'radi?',
          options: ['Kimchi', 'Bibimpap', 'Bulgogi', 'Naengmyon'],
          correctAnswer: 1,
          explanation: 'Matnda "저는 비빔밥을 가장 좋아해요" (Men Bibimpapni eng yaxshi ko\'raman) deyilgan.'
        },
        {
          id: '7-2-q2',
          question: 'U qaysi taomni yaxshi ko\'rmaydi?',
          options: ['Kimchi', 'Bibimpap', 'Bulgogi', 'Naengmyon'],
          correctAnswer: 2,
          explanation: 'Matnda "불고기는 안 좋아해요" (Bulgogini yaxshi ko\'rmayman) deyilgan.'
        }
      ],
      grammarPoint: 'Food preferences and superlatives',
      vocabulary: ['한국 음식', '가장 좋아해요', '안 좋아해요']
    }
  ],
  '8과': [
    {
      id: '8-1',
      unit: '8과',
      type: 'comprehension',
      difficulty: 'medium',
      korean: '저는 지금 집에 있어요. 어머니는 부엌에 있어요. 아버지는 거실에 있어요. 동생은 방에 있어요.',
      uzbek: 'Men hozir uyda. Onam oshxonada. Otam mehmonxonada. Ukam xonada.',
      english: 'I am at home now. Mother is in the kitchen. Father is in the living room. Younger brother is in the room.',
      questions: [
        {
          id: '8-1-q1',
          question: 'Ona qayerda?',
          options: ['Xonada', 'Mehmonxonada', 'Oshxonada', 'Balkon'],
          correctAnswer: 2,
          explanation: 'Matnda "어머니는 부엌에 있어요" (Onam oshxonada) deyilgan.'
        },
        {
          id: '8-1-q2',
          question: 'Ota qayerda?',
          options: ['Xonada', 'Mehmonxonada', 'Oshxonada', 'Balkon'],
          correctAnswer: 1,
          explanation: 'Matnda "아버지는 거실에 있어요" (Otam mehmonxonada) deyilgan.'
        }
      ],
      grammarPoint: 'Family members and locations: ~에 있어요',
      vocabulary: ['집', '부엌', '거실', '방', '어머니', '아버지', '동생']
    },
    {
      id: '8-2',
      unit: '8과',
      type: 'true-false',
      difficulty: 'hard',
      korean: '저는 학교에 가요. 친구는 도서관에 가요. 우리는 같이 공부해요. 도서관은 조용해요.',
      uzbek: 'Men maktabga boryapman. Do\'stim kutubxonaga boryapman. Biz birgalikda o\'qiymiz. Kutubxona tinch.',
      english: 'I am going to school. My friend is going to the library. We study together. The library is quiet.',
      questions: [
        {
          id: '8-2-q1',
          question: 'Do\'stim maktabga boryapdi.',
          correctAnswer: false,
          explanation: 'Do\'stim kutubxonaga boryapdi, maktabga emas.'
        },
        {
          id: '8-2-q2',
          question: 'Ular birgalikda o\'qiymishdi.',
          correctAnswer: true,
          explanation: 'Matnda "우리는 같이 공부해요" (Biz birgalikda o\'qiymiz) deyilgan.'
        }
      ],
      grammarPoint: 'Movement and activities: ~에 가요, 같이 ~해요',
      vocabulary: ['학교', '도서관', '같이', '공부해요', '조용해요']
    }
  ],
  '9과': [
    {
      id: '1b9-r1',
      book: '1B',
      unit: '9과',
      type: 'short-passage',
      difficulty: 'easy',
      korean: '우리 가족은 다섯 명이에요. 할머니, 아버지, 어머니, 동생하고 저예요.',
      uzbek: 'Bizning oilamiz besh kishi. Buvi, ota, ona, ukam va men.',
      russian: 'В нашей семье пять человек: бабушка, папа, мама, младший брат и я.',
      english: 'My family has five people: grandmother, father, mother, younger brother, and me.',
      questions: [
        {
          id: '1b9-r1-q1',
          question: 'Oilada nechta kishi bor?',
          questionEn: 'How many people are in the family?',
          questionRu: 'Сколько человек в семье?',
          options: ['Uch kishi', 'To‘rt kishi', 'Besh kishi', 'Olti kishi'],
          optionsEn: ['Three', 'Four', 'Five', 'Six'],
          optionsRu: ['Три', 'Четыре', 'Пять', 'Шесть'],
          correctAnswer: 2,
          explanation: 'Matnda “다섯 명” (besh kishi) deyilgan.',
          explanationEn: 'The passage says “five people”.',
          explanationRu: 'В тексте сказано “пять человек”.'
        },
        {
          id: '1b9-r1-q2',
          question: 'Kimlar oilada bor?',
          questionEn: 'Who is in the family?',
          questionRu: 'Кто есть в семье?',
          options: ['Buvi, ota, ona, ukam, men', 'Buva, ota, ona, men', 'Opa, aka, men', 'Faqat ota-ona'],
          optionsEn: ['Grandmother, father, mother, younger brother, me', 'Grandfather, father, mother, me', 'Older sister, older brother, me', 'Only parents'],
          optionsRu: ['Бабушка, папа, мама, младший брат, я', 'Дедушка, папа, мама, я', 'Старшая сестра, старший брат, я', 'Только родители'],
          correctAnswer: 0,
          explanation: 'Matnda oiladagi a’zolar sanab o‘tilgan.',
          explanationEn: 'The family members are listed in the passage.',
          explanationRu: 'Члены семьи перечислены в тексте.'
        }
      ],
      grammarPoint: 'Counters: ~명 / Family vocabulary',
      vocabulary: ['가족', '다섯 명', '할머니', '아버지', '어머니', '동생']
    },
    {
      id: '1b9-r2',
      book: '1B',
      unit: '9과',
      type: 'true-false',
      difficulty: 'medium',
      korean: '저는 아들이 있어요. 그리고 딸도 있어요.',
      uzbek: 'Mening o‘g‘lim bor. Va qizim ham bor.',
      russian: 'У меня есть сын. И ещё есть дочь.',
      english: 'I have a son. And I also have a daughter.',
      questions: [
        {
          id: '1b9-r2-q1',
          question: 'Uning qiz farzandi bor.',
          questionEn: 'He/She has a daughter.',
          questionRu: 'У него/неё есть дочь.',
          correctAnswer: true,
          explanation: 'Matnda “딸도 있어요” (qiz ham bor) deyilgan.',
          explanationEn: 'The passage says “I also have a daughter”.',
          explanationRu: 'В тексте сказано “есть и дочь”.'
        },
        {
          id: '1b9-r2-q2',
          question: 'Uning buvisi bor.',
          questionEn: 'He/She has a grandmother.',
          questionRu: 'У него/неё есть бабушка.',
          correctAnswer: false,
          explanation: 'Matnda buvi haqida aytilmagan.',
          explanationEn: 'A grandmother is not mentioned.',
          explanationRu: 'Про бабушку не сказано.'
        }
      ],
      grammarPoint: '~이/가 있어요',
      vocabulary: ['아들', '딸']
    }
  ],
  '10과': [
    {
      id: '1b10-r1',
      book: '1B',
      unit: '10과',
      type: 'short-passage',
      difficulty: 'easy',
      korean: '저는 아침 일곱 시에 일어나요. 그리고 버스를 기다려요. 회사에 가요.',
      uzbek: 'Men ertalab soat yettida uyg‘onaman. Keyin avtobus kutaman. Ishxonaga boraman.',
      russian: 'Я встаю в семь утра. Потом жду автобус и иду на работу.',
      english: 'I wake up at 7 a.m. Then I wait for the bus and go to the office.',
      questions: [
        {
          id: '1b10-r1-q1',
          question: 'U qachon uyg‘onadi?',
          questionEn: 'When does he/she wake up?',
          questionRu: 'Когда он/она просыпается?',
          options: ['Soat oltida', 'Soat yettida', 'Soat sakkizda', 'Soat to‘qqizda'],
          optionsEn: ['At 6', 'At 7', 'At 8', 'At 9'],
          optionsRu: ['В 6', 'В 7', 'В 8', 'В 9'],
          correctAnswer: 1,
          explanation: 'Matnda “일곱 시에 일어나요” deyilgan.',
          explanationEn: 'The passage says “wake up at seven”.',
          explanationRu: 'В тексте: “встаю в семь”.'
        },
        {
          id: '1b10-r1-q2',
          question: 'U qanday transportdan foydalanadi?',
          questionEn: 'What transportation does he/she use?',
          questionRu: 'Какой транспорт он/она использует?',
          options: ['Taksi', 'Avtobus', 'Poyezd', 'Metro'],
          optionsEn: ['Taxi', 'Bus', 'Train', 'Subway'],
          optionsRu: ['Такси', 'Автобус', 'Поезд', 'Метро'],
          correctAnswer: 1,
          explanation: 'Matnda “버스를 기다려요” (avtobus kutaman) deyilgan.',
          explanationEn: 'It says “wait for the bus”.',
          explanationRu: 'Сказано “жду автобус”.'
        }
      ],
      grammarPoint: 'Time + action: ~에 / Daily routine',
      vocabulary: ['아침', '일어나요', '기다려요', '회사']
    },
    {
      id: '1b10-r2',
      book: '1B',
      unit: '10과',
      type: 'comprehension',
      difficulty: 'medium',
      korean: '저녁에는 집을 청소해요. 그리고 컴퓨터를 해요. 가끔 전화를 해요.',
      uzbek: 'Kechqurun uy tozalayman. Keyin kompyuterda ishlayman. Ba’zan telefon qilaman.',
      russian: 'Вечером я убираю дома, потом работаю за компьютером. Иногда звоню.',
      english: 'In the evening, I clean the house, then use the computer. Sometimes I call.',
      questions: [
        {
          id: '1b10-r2-q1',
          question: 'U kechqurun nima qiladi?',
          questionEn: 'What does he/she do in the evening?',
          questionRu: 'Что он/она делает вечером?',
          options: ['Uy tozalaydi', 'Sayohat qiladi', 'Sport qiladi', 'Maktabga boradi'],
          optionsEn: ['Cleans the house', 'Travels', 'Exercises', 'Goes to school'],
          optionsRu: ['Убирает дома', 'Путешествует', 'Занимается спортом', 'Идёт в школу'],
          correctAnswer: 0,
          explanation: 'Matnda “집을 청소해요” (uy tozalayman) bor.',
          explanationEn: 'It says “I clean the house”.',
          explanationRu: 'Сказано “убираю дома”.'
        }
      ],
      grammarPoint: 'Routine verbs',
      vocabulary: ['저녁', '청소해요', '컴퓨터', '전화해요']
    }
  ],
  '11과': [
    {
      id: '1b11-r1',
      book: '1B',
      unit: '11과',
      type: 'short-passage',
      difficulty: 'easy',
      korean: '저는 머리가 아파요. 그리고 기침도 해요. 오늘 병원에 가요.',
      uzbek: 'Boshim og‘riyapti. Yo‘tal ham bor. Bugun shifoxonaga boraman.',
      russian: 'У меня болит голова. Я кашляю. Сегодня иду в больницу.',
      english: 'I have a headache. I also cough. Today I go to the hospital.',
      questions: [
        {
          id: '1b11-r1-q1',
          question: 'U qayerga boradi?',
          questionEn: 'Where does he/she go?',
          questionRu: 'Куда он/она идёт?',
          options: ['Shifoxonaga', 'Kutubxonaga', 'Maktabga', 'Do‘konga'],
          optionsEn: ['To the hospital', 'To the library', 'To school', 'To a store'],
          optionsRu: ['В больницу', 'В библиотеку', 'В школу', 'В магазин'],
          correctAnswer: 0,
          explanation: 'Matnda “병원에 가요” (shifoxonaga boraman) deyilgan.',
          explanationEn: 'The passage says “go to the hospital”.',
          explanationRu: 'В тексте: “иду в больницу”.'
        }
      ],
      grammarPoint: '~이/가 아파요 / Health',
      vocabulary: ['머리', '아파요', '기침', '병원']
    },
    {
      id: '1b11-r2',
      book: '1B',
      unit: '11과',
      type: 'true-false',
      difficulty: 'medium',
      korean: '목이 아파서 약을 먹었어요.',
      uzbek: 'Tomog‘im og‘rigani uchun dori ichdim.',
      russian: 'Потому что болело горло, я выпил(а) лекарство.',
      english: 'Because my throat hurt, I took medicine.',
      questions: [
        {
          id: '1b11-r2-q1',
          question: 'U dori ichgan.',
          questionEn: 'He/She took medicine.',
          questionRu: 'Он/она принял(а) лекарство.',
          correctAnswer: true,
          explanation: 'Matnda “약을 먹었어요” (dori ichdim) bor.',
          explanationEn: 'It says “took medicine”.',
          explanationRu: 'Сказано “принял(а) лекарство”.'
        },
        {
          id: '1b11-r2-q2',
          question: 'Uning oyog‘i og‘riyapti.',
          questionEn: 'His/Her leg hurts.',
          questionRu: 'У него/неё болит нога.',
          correctAnswer: false,
          explanation: 'Matnda tomoq haqida aytilgan, oyoq emas.',
          explanationEn: 'It mentions throat, not leg.',
          explanationRu: 'Речь о горле, не о ноге.'
        }
      ],
      grammarPoint: 'Reason: ~아서/어서',
      vocabulary: ['목', '약']
    }
  ],
  '12과': [
    {
      id: '1b12-r1',
      book: '1B',
      unit: '12과',
      type: 'short-passage',
      difficulty: 'easy',
      korean: '친구에게 문자를 보냈어요. 친구가 문자를 받았어요.',
      uzbek: 'Do‘stimga SMS jo‘natdim. Do‘stim SMS oldi.',
      russian: 'Я отправил(а) другу сообщение. Друг получил сообщение.',
      english: 'I sent a text to my friend. My friend received it.',
      questions: [
        {
          id: '1b12-r1-q1',
          question: 'U nima qildi?',
          questionEn: 'What did he/she do?',
          questionRu: 'Что он/она сделал(а)?',
          options: ['SMS jo‘natdi', 'Telefon raqamni yo‘qotdi', 'Kirdi', 'Uxladi'],
          optionsEn: ['Sent a text', 'Lost the phone number', 'Entered', 'Slept'],
          optionsRu: ['Отправил(а) сообщение', 'Потерял(а) номер', 'Вошёл(шла)', 'Спал(а)'],
          correctAnswer: 0,
          explanation: 'Matnda “문자를 보냈어요” (SMS jo‘natdim) bor.',
          explanationEn: 'It says “sent a text”.',
          explanationRu: 'Сказано “отправил(а) сообщение”.'
        }
      ],
      grammarPoint: 'Past tense: ~았/었어요',
      vocabulary: ['문자', '보냈어요', '받았어요']
    },
    {
      id: '1b12-r2',
      book: '1B',
      unit: '12과',
      type: 'comprehension',
      difficulty: 'medium',
      korean: '오랜만이에요. 요즘 회사 일이 많아요. 그래서 좀 피곤해요.',
      uzbek: 'Ko‘rishmaganimizga ancha bo‘ldi. Hozir ish ko‘p. Shuning uchun biroz charchaganman.',
      russian: 'Давно не виделись. В последнее время много работы, поэтому я немного уставший(ая).',
      english: 'Long time no see. These days I have a lot of work, so I’m a bit tired.',
      questions: [
        {
          id: '1b12-r2-q1',
          question: 'Nega u charchagan?',
          questionEn: 'Why is he/she tired?',
          questionRu: 'Почему он/она устал(а)?',
          options: ['Ish ko‘p bo‘lgani uchun', 'Uxlashgani uchun', 'Sayohat qilgani uchun', 'Sport qilgani uchun'],
          optionsEn: ['Because there is a lot of work', 'Because he/she slept', 'Because he/she traveled', 'Because he/she exercised'],
          optionsRu: ['Потому что много работы', 'Потому что спал(а)', 'Потому что путешествовал(а)', 'Потому что занимался(ась) спортом'],
          correctAnswer: 0,
          explanation: 'Matnda “회사 일이 많아요” deyilgan.',
          explanationEn: 'It says “I have a lot of work”.',
          explanationRu: 'Сказано “много работы”.'
        }
      ],
      grammarPoint: 'Reason: 그래서',
      vocabulary: ['오랜만이에요', '회사 일', '피곤해요']
    }
  ],
  '13과': [
    {
      id: '1b13-r1',
      book: '1B',
      unit: '13과',
      type: 'short-passage',
      difficulty: 'easy',
      korean: '저는 지하철을 타요. 그리고 여기에서 갈아타요. 다음 역에서 내려요.',
      uzbek: 'Men metroga minaman. Keyin shu yerda almashaman. Keyingi bekatda tushaman.',
      russian: 'Я еду на метро. Потом здесь делаю пересадку. Выхожу на следующей станции.',
      english: 'I take the subway. Then I transfer here. I get off at the next station.',
      questions: [
        {
          id: '1b13-r1-q1',
          question: 'U qayerda almashadi?',
          questionEn: 'Where does he/she transfer?',
          questionRu: 'Где он/она пересаживается?',
          options: ['Shu yerda', 'Uyda', 'Do‘konda', 'Maktabda'],
          optionsEn: ['Here', 'At home', 'At a store', 'At school'],
          optionsRu: ['Здесь', 'Дома', 'В магазине', 'В школе'],
          correctAnswer: 0,
          explanation: 'Matnda “여기에서 갈아타요” (shu yerda almashaman) bor.',
          explanationEn: 'It says “transfer here”.',
          explanationRu: 'Сказано “пересаживаюсь здесь”.'
        }
      ],
      grammarPoint: 'Transportation + sequence',
      vocabulary: ['지하철', '갈아타요', '내려요']
    },
    {
      id: '1b13-r2',
      book: '1B',
      unit: '13과',
      type: 'matching',
      difficulty: 'medium',
      korean: '버스 정류장, 지하철역, 기차역, 택시',
      uzbek: 'Avtobus bekati, metro bekati, poyezd bekati, taksi',
      russian: 'Автобусная остановка, станция метро, железнодорожная станция, такси',
      english: 'Bus stop, subway station, train station, taxi',
      questions: [
        {
          id: '1b13-r2-q1',
          question: '“지하철역” nimani anglatadi?',
          questionEn: 'What does “지하철역” mean?',
          questionRu: 'Что означает “지하철역”?',
          options: ['Metro bekati', 'Avtobus bekati', 'Taksi', 'Samolyot'],
          optionsEn: ['Subway station', 'Bus stop', 'Taxi', 'Airplane'],
          optionsRu: ['Станция метро', 'Автобусная остановка', 'Такси', 'Самолёт'],
          correctAnswer: 0,
          explanation: '“지하철역” — metro bekati.',
          explanationEn: '“지하철역” means “subway station”.',
          explanationRu: '“지하철역” — это “станция метро”.'
        }
      ],
      grammarPoint: 'Transport vocabulary',
      vocabulary: ['정류장', '역']
    }
  ],
  '14과': [
    {
      id: '1b14-r1',
      book: '1B',
      unit: '14과',
      type: 'short-passage',
      difficulty: 'easy',
      korean: '이 코트는 커요. 작은 사이즈를 입어 볼게요.',
      uzbek: 'Bu palto katta. Kichik o‘lchamini kiyib ko‘raman.',
      russian: 'Это пальто большое. Я примерю маленький размер.',
      english: 'This coat is big. I will try on a smaller size.',
      questions: [
        {
          id: '1b14-r1-q1',
          question: 'Palto qanday?',
          questionEn: 'How is the coat?',
          questionRu: 'Какое пальто?',
          options: ['Katta', 'Kichik', 'Arzon', 'Qimmat'],
          optionsEn: ['Big', 'Small', 'Cheap', 'Expensive'],
          optionsRu: ['Большое', 'Маленькое', 'Дешёвое', 'Дорогое'],
          correctAnswer: 0,
          explanation: 'Matnda “커요” (katta) deyilgan.',
          explanationEn: 'It says “big”.',
          explanationRu: 'Сказано “большое”.'
        }
      ],
      grammarPoint: 'Size adjectives',
      vocabulary: ['코트', '커요', '작은', '사이즈']
    },
    {
      id: '1b14-r2',
      book: '1B',
      unit: '14과',
      type: 'comprehension',
      difficulty: 'medium',
      korean: '저는 치마를 입었어요. 그리고 운동화를 신었어요.',
      uzbek: 'Men yubka kiydim. Va krasovka kiydim.',
      russian: 'Я надел(а) юбку и обул(а) кроссовки.',
      english: 'I wore a skirt and sneakers.',
      questions: [
        {
          id: '1b14-r2-q1',
          question: 'U nima kiydi?',
          questionEn: 'What did he/she wear?',
          questionRu: 'Что он/она надел(а)?',
          options: ['Yubka va krasovka', 'Shim va tufli', 'Ko‘ylak va bosh kiyim', 'Kostyum'],
          optionsEn: ['Skirt and sneakers', 'Pants and shoes', 'Dress and hat', 'Suit'],
          optionsRu: ['Юбку и кроссовки', 'Брюки и обувь', 'Платье и головной убор', 'Костюм'],
          correctAnswer: 0,
          explanation: 'Matnda “치마를 입었어요… 운동화를 신었어요” bor.',
          explanationEn: 'It says “wore a skirt” and “wore sneakers”.',
          explanationRu: 'Сказано “надел(а) юбку” и “обул(а) кроссовки”.'
        }
      ],
      grammarPoint: '입어요/신어요',
      vocabulary: ['치마', '운동화']
    }
  ],
  '15과': [
    {
      id: '1b15-r1',
      book: '1B',
      unit: '15과',
      type: 'short-passage',
      difficulty: 'easy',
      korean: '여행을 가기 전에 돈을 바꿨어요. 그리고 비행기 표를 예약했어요.',
      uzbek: 'Sayohatga borishdan oldin pul almashtirdim. Va samolyot biletini zakaz qildim.',
      russian: 'Перед поездкой я обменял(а) деньги и забронировал(а) авиабилет.',
      english: 'Before traveling, I exchanged money and booked a flight ticket.',
      questions: [
        {
          id: '1b15-r1-q1',
          question: 'U sayohatdan oldin nima qildi?',
          questionEn: 'What did he/she do before traveling?',
          questionRu: 'Что он/она сделал(а) перед поездкой?',
          options: ['Pul almashtirdi va bilet zakaz qildi', 'Uy tozaladi', 'Kasallandi', 'Kiyim sotib oldi'],
          optionsEn: ['Exchanged money and booked a ticket', 'Cleaned the house', 'Got sick', 'Bought clothes'],
          optionsRu: ['Обменял(а) деньги и забронировал(а) билет', 'Убрал(а) дома', 'Заболел(а)', 'Купил(а) одежду'],
          correctAnswer: 0,
          explanation: 'Matnda “돈을 바꿨어요… 표를 예약했어요” bor.',
          explanationEn: 'It says “exchanged money” and “booked a ticket”.',
          explanationRu: 'Сказано “обменял(а) деньги” и “забронировал(а) билет”.'
        }
      ],
      grammarPoint: '~기 전에',
      vocabulary: ['여행', '돈', '바꿨어요', '예약했어요']
    },
    {
      id: '1b15-r2',
      book: '1B',
      unit: '15과',
      type: 'comprehension',
      difficulty: 'medium',
      korean: '여권을 준비해야 해요. 그리고 호텔도 예약해야 해요.',
      uzbek: 'Pasportni tayyorlash kerak. Va mehmonxonani ham bron qilish kerak.',
      russian: 'Нужно подготовить паспорт и также забронировать отель.',
      english: 'You need to prepare your passport and also book a hotel.',
      questions: [
        {
          id: '1b15-r2-q1',
          question: 'Nimani tayyorlash kerak?',
          questionEn: 'What do you need to prepare?',
          questionRu: 'Что нужно подготовить?',
          options: ['Pasport', 'Krasovka', 'Kompyuter', 'Yubka'],
          optionsEn: ['Passport', 'Sneakers', 'Computer', 'Skirt'],
          optionsRu: ['Паспорт', 'Кроссовки', 'Компьютер', 'Юбка'],
          correctAnswer: 0,
          explanation: 'Matnda “여권을 준비해야 해요” (pasport tayyorlash kerak) deyilgan.',
          explanationEn: 'It says “prepare a passport”.',
          explanationRu: 'Сказано “подготовить паспорт”.'
        }
      ],
      grammarPoint: '~아/어야 해요',
      vocabulary: ['여권', '준비해야 해요', '예약해야 해요']
    }
  ]
};

export const getReadingExercisesByUnit = (unit: string, book: string = '1A'): ReadingExercise[] => {
  const list = readingExercises[unit] || [];
  return list.filter((ex) => (ex.book ?? '1A') === book);
};

export const getAllReadingUnits = (book?: string): string[] => {
  if (!book) return Object.keys(readingExercises);
  return Object.keys(readingExercises).filter((unit) => {
    const list = readingExercises[unit] || [];
    return list.some((ex) => (ex.book ?? '1A') === book);
  });
};

export const getAllReadingBooks = (): string[] => {
  const books = new Set<string>();
  for (const unit of Object.keys(readingExercises)) {
    const list = readingExercises[unit] || [];
    for (const ex of list) {
      books.add(ex.book ?? '1A');
    }
  }
  return Array.from(books).sort();
};
