
import { Calendar, TrendingDown, Droplets, Zap, Leaf, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recentActivity = [
  { 
    time: "Today", 
    activity: "Carbon footprint reduced by 5% this quarter", 
    icon: TrendingDown,
    type: "success"
  },
  { 
    time: "Yesterday", 
    activity: "Water usage decreased by 10% compared to last year", 
    icon: Droplets,
    type: "info"
  },
  { 
    time: "This Week", 
    activity: "Energy efficiency improved by 8% - new solar panels active", 
    icon: Zap,
    type: "success"
  },
  { 
    time: "Last Week", 
    activity: "ESG Q2 Report submitted successfully", 
    icon: Leaf,
    type: "neutral"
  },
];

const getActivityStyles = (type: string) => {
  switch(type) {
    case 'success':
      return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200';
    case 'info':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200';
    default:
      return 'bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200';
  }
};

export function ActivityFeed() {
  return (
    <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200/60 rounded-2xl overflow-hidden hover:border-slate-300/60 transition-all duration-300 h-full">
      <CardHeader className="bg-gradient-to-r from-slate-500/10 to-gray-500/10 pb-4 border-b border-slate-200/50">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2 bg-slate-100 rounded-xl border border-slate-200/50">
            <Calendar className="w-5 h-5 text-slate-600" />
          </div>
          Recent ESG Activity
          <Sparkles className="w-4 h-4 text-yellow-500 ml-auto" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-white/60">
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/80 transition-all duration-300 group border border-white/70 hover:border-gray-200">
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${getActivityStyles(activity.type)} border`}>
                <activity.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 leading-relaxed">{activity.activity}</p>
              </div>
              <div className="flex items-center text-xs text-gray-500 gap-1 flex-shrink-0 bg-white/80 px-3 py-2 rounded-full border border-gray-200/50">
                <Calendar className="w-3 h-3" />
                <span className="font-medium">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
