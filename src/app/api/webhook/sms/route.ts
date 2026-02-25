import { NextRequest, NextResponse } from "next/server";
import { env, hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { smsWebhookSchema } from "@/lib/validations/webhook";
import { checkRateLimit } from "@/services/rate-limit";
import { parseBankSms, toWebhookTransaction } from "@/services/webhook-parser";

export async function POST(request: NextRequest) {
  const key = request.ip ?? "webhook-sms";
  const limit = checkRateLimit(key, 15, 60_000);

  if (!limit.allowed) {
    return NextResponse.json({ error: "Rate limit excedido" }, { status: 429 });
  }

  if (!hasSupabaseEnv) {
    return NextResponse.json({ error: "Supabase nao configurado" }, { status: 503 });
  }

  const providedToken = request.headers.get("x-webhook-token") ?? "";
  if (providedToken !== env.webhookToken) {
    return NextResponse.json({ error: "Token invalido" }, { status: 401 });
  }

  const body = await request.json();
  const parsedPayload = smsWebhookSchema.safeParse(body);
  if (!parsedPayload.success) {
    return NextResponse.json({ error: parsedPayload.error.flatten() }, { status: 422 });
  }

  const parsedSms = parseBankSms(parsedPayload.data.message);
  if (!parsedSms) {
    return NextResponse.json({ error: "Nao foi possivel interpretar a mensagem" }, { status: 400 });
  }

  const tx = toWebhookTransaction(parsedPayload.data.userId, parsedSms);

  const supabase = await createClient();
  const { data, error } = await supabase.from("transactions").insert(tx).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, transaction: data }, { status: 201 });
}
