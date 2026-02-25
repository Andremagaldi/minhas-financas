import type { Transaction, BudgetLimit } from "@/types/finance";

const userId = "00000000-0000-0000-0000-000000000000";

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    user_id: userId,
    title: "Guarda Civil",
    category: "Receita Fixa",
    amount: 5600,
    type: "income",
    occurred_at: "2026-01-05",
    payment_status: "paid",
    installment_id: null
  },
  {
    id: "2",
    user_id: userId,
    title: "Mercado",
    category: "Alimentacao",
    amount: 396.69,
    type: "expense",
    occurred_at: "2026-01-10",
    payment_status: "paid",
    installment_id: null
  },
  {
    id: "3",
    user_id: userId,
    title: "Nubank - Livro",
    category: "Lazer",
    amount: 11.76,
    type: "expense",
    occurred_at: "2026-01-12",
    payment_status: "pending",
    installment_id: "inst-1"
  },
  {
    id: "4",
    user_id: userId,
    title: "Palavra Alegre",
    category: "Receita Variavel",
    amount: 950.3,
    type: "income",
    occurred_at: "2026-01-15",
    payment_status: "paid",
    installment_id: null
  },
  {
    id: "5",
    user_id: userId,
    title: "Etanol",
    category: "Carro",
    amount: 157.15,
    type: "expense",
    occurred_at: "2026-01-20",
    payment_status: "paid",
    installment_id: null
  }
];

export const mockBudgetLimits: BudgetLimit[] = [
  {
    id: "b1",
    user_id: userId,
    category: "Alimentacao",
    month_ref: "2026-01",
    amount_limit: 1200,
    amount_spent: 820
  },
  {
    id: "b2",
    user_id: userId,
    category: "Apartamento",
    month_ref: "2026-01",
    amount_limit: 1800,
    amount_spent: 1490
  },
  {
    id: "b3",
    user_id: userId,
    category: "Lazer",
    month_ref: "2026-01",
    amount_limit: 500,
    amount_spent: 430
  }
];
