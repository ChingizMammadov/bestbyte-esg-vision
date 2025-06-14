
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { BarChartIcon } from "@/components/icons/BarChartIcon";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BreakdownBarChart } from "./BreakdownBarChart";
import { icons, barColors } from "./EsgBarIcons";
import { EsgScoreSummaryCard } from "./EsgScoreSummaryCard";
import { Skeleton } from "@/components/ui/skeleton";

// Define the shape of our data
type EsgScore = {
  category: string;
  score: number;
  details: string;
  key: string;
};

// Fetch data from Supabase
async function fetchEsgScores(): Promise<EsgScore[]> {
  console.log("🔍 Fetching ESG scores from Supabase...");
  
  const { data, error } = await supabase
    .from("esg_scores")
    .select("category, score, metric_detail");

  console.log("📊 Raw data from Supabase:", data);
  console.log("❌ Error from Supabase:", error);

  if (error) {
    console.error("Error fetching ESG scores:", error);
    throw error; // Let react-query handle the error
  }

  if (!data) {
    console.log("⚠️ No data returned from Supabase");
    return [];
  }

  console.log(`✅ Successfully fetched ${data.length} ESG scores`);

  // Map DB schema to component's expected props
  const mappedData = data.map((score) => ({
    category: score.category,
    score: score.score ?? 0,
    details: score.metric_detail ?? "No details available.",
    key: score.category ? score.category.charAt(0).toUpperCase() : "",
  }));

  console.log("🔄 Mapped data:", mappedData);
  return mappedData;
}

export function ESGScoreBreakdownChart() {
  const [selected, setSelected] = React.useState<string | null>(null);
  const isMobile = useIsMobile();
  const layout = isMobile ? "vertical" : "horizontal";

  const {
    data: esgScores,
    isLoading,
    isError,
    error,
  } = useQuery<EsgScore[]>({
    queryKey: ["esgScores"],
    queryFn: fetchEsgScores,
  });

  console.log("🎯 Component state:");
  console.log("- esgScores:", esgScores);
  console.log("- isLoading:", isLoading);
  console.log("- isError:", isError);
  console.log("- error:", error);

  const esgOverall = React.useMemo(() => {
    if (!esgScores || esgScores.length === 0) {
      console.log("📈 No scores available for overall calculation");
      return 0;
    }
    const overall = Math.round(
      esgScores.reduce((sum, s) => sum + s.score, 0) / esgScores.length
    );
    console.log("📈 Calculated overall ESG score:", overall);
    return overall;
  }, [esgScores]);

  // Loading state
  if (isLoading) {
    console.log("⏳ Component is in loading state");
    return (
      <div className="w-full rounded-2xl shadow-[0_8px_28px_0_rgba(30,60,109,0.09)] bg-gradient-to-br from-blue-100/90 via-white/90 to-blue-50/80 border border-blue-200/60 my-3 p-5 animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="w-8 h-8 rounded-full bg-blue-200/50" />
          <Skeleton className="h-7 w-1/2 bg-blue-200/50" />
        </div>
        <Skeleton className="h-4 w-3/4 mb-6 bg-blue-200/50" />
        <div className="flex justify-around items-end pt-2 pb-4 px-2 sm:px-4" style={{ height: "280px" }}>
          <Skeleton className="h-2/3 w-20 bg-blue-200/50 rounded-t-xl" />
          <Skeleton className="h-full w-20 bg-blue-200/50 rounded-t-xl" />
          <Skeleton className="h-3/4 w-20 bg-blue-200/50 rounded-t-xl" />
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    console.log("💥 Component is in error state:", error);
    return (
      <div className="w-full rounded-2xl shadow-[0_8px_28px_0_rgba(30,60,109,0.09)] my-3 p-5 bg-red-50 border border-red-200 text-center">
        <span className="text-4xl">😟</span>
        <h3 className="font-bold text-lg text-red-800 mt-2">Error Loading Chart Data</h3>
        <p className="text-red-700 mt-1 text-sm">
          Could not fetch ESG score data from the database. It might be an issue with the connection or table schema.
        </p>
        <pre className="mt-3 p-2 bg-red-100 text-red-900 text-xs rounded-md overflow-auto text-left">
          <code>{error instanceof Error ? error.message : "An unknown error occurred."}</code>
        </pre>
      </div>
    );
  }

  console.log("🎨 Rendering component with data:", esgScores);

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
          <div className="flex w-full items-end justify-center max-w-full relative" style={{ minHeight: layout === 'vertical' ? "280px" : "260px" }}>
            <BreakdownBarChart
              data={esgScores}
              layout={layout}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[220px] rounded-xl bg-white/70 border border-blue-100 shadow-inner my-5">
            <span className="text-2xl text-blue-500 mb-2">📊</span>
            <p className="font-semibold text-blue-900">No ESG Data Available</p>
            <p className="text-xs text-blue-800/60 mt-1">
              Check the console for debugging information.
            </p>
            <p className="text-xs text-blue-800/60 mt-1">
              Data length: {esgScores?.length || 0}
            </p>
          </div>
        )}
        {/* Category key (icon + label): always visible, spacious and clear */}
        {esgScores && esgScores.length > 0 && (
          <div className="flex flex-row mt-6 mb-1 w-full items-center justify-evenly md:justify-center gap-x-8 gap-y-3 flex-wrap">
            {esgScores.map(cat => (
              <button key={cat.category} 
                onClick={() => setSelected(selected === cat.category ? null : cat.category)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 ${selected === cat.category ? 'bg-blue-100/80 scale-105' : 'hover:bg-blue-50/60'} ${selected === null ? '' : selected === cat.category ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
              >
                <span
                  className="rounded-full p-2"
                  style={{
                    background: barColors[cat.category as keyof typeof barColors] + "20",
                  }}
                >
                  {icons[cat.category as keyof typeof icons]}
                </span>
                <span className="text-sm md:text-[14px] font-semibold" style={{ color: barColors[cat.category as keyof typeof barColors] }}>
                  {cat.category}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
