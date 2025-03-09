"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Upload, Leaf, Video, CheckCircle, AlertTriangle } from "lucide-react"
import ActionButton from "@/components/custom/action-button"
import ActivityItem from "@/components/custom/activity-item"

export default function HomePage({ setPage }) {
  return (
    <>
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <ActionButton
              icon={<Camera className="w-8 h-8" />}
              label="Take Photo"
              onClick={() => setPage("scan")} />
            <ActionButton
              icon={<Upload className="w-8 h-8" />}
              label="Upload"
              onClick={() => setPage("scan")} />
            <ActionButton
              icon={<Leaf className="w-8 h-8" />}
              label="My Plants"
              onClick={() => setPage("plants", { setPage })} />
            <ActionButton
              icon={<Video className="w-8 h-8" />}
              label="Guide"
              onClick={() => setPage("guide")} />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-center text-green-800">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem
              icon={<CheckCircle className="w-6 h-6 text-green-500" />}
              text="Healthy Potato Plant"
              time="Today, 10:30 AM" />
            <ActivityItem
              icon={<AlertTriangle className="w-6 h-6 text-yellow-500" />}
              text="Early Blight Detected"
              time="Yesterday, 4:15 PM" />
            <ActivityItem
              icon={<Video className="w-6 h-6 text-blue-500" />}
              text="Watched Treatment Guide"
              time="2 days ago" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

