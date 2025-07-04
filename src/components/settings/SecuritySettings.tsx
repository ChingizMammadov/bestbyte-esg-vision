
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export function SecuritySettings() {
  return (
    <Card className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <CardHeader className="bg-white pb-4 border-b border-gray-100">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
          <div className="p-2 bg-red-50 rounded-xl border border-red-100">
            <Lock className="w-5 h-5 text-red-600" />
          </div>
          Security
        </CardTitle>
        <CardDescription className="text-red-600 font-medium">
          Manage your password and security settings
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4 bg-white">
        <Button 
          variant="outline" 
          className="bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-xl transition-all duration-200 font-medium"
        >
          Change Password
        </Button>
        <Button 
          variant="outline" 
          className="bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-xl transition-all duration-200 font-medium"
        >
          Enable Two-Factor Authentication
        </Button>
      </CardContent>
    </Card>
  );
}
