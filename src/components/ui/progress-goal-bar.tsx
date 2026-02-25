import { cn } from "@/lib/utils";

type ProgressGoalBarProps = {
  label: string;
  current: number;
  limit: number;
};

export function ProgressGoalBar({ label, current, limit }: ProgressGoalBarProps) {
  const pct = limit > 0 ? Math.min((current / limit) * 100, 100) : 0;
  const tone = pct >= 80 ? "bg-danger" : pct >= 60 ? "bg-yellow-500" : "bg-brand";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="text-slate-400">{pct.toFixed(0)}%</span>
      </div>
      <div className="h-3 w-full rounded-full bg-slate-700">
        <div className={cn("h-3 rounded-full transition-all", tone)} style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-slate-400">
        {current.toFixed(2)} / {limit.toFixed(2)}
      </p>
    </div>
  );
}
