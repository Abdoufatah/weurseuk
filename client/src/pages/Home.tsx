import { trpc } from "@/lib/trpc";
import { ASSETS, BENSIRAC } from "@shared/constants";
import { Link } from "wouter";
import ArticleCard from "@/components/ArticleCard";
import AdPlacement from "@/components/AdPlacement";
import { Newspaper, PenLine, Globe, ChevronRight } from "lucide-react";

export default function Home() {
  const { data: categories } = trpc.categories.list.useQuery();
  const { data: articles } = trpc.articles.list.useQuery({ limit: 12 });
  const { data: featuredArticles } = trpc.articles.featured.useQuery();
  const { data: editorials } = trpc.editorials.published.useQuery({ limit: 4, offset: 0 });

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
              <img src={ASSETS.logo} alt="Weurseuk" className="h-20 md:h-28 w-auto mb-4 drop-shadow-2xl" style={{ filter: 'brightness(1.8) drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }} />
              <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed">
                L'information de référence. Sénégal, Afrique de l'Ouest et perspectives mondiales.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <Link href="/editoriaux" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                  <PenLine className="w-4 h-4" />
                  Éditoriaux
                </Link>
                <Link href="/section/actualite" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-white/30 transition-colors">
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
            {/* Rubriques principales - Grille centralisée */}
            {categories && categories.length > 0 && (
              <section>
                <h2 className="font-editorial text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  Nos Rubriques
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                  {categories.filter(c => ["actualite", "politique-economie", "international", "societe", "analyses", "editorial"].includes(c.slug)).map((category) => (
                    <Link
                      key={category.id}
                      href={`/section/${category.slug}`}
                      className="group bg-white border border-border rounded-lg p-6 hover:border-primary hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-editorial text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {category.description || "Découvrez les derniers articles de cette rubrique"}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Banner Ad */}
            <AdPlacement type="banner" />

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
              <div className="space-y-3">
                {editorials && editorials.length > 0 ? (
                  editorials.map((editorial) => (
                    <Link
                      key={editorial.id}
                      href={`/editorial/${editorial.slug}`}
                      className="block text-sm font-medium text-foreground hover:text-primary transition-colors truncate"
                      title={editorial.title}
                    >
                      {editorial.title}
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Aucun éditorial disponible</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
