'use client';

import { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useLanguage, useUser } from '../providers';
import { translations } from '../../lib/translations';

type Card = {
  korean: string;
  uzbek: string;
  russian?: string;
  english?: string;
};

type Units = Record<string, Card[]>;

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

const units: Units = {
  '1과': [
    { korean: '오', uzbek: 'besh' },
    { korean: '이', uzbek: 'bu/tish' },
    { korean: '아우', uzbek: 'bola' },
    { korean: '아이', uzbek: 'bola' },
    { korean: '오이', uzbek: 'bodring' },
    { korean: '가수', uzbek: "qo'shiqchi" },
    { korean: '고기', uzbek: "go'sht" },
    { korean: '구두', uzbek: 'tufli' },
    { korean: '나라', uzbek: 'davlat' },
    { korean: '나무', uzbek: 'daraxt' },
    { korean: '다리', uzbek: 'oyoq' },
    { korean: '라디오', uzbek: 'radio' },
    { korean: '머리', uzbek: 'bosh' },
    { korean: '바나나', uzbek: 'banan' },
    { korean: '바지', uzbek: 'shim' },
    { korean: '소', uzbek: 'sigir' },
    { korean: '아기', uzbek: 'chaqaloq' },
    { korean: '어머니', uzbek: 'ona' },
    { korean: '지도', uzbek: 'xarita' },
    { korean: '모자', uzbek: 'bosh kiyim' },
    { korean: '아버지', uzbek: 'ota' },
    { korean: '허리', uzbek: 'bel' },
    { korean: '지하', uzbek: 'yer osti' },
    { korean: '야구', uzbek: 'beyzbol' },
    { korean: '야자수', uzbek: 'palma' },
    { korean: '이야기', uzbek: 'suhbat' },
    { korean: '여자', uzbek: 'ayol' },
    { korean: '벼', uzbek: 'guruch' },
    { korean: '혀', uzbek: 'til' },
    { korean: '요가', uzbek: 'yoga' },
    { korean: '요리', uzbek: "ovqat pishirih" },
    { korean: '교수', uzbek: 'professor' },
    { korean: '유리', uzbek: 'shisha' },
    { korean: '휴지', uzbek: "tualet qog'ozi" },
    { korean: '우유', uzbek: 'sut' },
    { korean: '카드', uzbek: 'karta' },
    { korean: '코', uzbek: 'burun' },
    { korean: '키', uzbek: 'balandlik' },
    { korean: '타조', uzbek: 'tuyaqush' },
    { korean: '토마토', uzbek: 'pomidor' },
    { korean: '투우수', uzbek: 'matador' },
    { korean: '파리', uzbek: 'Parij' },
    { korean: '포도', uzbek: 'uzum' },
    { korean: '우표', uzbek: 'pochta markasi' },
    { korean: '차', uzbek: 'choy' },
    { korean: '치마', uzbek: 'yubka' },
    { korean: '고추', uzbek: 'qalampir' },
    { korean: '커피', uzbek: 'kofe' },
    { korean: '코트', uzbek: 'palto' },
    { korean: '기차표', uzbek: 'poyezd bilet' },
    { korean: '까치', uzbek: "zog'cha" },
    { korean: '꼬리', uzbek: 'dum' },
    { korean: '코끼리', uzbek: 'fil' },
    { korean: '따다', uzbek: 'uzmoq' },
    { korean: '뜨다', uzbek: 'suzmoq' },
    { korean: '머리띠', uzbek: 'abadok' },
    { korean: '뿌리', uzbek: 'tomir, ildiz' },
    { korean: '뼈', uzbek: 'suyak' },
    { korean: '아빠', uzbek: 'ota' },
    { korean: '싸다', uzbek: 'arzon' },
    { korean: '쓰다', uzbek: "yozmoq/foydalanmoq" },
    { korean: '아저씨', uzbek: "ko'chadagi amaki" },
    { korean: '짜다', uzbek: "sho'r" },
    { korean: '찌다', uzbek: "bug'lamoq" },
    { korean: '가짜', uzbek: 'qalbaki' },
    { korean: '개미', uzbek: 'chumoli' },
    { korean: '배', uzbek: 'qayiq' },
    { korean: '새', uzbek: 'qush' },
    { korean: '해', uzbek: 'quyosh' },
    { korean: '게', uzbek: 'qisqichbaqa' },
    { korean: '세수', uzbek: 'yuvinish' },
    { korean: '그네', uzbek: "arg'imchoq" },
    { korean: '카메라', uzbek: 'kamera' },
    { korean: '얘기', uzbek: 'suhbat' },
    { korean: '예쁘다', uzbek: 'chiroyli' },
    { korean: '서예', uzbek: 'xattotlik' },
    { korean: '시계', uzbek: 'soat apparati' },
    { korean: '과자', uzbek: 'pishiriq' },
    { korean: '와이셔츠', uzbek: "ko'ylak" },
    { korean: '화가', uzbek: 'jahl' },
    { korean: '사과', uzbek: 'olma' },
    { korean: '뭐', uzbek: 'nima' },
    { korean: '줘요', uzbek: 'bermoq' },
    { korean: '더워요', uzbek: 'issiq' },
    { korean: '추워요', uzbek: 'sovuq' },
    { korean: '돼지', uzbek: "cho'chqa" },
    { korean: '왜', uzbek: 'nimaga' },
    { korean: '웨이터', uzbek: 'ofitsant' },
    { korean: '스웨터', uzbek: 'svitr' },
    { korean: '쇠고기', uzbek: "mol go'shti" },
    { korean: '외우다', uzbek: 'yodlamoq' },
    { korean: '회사', uzbek: 'firma' },
    { korean: '두뇌', uzbek: 'miyya' },
    { korean: '귀', uzbek: 'quloq' },
    { korean: '쉬다', uzbek: 'dam olmoq' },
    { korean: '쥐', uzbek: 'sichqon' },
    { korean: '가위', uzbek: 'qaychi' },
    { korean: '의사', uzbek: 'doktor' },
    { korean: '의자', uzbek: 'stul' },
    { korean: '여의도', uzbek: 'Yoi oroli' },
    { korean: '회의', uzbek: 'majliz' },
    { korean: '수박', uzbek: 'tarvuz' },
    { korean: '책', uzbek: 'kitob' },
    { korean: '부엌', uzbek: 'uy oshxonasi/kuxnya' },
    { korean: '밖', uzbek: 'tashqari' },
    { korean: '돈', uzbek: 'pul' },
    { korean: '레몬', uzbek: 'limon' },
    { korean: '신문', uzbek: 'gazeta' },
    { korean: '우산', uzbek: 'zontik' },
    { korean: '곧', uzbek: 'yaqinda' },
    { korean: '밑', uzbek: 'osti' },
    { korean: '빗', uzbek: 'taroq' },
    { korean: '옷', uzbek: 'kiyim' },
    { korean: '낮', uzbek: 'kunduzi' },
    { korean: '꽃', uzbek: 'gul' },
    { korean: '빛', uzbek: 'nur' },
    { korean: '히읗', uzbek: 'h' },
    { korean: '딸기', uzbek: 'qulupnay' },
    { korean: '물', uzbek: 'suv' },
    { korean: '발', uzbek: 'oyoq' },
    { korean: '연필', uzbek: 'qalam' },
    { korean: '곰', uzbek: 'ayiq' },
    { korean: '남자', uzbek: 'erkak' },
    { korean: '엄마', uzbek: 'ona' },
    { korean: '컴퓨터', uzbek: 'kompyuter' },
    { korean: '밥', uzbek: 'qaynatilgan guruch' },
    { korean: '입', uzbek: "og'iz" },
    { korean: '무릎', uzbek: 'tizza' },
    { korean: '숲', uzbek: "o'rmon" },
    { korean: '가방', uzbek: 'sumka' },
    { korean: '공', uzbek: 'koptok' },
    { korean: '냉장고', uzbek: 'muzlatkich' },
    { korean: '창문', uzbek: 'deraza' }
  ],
  '2과': [
    { korean: '책상', uzbek: 'parta' },
    { korean: '의자', uzbek: 'stul' },
    { korean: '책', uzbek: 'kitob' },
    { korean: '공책', uzbek: 'daftar' },
    { korean: '볼펜', uzbek: 'ruchka' },
    { korean: '연필', uzbek: 'qalam' },
    { korean: '가방', uzbek: 'sumka' },
    { korean: '지우개', uzbek: "ochirg'ich" },
    { korean: '시계', uzbek: 'soat' },
    { korean: '모자', uzbek: 'bosh kiyim' },
    { korean: '우산', uzbek: 'soyabon' },
    { korean: '신문', uzbek: 'gazeta' },
    { korean: '사전', uzbek: "lug'at" },
    { korean: '안경', uzbek: "ko'zoynak" },
    { korean: '휴대폰', uzbek: 'telefon' },
    { korean: '남자친구', uzbek: "yigit o'rtoq" },
    { korean: '동전', uzbek: 'tanga' },
    { korean: '차', uzbek: 'mashina' },
    { korean: '한국어', uzbek: 'koreys tili' },
    { korean: '여자 친구', uzbek: "qiz o'rtoq" },
    { korean: '뭐', uzbek: 'nima' },
    { korean: '창문', uzbek: 'deraza' },
    { korean: '지도', uzbek: 'xarita' },
    { korean: '필통', uzbek: 'penal/qalamdon' },
    { korean: '전자사전', uzbek: "elektron lug'at" },
    { korean: '한국어로', uzbek: 'koreys tilida' },
    { korean: '자', uzbek: "chizg'ich" },
    { korean: '잡지', uzbek: 'jurnal' },
    { korean: '지갑', uzbek: 'hamyon' },
    { korean: '여기 있어요', uzbek: 'marhamat' },
    { korean: '커피', uzbek: 'kofe' },
    { korean: '좀', uzbek: 'iltimos' },
    { korean: '콜라', uzbek: 'kola' },
    { korean: '주스', uzbek: 'sharbat' },
    { korean: '교통카드', uzbek: 'transport kartasi' },
    { korean: '휴지', uzbek: 'salfetka' },
    { korean: '물', uzbek: 'suv' },
    { korean: '어서 오세요', uzbek: 'xush kelibsiz' },
    { korean: '사과', uzbek: 'olma' },
    { korean: '오랜지', uzbek: 'apelsin' },
    { korean: '영화', uzbek: 'kino' },
    { korean: '우유', uzbek: 'sut' },
    { korean: '바나나', uzbek: 'banan' },
    { korean: '딸기', uzbek: 'qulupnay' },
    { korean: '텔레비전', uzbek: 'televizor' },
    { korean: '방', uzbek: 'xona' },
    { korean: '서울대학교', uzbek: 'Seul universiteti' },
    { korean: '제', uzbek: 'mening' },
    { korean: '침대', uzbek: 'kravat' },
    { korean: '룸메이트', uzbek: 'xonadosh' },
    { korean: '에어컨', uzbek: 'konditsioner' },
    { korean: '물건', uzbek: 'narsa' },
    { korean: '팀', uzbek: 'jamoa' },
    { korean: '나누다', uzbek: "bo'lishmoq" },
    { korean: '받다', uzbek: 'olmoq' },
    { korean: '붙이다', uzbek: 'yopishtirmoq' }
  ],
  '3과': [
    { korean: '자다', uzbek: 'uxlamoq' },
    { korean: '공부하다', uzbek: "o'qimoq/o'rganmoq" },
    { korean: '일하다', uzbek: 'ishlamoq' },
    { korean: '운동하다', uzbek: "sport bilan shug'ullanmoq" },
    { korean: '숙제를 하다', uzbek: 'uy vazifa qilmoq' },
    { korean: '옷을 사다', uzbek: 'kiyim sotib olmoq' },
    { korean: '영화를 보다', uzbek: "kino ko'rmoq" },
    { korean: '친구를 만나다', uzbek: "do'sti bilan uchrashmoq" },
    { korean: '태권도를 배우다', uzbek: 'tekvando o\'rganmoq' },
    { korean: '밥을 먹다', uzbek: 'ovqat yemoq' },
    { korean: '커피를 마시다', uzbek: 'kofe ichmoq' },
    { korean: '책을 읽다', uzbek: "kitob o'qimoq" },
    { korean: '도서관', uzbek: 'kutubxona' },
    { korean: '집', uzbek: 'uy' },
    { korean: '백화점', uzbek: 'univermag' },
    { korean: '시장', uzbek: 'bozor' },
    { korean: '공원', uzbek: "park/bog’" },
    { korean: '커피숍', uzbek: 'kafe' },
    { korean: '극장', uzbek: 'kinoteatr' },
    { korean: '학교', uzbek: 'maktab' },
    { korean: '식당', uzbek: 'oshxona' },
    { korean: '회사', uzbek: 'firma' },
    { korean: '지금', uzbek: 'hozir' },
    { korean: '하다', uzbek: 'qilmoq' },
    { korean: '쉬다', uzbek: 'dam olmoq' },
    { korean: '피자', uzbek: 'pitsa' },
    { korean: '보다', uzbek: "ko'rmoq" },
    { korean: '사다', uzbek: 'sotib olmoq' },
    { korean: '먹다', uzbek: 'yemoq' },
    { korean: '마시다', uzbek: 'ichmoq' },
    { korean: '읽다', uzbek: "o'qimoq" },
    { korean: '배우다', uzbek: "o'rganmoq" },
    { korean: '일본어', uzbek: 'yapon tili' },
    { korean: '아르바이트하다', uzbek: "qo'shimcha ish qilmoq" },
    { korean: '요리', uzbek: 'pishirish' },
    { korean: '만나다', uzbek: 'uchrashmoq' },
    { korean: '오늘', uzbek: 'bugun' },
    { korean: '그리고', uzbek: 'va' },
    { korean: '어디', uzbek: 'qayer' },
    { korean: '고기', uzbek: "go'sht" },
    { korean: '프랑스어', uzbek: 'fransuz tili' },
    { korean: '드라마', uzbek: 'serial/dorama' },
    { korean: '그럼', uzbek: "unday bo'lsa" },
    { korean: '스포츠 센터', uzbek: 'sport markazi' },
    { korean: '차', uzbek: 'choy' },
    { korean: '가르치다', uzbek: "o'qitmoq" },
    { korean: '언어교육원', uzbek: 'til markazi' },
    { korean: '불고기', uzbek: 'pulgogi' },
    { korean: '노래방', uzbek: 'karaoke' }
  ],
  '4과': [
    { korean: '공항', uzbek: 'aeroport' },
    { korean: '우체국', uzbek: 'pochta' },
    { korean: '대사관', uzbek: 'elchixona' },
    { korean: '은행', uzbek: 'bank' },
    { korean: '가게', uzbek: 'magazin' },
    { korean: '약국', uzbek: 'apteka' },
    { korean: '병원', uzbek: 'kasalxona' },
    { korean: '미용실', uzbek: 'sartaroshxona' },
    { korean: '앞', uzbek: 'oldi' },
    { korean: '뒤', uzbek: 'orqasi' },
    { korean: '옆', uzbek: 'yoni' },
    { korean: '안', uzbek: 'ichi' },
    { korean: '아래/ 밑', uzbek: 'osti/tagi' },
    { korean: '위', uzbek: 'usti' },
    { korean: '인사동', uzbek: 'Insadong' },
    { korean: '서울타워', uzbek: 'Seul minorasi' },
    { korean: '명동', uzbek: 'Myongdong' },
    { korean: '청계천', uzbek: 'Chonkechon' },
    { korean: '대학로', uzbek: 'Seuldagi attraksion' },
    { korean: '남산', uzbek: "Nam tog'i" },
    { korean: '교실', uzbek: 'sinf xona' },
    { korean: '찻집', uzbek: 'choyxona' },
    { korean: '서울', uzbek: 'Seul' },
    { korean: '시내', uzbek: 'shahar markazi' },
    { korean: '구경하다', uzbek: 'tomosha qilmoq' },
    { korean: '쇼핑하다', uzbek: 'xarid qilmoq' },
    { korean: '연극', uzbek: 'teatr' },
    { korean: '알다', uzbek: 'bilmoq' },
    { korean: '어머니', uzbek: 'ona' },
    { korean: '아버지', uzbek: 'ota' },
    { korean: '잘 지내다', uzbek: "ishlari yaxshi bo’lmoq" },
    { korean: '기숙사', uzbek: 'yotoqxona' },
    { korean: '사진', uzbek: 'rasm' },
    { korean: '매일', uzbek: 'harb kuni' },
    { korean: '그', uzbek: 'u' },
    { korean: '반', uzbek: 'sinf' },
    { korean: '사랑하다', uzbek: 'sevmoq' },
    { korean: '서점', uzbek: "kitob do’koni" },
    { korean: '빵집', uzbek: 'nonvoyxona' },
    { korean: '화장실', uzbek: 'hojatxona' },
    { korean: '음식', uzbek: 'ovqat/taom' },
    { korean: '가념품', uzbek: 'suvenir' },
    { korean: '그림', uzbek: 'rasm' }
  ],
  '5과': [
    { korean: '숫자', uzbek: 'raqam, son' },
    { korean: '월요일', uzbek: 'dushanba' },
    { korean: '화요일', uzbek: 'seshanba' },
    { korean: '수요일', uzbek: 'chorshanba' },
    { korean: '목요일', uzbek: 'payshanba' },
    { korean: '금요일', uzbek: 'juma' },
    { korean: '토요일', uzbek: 'shanba' },
    { korean: '일요일', uzbek: 'yakshanba' },
    { korean: '주말', uzbek: 'hafta oxiri' },
    { korean: '날짜', uzbek: 'sana' },
    { korean: '요일', uzbek: 'hafta kuni' },
    { korean: '며칠', uzbek: 'qaysi kun' },
    { korean: '시험', uzbek: 'imtixon' },
    { korean: '언제', uzbek: 'qachon' },
    { korean: '무슨', uzbek: 'qaysi' },
    { korean: '생일', uzbek: "tug'ilgan kun" },
    { korean: '하고', uzbek: 'bilan' },
    { korean: '크리스마스', uzbek: 'krismas' },
    { korean: '파티', uzbek: 'bazm' },
    { korean: '시간', uzbek: 'vaqt' },
    { korean: '미안하다', uzbek: "uzr so'ramoq" },
    { korean: '약속', uzbek: 'uchrashuv/vada' },
    { korean: '같이', uzbek: 'birga' },
    { korean: '어제', uzbek: 'kecha' },
    { korean: '코엑스몰', uzbek: 'Seuldagi savdo markazi' },
    { korean: '카드', uzbek: 'karta' },
    { korean: '선물', uzbek: "sovg'a" },
    { korean: '세수하다', uzbek: 'yuvinmoq' },
    { korean: '이를 닦다', uzbek: 'tish yuvmoq' },
    { korean: '거기', uzbek: 'u joy' },
    { korean: '산책하다', uzbek: 'sayr qilmoq' },
    { korean: '사진을 찍다', uzbek: 'rasm olmoq' },
    { korean: '누구', uzbek: 'kim' },
    { korean: '혼자', uzbek: "yolg'iz" },
    { korean: '끝나다', uzbek: 'tugamoq' },
    { korean: '강남역', uzbek: 'Gangnam bekati' },
    { korean: '그래서', uzbek: 'shuning uchun' },
    { korean: '내일', uzbek: 'ertaga' },
    { korean: '스케줄', uzbek: 'kun tartibi' },
    { korean: '지난주', uzbek: "o’tgan hafta" },
    { korean: '양력', uzbek: 'quyosh kalendari' },
    { korean: '음력', uzbek: 'oy kalendari' },
    { korean: '설날', uzbek: 'yangi yil' },
    { korean: '세배를 하다', uzbek: 'tazim qilmoq' },
    { korean: '떡국', uzbek: 'tokkuk' },
    { korean: '추석', uzbek: 'hosil bayrami/shukronalik kuni' },
    { korean: '차례를 지내다', uzbek: "marosim o'tkazmoq" },
    { korean: '송편', uzbek: 'guruchli pishiriq' }
  ],
  '6과': [
    { korean: '샌드위치', uzbek: 'sendvich' },
    { korean: '스파게티', uzbek: 'spagetti' },
    { korean: '피자', uzbek: 'pitsa' },
    { korean: '햄버거', uzbek: 'gamburger' },
    { korean: '귤', uzbek: 'mandarin' },
    { korean: '딸기', uzbek: 'qulupnay' },
    { korean: '사과', uzbek: 'olma' },
    { korean: '수박', uzbek: 'tarvuz' },
    { korean: '앉다', uzbek: "o'tirmoq" },
    { korean: '주다', uzbek: 'bermoq' },
    { korean: '잠깐만', uzbek: 'biroz' },
    { korean: '기다리다', uzbek: 'kutmoq' },
    { korean: '빵', uzbek: 'non' },
    { korean: '몇', uzbek: 'qancha/necha' },
    { korean: '아이스크림', uzbek: 'muzqaymoq' },
    { korean: '주스', uzbek: 'sharbat' },
    { korean: '녹차', uzbek: "ko'k choy" },
    { korean: '콜라', uzbek: 'kola' },
    { korean: '메뉴', uzbek: 'menyu' },
    { korean: '좋아하다', uzbek: "yaxshi ko'rmoq" },
    { korean: '우동', uzbek: 'udon taomi' },
    { korean: '맥주', uzbek: 'pivo' },
    { korean: '물건', uzbek: 'narsa' },
    { korean: '게수', uzbek: 'sanoq' },
    { korean: '그래요', uzbek: 'shunday' },
    { korean: '여기요', uzbek: 'kechirasiz (birovni chaqirganda)' },
    { korean: '맛있다', uzbek: 'mazali' },
    { korean: '좋다', uzbek: 'yaxshi' },
    { korean: '싸다', uzbek: 'arzon' },
    { korean: '길', uzbek: "yo'l" },
    { korean: '복잡하다', uzbek: 'tiqilinch' },
    { korean: '노래', uzbek: "qo'shiq" },
    { korean: '아리랑', uzbek: 'koreya folkor musiqasi' },
    { korean: '바지', uzbek: 'shim' },
    { korean: '운동화', uzbek: 'krossovka' },
    { korean: '아저씨', uzbek: 'amaki' },
    { korean: '모두', uzbek: 'hammasi' },
    { korean: '또', uzbek: 'yana' },
    { korean: '키위', uzbek: 'kivi' },
    { korean: '파인애플', uzbek: 'ananas' },
    { korean: '박스', uzbek: 'quti' },
    { korean: '멜론', uzbek: 'qovun' },
    { korean: '과자', uzbek: 'pishiriq' },
    { korean: '달걀', uzbek: 'tuxum' },
    { korean: '휴지', uzbek: 'salfetka' },
    { korean: '케이크', uzbek: 'tort' },
    { korean: '아이스커피', uzbek: 'muzli kofe' },
    { korean: '에스프래소', uzbek: 'espresso' },
    { korean: '돈가스', uzbek: 'kotlet' },
    { korean: '점심', uzbek: 'tushlik' },
    { korean: '급', uzbek: 'daraja' },
    { korean: '물건', uzbek: 'narsa' },
    { korean: '팔다', uzbek: 'sotmoq' },
    { korean: '인지', uzbek: "inch (o'lchov birlik)" },
    { korean: '아주', uzbek: 'juda' },
    { korean: '리모컨', uzbek: 'pult' },
    { korean: '깨끗하다', uzbek: 'toza' },
    { korean: '많다', uzbek: "ko'p" },
    { korean: '권', uzbek: "kitoblarga –ta" },
    { korean: '전화하다', uzbek: 'telefon qilmoq' },
    { korean: '비싸다', uzbek: 'qimmat' },
    { korean: '깎아 주다', uzbek: 'arzon qilmoq' },
    { korean: '백김치', uzbek: 'oq kimchi' },
    { korean: '깍두기', uzbek: 'rediskali kimchi' },
    { korean: '오이김치', uzbek: 'bodring kimchi' },
    { korean: '물김치', uzbek: 'suvli kimchi' },
    { korean: '이런', uzbek: 'bunday' },
    { korean: '김치볶음밥', uzbek: 'qovurilgan guruch' },
    { korean: '김치전', uzbek: 'kimchi quymoq' },
    { korean: '얼마', uzbek: 'qancha' },
    { korean: '십 원', uzbek: '10 von' },
    { korean: '오십 원', uzbek: '50 von' },
    { korean: '백 원', uzbek: '100 von' },
    { korean: '오백 원', uzbek: '500 von' },
    { korean: '천 원', uzbek: '1000 von' },
    { korean: '오천 원', uzbek: '5000 von' },
    { korean: '만 원', uzbek: '10.000 von' },
    { korean: '오만 원', uzbek: '50.000 von' }
  ],
  '7과': [
    { korean: '흐리다', uzbek: 'bulutli' },
    { korean: '맑다', uzbek: 'havo ochiq' },
    { korean: '덥다', uzbek: 'issiq' },
    { korean: '춥다', uzbek: 'sovuq' },
    { korean: '따뜻하다', uzbek: 'iliq' },
    { korean: '시원하다', uzbek: 'salqin' },
    { korean: '비가 오다', uzbek: "yomg'ir yog'moq" },
    { korean: '눈이 오다', uzbek: "qor yog’moq" },
    { korean: '계절', uzbek: 'fasl' },
    { korean: '봄', uzbek: 'bahor' },
    { korean: '여름', uzbek: 'yoz' },
    { korean: '가을', uzbek: 'kuz' },
    { korean: '겨울', uzbek: 'qish' },
    { korean: '쉽다', uzbek: 'oson' },
    { korean: '어렵다', uzbek: 'qiyin' },
    { korean: '맵다', uzbek: "achchiq" },
    { korean: '가볍다', uzbek: "yengil" },
    { korean: '무겁다', uzbek: "og'ir" },
    { korean: '불규칙', uzbek: "qoidaga tushmaslik" },
    { korean: '날씨', uzbek: 'ob havo' },
    { korean: '어때요?', uzbek: 'Qanday?' },
    { korean: '재미있다', uzbek: 'qiziqarli' },
    { korean: '동생', uzbek: 'uka' },
    { korean: '떡볶이', uzbek: 'tokpukki' },
    { korean: '재미없다', uzbek: 'qiziq emas' },
    { korean: '도쿄', uzbek: 'Tokyo' },
    { korean: '조심해서 오세요', uzbek: "ehtiyot bo’lib keling" },
    { korean: '런던', uzbek: 'London' },
    { korean: '싱가포르', uzbek: 'Singapur' },
    { korean: '모스크바', uzbek: 'Moskva' },
    { korean: '카이로', uzbek: 'Qohira' },
    { korean: '시드니', uzbek: 'Sidney' },
    { korean: '뉴욕', uzbek: 'Nyu York' },
    { korean: '베이징', uzbek: 'Pekin' },
    { korean: '어떻다', uzbek: 'qanday' },
    { korean: '파리', uzbek: 'Parij' },
    { korean: '요즘', uzbek: 'shu kunlarda' },
    { korean: '쉬는 시간', uzbek: 'dam olish vaqti' },
    { korean: '이야기하다', uzbek: 'suhbatlashmoq' },
    { korean: '고향', uzbek: 'vatan' },
    { korean: '스키장', uzbek: "chang'i kompleksi" },
    { korean: '단풍', uzbek: 'xazonrezgirlik' },
    { korean: '수영장', uzbek: 'suzish kompleksi' },
    { korean: '꽃', uzbek: 'gul' },
    { korean: '바다', uzbek: 'dengiz' },
    { korean: '생선', uzbek: 'baliqli taom' },
    { korean: '부산', uzbek: 'Pusan' },
    { korean: '질문', uzbek: 'savol' },
    { korean: '작년', uzbek: "o’tgan yili" },
    { korean: '브라질', uzbek: 'Braziliya' },
    { korean: '에서', uzbek: '…dan' },
    { korean: '브라질리아', uzbek: 'Brazilia' },
    { korean: '항상', uzbek: 'doim' },
    { korean: '처음', uzbek: 'ilk bor' },
    { korean: '하늘', uzbek: 'osmon' },
    { korean: '눈사람', uzbek: 'qor odam' },
    { korean: '만들다', uzbek: 'tayyorlamoq' },
    { korean: '필요하다', uzbek: "zarur bo'moq" },
    { korean: '놓다', uzbek: "qo'ymoq" },
    { korean: '각각', uzbek: 'har bir' },
    { korean: '태국', uzbek: 'Tailand' },
    { korean: '수영하다', uzbek: 'suzmoq' },
    { korean: '망고', uzbek: 'mango' },
    { korean: '선글라스', uzbek: "ko'zoynak (quyosh)" },
    { korean: '부채', uzbek: 'fen' },
    { korean: '슬리퍼', uzbek: 'shippak/tapochka' },
    { korean: '삼계탕', uzbek: 'samketang' },
    { korean: '들', uzbek: '…lar' }
  ],
  '8과': [
    { korean: '골프', uzbek: 'golf' },
    { korean: '자전거', uzbek: 'velosiped' },
    { korean: '게임', uzbek: "o'yin" },
    { korean: '테니스', uzbek: 'tennis' },
    { korean: '농구', uzbek: 'basketbol' },
    { korean: '피아노', uzbek: 'pianino' },
    { korean: '당구', uzbek: 'billiard' },
    { korean: '스키', uzbek: "chang'i" },
    { korean: '기타', uzbek: 'gitara' },
    { korean: '스케이트', uzbek: 'skeyt' },
    { korean: '축구', uzbek: 'futbol' },
    { korean: '치다', uzbek: "o'ynamoq, chalmoq" },
    { korean: '타다', uzbek: 'minmoq/uchmoq' },
    { korean: '하다', uzbek: 'qilmoq' },
    { korean: '낮잠을 자다', uzbek: 'kunduzgi uyqu uxlamoq' },
    { korean: '등산을 하다', uzbek: "tog'ga chiqmoq" },
    { korean: '산책을 하다', uzbek: 'sayr qilmoq' },
    { korean: '여행을 하다', uzbek: 'sayohat qilmoq' },
    { korean: '노래방에 가다', uzbek: 'karaokega bormoq' },
    { korean: '찜질방에 가다', uzbek: 'saunaga bormoq' },
    { korean: '걷다', uzbek: 'yurmoq' },
    { korean: '버스', uzbek: 'avtobus' },
    { korean: '타다', uzbek: 'minmoq' },
    { korean: '걸어서 가다', uzbek: 'piyoda yurib bormoq' },
    { korean: '음악', uzbek: 'musiqa' },
    { korean: '듣다', uzbek: 'eshitmoq' },
    { korean: '뉴스', uzbek: 'yangilik' },
    { korean: '라디오', uzbek: 'radio' },
    { korean: '잘', uzbek: 'yaxshi' },
    { korean: '생활', uzbek: 'hayot' },
    { korean: '조금', uzbek: 'biroz' },
    { korean: '심심하다', uzbek: 'zerikarli' },
    { korean: '한강', uzbek: 'Han daryosi' },
    { korean: '그런데', uzbek: 'lekin' },
    { korean: '어떻게', uzbek: 'qanday qilib' },
    { korean: '가깝다', uzbek: 'yaqin' },
    { korean: '관악산', uzbek: "Gvanak tog’i" },
    { korean: '시청', uzbek: 'shahar markazi' },
    { korean: '정말', uzbek: 'haqiqatdan' },
    { korean: '많다', uzbek: "ko'p" },
    { korean: '자주', uzbek: 'tez tez' },
    { korean: '그래요', uzbek: 'shunday/rostdan' },
    { korean: '다음', uzbek: 'kelasi' },
    { korean: '피곤하다', uzbek: 'charchamoq' },
    { korean: '크다', uzbek: 'katta' },
    { korean: '식혜', uzbek: 'guruchli ichimlik' },
    { korean: '저기', uzbek: 'anavi yer' },
    { korean: '수업', uzbek: 'dars' },
    { korean: '오후', uzbek: "tushdan so'ng" },
    { korean: '운동장', uzbek: 'sport maydoni' },
    { korean: '번', uzbek: 'nomer' },
    { korean: '보통', uzbek: 'odatda' },
    { korean: '미팅', uzbek: 'uchrashuv' },
    { korean: '소개하다', uzbek: 'tanishtirmoq' },
    { korean: '소개팅', uzbek: 'tanishuv uchrashuvi' },
    { korean: '웃어른', uzbek: 'katta odam' },
    { korean: '선을 보다', uzbek: 'sovchilar orqali uchrashmoq' }
  ]
};

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
  const { lang } = useLanguage();
  const { user, logActivity, isPremium, loading: userLoading, saveFlashcardProgress, loadFlashcardProgress, syncLocalProgress } = useUser();

  const unitKeys = useMemo(() => Object.keys(units), []);
  const initialUnitFromQuery = searchParams.get('unit');
  const [selectedUnit, setSelectedUnit] = useState<string>(
    initialUnitFromQuery && units[initialUnitFromQuery] ? initialUnitFromQuery : unitKeys[0] || '1과'
  );

  // Show loading while user authentication is being checked
  if (userLoading) {
    return (
      <main className="min-h-screen bg-[#0b0f1a] text-white flex items-center justify-center">
        <div className="text-white">Loading flashcards...</div>
      </main>
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
    if (lang === 'ko') return currentCard.korean; // Show Korean for Korean users
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
        const backendProgress = await loadFlashcardProgress(selectedUnit);
        
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
        
        if (localProgress && localProgress.units[selectedUnit]) {
          const unitProgress = localProgress.units[selectedUnit];
          await syncLocalProgress(selectedUnit, unitProgress.masteredIndices, unitProgress.againIndices || []);
        }
        
        setMastered(backendProgress.mastered);
        setAgain(backendProgress.again);
        setMode('all');
        setShuffleEnabled(false);
        setDeckOrder(allIndices);
        setDeckPosition(0);
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
        const unitData = parsed.units[selectedUnit] || {
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
        setMastered(unitData.masteredIndices);
        setAgain(unitData.againIndices || []);
        setMode(unitData.mode || 'all');
        setShuffleEnabled(unitData.shuffleEnabled || false);
        setDeckOrder(unitData.deckOrder || allIndices);
        setDeckPosition(unitData.deckPosition || 0);
        setIsFlipped(false);
      }
    };

    loadProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUnit, user, cards.length]);

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

    data.units[selectedUnit] = {
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
  }, [again, cards.length, currentIndex, deckOrder, deckPosition, mastered, mode, selectedUnit, shuffleEnabled]);

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
        saveFlashcardProgress(selectedUnit, currentIndex, false, true);
        logActivity('flashcard_review', { unit: selectedUnit, cardIndex: currentIndex, action: 'again' }, 1);
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
        saveFlashcardProgress(selectedUnit, currentIndex, true, false);
        logActivity('flashcard_review', { unit: selectedUnit, cardIndex: currentIndex, action: 'mastered' }, 2);
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

  return (
    <main className="min-h-screen bg-[#0b0f1a] text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 pt-6 pb-28">
        {/* Demo mode banner for unauthenticated users */}
        {!user && (
          <div className="mb-6 rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-orange-300">⚠️ Progress not saved</div>
                <div className="text-sm text-orange-200/70">Using guest mode. <Link href="/login" className="underline hover:text-orange-200 font-semibold">Sign up</Link> to save your progress!</div>
              </div>
              <Link href="/login" className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500 transition">
                {translations[lang].signup}
              </Link>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Flashcards</h1>
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

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-sm font-semibold text-white/70">Bo'lim</div>
            <select
              value={selectedUnit}
              onChange={(e) => {
                setSelectedUnit(e.target.value);
              }}
              className="px-4 py-2 rounded-lg border border-white/10 text-sm bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            >
              {unitKeys.map((unit) => (
                <option key={unit} value={unit} className="bg-[#0b0f1a]">
                  {unit}
                </option>
              ))}
            </select>
          </div>
          <div className="text-xs sm:text-sm text-white/60">
            {cards.length > 0 ? (
              <>
                {deckSize > 0 ? `${deckPosition + 1} / ${deckSize}` : `0 / 0`} • Mastered {mastered.length}/{cards.length} • Again{' '}
                {againClean.length}
              </>
            ) : (
              <>Bo'lim tanlang</>
            )}
          </div>
        </div>

        <div className="mt-3 text-xs text-white/50">
          Flip: Tab/Enter/Space • Prev/Next: ArrowLeft/ArrowRight • Again: A • Mastered: M
        </div>

        {cards.length === 0 || !currentCard ? (
          <div className="mt-10 p-8 text-center text-white/70">Bo'lim tanlang</div>
        ) : isDone ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 shadow-sm p-8 text-center">
            <div className="text-2xl font-bold text-white">Great!</div>
            <div className="mt-2 text-white/70">
              {mode === 'again' ? (
                <>No “Again” cards left in {selectedUnit}.</>
              ) : (
                <>You mastered all cards in {selectedUnit}.</>
              )}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {mode === 'again' && (
                <button
                  type="button"
                  onClick={() => rebuildDeck({ nextMode: 'all' })}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold"
                >
                  Back to All
                </button>
              )}
              <button
                type="button"
                onClick={resetUnitProgress}
                className="bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-xl font-bold border border-white/10"
              >
                Reset unit
              </button>
              <Link
                href="/exercises"
                className="bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 rounded-xl font-bold"
              >
                Back to Exercises
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
                      <div className="text-2xl mb-2">No card available</div>
                      <div className="text-sm">Please select a unit</div>
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
                      <div className="mt-6 text-sm text-white/70 font-medium">Click to flip back</div>
                    </div>
                  ) : (
                    <div className="text-center text-white/50">
                      <div className="text-2xl mb-2">No card available</div>
                      <div className="text-sm">Please select a unit</div>
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
                        const shuffled = [...indices].sort(() => Math.random() - 0.5);
                        setDeckOrder(shuffled);
                        setDeckPosition(0);
                        setIsFlipped(false);
                      }}
                      className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-white text-sm font-semibold hover:bg-white/10 transition"
                    >
                      {ui.shuffle}
                    </button>
                  </div>

                  <div className="text-xs sm:text-sm text-white/60">
                    {deckSize > 0 ? `${deckPosition + 1} / ${deckSize}` : `0 / 0`} • Mastered {mastered.length}/{cards.length}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={Math.max(0, deckSize - 1)}
                    value={Math.min(deckPosition, Math.max(0, deckSize - 1))}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (!Number.isFinite(v)) return;
                      setDeckPosition(v);
                      setIsFlipped(false);
                    }}
                    className="w-full"
                  />
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
    </main>
  );
}

export default function FlashcardsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#0b0f1a] text-white flex items-center justify-center">
        <div className="text-white">Loading flashcards...</div>
      </main>
    }>
      <FlashcardsPageContent />
    </Suspense>
  );
}
