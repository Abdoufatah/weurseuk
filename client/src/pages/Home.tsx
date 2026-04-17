import { trpc } from "@/lib/trpc";
import { ASSETS, BENSIRAC } from "@shared/constants";
import { Link } from "wouter";
import { Newspaper, PenLine, ChevronRight, Clock, ExternalLink } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";

// Fallback categories if API fails
const FALLBACK_CATEGORIES = [
  { slug: "actualite", name: "Actualité" },
  { slug: "politique-economie", name: "Politique & Économie" },
  { slug: "international", name: "International" },
  { slug: "societe", name: "Société" },
  { slug: "analyses", name: "Analyses" },
  { slug: "editorial", name: "Éditorial" },
];

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

/* Compact article row for homepage — no image, minimal height */
function CompactArticle({ title, sourceName, region, publishedAt, sourceUrl }: {
  title: string;
  sourceName?: string;
  region?: string;
  publishedAt?: Date | string | null;
  sourceUrl?: string;
}) {
  const REGIONS: Record<string, string> = { senegal: "Sénégal", afrique_ouest: "Afrique de l'Ouest", monde: "Monde" };
  const regionLabel = region ? REGIONS[region] : null;

  const inner = (
    <div className="group flex items-start gap-2 py-2 border-b border-border/40 last:border-0 hover:bg-accent/30 px-2 -mx-2 rounded transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          {regionLabel && (
            <span className="text-[9px] font-semibold uppercase tracking-wider text-primary bg-accent px-1.5 py-px rounded">
              {regionLabel}
            </span>
          )}
          {sourceName && (
            <span className="text-[9px] text-muted-foreground">{sourceName}</span>
          )}
        </div>
        <h4 className="text-[13px] font-medium leading-snug text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h4>
      </div>
      <div className="flex-shrink-0 flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
        <Clock className="w-2.5 h-2.5" />
        <span>{formatDate(publishedAt)}</span>
      </div>
    </div>
  );

  if (sourceUrl) {
    return <a href={sourceUrl} target="_blank" rel="noopener noreferrer">{inner}</a>;
  }
  return inner;
}

export default function Home() {
  const { data: categories } = trpc.categories.list.useQuery();
  const { data: articles } = trpc.articles.list.useQuery({ limit: 12 });
  const { data: editorials } = trpc.editorials.byCategory.useQuery({ categoryId: 30009 });

  const displayCategories = (categories && categories.length > 0) ? categories : FALLBACK_CATEGORIES;
  const filteredCategories = displayCategories.filter(c =>
    ["actualite", "politique-economie", "international", "societe", "analyses", "editorial"].includes(c.slug)
  );

  // Split articles into 2 columns
  const leftArticles = articles?.slice(0, 6) ?? [];
  const rightArticles = articles?.slice(6, 12) ?? [];

  return (
    <div className="font-sans-editorial">
      {/* BANDE HERO : Logo + phrase en bandeau compact */}
      <section className="relative h-[100px] md:h-[120px] overflow-hidden">
        <img
          src={ASSETS.coverBanner}
          alt="Weurseuk"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container flex items-center gap-4">
            <img
              src={ASSETS.logo}
              alt="Weurseuk"
              className="h-12 md:h-16 w-auto drop-shadow-2xl"
              style={{ filter: 'brightness(1.8) drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}
            />
            <div>
              <p className="text-white/95 text-sm md:text-base font-medium leading-tight">
                L'information de référence
              </p>
              <p className="text-white/70 text-xs md:text-sm font-light">
                Sénégal &middot; Afrique de l'Ouest &middot; Monde
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOUTONS RUBRIQUES */}
      <section className="bg-card border-b border-border">
        <div className="container py-2">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {filteredCategories.map((category) => {
              const isEditorial = category.slug === 'editorial';
              const href = isEditorial ? '/editoriaux' : `/section/${category.slug}`;
              const styleClass = isEditorial
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-anthracite text-white hover:bg-anthracite/90";
              return (
                <Link
                  key={category.slug}
                  href={href}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded text-[11px] font-medium transition-all duration-200 cursor-pointer ${styleClass}`}
                >
                  {isEditorial ? <PenLine className="w-3 h-3" /> : <Newspaper className="w-3 h-3" />}
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTENU PRINCIPAL : 3 colonnes compactes */}
      <div className="container py-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">

          {/* Colonne gauche : articles 1-6 */}
          <div className="lg:col-span-5">
            <h2 className="font-editorial text-sm font-bold text-foreground flex items-center gap-2 mb-1">
              <span className="w-1 h-4 bg-primary rounded-full" />
              Dernières actualités
            </h2>
            <div>
              {leftArticles.map((article) => (
                <CompactArticle
                  key={article.id}
                  title={article.title}
                  sourceName={article.sourceName}
                  region={article.region}
                  publishedAt={article.publishedAt}
                  sourceUrl={article.sourceUrl}
                />
              ))}
            </div>
          </div>

          {/* Colonne centrale : articles 7-12 */}
          <div className="lg:col-span-4">
            <h2 className="font-editorial text-sm font-bold text-foreground flex items-center gap-2 mb-1">
              <span className="w-1 h-4 bg-primary rounded-full" />
              Fil d'info
            </h2>
            <div>
              {rightArticles.map((article) => (
                <CompactArticle
                  key={article.id}
                  title={article.title}
                  sourceName={article.sourceName}
                  region={article.region}
                  publishedAt={article.publishedAt}
                  sourceUrl={article.sourceUrl}
                />
              ))}
            </div>
          </div>

          {/* Sidebar droite : Éditoriaux + Bensirac */}
          <aside className="lg:col-span-3 space-y-3">
            {/* Éditoriaux récents */}
            {editorials && editorials.length > 0 && (
              <section>
                <h3 className="font-editorial text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary rounded-full" />
                  Éditoriaux
                </h3>
                <div className="space-y-2">
                  {editorials.slice(0, 3).map((editorial) => (
                    <Link
                      key={editorial.id}
                      href={`/editorial/${editorial.slug}`}
                      className="block group"
                    >
                      <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {editorial.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {editorial.publishedAt ? new Date(editorial.publishedAt).toLocaleDateString('fr-FR') : 'Récent'}
                      </p>
                    </Link>
                  ))}
                </div>
                <Link href="/editoriaux" className="text-[11px] text-primary font-medium hover:underline mt-1 inline-block">
                  Tous les éditoriaux →
                </Link>
              </section>
            )}

            {/* Profil Bensirac compact */}
            <section className="bg-card border border-border rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <PenLine className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <h4 className="font-editorial font-bold text-foreground text-xs">{BENSIRAC.alias}</h4>
                  <p className="text-[10px] text-muted-foreground">{BENSIRAC.title}</p>
                </div>
              </div>
              <p className="text-[11px] text-foreground leading-relaxed line-clamp-3">
                {BENSIRAC.bio}
              </p>
            </section>

            {/* Espace pub sidebar compact */}
            <div className="ad-label">
              <div
                className="border border-dashed border-border rounded-md flex items-center justify-center bg-muted/30"
                style={{ height: "200px" }}
              >
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground font-medium">Espace publicitaire</p>
                  <p className="text-[9px] text-muted-foreground/60 mt-0.5">160 x 600</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
