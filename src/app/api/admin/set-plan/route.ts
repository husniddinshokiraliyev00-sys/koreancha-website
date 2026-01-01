import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type Plan = 'free' | 'premium';

type Body = {
  adminToken?: string;
  email?: string;
  userId?: string;
  plan?: Plan;
};

const jsonError = (status: number, message: string) => {
  return NextResponse.json({ error: message }, { status });
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Body;

  const expectedToken = process.env.ADMIN_API_TOKEN;
  if (!expectedToken) return jsonError(500, 'Missing ADMIN_API_TOKEN on server');
  if (!body.adminToken || body.adminToken !== expectedToken) return jsonError(401, 'Unauthorized');

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) return jsonError(500, 'Missing NEXT_PUBLIC_SUPABASE_URL');
  if (!serviceRoleKey) return jsonError(500, 'Missing SUPABASE_SERVICE_ROLE_KEY');

  const plan = body.plan === 'premium' ? 'premium' : 'free';

  const supabase = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  let userId = body.userId?.trim() || '';

  if (!userId) {
    const email = (body.email || '').trim().toLowerCase();
    if (!email) return jsonError(400, 'Provide email or userId');

    const { data, error } = await supabase.auth.admin.listUsers({ perPage: 1000 });
    if (error) return jsonError(500, error.message);

    const user = data.users.find((u) => (u.email || '').toLowerCase() === email);
    if (!user) return jsonError(404, 'User not found');

    userId = user.id;

    const existing = (user.user_metadata as any) || {};
    const nextMetadata = {
      ...existing,
      plan,
      is_premium: plan === 'premium'
    };

    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: nextMetadata
    });

    if (updateError) return jsonError(500, updateError.message);

    return NextResponse.json({ ok: true, userId, plan });
  }

  const { data: getData, error: getError } = await supabase.auth.admin.getUserById(userId);
  if (getError) return jsonError(500, getError.message);
  if (!getData.user) return jsonError(404, 'User not found');

  const existing = (getData.user.user_metadata as any) || {};
  const nextMetadata = {
    ...existing,
    plan,
    is_premium: plan === 'premium'
  };

  const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: nextMetadata
  });

  if (updateError) return jsonError(500, updateError.message);

  return NextResponse.json({ ok: true, userId, plan });
}
