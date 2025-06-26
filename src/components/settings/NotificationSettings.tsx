
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";

export function NotificationSettings() {
  const [notifications, setNotifications] = useState(true);
  const [emailReports, setEmailReports] = useState(false);

  return (
    <Card className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <CardHeader className="bg-white pb-4 border-b border-gray-100">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
          <div className="p-2 bg-green-50 rounded-xl border border-green-100">
            <Bell className="w-5 h-5 text-green-600" />
          </div>
          Notifications
        </CardTitle>
        <CardDescription className="text-green-600 font-medium">
          Configure how you receive updates and alerts
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6 bg-white">
        <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gray-50/30">
          <div>
            <Label htmlFor="notifications" className="text-sm font-medium text-gray-900">
              Push Notifications
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              Receive notifications about important updates
            </p>
          </div>
          <Switch
            id="notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gray-50/30">
          <div>
            <Label htmlFor="emailReports" className="text-sm font-medium text-gray-900">
              Email Reports
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              Get monthly ESG reports delivered to your email
            </p>
          </div>
          <Switch
            id="emailReports"
            checked={emailReports}
            onCheckedChange={setEmailReports}
          />
        </div>
      </CardContent>
    </Card>
  );
}
