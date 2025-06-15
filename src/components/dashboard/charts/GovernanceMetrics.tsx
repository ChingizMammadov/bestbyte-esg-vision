
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, ShieldCheck, Vote, DollarSign } from "lucide-react";

const boardDiversityData = [
  { name: "Female Members", value: 30, color: "#4CAF50" },
  { name: "Minority Members", value: 20, color: "#F06292" },
  { name: "Other", value: 50, color: "#BDBDBD" },
];

const RADIAN = Math.PI / 180;
const CustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, color }: any) => {
    // Label for percentage inside the slice
    const radiusInside = innerRadius + (outerRadius - innerRadius) * 0.5;
    const xInside = cx + radiusInside * Math.cos(-midAngle * RADIAN);
    const yInside = cy + radiusInside * Math.sin(-midAngle * RADIAN);

    // Label for name outside the slice with leader line
    const radiusOutside = outerRadius + 25;
    const xOutside = cx + radiusOutside * Math.cos(-midAngle * RADIAN);
    const yOutside = cy + radiusOutside * Math.sin(-midAngle * RADIAN);
    const textAnchor = xOutside > cx ? 'start' : 'end';

    // Leader line
    const xLineStart = cx + (outerRadius + 2) * Math.cos(-midAngle * RADIAN);
    const yLineStart = cy + (outerRadius + 2) * Math.sin(-midAngle * RADIAN);

    return (
        <g>
            <text x={xInside} y={yInside} fill="white" textAnchor="middle" dominantBaseline="central" className="font-bold text-lg" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                {`${(percent * 100).toFixed(0)}%`}
            </text>
            
            <path d={`M${xLineStart},${yLineStart}L${xOutside},${yOutside}`} stroke={color} fill="none" />
            <circle cx={xLineStart} cy={yLineStart} r={2} fill={color} stroke="none" />

            <text x={xOutside + (textAnchor === 'start' ? 1 : -1) * 6} y={yOutside} textAnchor={textAnchor} fill="hsl(var(--foreground))" dominantBaseline="central" className="text-sm font-medium">
                {name}
            </text>
        </g>
    );
};


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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const onPieClick = (_: any, index: number) => {
    setClickedIndex(clickedIndex === index ? null : index);
  };

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
            <ResponsiveContainer width="100%" height={250}>
              <PieChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                <Pie
                  dataKey="value"
                  data={boardDiversityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  paddingAngle={2}
                  labelLine={false}
                  label={CustomizedLabel}
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  onClick={onPieClick}
                >
                  {boardDiversityData.map((entry, index) => {
                      const isActive = activeIndex === index || clickedIndex === index;
                      return (
                        <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
                            stroke="#fff"
                            strokeWidth={2}
                            style={{
                                cursor: 'pointer',
                                filter: isActive ? 'brightness(1.1)' : 'brightness(1)',
                                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                                transformOrigin: 'center center',
                                transition: 'transform 0.2s ease-in-out, filter 0.2s ease-in-out',
                            }}
                        />
                      )
                  })}
                </Pie>
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                          return (
                              <div className="bg-background p-2 border rounded-lg shadow-lg">
                                  <p className="font-bold text-foreground">{`${payload[0].name}`}</p>
                                  <p className="text-sm text-muted-foreground">{`Value: ${payload[0].value}%`}</p>
                              </div>
                          );
                      }
                      return null;
                  }}
                />
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
