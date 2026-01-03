 'use client';

import { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

import { useLanguage, useUser } from '../providers';
import { translations } from '../../lib/translations';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import MobileNav from '../../components/MobileNav';
import flashcardsData from '../../data/flashcardsData.json';

type Card = {
  korean: string;
  uzbek: string;
  russian?: string;
  english?: string;
};

type Units = Record<string, Card[]>;

type FlashcardsDataEntry = {
  book: '1A' | '1B';
  unit: string;
  cards: Array<{
    korean: string;
    uzbek: string;
    russian?: string;
    english?: string;
  }>;
};

type FlashcardsProgressV1 = {
  version: 1;
  units: Record<
    string,
    {
      masteredIndices: number[];
      lastIndex: number;
      totalCards: number;
      againIndices?: number[];
      mode?: 'all' | 'again';
      shuffleEnabled?: boolean;
      deckOrder?: number[];
      deckPosition?: number;
      updatedAt: string;
    }
  >;
};

const FLASHCARDS_PROGRESS_KEY = 'koreancha_flashcards_progress_v1';

const BOOKS = ['1A', '1B'] as const;
type Book = (typeof BOOKS)[number];

const unitSortKey = (unit: string): number => {
  if (unit === 'Hangul') return 0;
  const n = Number(unit.replace(/\D/g, ''));
  return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER;
};

const unitKeysByBook: Record<Book, string[]> = (() => {
  const keys: Record<Book, Set<string>> = { '1A': new Set(), '1B': new Set() };
  const entries = flashcardsData as unknown as FlashcardsDataEntry[];
  for (const entry of entries) {
    if (!entry || !entry.book || !entry.unit) continue;
    if (entry.book !== '1A' && entry.book !== '1B') continue;
    keys[entry.book].add(entry.unit);
  }
  return {
    '1A': Array.from(keys['1A']).sort((a, b) => unitSortKey(a) - unitSortKey(b)),
    '1B': Array.from(keys['1B']).sort((a, b) => unitSortKey(a) - unitSortKey(b))
  };
})();
const units: Units = {};

// Merge JSON-based flashcards data (e.g. 1B) into the existing units map.
(() => {
  const entries = flashcardsData as unknown as FlashcardsDataEntry[];
  for (const entry of entries) {
    if (!entry || !entry.unit || !Array.isArray(entry.cards)) continue;
    units[entry.unit] = entry.cards.map((c) => ({
      korean: c.korean,
      uzbek: c.uzbek,
      russian: c.russian,
      english: c.english
    }));
  }
})();

const unitTranslationsList: Record<
  string,
  Array<{
    korean: string;
    russian: string;
    english: string;
  }>
> = {
  '1과': [
    { korean: '오', russian: 'пять', english: 'five' },
    { korean: '이', russian: 'это/зуб', english: 'this/tooth' },
    { korean: '아우', russian: 'мальчик', english: 'boy' },
    { korean: '아이', russian: 'ребёнок', english: 'child' },
    { korean: '오이', russian: 'огурец', english: 'cucumber' },
    { korean: '가수', russian: 'певец/певица', english: 'singer' },
    { korean: '고기', russian: 'мясо', english: 'meat' },
    { korean: '구두', russian: 'туфли', english: 'shoes' },
    { korean: '나라', russian: 'страна', english: 'country' },
    { korean: '나무', russian: 'дерево', english: 'tree' },
    { korean: '다리', russian: 'нога/мост', english: 'leg/bridge' },
    { korean: '라디오', russian: 'радио', english: 'radio' },
    { korean: '머리', russian: 'голова', english: 'head' },
    { korean: '바나나', russian: 'банан', english: 'banana' },
    { korean: '바지', russian: 'штаны', english: 'pants' },
    { korean: '소', russian: 'корова', english: 'cow' },
    { korean: '아기', russian: 'младенец', english: 'baby' },
    { korean: '어머니', russian: 'мама', english: 'mother' },
    { korean: '지도', russian: 'карта', english: 'map' },
    { korean: '모자', russian: 'шапка', english: 'hat' },
    { korean: '아버지', russian: 'папа', english: 'father' },
    { korean: '허리', russian: 'талия', english: 'waist' },
    { korean: '지하', russian: 'подземный', english: 'underground' },
    { korean: '야구', russian: 'бейсбол', english: 'baseball' },
    { korean: '야자수', russian: 'пальма', english: 'palm tree' },
    { korean: '이야기', russian: 'разговор', english: 'story/conversation' },
    { korean: '여자', russian: 'женщина', english: 'woman' },
    { korean: '벼', russian: 'рис (растение)', english: 'rice plant' },
    { korean: '혀', russian: 'язык', english: 'tongue' },
    { korean: '요가', russian: 'йога', english: 'yoga' },
    { korean: '요리', russian: 'готовка', english: 'cooking' },
    { korean: '교수', russian: 'профессор', english: 'professor' },
    { korean: '유리', russian: 'стекло', english: 'glass' },
    { korean: '휴지', russian: 'туалетная бумага', english: 'toilet paper' },
    { korean: '우유', russian: 'молоко', english: 'milk' },
    { korean: '카드', russian: 'карта', english: 'card' },
    { korean: '코', russian: 'нос', english: 'nose' },
    { korean: '키', russian: 'рост', english: 'height' },
    { korean: '타조', russian: 'страус', english: 'ostrich' },
    { korean: '토마토', russian: 'помидор', english: 'tomato' },
    { korean: '투우수', russian: 'тореадор', english: 'matador' },
    { korean: '파리', russian: 'Париж', english: 'Paris' },
    { korean: '포도', russian: 'виноград', english: 'grapes' },
    { korean: '우표', russian: 'почтовая марка', english: 'stamp' },
    { korean: '차', russian: 'чай', english: 'tea' },
    { korean: '치마', russian: 'юбка', english: 'skirt' },
    { korean: '고추', russian: 'перец', english: 'pepper' },
    { korean: '커피', russian: 'кофе', english: 'coffee' },
    { korean: '코트', russian: 'пальто', english: 'coat' },
    { korean: '기차표', russian: 'билет на поезд', english: 'train ticket' },
    { korean: '까치', russian: 'сорока', english: 'magpie' },
    { korean: '꼬리', russian: 'хвост', english: 'tail' },
    { korean: '코끼리', russian: 'слон', english: 'elephant' },
    { korean: '따다', russian: 'рвать', english: 'tear/pull' },
    { korean: '뜨다', russian: 'плавать', english: 'float' },
    { korean: '머리띠', russian: 'повязка на голову', english: 'headband' },
    { korean: '뿌리', russian: 'корень', english: 'root' },
    { korean: '뼈', russian: 'кость', english: 'bone' },
    { korean: '아빠', russian: 'папа', english: 'dad' },
    { korean: '싸다', russian: 'дешёвый', english: 'cheap' },
    { korean: '쓰다', russian: 'писать/использовать', english: 'write/use' },
    { korean: '아저씨', russian: 'дядя', english: 'uncle/mister' },
    { korean: '짜다', russian: 'солёный', english: 'salty' },
    { korean: '찌다', russian: 'варить на пару', english: 'steam' },
    { korean: '가짜', russian: 'фальшивый', english: 'fake' },
    { korean: '개미', russian: 'муравей', english: 'ant' },
    { korean: '배', russian: 'лодка', english: 'boat' },
    { korean: '새', russian: 'птица', english: 'bird' },
    { korean: '해', russian: 'солнце', english: 'sun' },
    { korean: '게', russian: 'краб', english: 'crab' },
    { korean: '세수', russian: 'умывание', english: 'washing face' },
    { korean: '그네', russian: 'качели', english: 'swing' },
    { korean: '카메라', russian: 'камера', english: 'camera' },
    { korean: '얘기', russian: 'разговор', english: 'talk' },
    { korean: '예쁘다', russian: 'красивый', english: 'pretty' },
    { korean: '서예', russian: 'каллиграфия', english: 'calligraphy' },
    { korean: '시계', russian: 'часы', english: 'clock/watch' },
    { korean: '과자', russian: 'печенье', english: 'snack' },
    { korean: '와이셔츠', russian: 'рубашка', english: 'shirt' },
    { korean: '화가', russian: 'гнев', english: 'anger' },
    { korean: '사과', russian: 'яблоко', english: 'apple' },
    { korean: '뭐', russian: 'что', english: 'what' },
    { korean: '줘요', russian: 'дать', english: 'give' },
    { korean: '더워요', russian: 'жарко', english: 'hot' },
    { korean: '추워요', russian: 'холодно', english: 'cold' },
    { korean: '돼지', russian: 'свинья', english: 'pig' },
    { korean: '왜', russian: 'почему', english: 'why' },
    { korean: '웨이터', russian: 'официант', english: 'waiter' },
    { korean: '스웨터', russian: 'свитер', english: 'sweater' },
    { korean: '쇠고기', russian: 'говядина', english: 'beef' },
    { korean: '외우다', russian: 'запоминать', english: 'memorize' },
    { korean: '회사', russian: 'компания', english: 'company' },
    { korean: '두뇌', russian: 'мозг', english: 'brain' },
    { korean: '귀', russian: 'ухо', english: 'ear' },
    { korean: '쉬다', russian: 'отдыхать', english: 'rest' },
    { korean: '쥐', russian: 'мышь', english: 'mouse' },
    { korean: '가위', russian: 'ножницы', english: 'scissors' },
    { korean: '의사', russian: 'врач', english: 'doctor' },
    { korean: '의자', russian: 'стул', english: 'chair' },
    { korean: '여의도', russian: 'остров Ёыйдо', english: 'Yeouido' },
    { korean: '회의', russian: 'совещание', english: 'meeting' },
    { korean: '수박', russian: 'арбуз', english: 'watermelon' },
    { korean: '책', russian: 'книга', english: 'book' },
    { korean: '부엌', russian: 'кухня', english: 'kitchen' },
    { korean: '밖', russian: 'снаружи', english: 'outside' },
    { korean: '돈', russian: 'деньги', english: 'money' },
    { korean: '레몬', russian: 'лимон', english: 'lemon' },
    { korean: '신문', russian: 'газета', english: 'newspaper' },
    { korean: '우산', russian: 'зонт', english: 'umbrella' },
    { korean: '곧', russian: 'скоро', english: 'soon' },
    { korean: '밑', russian: 'низ', english: 'bottom' },
    { korean: '빗', russian: 'расчёска', english: 'comb' },
    { korean: '옷', russian: 'одежда', english: 'clothes' },
    { korean: '낮', russian: 'день', english: 'daytime' },
    { korean: '꽃', russian: 'цветок', english: 'flower' },
    { korean: '빛', russian: 'свет', english: 'light' },
    { korean: '히읗', russian: 'х', english: 'h' },
    { korean: '딸기', russian: 'клубника', english: 'strawberry' },
    { korean: '물', russian: 'вода', english: 'water' },
    { korean: '발', russian: 'нога', english: 'foot' },
    { korean: '연필', russian: 'карандаш', english: 'pencil' },
    { korean: '곰', russian: 'медведь', english: 'bear' },
    { korean: '남자', russian: 'мужчина', english: 'man' },
    { korean: '엄마', russian: 'мама', english: 'mom' },
    { korean: '컴퓨터', russian: 'компьютер', english: 'computer' },
    { korean: '밥', russian: 'варёный рис', english: 'cooked rice' },
    { korean: '입', russian: 'рот', english: 'mouth' },
    { korean: '무릎', russian: 'колено', english: 'knee' },
    { korean: '숲', russian: 'лес', english: 'forest' },
    { korean: '가방', russian: 'сумка', english: 'bag' },
    { korean: '공', russian: 'мяч', english: 'ball' },
    { korean: '냉장고', russian: 'холодильник', english: 'refrigerator' },
    { korean: '창문', russian: 'окно', english: 'window' }
  ],
  '2과': [
    { korean: '책상', russian: 'парта', english: 'desk' },
    { korean: '의자', russian: 'стул', english: 'chair' },
    { korean: '책', russian: 'книга', english: 'book' },
    { korean: '공책', russian: 'тетрадь', english: 'notebook' },
    { korean: '볼펜', russian: 'шариковая ручка', english: 'ballpoint pen' },
    { korean: '연필', russian: 'карандаш', english: 'pencil' },
    { korean: '가방', russian: 'сумка', english: 'bag' },
    { korean: '지우개', russian: 'ластик', english: 'eraser' },
    { korean: '시계', russian: 'часы', english: 'clock/watch' },
    { korean: '모자', russian: 'шапка', english: 'hat' },
    { korean: '우산', russian: 'зонт', english: 'umbrella' },
    { korean: '신문', russian: 'газета', english: 'newspaper' },
    { korean: '사전', russian: 'словарь', english: 'dictionary' },
    { korean: '안경', russian: 'очки', english: 'glasses' },
    { korean: '휴대폰', russian: 'мобильный телефон', english: 'mobile phone' },
    { korean: '남자친구', russian: 'парень-друг', english: 'boyfriend' },
    { korean: '동전', russian: 'монета', english: 'coin' },
    { korean: '차', russian: 'машина', english: 'car' },
    { korean: '한국어', russian: 'корейский язык', english: 'Korean language' },
    { korean: '여자 친구', russian: 'девушка-друг', english: 'girlfriend' },
    { korean: '뭐', russian: 'что', english: 'what' },
    { korean: '창문', russian: 'окно', english: 'window' },
    { korean: '지도', russian: 'карта', english: 'map' },
    { korean: '필통', russian: 'пенал', english: 'pencil case' },
    { korean: '전자사전', russian: 'электронный словарь', english: 'electronic dictionary' },
    { korean: '한국어로', russian: 'по-корейски', english: 'in Korean' },
    { korean: '자', russian: 'линейка', english: 'ruler' },
    { korean: '잡지', russian: 'журнал', english: 'magazine' },
    { korean: '지갑', russian: 'кошелёк', english: 'wallet' },
    { korean: '여기 있어요', russian: 'вот пожалуйста', english: 'here you go' },
    { korean: '커피', russian: 'кофе', english: 'coffee' },
    { korean: '좀', russian: 'пожалуйста (немного)', english: 'please (a little)' },
    { korean: '콜라', russian: 'кола', english: 'cola' },
    { korean: '주스', russian: 'сок', english: 'juice' },
    { korean: '교통카드', russian: 'транспортная карта', english: 'transport card' },
    { korean: '휴지', russian: 'салфетка', english: 'tissue' },
    { korean: '물', russian: 'вода', english: 'water' },
    { korean: '어서 오세요', russian: 'добро пожаловать', english: 'welcome' },
    { korean: '사과', russian: 'яблоко', english: 'apple' },
    { korean: '오랜지', russian: 'апельсин', english: 'orange' },
    { korean: '영화', russian: 'фильм', english: 'movie' },
    { korean: '우유', russian: 'молоко', english: 'milk' },
    { korean: '바나나', russian: 'банан', english: 'banana' },
    { korean: '딸기', russian: 'клубника', english: 'strawberry' },
    { korean: '텔레비전', russian: 'телевизор', english: 'television' },
    { korean: '방', russian: 'комната', english: 'room' },
    { korean: '서울대학교', russian: 'Сеульский университет', english: 'Seoul National University' },
    { korean: '제', russian: 'мой', english: 'my' },
    { korean: '침대', russian: 'кровать', english: 'bed' },
    { korean: '룸메이트', russian: 'сосед по комнате', english: 'roommate' },
    { korean: '에어컨', russian: 'кондиционер', english: 'air conditioner' },
    { korean: '물건', russian: 'вещь', english: 'thing' },
    { korean: '팀', russian: 'команда', english: 'team' },
    { korean: '나누다', russian: 'делить', english: 'divide/share' },
    { korean: '받다', russian: 'получать', english: 'receive' },
    { korean: '붙이다', russian: 'приклеивать', english: 'attach/stick' }
  ],
  '3과': [
    { korean: '자다', russian: 'спать', english: 'sleep' },
    { korean: '공부하다', russian: 'учиться', english: 'study' },
    { korean: '일하다', russian: 'работать', english: 'work' },
    { korean: '운동하다', russian: 'заниматься спортом', english: 'exercise' },
    { korean: '숙제를 하다', russian: 'делать домашнее задание', english: 'do homework' },
    { korean: '옷을 사다', russian: 'покупать одежду', english: 'buy clothes' },
    { korean: '영화를 보다', russian: 'смотреть фильм', english: 'watch movie' },
    { korean: '친구를 만나다', russian: 'встречаться с другом', english: 'meet friend' },
    { korean: '태권도를 배우다', russian: 'изучать тхэквондо', english: 'learn taekwondo' },
    { korean: '밥을 먹다', russian: 'есть еду', english: 'eat meal' },
    { korean: '커피를 마시다', russian: 'пить кофе', english: 'drink coffee' },
    { korean: '책을 읽다', russian: 'читать книгу', english: 'read book' },
    { korean: '도서관', russian: 'библиотека', english: 'library' },
    { korean: '집', russian: 'дом', english: 'home' },
    { korean: '백화점', russian: 'универмаг', english: 'department store' },
    { korean: '시장', russian: 'рынок', english: 'market' },
    { korean: '공원', russian: 'парк', english: 'park' },
    { korean: '커피숍', russian: 'кафе', english: 'cafe' },
    { korean: '극장', russian: 'театр/кинотеатр', english: 'theater' },
    { korean: '학교', russian: 'школа', english: 'school' },
    { korean: '식당', russian: 'ресторан', english: 'restaurant' },
    { korean: '회사', russian: 'компания', english: 'company' },
    { korean: '지금', russian: 'сейчас', english: 'now' },
    { korean: '하다', russian: 'делать', english: 'do' },
    { korean: '쉬다', russian: 'отдыхать', english: 'rest' },
    { korean: '피자', russian: 'пицца', english: 'pizza' },
    { korean: '보다', russian: 'смотреть', english: 'see/watch' },
    { korean: '사다', russian: 'покупать', english: 'buy' },
    { korean: '먹다', russian: 'есть', english: 'eat' },
    { korean: '마시다', russian: 'пить', english: 'drink' },
    { korean: '읽다', russian: 'читать', english: 'read' },
    { korean: '배우다', russian: 'учить', english: 'learn' },
    { korean: '일본어', russian: 'японский язык', english: 'Japanese language' },
    { korean: '아르바이트하다', russian: 'подрабатывать', english: 'part-time job' },
    { korean: '요리', russian: 'готовка', english: 'cooking' },
    { korean: '만나다', russian: 'встречаться', english: 'meet' },
    { korean: '오늘', russian: 'сегодня', english: 'today' },
    { korean: '그리고', russian: 'и', english: 'and' },
    { korean: '어디', russian: 'где', english: 'where' },
    { korean: '고기', russian: 'мясо', english: 'meat' },
    { korean: '프랑스어', russian: 'французский язык', english: 'French language' },
    { korean: '드라마', russian: 'драма', english: 'drama' },
    { korean: '그럼', russian: 'тогда', english: 'then' },
    { korean: '스포츠 센터', russian: 'спортивный центр', english: 'sports center' },
    { korean: '차', russian: 'чай', english: 'tea' },
    { korean: '가르치다', russian: 'преподавать', english: 'teach' },
    { korean: '언어교육원', russian: 'центр изучения языка', english: 'language institute' },
    { korean: '불고기', russian: 'пулькоги', english: 'bulgogi' },
    { korean: '노래방', russian: 'караоке', english: 'karaoke' }
  ],
  '4과': [
    { korean: '공항', russian: 'аэропорт', english: 'airport' },
    { korean: '우체국', russian: 'почта', english: 'post office' },
    { korean: '대사관', russian: 'посольство', english: 'embassy' },
    { korean: '은행', russian: 'банк', english: 'bank' },
    { korean: '가게', russian: 'магазин', english: 'shop' },
    { korean: '약국', russian: 'аптека', english: 'pharmacy' },
    { korean: '병원', russian: 'больница', english: 'hospital' },
    { korean: '미용실', russian: 'парикмахерская', english: 'hair salon' },
    { korean: '앞', russian: 'перед', english: 'front' },
    { korean: '뒤', russian: 'сзади', english: 'back' },
    { korean: '옆', russian: 'рядом', english: 'beside' },
    { korean: '안', russian: 'внутри', english: 'inside' },
    { korean: '아래/ 밑', russian: 'внизу', english: 'below/under' },
    { korean: '위', russian: 'вверху', english: 'above' },
    { korean: '인사동', russian: 'Инсадон', english: 'Insadong' },
    { korean: '서울타워', russian: 'Сеульская башня', english: 'Seoul Tower' },
    { korean: '명동', russian: 'Мёндон', english: 'Myeongdong' },
    { korean: '청계천', russian: 'Чхонгечхон', english: 'Cheonggyecheon' },
    { korean: '대학로', russian: 'университетская улица', english: 'Daehakro' },
    { korean: '남산', russian: 'гора Намсан', english: 'Namsan' },
    { korean: '교실', russian: 'класс', english: 'classroom' },
    { korean: '찻집', russian: 'чайная', english: 'tea house' },
    { korean: '서울', russian: 'Сеул', english: 'Seoul' },
    { korean: '시내', russian: 'центр города', english: 'city center' },
    { korean: '구경하다', russian: 'осматривать достопримечательности', english: 'sightsee' },
    { korean: '쇼핑하다', russian: 'делать покупки', english: 'shop' },
    { korean: '연극', russian: 'спектакль', english: 'play' },
    { korean: '알다', russian: 'знать', english: 'know' },
    { korean: '어머니', russian: 'мама', english: 'mother' },
    { korean: '아버지', russian: 'папа', english: 'father' },
    { korean: '잘 지내다', russian: 'хорошо дела', english: 'doing well' },
    { korean: '기숙사', russian: 'общежитие', english: 'dormitory' },
    { korean: '사진', russian: 'фото', english: 'photo' },
    { korean: '매일', russian: 'каждый день', english: 'every day' },
    { korean: '그', russian: 'тот', english: 'that' },
    { korean: '반', russian: 'класс', english: 'class' },
    { korean: '사랑하다', russian: 'любить', english: 'love' },
    { korean: '서점', russian: 'книжный магазин', english: 'bookstore' },
    { korean: '빵집', russian: 'пекарня', english: 'bakery' },
    { korean: '화장실', russian: 'туалет', english: 'restroom' },
    { korean: '음식', russian: 'еда', english: 'food' },
    { korean: '가념품', russian: 'сувенир', english: 'souvenir' },
    { korean: '그림', russian: 'картина', english: 'picture' }
  ],
  '5과': [
    { korean: '숫자', russian: 'число', english: 'number' },
    { korean: '월요일', russian: 'понедельник', english: 'Monday' },
    { korean: '화요일', russian: 'вторник', english: 'Tuesday' },
    { korean: '수요일', russian: 'среда', english: 'Wednesday' },
    { korean: '목요일', russian: 'четверг', english: 'Thursday' },
    { korean: '금요일', russian: 'пятница', english: 'Friday' },
    { korean: '토요일', russian: 'суббота', english: 'Saturday' },
    { korean: '일요일', russian: 'воскресенье', english: 'Sunday' },
    { korean: '주말', russian: 'выходные', english: 'weekend' },
    { korean: '날짜', russian: 'дата', english: 'date' },
    { korean: '요일', russian: 'день недели', english: 'day of the week' },
    { korean: '며칠', russian: 'какое число', english: 'what date' },
    { korean: '시험', russian: 'экзамен', english: 'exam' },
    { korean: '언제', russian: 'когда', english: 'when' },
    { korean: '무슨', russian: 'какой', english: 'what kind' },
    { korean: '생일', russian: 'день рождения', english: 'birthday' },
    { korean: '하고', russian: 'с', english: 'with' },
    { korean: '크리스마스', russian: 'Рождество', english: 'Christmas' },
    { korean: '파티', russian: 'вечеринка', english: 'party' },
    { korean: '시간', russian: 'время', english: 'time' },
    { korean: '미안하다', russian: 'извиняться', english: 'sorry' },
    { korean: '약속', russian: 'встреча', english: 'appointment' },
    { korean: '같이', russian: 'вместе', english: 'together' },
    { korean: '어제', russian: 'вчера', english: 'yesterday' },
    { korean: '코엑스몰', russian: 'COEX молл', english: 'COEX Mall' },
    { korean: '카드', russian: 'карта', english: 'card' },
    { korean: '선물', russian: 'подарок', english: 'gift' },
    { korean: '세수하다', russian: 'умываться', english: 'wash face' },
    { korean: '이를 닦다', russian: 'чистить зубы', english: 'brush teeth' },
    { korean: '거기', russian: 'там', english: 'there' },
    { korean: '산책하다', russian: 'гулять', english: 'take a walk' },
    { korean: '사진을 찍다', russian: 'фотографировать', english: 'take photo' },
    { korean: '누구', russian: 'кто', english: 'who' },
    { korean: '혼자', russian: 'один', english: 'alone' },
    { korean: '끝나다', russian: 'заканчиваться', english: 'end' },
    { korean: '강남역', russian: 'станция Каннам', english: 'Gangnam station' },
    { korean: '그래서', russian: 'поэтому', english: 'so' },
    { korean: '내일', russian: 'завтра', english: 'tomorrow' },
    { korean: '스케줄', russian: 'расписание', english: 'schedule' },
    { korean: '지난주', russian: 'прошлая неделя', english: 'last week' },
    { korean: '양력', russian: 'григорианский календарь', english: 'solar calendar' },
    { korean: '음력', russian: 'лунный календарь', english: 'lunar calendar' },
    { korean: '설날', russian: 'Новый год по лунному календарю', english: 'Lunar New Year' },
    { korean: '세배를 하다', russian: 'кланяться старшим', english: 'bow to elders' },
    { korean: '떡국', russian: 'токкук', english: 'tteokguk' },
    { korean: '추석', russian: 'Чхусок', english: 'Chuseok' },
    { korean: '차례를 지내다', russian: 'проводить церемонию', english: 'perform ancestral rite' },
    { korean: '송편', russian: 'сонпхён', english: 'songpyeon' },
    { korean: '십 원', russian: '10 вон', english: '10 won' },
    { korean: '오십 원', russian: '50 вон', english: '50 won' },
    { korean: '백 원', russian: '100 вон', english: '100 won' },
    { korean: '오백 원', russian: '500 вон', english: '500 won' },
    { korean: '천 원', russian: '1000 вон', english: '1000 won' },
    { korean: '오천 원', russian: '5000 вон', english: '5000 won' },
    { korean: '만 원', russian: '10,000 вон', english: '10,000 won' },
    { korean: '오만 원', russian: '50,000 вон', english: '50,000 won' }
  ],
  '6과': [
    { korean: '샌드위치', russian: 'сэндвич', english: 'sandwich' },
    { korean: '스파게티', russian: 'спагетти', english: 'spaghetti' },
    { korean: '피자', russian: 'пицца', english: 'pizza' },
    { korean: '햄버거', russian: 'гамбургер', english: 'hamburger' },
    { korean: '귤', russian: 'мандарин', english: 'mandarin' },
    { korean: '딸기', russian: 'клубника', english: 'strawberry' },
    { korean: '사과', russian: 'яблоко', english: 'apple' },
    { korean: '수박', russian: 'арбуз', english: 'watermelon' },
    { korean: '앉다', russian: 'сидеть', english: 'sit' },
    { korean: '주다', russian: 'дать', english: 'give' },
    { korean: '잠깐만', russian: 'минутку', english: 'wait a moment' },
    { korean: '기다리다', russian: 'ждать', english: 'wait' },
    { korean: '빵', russian: 'хлеб', english: 'bread' },
    { korean: '몇', russian: 'сколько', english: 'how many' },
    { korean: '아이스크림', russian: 'мороженое', english: 'ice cream' },
    { korean: '주스', russian: 'сок', english: 'juice' },
    { korean: '녹차', russian: 'зелёный чай', english: 'green tea' },
    { korean: '콜라', russian: 'кола', english: 'cola' },
    { korean: '메뉴', russian: 'меню', english: 'menu' },
    { korean: '좋아하다', russian: 'любить', english: 'like' },
    { korean: '우동', russian: 'удон', english: 'udon' },
    { korean: '맥주', russian: 'пиво', english: 'beer' },
    { korean: '물건', russian: 'вещь', english: 'thing' },
    { korean: '게수', russian: 'счётчик', english: 'counter' },
    { korean: '그래요', russian: 'да, так', english: 'yes, like that' },
    { korean: '여기요', russian: 'извините (зову официанта)', english: 'excuse me (calling waiter)' },
    { korean: '맛있다', russian: 'вкусный', english: 'delicious' },
    { korean: '좋다', russian: 'хороший', english: 'good' },
    { korean: '싸다', russian: 'дешёвый', english: 'cheap' },
    { korean: '길', russian: 'дорога', english: 'road' },
    { korean: '복잡하다', russian: 'загруженный', english: 'crowded' },
    { korean: '노래', russian: 'песня', english: 'song' },
    { korean: '아리랑', russian: 'Ариран', english: 'Arirang' },
    { korean: '바지', russian: 'штаны', english: 'pants' },
    { korean: '운동화', russian: 'кроссовки', english: 'sneakers' },
    { korean: '아저씨', russian: 'дядя', english: 'mister' },
    { korean: '모두', russian: 'все', english: 'all' },
    { korean: '또', russian: 'ещё', english: 'again' },
    { korean: '키위', russian: 'киви', english: 'kiwi' },
    { korean: '파인애플', russian: 'ананас', english: 'pineapple' },
    { korean: '박스', russian: 'коробка', english: 'box' },
    { korean: '멜론', russian: 'дыня', english: 'melon' },
    { korean: '과자', russian: 'печенье', english: 'snack' },
    { korean: '달걀', russian: 'яйцо', english: 'egg' },
    { korean: '휴지', russian: 'салфетка', english: 'tissue' },
    { korean: '케이크', russian: 'торт', english: 'cake' },
    { korean: '아이스커피', russian: 'айс кофе', english: 'iced coffee' },
    { korean: '에스프래소', russian: 'эспрессо', english: 'espresso' },
    { korean: '돈가스', russian: 'донкас', english: 'donkatsu' },
    { korean: '점심', russian: 'обед', english: 'lunch' },
    { korean: '급', russian: 'степень', english: 'level' },
    { korean: '물건', russian: 'вещь', english: 'thing' },
    { korean: '팔다', russian: 'продавать', english: 'sell' },
    { korean: '인지', russian: 'дюйм', english: 'inch' },
    { korean: '아주', russian: 'очень', english: 'very' },
    { korean: '리모컨', russian: 'пульт', english: 'remote control' },
    { korean: '깨끗하다', russian: 'чистый', english: 'clean' },
    { korean: '많다', russian: 'много', english: 'many' },
    { korean: '권', russian: 'том (книг)', english: 'volume' },
    { korean: '전화하다', russian: 'звонить', english: 'call' },
    { korean: '비싸다', russian: 'дорогой', english: 'expensive' },
    { korean: '깎아 주다', russian: 'сделать скидку', english: 'give discount' },
    { korean: '백김치', russian: 'бэк кимчи', english: 'baek kimchi' },
    { korean: '깍두기', russian: 'кактуги', english: 'kkakdugi' },
    { korean: '오이김치', russian: 'ои кимчи', english: 'oi kimchi' },
    { korean: '물김치', russian: 'муль кимчи', english: 'mul kimchi' },
    { korean: '이런', russian: 'такой', english: 'this kind' },
    { korean: '김치볶음밥', russian: 'кимчи поккымпап', english: 'kimchi fried rice' },
    { korean: '김치전', russian: 'кимчичжон', english: 'kimchi pancake' },
    { korean: '얼마', russian: 'сколько', english: 'how much' },
    { korean: '십 원', russian: '10 вон', english: '10 won' },
    { korean: '오십 원', russian: '50 вон', english: '50 won' },
    { korean: '백 원', russian: '100 вон', english: '100 won' },
    { korean: '오백 원', russian: '500 вон', english: '500 won' },
    { korean: '천 원', russian: '1000 вон', english: '1000 won' },
    { korean: '오천 원', russian: '5000 вон', english: '5000 won' },
    { korean: '만 원', russian: '10,000 вон', english: '10,000 won' },
    { korean: '오만 원', russian: '50,000 вон', english: '50,000 won' }
  ],
  '7과': [
    { korean: '흐리다', russian: 'облачно', english: 'cloudy' },
    { korean: '맑다', russian: 'ясно', english: 'clear' },
    { korean: '덥다', russian: 'жарко', english: 'hot' },
    { korean: '춥다', russian: 'холодно', english: 'cold' },
    { korean: '따뜻하다', russian: 'тёплый', english: 'warm' },
    { korean: '시원하다', russian: 'прохладно', english: 'cool' },
    { korean: '비가 오다', russian: 'идёт дождь', english: 'rain' },
    { korean: '눈이 오다', russian: 'идёт снег', english: 'snow' },
    { korean: '계절', russian: 'сезон', english: 'season' },
    { korean: '봄', russian: 'весна', english: 'spring' },
    { korean: '여름', russian: 'лето', english: 'summer' },
    { korean: '가을', russian: 'осень', english: 'autumn' },
    { korean: '겨울', russian: 'зима', english: 'winter' },
    { korean: '쉽다', russian: 'лёгкий', english: 'easy' },
    { korean: '어렵다', russian: 'трудный', english: 'difficult' },
    { korean: '맵다', russian: 'острый', english: 'spicy' },
    { korean: '가볍다', russian: 'лёгкий', english: 'light' },
    { korean: '무겁다', russian: 'тяжёлый', english: 'heavy' },
    { korean: '불규칙', russian: 'неправильный', english: 'irregular' },
    { korean: '날씨', russian: 'погода', english: 'weather' },
    { korean: '어때요?', russian: 'Как?', english: 'How is it?' },
    { korean: '재미있다', russian: 'интересно', english: 'interesting' },
    { korean: '동생', russian: 'младший брат/сестра', english: 'younger sibling' },
    { korean: '떡볶이', russian: 'ттокпокки', english: 'tteokbokki' },
    { korean: '재미없다', russian: 'неинтересно', english: 'not interesting' },
    { korean: '도쿄', russian: 'Токио', english: 'Tokyo' },
    { korean: '조심해서 오세요', russian: 'приходите осторожно', english: 'come carefully' },
    { korean: '런던', russian: 'Лондон', english: 'London' },
    { korean: '싱가포르', russian: 'Сингапур', english: 'Singapore' },
    { korean: '모스크바', russian: 'Москва', english: 'Moscow' },
    { korean: '카이로', russian: 'Каир', english: 'Cairo' },
    { korean: '시드니', russian: 'Сидней', english: 'Sydney' },
    { korean: '뉴욕', russian: 'Нью-Йорк', english: 'New York' },
    { korean: '베이징', russian: 'Пекин', english: 'Beijing' },
    { korean: '어떻다', russian: 'как', english: 'how' },
    { korean: '파리', russian: 'Париж', english: 'Paris' },
    { korean: '요즘', russian: 'в последнее время', english: 'these days' },
    { korean: '쉬는 시간', russian: 'перерыв', english: 'break time' },
    { korean: '이야기하다', russian: 'разговаривать', english: 'talk' },
    { korean: '고향', russian: 'родина', english: 'hometown' },
    { korean: '스키장', russian: 'горнолыжный курорт', english: 'ski resort' },
    { korean: '단풍', russian: 'осенние листья', english: 'autumn leaves' },
    { korean: '수영장', russian: 'бассейн', english: 'swimming pool' },
    { korean: '꽃', russian: 'цветок', english: 'flower' },
    { korean: '바다', russian: 'море', english: 'sea' },
    { korean: '생선', russian: 'рыба', english: 'fish' },
    { korean: '부산', russian: 'Пусан', english: 'Busan' },
    { korean: '질문', russian: 'вопрос', english: 'question' },
    { korean: '작년', russian: 'прошлый год', english: 'last year' },
    { korean: '브라질', russian: 'Бразилия', english: 'Brazil' },
    { korean: '에서', russian: 'из', english: 'from' },
    { korean: '브라질리아', russian: 'Бразилиа', english: 'Brasília' },
    { korean: '항상', russian: 'всегда', english: 'always' },
    { korean: '처음', russian: 'в первый раз', english: 'first time' },
    { korean: '하늘', russian: 'небо', english: 'sky' },
    { korean: '눈사람', russian: 'снеговик', english: 'snowman' },
    { korean: '만들다', russian: 'делать', english: 'make' },
    { korean: '필요하다', russian: 'нужно', english: 'need' },
    { korean: '놓다', russian: 'класть', english: 'put' },
    { korean: '각각', russian: 'каждый', english: 'each' },
    { korean: '태국', russian: 'Таиланд', english: 'Thailand' },
    { korean: '수영하다', russian: 'плавать', english: 'swim' },
    { korean: '망고', russian: 'манго', english: 'mango' },
    { korean: '선글라스', russian: 'солнечные очки', english: 'sunglasses' },
    { korean: '부채', russian: 'веер', english: 'fan' },
    { korean: '슬리퍼', russian: 'шлёпанцы', english: 'slippers' },
    { korean: '삼계탕', russian: 'самгетанг', english: 'samgyetang' },
    { korean: '들', russian: '...ы', english: 'plural' }
  ],
  '8과': [
    { korean: '골프', russian: 'гольф', english: 'golf' },
    { korean: '자전거', russian: 'велосипед', english: 'bicycle' },
    { korean: '게임', russian: 'игра', english: 'game' },
    { korean: '테니스', russian: 'теннис', english: 'tennis' },
    { korean: '농구', russian: 'баскетбол', english: 'basketball' },
    { korean: '피아노', russian: 'пианино', english: 'piano' },
    { korean: '당구', russian: 'бильярд', english: 'billiard' },
    { korean: '스키', russian: 'лыжи', english: 'ski' },
    { korean: '기타', russian: 'гитара', english: 'guitar' },
    { korean: '스케이트', russian: 'скейт', english: 'skate' },
    { korean: '축구', russian: 'футбол', english: 'football' },
    { korean: '치다', russian: 'бить/играть', english: 'hit/play' },
    { korean: '타다', russian: 'ездить/летать', english: 'ride/fly' },
    { korean: '하다', russian: 'делать', english: 'do' },
    { korean: '낮잠을 자다', russian: 'дневной сон', english: 'take a nap' },
    { korean: '등산을 하다', russian: 'ходить в горы', english: 'hike' },
    { korean: '산책을 하다', russian: 'гулять', english: 'take a walk' },
    { korean: '여행을 하다', russian: 'путешествовать', english: 'travel' },
    { korean: '노래방에 가다', russian: 'идти в караоке', english: 'go to karaoke' },
    { korean: '찜질방에 가다', russian: 'идти в чжимчильбан', english: 'go to jjimjilbang' },
    { korean: '걷다', russian: 'ходить', english: 'walk' },
    { korean: '버스', russian: 'автобус', english: 'bus' },
    { korean: '타다', russian: 'садиться', english: 'ride' },
    { korean: '걸어서 가다', russian: 'идти пешком', english: 'walk' },
    { korean: '음악', russian: 'музыка', english: 'music' },
    { korean: '듣다', russian: 'слушать', english: 'listen' },
    { korean: '뉴스', russian: 'новости', english: 'news' },
    { korean: '라디오', russian: 'радио', english: 'radio' },
    { korean: '잘', russian: 'хорошо', english: 'well' },
    { korean: '생활', russian: 'жизнь', english: 'life' },
    { korean: '조금', russian: 'немного', english: 'a little' },
    { korean: '심심하다', russian: 'скучно', english: 'bored' },
    { korean: '한강', russian: 'река Ханган', english: 'Han River' },
    { korean: '그런데', russian: 'но', english: 'but' },
    { korean: '어떻게', russian: 'как', english: 'how' },
    { korean: '가깝다', russian: 'близко', english: 'close' },
    { korean: '관악산', russian: 'гора Кванак', english: 'Gwanaksan' },
    { korean: '시청', russian: 'мэрия', english: 'city hall' },
    { korean: '정말', russian: 'действительно', english: 'really' },
    { korean: '많다', russian: 'много', english: 'many' },
    { korean: '자주', russian: 'часто', english: 'often' },
    { korean: '그래요', russian: 'да', english: 'yes' },
    { korean: '다음', russian: 'следующий', english: 'next' },
    { korean: '피곤하다', russian: 'усталый', english: 'tired' },
    { korean: '크다', russian: 'большой', english: 'big' },
    { korean: '식혜', russian: 'сикхе', english: 'sikhae' },
    { korean: '저기', russian: 'там', english: 'over there' },
    { korean: '수업', russian: 'урок', english: 'class' },
    { korean: '오후', russian: 'день', english: 'afternoon' },
    { korean: '운동장', russian: 'спортивная площадка', english: 'sports field' },
    { korean: '번', russian: 'номер', english: 'number' },
    { korean: '보통', russian: 'обычно', english: 'usually' },
    { korean: '미팅', russian: 'встреча', english: 'meeting' },
    { korean: '소개하다', russian: 'представлять', english: 'introduce' },
    { korean: '소개팅', russian: 'свидание по знакомству', english: 'blind date' },
    { korean: '웃어른', russian: 'старший', english: 'elder' },
    { korean: '선을 보다', russian: 'свидание через сватов', english: 'arranged meeting' }
  ]
};

type UnitTranslation = { russian: string; english: string };

const unitTranslationQueues: Record<string, Record<string, UnitTranslation[]>> = Object.fromEntries(
  Object.entries(unitTranslationsList).map(([unit, list]) => {
    const map: Record<string, UnitTranslation[]> = {};
    for (const item of list) {
      if (!map[item.korean]) map[item.korean] = [];
      map[item.korean].push({ russian: item.russian, english: item.english });
    }
    return [unit, map];
  })
);

function FlashcardsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lang } = useLanguage();
  const { user, logActivity, isPremium, loading: userLoading, saveFlashcardProgress, loadFlashcardProgress, syncLocalProgress, logout } = useUser();

  const initialBookFromQuery = (searchParams.get('book') as Book | null) ?? null;
  const [selectedBook, setSelectedBook] = useState<Book>(BOOKS.includes(initialBookFromQuery as Book) ? (initialBookFromQuery as Book) : '1A');

  const unitKeysForBook = useMemo(() => {
    return unitKeysByBook[selectedBook] || [];
  }, [selectedBook]);

  const initialUnitFromQuery = searchParams.get('unit');
  const [selectedUnit, setSelectedUnit] = useState<string>(() => {
    if (initialUnitFromQuery && units[initialUnitFromQuery] && unitKeysForBook.includes(initialUnitFromQuery)) {
      return initialUnitFromQuery;
    }
    return unitKeysByBook[selectedBook]?.[0] || (selectedBook === '1A' ? '1과' : '9과');
  });

  const unitProgressKey = useMemo(() => `${selectedBook}:${selectedUnit}`, [selectedBook, selectedUnit]);

  useEffect(() => {
    if (!unitKeysForBook.includes(selectedUnit)) {
      setSelectedUnit(unitKeysForBook[0] || (selectedBook === '1A' ? '1과' : '9과'));
    }
  }, [selectedBook, selectedUnit, unitKeysForBook]);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Show loading while user authentication is being checked
  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">{translations[lang].loadingFlashcards}</div>
      </div>
    );
  }

  const cards = useMemo(() => {
    const base = units[selectedUnit] || [];
    const queuesForUnit = unitTranslationQueues[selectedUnit];
    if (!queuesForUnit) return base;

    const queues: Record<string, UnitTranslation[]> = {};
    for (const [korean, list] of Object.entries(queuesForUnit)) {
      queues[korean] = [...list];
    }

    return base.map((card) => {
      if (card.russian || card.english) return card;
      const list = queues[card.korean];
      const t = list && list.length > 0 ? list.shift() : undefined;
      if (!t) return card;

      return {
        ...card,
        russian: t.russian,
        english: t.english
      };
    });
  }, [selectedUnit]);
  const allIndices = useMemo(() => cards.map((_, i) => i), [cards]);

  const [deckOrder, setDeckOrder] = useState<number[]>([]);
  const [deckPosition, setDeckPosition] = useState(0);

  const [mode, setMode] = useState<'all' | 'again'>('all');
  const [shuffleEnabled, setShuffleEnabled] = useState(false);

  const [isFlipped, setIsFlipped] = useState(false);
  const [mastered, setMastered] = useState<number[]>([]);
  const [again, setAgain] = useState<number[]>([]);
  const [masteryAnimation, setMasteryAnimation] = useState<'success' | 'again' | null>(null);
  const [cardKey, setCardKey] = useState(0);

  const keyboardScopeRef = useRef<HTMLDivElement>(null);

  const againClean = useMemo(() => {
    const filtered = again.filter((i) => Number.isFinite(i) && i >= 0 && i < cards.length && !mastered.includes(i));
    return Array.from(new Set(filtered));
  }, [again, cards.length, mastered]);

  const activeIndices = mode === 'again' ? againClean : allIndices;
  const currentIndex = deckOrder[deckPosition] ?? activeIndices[0] ?? 0;

  // Safety check: ensure currentIndex is valid
  const safeCurrentIndex = (currentIndex >= 0 && currentIndex < cards.length) ? currentIndex : 0;
  const currentCard = cards[safeCurrentIndex];

  const unmasteredIndices = useMemo(() => {
    return cards.map((_, i) => i).filter((i) => !mastered.includes(i));
  }, [cards, mastered]);

  const ui = useMemo(() => {
    return {
      all: translations[lang].all,
      shuffle: translations[lang].shuffle,
      prev: translations[lang].previous,
      next: translations[lang].next,
      again: translations[lang].again,
      mastered: translations[lang].mastered,
      reset: translations[lang].reset
    };
  }, [lang]);

  const translationText = useMemo(() => {
    if (!currentCard) return '';
    if (lang === 'ru') return currentCard.russian || currentCard.uzbek;
    if (lang === 'en') return currentCard.english || currentCard.uzbek;
    return currentCard.uzbek;
  }, [currentCard, lang]);

  const shuffleArray = (arr: number[]) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const rebuildDeck = (opts?: { keepCurrent?: boolean; nextMode?: 'all' | 'again' }) => {
    const keepCurrent = opts?.keepCurrent ?? true;
    const nextMode = opts?.nextMode ?? mode;

    const indices = nextMode === 'again' ? againClean : allIndices;
    const nextDeck = shuffleEnabled ? shuffleArray(indices) : [...indices];

    let nextPos = 0;
    if (keepCurrent) {
      const found = nextDeck.indexOf(currentIndex);
      nextPos = found >= 0 ? found : 0;
    }

    setMode(nextMode);
    setDeckOrder(nextDeck);
    setDeckPosition(Math.max(0, Math.min(nextPos, Math.max(0, nextDeck.length - 1))));
    setIsFlipped(false);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const loadProgress = async () => {
      if (user) {
        let backendProgress = await loadFlashcardProgress(unitProgressKey);

        // Backward compatibility: migrate legacy 1A progress stored under plain unit name.
        if (selectedBook === '1A' && backendProgress.mastered.length === 0 && backendProgress.again.length === 0) {
          const legacy = await loadFlashcardProgress(selectedUnit);
          if (legacy.mastered.length > 0 || legacy.again.length > 0) {
            backendProgress = legacy;
            await syncLocalProgress(unitProgressKey, legacy.mastered, legacy.again);
          }
        }
        
        const raw = localStorage.getItem(FLASHCARDS_PROGRESS_KEY);
        let localProgress: FlashcardsProgressV1 | null = null;
        if (raw) {
          try {
            const parsed = JSON.parse(raw) as FlashcardsProgressV1;
            if (parsed && parsed.version === 1 && parsed.units) {
              localProgress = parsed;
            }
          } catch {
            // Ignore parsing errors
          }
        }
        
        const localUnitKey = localProgress?.units[unitProgressKey]
          ? unitProgressKey
          : (selectedBook === '1A' && localProgress?.units[selectedUnit] ? selectedUnit : null);

        if (localProgress && localUnitKey) {
          const unitProgress = localProgress.units[localUnitKey];
          await syncLocalProgress(unitProgressKey, unitProgress.masteredIndices, unitProgress.againIndices || []);
        }
        
        setMastered(backendProgress.mastered);
        setAgain(backendProgress.again);
        setMode('all');
        setShuffleEnabled(false);
        setDeckOrder(allIndices);
        // Don't reset position when loading from backend - keep it at 0 for fresh load
        setIsFlipped(false);
      } else {
        const raw = localStorage.getItem(FLASHCARDS_PROGRESS_KEY);
        if (!raw) {
          setMastered([]);
          setAgain([]);
          setMode('all');
          setShuffleEnabled(false);
          setDeckOrder(allIndices);
          setDeckPosition(0);
          setIsFlipped(false);
          return;
        }
        const parsed = JSON.parse(raw) as FlashcardsProgressV1;
        if (!parsed || parsed.version !== 1 || !parsed.units) {
          setMastered([]);
          setAgain([]);
          setMode('all');
          setShuffleEnabled(false);
          setDeckOrder(allIndices);
          setDeckPosition(0);
          setIsFlipped(false);
          return;
        }
        const unitData = parsed.units[unitProgressKey]
          ? parsed.units[unitProgressKey]
          : (selectedBook === '1A' && parsed.units[selectedUnit] ? parsed.units[selectedUnit] : undefined);

        const resolvedUnitData = unitData || {
          masteredIndices: [],
          lastIndex: 0,
          totalCards: cards.length,
          againIndices: [],
          mode: 'all' as const,
          shuffleEnabled: false,
          deckOrder: [],
          deckPosition: 0,
          updatedAt: new Date().toISOString()
        };

        // If we used legacy 1A key, write it under the new book-scoped key.
        if (selectedBook === '1A' && !parsed.units[unitProgressKey] && parsed.units[selectedUnit]) {
          parsed.units[unitProgressKey] = parsed.units[selectedUnit];
          localStorage.setItem(FLASHCARDS_PROGRESS_KEY, JSON.stringify(parsed));
        }

        setMastered(resolvedUnitData.masteredIndices);
        setAgain(resolvedUnitData.againIndices || []);
        setMode(resolvedUnitData.mode || 'all');
        setShuffleEnabled(resolvedUnitData.shuffleEnabled || false);
        setDeckOrder(resolvedUnitData.deckOrder || allIndices);
        setDeckPosition(resolvedUnitData.deckPosition || 0);
        setIsFlipped(false);
      }
    };

    loadProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards.length, selectedBook, selectedUnit, unitProgressKey, user]);

  useEffect(() => {
    if (deckOrder.length > 0) return;
    if (cards.length === 0) return;
    setDeckOrder(allIndices);
    setDeckPosition(0);
    setIsFlipped(false);
  }, [allIndices, cards.length, deckOrder.length]);

  useEffect(() => {
    const desired = mode === 'again' ? againClean : allIndices;
    const current = deckOrder;

    if (desired.length === 0) {
      if (deckOrder.length !== 0) {
        setDeckOrder([]);
        setDeckPosition(0);
        setIsFlipped(false);
      }
      return;
    }

    const desiredSet = new Set(desired);
    const currentOnlyContainsDesired = current.every((i) => desiredSet.has(i));
    const shouldRebuild = !currentOnlyContainsDesired || current.length !== desired.length;
    if (!shouldRebuild) return;

    const nextDeck = shuffleEnabled ? shuffleArray(desired) : [...desired];
    const found = nextDeck.indexOf(currentIndex);
    setDeckOrder(nextDeck);
    setDeckPosition(found >= 0 ? found : 0);
    setIsFlipped(false);
  }, [againClean, allIndices, currentIndex, deckOrder, mode, shuffleEnabled]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const data: FlashcardsProgressV1 = (() => {
      try {
        const raw = localStorage.getItem(FLASHCARDS_PROGRESS_KEY);
        if (!raw) return { version: 1, units: {} };
        const parsed = JSON.parse(raw) as FlashcardsProgressV1;
        if (!parsed || parsed.version !== 1 || !parsed.units) return { version: 1, units: {} };
        return parsed;
      } catch {
        return { version: 1, units: {} };
      }
    })();

    data.units[unitProgressKey] = {
      masteredIndices: mastered,
      againIndices: again,
      mode,
      shuffleEnabled,
      deckOrder,
      deckPosition,
      lastIndex: currentIndex,
      totalCards: cards.length,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(FLASHCARDS_PROGRESS_KEY, JSON.stringify(data));
  }, [again, cards.length, currentIndex, deckOrder, deckPosition, mastered, mode, shuffleEnabled, unitProgressKey]);

  useEffect(() => {
    keyboardScopeRef.current?.focus();
  }, [selectedUnit]);

  const deckSize = deckOrder.length;
  const isDone = mode === 'again' ? againClean.length === 0 : unmasteredIndices.length === 0;

  const nextCard = () => {
    if (deckSize === 0) return;
    setIsFlipped(false);
    setCardKey(prev => prev + 1); // Trigger re-render for animation
    setDeckPosition((p) => (p + 1) % deckSize);
  };

  const prevCard = () => {
    if (deckSize === 0) return;
    setIsFlipped(false);
    setCardKey(prev => prev + 1); // Trigger re-render for animation
    setDeckPosition((p) => (p - 1 + deckSize) % deckSize);
  };

  const markAgain = () => {
    if (deckSize === 0) return;
    if (!mastered.includes(currentIndex)) {
      setAgain((a) => (a.includes(currentIndex) ? a : [...a, currentIndex]));
      // Save to backend if authenticated
      if (user) {
        saveFlashcardProgress(unitProgressKey, currentIndex, false, true);
        logActivity('flashcard_review', { unit: unitProgressKey, cardIndex: currentIndex, action: 'again' }, 1);
      }
    }
    setMasteryAnimation('again');
    setTimeout(() => setMasteryAnimation(null), 500);
    nextCard();
  };

  const markMastered = () => {
    if (deckSize === 0) return;
    if (!mastered.includes(currentIndex)) {
      setMastered((m) => [...m, currentIndex]);
      setAgain((a) => a.filter((i) => i !== currentIndex));
      // Save to backend if authenticated
      if (user) {
        saveFlashcardProgress(unitProgressKey, currentIndex, true, false);
        logActivity('flashcard_review', { unit: unitProgressKey, cardIndex: currentIndex, action: 'mastered' }, 2);
      }
    }
    setMasteryAnimation('success');
    setTimeout(() => setMasteryAnimation(null), 1000);
    nextCard();
  };

  const resetUnitProgress = () => {
    setMastered([]);
    setAgain([]);
    setMode('all');
    setShuffleEnabled(false);
    setDeckOrder(allIndices);
    setDeckPosition(0);
    setIsFlipped(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KC</span>
              </div>
              <span className="text-white font-semibold text-lg">Koreancha.uz</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white/80 hover:text-white transition">
                {translations[lang].home}
              </Link>
              <Link href="/exercises" className="text-white hover:text-white transition">
                {translations[lang].exercises}
              </Link>
              <Link href="/progress" className="text-white/80 hover:text-white transition">
                {translations[lang].progress}
              </Link>
              <Link href="/contacts" className="text-white/80 hover:text-white transition">
                {translations[lang].contact}
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              
              {user ? (
                <>
                  <Link href="/dashboard" className="hidden md:block text-white/80 hover:text-white transition">
                    {translations[lang].dashboard}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    {translations[lang].logout}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="hidden md:block text-white/80 hover:text-white transition">
                    {translations[lang].login}
                  </Link>
                  <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                    {translations[lang].signup}
                  </Link>
                </>
              )}

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
                aria-label="Open menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-6 pb-28">
        {/* Demo mode banner for unauthenticated users */}
        {!user && (
          <div className="mb-6 rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-orange-300">{translations[lang].progressNotSaved}</div>
                <div className="text-sm text-orange-200/70">
                  {translations[lang].guestModeUsing}{' '}
                  <Link href="/login" className="underline hover:text-orange-200 font-semibold">{translations[lang].signup}</Link>{' '}
                  {translations[lang].saveYourProgressSuffix}
                </div>
              </div>
              <Link href="/login" className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500 transition">
                {translations[lang].signup}
              </Link>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{translations[lang].flashcards}</h1>
            <div className="hidden sm:block text-sm text-white/60">{selectedUnit}</div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/exercises" className="text-sm font-semibold text-white/70 hover:text-white transition">
              {translations[lang].exercises}
            </Link>
            <Link href="/" className="text-sm font-semibold text-white/70 hover:text-white transition">
              {translations[lang].home}
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-sm font-semibold text-white/70">{translations[lang].selectBook}</div>
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value as Book)}
              className="px-4 py-2 rounded-lg border border-white/10 text-sm bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            >
              <option value="1A" className="bg-[#0b0f1a]">{translations[lang].book1A}</option>
              <option value="1B" className="bg-[#0b0f1a]">{translations[lang].book1B}</option>
            </select>

            <div className="text-sm font-semibold text-white/70">{translations[lang].selectUnit}</div>
            <select
              value={selectedUnit}
              onChange={(e) => {
                setSelectedUnit(e.target.value);
              }}
              className="px-4 py-2 rounded-lg border border-white/10 text-sm bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            >
              {unitKeysForBook.map((unit) => (
                <option key={unit} value={unit} className="bg-[#0b0f1a]">
                  {unit}
                </option>
              ))}
            </select>
          </div>
          <div className="text-xs sm:text-sm text-white/60">
            {cards.length > 0 ? (
              <>
                {deckSize > 0 ? `${deckPosition + 1} / ${deckSize}` : `0 / 0`} • {translations[lang].mastered} {mastered.length}/{cards.length} • {translations[lang].again}{' '}
                {againClean.length}
              </>
            ) : (
              <>{translations[lang].pleaseSelectUnit}</>
            )}
          </div>
        </div>

        <div className="mt-3 text-xs text-white/50">
          {translations[lang].flashcardsShortcuts}
        </div>

        {cards.length === 0 || !currentCard ? (
          <div className="mt-10 p-8 text-center text-white/70">{translations[lang].pleaseSelectUnit}</div>
        ) : isDone ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 shadow-sm p-8 text-center">
            <div className="text-2xl font-bold text-white">{translations[lang].great}</div>
            <div className="mt-2 text-white/70">
              {mode === 'again' ? (
                <>{translations[lang].noAgainCardsLeftInUnit.replace('{unit}', selectedUnit)}</>
              ) : (
                <>{translations[lang].youMasteredAllCardsInUnit.replace('{unit}', selectedUnit)}</>
              )}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {mode === 'again' && (
                <button
                  type="button"
                  onClick={() => rebuildDeck({ nextMode: 'all' })}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold"
                >
                  {translations[lang].backToAll}
                </button>
              )}
              <button
                type="button"
                onClick={resetUnitProgress}
                className="bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-xl font-bold border border-white/10"
              >
                {translations[lang].resetUnit}
              </button>
              <Link
                href="/exercises"
                className="bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 rounded-xl font-bold"
              >
                {translations[lang].backToExercises}
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <div
              ref={keyboardScopeRef}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Tab') {
                  e.preventDefault();
                  setIsFlipped((v) => !v);
                  return;
                }
                if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  nextCard();
                  return;
                }
                if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  prevCard();
                  return;
                }
                if (e.key.toLowerCase() === 'a') {
                  e.preventDefault();
                  markAgain();
                  return;
                }
                if (e.key.toLowerCase() === 'm') {
                  e.preventDefault();
                  markMastered();
                  return;
                }
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsFlipped((v) => !v);
                }
              }}
              className="mx-auto w-full max-w-4xl h-96 sm:h-[28rem] cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500/60 focus:ring-offset-2 focus:ring-offset-transparent rounded-3xl transition-all duration-300 hover:scale-[1.02]"
              style={{ perspective: '1000px' }}
              onClick={() => setIsFlipped((v) => !v)}
            >
              <div
                className="relative w-full h-full transition-transform duration-700 ease-in-out"
                style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                key={cardKey}
              >
                {/* Front of card */}
                <div
                  className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-white/10 rounded-3xl shadow-2xl flex items-center justify-center p-8 backdrop-blur-sm"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {currentCard ? (
                    <div className="text-center">
                      <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tight drop-shadow-lg animate-pulse-once">
                        {currentCard.korean}
                      </div>
                      <div className="mt-4 text-sm text-white/50 font-medium">{translations[lang].clickToFlip}</div>
                    </div>
                  ) : (
                    <div className="text-center text-white/50">
                      <div className="text-2xl mb-2">{translations[lang].noCardAvailable}</div>
                      <div className="text-sm">{translations[lang].pleaseSelectUnit}</div>
                    </div>
                  )}
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-600/95 via-purple-600/95 to-fuchsia-600/95 rounded-3xl shadow-2xl flex items-center justify-center p-8 backdrop-blur-sm"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  {currentCard ? (
                    <div className="text-center text-white max-w-full">
                      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-none tracking-tight drop-shadow-lg">
                        {currentCard.korean}
                      </div>
                      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-relaxed drop-shadow-md">
                        {translationText}
                      </div>
                      <div className="mt-6 text-sm text-white/70 font-medium">{translations[lang].clickToFlipBack}</div>
                    </div>
                  ) : (
                    <div className="text-center text-white/50">
                      <div className="text-2xl mb-2">{translations[lang].noCardAvailable}</div>
                      <div className="text-sm">{translations[lang].pleaseSelectUnit}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {cards.length > 0 && currentCard && !isDone && (
          <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-[#0b0f1a]/95 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 sm:px-8 py-4">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => rebuildDeck({ nextMode: 'all' })}
                      className={`px-3 py-2 rounded-lg border text-sm font-semibold transition ${
                        mode === 'all'
                          ? 'bg-white text-gray-900 border-white'
                          : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {ui.all}
                    </button>
                    <button
                      type="button"
                      disabled={againClean.length === 0}
                      onClick={() => rebuildDeck({ nextMode: 'again' })}
                      className={`px-3 py-2 rounded-lg border text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${
                        mode === 'again'
                          ? 'bg-indigo-500 text-white border-indigo-400'
                          : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {ui.again} ({againClean.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const indices = mode === 'all' ? allIndices : againClean;
                        const currentCardIndex = deckOrder[deckPosition];
                        const shuffled = [...indices].sort(() => Math.random() - 0.5);
                        const newPosition = shuffled.indexOf(currentCardIndex);
                        setDeckOrder(shuffled);
                        setDeckPosition(newPosition >= 0 ? newPosition : 0);
                        setIsFlipped(false);
                      }}
                      className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-sm font-semibold hover:bg-white/10 transition"
                    >
                      {ui.shuffle}
                    </button>
                  </div>

                  <div className="text-xs sm:text-sm text-white/60">
                    {deckSize > 0 ? `${deckPosition + 1} / ${deckSize}` : `0 / 0`} • {translations[lang].mastered} {mastered.length}/{cards.length}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${deckSize > 0 ? ((deckPosition + 1) / deckSize) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={prevCard}
                    className="px-5 py-2.5 rounded-xl font-bold border border-white/10 bg-white/5 hover:bg-white/10 text-white inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
                    </svg>
                    {ui.prev}
                  </button>
                  <button
                    type="button"
                    onClick={markAgain}
                    className={`px-5 py-2.5 rounded-xl font-bold bg-orange-600 hover:bg-orange-500 text-white transition-all duration-300 ${
                      masteryAnimation === 'again' ? 'animate-again scale-95' : 'hover:scale-105'
                    }`}
                  >
                    {ui.again}
                  </button>
                  <button
                    type="button"
                    onClick={markMastered}
                    className={`px-5 py-2.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all duration-300 ${
                      masteryAnimation === 'success' ? 'animate-success scale-105' : 'hover:scale-105'
                    }`}
                  >
                    {ui.mastered}
                  </button>
                  <button
                    type="button"
                    onClick={nextCard}
                    className="px-5 py-2.5 rounded-xl font-bold border border-white/10 bg-white/5 hover:bg-white/10 text-white inline-flex items-center gap-2"
                  >
                    {ui.next}
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={resetUnitProgress}
                    className="px-4 py-2.5 rounded-xl font-bold border border-white/10 bg-transparent hover:bg-white/5 text-white/80"
                  >
                    {ui.reset}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add bottom padding to prevent content overlap */}
        {cards.length > 0 && currentCard && !isDone && (
          <div className="h-32"></div>
        )}
      </div>
    </div>
  );
}

export default function FlashcardsPage() {
  const { lang } = useLanguage();

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">{translations[lang].loadingFlashcards}</div>
      </div>
    }>
      <FlashcardsPageContent />
    </Suspense>
  );
}
