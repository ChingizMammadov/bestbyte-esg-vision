
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnvironmentalMetrics } from "./charts/EnvironmentalMetrics";
import { SocialMetrics } from "./charts/SocialMetrics";
import { GovernanceMetrics } from "./charts/GovernanceMetrics";
import { Leaf, Users, Shield } from "lucide-react";

export function TabNavigation() {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/60 hover:border-blue-300/60 transition-all duration-300">
      <Tabs defaultValue="environmental" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-1 rounded-xl border border-blue-100">
          <TabsTrigger 
            value="environmental" 
            className="flex items-center gap-2 text-gray-700 font-semibold data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:border data-[state=active]:border-emerald-200 rounded-lg transition-all duration-300"
          >
            <Leaf className="w-4 h-4" />
            Environmental
          </TabsTrigger>
          <TabsTrigger 
            value="social" 
            className="flex items-center gap-2 text-gray-700 font-semibold data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:border data-[state=active]:border-blue-200 rounded-lg transition-all duration-300"
          >
            <Users className="w-4 h-4" />
            Social
          </TabsTrigger>
          <TabsTrigger 
            value="governance" 
            className="flex items-center gap-2 text-gray-700 font-semibold data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:border data-[state=active]:border-purple-200 rounded-lg transition-all duration-300"
          >
            <Shield className="w-4 h-4" />
            Governance
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="environmental" className="space-y-6">
          <EnvironmentalMetrics />
        </TabsContent>
        
        <TabsContent value="social" className="space-y-6">
          <SocialMetrics />
        </TabsContent>
        
        <TabsContent value="governance" className="space-y-6">
          <GovernanceMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
