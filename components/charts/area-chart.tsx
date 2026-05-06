"use client";

import {
  Area,
  AreaChart as RAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartColors, chartFont } from "./chart-theme";
import { ZedTooltip } from "./tooltip";

export interface AreaChartPoint {
  label: string;
  value: number;
}

interface ZedAreaChartProps {
  data: AreaChartPoint[];
  height?: number;
  yDomain?: [number, number];
  unit?: string;
  showXAxis?: boolean;
  showYAxis?: boolean;
}

export function ZedAreaChart({
  data,
  height = 180,
  yDomain,
  unit,
  showXAxis = true,
  showYAxis = false,
}: ZedAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RAreaChart data={data} margin={{ top: 6, right: 4, bottom: 0, left: 0 }}>
        <CartesianGrid
          stroke={chartColors.grid}
          vertical={false}
          strokeDasharray="2 4"
        />
        {showXAxis && (
          <XAxis
            dataKey="label"
            stroke={chartColors.muted}
            tick={{
              fontFamily: chartFont.family,
              fontSize: chartFont.size,
              fill: chartColors.muted,
            }}
            axisLine={{ stroke: chartColors.border }}
            tickLine={false}
            interval="preserveStartEnd"
          />
        )}
        {showYAxis && (
          <YAxis
            domain={yDomain}
            stroke={chartColors.muted}
            tick={{
              fontFamily: chartFont.family,
              fontSize: chartFont.size,
              fill: chartColors.muted,
            }}
            axisLine={{ stroke: chartColors.border }}
            tickLine={false}
            width={28}
          />
        )}
        <Tooltip
          content={<ZedTooltip unit={unit} />}
          cursor={{
            stroke: chartColors.muted,
            strokeDasharray: "2 3",
            strokeOpacity: 0.5,
          }}
        />
        {/* Flat fill (no gradient) per design system */}
        <Area
          type="monotone"
          dataKey="value"
          stroke={chartColors.accent}
          strokeWidth={1.6}
          fill={chartColors.accent}
          fillOpacity={0.12}
          dot={false}
          activeDot={{
            r: 3,
            fill: chartColors.accent,
            stroke: chartColors.bg,
            strokeWidth: 2,
          }}
        />
      </RAreaChart>
    </ResponsiveContainer>
  );
}
