
import { LineChart, Line, XAxis, YAxis, Tooltip as ChartTooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

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
      <div className="bg-white p-4 border rounded-lg shadow-lg border-gray-200" role="tooltip">
        <p className="font-semibold text-gray-900 mb-2">{label} Performance</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm flex items-center gap-2" style={{ color: entry.color }}>
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
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
  const [highlightedLine, setHighlightedLine] = useState<string | null>(null);

  return (
    <Card className="bg-white border rounded-2xl shadow-lg h-full hover:shadow-xl transition-shadow duration-300" role="region" aria-labelledby="trends-chart-title">
      <CardHeader className="pb-2">
        <CardTitle id="trends-chart-title" className="text-lg font-bold text-gray-900">6-Month ESG Trends</CardTitle>
        <CardDescription className="text-gray-600">Monthly performance tracking with trend analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="sr-only">
          <h3>ESG Trends Data</h3>
          <p>This chart shows the monthly trends for Carbon emissions, Water usage, and Energy consumption over the past 6 months.</p>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Carbon (tons CO2)</th>
                <th>Water (thousand L)</th>
                <th>Energy (MWh)</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data) => (
                <tr key={data.month}>
                  <td>{data.month}</td>
                  <td>{data.Carbon}</td>
                  <td>{data.Water}</td>
                  <td>{data.Energy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
              onMouseEnter={(e) => setHighlightedLine(e.value)}
              onMouseLeave={() => setHighlightedLine(null)}
            />
            <Line 
              type="monotone" 
              dataKey="Carbon" 
              stroke="#6B7280" 
              strokeWidth={highlightedLine === 'Carbon' || !highlightedLine ? 3 : 2} 
              dot={{ r: 4, fill: "#6B7280" }} 
              activeDot={{ r: 6, fill: "#6B7280", stroke: "#fff", strokeWidth: 2 }}
              name="Carbon"
              opacity={highlightedLine && highlightedLine !== 'Carbon' ? 0.3 : 1}
            />
            <Line 
              type="monotone" 
              dataKey="Water" 
              stroke="#3B82F6" 
              strokeWidth={highlightedLine === 'Water' || !highlightedLine ? 3 : 2} 
              dot={{ r: 4, fill: "#3B82F6" }} 
              activeDot={{ r: 6, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
              name="Water"
              opacity={highlightedLine && highlightedLine !== 'Water' ? 0.3 : 1}
            />
            <Line 
              type="monotone" 
              dataKey="Energy" 
              stroke="#10B981" 
              strokeWidth={highlightedLine === 'Energy' || !highlightedLine ? 3 : 2} 
              dot={{ r: 4, fill: "#10B981" }} 
              activeDot={{ r: 6, fill: "#10B981", stroke: "#fff", strokeWidth: 2 }}
              name="Energy"
              opacity={highlightedLine && highlightedLine !== 'Energy' ? 0.3 : 1}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
