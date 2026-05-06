"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { chartColors } from "./chart-theme";

export interface SparklinePoint {
  value: number;
}

interface SparklineProps {
  data: SparklinePoint[];
  height?: number;
  yDomain?: [number | "auto", number | "auto"];
  color?: string;
}

/** No-axes single-accent line for cramming inside MetricCards / list rows. */
export function Sparkline({
  data,
  height = 28,
  yDomain = ["auto", "auto"],
  color = chartColors.accent,
}: SparklineProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <YAxis hide domain={yDomain} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.4}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
