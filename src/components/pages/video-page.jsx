import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Image from "next/image"
import VideoThumbnail from "@/components/custom/video-thumbnail"

export default function VideoPage() {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-green-800">Learn & Improve</h2>
        <p className="text-sm text-muted-foreground">Watch videos to learn better farming techniques</p>
      </div>
      <div className="space-y-6">
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden">
          <div className="relative h-48 bg-green-900">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Video thumbnail"
              width={400}
              height={200}
              className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="icon"
                className="rounded-full w-12 h-12 bg-white/30 backdrop-blur-sm hover:bg-white/50">
                <Play className="w-6 h-6 text-white" />
              </Button>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium">Treating Early Blight in Potato Plants</h3>
            <p className="text-sm text-muted-foreground">3:45 • Dr. Sharma, Plant Pathologist</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <VideoThumbnail
            title="Proper Watering Techniques"
            duration="2:30"
            image="/placeholder.svg?height=100&width=180" />
          <VideoThumbnail
            title="Organic Pest Control"
            duration="4:15"
            image="/placeholder.svg?height=100&width=180" />
          <VideoThumbnail
            title="Soil Health Tips"
            duration="3:20"
            image="/placeholder.svg?height=100&width=180" />
          <VideoThumbnail
            title="Harvesting Guide"
            duration="5:10"
            image="/placeholder.svg?height=100&width=180" />
        </div>

        <Button variant="outline" className="w-full">
          View All Videos
        </Button>
      </div>
    </>
  );
}

