
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

// ESG DATA
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

// Animated chart data
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
  const [animatedScores, setAnimatedScores] = useState(data.map(() => 0));
  useEffect(() => {
    let raf: number;
    let frame = 0;
    function animate() {
      frame += 1;
      setAnimatedScores((prev) =>
        data.map((cat, i) => {
          const target = cat.score;
          const value =
            prev[i] +
            Math.min(
              4 + 0.25 * (target - prev[i]),
              target - prev[i]
            );
          return Math.abs(value - target) < 1 ? target : value;
        })
      );
      if (!data.every((cat, i) => Math.abs(animatedScores[i] - cat.score) < 1)) {
        raf = requestAnimationFrame(animate);
      }
    }
    animate();
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line
  }, [data]);

  const yAxisWidth = layout === "horizontal" ? 80 : undefined;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout={layout}
        data={data.map((d, i) => ({
          ...d,
          score: Math.round(animatedScores[i]),
        }))}
        margin={
          layout === "vertical"
            ? { top: 20, bottom: 5, left: 5, right: 5 }
            : { left: 5, right: 40, top: 10, bottom: 10 }
        }
        barCategoryGap={layout === "vertical" ? "28%" : "35%"}
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
          tick={layout === "vertical" ? {
            fontWeight: 700,
            fontSize: 13,
          } : { fontSize: 12 }}
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
          cursor={{ fill: "rgba(165,180,252,0.1)" }}
          content={({ active, payload }) => {
            if (active && payload && payload.length > 0) {
              const data = payload[0].payload;
              return (
                <div className="bg-background/80 backdrop-blur-sm text-foreground p-3 rounded-lg shadow-xl border border-border/50 max-w-xs animate-in fade-in-0 zoom-in-95">
                  <div className="flex items-center gap-2.5 mb-2">
                    {icons[data.category]}
                    <span className="font-bold text-base" style={{ color: barColors[data.category] }}>
                      {data.category}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                      <span className={`font-black text-2xl ${scoreColor(data.score)}`}>
                        {data.score}
                      </span>
                      <span className="font-semibold text-sm text-muted-foreground">/ 100</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">{data.details}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey="score"
          isAnimationActive={false}
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
              strokeWidth={1.5}
              stroke={selected === entry.category ? barColors[entry.category] : 'transparent'}
              opacity={
                selected === null || selected === entry.category
                  ? 1
                  : 0.25
              }
              style={{
                filter: `drop-shadow(0 4px 10px ${barColors[entry.category]}33)`,
                cursor: "pointer",
                transition: "all .2s ease-in-out",
              }}
            />
          ))}
          <LabelList
            dataKey="score"
            position={layout === "vertical" ? "top" : "right"}
            offset={layout === 'vertical' ? 10 : 12}
            formatter={(score: number, d: any) => {
              const cat = d?.category;
              if (!cat) return null;
              const color = barColors[cat] ?? "#3B82F6";
              return (
                <tspan
                  className="font-black"
                  fontSize={layout === 'vertical' ? 14 : 15}
                  fill={color}
                  style={{ textShadow: "0 1px 3px #fffd" }}
                >
                  {Math.round(score)}
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
  const [selected, setSelected] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const layout = isMobile ? "vertical" : "horizontal";

  return (
    <div
      className="
        w-full 
        rounded-2xl 
        shadow-[0_8px_28px_0_rgba(30,60,109,0.09)]
        overflow-hidden
        bg-gradient-to-br from-blue-100/90 via-white/90 to-blue-50/80
        border border-blue-200/60
        animate-fade-in
        my-3
      "
    >
      {/* Gradient header with bold title */}
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
        <div className="
            flex-1 min-w-[140px] 
            flex items-center gap-2 bg-white/80 px-5 py-2 rounded-lg border border-blue-100 shadow-inner
            ">
          {/* Icon for overall */}
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
        <div className="flex w-full items-end justify-center max-w-full relative" style={{ minHeight: layout === 'vertical' ? "200px" : "220px" }}>
          <AnimatedBarChart
            data={esgScores}
            layout={layout}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
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
                  background: barColors[cat.category] + "15",
                }}
              >
                {icons[cat.category]}
              </span>
              <span className="text-xs md:text-[13px] font-semibold" style={{ color: barColors[cat.category] }}>
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

// ... end of file ...
