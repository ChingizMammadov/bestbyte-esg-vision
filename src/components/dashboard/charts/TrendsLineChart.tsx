
import { LineChart, Line, XAxis, YAxis, Tooltip as ChartTooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const lineData = [
  { name: "Jan", Carbon: 120, Water: 80, Energy: 55 },
  { name: "Feb", Carbon: 105, Water: 60, Energy: 65 },
  { name: "Mar", Carbon: 102, Water: 80, Energy: 70 },
  { name: "Apr", Carbon: 97, Water: 70, Energy: 80 },
  { name: "May", Carbon: 91, Water: 60, Energy: 105 },
];

export function TrendsLineChart() {
  return (
    <Card className="bg-white/95 border rounded-2xl shadow-xl h-full dashboard-card">
      <CardHeader>
        <CardTitle>Yearly ESG Trends</CardTitle>
        <CardDescription>Month-over-month performance</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={170}>
          <LineChart data={lineData}>
            <XAxis dataKey="name" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
            <ChartTooltip
              contentStyle={{ background: "#f0fdfa", borderColor: "#a7f3d0", borderRadius: '0.5rem' }}
              formatter={(value: any, name: string) => [`${value} units`, name]}
            />
            <Legend wrapperStyle={{fontSize: "12px", paddingTop: "10px"}} />
            <Line type="monotone" dataKey="Carbon" stroke="#718096" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Water" stroke="#4299e1" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="Energy" stroke="#48bb78" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
