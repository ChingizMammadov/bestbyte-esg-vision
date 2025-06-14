
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnvironmentalMetrics } from "./charts/EnvironmentalMetrics";
import { SocialMetrics } from "./charts/SocialMetrics";
import { GovernanceMetrics } from "./charts/GovernanceMetrics";
import { Leaf, Users, Shield } from "lucide-react";

export function TabNavigation() {
  return (
    <Tabs defaultValue="environmental" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="environmental" className="flex items-center gap-2">
          <Leaf className="w-4 h-4" />
          Environmental
        </TabsTrigger>
        <TabsTrigger value="social" className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          Social
        </TabsTrigger>
        <TabsTrigger value="governance" className="flex items-center gap-2">
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
  );
}
