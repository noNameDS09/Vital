// app/api/auth/signup/route.ts

import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin'; // server-side Supabase client

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, full_name, role, secret_code } = body;

    // Only allow nurse or doctor signup
    if (!['nurse', 'doctor'].includes(role)) {
      return NextResponse.json({ error: 'Only staff signups allowed' }, { status: 403 });
    }

    // Optionally check a secret code for extra verification
    if (secret_code !== process.env.STAFF_SECRET_CODE) {
      return NextResponse.json({ error: 'Invalid secret code' }, { status: 401 });
    }

    // Create user in Supabase Auth
    const { data: userData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (authError || !userData?.user?.id) {
      return NextResponse.json({ error: authError?.message ?? 'Auth creation failed' }, { status: 500 });
    }

    // Insert into 'profiles' table
    const { error: profileError } = await supabaseAdmin.from('profiles').insert({
      id: userData.user.id,
      full_name,
      role
    });

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'User created', userId: userData.user.id }, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
