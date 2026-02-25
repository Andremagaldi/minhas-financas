import { signInWithMagicLink } from "./actions";
import { hasSupabaseEnv } from "@/lib/env";

export default function LoginPage({ searchParams }: { searchParams: { sent?: string; supabase?: string } }) {
  const sent = searchParams.sent === "1";
  const supabaseMissing = searchParams.supabase === "missing" || !hasSupabaseEnv;

  return (
    <div className="mx-auto mt-16 max-w-md card">
      <h1 className="mb-4 text-xl font-semibold">Entrar</h1>
      {supabaseMissing ? (
        <p className="mb-3 rounded-md border border-yellow-700 bg-yellow-950/40 p-2 text-sm text-yellow-200">
          Configure `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` para habilitar autenticacao.
        </p>
      ) : null}
      <form action={signInWithMagicLink} className="space-y-3">
        <input
          name="email"
          type="email"
          required
          placeholder="seu@email.com"
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
        />
        <button
          type="submit"
          disabled={supabaseMissing}
          className="w-full rounded-md bg-brand px-3 py-2 font-medium text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Enviar Magic Link
        </button>
      </form>
      {sent ? <p className="mt-3 text-sm text-slate-300">Link enviado para seu email.</p> : null}
    </div>
  );
}
