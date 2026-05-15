import { useRoute, useLocation } from "wouter";
import { Clock, Share2, ChevronLeft } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import { REGIONS } from "@shared/constants";
import { trpc } from "@/lib/trpc";

export default function ArticleDetail() {
  const [match, params] = useRoute("/article/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug;

  // Fetch article by slug from tRPC
  const { data: article, isLoading, error } = trpc.articles.bySlug.useQuery(
    { slug: slug || "" },
    { enabled: !!slug }
  );

  if (!match) return null;
  if (isLoading) return <div className="container py-12 text-center">Chargement...</div>;
  if (error || !article) {
    return (
      <div className="container py-12 text-center">
        <p className="text-muted-foreground mb-4">Article non trouvé</p>
        <button
          onClick={() => setLocation("/")}
          className="text-primary hover:underline flex items-center gap-1 justify-center"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const regionLabel = article.region ? REGIONS[article.region as keyof typeof REGIONS] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec bouton retour */}
      <div className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur-sm">
        <div className="container py-3 flex items-center gap-3">
          <button
            onClick={() => setLocation("/")}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-accent transition-colors"
            aria-label="Retour"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-editorial font-bold text-sm md:text-base text-foreground truncate">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Image hero */}
      {article.imageUrl && (
        <div className="w-full bg-muted">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      {/* Contenu principal */}
      <article className="container max-w-3xl py-8 md:py-12">
        {/* Métadonnées */}
        <div className="mb-6 pb-6 border-b border-border/50">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {regionLabel && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-accent px-2 py-0.5 rounded">
                {regionLabel}
              </span>
            )}
            {article.sourceName && (
              <span className="text-xs text-muted-foreground">{article.sourceName}</span>
            )}
          </div>

          <h1 className="font-editorial font-bold text-3xl md:text-4xl text-foreground mb-3 leading-tight">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-lg text-muted-foreground font-semibold leading-relaxed mb-4">
              {article.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {article.publishedAt && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>
                  {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Boutons de partage */}
        <div className="mb-8 pb-8 border-b border-border/50">
          <div className="flex items-center gap-2 mb-3">
            <Share2 className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Partager cet article
            </span>
          </div>
          <ShareButtons
            title={article.title}
            url={`${typeof window !== "undefined" ? window.location.origin : ""}/article/${slug}`}
            excerpt={article.excerpt || undefined}
            variant="horizontal"
          />
        </div>

        {/* Contenu de l'article */}
        {article.content && (
          <div className="prose prose-invert max-w-none mb-12">
            <div
              className="font-editorial text-foreground leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .split("\n\n")
                  .map((para: string) => {
                    // Convertir les **gras** en <strong>
                    const formatted = para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
                    return `<p>${formatted}</p>`;
                  })
                  .join(""),
              }}
            />
          </div>
        )}

        {/* Boutons de partage en bas */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Partager cet article
          </p>
          <ShareButtons
            title={article.title}
            url={`${typeof window !== "undefined" ? window.location.origin : ""}/article/${slug}`}
            excerpt={article.excerpt || undefined}
            variant="horizontal"
          />
        </div>
      </article>
    </div>
  );
}


