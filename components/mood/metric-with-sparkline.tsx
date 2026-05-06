import type { LucideIcon } from "lucide-react";
import { Sparkline, type SparklinePoint } from "@/components/charts/sparkline";

interface MetricWithSparklineProps {
  label: string;
  value: string | number;
  unit?: string;
  hint?: string;
  icon?: LucideIcon;
  trend: SparklinePoint[];
  yDomain?: [number, number];
}

export function MetricWithSparkline({
  label,
  value,
  unit,
  hint,
  icon: Icon,
  trend,
  yDomain,
}: MetricWithSparklineProps) {
  return (
    <div className="card-zed flex flex-col gap-3 hover:bg-surface-2 transition-colors">
      <div className="flex items-center justify-between">
        <div className="label-zed">{label}</div>
        {Icon && (
          <Icon className="h-3.5 w-3.5 text-muted/70" strokeWidth={1.5} />
        )}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="stat-zed text-[2.2rem] leading-none">{value}</span>
        {unit && (
          <span className="font-mono text-[0.85rem] text-muted">{unit}</span>
        )}
      </div>
      <div className="-mx-1">
        <Sparkline data={trend} height={28} yDomain={yDomain} />
      </div>
      {hint && (
        <div className="font-mono text-[0.66rem] uppercase tracking-wider text-muted/70">
          {hint}
        </div>
      )}
    </div>
  );
}
