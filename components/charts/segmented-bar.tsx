import { cn } from "@/lib/utils";

export interface SegmentedBarSegment {
  label: string;
  value: number;
  /** Optional opacity 0–1 for cyan accent shading. Defaults stagger by index. */
  opacity?: number;
}

interface SegmentedBarProps {
  segments: SegmentedBarSegment[];
  height?: number;
  /** When true, render the legend rows below the bar. */
  showLegend?: boolean;
  /** Currency or unit prefix/suffix renderer for legend values. */
  formatValue?: (n: number) => string;
}

/**
 * Single horizontal bar split into segments. Accent (cyan) is the only color;
 * we vary opacity per segment so the categories stay distinguishable without
 * introducing a second hue. Replaces a donut chart per the design rules
 * (no gradients, flat aesthetic).
 */
export function SegmentedBar({
  segments,
  height = 8,
  showLegend = true,
  formatValue,
}: SegmentedBarProps) {
  const total = segments.reduce((acc, s) => acc + s.value, 0);
  if (total <= 0) {
    return (
      <div
        className="w-full rounded-sm border border-line bg-surface-2"
        style={{ height }}
      />
    );
  }

  // Stagger opacities from full → faint, deterministically.
  const baseOpacities = [0.85, 0.7, 0.55, 0.4, 0.3, 0.22, 0.16, 0.12, 0.1, 0.08];

  return (
    <div className="w-full">
      <div
        className="flex w-full overflow-hidden rounded-sm border border-line bg-surface-2"
        style={{ height }}
        role="img"
        aria-label={segments.map((s) => `${s.label} ${s.value}`).join(", ")}
      >
        {segments.map((s, i) => {
          const w = (s.value / total) * 100;
          if (w < 0.5) return null;
          const op = s.opacity ?? baseOpacities[i] ?? 0.1;
          return (
            <div
              key={`${s.label}-${i}`}
              title={`${s.label} · ${formatValue ? formatValue(s.value) : s.value}`}
              className={cn(
                "h-full",
                i > 0 && "border-l border-bg"
              )}
              style={{
                width: `${w}%`,
                backgroundColor: "var(--color-accent)",
                opacity: op,
              }}
            />
          );
        })}
      </div>

      {showLegend && (
        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3">
          {segments.map((s, i) => {
            const op = s.opacity ?? baseOpacities[i] ?? 0.1;
            const pct = Math.round((s.value / total) * 100);
            return (
              <li
                key={`leg-${s.label}-${i}`}
                className="flex items-center gap-2 text-[0.78rem]"
              >
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-sm shrink-0"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    opacity: op,
                  }}
                />
                <span className="text-muted truncate font-mono">
                  {s.label}
                </span>
                <span className="ml-auto tabular text-ink font-mono">
                  {formatValue ? formatValue(s.value) : s.value}
                  <span className="text-muted/70 ml-1">{pct}%</span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
