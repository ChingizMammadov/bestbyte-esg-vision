
import { PieChart, Pie, Cell, Tooltip as ChartTooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const esgData = [
  { name: "Carbon", value: 60, color: "#6B7280", unit: "tons CO2" }, // Gray for Carbon
  { name: "Water", value: 25, color: "#3B82F6", unit: "thousand liters" },  // Blue for Water
  { name: "Energy", value: 15, color: "#10B981", unit: "MWh" }, // Green for Energy
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900">{data.name}</p>
        <p className="text-sm text-gray-600">{data.value}% ({data.value} {data.unit})</p>
      </div>
    );
  }
  return null;
};

export function MetricsPieChart() {
  return (
    <Card className="bg-white border rounded-2xl shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-gray-900">Carbon / Water / Energy</CardTitle>
        <CardDescription className="text-gray-600">Interactive breakdown of core ESG metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <ChartTooltip content={<CustomTooltip />} />
            <Pie
              dataKey="value"
              data={esgData}
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={30}
              paddingAngle={2}
              label={({ name, value }) => `${name}: ${value}%`}
              labelLine={false}
              isAnimationActive={true}
              animationDuration={800}
            >
              {esgData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  stroke={entry.color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry: any) => (
                <span style={{ color: entry.color }} className="text-sm font-medium">
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
