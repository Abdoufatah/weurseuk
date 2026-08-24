import { useState } from "react";
import { Play } from "lucide-react";

type LazyYouTubeEmbedProps = {
  src: string;
  title: string;
  thumbnailUrl?: string;
  placeholderLabel?: string;
  ariaLabel: string;
};

export default function LazyYouTubeEmbed({ src, title, thumbnailUrl, placeholderLabel, ariaLabel }: LazyYouTubeEmbedProps) {
  const [isActive, setIsActive] = useState(false);

  if (isActive) {
    return (
      <iframe
        className="h-full w-full"
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      className="group relative h-full w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      aria-label={ariaLabel}
      onClick={() => setIsActive(true)}
    >
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <span className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950" aria-hidden="true">
          {placeholderLabel && <span className="absolute bottom-2 left-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/80">{placeholderLabel}</span>}
        </span>
      )}
      <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/35" aria-hidden="true" />
      <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition-transform group-hover:scale-110" aria-hidden="true">
        <Play className="ml-0.5 h-4 w-4 fill-current" />
      </span>
      {!thumbnailUrl && <span className="absolute right-2 top-2 rounded-full border border-white/20 bg-black/25 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-white/75" aria-hidden="true">Charger</span>}
      <span className="sr-only">{ariaLabel}</span>
    </button>
  );
}
