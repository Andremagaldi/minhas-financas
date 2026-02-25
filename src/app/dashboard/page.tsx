import { AppNav } from "@/components/ui/app-nav";
import { StatCard } from "@/components/ui/stat-card";
import { ProgressGoalBar } from "@/components/ui/progress-goal-bar";
import { SpendingPieChart } from "@/components/charts/spending-pie-chart";
import { BalanceLineChart } from "@/components/charts/balance-line-chart";
import { formatCurrency } from "@/lib/utils";
import { getDashboardData } from "@/services/finance";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <>
      <AppNav />
      <h1 className="mb-4 text-2xl font-semibold">Dashboard Financeiro</h1>

      <section className="grid-cards mb-6">
        <StatCard title="Saldo Atual" value={formatCurrency(data.currentBalance)} tone={data.currentBalance >= 0 ? "positive" : "danger"} />
        <StatCard title="Receita Mensal" value={formatCurrency(data.monthlyIncome)} tone="positive" />
        <StatCard title="Despesa Mensal" value={formatCurrency(data.monthlyExpense)} tone="danger" />
      </section>

      <section className="mb-6 grid gap-4 lg:grid-cols-2">
        <SpendingPieChart data={data.categoryTotals} />
        <BalanceLineChart data={data.monthlySeries} />
      </section>

      <section className="card space-y-4">
        <h2 className="text-lg font-semibold">Limites por Categoria</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {data.budgetLimits.map((item) => (
            <ProgressGoalBar key={item.id} label={item.category} current={item.amount_spent} limit={item.amount_limit} />
          ))}
        </div>
      </section>
    </>
  );
}
