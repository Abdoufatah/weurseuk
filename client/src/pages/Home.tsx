import { trpc } from "@/lib/trpc";
import { ASSETS, BENSIRAC } from "@shared/constants";
import { Link } from "wouter";
import ArticleCard from "@/components/ArticleCard";
import AdPlacement from "@/components/AdPlacement";
import { Newspaper, PenLine, Globe, ChevronRight } from "lucide-react";

export default function Home() {
  const { data: articles } = trpc.articles.list.useQuery({ limit: 12 });
  const { data: featuredArticles } = trpc.articles.featured.useQuery();
  const { data: editorials } = trpc.editorials.published.useQuery({ limit: 4, offset: 0 });
  const { data: senegalArticles } = trpc.articles.list.useQuery({ limit: 6, region: "senegal" });
  const { data: afriqueArticles } = trpc.articles.list.useQuery({ limit: 6, region: "afrique_ouest" });

  return (
    <div className="min-h-screen font-sans-editorial">
      {/* Hero Banner */}
      <section className="relative h-[420px] md:h-[500px] overflow-hidden">
        <img
          src={ASSETS.coverBanner}
          alt="Weurseuk - Portail d'Information"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-10 md:pb-14">
            <div className="max-w-2xl">
              <img src={ASSETS.logo} alt="Weurseuk" className="h-16 md:h-20 w-auto mb-4 brightness-200 drop-shadow-lg" />
              <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed">
                L'information de référence. Sénégal, Afrique de l'Ouest et perspectives mondiales.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <Link href="/editoriaux" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                  <PenLine className="w-4 h-4" />
                  Éditoriaux
                </Link>
                <Link href="/section/senegal" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-white/30 transition-colors">
                  <Newspaper className="w-4 h-4" />
                  Actualités
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Ad */}
      <div className="container mt-6">
        <AdPlacement type="leaderboard" />
      </div>

      {/* Featured Articles */}
      {featuredArticles && featuredArticles.length > 0 && (
        <section className="container mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-editorial text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full" />
              À la Une
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArticles.slice(0, 1).map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                excerpt={article.excerpt}
                imageUrl={article.imageUrl}
                sourceUrl={article.sourceUrl}
                sourceName={article.sourceName}
                region={article.region}
                publishedAt={article.publishedAt}
                isFeatured
              />
            ))}
            <div className="space-y-4">
              {featuredArticles.slice(1, 4).map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  sourceUrl={article.sourceUrl}
                  sourceName={article.sourceName}
                  region={article.region}
                  publishedAt={article.publishedAt}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main content grid */}
      <div className="container mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Sénégal section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-editorial text-xl font-bold text-foreground flex items-center gap-2">
                  <span className="w-1 h-5 bg-primary rounded-full" />
                  Sénégal
                </h2>
                <Link href="/section/senegal" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                  Tout voir <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              {senegalArticles && senegalArticles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {senegalArticles.slice(0, 4).map((article) => (
                    <ArticleCard
                      key={article.id}
                      title={article.title}
                      excerpt={article.excerpt}
                      imageUrl={article.imageUrl}
                      sourceUrl={article.sourceUrl}
                      sourceName={article.sourceName}
                      publishedAt={article.publishedAt}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-muted/30 rounded-lg p-8 text-center">
                  <Newspaper className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">Les actualités du Sénégal apparaîtront ici dès l'activation des flux RSS.</p>
                </div>
              )}
            </section>

            {/* Banner Ad */}
            <AdPlacement type="banner" />

            {/* Afrique de l'Ouest section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-editorial text-xl font-bold text-foreground flex items-center gap-2">
                  <span className="w-1 h-5 bg-primary rounded-full" />
                  Afrique de l'Ouest
                </h2>
                <Link href="/section/afrique-ouest" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                  Tout voir <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              {afriqueArticles && afriqueArticles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {afriqueArticles.slice(0, 4).map((article) => (
                    <ArticleCard
                      key={article.id}
                      title={article.title}
                      excerpt={article.excerpt}
                      imageUrl={article.imageUrl}
                      sourceUrl={article.sourceUrl}
                      sourceName={article.sourceName}
                      publishedAt={article.publishedAt}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-muted/30 rounded-lg p-8 text-center">
                  <Globe className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">Les actualités d'Afrique de l'Ouest apparaîtront ici.</p>
                </div>
              )}
            </section>

            {/* All latest articles */}
            {articles && articles.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-editorial text-xl font-bold text-foreground flex items-center gap-2">
                    <span className="w-1 h-5 bg-primary rounded-full" />
                    Dernières actualités
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {articles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      title={article.title}
                      excerpt={article.excerpt}
                      imageUrl={article.imageUrl}
                      sourceUrl={article.sourceUrl}
                      sourceName={article.sourceName}
                      region={article.region}
                      publishedAt={article.publishedAt}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Bensirac editorial card */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={BENSIRAC.photo}
                  alt={BENSIRAC.alias}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-editorial text-lg font-bold">{BENSIRAC.alias}</h3>
                  <p className="text-white/80 text-sm">{BENSIRAC.title}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3">
                  {BENSIRAC.bio}
                </p>
                <Link href="/profil-bensirac" className="text-sm text-primary font-medium hover:underline">
                  Voir le profil complet →
                </Link>
              </div>
            </div>

            {/* Sidebar Ad */}
            <AdPlacement type="mpu" />

            {/* Latest editorials */}
            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="font-editorial text-lg font-bold mb-4 flex items-center gap-2">
                <PenLine className="w-4 h-4 text-primary" />
                Éditoriaux récents
              </h3>
              {editorials && editorials.length > 0 ? (
                <div className="space-y-4">
                  {editorials.map((ed) => (
                    <Link key={ed.id} href={`/editorial/${ed.slug}`} className="block group">
                      <h4 className="text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {ed.title}
                      </h4>
                      {ed.excerpt && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{ed.excerpt}</p>
                      )}
                      <p className="text-[10px] text-muted-foreground/70 mt-1.5">
                        {ed.publishedAt
                          ? new Date(ed.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
                          : ""}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Les éditoriaux de Bensirac apparaîtront ici.</p>
              )}
              <Link href="/editoriaux" className="block mt-4 text-sm text-primary font-medium hover:underline">
                Tous les éditoriaux →
              </Link>
            </div>

            {/* Second sidebar ad */}
            <AdPlacement type="mpu" />
          </aside>
        </div>
      </div>

      {/* Bottom leaderboard */}
      <div className="container my-10">
        <AdPlacement type="leaderboard" />
      </div>
    </div>
  );
}
