
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, ShieldCheck, Vote, DollarSign, UserCheck } from "lucide-react";

// Comprehensive board diversity data
const genderDiversityData = [
  { name: "Female", value: 35, color: "#EC4899", description: "Women board members" },
  { name: "Male", value: 65, color: "#3B82F6", description: "Men board members" },
];

const ethnicDiversityData = [
  { name: "White", value: 45, color: "#8B5CF6", description: "White/Caucasian members" },
  { name: "Hispanic/Latino", value: 20, color: "#F59E0B", description: "Hispanic/Latino members" },
  { name: "Black/African American", value: 15, color: "#10B981", description: "Black/African American members" },
  { name: "Asian", value: 12, color: "#EF4444", description: "Asian members" },
  { name: "Other", value: 8, color: "#6B7280", description: "Other ethnicities" },
];

const ageDiversityData = [
  { name: "30-45", value: 25, color: "#06B6D4", description: "Ages 30-45" },
  { name: "46-60", value: 50, color: "#8B5CF6", description: "Ages 46-60" },
  { name: "60+", value: 25, color: "#F59E0B", description: "Ages 60+" },
];

const educationDiversityData = [
  { name: "Business/MBA", value: 40, color: "#3B82F6", description: "Business/MBA background" },
  { name: "Law", value: 20, color: "#EC4899", description: "Legal background" },
  { name: "Engineering/Tech", value: 15, color: "#10B981", description: "Engineering/Technology" },
  { name: "Finance", value: 15, color: "#F59E0B", description: "Finance background" },
  { name: "Other", value: 10, color: "#6B7280", description: "Other educational backgrounds" },
];

const RADIAN = Math.PI / 180;
const CustomizedLabel = ({ 
  cx, 
  cy, 
  midAngle, 
  innerRadius, 
  outerRadius, 
  percent, 
  name, 
  color 
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string;
  color: string;
}) => {
    const radiusInside = innerRadius + (outerRadius - innerRadius) * 0.5;
    const xInside = cx + radiusInside * Math.cos(-midAngle * RADIAN);
    const yInside = cy + radiusInside * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    // Responsive label positioning based on screen size
    const isSmallScreen = window.innerWidth < 768;
    const radiusOutside = outerRadius + (isSmallScreen ? 20 : 30);
    const xOutside = cx + radiusOutside * Math.cos(-midAngle * RADIAN);
    const yOutside = cy + radiusOutside * Math.sin(-midAngle * RADIAN);
    const textAnchor = xOutside > cx ? 'start' : 'end';

    const xLineStart = cx + (outerRadius + 2) * Math.cos(-midAngle * RADIAN);
    const yLineStart = cy + (outerRadius + 2) * Math.sin(-midAngle * RADIAN);

    return (
        <g>
            <text 
                x={xInside} 
                y={yInside} 
                fill="white" 
                textAnchor="middle" 
                dominantBaseline="central" 
                className={`font-bold ${isSmallScreen ? 'text-xs' : 'text-sm'}`}
                style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
            
            {!isSmallScreen && (
              <>
                <path d={`M${xLineStart},${yLineStart}L${xOutside},${yOutside}`} stroke={color} strokeWidth={1} fill="none" />
                <circle cx={xLineStart} cy={yLineStart} r={2} fill={color} stroke="none" />

                <text 
                    x={xOutside + (textAnchor === 'start' ? 1 : -1) * 8} 
                    y={yOutside} 
                    textAnchor={textAnchor} 
                    fill="hsl(var(--foreground))" 
                    dominantBaseline="central" 
                    className="text-xs md:text-sm font-medium"
                >
                    {name}
                </text>
              </>
            )}
        </g>
    );
};

