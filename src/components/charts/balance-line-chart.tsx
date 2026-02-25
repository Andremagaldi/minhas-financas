"use client";

import { Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

export function BalanceLineChart({ data }: { data: Array<{ month: string; saldo: number; despesas: number }> }) {
  return (
    <div className="card h-[320px]">
      <h3 className="mb-3 text-sm font-medium">Evolucao do saldo x despesas</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#94A3B8" />
          <YAxis stroke="#94A3B8" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="saldo" stroke="#10B981" strokeWidth={2.4} />
          <Line type="monotone" dataKey="despesas" stroke="#EF4444" strokeWidth={2.4} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
