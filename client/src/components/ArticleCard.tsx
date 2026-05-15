import { Link } from "wouter";
import { ExternalLink, Clock } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import { REGIONS } from "@shared/constants";

interface ArticleCardProps {
  title: string;
  excerpt?: string | null;
  imageUrl?: string | null;
  sourceUrl?: string;
  sourceName?: string;
  region?: string;
  publishedAt?: Date | string | null;
  isEditorial?: boolean;
  editorialSlug?: string;
  isFeatured?: boolean;
  isInternalArticle?: boolean;
  className?: string;
}

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ArticleCard({
  title,
  excerpt,
  imageUrl,
  sourceUrl,
  sourceName,
  region,
  publishedAt,
  isEditorial = false,
  editorialSlug,
  isFeatured = false,
  isInternalArticle = false,
  className = "",
}: ArticleCardProps) {
  const regionLabel = region ? REGIONS[region as keyof typeof REGIONS] : null;

  const content = (
    <div className={`group card-hover bg-card rounded-lg overflow-hidden border border-border/50 ${isFeatured ? "md:flex" : ""} ${className}`}>
      {imageUrl && (
        <div className={`overflow-hidden ${isFeatured ? "md:w-2/5" : "aspect-[16/9]"}`}>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className={`p-4 ${isFeatured ? "md:w-3/5 md:p-6" : ""}`}>
        <div className="flex items-center gap-2 mb-2">
          {regionLabel && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-accent px-2 py-0.5 rounded">
              {regionLabel}
            </span>
          )}
          {isEditorial && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary-foreground bg-primary px-2 py-0.5 rounded">
              Éditorial
            </span>
          )}
          {sourceName && !isEditorial && (
            <span className="text-[10px] text-muted-foreground">{sourceName}</span>
          )}
        </div>
        <h3 className={`font-editorial font-semibold leading-tight text-card-foreground group-hover:text-primary transition-colors ${isFeatured ? "text-xl md:text-2xl mb-3" : "text-base mb-2"}`}>
          {title}
        </h3>
        {excerpt && (
          <p className={`text-muted-foreground leading-relaxed line-clamp-2 ${isFeatured ? "text-sm md:text-base" : "text-sm"}`}>
            {excerpt}
          </p>
        )}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{formatDate(publishedAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
              <ShareButtons
                title={title}
                url={isEditorial && editorialSlug ? `${typeof window !== 'undefined' ? window.location.origin : ''}/editorial/${editorialSlug}` : sourceUrl}
                ogUrl={isEditorial && editorialSlug ? `${typeof window !== 'undefined' ? window.location.origin : ''}/api/og/editorial/${editorialSlug}` : undefined}
                variant="compact"
                className="scale-75 origin-right"
              />
            </div>
            {sourceUrl && !isEditorial && (
              <span className="flex items-center gap-1 text-xs text-primary">
                Lire <ExternalLink className="w-3 h-3" />
              </span>
            )}
            {isEditorial && (
              <span className="text-xs text-primary font-medium">
                Lire →
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (isEditorial && editorialSlug) {
    return <Link href={`/editorial/${editorialSlug}`}>{content}</Link>;
  }

  if (isInternalArticle && sourceUrl && sourceUrl.startsWith('/article/')) {
    return <Link href={sourceUrl}>{content}</Link>;
  }

  if (sourceUrl) {
    return (
      <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
