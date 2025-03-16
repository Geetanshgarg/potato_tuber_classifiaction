import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Image from "next/image"
import VideoThumbnail from "@/components/custom/video-thumbnail"
import { useLanguage } from "@/contexts/LanguageContext"
import { useState } from "react"

export default function VideoPage() {
  const { t } = useLanguage();
  const [playingVideo, setPlayingVideo] = useState(null);
  const [showAllVideos, setShowAllVideos] = useState(false);
  
  // YouTube video data
  const videos = [
    { id: 'caVlSPqUZ4E', duration: '4:52' },
    { id: 'nzx3CmxKR0I', duration: '8:44' },
    { id: 'N_q5je0n3y4', duration: '32:31' },
    { id: 'kCo2U3PJIik', duration: '8:02' },
    { id: 'yl42PZMdJos', duration: '23:55' },
    { id: 'LW5FCxJkFR0', duration: '14:40' },
  ];

  const playVideo = (videoId) => {
    setPlayingVideo(videoId);
    // Scroll to top to see the main player
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine which videos to display in the grid
  const displayedVideos = showAllVideos ? videos : videos.slice(0, 4);
  
  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-green-800">{t('learnImprove')}</h2>
        <p className="text-sm text-muted-foreground">{t('watchVideos')}</p>
      </div>
      <div className="space-y-6">
        {/* Main video player */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden">
          <div className="relative h-48 sm:h-64 bg-green-900">
            {playingVideo ? (
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1`} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            ) : (
              <>
                <Image
                  src={`https://img.youtube.com/vi/${videos[0].id}/hqdefault.jpg`}
                  alt="Video thumbnail"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="icon"
                    className="rounded-full w-12 h-12 bg-white/30 backdrop-blur-sm hover:bg-white/50"
                    onClick={() => playVideo(videos[0].id)}>
                    <Play className="w-6 h-6 text-white" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Video thumbnails grid */}
        <div className="grid grid-cols-2 gap-4">
          {displayedVideos.map((video, index) => (
            <div 
              key={video.id} 
              className="cursor-pointer" 
              onClick={() => playVideo(video.id)}
            >
              <VideoThumbnail
                title=""
                duration={video.duration}
                image={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
              />
            </div>
          ))}
        </div>

        {/* View All Videos button */}
        {!showAllVideos && videos.length > 4 && (
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => setShowAllVideos(true)}
          >
            {t('viewAllVideos')}
          </Button>
        )}
      </div>
    </>
  );
}

