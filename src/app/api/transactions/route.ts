import { NextRequest, NextResponse } from "next/server";
import { hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { transactionInsertSchema } from "@/lib/validations/finance";
import { checkRateLimit } from "@/services/rate-limit";

export async function GET(request: NextRequest) {
  const key = request.ip ?? "transactions-get";
  const limit = checkRateLimit(key, 60, 60_000);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Rate limit excedido" }, { status: 429 });
  }

  if (!hasSupabaseEnv) {
    return NextResponse.json({ error: "Supabase nao configurado" }, { status: 503 });
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Nao autenticado" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("occurred_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const key = request.ip ?? "transactions-post";
  const limit = checkRateLimit(key, 20, 60_000);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Rate limit excedido" }, { status: 429 });
  }

  if (!hasSupabaseEnv) {
    return NextResponse.json({ error: "Supabase nao configurado" }, { status: 503 });
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Nao autenticado" }, { status: 401 });
  }

  const json = await request.json();
  const parsed = transactionInsertSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const payload = {
    user_id: user.id,
    title: parsed.data.title,
    category: parsed.data.category,
    amount: parsed.data.amount,
    type: parsed.data.type,
    occurred_at: parsed.data.occurredAt.toISOString(),
    payment_status: parsed.data.paymentStatus,
    installment_id: parsed.data.installmentId ?? null
  };

  const { data, error } = await supabase.from("transactions").insert(payload).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 201 });
}
