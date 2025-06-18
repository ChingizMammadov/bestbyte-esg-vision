
import { supabase } from "@/integrations/supabase/client";

export async function seedEsgData() {
  console.log("🌱 Seeding comprehensive ESG data...");
  
  try {
    // 1. Create a sample company first
    const { data: companyData, error: companyError } = await supabase
      .from("companies")
      .insert([
        {
          name: "GreenTech Solutions Inc.",
          industry: "Technology",
          size: "Medium (100-500 employees)",
          headquarters_location: "San Francisco, CA",
          website: "https://greentech-solutions.com",
          description: "Leading provider of sustainable technology solutions"
        }
      ])
      .select()
      .single();

    if (companyError) {
      console.error("❌ Error creating company:", companyError);
      throw companyError;
    }

    console.log("✅ Company created successfully");

    // 2. Seed ESG scores (update existing data)
    const esgScoresData = [
      {
        id: 1,
        category: "Environmental",
        score: 78,
        metric_detail: "Strong renewable energy adoption and carbon reduction initiatives. Leading in sustainable practices with room for improvement in waste management."
      },
      {
        id: 2,
        category: "Social",
        score: 85,
        metric_detail: "Excellent employee diversity and workplace safety programs. High employee satisfaction scores and comprehensive benefits package."
      },
      {
        id: 3,
        category: "Governance",
        score: 72,
        metric_detail: "Good board diversity and transparency practices. Solid ethics policies with opportunities to enhance shareholder engagement."
      }
    ];

    const { error: scoresError } = await supabase
      .from("esg_scores")
      .upsert(esgScoresData);

    if (scoresError) {
      console.error("❌ Error seeding ESG scores:", scoresError);
    } else {
      console.log("✅ ESG scores updated successfully");
    }

    // 3. Seed enhanced environmental data
    const environmentalData = [
      {
        id: 1,
        metric_name: "Carbon Emissions",
        value: 2500,
        month: "January",
        year: 2024,
        region: "Global"
      },
      {
        id: 2,
        metric_name: "Water Usage",
        value: 15000,
        month: "January",
        year: 2024,
        region: "Global"
      },
      {
        id: 3,
        metric_name: "Energy Consumption",
        value: 8500,
        month: "January",
        year: 2024,
        region: "Global"
      },
      {
        id: 4,
        metric_name: "Waste Generated",
        value: 1200,
        month: "January",
        year: 2024,
        region: "Global"
      }
    ];

    const { error: envError } = await supabase
      .from("environmental_data")
      .upsert(environmentalData);

    if (envError) {
      console.error("❌ Error seeding environmental data:", envError);
    } else {
      console.log("✅ Environmental data updated successfully");
    }

    // 4. Seed carbon footprint details
    const carbonFootprintData = [
      {
        company_id: companyData.id,
        scope: 1,
        category: "Direct Emissions",
        source_description: "Company vehicles and on-site fuel combustion",
        emissions_co2_tons: 125.5,
        calculation_method: "Direct measurement",
        emission_factor: 2.31,
        activity_data: 54.3,
        unit: "metric tons CO2",
        reporting_period: "2024-01-01"
      },
      {
        company_id: companyData.id,
        scope: 2,
        category: "Indirect Emissions",
        source_description: "Purchased electricity",
        emissions_co2_tons: 340.2,
        calculation_method: "Grid emission factors",
        emission_factor: 0.42,
        activity_data: 809.5,
        unit: "metric tons CO2",
        reporting_period: "2024-01-01"
      }
    ];

    const { error: carbonError } = await supabase
      .from("carbon_footprint_details")
      .insert(carbonFootprintData);

    if (carbonError) {
      console.error("❌ Error seeding carbon footprint data:", carbonError);
    } else {
      console.log("✅ Carbon footprint data seeded successfully");
    }

    // 5. Seed energy consumption data
    const energyConsumptionData = [
      {
        company_id: companyData.id,
        facility_name: "Main Office",
        energy_type: "renewable",
        source: "solar",
        consumption_kwh: 15000,
        cost: 1800,
        reporting_period: "2024-01-01"
      },
      {
        company_id: companyData.id,
        facility_name: "Data Center",
        energy_type: "grid",
        source: "mixed",
        consumption_kwh: 45000,
        cost: 6750,
        reporting_period: "2024-01-01"
      }
    ];

    const { error: energyError } = await supabase
      .from("energy_consumption")
      .insert(energyConsumptionData);

    if (energyError) {
      console.error("❌ Error seeding energy consumption data:", energyError);
    } else {
      console.log("✅ Energy consumption data seeded successfully");
    }

    // 6. Seed waste management data
    const wasteManagementData = [
      {
        company_id: companyData.id,
        facility_name: "Main Office",
        waste_type: "paper",
        waste_category: "recyclable",
        amount_kg: 450,
        disposal_method: "recycled",
        cost: 85,
        reporting_period: "2024-01-01"
      },
      {
        company_id: companyData.id,
        facility_name: "Manufacturing",
        waste_type: "electronic",
        waste_category: "hazardous",
        amount_kg: 120,
        disposal_method: "certified_disposal",
        cost: 350,
        reporting_period: "2024-01-01"
      }
    ];

    const { error: wasteError } = await supabase
      .from("waste_management_data")
      .insert(wasteManagementData);

    if (wasteError) {
      console.error("❌ Error seeding waste management data:", wasteError);
    } else {
      console.log("✅ Waste management data seeded successfully");
    }

    // 7. Seed supply chain metrics
    const supplyChainData = [
      {
        company_id: companyData.id,
        supplier_name: "EcoMaterials Corp",
        supplier_category: "Raw Materials",
        esg_score: 85,
        environmental_score: 90,
        social_score: 80,
        governance_score: 85,
        certification_status: "ISO 14001 Certified",
        last_audit_date: "2023-12-15",
        next_audit_date: "2024-12-15"
      },
      {
        company_id: companyData.id,
        supplier_name: "Global Logistics Solutions",
        supplier_category: "Transportation",
        esg_score: 72,
        environmental_score: 75,
        social_score: 70,
        governance_score: 71,
        certification_status: "Pending Review",
        last_audit_date: "2023-09-20",
        next_audit_date: "2024-09-20"
      }
    ];

    const { error: supplyChainError } = await supabase
      .from("supply_chain_metrics")
      .insert(supplyChainData);

    if (supplyChainError) {
      console.error("❌ Error seeding supply chain data:", supplyChainError);
    } else {
      console.log("✅ Supply chain data seeded successfully");
    }

    // 8. Seed employee engagement data
    const employeeEngagementData = [
      {
        company_id: companyData.id,
        metric_name: "Employee Satisfaction",
        category: "satisfaction",
        value: 4.2,
        unit: "out of 5",
        department: "All",
        reporting_period: "2024-01-01",
        target_value: 4.5
      },
      {
        company_id: companyData.id,
        metric_name: "Diversity Index",
        category: "diversity",
        value: 68,
        unit: "percentage",
        department: "All",
        reporting_period: "2024-01-01",
        target_value: 75
      },
      {
        company_id: companyData.id,
        metric_name: "Safety Incidents",
        category: "safety",
        value: 0,
        unit: "incidents per month",
        department: "Manufacturing",
        reporting_period: "2024-01-01",
        target_value: 0
      }
    ];

    const { error: employeeError } = await supabase
      .from("employee_engagement")
      .insert(employeeEngagementData);

    if (employeeError) {
      console.error("❌ Error seeding employee engagement data:", employeeError);
    } else {
      console.log("✅ Employee engagement data seeded successfully");
    }

    // 9. Seed ESG targets
    const esgTargetsData = [
      {
        company_id: companyData.id,
        category: "environmental",
        metric_name: "Carbon Neutrality",
        target_value: 0,
        current_value: 465.7,
        unit: "metric tons CO2",
        target_date: "2030-12-31",
        description: "Achieve net-zero carbon emissions by 2030"
      },
      {
        company_id: companyData.id,
        category: "social",
        metric_name: "Workplace Diversity",
        target_value: 50,
        current_value: 34,
        unit: "percentage",
        target_date: "2025-12-31",
        description: "Achieve 50% diversity in leadership positions"
      },
      {
        company_id: companyData.id,
        category: "governance",
        metric_name: "Board Independence",
        target_value: 75,
        current_value: 60,
        unit: "percentage",
        target_date: "2025-06-30",
        description: "Maintain 75% independent board members"
      }
    ];

    const { error: targetsError } = await supabase
      .from("esg_targets")
      .insert(esgTargetsData);

    if (targetsError) {
      console.error("❌ Error seeding ESG targets:", targetsError);
    } else {
      console.log("✅ ESG targets seeded successfully");
    }

    // 10. Seed benchmark data
    const benchmarkData = [
      {
        industry: "Technology",
        company_size: "Medium",
        metric_name: "Carbon Intensity",
        benchmark_value: 2.3,
        unit: "tons CO2/million USD revenue",
        percentile: 75,
        year: 2024,
        source: "Industry ESG Report 2024"
      },
      {
        industry: "Technology",
        company_size: "Medium",
        metric_name: "Employee Satisfaction",
        benchmark_value: 4.1,
        unit: "out of 5",
        percentile: 60,
        year: 2024,
        source: "Tech Industry HR Survey 2024"
      }
    ];

    const { error: benchmarkError } = await supabase
      .from("benchmark_data")
      .insert(benchmarkData);

    if (benchmarkError) {
      console.error("❌ Error seeding benchmark data:", benchmarkError);
    } else {
      console.log("✅ Benchmark data seeded successfully");
    }

    return { 
      success: true, 
      message: "Comprehensive ESG data seeded successfully!",
      companyId: companyData.id 
    };

  } catch (error) {
    console.error("❌ Error seeding data:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
}
