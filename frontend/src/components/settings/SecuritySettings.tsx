
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export function SecuritySettings() {
  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
      <CardHeader className="bg-white dark:bg-gray-800 pb-4 border-b border-gray-100 dark:border-gray-700">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800 dark:text-gray-100">
          <div className="p-2 bg-red-50 dark:bg-red-900/40 rounded-xl border border-red-100 dark:border-red-800">
            <Lock className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          Security
        </CardTitle>
        <CardDescription className="text-red-600 dark:text-red-400 font-medium">
          Manage your password and security settings
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4 bg-white dark:bg-gray-800">
        <Button 
          variant="outline" 
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 rounded-xl transition-all duration-200 font-medium"
        >
          Change Password
        </Button>
        <Button 
          variant="outline" 
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 rounded-xl transition-all duration-200 font-medium"
        >
          Enable Two-Factor Authentication
        </Button>
      </CardContent>
    </Card>
  );
}
