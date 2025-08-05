import { NextRequest, NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: session, error: sessionErr } = await supabaseAdmin.auth.getUser(token);
    if (sessionErr || !session?.user) return NextResponse.json({ error: 'Invalid session' }, { status: 401 });

    const nurseId = session.user.id;

    // Confirm the user is a nurse
    const { data: nurseProfile, error: nurseErr } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', nurseId)
      .single();

    if (nurseErr || nurseProfile?.role !== 'nurse') {
      return NextResponse.json({ error: 'Only nurses can add history' }, { status: 403 });
    }

    // Extract body data
    const { patient_id, diagnosis, treatment } = await req.json();

    if (!patient_id || !diagnosis?.trim() || !treatment?.trim()) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Insert into medical_history
    const { error: insertErr } = await supabaseAdmin.from('medical_history').insert({
      patient_id,
      recorded_by: nurseId,
      diagnosis,
      treatment
    });

    if (insertErr) {
      return NextResponse.json({ error: insertErr.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Medical history added successfully' }, { status: 201 });

  } catch (err) {
    console.error('Error adding history:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
