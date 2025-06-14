
import { Calendar, TrendingDown, Droplets, Zap, Leaf } from "lucide-react";
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
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'info':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

export function ActivityFeed() {
  return (
    <Card className="bg-white border rounded-2xl shadow-lg h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-gray-900">Recent ESG Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${getActivityStyles(activity.type)}`}>
                <activity.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
              </div>
              <div className="flex items-center text-xs text-gray-500 gap-1 flex-shrink-0">
                <Calendar className="w-3 h-3" />
                <span>{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
