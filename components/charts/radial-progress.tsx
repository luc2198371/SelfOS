"use client";

import { chartColors } from "./chart-theme";

interface RadialProgressProps {
  value: number; // 0–100
  size?: number;
  thickness?: number;
  label?: string;
  sublabel?: string;
}

export function RadialProgress({
  value,
  size = 132,
  thickness = 6,
  label,
  sublabel,
}: RadialProgressProps) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.max(0, Math.min(100, value)) / 100) * c;

  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={chartColors.borderStrong}
          strokeWidth={thickness}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={chartColors.accent}
          strokeWidth={thickness}
          strokeLinecap="butt"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 600ms ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center px-2">
        <div>
          <div className="font-mono text-[1.5rem] leading-none tracking-tight tabular text-ink">
            {Math.round(value)}
          </div>
          {label && (
            <div className="label-zed mt-1.5">{label}</div>
          )}
          {sublabel && (
            <div className="font-mono text-[0.66rem] text-muted/80 mt-0.5">
              {sublabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
