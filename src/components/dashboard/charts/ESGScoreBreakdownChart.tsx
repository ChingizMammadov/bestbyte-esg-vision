
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
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Leaf, People, Gavel, CheckCircle } from "lucide-react";

// ESG DATA (could be fetched dynamically)
const esgScores = [
  {
    category: "Environmental",
    key: "E",
    score: 70,
    details:
      "Based on carbon intensity, renewable energy use, waste reduction, and water efficiency.",
  },
  {
    category: "Social",
    key: "S",
    score: 78,
    details:
      "Based on workplace safety, labor practice, community engagement, and diversity.",
  },
  {
    category: "Governance",
    key: "G",
    score: 77,
    details:
      "Based on board diversity, executive compensation, ethics and transparency.",
  },
];

// Category icon and color utilities
const icons = {
  Environmental: <Leaf size={20} className="text-green-600" />,
  Social: <People size={20} className="text-blue-500" />,
  Governance: <Gavel size={20} className="text-gray-500" />,
};

const barColors = {
  Environmental: "#22C55E", // green
  Social: "#3B82F6", // blue
  Governance: "#6B7280", // gray
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

// Helper to calculate overall score (simple average here)
const calcESGScore = () =>
  Math.round(
    esgScores.reduce((sum, s) => sum + s.score, 0) / esgScores.length
  );

const esgOverall = calcESGScore();

// Chart animation: Animate bar fill from 0
const AnimatedBarChart = ({
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
  const [animatedScores, setAnimatedScores] = useState(
    data.map(() => 0)
  );

  useEffect(() => {
    // Animate bars filling up
    let raf: number;
    let frame = 0;
    function animate() {
      frame += 1;
      setAnimatedScores((prev) =>
        data.map((cat, i) => {
          const target = cat.score;
          // Springy animation, 30 frames max (0.5s)
          const value =
            prev[i] +
            Math.min(
              4 + 0.25 * (target - prev[i]),
              target - prev[i]
            );
          return Math.abs(value - target) < 1 ? target : value;
        })
      );
      if (
        !data.every((cat, i) => Math.abs(animatedScores[i] - cat.score) < 1)
      ) {
        raf = requestAnimationFrame(animate);
      }
    }
    animate();
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line
  }, [data]);

  // Build chart options
  return (
    <ResponsiveContainer width="100%" height={layout === "vertical" ? 188 : 128}>
      <BarChart
        layout={layout}
        data={data.map((d, i) => ({
          ...d,
          score: Math.round(animatedScores[i]),
        }))}
        margin={
          layout === "vertical"
            ? { top: 12, bottom: 18, left: 10, right: 16 }
            : { left: 26, right: 10, top: 0, bottom: 0 }
        }
        barCategoryGap="25%"
      >
        <XAxis
          dataKey={layout === "vertical" ? "category" : undefined}
          type={layout === "vertical" ? "category" : "number"}
          axisLine={false}
          tickLine={false}
          tick={layout === "vertical" ? {
            fontWeight: 700,
            fontSize: 14,
          } : false}
          hide={layout === "horizontal"}
        />
        <YAxis
          domain={[0, 100]}
          axisLine={false}
          tickLine={false}
          tick={
            layout === "horizontal"
              ? { fontWeight: 700, fontSize: 14 }
              : false
          }
          hide={layout === "vertical"}
        />
        <ChartTooltip
          cursor={{ fill: "rgba(165,180,252,0.14)" }}
          content={({ active, payload }) => {
            if (active && payload && payload.length > 0) {
              const data = payload[0].payload;
              return (
                <div className="bg-white p-3 rounded-xl shadow-lg border border-blue-100 animate-fade-in">
                  <div className="flex items-center gap-2 mb-1">
                    {icons[data.category]}
                    <span className="font-bold" style={{color: barColors[data.category]}}>
                      {data.category} Score
                    </span>
                  </div>
                  <div className="text-sm text-gray-800 mb-1">
                    <span className={`font-semibold text-sm ${scoreColor(data.score)}`}>{data.score}/100</span>
                  </div>
                  <div className="text-xs text-gray-500">{data.details}</div>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey="score"
          isAnimationActive={false}
          radius={[12, 12, 0, 0]}
          onClick={d => setSelected(selected === d.category ? null : d.category)}
          cursor="pointer"
          maxBarSize={44}
          minPointSize={8}
          fill="#E0E7EF"
        >
          {data.map((entry, idx) => (
            <Cell
              key={entry.category}
              fill={barColors[entry.category]}
              opacity={
                selected === null || selected === entry.category
                  ? 1
                  : 0.38
              }
              className="transition-all"
              style={{
                filter: `drop-shadow(0 2px 11px ${barColors[entry.category]}22)`,
                cursor: "pointer",
              }}
            />
          ))}
          <LabelList
            dataKey="score"
            position={layout === "vertical" ? "top" : "right"}
            formatter={(score: number, d: any) => (
              <span
                className={`font-bold text-base ${
                  layout === "vertical" ? "block" : "inline"
                }`}
                style={{
                  color: barColors[d.category],
                  textShadow: "0 2px 4px #fff7",
                }}
              >
                {score}/100
              </span>
            )}
          />
        </Bar>
        {/* Render category icons below XAxis for vertical, to the left for horizontal */}
        {layout === "vertical" ? (
          <XAxis
            dataKey="category"
            axisLine={false}
            tickLine={false}
            tick={({ x, y, payload }) => {
              const cat = payload.value;
              return (
                <g transform={`translate(${x},${y + 20})`}>
                  <foreignObject width="40" height="30" x={-13} y={0}>
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                      {icons[cat]}
                    </div>
                  </foreignObject>
                  <text
                    x={8}
                    y={36}
                    textAnchor="middle"
                    fontSize={13}
                    fill="#374151"
                  >
                    {/* don't render below bar, since already above */}
                  </text>
                </g>
              );
            }}
            interval={0}
            height={28}
          />
        ) : null}
      </BarChart>
    </ResponsiveContainer>
  );
};

export function ESGScoreBreakdownChart() {
  const [selected, setSelected] = useState<string | null>(null);
  const [layout, setLayout] = useState<"vertical" | "horizontal">("vertical");

  return (
    <Card
      className="
        bg-gradient-to-br from-blue-100/70 via-white to-blue-50/60
        border-0
        rounded-2xl
        shadow-[0_8px_28px_0_rgba(30,60,109,0.07)]
        px-0 md:px-0 py-2
        transition-shadow duration-300
        w-full
        animate-fade-in
        "
    >
      {/* Gradient header with bold title */}
      <div className="rounded-t-2xl bg-gradient-to-r from-blue-200/70 via-white/60 to-blue-50/80 px-4 pt-4 pb-1 flex flex-col gap-1 border-b border-blue-100">
        <div className="flex items-center gap-2 mb-1">
          <BarChartIcon size={23} className="text-blue-500 mr-1" />
          <h2 className="font-black text-gray-900 text-lg md:text-xl tracking-tight leading-tight">
            Interactive ESG Score Breakdown
          </h2>
        </div>
        <p className="text-sm md:text-base text-blue-900/90 font-normal mb-1">
          Explore the company's ESG performance across Environmental, Social, and Governance metrics.
        </p>
        <span className="text-sm text-blue-900/60 font-light mb-2">
          Our ESG score breakdown helps identify strengths and areas for improvement in each category.
        </span>
      </div>

      {/* ESG Score summary card (numeric, colored) */}
      <div className="w-full flex flex-col md:flex-row items-center gap-3 md:gap-7 px-4 pt-4 pb-0">
        <div className="
            flex-1 min-w-[145px]
            flex items-center gap-2 bg-white/70 px-5 py-2 rounded-lg border border-blue-100 shadow-inner
            ">
          {/* Icon for overall */}
          <CheckCircle
            size={28}
            className={
              "mr-2 " +
              (esgOverall >= 80
                ? "text-green-500"
                : esgOverall >= 60
                ? "text-yellow-500"
                : "text-red-500")
            }
          />
          <span className="font-medium text-gray-900/80 text-lg">
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
              "ml-5 rounded px-2 py-1 text-xs font-semibold shadow-lg " +
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
        {/* Layout toggle */}
        <div className="flex flex-1 md:flex-none gap-2 justify-end items-center mt-2 md:mt-0 px-1">
          <span className="text-xs text-gray-500 mr-2">Chart Layout:</span>
          <button
            onClick={() => setLayout("vertical")}
            className={`px-3 py-1 rounded font-medium border ${
              layout === "vertical"
                ? "bg-blue-100 border-blue-400 text-blue-900"
                : "hover:bg-blue-50 border-slate-200 text-gray-500"
            } transition`}
            aria-label="Vertical Bar Chart"
          >
            <BarChartIcon size={19} />
          </button>
          <button
            onClick={() => setLayout("horizontal")}
            className={`px-3 py-1 rounded font-medium border ${
              layout === "horizontal"
                ? "bg-blue-100 border-blue-400 text-blue-900"
                : "hover:bg-blue-50 border-slate-200 text-gray-500"
            } transition`}
            aria-label="Horizontal Bar Chart"
          >
            <BarChartHorizontalIcon size={19} />
          </button>
        </div>
      </div>

      {/* ESG Interactive Bar Chart */}
      <CardContent className="pt-1 pb-0 px-4 md:px-8 flex flex-col w-full justify-center">
        <div className="flex w-full items-end justify-center max-w-full relative">
          <AnimatedBarChart
            data={esgScores}
            layout={layout}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        {/* Category key (icon + label) for mobile clarity */}
        <div className="flex flex-row mt-3 mb-0 w-full items-center justify-evenly md:justify-center gap-6">
          {esgScores.map(cat => (
            <span key={cat.category} className="flex flex-col items-center gap-1">
              <span
                className="rounded-full p-1"
                style={{
                  background: barColors[cat.category] + "15",
                }}
              >
                {icons[cat.category]}
              </span>
              <span className="text-[13px] font-semibold" style={{color: barColors[cat.category]}}>
                {cat.category}
              </span>
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Local-only Lucide icons for layout buttons
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
