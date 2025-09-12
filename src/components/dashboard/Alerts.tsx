
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
    color: "bg-amber-100 text-amber-600 dark:text-amber-500 border-amber-400", 
    icon: Clock 
  },
  { 
    id: 2, 
    type: "positive", 
    message: "Your carbon data is trending downward!", 
    date: "2023-06-10",
    color: "bg-emerald-100 text-emerald-600 dark:text-emerald-500 border-emerald-400", 
    icon: TrendingDown 
  },
  { 
    id: 3, 
    type: "urgent", 
    message: "Carbon emissions exceed target - urgent action required!", 
    date: "2023-06-15",
    color: "bg-red-100 text-red-600 dark:text-red-500 border-red-400", 
    icon: AlertTriangle 
  },
];

export function Alerts() {
  const [displayedAlerts, setDisplayedAlerts] = useState(initialAlerts);

  const handleDismissAlert = (id: number) => {
    setDisplayedAlerts(alerts => alerts.filter(a => a.id !== id));
  };

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 border border-orange-200/60 dark:border-orange-900/60 rounded-2xl overflow-hidden hover:border-orange-300/60 dark:hover:border-orange-800/60 transition-all duration-300 h-full">
      <CardHeader className="bg-gradient-to-r from-orange-500/10 to-red-500/10 dark:from-orange-600/20 dark:to-red-600/20 pb-4 border-b border-orange-200/50 dark:border-orange-900/50">
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-xl border border-orange-200/50 dark:border-orange-800/50">
            <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          ESG Alerts
          <Sparkles className="w-4 h-4 text-yellow-500 dark:text-yellow-400 ml-auto" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-white/60 dark:bg-gray-800/60">
        <div className="space-y-3">
          <AnimatePresence>
            {displayedAlerts.length > 0 ? displayedAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className={`${alert.color} dark:bg-opacity-20 dark:text-opacity-90 dark:border-opacity-90 p-4 rounded-xl border-2 flex items-start gap-3 hover:border-opacity-70 transition-all duration-300 cursor-pointer bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm`}
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
                  className="text-xs px-3 py-1 rounded-xl bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 font-bold border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 flex-shrink-0"
                >
                  Dismiss
                </button>
              </motion.div>
            )) : (
              <div className="text-center py-12 bg-white/70 dark:bg-gray-800/70 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="p-4 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-emerald-200/50 dark:border-emerald-800/50">
                  <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">No active alerts</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">All ESG metrics are on track</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
