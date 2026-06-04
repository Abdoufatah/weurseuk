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
  // Données auteur pour l'overlay de survol (articles natifs uniquement)
  authorName?: string | null;
  authorPhotoUrl?: string | null;
  authorRole?: string | null;
  // Type d'article pour les badges ("exclusive", "editorial", etc.)
  articleType?: string | null;
}

const ROLE_LABELS: Record<string, string> = {
  editor: "Éditorialiste",
  analyst: "Analyste",
  journalist: "Journaliste",
  reporter: "Reporter",
  contributor: "Contributeur",
};

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
  authorName,
  authorPhotoUrl,
  authorRole,
  articleType,
}: ArticleCardProps) {
  const regionLabel = region ? REGIONS[region as keyof typeof REGIONS] : null;

  // L'overlay auteur s'affiche uniquement sur les articles natifs (éditoriaux)
  // et seulement quand l'image d'illustration n'est pas la photo de l'auteur
  const showAuthorOverlay =
    isEditorial &&
    authorName &&
    authorPhotoUrl &&
    imageUrl &&
    !imageUrl.includes(authorPhotoUrl.replace("/manus-storage/", "").split("_")[0]);

  const roleLabel = authorRole ? (ROLE_LABELS[authorRole] ?? authorRole) : null;

  const content = (
    <div
      className={`group card-hover bg-card rounded-lg overflow-hidden border border-border/50 ${
        isFeatured ? "md:flex" : ""
      } ${className}`}
    >
      {imageUrl && (
        <div
          className={`relative overflow-hidden ${
            isFeatured
              ? "aspect-[16/9] md:aspect-auto md:w-2/5 md:min-h-[280px]"
              : "aspect-[16/9]"
          }`}
        >


          {/* Image principale */}
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Overlay auteur au survol — uniquement articles natifs avec image thématique */}
          {showAuthorOverlay && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4
                         bg-gradient-to-t from-black/85 via-black/60 to-transparent
                         opacity-0 group-hover:opacity-100
                         transition-opacity duration-300 ease-in-out"
            >
              {/* Photo auteur en cercle */}
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#C8933A] shadow-lg flex-shrink-0">
                <img
                  src={authorPhotoUrl!}
                  alt={authorName!}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Nom et rôle */}
              <div className="text-center">
                <p className="text-white font-semibold text-sm leading-tight">
                  {authorName}
                </p>
                {roleLabel && (
                  <p className="text-[#C8933A] text-xs mt-0.5 font-medium tracking-wide uppercase">
                    {roleLabel}
                  </p>
                )}
              </div>

              {/* Trait séparateur doré */}
              <div className="w-8 h-px bg-[#C8933A]/70" />

              {/* Courte accroche */}
              {excerpt && (
                <p className="text-white/80 text-xs text-center leading-relaxed line-clamp-2 max-w-[90%] italic">
                  {excerpt.substring(0, 100)}…
                </p>
              )}
            </div>
          )}
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
            <span style={{
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              padding: '2px 7px',
              borderRadius: '2px',
              color: '#C8933A',
              background: 'transparent',
              borderBottom: '1px solid rgba(200,147,58,0.5)',
            }}>
              Éditorial
            </span>
          )}
          {sourceName && !isEditorial && (
            <span className="text-[10px] text-muted-foreground">{sourceName}</span>
          )}
        </div>

        <h3
          className={`font-editorial font-semibold leading-tight text-card-foreground group-hover:text-primary transition-colors ${
            isFeatured ? "text-xl md:text-2xl mb-3" : "text-base mb-2"
          }`}
        >
          {title}
        </h3>

        {excerpt && (
          <p
            className={`text-muted-foreground leading-relaxed line-clamp-2 ${
              isFeatured ? "text-sm md:text-base" : "text-sm"
            }`}
          >
            {excerpt}
          </p>
        )}

        {/* Byline auteur sous l'extrait pour les articles natifs */}
        {isEditorial && authorName && (
          <p className="text-xs text-[#C8933A] mt-1.5 font-medium">
            Par {authorName}
            {roleLabel && <span className="text-muted-foreground font-normal"> · {roleLabel}</span>}
          </p>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{formatDate(publishedAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <ShareButtons
                title={title}
                url={
                  isEditorial && editorialSlug
                    ? `${
                        typeof window !== "undefined" ? window.location.origin : ""
                      }/editorial/${editorialSlug}`
                    : sourceUrl
                }
                ogUrl={
                  isEditorial && editorialSlug
                    ? `${
                        typeof window !== "undefined" ? window.location.origin : ""
                      }/api/og/editorial/${editorialSlug}`
                    : undefined
                }
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
              <span className="text-xs text-primary font-medium">Lire →</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (isEditorial && editorialSlug) {
    return <Link href={`/editorial/${editorialSlug}`}>{content}</Link>;
  }

  if (isInternalArticle && sourceUrl && sourceUrl.startsWith("/article/")) {
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
