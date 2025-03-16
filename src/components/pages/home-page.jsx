"use client"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Upload, Leaf, Video, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"
import ActionButton from "@/components/custom/action-button"
import ActivityItem from "@/components/custom/activity-item"
import { useLanguage } from "@/contexts/LanguageContext"

export default function HomePage({ setPage }) {
  const [recentActivities, setRecentActivities] = useState([]);
  const { t } = useLanguage();

  // Load saved plants data on component mount
  useEffect(() => {
    try {
      // Get plants from localStorage
      const savedPlants = JSON.parse(localStorage.getItem('myPlants') || '[]');
      console.log("Found", savedPlants.length, "saved plants");
      
      // Format the most recent 3 plants as activity items
      const activities = savedPlants.slice(0, 3).map(plant => {
        // Determine the icon based on plant status
        let icon;
        const status = plant.status?.toLowerCase() || '';
        
        if (status.includes("healthy")) {
          icon = <CheckCircle className="w-6 h-6 text-green-500" />;
        } else if (status.includes("early blight")) {
          icon = <AlertTriangle className="w-6 h-6 text-yellow-500" />;
        } else if (status.includes("late blight")) {
          icon = <AlertCircle className="w-6 h-6 text-red-500" />;
        } else if (status.includes("bacteria")) {
          icon = <AlertTriangle className="w-6 h-6 text-orange-500" />;
        } else if (status.includes("fungi")) {
          icon = <AlertTriangle className="w-6 h-6 text-purple-500" />;
        } else if (status.includes("pest")) {
          icon = <AlertTriangle className="w-6 h-6 text-blue-500" />;
        } else if (status.includes("virus")) {
          icon = <AlertCircle className="w-6 h-6 text-red-500" />;
        } else {
          icon = <Leaf className="w-6 h-6 text-gray-500" />;
        }
        
        // Format date
        const date = new Date(plant.dateAdded || new Date());
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        let timeText = '';
        if (date.toDateString() === today.toDateString()) {
          timeText = `Today, ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
        } else if (date.toDateString() === yesterday.toDateString()) {
          timeText = `Yesterday, ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
        } else {
          timeText = date.toLocaleDateString() + ', ' + date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        }
        
        return {
          icon,
          text: `${plant.status || t('unknownCondition')} ${t('detected')}`,
          time: timeText,
          // Add plant ID to allow navigation to details if needed
          plantId: plant.id
        };
      });
      
      setRecentActivities(activities);
    } catch (err) {
      console.error("Error loading plant data:", err);
      setRecentActivities([]);
    }
  }, [t]);

  return (
    <>
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <ActionButton
              icon={<Camera className="w-8 h-8" />}
              label={t('takePhoto')}
              onClick={() => setPage("scan")} />
            <ActionButton
              icon={<Upload className="w-8 h-8" />}
              label={t('upload')}
              onClick={() => setPage("scan")} />
            <ActionButton
              icon={<Leaf className="w-8 h-8" />}
              label={t('myPlants')}
              onClick={() => setPage("plants")} />
            <ActionButton
              icon={<Video className="w-8 h-8" />}
              label={t('guide')}
              onClick={() => setPage("guide")} />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-center text-green-800">{t('recentActivity')}</h2>
          <div className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  icon={activity.icon}
                  text={activity.text}
                  time={activity.time}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-6">{t('noRecentActivity')}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

