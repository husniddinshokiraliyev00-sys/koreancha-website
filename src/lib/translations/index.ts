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
  ru: {
    common: {
      loading: "Загрузка...",
      error: "Ошибка",
      retry: "Повторить",
      close: "Закрыть",
      save: "Сохранить",
      cancel: "Отмена",
      confirm: "Подтвердить",
      yes: "Да",
      no: "Нет",
      next: "Далее",
      previous: "Назад",
      submit: "Отправить",
      back: "Назад",
      home: "Главная",
      login: "Войти",
      logout: "Выйти",
      signup: "Регистрация",
      dashboard: "Панель",
      exercises: "Упражнения",
      flashcards: "Флеш-карты",
      listening: "Аудирование",
      reading: "Чтение",
      writing: "Письмо",
      speaking: "Говорение"
    },
    nav: {
      home: "Главная",
      exercises: "Упражнения",
      mockTests: "Пробные тесты",
      about: "О нас",
      contact: "Контакты",
      donate: "Донат"
    }
  }
};

export type Language = 'uz' | 'ru' | 'en';
export type TranslationKey = keyof typeof translations.uz;
