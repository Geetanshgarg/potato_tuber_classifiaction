import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, AlertTriangle, Video, VolumeIcon as VolumeUp, ChevronLeft } from "lucide-react"
import VideoItem from "@/components/custom/video-item"

export default function GuidePage() {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-green-800">Farmer's Guide</h2>
        <p className="text-sm text-muted-foreground">Essential information for potato farming</p>
      </div>
      <div className="space-y-4">
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Seasonal Calendar
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-green-50 p-2 rounded-lg">
                <p className="font-medium">Planting</p>
                <p className="text-xs text-muted-foreground">Oct-Nov</p>
              </div>
              <div className="bg-green-50 p-2 rounded-lg">
                <p className="font-medium">Growing</p>
                <p className="text-xs text-muted-foreground">Dec-Feb</p>
              </div>
              <div className="bg-green-50 p-2 rounded-lg">
                <p className="font-medium">Harvest</p>
                <p className="text-xs text-muted-foreground">Mar-Apr</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
              Common Problems
            </h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-between">
                <span>Early Blight</span>
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span>Late Blight</span>
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span>Pests</span>
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <h3 className="font-medium mb-2 flex items-center">
              <Video className="w-5 h-5 mr-2 text-blue-500" />
              Video Tutorials
            </h3>
            <div className="space-y-2">
              <VideoItem title="Planting Techniques" duration="4:30" />
              <VideoItem title="Watering Guide" duration="3:15" />
              <VideoItem title="Fertilizer Application" duration="5:20" />
            </div>
          </CardContent>
        </Card>

        <Button className="w-full" variant="outline">
          <VolumeUp className="w-5 h-5 mr-2" />
          Listen to All Guides
        </Button>
      </div>
    </>
  );
}

