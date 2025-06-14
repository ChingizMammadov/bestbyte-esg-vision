import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { BarChartIcon } from "@/components/icons/BarChartIcon";

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
import { BreakdownBarChart } from "./BreakdownBarChart";
import { icons, barColors } from "./EsgBarIcons";
import { EsgScoreSummaryCard } from "./EsgScoreSummaryCard";

const calcESGScore = () =>
  Math.round(
    esgScores.reduce((sum, s) => sum + s.score, 0) / esgScores.length
  );
const esgOverall = calcESGScore();

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
        <EsgScoreSummaryCard esgOverall={esgOverall} />
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
