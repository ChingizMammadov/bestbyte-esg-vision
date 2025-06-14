
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as ChartTooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const radarData = [
  { subject: "Carbon", score: 75, fullMark: 100, value: "4550 tons CO2" },
  { subject: "Water", score: 85, fullMark: 100, value: "960k liters" },
  { subject: "Energy", score: 90, fullMark: 100, value: "455 MWh" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900">{data.subject}</p>
        <p className="text-sm text-gray-600">Score: {data.score}/100</p>
        <p className="text-sm text-gray-600">Value: {data.value}</p>
      </div>
    );
  }
  return null;
};

export function FocusRadarChart() {
  return (
    <Card className="bg-white border rounded-2xl shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-gray-900">ESG Focus Radar</CardTitle>
        <CardDescription className="text-gray-600">Performance overview across all metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid stroke="#E5E7EB" strokeDasharray="3 3" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: "#374151", fontWeight: 600, fontSize: 12 }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: "#6B7280", fontSize: 10 }} 
              axisLine={false} 
            />
            <Radar 
              name="ESG Score" 
              dataKey="score" 
              stroke="#3B82F6" 
              strokeWidth={2} 
              fill="#3B82F6" 
              fillOpacity={0.3}
              dot={{ r: 4, fill: "#3B82F6" }}
            />
            <ChartTooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
