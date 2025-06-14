
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Info, TrendingDown, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialAlerts = [
  { 
    id: 1, 
    type: "deadline", 
    message: "ESG Report due in 7 days", 
    date: "2023-06-30",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200", 
    icon: Clock 
  },
  { 
    id: 2, 
    type: "positive", 
    message: "Your carbon data is trending downward!", 
    date: "2023-06-10",
    color: "bg-green-100 text-green-800 border-green-200", 
    icon: TrendingDown 
  },
  { 
    id: 3, 
    type: "urgent", 
    message: "Carbon emissions exceed target – urgent action required!", 
    date: "2023-06-15",
    color: "bg-red-100 text-red-800 border-red-200", 
    icon: AlertTriangle 
  },
];

export function Alerts() {
  const [displayedAlerts, setDisplayedAlerts] = useState(initialAlerts);

  const handleDismissAlert = (id: number) => {
    setDisplayedAlerts(alerts => alerts.filter(a => a.id !== id));
  };

  return (
    <Card className="bg-white border rounded-2xl shadow-lg h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-gray-900">ESG Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <AnimatePresence>
            {displayedAlerts.length > 0 ? displayedAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className={`${alert.color} p-4 rounded-lg border flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
              >
                <alert.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{alert.message}</p>
                  <p className="text-xs opacity-75 mt-1">{alert.date}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismissAlert(alert.id);
                  }}
                  className="text-xs px-3 py-1 rounded bg-white/60 hover:bg-white/80 font-semibold transition-colors flex-shrink-0"
                >
                  Dismiss
                </button>
              </motion.div>
            )) : (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No active alerts</p>
                <p className="text-xs text-gray-400">All ESG metrics are on track</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
