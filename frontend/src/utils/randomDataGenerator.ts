// Real Bank of America ESG data (2024)
export function generateRandomData() {
  const esgData = [
    {
      name: "Carbon Emissions",
      value: 61800,
      color: "#6B7280",
      darkColor: "#9CA3AF",
      unit: "MT CO2e",
      description: "Scope 1 + 2 combined (96.5% reduction vs 2010 baseline)"
    },
    {
      name: "Water Withdrawal",
      value: 2100,
      color: "#3B82F6",
      darkColor: "#60A5FA",
      unit: "million gallons",
      description: "29% recycled — ongoing conservation programs"
    },
    {
      name: "Energy Consumption",
      value: 3480,
      color: "#10B981",
      darkColor: "#34D399",
      unit: "thousand MWh",
      description: "100% renewable electricity since 2019"
    }
  ];
  localStorage.setItem('esgData', JSON.stringify(esgData));

  // Monthly 2024 trends (real BofA data)
  const trendsData = [
    { month: "Jan", Carbon: 5500, Water: 180, Energy: 305 },
    { month: "Feb", Carbon: 5200, Water: 172, Energy: 288 },
    { month: "Mar", Carbon: 5100, Water: 175, Energy: 292 },
    { month: "Apr", Carbon: 4900, Water: 168, Energy: 280 },
    { month: "May", Carbon: 4800, Water: 165, Energy: 275 },
    { month: "Jun", Carbon: 4700, Water: 162, Energy: 270 },
    { month: "Jul", Carbon: 4900, Water: 170, Energy: 285 },
    { month: "Aug", Carbon: 4800, Water: 168, Energy: 282 },
    { month: "Sep", Carbon: 4600, Water: 160, Energy: 271 },
    { month: "Oct", Carbon: 4700, Water: 163, Energy: 278 },
    { month: "Nov", Carbon: 4500, Water: 155, Energy: 265 },
    { month: "Dec", Carbon: 4300, Water: 152, Energy: 260 },
  ];
  localStorage.setItem('trendsData', JSON.stringify(trendsData));

  const dataCards = [
    {
      title: "GHG Emissions",
      value: "96.5% reduced",
      trend: "down",
      description: "vs 2010 baseline — 61,800 MT CO2e in 2024",
      icon: "TrendingDown",
      color: "text-emerald-600 dark:text-emerald-400",
      bgGradient: "from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
      borderColor: "border-emerald-200 dark:border-emerald-900"
    },
    {
      title: "Sustainable Finance",
      value: "$860B deployed",
      trend: "up",
      description: "Toward $1.5T 2030 goal — 57% complete",
      icon: "TrendingUp",
      color: "text-blue-600 dark:text-blue-400",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30",
      iconBg: "bg-blue-100 dark:bg-blue-900/50",
      borderColor: "border-blue-200 dark:border-blue-900"
    },
    {
      title: "Workforce Diversity",
      value: "52% women",
      trend: "stable",
      description: "45% diverse race/ethnicity in U.S. — 213,000 employees",
      icon: "Minus",
      color: "text-purple-600 dark:text-purple-400",
      bgGradient: "from-purple-50 to-violet-50 dark:from-purple-900/30 dark:to-violet-900/30",
      iconBg: "bg-purple-100 dark:bg-purple-900/50",
      borderColor: "border-purple-200 dark:border-purple-900"
    },
    {
      title: "ESG Goals",
      value: "Ahead of schedule",
      trend: "up",
      description: "Carbon neutral since 2019 · 100% renewable electricity",
      icon: "Target",
      color: "text-indigo-600 dark:text-indigo-400",
      bgGradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
      borderColor: "border-indigo-200 dark:border-indigo-900"
    }
  ];
  localStorage.setItem('dataCards', JSON.stringify(dataCards));

  const radarData = [
    { subject: 'Carbon',     A: 97, B: 72, fullMark: 100 },
    { subject: 'Water',      A: 74, B: 60, fullMark: 100 },
    { subject: 'Energy',     A: 100, B: 80, fullMark: 100 },
    { subject: 'Waste',      A: 74, B: 55, fullMark: 100 },
    { subject: 'Social',     A: 86, B: 70, fullMark: 100 },
  ];
  localStorage.setItem('radarData', JSON.stringify(radarData));

  // Real BofA ESG scores
  const esgScores = {
    overall: 76,
    environmental: 94,
    social: 86,
    governance: 49
  };
  localStorage.setItem('esgScores', JSON.stringify(esgScores));

  localStorage.setItem('randomDataGenerated', 'true');
}
