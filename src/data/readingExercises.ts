// 서울대 한국어 1A (Seoul National University Korean 1A) Reading Exercises
// Beginner level - 8 units + Hangul introduction

export interface ReadingExercise {
  id: string;
  unit: string;
  type: 'short-passage' | 'comprehension' | 'true-false' | 'matching';
  difficulty: 'easy' | 'medium' | 'hard';
  korean: string;
  uzbek: string;
  english: string;
  questions?: {
    id: string;
    question: string;
    options?: string[];
    correctAnswer: number | boolean;
    explanation?: string;
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
  ]
};

export const getReadingExercisesByUnit = (unit: string): ReadingExercise[] => {
  return readingExercises[unit] || [];
};

export const getAllReadingUnits = (): string[] => {
  return Object.keys(readingExercises);
};
