
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Globe, Users, Sparkles } from "lucide-react";
import { useCompanies } from "@/hooks/useEsgData";

export function CompanyOverview({ data }) {

  if (!data) {
    return (
      <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 border-0 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 dark:from-violet-600/20 dark:to-purple-600/20 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-violet-100 dark:bg-violet-900/50 rounded-xl">
              <Building2 className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">Company Overview</CardTitle>
          </div>
          <CardDescription className="text-violet-700 dark:text-violet-300">No company data available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const company = data.company_overview
  return (
    <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 dark:from-violet-600/20 dark:to-purple-600/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-100 dark:bg-violet-900/50 rounded-xl">
            <Building2 className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              Company Overview
              <Sparkles className="w-4 h-4 text-violet-500 dark:text-violet-400" />
            </CardTitle>
            <CardDescription className="text-violet-700 dark:text-violet-300 font-medium">{company.name}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Location</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{company.headquarters_location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
              <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Company Size</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{company.size}</p>
              </div>
            </div>
            
            {data.website && (
              <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                  <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Website</p>
                  <a 
                    href={company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                  >
                    {company.website}
                  </a>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-xl">
              <Badge variant="secondary" className="bg-indigo-200 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 font-semibold px-3 py-1">
                {company.industry}
              </Badge>
            </div>
            
            {data.description && (
              <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">About</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
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
