"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const colors = ["#10B981", "#3B82F6", "#EF4444", "#F59E0B", "#14B8A6"];

export function SpendingPieChart({ data }: { data: Array<{ name: string; value: number }> }) {
  return (
    <div className="card h-[320px]">
      <h3 className="mb-3 text-sm font-medium">Distribuicao de gastos por categoria</h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={`${entry.name}-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
