
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Globe, Users, Sparkles } from "lucide-react";
import { useCompanies } from "@/hooks/useEsgData";

export function CompanyOverview() {
  const { data: companies, isLoading, error } = useCompanies();

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-0 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-violet-100 rounded-xl">
              <Building2 className="w-5 h-5 text-violet-600" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">Company Overview</CardTitle>
          </div>
          <CardDescription className="text-violet-700">Loading company information...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error || !companies || companies.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-0 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-violet-100 rounded-xl">
              <Building2 className="w-5 h-5 text-violet-600" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">Company Overview</CardTitle>
          </div>
          <CardDescription className="text-violet-700">No company data available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const company = companies[0]; // Display first company for now

  return (
    <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-100 rounded-xl">
            <Building2 className="w-5 h-5 text-violet-600" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              Company Overview
              <Sparkles className="w-4 h-4 text-violet-500" />
            </CardTitle>
            <CardDescription className="text-violet-700 font-medium">{company.name}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Location</p>
                <p className="text-sm font-semibold text-gray-800">{company.headquarters_location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Company Size</p>
                <p className="text-sm font-semibold text-gray-800">{company.size}</p>
              </div>
            </div>
            
            {company.website && (
              <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Globe className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Website</p>
                  <a 
                    href={company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    {company.website}
                  </a>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl">
              <Badge variant="secondary" className="bg-indigo-200 text-indigo-800 font-semibold px-3 py-1">
                {company.industry}
              </Badge>
            </div>
            
            {company.description && (
              <div className="p-4 bg-white/60 rounded-xl">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">About</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {company.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
