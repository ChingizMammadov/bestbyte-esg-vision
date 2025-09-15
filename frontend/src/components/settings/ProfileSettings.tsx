
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function ProfileSettings() {
  const { user, signOut } = useAuth();

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
      <CardHeader className="bg-white dark:bg-gray-800 pb-4 border-b border-gray-100 dark:border-gray-700">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800 dark:text-gray-100">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/40 rounded-xl border border-blue-100 dark:border-blue-800">
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          Profile Settings
        </CardTitle>
        <CardDescription className="text-blue-600 dark:text-blue-400 font-medium">
          Update your personal information and company details
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6 bg-white dark:bg-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-200 font-medium">First Name</Label>
            <Input 
              id="firstName" 
              defaultValue="Jane" 
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl transition-all duration-200 text-gray-800 dark:text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-200 font-medium">Last Name</Label>
            <Input 
              id="lastName" 
              defaultValue="Smith" 
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl transition-all duration-200 text-gray-800 dark:text-gray-200"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 dark:text-gray-200 font-medium">Email Address</Label>
          <Input 
            id="email" 
            type="email" 
            defaultValue={user?.email} 
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl transition-all duration-200 text-gray-800 dark:text-gray-200"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company" className="text-gray-700 dark:text-gray-200 font-medium">Company Name</Label>
          <Input 
            id="company" 
            defaultValue="Acme Corp" 
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 rounded-xl transition-all duration-200 text-gray-800 dark:text-gray-200"
          />
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-xl font-semibold px-6 py-2 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}
