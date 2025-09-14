
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

    // Get the contrast ratio to determine if we need white or black text
    const getContrastYIQ = (hexcolor: string) => {
      // Convert hex to RGB
      const r = parseInt(hexcolor.substring(1, 3), 16);
      const g = parseInt(hexcolor.substring(3, 5), 16);
      const b = parseInt(hexcolor.substring(5, 7), 16);
      // Calculate YIQ
      const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
      // Return white or black based on YIQ
      return yiq >= 128 ? 'black' : 'white';
    };

    // If color is a named color, convert it to hex
    const colorMap: { [key: string]: string } = {
      "#EC4899": "#EC4899", // Pink
      "#3B82F6": "#3B82F6", // Blue
      "#8B5CF6": "#8B5CF6", // Purple
      "#F59E0B": "#F59E0B", // Amber
      "#10B981": "#10B981", // Emerald
      "#EF4444": "#EF4444", // Red
      "#6B7280": "#6B7280", // Gray
      "#06B6D4": "#06B6D4", // Cyan
    };

    const textColor = colorMap[color] ? getContrastYIQ(colorMap[color]) : 'white';
    
    return (
        <g>
            <text 
                x={xInside} 
                y={yInside} 
                fill={textColor} 
                textAnchor="middle" 
                dominantBaseline="central" 
                className={`font-bold ${isSmallScreen ? 'text-xs' : 'text-sm'}`}
                style={{ textShadow: textColor === 'white' ? '1px 1px 3px rgba(0,0,0,0.8)' : 'none' }}
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
            
            {!isSmallScreen && (
              <>
                <path d={`M${xLineStart},${yLineStart}L${xOutside},${yOutside}`} stroke={color} strokeWidth={1.5} fill="none" />
                <circle cx={xLineStart} cy={yLineStart} r={2} fill={color} stroke="none" />

                <text 
                    x={xOutside + (textAnchor === 'start' ? 1 : -1) * 8} 
                    y={yOutside} 
                    textAnchor={textAnchor} 
                    fill="currentColor" 
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

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
  description: string;
}

const DiversityPieChart = ({ 
  data, 
  title, 
  description, 
  icon 
}: { 
  data: ChartDataItem[]; 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const onPieClick = (_: unknown, index: number) => {
    setClickedIndex(clickedIndex === index ? null : index);
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full overflow-hidden">
      <CardHeader className="pb-2 px-3 sm:px-6">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">{title}</CardTitle>
        </div>
        <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{description}</CardDescription>
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
                          stroke="hsl(var(--background))"
                          strokeWidth={2}
                          style={{
                              cursor: 'pointer',
                              filter: isActive ? 'brightness(1.2) drop-shadow(0 4px 8px rgba(0,0,0,0.4))' : 'brightness(1)',
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
                            <div className="bg-popover p-2 sm:p-3 border rounded-lg shadow-lg border-border max-w-xs dark:bg-slate-800 dark:border-slate-700">
                                <p className="font-bold text-sm sm:text-base text-popover-foreground">{data.name}</p>
                                <p className="text-xs sm:text-sm text-muted-foreground">{data.value}%</p>
                                <p className="text-xs text-muted-foreground/80 mt-1">{data.description}</p>
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
            <div key={index} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 dark:hover:bg-slate-800/60">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-medium block truncate">{entry.name}</span>
                <span className="text-xs text-muted-foreground">{entry.value}%</span>
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

export function GovernanceMetrics({data}) {
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
        <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-2 px-3 sm:px-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <CardTitle className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">Disability & Accessibility</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Board members with disabilities</CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium">Representation</span>
                <span className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">{disabilityRepresentation}%</span>
              </div>
              <Progress value={disabilityRepresentation} className="w-full h-2 sm:h-3 [&>div]:bg-indigo-600 dark:[&>div]:bg-indigo-500 bg-indigo-100 dark:bg-indigo-900/30" />
              <p className="text-xs sm:text-sm text-muted-foreground">
                {disabilityRepresentation}% of board members have disclosed disabilities
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-2 px-3 sm:px-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-500 flex-shrink-0" />
              <CardTitle className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">Anti-Corruption Training</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Employee training completion</CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium">Training Completion</span>
                <span className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-500">{antiCorruptionTraining}%</span>
              </div>
              <Progress value={antiCorruptionTraining} className="w-full h-2 sm:h-3 [&>div]:bg-green-600 dark:[&>div]:bg-green-500 bg-green-100 dark:bg-green-900/30" />
              <p className="text-xs sm:text-sm text-muted-foreground">
                All employees have completed anti-corruption training
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shareholder Rights */}
      <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-2 px-3 sm:px-6">
          <div className="flex items-center gap-2">
            <Vote className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">Shareholder Rights</CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Voting rights percentage over time</CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <div className="w-full overflow-hidden">
            <ResponsiveContainer width="100%" height={200} minWidth={300}>
              <LineChart data={shareholderRightsData} margin={{ top: 5, right: 15, left: 15, bottom: 5 }}>
                <XAxis 
                  dataKey="year" 
                  stroke={document.documentElement.classList.contains('dark') ? "#9CA3AF" : "#6B7280"}
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke={document.documentElement.classList.contains('dark') ? "#9CA3AF" : "#6B7280"}
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ 
                    fontSize: '12px',
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor: document.documentElement.classList.contains('dark') ? '#1F2937' : 'white',
                    color: document.documentElement.classList.contains('dark') ? '#F9FAFB' : '#111827',
                    borderColor: document.documentElement.classList.contains('dark') ? '#4B5563' : '#E5E7EB'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="votingRights" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  activeDot={{ r: 6, strokeWidth: 1, stroke: 'hsl(var(--background))' }}
                  dot={{ r: 3, fill: "#8B5CF6", strokeWidth: 1, stroke: 'hsl(var(--background))' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Executive Compensation */}
      <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-2 px-3 sm:px-6">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">Executive Compensation</CardTitle>
          </div>
          <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Pay ratio compared to median employee salary</CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <div className="w-full overflow-hidden">
            <ResponsiveContainer width="100%" height={200} minWidth={300}>
              <BarChart data={executiveCompData} margin={{ top: 5, right: 15, left: 15, bottom: 5 }}>
                <XAxis 
                  dataKey="role" 
                  stroke={document.documentElement.classList.contains('dark') ? "#9CA3AF" : "#6B7280"}
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke={document.documentElement.classList.contains('dark') ? "#9CA3AF" : "#6B7280"}
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
                    backgroundColor: document.documentElement.classList.contains('dark') ? '#1F2937' : 'white',
                    color: document.documentElement.classList.contains('dark') ? '#F9FAFB' : '#111827',
                    borderColor: document.documentElement.classList.contains('dark') ? '#4B5563' : '#E5E7EB'
                  }}
                />
                <Bar 
                  dataKey="ratio" 
                  fill="#F59E0B" 
                  radius={[4, 4, 0, 0]} 
                  className="dark:opacity-85"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