const DiversityPieChart = ({ 
  data, 
  title, 
  description, 
  icon 
}: { 
  data: any[]; 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
}) => {
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
    <Card className="bg-white border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
      <CardHeader className="pb-2 px-3 sm:px-6">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-base sm:text-lg font-bold text-gray-900 leading-tight">{title}</CardTitle>
        </div>
        <CardDescription className="text-xs sm:text-sm text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6 pb-4">
        <div className="w-full overflow-hidden">
          <ResponsiveContainer width="100%" height={250} minWidth={250}>
            <PieChart margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
              <Pie
                dataKey="value"
                data={data}
                cx="50%"
                cy="45%"
                outerRadius="35%"
                innerRadius="18%"
                paddingAngle={2}
                labelLine={false}
                label={CustomizedLabel}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                onClick={onPieClick}
                animationDuration={800}
                animationBegin={0}
              >
                {data.map((entry, index) => {
                    const isActive = activeIndex === index || clickedIndex === index;
                    return (
                      <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                          stroke="#fff"
                          strokeWidth={2}
                          style={{
                              cursor: 'pointer',
                              filter: isActive ? 'brightness(1.1) drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'brightness(1)',
                              transform: isActive ? 'scale(1.02)' : 'scale(1)',
                              transformOrigin: 'center center',
                              transition: 'all 0.2s ease-in-out',
                          }}
                      />
                    )
                })}
              </Pie>
              <Tooltip 
                cursor={{fill: 'transparent'}}
                content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                            <div className="bg-white p-2 sm:p-3 border rounded-lg shadow-lg border-gray-200 max-w-xs">
                                <p className="font-bold text-sm sm:text-base text-gray-900">{data.name}</p>
                                <p className="text-xs sm:text-sm text-gray-600">{data.value}%</p>
                                <p className="text-xs text-gray-500 mt-1">{data.description}</p>
                            </div>
                        );
                    }
                    return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Mobile-friendly legend */}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:hidden">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-medium text-gray-700 block truncate">{entry.name}</span>
                <span className="text-xs text-gray-500">{entry.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
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
const disabilityRepresentation = 8; // 8% disability representation

export function GovernanceMetrics() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Comprehensive Board Diversity Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <DiversityPieChart
          data={genderDiversityData}
          title="Gender Diversity"
          description="Board composition by gender"
          icon={<Users className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 flex-shrink-0" />}
        />
        
        <DiversityPieChart
          data={ethnicDiversityData}
          title="Ethnic & Racial Diversity"
          description="Board composition by ethnicity"
          icon={<UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <DiversityPieChart
          data={ageDiversityData}
          title="Age Diversity"
          description="Board composition by age groups"
          icon={<Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />}
        />
        
        <DiversityPieChart
          data={educationDiversityData}
          title="Educational Background"
          description="Board composition by education"
          icon={<Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />}
        />
      </div>

      {/* Disability Representation and Anti-Corruption */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <Card className="bg-white border rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-2 px-3 sm:px-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" />
              <CardTitle className="text-base sm:text-lg font-bold text-gray-900">Disability & Accessibility</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm text-gray-600">Board members with disabilities</CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium text-gray-700">Representation</span>
                <span className="text-xl sm:text-2xl font-bold text-indigo-600">{disabilityRepresentation}%</span>
              </div>
              <Progress value={disabilityRepresentation} className="w-full h-2 sm:h-3" />
              <p className="text-xs sm:text-sm text-gray-600">
                {disabilityRepresentation}% of board members have disclosed disabilities
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-2 px-3 sm:px-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
              <CardTitle className="text-base sm:text-lg font-bold text-gray-900">Anti-Corruption Training</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm text-gray-600">Employee training completion</CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium text-gray-700">Training Completion</span>
                <span className="text-xl sm:text-2xl font-bold text-green-600">{antiCorruptionTraining}%</span>
              </div>
              <Progress value={antiCorruptionTraining} className="w-full h-2 sm:h-3" />
              <p className="text-xs sm:text-sm text-gray-600">
                All employees have completed anti-corruption training
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shareholder Rights */}
      <Card className="bg-white border rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-2 px-3 sm:px-6">
          <div className="flex items-center gap-2">
            <Vote className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold text-gray-900">Shareholder Rights</CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm text-gray-600">Voting rights percentage over time</CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <div className="w-full overflow-hidden">
            <ResponsiveContainer width="100%" height={200} minWidth={300}>
              <LineChart data={shareholderRightsData} margin={{ top: 5, right: 15, left: 15, bottom: 5 }}>
                <XAxis 
                  dataKey="year" 
                  stroke="#6B7280" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#6B7280" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ 
                    fontSize: '12px',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="votingRights" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#8B5CF6" }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Executive Compensation */}
      <Card className="bg-white border rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-2 px-3 sm:px-6">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold text-gray-900">Executive Compensation</CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm text-gray-600">Pay ratio compared to median employee salary</CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <div className="w-full overflow-hidden">
            <ResponsiveContainer width="100%" height={200} minWidth={300}>
              <BarChart data={executiveCompData} margin={{ top: 5, right: 15, left: 15, bottom: 5 }}>
                <XAxis 
                  dataKey="role" 
                  stroke="#6B7280" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#6B7280" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  formatter={(value) => [`${value}x`, "Pay Ratio"]} 
                  contentStyle={{ 
                    fontSize: '12px',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}
                />
                <Bar dataKey="ratio" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
