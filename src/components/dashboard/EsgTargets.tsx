
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Calendar, TrendingUp } from "lucide-react";
import { useEsgTargets, useCompanies } from "@/hooks/useEsgData";

export function EsgTargets() {
  const { data: companies } = useCompanies();
  const companyId = companies?.[0]?.id;
  const { data: targets, isLoading, error } = useEsgTargets(companyId);

  if (isLoading) {
    return (
      <Card className="bg-white border rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900">ESG Targets</CardTitle>
          <CardDescription>Loading ESG targets...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error || !targets || targets.length === 0) {
    return (
      <Card className="bg-white border rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900">ESG Targets</CardTitle>
          <CardDescription>No ESG targets available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'environmental':
        return 'bg-green-100 text-green-800';
      case 'social':
        return 'bg-blue-100 text-blue-800';
      case 'governance':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = (current: number, target: number, isReverse = false) => {
    if (isReverse) {
      // For metrics where lower is better (like carbon emissions)
      const maxValue = Math.max(current, target * 1.5);
      return Math.max(0, Math.min(100, ((maxValue - current) / maxValue) * 100));
    } else {
      // For metrics where higher is better
      return Math.max(0, Math.min(100, (current / target) * 100));
    }
  };

  return (
    <Card className="bg-white border rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-green-600" />
          <CardTitle className="text-lg font-bold text-gray-900">ESG Targets</CardTitle>
        </div>
        <CardDescription className="text-gray-600">Track progress towards sustainability goals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {targets.map((target) => {
          const isReverse = target.metric_name.toLowerCase().includes('carbon') || 
                           target.metric_name.toLowerCase().includes('emission');
          const progress = calculateProgress(
            target.current_value || 0, 
            target.target_value || 1,
            isReverse
          );
          
          return (
            <div key={target.id} className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-semibold text-gray-900">{target.metric_name}</h4>
                  <p className="text-sm text-gray-600">{target.description}</p>
                </div>
                <Badge className={getCategoryColor(target.category)}>
                  {target.category}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Current: {target.current_value} {target.unit}</span>
                  <span className="text-gray-600">Target: {target.target_value} {target.unit}</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{Math.round(progress)}% progress</span>
                  {target.target_date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Due: {new Date(target.target_date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {targets.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No active ESG targets found</p>
            <p className="text-sm">Set targets to track your sustainability progress</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
