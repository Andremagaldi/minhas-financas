# Minhas Financas MVP

Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, Supabase Auth/Postgres, Recharts.

## Variaveis de ambiente

Crie `.env.local` com:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
WEBHOOK_SMS_TOKEN=dev-token
```

## Executar

```bash
npm install
npm run dev
```

## Supabase

1. Rode o SQL em `supabase/schema.sql` no SQL Editor.
2. Habilite login por Magic Link em Authentication.
3. Configure URL de redirect para `/auth/callback`.

## Webhook SMS

Endpoint: `POST /api/webhook/sms`

Headers:
- `x-webhook-token: <WEBHOOK_SMS_TOKEN>`

Body:
```json
{
  "userId": "uuid-do-usuario",
  "message": "Compra aprovada no valor de R$ 59,90 em MERCADO XPTO em 25/02/2026"
}
```
