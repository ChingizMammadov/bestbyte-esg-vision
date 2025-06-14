
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Progress } from "recharts";
import { Users, ShieldCheck, Vote, DollarSign } from "lucide-react";

const boardDiversityData = [
  { name: "Female Members", value: 30, color: "#EC4899" },
  { name: "Minority Members", value: 20, color: "#10B981" },
  { name: "Other", value: 50, color: "#6B7280" },
];

const shareholderRightsData = [
  { year: "2020", votingRights: 75 },
  { year: "2021", votingRights: 78 },
  { year: "2022", votingRights: 80 },
  { year: "2023", votingRights: 82 },
];

const executiveCompData = [
  { role: "CEO", ratio: 200 },
  { role: "CFO", ratio: 150 },
  { role: "CTO", ratio: 140 },
  { role: "COO", ratio: 130 },
];

const antiCorruptionTraining = 100;

export function GovernanceMetrics() {
  return (
    <div className="space-y-6">
      {/* Board Diversity and Anti-Corruption */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg font-bold text-gray-900">Board Diversity</CardTitle>
            </div>
            <CardDescription className="text-gray-600">Gender and ethnicity representation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={boardDiversityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {boardDiversityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <CardTitle className="text-lg font-bold text-gray-900">Anti-Corruption Training</CardTitle>
            </div>
            <CardDescription className="text-gray-600">Employee training completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Training Completion</span>
                <span className="text-2xl font-bold text-green-600">{antiCorruptionTraining}%</span>
              </div>
              <Progress value={antiCorruptionTraining} className="w-full h-3" />
              <p className="text-sm text-gray-600">
                All employees have completed anti-corruption training
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shareholder Rights */}
      <Card className="bg-white border rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Vote className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-lg font-bold text-gray-900">Shareholder Rights</CardTitle>
          </div>
          <CardDescription className="text-gray-600">Voting rights percentage over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={shareholderRightsData}>
              <XAxis dataKey="year" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="votingRights" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4, fill: "#8B5CF6" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Executive Compensation */}
      <Card className="bg-white border rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-yellow-600" />
            <CardTitle className="text-lg font-bold text-gray-900">Executive Compensation</CardTitle>
          </div>
          <CardDescription className="text-gray-600">Pay ratio compared to median employee salary</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={executiveCompData}>
              <XAxis dataKey="role" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value) => [`${value}x`, "Pay Ratio"]} />
              <Bar dataKey="ratio" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
