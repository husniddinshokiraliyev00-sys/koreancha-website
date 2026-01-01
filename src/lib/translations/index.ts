export const translations = {
  uz: {
    common: {
      loading: "Yuklanmoqda...",
      error: "Xatolik",
      retry: "Qayta urinish",
      close: "Yopish",
      save: "Saqlash",
      cancel: "Bekor qilish",
      confirm: "Tasdiqlash",
      yes: "Ha",
      no: "Yo'q",
      next: "Keyingi",
      previous: "Oldingi",
      submit: "Yuborish",
      back: "Orqaga",
      home: "Bosh sahifa",
      login: "Kirish",
      logout: "Chiqish",
      signup: "Ro'yxatdan o'tish",
      dashboard: "Dashboard",
      exercises: "Mashqlar",
      flashcards: "So'z yodlash",
      listening: "Tinglash",
      reading: "O'qish",
      writing: "Yozish",
      speaking: "Gapirish"
    },
    nav: {
      home: "Bosh sahifa",
      exercises: "Mashqlar",
      mockTests: "Mock testlar",
      about: "Biz haqimizda",
      contact: "Aloqa",
      donate: "Xayriya"
    }
  },
  en: {
    common: {
      loading: "Loading...",
      error: "Error",
      retry: "Retry",
      close: "Close",
      save: "Save",
      cancel: "Cancel",
      confirm: "Confirm",
      yes: "Yes",
      no: "No",
      next: "Next",
      previous: "Previous",
      submit: "Submit",
      back: "Back",
      home: "Home",
      login: "Login",
      logout: "Logout",
      signup: "Sign Up",
      dashboard: "Dashboard",
      exercises: "Exercises",
      flashcards: "Flashcards",
      listening: "Listening",
      reading: "Reading",
      writing: "Writing",
      speaking: "Speaking"
    },
    nav: {
      home: "Home",
      exercises: "Exercises",
      mockTests: "Mock Tests",
      about: "About",
      contact: "Contact",
      donate: "Donate"
    }
  },
  ko: {
    common: {
      loading: "로딩 중...",
      error: "오류",
      retry: "재시도",
      close: "닫기",
      save: "저장",
      cancel: "취소",
      confirm: "확인",
      yes: "예",
      no: "아니오",
      next: "다음",
      previous: "이전",
      submit: "제출",
      back: "뒤로",
      home: "홈",
      login: "로그인",
      logout: "로그아웃트",
      signup: "가입",
      dashboard: "대시보드",
      exercises: "연습",
      flashcards: "플래시카드",
      listening: "듣기",
      reading: "읽기",
      writing: "쓰기",
      speaking: "말하기"
    },
    nav: {
      home: "홈",
      exercises: "연습",
      mockTests: "모의 테스트",
      about: "소개",
      contact: "연락처",
      donate: "기부"
    }
  }
};

export type Language = 'uz' | 'en' | 'ko';
export type TranslationKey = keyof typeof translations.uz;
