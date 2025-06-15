
import { PieChart, Pie, Cell, Tooltip as ChartTooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const esgData = [
  { name: "Carbon", value: 60, color: "#6B7280", unit: "tons CO2", description: "Total carbon emissions tracked" }, 
  { name: "Water", value: 25, color: "#3B82F6", unit: "thousand liters", description: "Water consumption monitoring" },  
  { name: "Energy", value: 15, color: "#10B981", unit: "MWh", description: "Energy usage tracking" }, 
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border rounded-lg shadow-lg border-gray-200" role="tooltip">
        <p className="font-semibold text-gray-900 mb-1">{data.name}</p>
        <p className="text-sm text-gray-600 mb-1">{data.value}% ({data.value} {data.unit})</p>
        <p className="text-xs text-gray-500">{data.description}</p>
      </div>
    );
  }
  return null;
};

export function MetricsPieChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Card className="bg-white border rounded-2xl shadow-lg h-full hover:shadow-xl transition-shadow duration-300" role="region" aria-labelledby="pie-chart-title">
      <CardHeader className="pb-2">
        <CardTitle id="pie-chart-title" className="text-lg font-bold text-gray-900">Carbon / Water / Energy</CardTitle>
        <CardDescription className="text-gray-600">Interactive breakdown of core ESG metrics</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
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
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <ChartTooltip content={<CustomTooltip />} />
            <Pie
              dataKey="value"
              data={esgData}
              cx="50%"
              cy="45%"
              outerRadius={80}
              innerRadius={35}
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
                  className="hover:opacity-80 transition-opacity cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              height={50}
              wrapperStyle={{ paddingTop: '10px' }}
              formatter={(value, entry: any) => (
                <span style={{ color: entry.color }} className="text-sm font-medium px-2">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
