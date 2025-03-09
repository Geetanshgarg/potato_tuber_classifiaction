import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export default function VideoItem({ title, duration }) {
  return (
    <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
      <Button size="icon" variant="ghost" className="h-8 w-8">
        <Play className="w-4 h-4" />
      </Button>
      <div className="flex-1">
        <p className="text-sm font-medium text-green-800">{title}</p>
        <p className="text-xs text-green-600">{duration}</p>
      </div>
    </div>
  );
}

