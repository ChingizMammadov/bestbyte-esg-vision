
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Globe, Users } from "lucide-react";
import { useCompanies } from "@/hooks/useEsgData";

export function CompanyOverview() {
  const { data: companies, isLoading, error } = useCompanies();

  if (isLoading) {
    return (
      <Card className="bg-white border rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900">Company Overview</CardTitle>
          <CardDescription>Loading company information...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error || !companies || companies.length === 0) {
    return (
      <Card className="bg-white border rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900">Company Overview</CardTitle>
          <CardDescription>No company data available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const company = companies[0]; // Display first company for now

  return (
    <Card className="bg-white border rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-lg font-bold text-gray-900">Company Overview</CardTitle>
        </div>
        <CardDescription className="text-gray-600">{company.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{company.headquarters_location}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{company.size}</span>
            </div>
            
            {company.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <a 
                  href={company.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {company.website}
                </a>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {company.industry}
              </Badge>
            </div>
            
            {company.description && (
              <p className="text-sm text-gray-600 leading-relaxed">
                {company.description}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
