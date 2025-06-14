
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Info, TrendingDown, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialAlerts = [
  { id: 1, level: "warning", message: "ESG Report deadline in 7 days.", color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle },
  { id: 2, level: "info", message: "Your carbon data is trending downward!", color: "bg-green-100 text-green-800", icon: TrendingDown },
  { id: 3, level: "danger", message: "Emissions target exceeded for Q2.", color: "bg-red-100 text-red-800", icon: AlertTriangle },
];

export function Alerts() {
  const [displayedAlerts, setDisplayedAlerts] = useState(initialAlerts);

  const handleDismissAlert = (id: number) => {
    setDisplayedAlerts(alerts => alerts.filter(a => a.id !== id));
  };

  return (
    <Card className="bg-gradient-to-br from-yellow-50/70 to-white/80 border rounded-2xl shadow-xl h-full">
      <CardHeader>
        <CardTitle>Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          <AnimatePresence>
            {displayedAlerts.length > 0 ? displayedAlerts.map((a) => (
              <motion.li
                key={a.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                className={`${a.color} p-3 rounded-lg flex items-start gap-3 shadow group hover:shadow-md cursor-pointer transition`}
              >
                <a.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <span className="font-semibold text-sm">{a.message}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismissAlert(a.id);
                  }}
                  className="ml-2 text-xs px-2 py-1 rounded bg-white/50 hover:bg-white/80 text-gray-600 font-semibold transition-all"
                >
                  Dismiss
                </button>
              </motion.li>
            )) : (
              <p className="text-sm text-gray-500 text-center py-4">No new alerts.</p>
            )}
          </AnimatePresence>
        </ul>
      </CardContent>
    </Card>
  );
}
