import React, { useState, useEffect } from "react";
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
import {
  Leaf,
  Gavel,
  Users, // Changed from ArrowUp
  CheckCircle,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// ESG DATA -- always present and simple!
const esgScores = [
  {
    category: "Environmental",
    key: "E",
    score: 70.4,
    details:
      "Based on carbon intensity, renewable energy use, waste reduction, and water efficiency.",
  },
  {
    category: "Social",
    key: "S",
    score: 78.2,
    details:
      "Based on workplace safety, labor practice, community engagement, and diversity.",
  },
  {
    category: "Governance",
    key: "G",
    score: 77.0,
    details:
      "Based on board diversity, executive compensation, ethics and transparency.",
  },
];

// Icon/color helpers
const icons = {
  Environmental: <Leaf className="text-green-600 w-6 h-6 md:w-5 md:h-5" />,
  Social: <Users className="text-blue-500 w-6 h-6 md:w-5 md:h-5" />,
  Governance: <Gavel className="text-gray-500 w-6 h-6 md:w-5 md:h-5" />,
};
const barColors = {
  Environmental: "#22C55E",
  Social: "#3B82F6",
  Governance: "#6B7280",
};

const scoreColor = (score: number) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-500";
  return "text-red-500";
};
const progressColor = (score: number) => {
  if (score >= 80) return "#22C55E";
  if (score >= 60) return "#EAB308";
  return "#EF4444";
};
const calcESGScore = () =>
  Math.round(
    esgScores.reduce((sum, s) => sum + s.score, 0) / esgScores.length
  );
const esgOverall = calcESGScore();

// Simplified chart: visible by default, labels are never hidden, tooltips always work
const BreakdownBarChart = ({
  data,
  layout,
  selected,
  setSelected,
}: {
  data: typeof esgScores;
  layout: "vertical" | "horizontal";
  selected: string | null;
  setSelected: (s: string | null) => void;
}) => {
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
          tick={{fontSize: 13, fontWeight: 600}}
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
};

export function ESGScoreBreakdownChart() {
  const [selected, setSelected] = React.useState<string | null>(null);
  const isMobile = useIsMobile();
  const layout = isMobile ? "vertical" : "horizontal";

  return (
    <div className="
      w-full 
      rounded-2xl 
      shadow-[0_8px_28px_0_rgba(30,60,109,0.09)]
      overflow-hidden
      bg-gradient-to-br from-blue-100/90 via-white/90 to-blue-50/80
      border border-blue-200/60
      animate-fade-in
      my-3
    ">
      {/* Gradient header */}
      <div className="rounded-t-2xl bg-gradient-to-r from-blue-200/60 via-white/60 to-blue-50/90 px-5 py-4 flex flex-col md:flex-row md:items-center gap-1 border-b border-blue-100">
        <div className="flex items-center gap-2 mb-1">
          <BarChartIcon className="text-blue-500 w-7 h-7 mr-1" />
          <h2 className="font-black text-gray-900 text-lg md:text-xl !leading-tight">
            Interactive ESG Score Breakdown
          </h2>
        </div>
        <div className="md:ml-4 mt-1 flex-1">
          <p className="text-sm md:text-base text-blue-900/90 font-normal mb-0">
            Explore ESG performance. Select a bar to focus on a category.
          </p>
          <span className="text-xs md:text-sm text-blue-900/60 font-light">
            Our ESG score breakdown helps identify strengths and areas for improvement.
          </span>
        </div>
      </div>

      {/* ESG Score summary card */}
      <div className="w-full flex flex-col md:flex-row items-center gap-3 md:gap-7 px-5 pt-4 pb-1">
        <div className="flex-1 min-w-[140px] flex items-center gap-2 bg-white/80 px-5 py-2 rounded-lg border border-blue-100 shadow-inner">
          <CheckCircle
            className={
              "mr-2 w-7 h-7 " +
              (esgOverall >= 80
                ? "text-green-500"
                : esgOverall >= 60
                ? "text-yellow-500"
                : "text-red-500")
            }
          />
          <span className="font-medium text-gray-900/80 text-lg flex items-center">
            ESG Score:{" "}
            <span
              className={
                "font-black text-2xl ml-2 " +
                (esgOverall >= 80
                  ? "text-green-600"
                  : esgOverall >= 60
                  ? "text-yellow-500"
                  : "text-red-500")
              }
            >
              {esgOverall}
            </span>
            <span className="font-bold text-gray-600 ml-1 text-base">/100</span>
          </span>
          <span
            className={
              "ml-4 rounded px-2 py-1 text-xs font-semibold shadow-lg " +
              (esgOverall >= 80
                ? "bg-green-500/90 text-white"
                : esgOverall >= 60
                ? "bg-yellow-400/90 text-gray-900"
                : "bg-red-500/90 text-white")
            }
          >
            {esgOverall >= 80
              ? "High"
              : esgOverall >= 60
              ? "Moderate"
              : "Low"}
          </span>
        </div>
      </div>

      {/* ESG Interactive Bar Chart */}
      <div className="pt-2 pb-4 px-2 sm:px-4 flex flex-col w-full justify-center">
        {esgScores && esgScores.length > 0 ? (
          <div className="flex w-full items-end justify-center max-w-full relative" style={{ minHeight: layout === 'vertical' ? "200px" : "220px" }}>
            <BreakdownBarChart
              data={esgScores}
              layout={layout}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[180px] rounded-xl bg-white/70 border border-blue-100 shadow-inner my-5">
            <span className="text-2xl text-blue-500 mb-2">😕</span>
            <p className="font-semibold text-blue-900">No data to display</p>
            <p className="text-xs text-blue-800/60 mt-1">
              ESG score breakdown data is unavailable.
            </p>
          </div>
        )}
        {/* Category key (icon + label): always visible, spacious and clear */}
        <div className="flex flex-row mt-4 mb-1 w-full items-center justify-evenly md:justify-center gap-x-6 gap-y-2 flex-wrap">
          {esgScores.map(cat => (
            <button key={cat.category} 
              onClick={() => setSelected(selected === cat.category ? null : cat.category)}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all duration-200 ${selected === cat.category ? 'bg-blue-100/80' : ''} ${selected === null ? '' : selected === cat.category ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
            >
              <span
                className="rounded-full p-1.5"
                style={{
                  background: barColors[cat.category as keyof typeof barColors] + "15",
                }}
              >
                {icons[cat.category as keyof typeof icons]}
              </span>
              <span className="text-xs md:text-[13px] font-semibold" style={{ color: barColors[cat.category as keyof typeof barColors] }}>
                {cat.category}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Lucide-style icons for layout buttons
function BarChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 3v18h18" />
      <rect x="9" y="13" width="2" height="6" rx="1" />
      <rect x="5" y="17" width="2" height="2" rx="1" />
      <rect x="13" y="9" width="2" height="10" rx="1" />
      <rect x="17" y="6" width="2" height="13" rx="1" />
    </svg>
  );
}
function BarChartHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 21H3V3" />
      <rect x="7" y="17" width="9" height="2" rx="1" />
      <rect x="7" y="13" width="13" height="2" rx="1" />
      <rect x="7" y="9" width="6" height="2" rx="1" />
      <rect x="7" y="5" width="11" height="2" rx="1" />
    </svg>
  );
}
