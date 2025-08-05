// app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Sign in using Supabase Auth
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError || !authData.session || !authData.user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const userId = authData.user.id;

    // Fetch the user's role from the 'profiles' table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', userId)
      .single();

    if (profileError || !['nurse', 'doctor'].includes(profile?.role)) {
      return NextResponse.json({ error: 'Access denied: Not a staff account' }, { status: 403 });
    }

    return NextResponse.json({
      message: 'Login successful',
      role: profile.role,
      full_name: profile.full_name,
      access_token: authData.session.access_token,
      refresh_token: authData.session.refresh_token,
      user_id: userId
    }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error during login' }, { status: 500 });
  }
}
