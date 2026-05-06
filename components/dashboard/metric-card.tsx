import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  hint?: string;
  icon?: LucideIcon;
  delta?: { value: number; positiveLabel?: string; negativeLabel?: string };
  className?: string;
}

export function MetricCard({
  label,
  value,
  unit,
  hint,
  icon: Icon,
  delta,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "card-zed flex flex-col gap-3 hover:bg-surface-2 transition-colors",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="label-zed">{label}</div>
        {Icon && (
          <Icon className="h-3.5 w-3.5 text-muted/70" strokeWidth={1.5} />
        )}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="stat-zed text-[2.4rem] leading-none">{value}</span>
        {unit && (
          <span className="font-mono text-[0.85rem] text-muted">{unit}</span>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 pt-1">
        {hint && (
          <span className="text-[0.78rem] text-muted leading-tight">{hint}</span>
        )}
        {delta && (
          <span
            className={cn(
              "font-mono text-[0.7rem] px-1.5 py-0.5 rounded-sm border",
              delta.value >= 0
                ? "border-accent/40 text-accent bg-accent/5"
                : "border-line text-muted"
            )}
          >
            {delta.value >= 0 ? "+" : ""}
            {delta.value}
            {delta.value >= 0 && delta.positiveLabel
              ? ` ${delta.positiveLabel}`
              : ""}
            {delta.value < 0 && delta.negativeLabel
              ? ` ${delta.negativeLabel}`
              : ""}
          </span>
        )}
      </div>
    </div>
  );
}
