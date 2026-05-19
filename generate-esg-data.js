const XLSX = require('xlsx');

const wb = XLSX.utils.book_new();

// ─── 1. COMPANY OVERVIEW ───────────────────────────────────────────────
const overview = [
  ['Bank of America – ESG Dashboard Data', '', '', ''],
  ['', '', '', ''],
  ['Company', 'Bank of America Corporation'],
  ['Ticker', 'BAC (NYSE)'],
  ['Industry', 'Banking & Financial Services'],
  ['Headquarters', 'Charlotte, North Carolina, USA'],
  ['Employees', 213000],
  ['Revenue (2023)', '$98.6 Billion'],
  ['Report Year', 2024],
  ['Net Zero Target', 2050],
  ['Carbon Neutral Since', 2019],
  ['', '', '', ''],
  ['ESG SCORES (MSCI / Third-party)', '', '', ''],
  ['Environmental Score', 94],
  ['Social Score', 86],
  ['Governance Score', 49],
  ['Overall ESG Score', 76],
  ['ESG Rating', 'AA'],
];
const wsOverview = XLSX.utils.aoa_to_sheet(overview);
XLSX.utils.book_append_sheet(wb, wsOverview, 'Company Overview');

// ─── 2. EMISSIONS BY YEAR ──────────────────────────────────────────────
const emissions = [
  ['Year', 'Scope 1 (MT CO2e)', 'Scope 2 Market-Based (MT CO2e)', 'Scope 1+2 Total (MT CO2e)', 'Scope 3 Est. (MT CO2e)', 'Reduction vs 2010 Baseline (%)'],
  [2010, 1785417, 0,       1785417, 95000000, 0],
  [2019,  245000, 15000,    260000, 72000000, 85.4],
  [2020,  210000, 12000,    222000, 68000000, 87.6],
  [2021,  195000, 10500,    205500, 65000000, 88.5],
  [2022,  175000,  8000,    183000, 61000000, 89.7],
  [2023,   63978,  4842,     68821, 58000000, 96.1],
  [2024,   58000,  3800,     61800, 55000000, 96.5],
];
const wsEmissions = XLSX.utils.aoa_to_sheet(emissions);
XLSX.utils.book_append_sheet(wb, wsEmissions, 'GHG Emissions');

// ─── 3. ENERGY CONSUMPTION ────────────────────────────────────────────
const energy = [
  ['Year', 'Total Energy (MWh)', 'Renewable Energy (MWh)', 'Non-Renewable (MWh)', 'Renewable %', 'Energy Intensity (MWh per employee)', 'Energy Saved via Conservation (MWh)'],
  [2019, 4850000, 4850000,       0, 100, 22.5, 320000],
  [2020, 4200000, 4200000,       0, 100, 20.1, 410000],
  [2021, 4050000, 4050000,       0, 100, 19.4, 380000],
  [2022, 3820000, 3820000,       0, 100, 18.2, 420000],
  [2023, 3650000, 3650000,       0, 100, 17.1, 445000],
  [2024, 3480000, 3480000,       0, 100, 16.3, 460000],
];
const wsEnergy = XLSX.utils.aoa_to_sheet(energy);
XLSX.utils.book_append_sheet(wb, wsEnergy, 'Energy Consumption');

// ─── 4. WATER & WASTE ────────────────────────────────────────────────
const waterWaste = [
  ['Year', 'Water Withdrawal (Gallons)', 'Water Recycled (Gallons)', 'Recycled %', 'Total Waste (Tons)', 'Waste Recycled (Tons)', 'Waste to Landfill (Tons)', 'Waste Recycling Rate (%)'],
  [2019, 2850000000, 680000000, 23.9, 48500, 32000, 16500, 66.0],
  [2020, 2420000000, 620000000, 25.6, 41200, 28500, 12700, 69.2],
  [2021, 2380000000, 630000000, 26.5, 39800, 27800, 12000, 69.8],
  [2022, 2250000000, 615000000, 27.3, 37600, 26900, 10700, 71.5],
  [2023, 2180000000, 610000000, 28.0, 35200, 25700,  9500, 73.0],
  [2024, 2100000000, 608000000, 29.0, 33500, 24800,  8700, 74.0],
];
const wsWater = XLSX.utils.aoa_to_sheet(waterWaste);
XLSX.utils.book_append_sheet(wb, wsWater, 'Water & Waste');

// ─── 5. SOCIAL METRICS ───────────────────────────────────────────────
const social = [
  ['Year', 'Total Employees', 'Women (%)', 'Diverse Race/Ethnicity US (%)', 'Women in Senior Leadership (%)', 'Avg Training Hours/Employee', 'Community Investment ($M)', 'Volunteer Hours', 'Employee Satisfaction Score'],
  [2019, 208000, 50, 42, 31, 54, 250, 2100000, 82],
  [2020, 210000, 51, 43, 33, 48, 290, 1800000, 80],
  [2021, 208000, 51, 43, 34, 52, 300, 1950000, 81],
  [2022, 216000, 52, 44, 35, 55, 340, 2050000, 83],
  [2023, 213000, 52, 44, 36, 57, 360, 2200000, 84],
  [2024, 213000, 52, 45, 37, 59, 380, 2300000, 85],
];
const wsSocial = XLSX.utils.aoa_to_sheet(social);
XLSX.utils.book_append_sheet(wb, wsSocial, 'Social Metrics');

