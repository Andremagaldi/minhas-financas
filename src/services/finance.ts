import { hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { mockBudgetLimits, mockTransactions } from "@/lib/mock-data";
import type { DashboardData, Transaction } from "@/types/finance";

export async function getTransactions(userId?: string): Promise<Transaction[]> {
  if (!hasSupabaseEnv || !userId) {
    return mockTransactions;
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("occurred_at", { ascending: false });

  return (data as Transaction[] | null) ?? [];
}

export async function getDashboardData(userId?: string): Promise<DashboardData> {
  const transactions = await getTransactions(userId);

  const monthlyIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const currentBalance = monthlyIncome - monthlyExpense;

  const categoryMap = new Map<string, number>();
  for (const tx of transactions.filter((t) => t.type === "expense")) {
    categoryMap.set(tx.category, (categoryMap.get(tx.category) ?? 0) + tx.amount);
  }

  const categoryTotals = [...categoryMap.entries()].map(([name, value]) => ({ name, value }));

  const monthlySeries = [
    { month: "Jan", saldo: currentBalance * 0.92, despesas: monthlyExpense * 0.85 },
    { month: "Fev", saldo: currentBalance * 0.95, despesas: monthlyExpense * 0.9 },
    { month: "Mar", saldo: currentBalance, despesas: monthlyExpense }
  ];

  const budgetLimits = hasSupabaseEnv && userId
    ? (((await (await createClient())
        .from("budget_limits")
        .select("*")
        .eq("user_id", userId)).data as DashboardData["budgetLimits"] | null) ?? mockBudgetLimits)
    : mockBudgetLimits;

  return {
    currentBalance,
    monthlyIncome,
    monthlyExpense,
    categoryTotals,
    monthlySeries,
    budgetLimits,
    transactions
  };
}
