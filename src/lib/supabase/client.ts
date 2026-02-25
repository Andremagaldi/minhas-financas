import { createBrowserClient } from "@supabase/ssr";
import { env, hasSupabaseEnv } from "@/lib/env";

export function createClient() {
  if (!hasSupabaseEnv) {
    throw new Error(
      "Supabase nao configurado: defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no .env.local"
    );
  }

  return createBrowserClient(env.nextPublicSupabaseUrl, env.nextPublicSupabaseAnonKey);
}
