import { AppNav } from "@/components/ui/app-nav";

export default function ConfiguracoesPage() {
  return (
    <>
      <AppNav />
      <h1 className="mb-4 text-2xl font-semibold">Configuracoes</h1>

      <section className="card space-y-3">
        <h2 className="text-lg font-semibold">Integracoes</h2>
        <p className="text-sm text-slate-300">
          Configure no ambiente as variaveis `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` e
          `WEBHOOK_SMS_TOKEN`.
        </p>
        <p className="text-sm text-slate-300">
          Endpoint para automacao Android: <code>/api/webhook/sms</code>
        </p>
      </section>
    </>
  );
}
