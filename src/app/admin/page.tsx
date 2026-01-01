'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

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
        throw new Error(data?.error || 'Request failed');
      }

      setResult(`OK: updated user ${data.userId} to ${data.plan}`);
    } catch (e: any) {
      setResult(`Error: ${e?.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = () => {
    setSettingsSavedText(null);
    try {
      localStorage.setItem('koreancha_admin_settings_v1', JSON.stringify(settings));
      setSettingsSavedText('Saved.');
    } catch {
      setSettingsSavedText('Failed to save.');
    }
  };

  const resetSettings = () => {
    setSettingsSavedText(null);
    try {
      localStorage.removeItem('koreancha_admin_settings_v1');
      setSettings({});
      setSettingsSavedText('Reset.');
    } catch {
      setSettingsSavedText('Failed to reset.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div className="font-bold">Admin</div>
          <Link href="/" className="text-sm font-semibold text-white/90 hover:text-white transition">
            Home
          </Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900">Upgrade user plan</h1>
          <p className="mt-2 text-gray-600">
            This uses a server API route with Supabase Service Role key. Keep it private.
          </p>

          <div className="mt-6 grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Admin token</label>
              <input
                value={adminToken}
                onChange={(e) => setAdminToken(e.target.value)}
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Set ADMIN_API_TOKEN in .env.local"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User email (recommended)</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="user@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User ID (optional)</label>
                <input
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="uuid"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value as Plan)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
              >
                <option value="free">free</option>
                <option value="premium">premium</option>
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
              {loading ? 'Updating...' : 'Update user'}
            </button>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900">Site info settings</h2>
          <p className="mt-2 text-gray-600">
            These values are saved in your browser localStorage and used by /contact and /donate.
          </p>

          <div className="mt-6 grid gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telegram channel URL</label>
                <input
                  value={settings.telegramChannelUrl || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, telegramChannelUrl: e.target.value }))}
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="https://t.me/Koreancha_uz"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Support Telegram URL</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact email</label>
                <input
                  value={settings.contactEmail || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, contactEmail: e.target.value }))}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="support@koreancha.uz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telegram logo URL</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram logo URL</label>
                <input
                  value={settings.instagramLogoUrl || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, instagramLogoUrl: e.target.value }))}
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="https://commons.wikimedia.org/wiki/Special:FilePath/Instagram_logo_2016.svg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email logo URL</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Korea bank name</label>
                <input
                  value={settings.krBankName || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, krBankName: e.target.value }))}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="TOSS BANK/토스뱅크"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Korea account number</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">TOSS logo URL</label>
                <input
                  value={settings.tossLogoUrl || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, tossLogoUrl: e.target.value }))}
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="https://upload.wikimedia.org/.../Toss-logo.svg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">HUMO logo URL</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Uzbekistan card number</label>
                <input
                  value={settings.uzCardNumber || ''}
                  onChange={(e) => setSettings((s) => ({ ...s, uzCardNumber: e.target.value }))}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="9860 0866 0140 8502"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Uzbekistan card type</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Uzbekistan account holder</label>
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
                Save settings
              </button>
              <button
                type="button"
                onClick={resetSettings}
                className="bg-white hover:bg-gray-50 text-gray-900 px-5 py-3 rounded-xl font-bold transition border border-gray-200"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
