
import { supabase } from "@/integrations/supabase/client";

export async function seedEsgData() {
  console.log("🌱 Seeding ESG data...");
  
  // Sample ESG scores data
  const esgScoresData = [
    {
      category: "Environmental",
      score: 78,
      metric_detail: "Strong renewable energy adoption and carbon reduction initiatives. Leading in sustainable practices with room for improvement in waste management."
    },
    {
      category: "Social",
      score: 85,
      metric_detail: "Excellent employee diversity and workplace safety programs. High employee satisfaction scores and comprehensive benefits package."
    },
    {
      category: "Governance",
      score: 72,
      metric_detail: "Good board diversity and transparency practices. Solid ethics policies with opportunities to enhance shareholder engagement."
    }
  ];

  try {
    // Insert ESG scores
    const { data: scoresData, error: scoresError } = await supabase
      .from("esg_scores")
      .insert(esgScoresData);

    if (scoresError) {
      console.error("❌ Error seeding ESG scores:", scoresError);
      throw scoresError;
    }

    console.log("✅ ESG scores seeded successfully:", scoresData);

    // Sample environmental data
    const environmentalData = [
      {
        metric_name: "Carbon Emissions",
        value: 2500,
        month: "January",
        year: 2024,
        region: "Global"
      },
      {
        metric_name: "Water Usage",
        value: 15000,
        month: "January", 
        year: 2024,
        region: "Global"
      }
    ];

    const { data: envData, error: envError } = await supabase
      .from("environmental_data")
      .insert(environmentalData);

    if (envError) {
      console.error("❌ Error seeding environmental data:", envError);
    } else {
      console.log("✅ Environmental data seeded successfully");
    }

    return { success: true, message: "ESG data seeded successfully!" };
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
