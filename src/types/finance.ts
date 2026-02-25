export type TransactionType = "income" | "expense";
export type RevenueKind = "fixed" | "variable";
export type PaymentStatus = "paid" | "pending";

export type Transaction = {
  id: string;
  user_id: string;
  title: string;
  category: string;
  amount: number;
  type: TransactionType;
  occurred_at: string;
  payment_status: PaymentStatus;
  installment_id: string | null;
  created_at?: string;
};

export type Installment = {
  id: string;
  user_id: string;
  title: string;
  total_amount: number;
  installment_amount: number;
  total_installments: number;
  current_installment: number;
  starts_at: string;
};

export type BudgetLimit = {
  id: string;
  user_id: string;
  category: string;
  month_ref: string;
  amount_limit: number;
  amount_spent: number;
};

export type DashboardData = {
  currentBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  categoryTotals: Array<{ name: string; value: number }>;
  monthlySeries: Array<{ month: string; saldo: number; despesas: number }>;
  budgetLimits: BudgetLimit[];
  transactions: Transaction[];
};
