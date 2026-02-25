import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  tone?: "default" | "positive" | "danger";
};

export function StatCard({ title, value, subtitle, tone = "default" }: StatCardProps) {
  return (
    <section className="card">
      <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
      <p
        className={cn("mt-2 text-2xl font-semibold", {
          "text-brand": tone === "positive",
          "text-danger": tone === "danger"
        })}
      >
        {value}
      </p>
      {subtitle ? <p className="mt-1 text-xs text-slate-400">{subtitle}</p> : null}
    </section>
  );
}
