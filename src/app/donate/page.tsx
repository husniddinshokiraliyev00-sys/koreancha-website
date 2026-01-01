'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

import { useLanguage, type Lang } from '../providers';

type DonateTranslations = {
  title: string;
  subtitle: string;
  paymentTitle: string;
  korea: string;
  uzbekistan: string;
  accountNumber: string;
  cardNumber: string;
  accountHolder: string;
  cardType: string;
  messageTitle: string;
  messagePlaceholder: string;
  saveMessage: string;
  editMessage: string;
  messageSaved: string;
  backHome: string;
};

const translations: Record<Lang, DonateTranslations> = {
  uz: {
    title: 'Donat',
    subtitle: 'Agar loyihani qo‘llab-quvvatlamoqchi bo‘lsangiz, “Menga qahva sovg‘a qiling”.',
    paymentTitle: 'To‘lov ma’lumotlari',
    korea: 'Koreya',
    uzbekistan: 'O‘zbekiston',
    accountNumber: 'Hisob raqami',
    cardNumber: 'Karta raqami',
    accountHolder: 'Karta egasi',
    cardType: 'Karta turi',
    messageTitle: 'O‘z xabaringizni qoldiring',
    messagePlaceholder: 'Izohingizni yozing...',
    saveMessage: 'Saqlash',
    editMessage: 'Tahrirlash',
    messageSaved: 'Xabar saqlandi. Xohlasangiz tahrirlashingiz mumkin.',
    backHome: 'Bosh sahifa'
  },
  ru: {
    title: 'Донат',
    subtitle: 'Если хотите поддержать проект — “Купите мне кофе”.',
    paymentTitle: 'Платёжные реквизиты',
    korea: 'Корея',
    uzbekistan: 'Узбекистан',
    accountNumber: 'Номер счёта',
    cardNumber: 'Номер карты',
    accountHolder: 'Владелец',
    cardType: 'Тип карты',
    messageTitle: 'Оставьте сообщение',
    messagePlaceholder: 'Оставьте сообщение...',
    saveMessage: 'Сохранить',
    editMessage: 'Редактировать',
    messageSaved: 'Сообщение сохранено. При необходимости можете отредактировать.',
    backHome: 'На главную'
  },
  en: {
    title: 'Donations',
    subtitle: 'If you want to support the project — buy me a coffee.',
    paymentTitle: 'Payment details',
    korea: 'Korea',
    uzbekistan: 'Uzbekistan',
    accountNumber: 'Account number',
    cardNumber: 'Card number',
    accountHolder: 'Account holder',
    cardType: 'Card type',
    messageTitle: 'Leave a message',
    messagePlaceholder: 'Leave a message...',
    saveMessage: 'Save',
    editMessage: 'Edit',
    messageSaved: 'Message saved. You can edit it if needed.',
    backHome: 'Back to home'
  }
};

const getLangName = (code: Lang) => (code === 'uz' ? "O'Z" : code === 'ru' ? 'РУ' : 'EN');

export default function DonatePage() {
  const { lang, setLang } = useLanguage();
  const t = translations[lang];

  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState('');
  const [messageSaved, setMessageSaved] = useState(false);

  useEffect(() => {
    try {
      const savedMessage = localStorage.getItem('koreancha_donation_message') || '';
      const savedFlag = localStorage.getItem('koreancha_donation_message_saved');
      setMessage(savedMessage);
      setMessageSaved(savedFlag === 'true');
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setShowLangDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    setShowLangDropdown(false);
  };

  const settings = useMemo(() => {
    if (typeof window === 'undefined') return null;
    try {
      return JSON.parse(localStorage.getItem('koreancha_admin_settings_v1') || 'null');
    } catch {
      return null;
    }
  }, []);

  const uzCardNumber = settings?.uzCardNumber || '9860 0866 0140 8502';
  const uzCardHolder = settings?.uzCardHolder || 'SHOKIRALIYEV X';
  const uzCardType = settings?.uzCardType || 'HUMO';
  const krBankName = settings?.krBankName || 'TOSS BANK/토스뱅크';
  const krAccountNumber = settings?.krAccountNumber || '1001 9131 6312';

  const tossLogoUrl =
    settings?.tossLogoUrl || 'https://upload.wikimedia.org/wikipedia/commons/3/30/Toss-logo.svg';
  const humoLogoUrl =
    settings?.humoLogoUrl ||
    'https://humocard.uz/upload/medialibrary/208/8x0p9hi3h9jww0flwdm92dayhn0flulj/humo-logo-more.png';

  const saveMessage = () => {
    setMessageSaved(true);
    try {
      localStorage.setItem('koreancha_donation_message', message);
      localStorage.setItem('koreancha_donation_message_saved', 'true');
    } catch {
      // ignore
    }
  };

  const editMessage = () => {
    setMessageSaved(false);
    try {
      localStorage.setItem('koreancha_donation_message_saved', 'false');
    } catch {
      // ignore
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold text-white/90 hover:text-white transition">
            {t.backHome}
          </Link>

          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setShowLangDropdown((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              <span className="text-sm font-semibold text-white">{getLangName(lang)}</span>
              <svg
                className={`w-4 h-4 text-white/80 transition-transform ${showLangDropdown ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showLangDropdown && (
              <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-100">
                {(['uz', 'ru', 'en'] as Lang[]).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => handleLangChange(code)}
                    className={`w-full text-left px-3 py-2 text-sm transition hover:bg-gray-50 ${
                      lang === code ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {getLangName(code)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
          <p className="mt-2 text-gray-600">{t.subtitle}</p>

          <div className="mt-8 grid gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="text-sm font-semibold text-gray-800">{t.paymentTitle}</div>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-gray-900">{t.korea}</div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      <img src={tossLogoUrl} alt="TOSS" className="h-3.5 w-auto" />
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">{krBankName}</div>
                  <div className="mt-4">
                    <div className="text-xs text-gray-500">{t.accountNumber}</div>
                    <div className="mt-1 font-bold text-gray-900 text-lg tracking-wide">{krAccountNumber}</div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-gray-900">{t.uzbekistan}</div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <img src={humoLogoUrl} alt="HUMO" className="h-3.5 w-auto" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-xs text-gray-500">{t.cardNumber}</div>
                    <div className="mt-1 font-bold text-gray-900 text-lg tracking-wide">{uzCardNumber}</div>
                  </div>

                  <div className="mt-3 grid sm:grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-gray-500">{t.accountHolder}</div>
                      <div className="mt-0.5 font-semibold text-gray-900">{uzCardHolder}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">{t.cardType}</div>
                      <div className="mt-0.5 font-semibold text-gray-900">{uzCardType}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <div className="text-sm font-semibold text-gray-800">{t.messageTitle}</div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.messagePlaceholder}
                readOnly={messageSaved}
                className="mt-2 w-full min-h-[120px] px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
              />

              {messageSaved && (
                <div className="mt-3 text-sm text-gray-600">{t.messageSaved}</div>
              )}

              <div className="mt-4 flex items-center gap-3">
                {!messageSaved ? (
                  <button
                    type="button"
                    onClick={saveMessage}
                    className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-xl font-bold transition transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
                  >
                    {t.saveMessage}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={editMessage}
                    className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 px-5 py-3 rounded-xl font-bold transition border border-gray-200"
                  >
                    {t.editMessage}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
