
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Leaf, Droplets, Zap, Recycle } from "lucide-react";


interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color?: string;
    dataKey?: string;
    payload?: any;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {

  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border dark:border-gray-700 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{label}</p>
        {payload.map((entry, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()} 
            {entry.name.includes('renewable') ? ' tons CO2' : 
             entry.name === 'usage' ? ' liters' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function EnvironmentalMetrics({data}) {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const carbonData = data ? data.carbon_emissions : null; 
  const waterData = data ? data.water_usage : null; 
  const energyData = data ? data.energy_usage_latest : [];
  const wasteData = data ? data.waste_recycled_latest : [];

  return (
    <div className="space-y-6">
      {/* Carbon Emissions */}
      <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600 dark:text-green-400" />
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">Carbon Emissions</CardTitle>
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-300">Renewable vs Non-Renewable Sources</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={carbonData}>
              <XAxis 
                dataKey="Year" 
                stroke={document.documentElement.classList.contains('dark') ? "#9CA3AF" : "#6B7280"} 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke={document.documentElement.classList.contains('dark') ? "#9CA3AF" : "#6B7280"} 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="Carbon Emissions Renewable (%)" stackId="a" fill="#10B981" name="Renewable Energy" />
              <Bar dataKey="Carbon Emissions Non-Renewable (%)" stackId="a" fill="#EF4444" name="Non-Renewable Energy" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Water Usage and Energy Consumption */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">Water Usage</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-300">Monthly consumption trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={waterData}>
                <XAxis 
                  dataKey="Year" 
                  stroke={document.documentElement.classList.contains('dark') ? "#9CA3AF" : "#6B7280"} 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke={document.documentElement.classList.contains('dark') ? "#9CA3AF" : "#6B7280"} 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="Water Usage (m3)" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, fill: "#3B82F6" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">Energy Sources</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-300">Renewable vs Non-Renewable</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={energyData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {energyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Waste Management */}
      <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Recycle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">Waste Management</CardTitle>
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-300">Recycled vs Unrecycled waste</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                dataKey="value"
                data={wasteData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={40}
                label={false}
                labelLine={false}
              >
                {wasteData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
