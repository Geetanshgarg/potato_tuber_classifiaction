import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export default function VideoThumbnail({ title, duration, image }) {
  return (
    <div className="space-y-1">
      <div className="relative h-24 rounded-lg overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={180}
          height={100}
          className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            size="icon"
            className="rounded-full w-8 h-8 bg-white/30 backdrop-blur-sm hover:bg-white/50">
            <Play className="w-4 h-4 text-white" />
          </Button>
        </div>
        <div
          className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">{duration}</div>
      </div>
      <p className="text-xs font-medium line-clamp-2">{title}</p>
    </div>
  );
}

