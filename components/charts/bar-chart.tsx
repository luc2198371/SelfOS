"use client";

import {
  Bar,
  BarChart as RBarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartColors, chartFont } from "./chart-theme";
import { ZedTooltip } from "./tooltip";

export interface BarChartPoint {
  label: string;
  value: number;
  highlight?: boolean;
}

interface ZedBarChartProps {
  data: BarChartPoint[];
  height?: number;
  yDomain?: [number, number];
  unit?: string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  /** If true, only the maximum bar is rendered in accent; the rest are muted. */
  highlightMax?: boolean;
}

export function ZedBarChart({
  data,
  height = 180,
  yDomain,
  unit,
  showXAxis = true,
  showYAxis = false,
  highlightMax = false,
}: ZedBarChartProps) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RBarChart data={data} margin={{ top: 6, right: 4, bottom: 0, left: 0 }}>
        <CartesianGrid stroke={chartColors.grid} vertical={false} strokeDasharray="2 4" />
        {showXAxis && (
          <XAxis
            dataKey="label"
            stroke={chartColors.muted}
            tick={{ fontFamily: chartFont.family, fontSize: chartFont.size, fill: chartColors.muted }}
            axisLine={{ stroke: chartColors.border }}
            tickLine={false}
            interval="preserveStartEnd"
          />
        )}
        {showYAxis && (
          <YAxis
            domain={yDomain}
            stroke={chartColors.muted}
            tick={{ fontFamily: chartFont.family, fontSize: chartFont.size, fill: chartColors.muted }}
            axisLine={{ stroke: chartColors.border }}
            tickLine={false}
            width={28}
          />
        )}
        <Tooltip
          content={<ZedTooltip unit={unit} />}
          cursor={{ fill: chartColors.muted, fillOpacity: 0.05 }}
        />
        <Bar dataKey="value" radius={[2, 2, 0, 0]} maxBarSize={28}>
          {data.map((d, i) => {
            const isHighlight =
              d.highlight === true || (highlightMax && d.value === max);
            return (
              <Cell
                key={i}
                fill={isHighlight ? chartColors.accent : chartColors.muted}
                fillOpacity={isHighlight ? 0.85 : 0.32}
              />
            );
          })}
        </Bar>
      </RBarChart>
    </ResponsiveContainer>
  );
}
