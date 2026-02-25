import { AppNav } from "@/components/ui/app-nav";
import { TransactionsTable } from "@/components/transacoes/transactions-table";
import { getTransactions } from "@/services/finance";

export const dynamic = "force-dynamic";

export default async function TransacoesPage() {
  const transactions = await getTransactions();

  return (
    <>
      <AppNav />
      <h1 className="mb-4 text-2xl font-semibold">Transacoes</h1>
      <TransactionsTable transactions={transactions} />
    </>
  );
}
