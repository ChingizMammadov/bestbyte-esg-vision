
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Info, TrendingDown, AlertTriangle, Clock, CheckCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialAlerts = [
  { 
    id: 1, 
    type: "deadline", 
    message: "ESG Report due in 7 days", 
    date: "2023-06-30",
    color: "bg-amber-100 text-amber-800 border-amber-200", 
    icon: Clock 
  },
  { 
    id: 2, 
    type: "positive", 
    message: "Your carbon data is trending downward!", 
    date: "2023-06-10",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200", 
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
    <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
      <CardHeader className="bg-gradient-to-r from-orange-500/10 to-red-500/10 pb-4">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
          </div>
          ESG Alerts
          <Sparkles className="w-4 h-4 text-yellow-500 ml-auto" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-white/60">
        <div className="space-y-3">
          <AnimatePresence>
            {displayedAlerts.length > 0 ? displayedAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className={`${alert.color} p-4 rounded-2xl border-2 flex items-start gap-3 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm`}
              >
                <alert.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm leading-relaxed">{alert.message}</p>
                  <p className="text-xs opacity-75 mt-1 font-medium">{alert.date}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismissAlert(alert.id);
                  }}
                  className="text-xs px-3 py-1 rounded-xl bg-white/80 hover:bg-white transition-all duration-300 font-bold shadow-md hover:shadow-lg flex-shrink-0"
                >
                  Dismiss
                </button>
              </motion.div>
            )) : (
              <div className="text-center py-12 bg-white/70 rounded-2xl">
                <div className="p-4 bg-emerald-100 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">No active alerts</h3>
                <p className="text-sm text-gray-600 font-medium">All ESG metrics are on track</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
