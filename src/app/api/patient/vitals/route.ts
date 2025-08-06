import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    // Step 1: Fetch patient basic data
    const { data: patientsData, error: patientsError } = await supabase
      .from('admitted_patient')
      .select('*');

    if (patientsError) throw patientsError;

    const patients: any[] = [];

    for (const patient of patientsData) {
      // Step 2: Get corresponding medical history for admission date
      const { data: historyData } = await supabase
        .from('medical_history')
        .select('created_at, diagnosis')
        .eq('patient_id', patient.patient_id)
        .order('created_at', { ascending: true })
        .limit(1);

      const admissionDate = historyData?.[0]?.created_at || new Date().toISOString();
      const condition = historyData?.[0]?.diagnosis || 'Unknown';

      // Step 3: Fetch vital signs from patient_vitals
      const { data: vitalsData } = await supabase
        .from('patient_vitals')
        .select('*')
        .eq('pid', patient.patient_id)
        .order('time', { ascending: true });

       const vitalData = vitalsData || [];


      // Step 4: Build vitalCards
      const latest = vitalsData?.[vitalsData.length - 1];
      const vitalCards = [
        {
          name: 'Heart Rate',
          value: latest?.hr || 0,
          unit: 'bpm',
          icon: 'heart',
          color: '#00BFFF',
          threshold: { critical: [30, 110], warning: [40, 100] },
        },
        {
          name: 'SpO₂',
          value: (latest?.fio2 || 0) * 100,
          unit: '%',
          icon: 'atom',
          color: '#80E080',
          threshold: { critical: [0, 90], warning: [90, 95] },
        },
        {
          name: 'Blood Pressure',
          value: `${latest?.sysabp || 0}/${latest?.diasabp || 0}`,
          unit: 'mmHg',
          icon: 'droplet',
          color: '#FFD54F',
          threshold: { critical: [0, 140], warning: [120, 139] },
        },
      ];

      // Step 5: Dummy alerts (replace with real logic if needed)
      const alerts = [
        {
          id: 1,
          message: 'Sample alert - replace with logic',
          timestamp: new Date().toLocaleTimeString(),
          severity: 'warning',
        },
      ];

      patients.push({
        id: patients.length + 1,
        name: patient.name || 'Unnamed',
        patientId: `ID: ${patient.patient_id.slice(0, 4).toUpperCase()}`,
        age: patient.age || 0,
        room: patient.room,
        admissionDate,
        condition,
        vitalData,
        alerts,
        vitalCards,
      });
    }

    return NextResponse.json({ patients });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
  }
}
