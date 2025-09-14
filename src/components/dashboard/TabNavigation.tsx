
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnvironmentalMetrics } from "./charts/EnvironmentalMetrics";
import { SocialMetrics } from "./charts/SocialMetrics";
import { GovernanceMetrics } from "./charts/GovernanceMetrics";
import { Leaf, Users, Shield } from "lucide-react";

export function TabNavigation({data}) {
  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 md:p-6 border border-blue-200/60 dark:border-blue-900/60 hover:border-blue-300/60 dark:hover:border-blue-800/60 transition-all duration-300">
      <Tabs defaultValue="environmental" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-1 rounded-xl border border-blue-100 dark:border-blue-900/50">
          <TabsTrigger 
            value="environmental" 
            className="flex items-center justify-center gap-1 sm:gap-2 text-gray-700 dark:text-gray-300 font-semibold text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:border data-[state=active]:border-emerald-200 dark:data-[state=active]:border-emerald-800 rounded-lg transition-all duration-300 px-1 py-1 sm:px-2 sm:py-1"
          >
            <Leaf className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="hidden xs:inline">Environmental</span>
            <span className="xs:hidden">Env</span>
          </TabsTrigger>
          <TabsTrigger 
            value="social" 
            className="flex items-center justify-center gap-1 sm:gap-2 text-gray-700 dark:text-gray-300 font-semibold text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border data-[state=active]:border-blue-200 dark:data-[state=active]:border-blue-800 rounded-lg transition-all duration-300 px-1 py-1 sm:px-2 sm:py-1"
          >
            <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>Social</span>
          </TabsTrigger>
          <TabsTrigger 
            value="governance" 
            className="flex items-center justify-center gap-1 sm:gap-2 text-gray-700 dark:text-gray-300 font-semibold text-xs sm:text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 data-[state=active]:border data-[state=active]:border-purple-200 dark:data-[state=active]:border-purple-800 rounded-lg transition-all duration-300 px-1 py-1 sm:px-2 sm:py-1"
          >
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="hidden xs:inline">Governance</span>
            <span className="xs:hidden">Gov</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="environmental" className="space-y-6">
          <EnvironmentalMetrics data={data} />
        </TabsContent>
        
        <TabsContent value="social" className="space-y-6">
          <SocialMetrics data={data} />
        </TabsContent>
        
        <TabsContent value="governance" className="space-y-6">
          <GovernanceMetrics data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
