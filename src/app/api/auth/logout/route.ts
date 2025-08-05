import { NextRequest, NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Missing access token' }, { status: 401 });
    }

    const { error } = await supabaseAdmin.auth.admin.signOut(token);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  } catch (err) {
    console.error('Logout error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
