'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { useLanguage } from '../providers';
import { translations } from '../../lib/translations';

type Plan = 'free' | 'premium';

type AdminSettings = {
  telegramChannelUrl?: string;
  instagramUrl?: string;
  supportTelegramUrl?: string;
  contactEmail?: string;
  telegramLogoUrl?: string;
  instagramLogoUrl?: string;
  emailLogoUrl?: string;
  krBankName?: string;
  krAccountNumber?: string;
  tossLogoUrl?: string;
  uzCardNumber?: string;
  uzCardHolder?: string;
  uzCardType?: string;
  humoLogoUrl?: string;
};

export default function AdminPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [adminToken, setAdminToken] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [plan, setPlan] = useState<Plan>('premium');

  const [settings, setSettings] = useState<AdminSettings>({});
  const [settingsSavedText, setSettingsSavedText] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('koreancha_admin_settings_v1');
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') setSettings(parsed);
    } catch {
      // ignore
    }
  }, []);

  const canSubmit = useMemo(() => {
    return adminToken.trim().length > 0 && (email.trim().length > 0 || userId.trim().length > 0);
  }, [adminToken, email, userId]);

  const submit = async () => {
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch('/api/admin/set-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          adminToken: adminToken.trim(),
          email: email.trim() || undefined,
          userId: userId.trim() || undefined,
          plan
        })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || t.adminRequestFailed);
      }

      setResult(
        t.adminOkUpdatedUser
          .replace('{userId}', String(data.userId))
          .replace('{plan}', String(data.plan))
      );
    } catch (e: any) {
      setResult(`${t.adminErrorPrefix} ${e?.message || t.adminUnknownError}`);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = () => {
    setSettingsSavedText(null);
    try {
      localStorage.setItem('koreancha_admin_settings_v1', JSON.stringify(settings));
      setSettingsSavedText(t.adminSaved);
    } catch {
      setSettingsSavedText(t.adminFailedToSave);
    }
  };

  const resetSettings = () => {
    setSettingsSavedText(null);
    try {
      localStorage.removeItem('koreancha_admin_settings_v1');
      setSettings({});
      setSettingsSavedText(t.adminResetDone);
    } catch {
      setSettingsSavedText(t.adminFailedToReset);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div className="font-bold">{t.adminTitle}</div>
          <Link href="/" className="text-sm font-semibold text-white/90 hover:text-white transition">
            {t.adminHome}
          </Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900">{t.adminUpgradeUserPlan}</h1>
          <p className="mt-2 text-gray-600">
            {t.adminUpgradeDesc}
          </p>

          <div className="mt-6 grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminToken}</label>
              <input
                value={adminToken}
                onChange={(e) => setAdminToken(e.target.value)}
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder={t.adminTokenPlaceholder}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminUserEmailRecommended}</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder={t.adminUserEmailPlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminUserIdOptional}</label>
                <input
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder={t.adminUserIdPlaceholder}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminPlan}</label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value as Plan)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
              >
                <option value="free">{t.adminPlanFree}</option>
                <option value="premium">{t.adminPlanPremium}</option>
              </select>
            </div>

            {result && (
              <div className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-800">{result}</div>
            )}

            <button
              type="button"
              onClick={submit}
              disabled={!canSubmit || loading}
              className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-xl font-bold transition disabled:opacity-50"
            >
              {loading ? t.adminUpdating : t.adminUpdateUser}
            </button>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900">{t.adminSiteInfoSettings}</h2>
          <p className="mt-2 text-gray-600">
            {t.adminSiteInfoSettingsDesc}
          </p>

          <div className="mt-6 grid gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminTelegramChannelUrl}</label>
                <input
                  value={settings.telegramChannelUrl || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, telegramChannelUrl: e.target.value }))}
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="https://t.me/Koreancha_uz"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminInstagramUrl}</label>
                <input
                  value={settings.instagramUrl || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, instagramUrl: e.target.value }))}
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="https://instagram.com/..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminSupportTelegramUrl}</label>
              <input
                value={settings.supportTelegramUrl || ''}
                onChange={(e) => setSettings((s) => ({ ...s, supportTelegramUrl: e.target.value }))}
                type="url"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="https://t.me/Shokiraliev"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminContactEmail}</label>
                <input
                  value={settings.contactEmail || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, contactEmail: e.target.value }))}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="support@koreancha.uz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminTelegramLogoUrl}</label>
                <input
                  value={settings.telegramLogoUrl || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, telegramLogoUrl: e.target.value }))}
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="https://commons.wikimedia.org/wiki/Special:FilePath/Telegram_logo.svg"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminInstagramLogoUrl}</label>
                <input
                  value={settings.instagramLogoUrl || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, instagramLogoUrl: e.target.value }))}
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="https://commons.wikimedia.org/wiki/Special:FilePath/Instagram_logo_2016.svg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminEmailLogoUrl}</label>
                <input
                  value={settings.emailLogoUrl || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, emailLogoUrl: e.target.value }))}
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="https://commons.wikimedia.org/wiki/Special:FilePath/Email_Shiny_Icon.svg"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminKoreaBankName}</label>
                <input
                  value={settings.krBankName || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, krBankName: e.target.value }))}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="TOSS BANK"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminKoreaAccountNumber}</label>
                <input
                  value={settings.krAccountNumber || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, krAccountNumber: e.target.value }))}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="1001 9131 6312"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminTossLogoUrl}</label>
                <input
                  value={settings.tossLogoUrl || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, tossLogoUrl: e.target.value }))}
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="https://upload.wikimedia.org/.../Toss-logo.svg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminHumoLogoUrl}</label>
                <input
                  value={settings.humoLogoUrl || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, humoLogoUrl: e.target.value }))}
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="https://humocard.uz/.../humo-logo-more.png"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminUzCardNumber}</label>
                <input
                  value={settings.uzCardNumber || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, uzCardNumber: e.target.value }))}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="9860 0866 0140 8502"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminUzCardType}</label>
                <input
                  value={settings.uzCardType || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, uzCardType: e.target.value }))}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="HUMO"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminUzAccountHolder}</label>
              <input
                value={settings.uzCardHolder || ''}
                onChange={(e) => setSettings((s) => ({ ...s, uzCardHolder: e.target.value }))}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="SHOKIRALIYEV X"
              />
            </div>

            {settingsSavedText && (
              <div className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-800">
                {settingsSavedText}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={saveSettings}
                className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-xl font-bold transition"
              >
                {t.adminSaveSettings}
              </button>
              <button
                type="button"
                onClick={resetSettings}
                className="bg-white hover:bg-gray-50 text-gray-900 px-5 py-3 rounded-xl font-bold transition border border-gray-200"
              >
                {t.adminReset}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
