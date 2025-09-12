
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const radarData = [
  { subject: "Carbon", score: 75, fullMark: 100, value: "4550 tons CO2", color: "#6B7280" },
  { subject: "Water", score: 85, fullMark: 100, value: "960k liters", color: "#3B82F6" },
  { subject: "Energy", score: 90, fullMark: 100, value: "455 MWh", color: "#10B981" },
];

export function FocusRadarChart() {
  const center = 150;
  const maxRadius = 120;
  const levels = 5;

  // Calculate points for each data item
  const getPoint = (angle: number, value: number) => {
    const radius = (value / 100) * maxRadius;
    const x = center + radius * Math.cos(angle - Math.PI / 2);
    const y = center + radius * Math.sin(angle - Math.PI / 2);
    return { x, y };
  };

  // Generate grid circles
  const gridCircles = Array.from({ length: levels }, (_, i) => {
    const radius = ((i + 1) / levels) * maxRadius;
    return (
      <circle
        key={i}
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="1"
        className="dark:stroke-gray-700"
      />
    );
  });

  // Generate grid lines
  const gridLines = radarData.map((_, index) => {
    const angle = (index / radarData.length) * 2 * Math.PI;
    const endPoint = getPoint(angle, 100);
    return (
      <line
        key={index}
        x1={center}
        y1={center}
        x2={endPoint.x}
        y2={endPoint.y}
        stroke="#D1D5DB"
        strokeWidth="1"
        className="dark:stroke-gray-700"
      />
    );
  });

  // Generate data points and lines
  const dataPoints = radarData.map((item, index) => {
    const angle = (index / radarData.length) * 2 * Math.PI;
    const point = getPoint(angle, item.score);
    
    // Label position (outside the chart)
    const labelPoint = getPoint(angle, 110);
    
    return (
      <g key={item.subject}>
        <circle
          cx={point.x}
          cy={point.y}
          r="4"
          fill={item.color}
          stroke="white"
          strokeWidth="2"
          className="dark:stroke-gray-800"
        />
        <text
          x={labelPoint.x}
          y={labelPoint.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs sm:text-sm font-medium fill-gray-700 dark:fill-gray-300"
        >
          {item.subject}
        </text>
        <text
          x={labelPoint.x}
          y={labelPoint.y + 16}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs fill-gray-500 dark:fill-gray-400"
        >
          {item.value}
        </text>
      </g>
    );
  });

  // Generate the connecting polygon
  const polygonPoints = radarData
    .map((item, index) => {
      const angle = (index / radarData.length) * 2 * Math.PI;
      const point = getPoint(angle, item.score);
      return `${point.x},${point.y}`;
    })
    .join(' ');

  return (
    <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg h-full hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <CardHeader className="pb-2 px-3 sm:px-6">
        <CardTitle className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">ESG Focus Radar</CardTitle>
        <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">2D visualization of ESG performance</CardDescription>
      </CardHeader>
      <CardContent className="h-64 sm:h-80 px-2 sm:px-6">
        <div className="w-full h-full flex items-center justify-center">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 300 300" 
            className="max-w-full max-h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Grid circles */}
            {gridCircles}
            
            {/* Grid lines */}
            {gridLines}
            
            {/* Data polygon */}
            <polygon
              points={polygonPoints}
              fill="#3B82F6"
              fillOpacity="0.2"
              stroke="#3B82F6"
              strokeWidth="2"
              className="dark:fill-blue-500/20 dark:stroke-blue-500"
            />
            
            {/* Data points and labels */}
            {dataPoints}
          </svg>
        </div>
        
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6">
          {radarData.map((item, index) => (
            <div key={index} className="flex items-center justify-between sm:justify-start space-x-2 p-2 sm:p-0 rounded-lg sm:rounded-none bg-gray-50 dark:bg-gray-700 sm:dark:bg-transparent">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{item.subject}</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 sm:ml-1">{item.score}/100</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
