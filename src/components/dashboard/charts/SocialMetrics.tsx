
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Shield, Users, Heart, Scale } from "lucide-react";

const safetyData = [
  { type: "Fatal", count: 0, color: "#EF4444" },
  { type: "Serious", count: 3, color: "#F59E0B" },
  { type: "Minor", count: 12, color: "#10B981" },
];

const diversityData = [
  { category: "Leadership", women: 40, men: 60, minority: 30 },
  { category: "Management", women: 45, men: 55, minority: 25 },
  { category: "General", women: 52, men: 48, minority: 35 },
];

const wellnessData = [
  { quarter: "Q1", enrolled: 150 },
  { quarter: "Q2", enrolled: 180 },
  { quarter: "Q3", enrolled: 220 },
  { quarter: "Q4", enrolled: 250 },
];

const laborComplianceRate = 90;

export function SocialMetrics({data}) {
  return (
    <div className="space-y-6">
      {/* Workplace Safety */}
      <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">Workplace Safety</CardTitle>
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-300">Incident tracking by severity</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={safetyData}>
              <XAxis 
                dataKey="type" 
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
              <Tooltip
                contentStyle={{ 
                  backgroundColor: document.documentElement.classList.contains('dark') ? '#1F2937' : 'white',
                  borderColor: document.documentElement.classList.contains('dark') ? '#4B5563' : '#E5E7EB',
                  color: document.documentElement.classList.contains('dark') ? '#F3F4F6' : '#111827'
                }}
              />
              <Bar dataKey="count">
                {safetyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Employee Diversity and Wellness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">Employee Diversity</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-300">Gender and ethnicity representation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={diversityData}>
                <XAxis 
                  dataKey="category" 
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
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: document.documentElement.classList.contains('dark') ? '#1F2937' : 'white',
                    borderColor: document.documentElement.classList.contains('dark') ? '#4B5563' : '#E5E7EB',
                    color: document.documentElement.classList.contains('dark') ? '#F3F4F6' : '#111827'
                  }}
                />
                <Bar dataKey="women" stackId="a" fill="#EC4899" name="Women" />
                <Bar dataKey="men" stackId="a" fill="#3B82F6" name="Men" />
                <Bar dataKey="minority" fill="#10B981" name="Minority" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">Employee Well-being</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-300">Wellness program enrollment</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={wellnessData}>
                <XAxis 
                  dataKey="quarter" 
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
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: document.documentElement.classList.contains('dark') ? '#1F2937' : 'white',
                    borderColor: document.documentElement.classList.contains('dark') ? '#4B5563' : '#E5E7EB',
                    color: document.documentElement.classList.contains('dark') ? '#F3F4F6' : '#111827'
                  }}
                />
                <Line type="monotone" dataKey="enrolled" stroke="#EF4444" strokeWidth={3} dot={{ r: 4, fill: "#EF4444" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Labor Rights Compliance */}
      <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">Labor Rights Compliance</CardTitle>
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-300">Policy compliance rate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Compliance Rate</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">{laborComplianceRate}%</span>
            </div>
            <Progress value={laborComplianceRate} className="w-full h-3" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {laborComplianceRate}% of policies are in full compliance with labor rights standards
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
