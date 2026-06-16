import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";

interface YouTubeVideo {
  videoId: string;
  channelId: string;
  channelName: string;
  title: string;
  thumbnailUrl: string | null;
  publishedAt: string | null;
}

interface YouTubeVideoSlotProps {
  /** Number of videos to display */
  count?: number;
  /** Layout variant */
  variant?: "sidebar" | "horizontal" | "grid";
  /** Additional CSS classes */
  className?: string;
}

export default function YouTubeVideoSlot({ 
  count = 4, 
  variant = "sidebar",
  className = "" 
}: YouTubeVideoSlotProps) {
  const { data: videos, isLoading } = trpc.youtube.getLatestVideos.useQuery(
    { limit: count },
    { 
      staleTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false 
    }
  );

  // Rotate videos every 30 seconds for sidebar
  const [startIndex, setStartIndex] = useState(0);
  
  useEffect(() => {
    if (variant === "sidebar" && videos && videos.length > count) {
      const timer = setInterval(() => {
        setStartIndex(prev => (prev + count) % videos.length);
      }, 30000);
      return () => clearInterval(timer);
    }
  }, [videos, count, variant]);

  if (isLoading) {
    return (
      <div className={`animate-pulse space-y-3 ${className}`}>
        {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-28 h-16 bg-muted rounded-md shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!videos || videos.length === 0) return null;

  const displayVideos = videos.slice(startIndex, startIndex + count);

  if (variant === "horizontal") {
    return (
      <div className={`${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
            <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="white"/>
          </svg>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vidéos tendances</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {displayVideos.map((video: YouTubeVideo) => (
            <a
              key={video.videoId}
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-video rounded-md overflow-hidden bg-muted">
                <img
                  src={video.thumbnailUrl || `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <p className="text-xs font-medium text-foreground mt-1.5 line-clamp-2 group-hover:text-primary transition-colors">
                {video.title}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{video.channelName}</p>
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className={`${className}`}>
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
            <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="white"/>
          </svg>
          <span className="text-sm font-bold text-foreground">Vidéos du Sénégal</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {displayVideos.map((video: YouTubeVideo) => (
            <a
              key={video.videoId}
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted shadow-sm">
                <img
                  src={video.thumbnailUrl || `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-medium line-clamp-2 drop-shadow-md">
                    {video.title}
                  </p>
                </div>
                <div className="absolute top-2 right-2 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-medium">
                  {video.channelName}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Default: sidebar variant
  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
          <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="white"/>
        </svg>
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vidéos tendances</span>
      </div>
      <div className="space-y-3">
        {displayVideos.map((video: YouTubeVideo) => (
          <a
            key={video.videoId}
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-3 group"
          >
            <div className="relative w-28 h-16 rounded-md overflow-hidden bg-muted shrink-0">
              <img
                src={video.thumbnailUrl || `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-white opacity-70 group-hover:opacity-100 transition-opacity drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {video.title}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">{video.channelName}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
