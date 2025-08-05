import { NextRequest, NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Get nurse making the request
    const { data: session, error: sessionErr } = await supabaseAdmin.auth.getUser(token);
    if (sessionErr || !session?.user) return NextResponse.json({ error: 'Invalid session' }, { status: 401 });

    const nurseId = session.user.id;

    // Check nurse's role
    const { data: nurseProfile, error: nurseProfileError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', nurseId)
      .single();

    if (nurseProfileError || nurseProfile?.role !== 'nurse') {
      return NextResponse.json({ error: 'Only nurses can create patients' }, { status: 403 });
    }

    // Extract patient data
    const {
      email,
      password,
      full_name,
      date_of_birth,
      gender,
      address,
      contact_number
    } = await req.json();
    console.log()
    console.log('Received body:', { email, password, full_name, date_of_birth, gender, address, contact_number });

    if (!email || !password || !full_name || !date_of_birth || !gender || !address || !contact_number) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Create Supabase Auth user
    const { data: newUser, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (userError || !newUser?.user?.id) {
      return NextResponse.json({ error: userError?.message || 'Failed to create user' }, { status: 500 });
    }

    const patientId = newUser.user.id;

    // Insert into profiles
    const { error: profileInsertError } = await supabaseAdmin.from('profiles').insert({
      id: patientId,
      full_name,
      role: 'patient'
    });

    if (profileInsertError) {
      return NextResponse.json({ error: profileInsertError.message }, { status: 500 });
    }

    // Insert into patients table
    const { error: patientInsertError } = await supabaseAdmin.from('patients').insert({
      id: patientId,
      date_of_birth,
      gender,
      address,
      contact_number
    });

    if (patientInsertError) {
      return NextResponse.json({ error: patientInsertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Patient created successfully', patient_id: patientId }, { status: 201 });

  } catch (err) {
    console.error('Error creating patient:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
