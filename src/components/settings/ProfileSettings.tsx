
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

export function ProfileSettings() {
  return (
    <Card className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <CardHeader className="bg-white pb-4 border-b border-gray-100">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
          <div className="p-2 bg-blue-50 rounded-xl border border-blue-100">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          Profile Settings
        </CardTitle>
        <CardDescription className="text-blue-600 font-medium">
          Update your personal information and company details
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
            <Input 
              id="firstName" 
              defaultValue="Jane" 
              className="bg-white border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</Label>
            <Input 
              id="lastName" 
              defaultValue="Smith" 
              className="bg-white border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
          <Input 
            id="email" 
            type="email" 
            defaultValue="jane@acme.com" 
            className="bg-white border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company" className="text-gray-700 font-medium">Company Name</Label>
          <Input 
            id="company" 
            defaultValue="Acme Corp" 
            className="bg-white border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
          />
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold px-6 py-2 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}
