"use client";

import { useMemo, useState } from "react";
import type { Transaction } from "@/types/finance";
import { formatCurrency, formatDateISO } from "@/lib/utils";

type Props = { transactions: Transaction[] };

export function TransactionsTable({ transactions }: Props) {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const byCategory = !category || tx.category.toLowerCase().includes(category.toLowerCase());
      const byStatus = !status || tx.payment_status === status;
      const date = new Date(tx.occurred_at).getTime();
      const byFrom = !from || date >= new Date(from).getTime();
      const byTo = !to || date <= new Date(to).getTime();
      return byCategory && byStatus && byFrom && byTo;
    });
  }, [transactions, category, status, from, to]);

  return (
    <section className="card space-y-4">
      <h2 className="text-lg font-semibold">Lancamentos</h2>
      <div className="grid gap-2 md:grid-cols-4">
        <input className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm" placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} />
        <select className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Status</option>
          <option value="paid">Pago</option>
          <option value="pending">Pendente</option>
        </select>
        <input type="date" className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm" value={from} onChange={(e) => setFrom(e.target.value)} />
        <input type="date" className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm" value={to} onChange={(e) => setTo(e.target.value)} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="p-2">Data</th>
              <th className="p-2">Descricao</th>
              <th className="p-2">Categoria</th>
              <th className="p-2">Status</th>
              <th className="p-2 text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tx) => (
              <tr key={tx.id} className="border-t border-slate-800">
                <td className="p-2">{formatDateISO(tx.occurred_at)}</td>
                <td className="p-2">{tx.title}</td>
                <td className="p-2">{tx.category}</td>
                <td className="p-2">{tx.payment_status === "paid" ? "Pago" : "Pendente"}</td>
                <td className={`p-2 text-right ${tx.type === "income" ? "text-brand" : "text-danger"}`}>
                  {formatCurrency(tx.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
