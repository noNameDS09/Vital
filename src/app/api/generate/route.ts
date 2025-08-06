// app/api/patient-logs/route.ts
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Must be SERVICE ROLE KEY if public insert allowed
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { prompt, diagnosis, patientId } = body;

    if (!prompt || !patientId) {
      return NextResponse.json(
        { error: "Missing 'prompt' or 'patientId'" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("patient_logs")
      .insert([{ id: patientId, log: prompt, diagnosis }]);

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to parse request or insert log" },
      { status: 500 }
    );
  }
}
