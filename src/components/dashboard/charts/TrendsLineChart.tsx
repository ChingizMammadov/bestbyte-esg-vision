
import { LineChart, Line, XAxis, YAxis, Tooltip as ChartTooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const monthlyData = [
  { month: "Jan", Carbon: 5000, Water: 1000, Energy: 500 },
  { month: "Feb", Carbon: 4800, Water: 950, Energy: 480 },
  { month: "Mar", Carbon: 4700, Water: 900, Energy: 460 },
  { month: "Apr", Carbon: 4500, Water: 920, Energy: 470 },
  { month: "May", Carbon: 4600, Water: 940, Energy: 460 },
  { month: "Jun", Carbon: 4550, Water: 960, Energy: 455 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()} {
              entry.name === 'Carbon' ? 'tons CO2' :
              entry.name === 'Water' ? 'thousand L' : 'MWh'
            }
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function TrendsLineChart() {
  return (
    <Card className="bg-white border rounded-2xl shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-gray-900">6-Month ESG Trends</CardTitle>
        <CardDescription className="text-gray-600">Monthly performance tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="month" 
              stroke="#6B7280" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#6B7280" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <ChartTooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} 
              formatter={(value) => <span className="text-sm font-medium">{value}</span>}
            />
            <Line 
              type="monotone" 
              dataKey="Carbon" 
              stroke="#6B7280" 
              strokeWidth={3} 
              dot={{ r: 4, fill: "#6B7280" }} 
              activeDot={{ r: 6, fill: "#6B7280" }}
              name="Carbon"
            />
            <Line 
              type="monotone" 
              dataKey="Water" 
              stroke="#3B82F6" 
              strokeWidth={3} 
              dot={{ r: 4, fill: "#3B82F6" }} 
              activeDot={{ r: 6, fill: "#3B82F6" }}
              name="Water"
            />
            <Line 
              type="monotone" 
              dataKey="Energy" 
              stroke="#10B981" 
              strokeWidth={3} 
              dot={{ r: 4, fill: "#10B981" }} 
              activeDot={{ r: 6, fill: "#10B981" }}
              name="Energy"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
