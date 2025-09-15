import { getRandomInt, getRandomFloat, getRandomTrend } from './randomDataUtils';

/**
 * Generate random data for all charts and store it in localStorage
 */
export function generateRandomData() {
  // Generate random data for ESG data charts (pie chart)
  const esgData = [
    { 
      name: "Carbon", 
      value: getRandomInt(30, 70), 
      color: "#6B7280", 
      darkColor: "#9CA3AF", 
      unit: "tons CO2", 
      description: "Total carbon emissions tracked" 
    }, 
    { 
      name: "Water", 
      value: getRandomInt(10, 40), 
      color: "#3B82F6", 
      darkColor: "#60A5FA", 
      unit: "thousand liters", 
      description: "Water consumption monitoring" 
    },  
    { 
      name: "Energy", 
      value: getRandomInt(5, 25), 
      color: "#10B981", 
      darkColor: "#34D399", 
      unit: "MWh", 
      description: "Energy usage tracking" 
    }
  ];
  localStorage.setItem('esgData', JSON.stringify(esgData));

  // Generate random data for trends line chart
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const trendsData = months.map(month => ({
    month,
    Carbon: getRandomInt(4000, 5500),
    Water: getRandomInt(800, 1200),
    Energy: getRandomInt(400, 600)
  }));
  localStorage.setItem('trendsData', JSON.stringify(trendsData));

  // Generate random data for data cards
  const dataCards = [
    {
      title: "Carbon Emissions",
      value: `${getRandomInt(1, 15)}% ${getRandomTrend()}`,
      trend: getRandomTrend() === 'reduction' ? 'down' : 'up',
      description: "Compared to last quarter",
      icon: "TrendingDown",
      color: "text-emerald-600 dark:text-emerald-400",
      bgGradient: "from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
      borderColor: "border-emerald-200 dark:border-emerald-900"
    },
    {
      title: "Water Usage",
      value: `${getRandomInt(1, 20)}% ${getRandomTrend()}`,
      trend: getRandomTrend() === 'reduction' ? 'down' : 'up',
      description: "Through efficiency programs",
      icon: "TrendingDown",
      color: "text-blue-600 dark:text-blue-400",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30",
      iconBg: "bg-blue-100 dark:bg-blue-900/50",
      borderColor: "border-blue-200 dark:border-blue-900"
    },
    {
      title: "Employee Safety",
      value: getRandomInt(0, 2) === 0 ? "Zero incidents" : `${getRandomInt(1, 5)} incidents`,
      trend: "stable",
      description: `For ${getRandomInt(30, 60)} consecutive days`,
      icon: "Minus",
      color: "text-purple-600 dark:text-purple-400",
      bgGradient: "from-purple-50 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/30",
      iconBg: "bg-purple-100 dark:bg-purple-900/50",
      borderColor: "border-purple-200 dark:border-purple-900"
    },
    {
      title: "ESG Goals",
      value: getRandomInt(0, 3) === 0 ? "On track" : getRandomInt(0, 1) === 0 ? "Exceeding" : "Needs attention",
      trend: getRandomInt(0, 1) === 0 ? "up" : "down",
      description: `${getRandomInt(70, 95)}% of annual targets met`,
      icon: "Target",
      color: "text-indigo-600 dark:text-indigo-400",
      bgGradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
      borderColor: "border-indigo-200 dark:border-indigo-900"
    }
  ];
  localStorage.setItem('dataCards', JSON.stringify(dataCards));

  // Generate random radar chart data
  const radarData = [
    {
      subject: 'Carbon',
      A: getRandomInt(50, 100),
      B: getRandomInt(30, 80),
      fullMark: 100,
    },
    {
      subject: 'Water',
      A: getRandomInt(50, 100),
      B: getRandomInt(30, 80),
      fullMark: 100,
    },
    {
      subject: 'Energy',
      A: getRandomInt(50, 100),
      B: getRandomInt(30, 80),
      fullMark: 100,
    },
    {
      subject: 'Waste',
      A: getRandomInt(50, 100),
      B: getRandomInt(30, 80),
      fullMark: 100,
    },
    {
      subject: 'Social',
      A: getRandomInt(50, 100),
      B: getRandomInt(30, 80),
      fullMark: 100,
    },
  ];
  localStorage.setItem('radarData', JSON.stringify(radarData));

  // Generate ESG score breakdown data
  const esgScores = {
    overall: getRandomInt(65, 85),
    environmental: getRandomInt(60, 95),
    social: getRandomInt(60, 90),
    governance: getRandomInt(60, 85)
  };
  localStorage.setItem('esgScores', JSON.stringify(esgScores));

  // Set a flag indicating that random data has been generated
  localStorage.setItem('randomDataGenerated', 'true');
}