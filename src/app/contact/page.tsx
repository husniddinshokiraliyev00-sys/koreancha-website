'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

import { useLanguage, type Lang } from '../providers';

type ContactTranslations = {
  title: string;
  subtitle: string;
  sendMessageTitle: string;
  sendMessageDesc: string;
  name: string;
  yourName: string;
  email: string;
  yourEmail: string;
  message: string;
  messagePlaceholder: string;
  send: string;
  preferChat: string;
  messageOnTelegram: string;
  contactVia: string;
  telegramChannel: string;
  telegramChannelDesc: string;
  instagram: string;
  instagramDesc: string;
  supportTelegram: string;
  supportTelegramDesc: string;
  emailContact: string;
  emailContactDesc: string;
  backHome: string;
};

const contactTranslations: Record<Lang, ContactTranslations> = {
  uz: {
    title: 'Bog‘lanish',
    subtitle: 'Savollaringiz bormi? Biz sizni eshitishdan xursandmiz!',
    sendMessageTitle: 'Xabar yuborish',
    sendMessageDesc: 'Quyidagi formani to‘ldiring va biz tez orada javob beramiz.',
    name: 'Ism',
    yourName: 'Ismingiz',
    email: 'Email',
    yourEmail: 'your@email.com',
    message: 'Xabar',
    messagePlaceholder: 'Qanday yordam bera olishimizni yozing...',
    send: 'Yuborish',
    preferChat: 'Tezroq yozishmoqchimisiz?',
    messageOnTelegram: 'Telegramda yozish',
    contactVia: 'Aloqa kanallari',
    telegramChannel: 'Telegram kanal',
    telegramChannelDesc: 'Sayt yangiliklari va e’lonlar shu kanalda chiqadi.',
    instagram: 'Instagram',
    instagramDesc: 'Shaxsiy profil (yangiliklar va kontent).',
    supportTelegram: 'Shikoyatlar / Obuna bo‘yicha Telegram',
    supportTelegramDesc: 'To‘lov tasdiqlari va obuna bo‘yicha murojaatlar uchun.',
    emailContact: 'Email',
    emailContactDesc: 'Email orqali bog‘lanish.',
    backHome: 'Bosh sahifa'
  },
  ru: {
    title: 'Связаться',
    subtitle: 'Есть вопросы? Мы будем рады помочь!',
    sendMessageTitle: 'Отправить сообщение',
    sendMessageDesc: 'Заполните форму ниже и мы ответим как можно скорее.',
    name: 'Имя',
    yourName: 'Ваше имя',
    email: 'Email',
    yourEmail: 'your@email.com',
    message: 'Сообщение',
    messagePlaceholder: 'Напишите, чем мы можем помочь...',
    send: 'Отправить',
    preferChat: 'Хотите написать быстрее?',
    messageOnTelegram: 'Написать в Telegram',
    contactVia: 'Связаться через',
    telegramChannel: 'Telegram канал',
    telegramChannelDesc: 'Новости и обновления сайта публикуются в этом канале.',
    instagram: 'Instagram',
    instagramDesc: 'Личный профиль (контент и обновления).',
    supportTelegram: 'Telegram для жалоб / подписки',
    supportTelegramDesc: 'Для подтверждений оплаты и вопросов по подписке.',
    emailContact: 'Email',
    emailContactDesc: 'Связаться по Email.',
    backHome: 'На главную'
  },
  en: {
    title: 'Get in Touch',
    subtitle: "Have questions? We'd love to hear from you!",
    sendMessageTitle: 'Send us a message',
    sendMessageDesc: "Fill out the form below and we'll respond as soon as possible.",
    name: 'Name',
    yourName: 'Your name',
    email: 'Email',
    yourEmail: 'your@email.com',
    message: 'Message',
    messagePlaceholder: 'Tell us how we can help you...',
    send: 'Send Message',
    preferChat: 'Prefer to chat directly?',
    messageOnTelegram: 'Message on Telegram',
    contactVia: 'Contact us via',
    telegramChannel: 'Telegram channel',
    telegramChannelDesc: 'Website news and updates will be posted there.',
    instagram: 'Instagram',
    instagramDesc: 'Personal profile (content and updates).',
    supportTelegram: 'Telegram for complaints / subscriptions',
    supportTelegramDesc: 'For payment confirmations and subscription questions.',
    emailContact: 'Email',
    emailContactDesc: 'Contact via email.',
    backHome: 'Back to home'
  }
};

const getLangName = (code: Lang) => (code === 'uz' ? "O'Z" : code === 'ru' ? 'РУ' : 'EN');

