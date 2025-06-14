
import { PieChart, Pie, Cell, Tooltip as ChartTooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const mockMetrics = [
  { name: "Carbon", value: 60, color: "#718096" }, // Gray
  { name: "Water", value: 25, color: "#4299e1" },  // Blue
  { name: "Energy", value: 15, color: "#48bb78" }, // Green
];

export function MetricsPieChart() {
  return (
    <Card className="bg-white/95 border rounded-2xl shadow-xl h-full dashboard-card hover-scale-hover">
      <CardHeader>
        <CardTitle>Carbon / Water / Energy</CardTitle>
        <CardDescription>Breakdown of core metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={170}>
          <PieChart>
            <ChartTooltip
              cursor={{ fill: "#f0f9ff", opacity: 0.4 }}
              formatter={(value: any, name: string) => [`${value} units`, name]}
            />
            <Pie
              dataKey="value"
              data={mockMetrics}
              cx="50%"
              cy="50%"
              outerRadius={65}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                const RADIAN = Math.PI / 180;
                const radius = 80;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                const metric = mockMetrics[index];
                return (
                  <text x={x} y={y} fill={metric.color} textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" className="font-bold text-xs">
                    {metric.name}
                  </text>
                );
              }}
              isAnimationActive={true}
              animationDuration={700}
            >
              {mockMetrics.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} stroke={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
