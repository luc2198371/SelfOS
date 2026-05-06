"use client";

import type { TooltipProps } from "recharts";

interface ZedTooltipProps extends TooltipProps<number, string> {
  unit?: string;
  labelFormatter?: (label: string) => string;
}

export function ZedTooltip({
  active,
  payload,
  label,
  unit,
  labelFormatter,
}: ZedTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-md border border-line-strong bg-surface px-2.5 py-1.5 font-mono text-[0.72rem] text-ink">
      <div className="text-muted text-[0.66rem] uppercase tracking-wider mb-0.5">
        {labelFormatter ? labelFormatter(String(label)) : label}
      </div>
      {payload.map((p, i) => (
        <div key={i} className="tabular text-ink">
          {p.name && <span className="text-muted mr-1.5">{p.name}</span>}
          {p.value}
          {unit && <span className="text-muted ml-0.5">{unit}</span>}
        </div>
      ))}
    </div>
  );
}
