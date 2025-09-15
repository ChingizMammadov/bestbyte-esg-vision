
import { LineChart, Line, XAxis, YAxis, Tooltip as ChartTooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useLocalStorageWithRefresh } from "@/hooks/useLocalStorageWithRefresh";

// Default data that will be shown if localStorage doesn't have any
const defaultMonthlyData = [
  { month: "Jan", Carbon: 5000, Water: 1000, Energy: 500 },
  { month: "Feb", Carbon: 4800, Water: 950, Energy: 480 },
  { month: "Mar", Carbon: 4700, Water: 900, Energy: 460 },
  { month: "Apr", Carbon: 4500, Water: 920, Energy: 470 },
  { month: "May", Carbon: 4600, Water: 940, Energy: 460 },
  { month: "Jun", Carbon: 4550, Water: 960, Energy: 455 },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-2 sm:p-4 border rounded-lg shadow-lg border-gray-200 dark:border-gray-700 max-w-xs" role="tooltip">
        <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 mb-2">{label} Performance</p>
        {payload.map((entry, index: number) => (
          <p key={index} className="text-xs sm:text-sm flex items-center gap-2" style={{ color: entry.color }}>
            <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
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
  const monthlyData = useLocalStorageWithRefresh('trendsData', defaultMonthlyData);

  return (
    <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg h-full hover:shadow-xl transition-shadow duration-300 overflow-hidden" role="region" aria-labelledby="trends-chart-title">
      <CardHeader className="pb-2 px-3 sm:px-6">
        <CardTitle id="trends-chart-title" className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">6-Month ESG Trends</CardTitle>
        <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Monthly performance tracking with trend analysis</CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
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
        <div className="w-full overflow-hidden">
          <ResponsiveContainer width="100%" height={180} minWidth={300}>
            <LineChart data={monthlyData} margin={{ top: 5, right: 15, left: 5, bottom: 5 }}>
              <XAxis 
                dataKey="month" 
                stroke="#6B7280" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                className="dark:text-gray-400"
              />
              <YAxis 
                stroke="#6B7280" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                className="dark:text-gray-400"
              />
              <ChartTooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: "10px", paddingTop: "8px" }} 
                formatter={(value) => <span className="text-xs font-medium dark:text-gray-300">{value}</span>}
                onMouseEnter={(e) => setHighlightedLine(e.value)}
                onMouseLeave={() => setHighlightedLine(null)}
              />
              <Line 
                type="monotone" 
                dataKey="Carbon" 
                stroke="#6B7280" 
                strokeWidth={highlightedLine === 'Carbon' || !highlightedLine ? 2 : 1} 
                dot={{ r: 2, fill: "#6B7280" }} 
                activeDot={{ r: 4, fill: "#6B7280", stroke: "#fff", strokeWidth: 1 }}
                name="Carbon"
                opacity={highlightedLine && highlightedLine !== 'Carbon' ? 0.3 : 1}
              />
              <Line 
                type="monotone" 
                dataKey="Water" 
                stroke="#3B82F6" 
                strokeWidth={highlightedLine === 'Water' || !highlightedLine ? 2 : 1} 
                dot={{ r: 2, fill: "#3B82F6" }} 
                activeDot={{ r: 4, fill: "#3B82F6", stroke: "#fff", strokeWidth: 1 }}
                name="Water"
                opacity={highlightedLine && highlightedLine !== 'Water' ? 0.3 : 1}
              />
              <Line 
                type="monotone" 
                dataKey="Energy" 
                stroke="#10B981" 
                strokeWidth={highlightedLine === 'Energy' || !highlightedLine ? 2 : 1} 
                dot={{ r: 2, fill: "#10B981" }} 
                activeDot={{ r: 4, fill: "#10B981", stroke: "#fff", strokeWidth: 1 }}
                name="Energy"
                opacity={highlightedLine && highlightedLine !== 'Energy' ? 0.3 : 1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Mobile data summary */}
        <div className="mt-4 grid grid-cols-3 gap-2 sm:hidden">
          {[
            { name: 'Carbon', value: monthlyData[monthlyData.length - 1].Carbon, color: '#6B7280', unit: 'tons CO2' },
            { name: 'Water', value: monthlyData[monthlyData.length - 1].Water, color: '#3B82F6', unit: 'k liters' },
            { name: 'Energy', value: monthlyData[monthlyData.length - 1].Energy, color: '#10B981', unit: 'MWh' }
          ].map((metric, index) => (
            <div key={index} className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: metric.color }}></div>
              <p className="text-xs font-medium text-gray-900 dark:text-gray-100">{metric.name}</p>
              <p className="text-sm font-bold" style={{ color: metric.color }}>{metric.value.toLocaleString()}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{metric.unit}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