// ─── 6. GOVERNANCE ───────────────────────────────────────────────────
const governance = [
  ['Metric', '2022', '2023', '2024'],
  ['Board Size (Members)', 14, 14, 13],
  ['Independent Directors (%)', 92, 92, 92],
  ['Women on Board (%)', 42, 46, 46],
  ['Diverse Directors (%)', 46, 46, 46],
  ['Board Meetings per Year', 9, 9, 9],
  ['CEO Pay Ratio (CEO vs Median Employee)', 278, 291, 295],
  ['Ethics Training Completion (%)', 99, 99, 100],
  ['Data Privacy Incidents', 1, 0, 0],
  ['Anti-Corruption Policies in Place', 'Yes', 'Yes', 'Yes'],
  ['ESG Committee on Board', 'Yes', 'Yes', 'Yes'],
  ['Executive ESG Compensation Link', 'Yes', 'Yes', 'Yes'],
];
const wsGov = XLSX.utils.aoa_to_sheet(governance);
XLSX.utils.book_append_sheet(wb, wsGov, 'Governance');

// ─── 7. SUSTAINABLE FINANCE ──────────────────────────────────────────
const finance = [
  ['Year', 'Sustainable Finance Deployed ($B)', 'Environmental Transition ($B)', 'Social Development ($B)', 'Green Bonds Issued ($B)', 'Cumulative Total ($B)', 'Target 2030 ($B)'],
  [2019,  55, 38, 17,  4,   55, 1500],
  [2020,  82, 58, 24,  8,  137, 1500],
  [2021, 125, 89, 36, 12,  262, 1500],
  [2022, 155, 110, 45, 18,  417, 1500],
  [2023, 198, 140, 58, 24,  615, 1500],
  [2024, 245, 175, 70, 31,  860, 1500],
];
const wsFinance = XLSX.utils.aoa_to_sheet(finance);
XLSX.utils.book_append_sheet(wb, wsFinance, 'Sustainable Finance');

// ─── 8. MONTHLY TRENDS 2024 (for charts) ─────────────────────────────
const monthly = [
  ['Month', 'Environmental Score', 'Social Score', 'Governance Score', 'Overall ESG Score', 'Carbon Emissions (MT CO2e)', 'Energy (MWh)', 'Water (M Gallons)', 'Sustainable Finance ($M)'],
  ['Jan 2024', 91, 84, 47, 74, 5500, 305000, 180, 18000],
  ['Feb 2024', 91, 84, 47, 74, 5200, 288000, 172, 19500],
  ['Mar 2024', 92, 85, 48, 75, 5100, 292000, 175, 21000],
  ['Apr 2024', 92, 85, 48, 75, 4900, 280000, 168, 20500],
  ['May 2024', 93, 85, 48, 75, 4800, 275000, 165, 22000],
  ['Jun 2024', 93, 86, 49, 76, 4700, 270000, 162, 23500],
  ['Jul 2024', 93, 86, 49, 76, 4900, 285000, 170, 22000],
  ['Aug 2024', 94, 86, 49, 76, 4800, 282000, 168, 21500],
  ['Sep 2024', 94, 86, 49, 76, 4600, 271000, 160, 24000],
  ['Oct 2024', 94, 86, 49, 76, 4700, 278000, 163, 23000],
  ['Nov 2024', 94, 87, 50, 77, 4500, 265000, 155, 25000],
  ['Dec 2024', 94, 87, 50, 77, 4300, 260000, 152, 28000],
];
const wsMonthly = XLSX.utils.aoa_to_sheet(monthly);
XLSX.utils.book_append_sheet(wb, wsMonthly, 'Monthly Trends 2024');

// ─── 9. ESG TARGETS ──────────────────────────────────────────────────
const targets = [
  ['Target', 'Category', 'Baseline Year', 'Baseline Value', 'Target Year', 'Target Value', 'Current Value (2024)', 'Progress (%)', 'Status'],
  ['Reduce operational GHG emissions by 75%', 'Environmental', 2010, '1,785,417 MT CO2e', 2030, '446,354 MT CO2e', '61,800 MT CO2e', 96.5, 'Ahead of Schedule'],
  ['100% Renewable Electricity', 'Environmental', 2019, '100%', 2019, '100%', '100%', 100, 'Achieved'],
  ['Carbon Neutral Operations', 'Environmental', 2019, 'Carbon Neutral', 2019, 'Carbon Neutral', 'Carbon Neutral', 100, 'Achieved'],
  ['Net Zero (Operations + Financed)', 'Environmental', 2023, 'In Progress', 2050, 'Net Zero', 'In Progress', 15, 'On Track'],
  ['$1.5T Sustainable Finance by 2030', 'Social/Environmental', 2019, '$0', 2030, '$1,500B', '$860B', 57.3, 'On Track'],
  ['Women: 50%+ of global workforce', 'Social', 2019, '50%', 2025, '50%+', '52%', 100, 'Achieved'],
  ['40%+ diverse US workforce', 'Social', 2019, '42%', 2025, '44%+', '45%', 100, 'Achieved'],
  ['Women 40%+ senior leadership', 'Social', 2020, '33%', 2030, '40%+', '37%', 80, 'On Track'],
  ['Zero waste to landfill', 'Environmental', 2019, '16,500 tons', 2030, '0 tons', '8,700 tons', 47.3, 'On Track'],
];
const wsTargets = XLSX.utils.aoa_to_sheet(targets);
XLSX.utils.book_append_sheet(wb, wsTargets, 'ESG Targets');

// ─── WRITE FILE ───────────────────────────────────────────────────────
const outputPath = 'C:\\Users\\Hp\\bestbyte-esg-vision\\BankOfAmerica_ESG_Data.xlsx';
XLSX.writeFile(wb, outputPath);
console.log('Excel file generated at:', outputPath);
