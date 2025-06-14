
import React, { useState } from "react";
import { BarChart, Bar, Tooltip as ChartTooltip, XAxis, YAxis, Cell, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// Example mock data for ESG categories
const esgScores = [
  { category: "Environmental", score: 65, details: "Key metrics: Carbon intensity, renewable energy use, waste reduction." },
  { category: "Social", score: 75, details: "Key metrics: Employee diversity, community investment, workplace safety." },
  { category: "Governance", score: 80, details: "Key metrics: Board diversity, ethics, transparency." },
];

// Color code function based on score
const colorByScore = (score: number) => {
  if (score >= 80) return "#22C55E";   // green-500
  if (score >= 60) return "#EAB308";   // yellow-500
  return "#EF4444";                    // red-500
};

// Tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-semibold" style={{color: colorByScore(data.score)}}>{data.category}</p>
        <p className="text-sm text-gray-700">Score: <span className="font-bold">{data.score}</span></p>
        <p className="text-xs text-gray-500">{data.details}</p>
      </div>
    );
  }
  return null;
};

export function ESGScoreBreakdownChart() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleBarClick = (data: any) => {
    setSelected(selected === data.category ? null : data.category);
  };

  const selectedDetails = esgScores.find((d) => d.category === selected);

  return (
    <Card className="bg-white border rounded-2xl shadow-lg h-full mb-6 hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-gray-900 flex flex-row items-center">ESG Score Breakdown
          <span className="ml-2 text-xs font-semibold rounded px-2 py-1 bg-blue-100 text-blue-600">Interactive</span>
        </CardTitle>
        <CardDescription className="text-gray-600">Click a bar for detailed insights. Color-coded by score.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={esgScores} margin={{top: 0, right: 20, left: 0, bottom: 0}}>
            <XAxis dataKey="category" tick={{fontWeight: 600, fontSize: 13}} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
            <ChartTooltip content={<CustomTooltip />} />
            <Bar
              dataKey="score"
              radius={[8, 8, 0, 0]}
              isAnimationActive={true}
              onClick={handleBarClick}
              cursor="pointer"
            >
              {esgScores.map((entry, idx) =>
                <Cell
                  key={entry.category}
                  fill={colorByScore(entry.score)}
                  opacity={selected === null || selected === entry.category ? 1 : 0.5}
                  className="transition-all"
                />
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {/* Drilldown insights */}
        {selectedDetails && (
          <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200 animate-fade-in">
            <span className="font-bold text-blue-900">{selectedDetails.category} Details</span>
            <p className="text-sm text-blue-800 mt-1">{selectedDetails.details}</p>
            <p className="text-xs text-gray-600 mt-2">
              <span className="font-semibold">Score: {selectedDetails.score} </span>
              <span className="ml-2 rounded px-2 py-0.5"
                style={{ background: colorByScore(selectedDetails.score), color: "#fff" }}>
                {selectedDetails.score >= 80 ? "High" : selectedDetails.score >= 60 ? "Moderate" : "Low"}
              </span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
