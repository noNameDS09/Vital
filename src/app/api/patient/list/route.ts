import { NextRequest, NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: user, error: sessionErr } = await supabaseAdmin.auth.getUser(token);
  if (sessionErr || !user?.user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

  const { data: profile, error } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.user.id)
    .single();

  if (error || profile?.role !== 'nurse') {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  const { data: patients, error: fetchErr } = await supabaseAdmin
    .from('profiles')
    .select('id, full_name')
    .eq('role', 'patient');

  if (fetchErr) {
    return NextResponse.json({ error: fetchErr.message }, { status: 500 });
  }

  return NextResponse.json(patients);
}
