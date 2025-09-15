
import { PieChart, Pie, Cell, Tooltip as ChartTooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useLocalStorageWithRefresh } from "@/hooks/useLocalStorageWithRefresh";

interface ESGData {
  name: string;
  value: number;
  color: string;
  darkColor: string;
  unit: string;
  description: string;
}

// Default data that will be shown if localStorage doesn't have any
const defaultEsgData: ESGData[] = [
  { name: "Carbon", value: 60, color: "#6B7280", darkColor: "#9CA3AF", unit: "tons CO2", description: "Total carbon emissions tracked" }, 
  { name: "Water", value: 25, color: "#3B82F6", darkColor: "#60A5FA", unit: "thousand liters", description: "Water consumption monitoring" },  
  { name: "Energy", value: 15, color: "#10B981", darkColor: "#34D399", unit: "MWh", description: "Energy usage tracking" }, 
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ESGData;
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 p-2 sm:p-4 border rounded-lg shadow-lg border-gray-200 dark:border-gray-700 max-w-xs" role="tooltip">
        <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 mb-1">{data.name}</p>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1">{data.value}% ({data.value} {data.unit})</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{data.description}</p>
      </div>
    );
  }
  return null;
};

export function MetricsPieChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const esgData = useLocalStorageWithRefresh<ESGData[]>('esgData', defaultEsgData);

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg h-full hover:shadow-xl transition-shadow duration-300 overflow-hidden" role="region" aria-labelledby="pie-chart-title">
      <CardHeader className="pb-2 px-3 sm:px-6">
        <CardTitle id="pie-chart-title" className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">Carbon / Water / Energy</CardTitle>
        <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Interactive breakdown of core ESG metrics</CardDescription>
      </CardHeader>
      <CardContent className="pb-4 sm:pb-6 px-2 sm:px-6">
        <div className="sr-only">
          <h3>ESG Metrics Data</h3>
          <ul>
            {esgData.map((item) => (
              <li key={item.name}>
                {item.name}: {item.value}% ({item.value} {item.unit}) - {item.description}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full overflow-hidden">
          <ResponsiveContainer width="100%" height={220} minWidth={250}>
            <PieChart margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <ChartTooltip content={<CustomTooltip />} />
              <Pie
                dataKey="value"
                data={esgData}
                cx="50%"
                cy="45%"
                outerRadius="35%"
                innerRadius="15%"
                paddingAngle={3}
                label={false}
                labelLine={false}
                isAnimationActive={true}
                animationDuration={800}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {esgData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke={entry.color}
                    className="hover:opacity-80 transition-opacity cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                    style={{
                      filter: activeIndex === index ? 'brightness(1.1)' : 'brightness(1)',
                      transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${entry.name}: ${entry.value}% - ${entry.description}`}
                  />
                ))}
              </Pie>
              <Legend 
                verticalAlign="bottom" 
                height={40}
                wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }}
                formatter={(value: string, entry: { color?: string }) => (
                  <span 
                    style={{ color: entry.color }} 
                    className="text-xs sm:text-sm font-medium px-1 dark:text-gray-100"
                  >
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Mobile-friendly data cards */}
        <div className="mt-4 grid grid-cols-1 gap-2 sm:hidden">
          {esgData.map((entry, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 block">{entry.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{entry.description}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold" style={{ color: entry.color }}>{entry.value}%</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 block">{entry.value} {entry.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
