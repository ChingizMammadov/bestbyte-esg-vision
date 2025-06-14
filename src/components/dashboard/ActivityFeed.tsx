
import { CalendarDays, Info, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recentActivity = [
  { time: "Today", activity: "Uploaded ESG Q2 Report", icon: Info },
  { time: "Yesterday", activity: "System: Carbon footprint reduced by 10%", icon: TrendingDown },
  { time: "This Week", activity: "New Water Usage report generated", icon: CalendarDays },
];

export function ActivityFeed() {
  return (
    <Card className="bg-gradient-to-br from-[#effffd]/60 to-[#e9ecef]/45 border rounded-2xl shadow-xl h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentActivity.map((a, i) => (
            <li key={i} className="flex items-center gap-3 text-sm md:text-base group transition">
              <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-md transition group-hover:bg-primary/20">
                <a.icon className="w-4 h-4 text-primary/80" />
              </div>
              <div className="flex-1 text-gray-700">{a.activity}</div>
              <div className="flex items-center text-xs text-gray-400 gap-1 whitespace-nowrap"><CalendarDays className="w-3 h-3" />{a.time}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
