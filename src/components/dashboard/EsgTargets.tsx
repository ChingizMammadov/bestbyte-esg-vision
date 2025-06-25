
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Calendar, TrendingUp, Award, Zap } from "lucide-react";
import { useEsgTargets, useCompanies } from "@/hooks/useEsgData";

export function EsgTargets() {
  const { data: companies } = useCompanies();
  const companyId = companies?.[0]?.id;
  const { data: targets, isLoading, error } = useEsgTargets(companyId);

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <Target className="w-5 h-5 text-emerald-600" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">ESG Targets</CardTitle>
          </div>
          <CardDescription className="text-emerald-700">Loading ESG targets...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error || !targets || targets.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <Target className="w-5 h-5 text-emerald-600" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">ESG Targets</CardTitle>
          </div>
          <CardDescription className="text-emerald-700">No ESG targets available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'environmental':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'social':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'governance':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'environmental':
        return <Zap className="w-4 h-4" />;
      case 'social':
        return <Award className="w-4 h-4" />;
      case 'governance':
        return <Target className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const calculateProgress = (current: number, target: number, isReverse = false) => {
    if (isReverse) {
      const maxValue = Math.max(current, target * 1.5);
      return Math.max(0, Math.min(100, ((maxValue - current) / maxValue) * 100));
    } else {
      return Math.max(0, Math.min(100, (current / target) * 100));
    }
  };

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-xl">
            <Target className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              ESG Targets
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </CardTitle>
            <CardDescription className="text-emerald-700 font-medium">Track progress towards sustainability goals</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {targets.map((target) => {
          const isReverse = target.metric_name.toLowerCase().includes('carbon') || 
                           target.metric_name.toLowerCase().includes('emission');
          const progress = calculateProgress(
            target.current_value || 0, 
            target.target_value || 1,
            isReverse
          );
          
          return (
            <div key={target.id} className="p-5 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 hover:bg-white/90 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900 text-lg">{target.metric_name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{target.description}</p>
                </div>
                <Badge className={`${getCategoryColor(target.category)} border font-semibold px-3 py-1 flex items-center gap-1`}>
                  {getCategoryIcon(target.category)}
                  {target.category}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="text-gray-600">
                    Current: <span className="text-gray-900 font-bold">{target.current_value} {target.unit}</span>
                  </span>
                  <span className="text-gray-600">
                    Target: <span className="text-gray-900 font-bold">{target.target_value} {target.unit}</span>
                  </span>
                </div>
                <div className="relative">
                  <Progress 
                    value={progress} 
                    className="h-3 bg-gray-200 rounded-full overflow-hidden"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" 
                       style={{width: `${progress}%`}} />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold px-2 py-1 rounded-full ${
                    progress >= 80 ? 'bg-emerald-100 text-emerald-700' :
                    progress >= 50 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {Math.round(progress)}% complete
                  </span>
                  {target.target_date && (
                    <div className="flex items-center gap-1 text-gray-500">
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
          <div className="text-center py-12 bg-white/50 rounded-2xl">
            <div className="p-4 bg-emerald-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">No Active ESG Targets</h3>
            <p className="text-sm text-gray-600">Set targets to track your sustainability progress</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
