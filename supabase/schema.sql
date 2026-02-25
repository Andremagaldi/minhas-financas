create extension if not exists "pgcrypto";

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text not null,
  amount numeric(12,2) not null check (amount > 0),
  type text not null check (type in ('income','expense')),
  occurred_at timestamptz not null,
  payment_status text not null default 'paid' check (payment_status in ('paid','pending')),
  installment_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.budget_limits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  month_ref text not null,
  amount_limit numeric(12,2) not null,
  amount_spent numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.installments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  total_amount numeric(12,2) not null,
  installment_amount numeric(12,2) not null,
  total_installments int not null check (total_installments > 0),
  current_installment int not null default 1,
  starts_at date not null,
  created_at timestamptz not null default now()
);

alter table public.transactions enable row level security;
alter table public.budget_limits enable row level security;
alter table public.installments enable row level security;

create policy "transactions_select_own" on public.transactions
for select using (auth.uid() = user_id);

create policy "transactions_insert_own" on public.transactions
for insert with check (auth.uid() = user_id);

create policy "transactions_update_own" on public.transactions
for update using (auth.uid() = user_id);

create policy "transactions_delete_own" on public.transactions
for delete using (auth.uid() = user_id);

create policy "budget_limits_own" on public.budget_limits
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "installments_own" on public.installments
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
