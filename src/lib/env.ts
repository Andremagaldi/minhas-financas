export const env = {
  nextPublicSupabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  nextPublicSupabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  webhookToken: process.env.WEBHOOK_SMS_TOKEN ?? "dev-token"
};

export const hasSupabaseEnv =
  Boolean(env.nextPublicSupabaseUrl) && Boolean(env.nextPublicSupabaseAnonKey);
