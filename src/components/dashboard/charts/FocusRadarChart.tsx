
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as ChartTooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const radarData = [
  { subject: "Carbon", A: 60, fullMark: 100 },
  { subject: "Water", A: 80, fullMark: 100 },
  { subject: "Energy", A: 95, fullMark: 100 },
];

export function FocusRadarChart() {
  return (
    <Card className="bg-white/95 border rounded-2xl shadow-xl h-full dashboard-card">
      <CardHeader>
        <CardTitle>ESG Focus Radar</CardTitle>
        <CardDescription>Relative performance overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={170}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#a3a3a3" strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "#155e75", fontWeight: 600, fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar name="Performance" dataKey="A" stroke="#22d3ee" strokeWidth={2} fill="#22d3ee" fillOpacity={0.6} />
            <ChartTooltip
              contentStyle={{ background: "#f0fdfa", borderColor: "#a7f3d0", borderRadius: '0.5rem' }}
              formatter={(value: any) => [`${value}/100`, 'Performance']}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
