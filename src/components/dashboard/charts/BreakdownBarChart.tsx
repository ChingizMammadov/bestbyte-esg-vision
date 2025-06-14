
import React from "react";
import {
  BarChart,
  Bar,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { icons, barColors } from "./EsgBarIcons";

const scoreColor = (score: number) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-500";
  return "text-red-500";
};

export function BreakdownBarChart({
  data,
  layout,
  selected,
  setSelected,
}: {
  data: {
    category: string;
    key: string;
    score: number;
    details: string;
  }[];
  layout: "vertical" | "horizontal";
  selected: string | null;
  setSelected: (s: string | null) => void;
}) {
  const yAxisWidth = layout === "horizontal" ? 80 : undefined;

  return (
    <ResponsiveContainer width="100%" height={layout === "vertical" ? 230 : 220}>
      <BarChart
        layout={layout}
        data={data}
        margin={
          layout === "vertical"
            ? { top: 20, bottom: 5, left: 5, right: 5 }
            : { left: 5, right: 40, top: 10, bottom: 10 }
        }
        barCategoryGap={layout === "vertical" ? "30%" : "40%"}
      >
        <defs>
          <linearGradient id="colorE" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={barColors.Environmental} stopOpacity={0.7} />
            <stop offset="100%" stopColor={barColors.Environmental} stopOpacity={1} />
          </linearGradient>
          <linearGradient id="colorS" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={barColors.Social} stopOpacity={0.7} />
            <stop offset="100%" stopColor={barColors.Social} stopOpacity={1} />
          </linearGradient>
          <linearGradient id="colorG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={barColors.Governance} stopOpacity={0.7} />
            <stop offset="100%" stopColor={barColors.Governance} stopOpacity={1} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey={layout === "vertical" ? "category" : "score"}
          type={layout === "vertical" ? "category" : "number"}
          axisLine={false}
          tickLine={false}
          tick={{
            fontWeight: 700,
            fontSize: layout === "vertical" ? 13 : 12,
          }}
          domain={[0, 100]}
          hide={layout === "horizontal"}
        />
        <YAxis
          dataKey={layout === 'horizontal' ? 'category' : undefined}
          type="category"
          domain={[0, 100]}
          axisLine={false}
          tickLine={false}
          width={yAxisWidth}
          tick={{ fontSize: 13, fontWeight: 600 }}
          hide={layout === "vertical"}
        />
        <ChartTooltip
          cursor={{ fill: "rgba(165,180,252,0.12)" }}
          content={({ active, payload }) => {
            if (active && payload && payload.length > 0) {
              const d = payload[0].payload;
              return (
                <div className="bg-white/90 p-3 rounded-lg shadow-xl border border-border/50 max-w-xs animate-fade-in space-y-1.5">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    {icons[d.category as keyof typeof icons]}
                    <span className="font-bold text-base" style={{ color: barColors[d.category as keyof typeof barColors] }}>
                      {d.category}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className={`font-black text-2xl ${scoreColor(d.score)}`}>
                      {d.score.toFixed(1)}
                    </span>
                    <span className="font-semibold text-sm text-gray-500">/ 100</span>
                  </div>
                  <p className="text-xs text-gray-400">{d.details}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey="score"
          animationDuration={500}
          radius={layout === "vertical" ? [8, 8, 0, 0] : [0, 8, 8, 0]}
          onClick={d => setSelected(selected === d.category ? null : d.category)}
          cursor="pointer"
          maxBarSize={layout === 'vertical' ? 50 : 22}
          minPointSize={5}
        >
          {data.map((entry) => (
            <Cell
              key={entry.category}
              fill={`url(#color${entry.key})`}
              strokeWidth={2}
              stroke={selected === entry.category ? barColors[entry.category as keyof typeof barColors] : '#aaa'}
              opacity={
                selected === null || selected === entry.category
                  ? 1
                  : 0.3
              }
              style={{
                filter: `drop-shadow(0 4px 10px ${barColors[entry.category as keyof typeof barColors]}22)`,
                cursor: "pointer",
                transition: "all .3s",
              }}
            />
          ))}
          <LabelList
            dataKey="score"
            position={layout === "vertical" ? "top" : "right"}
            offset={12}
            formatter={(score: number, entry: { category: string }) => {
              const category = entry?.category;
              if (!category || score === undefined) {
                return null;
              }
              const color = barColors[category as keyof typeof barColors] ?? "#3B82F6";
              return (
                <tspan
                  className="font-bold"
                  fontSize={layout === 'vertical' ? 15 : 15}
                  fill={color}
                  style={{ textShadow: "0 1px 5px #fff8" }}
                >
                  {score?.toFixed(1)}
                </tspan>
              );
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
