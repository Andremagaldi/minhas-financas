"use server";

import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export async function signInWithMagicLink(formData: FormData) {
  if (!hasSupabaseEnv) {
    redirect("/login?supabase=missing");
  }

  const email = String(formData.get("email") ?? "").trim();
  if (!email) return;

  const supabase = await createClient();
  await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback`
    }
  });

  redirect("/login?sent=1");
}
