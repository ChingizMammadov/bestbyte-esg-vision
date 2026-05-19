// Seeds Bank of America ESG data directly into local Supabase
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'http://127.0.0.1:54321',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'
);

async function seed() {
  console.log('🌱 Seeding Bank of America ESG data into local Supabase...\n');

  // Company
  const { data: company, error: companyErr } = await supabase
    .from('companies')
    .insert([{
      name: 'Bank of America Corporation',
      industry: 'Banking & Financial Services',
      size: 'Large (100,000+ employees)',
      headquarters_location: 'Charlotte, North Carolina, USA',
      website: 'https://www.bankofamerica.com',
      description: 'One of the world\'s leading financial institutions. Carbon neutral since 2019 with 100% renewable electricity. Committed to net-zero emissions by 2050 and $1.5T in sustainable finance by 2030.'
    }])
    .select().single();

  if (companyErr) { console.error('❌ Company:', companyErr.message); process.exit(1); }
  console.log('✅ Company: Bank of America Corporation');

  const id = company.id;

  // ESG Targets
  const targets = [
    { company_id: id, category: 'environmental', metric_name: 'Net Zero — Operations & Financed Emissions', target_value: 0, current_value: 61800, unit: 'MT CO2e', target_date: '2050-12-31', description: 'Net zero across operations, supply chain, and financing', is_active: true },
    { company_id: id, category: 'environmental', metric_name: 'GHG Reduction vs 2010 Baseline (75% target)', target_value: 446354, current_value: 61800, unit: 'MT CO2e', target_date: '2030-12-31', description: '96.5% achieved — well ahead of 75% target', is_active: true },
    { company_id: id, category: 'environmental', metric_name: 'Sustainable Finance Deployed', target_value: 1500, current_value: 860, unit: 'billion USD', target_date: '2030-12-31', description: '$1T environmental + $500B social development', is_active: true },
    { company_id: id, category: 'environmental', metric_name: 'Zero Waste to Landfill', target_value: 0, current_value: 8700, unit: 'metric tons', target_date: '2030-12-31', description: '74% recycling rate in 2024', is_active: true },
    { company_id: id, category: 'social', metric_name: 'Women in Senior Leadership', target_value: 40, current_value: 37, unit: 'percentage', target_date: '2030-12-31', description: 'Increase women in senior leadership to 40%+', is_active: true },
    { company_id: id, category: 'governance', metric_name: 'Board Independence', target_value: 92, current_value: 92, unit: 'percentage', target_date: '2025-12-31', description: 'Maintain 92%+ independent board directors', is_active: true },
  ];
  const { error: targetsErr } = await supabase.from('esg_targets').insert(targets);
  if (targetsErr) console.error('❌ Targets:', targetsErr.message);
  else console.log('✅ ESG Targets (6 records)');

  // Carbon footprint
  const carbon = [
    { company_id: id, scope: 1, category: 'Direct Emissions', source_description: 'Company vehicles, on-site fuel, backup generators', emissions_co2_tons: 58000, calculation_method: 'Direct measurement + IPCC factors', emission_factor: 2.31, activity_data: 25108, unit: 'MT CO2e', reporting_period: '2024-01-01', verified: true },
    { company_id: id, scope: 2, category: 'Indirect — Purchased Electricity', source_description: 'Market-based — 100% renewable (RECs)', emissions_co2_tons: 3800, calculation_method: 'Market-based with RECs', emission_factor: 0.0, activity_data: 3480000, unit: 'MT CO2e', reporting_period: '2024-01-01', verified: true },
  ];
  const { error: carbonErr } = await supabase.from('carbon_footprint_details').insert(carbon);
  if (carbonErr) console.error('❌ Carbon:', carbonErr.message);
  else console.log('✅ Carbon Footprint (Scope 1 + 2)');

  // Energy
  const energy = [
    { company_id: id, facility_name: 'Global Operations', energy_type: 'renewable', source: 'wind, solar, hydro (RECs)', consumption_kwh: 3480000, cost: 278400, currency: 'USD', reporting_period: '2024-01-01' },
    { company_id: id, facility_name: 'Data Centers', energy_type: 'renewable', source: 'solar PPA', consumption_kwh: 820000, cost: 65600, currency: 'USD', reporting_period: '2024-01-01' },
  ];
  const { error: energyErr } = await supabase.from('energy_consumption').insert(energy);
  if (energyErr) console.error('❌ Energy:', energyErr.message);
  else console.log('✅ Energy Consumption (100% renewable)');

  // Waste
  const waste = [
    { company_id: id, facility_name: 'Global Operations', waste_type: 'paper/office', waste_category: 'recyclable', amount_kg: 12500000, disposal_method: 'recycled', cost: 1800000, currency: 'USD', reporting_period: '2024-01-01' },
    { company_id: id, facility_name: 'Global Operations', waste_type: 'electronic', waste_category: 'recyclable', amount_kg: 8700000, disposal_method: 'certified_disposal', cost: 2400000, currency: 'USD', reporting_period: '2024-01-01' },
    { company_id: id, facility_name: 'Global Operations', waste_type: 'mixed', waste_category: 'non-recyclable', amount_kg: 12100000, disposal_method: 'landfill', cost: 950000, currency: 'USD', reporting_period: '2024-01-01' },
  ];
  const { error: wasteErr } = await supabase.from('waste_management_data').insert(waste);
  if (wasteErr) console.error('❌ Waste:', wasteErr.message);
  else console.log('✅ Waste Management (74% recycling rate)');

  // Supply chain
  const supply = [
    { company_id: id, supplier_name: 'IBM Corporation', supplier_category: 'Technology & IT', esg_score: 88, environmental_score: 91, social_score: 87, governance_score: 86, certification_status: 'ISO 14001 Certified', last_audit_date: '2024-03-15', next_audit_date: '2025-03-15' },
    { company_id: id, supplier_name: 'Accenture', supplier_category: 'Consulting', esg_score: 85, environmental_score: 83, social_score: 88, governance_score: 84, certification_status: 'Net Zero Committed', last_audit_date: '2024-06-10', next_audit_date: '2025-06-10' },
    { company_id: id, supplier_name: 'Johnson Controls', supplier_category: 'Facilities', esg_score: 79, environmental_score: 82, social_score: 76, governance_score: 79, certification_status: 'ISO 50001 Certified', last_audit_date: '2023-11-20', next_audit_date: '2024-11-20' },
  ];
  const { error: supplyErr } = await supabase.from('supply_chain_metrics').insert(supply);
  if (supplyErr) console.error('❌ Supply chain:', supplyErr.message);
  else console.log('✅ Supply Chain (3 suppliers)');

  // Employee engagement
  const employees = [
    { company_id: id, metric_name: 'Employee Satisfaction Score', category: 'satisfaction', value: 85, unit: 'score / 100', department: 'Global', reporting_period: '2024-01-01', target_value: 90 },
    { company_id: id, metric_name: 'Women in Workforce', category: 'diversity', value: 52, unit: 'percentage', department: 'Global', reporting_period: '2024-01-01', target_value: 50 },
    { company_id: id, metric_name: 'Diverse Race/Ethnicity (U.S.)', category: 'diversity', value: 45, unit: 'percentage', department: 'United States', reporting_period: '2024-01-01', target_value: 44 },
    { company_id: id, metric_name: 'Avg Training Hours / Employee', category: 'training', value: 59, unit: 'hours per year', department: 'Global', reporting_period: '2024-01-01', target_value: 60 },
    { company_id: id, metric_name: 'Community Investment', category: 'satisfaction', value: 380, unit: 'million USD', department: 'Global', reporting_period: '2024-01-01', target_value: 400 },
  ];
  const { error: empErr } = await supabase.from('employee_engagement').insert(employees);
  if (empErr) console.error('❌ Employees:', empErr.message);
  else console.log('✅ Employee Engagement (5 metrics)');

  // Benchmark data
  const benchmarks = [
    { industry: 'Banking & Financial Services', company_size: 'Large', metric_name: 'GHG Reduction vs Baseline', benchmark_value: 96.5, unit: 'percentage', percentile: 99, year: 2024, source: 'CDP Climate Change 2024' },
    { industry: 'Banking & Financial Services', company_size: 'Large', metric_name: 'Renewable Energy %', benchmark_value: 100, unit: 'percentage', percentile: 99, year: 2024, source: 'CDP Climate Change 2024' },
    { industry: 'Banking & Financial Services', company_size: 'Large', metric_name: 'Women in Workforce', benchmark_value: 52, unit: 'percentage', percentile: 85, year: 2024, source: 'Bloomberg GEI 2024' },
    { industry: 'Banking & Financial Services', company_size: 'Large', metric_name: 'Sustainable Finance ($B)', benchmark_value: 860, unit: 'billion USD cumulative', percentile: 99, year: 2024, source: 'BofA Sustainability Report 2024' },
  ];
  const { error: benchErr } = await supabase.from('benchmark_data').insert(benchmarks);
  if (benchErr) console.error('❌ Benchmarks:', benchErr.message);
  else console.log('✅ Benchmark Data (4 records)');

  console.log('\n🎉 All Bank of America ESG data seeded successfully!');
  console.log(`   Company ID: ${id}`);
  console.log('   Open http://localhost:5173 and click "Seed Data" to load charts.\n');
}

seed().catch(console.error);