export default function ContactPage() {
  const { lang, setLang } = useLanguage();
  const t = contactTranslations[lang];

  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

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
    try {
      return JSON.parse(localStorage.getItem('koreancha_admin_settings_v1') || 'null');
    } catch {
      return null;
    }
  }, []);

  const TELEGRAM_CHANNEL_URL = settings?.telegramChannelUrl || 'https://t.me/Koreancha_uz';
  const INSTAGRAM_URL = settings?.instagramUrl || 'https://www.instagram.com/shokiralievv?igsh=MWM2ZnlucmV2ZjU1Nw==';
  const SUPPORT_TELEGRAM_URL = settings?.supportTelegramUrl || 'https://t.me/Shokiraliev';

  const CONTACT_EMAIL = settings?.contactEmail || 'support@koreancha.uz';
  const TELEGRAM_LOGO_URL = settings?.telegramLogoUrl || 'https://commons.wikimedia.org/wiki/Special:FilePath/Telegram_logo.svg';
  const INSTAGRAM_LOGO_URL = settings?.instagramLogoUrl || 'https://commons.wikimedia.org/wiki/Special:FilePath/Instagram_logo_2016.svg';
  const EMAIL_LOGO_URL = settings?.emailLogoUrl || 'https://commons.wikimedia.org/wiki/Special:FilePath/Email_Shiny_Icon.svg';

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const maxMessageLength = 1000;

  const sendEmail = () => {
    const subject = encodeURIComponent('Koreancha.uz Contact');
    const body = encodeURIComponent(`Name: ${name || '-'}\nEmail: ${email || '-'}\n\n${message || '-'}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    if (!showEmailModal) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowEmailModal(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [showEmailModal]);

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

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{t.title}</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="mt-10 max-w-2xl mx-auto">
          <div className="text-sm font-semibold text-gray-800 mb-3">{t.contactVia}</div>
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl p-5 transition flex items-center gap-4"
            >
              <img src={TELEGRAM_LOGO_URL} alt="Telegram" className="h-10 w-10" />
              <div>
                <div className="font-bold text-gray-900">{t.telegramChannel}</div>
                <div className="text-sm text-gray-600">{t.telegramChannelDesc}</div>
              </div>
            </a>

            <a
              href={SUPPORT_TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl p-5 transition flex items-center gap-4"
            >
              <img src={TELEGRAM_LOGO_URL} alt="Telegram" className="h-10 w-10" />
              <div>
                <div className="font-bold text-gray-900">{t.supportTelegram}</div>
                <div className="text-sm text-gray-600">{t.supportTelegramDesc}</div>
              </div>
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl p-5 transition flex items-center gap-4"
            >
              <img src={INSTAGRAM_LOGO_URL} alt="Instagram" className="h-10 w-10" />
              <div>
                <div className="font-bold text-gray-900">{t.instagram}</div>
                <div className="text-sm text-gray-600">{t.instagramDesc}</div>
              </div>
            </a>

            <button
              type="button"
              onClick={() => setShowEmailModal(true)}
              className="text-left bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl p-5 transition flex items-center gap-4"
            >
              <img src={EMAIL_LOGO_URL} alt="Email" className="h-10 w-10" />
              <div>
                <div className="font-bold text-gray-900">{t.emailContact}</div>
                <div className="text-sm text-gray-600">{t.emailContactDesc}</div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {showEmailModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
          onClick={() => setShowEmailModal(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl border border-gray-100 shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-gray-900 font-bold">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                </svg>
                {t.sendMessageTitle}
              </div>
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="h-9 w-9 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 transition inline-flex items-center justify-center"
                aria-label="Close"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6 6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-1 text-sm text-gray-600">{t.sendMessageDesc}</div>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.name}</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder={t.yourName}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder={t.yourEmail}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.message}</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, maxMessageLength))}
                placeholder={t.messagePlaceholder}
                className="w-full min-h-[140px] px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <div className="mt-1 text-xs text-gray-500 text-right">
                {message.length}/{maxMessageLength}
              </div>
            </div>

            <button
              type="button"
              onClick={sendEmail}
              className="mt-4 w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-bold transition"
            >
              {t.send}
            </button>

            <div className="mt-5 pt-5 border-t border-gray-100">
              <div className="text-sm text-gray-600">{t.preferChat}</div>
              <a
                href={SUPPORT_TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-4 py-3 rounded-xl font-bold transition border border-gray-200"
              >
                <img src={TELEGRAM_LOGO_URL} alt="Telegram" className="h-5 w-5" />
                {t.messageOnTelegram}
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
