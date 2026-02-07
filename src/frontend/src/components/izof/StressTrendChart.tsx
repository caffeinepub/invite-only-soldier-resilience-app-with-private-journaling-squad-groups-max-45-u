import React from 'react';
import type { DailyZoneCheckEntry } from '../../types/izof';
import { getStressTrendData } from '../../utils/izofAnalytics';

interface StressTrendChartProps {
  entries: DailyZoneCheckEntry[];
}

export default function StressTrendChart({ entries }: StressTrendChartProps) {
  const trendData = getStressTrendData(entries);

  if (trendData.length === 0) {
    return <p className="text-sm text-muted-foreground">No data to display</p>;
  }

  const maxStress = 10;
  const chartHeight = 200;
  const chartWidth = 600;
  const padding = 40;

  const xStep = (chartWidth - padding * 2) / Math.max(trendData.length - 1, 1);
  const yScale = (chartHeight - padding * 2) / maxStress;

  const points = trendData.map((point, index) => ({
    x: padding + index * xStep,
    y: chartHeight - padding - point.stressRating * yScale,
    ...point,
  }));

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="w-full overflow-x-auto">
      <svg width={chartWidth} height={chartHeight} className="border rounded">
        {/* Y-axis */}
        <line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
        {/* X-axis */}
        <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />

        {/* Y-axis labels */}
        {[0, 2, 4, 6, 8, 10].map(val => (
          <text
            key={val}
            x={padding - 10}
            y={chartHeight - padding - val * yScale + 5}
            textAnchor="end"
            fontSize="10"
            className="fill-muted-foreground"
          >
            {val}
          </text>
        ))}

        {/* Line */}
        <path d={pathData} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />

        {/* Points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={point.performanceOutcome && point.performanceOutcome >= 4 ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
          />
        ))}
      </svg>
      <p className="text-xs text-muted-foreground mt-2">
        Filled circles indicate high-performance outcomes (4-5). Hover over points for details.
      </p>
    </div>
  );
}
