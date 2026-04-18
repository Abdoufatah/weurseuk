import { trpc } from "@/lib/trpc";
import { ASSETS, BENSIRAC } from "@shared/constants";
import { Link } from "wouter";
import ArticleCard from "@/components/ArticleCard";
import AdPlacement from "@/components/AdPlacement";
import { Newspaper, PenLine, Globe, ChevronRight } from "lucide-react";

// Fallback categories if API fails
const FALLBACK_CATEGORIES = [
  { slug: "actualite", name: "Actualité", description: "Dépêches et brèves pour l'immédiateté" },
  { slug: "politique-economie", name: "Politique & Économie", description: "Informations approfondies sur le Sénégal et l'Afrique" },
  { slug: "international", name: "International", description: "Dynamiques globales et perspectives mondiales" },
  { slug: "societe", name: "Société", description: "Éducation, santé, religion, environnement, faits de société" },
  { slug: "analyses", name: "Analyses", description: "Études de fond et décryptages critiques" },
  { slug: "editorial", name: "Éditorial", description: "Prises de position et ligne directrice du média" },
];

export default function Home() {
  const { data: categories } = trpc.categories.list.useQuery();
  const { data: articles } = trpc.articles.list.useQuery({ limit: 12 });
  const { data: featuredArticles } = trpc.articles.featured.useQuery();
  const { data: editorials } = trpc.editorials.byCategory.useQuery({ categoryId: 30009 });

  // Use fallback categories if API returns empty
  const displayCategories = (categories && categories.length > 0) ? categories : FALLBACK_CATEGORIES;
  const filteredCategories = displayCategories.filter(c => ["actualite", "politique-economie", "international", "societe", "analyses", "editorial"].includes(c.slug));

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
        <div className="absolute inset-0 flex flex-col justify-between">
          <div className="flex-1" />
          <div className="container pb-0">
            <div className="flex flex-col gap-3 items-start">
              <img src={ASSETS.logo} alt="Weurseuk" className="h-40 md:h-48 w-auto flex-shrink-0 drop-shadow-2xl" style={{ filter: 'brightness(1.8) drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }} />
              <p className="text-white/90 text-sm md:text-base font-light leading-snug max-w-sm text-left pb-8 md:pb-12">
                L'information de référence. Sénégal, Afrique de l'Ouest et perspectives mondiales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rubriques principales — REMONTÉES juste après le hero */}
      <section className="container mt-6">
        <h2 className="font-editorial text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Nos Rubriques
        </h2>
        <div className="flex flex-wrap gap-3 mb-10">
          {filteredCategories.map((category) => {
            const isEditorial = category.slug === 'editorial';
            const href = isEditorial ? '/editoriaux' : `/section/${category.slug}`;
            const icon = isEditorial ? <PenLine className="w-4 h-4" /> : <Newspaper className="w-4 h-4" />;
            const styleClass = isEditorial
              ? "bg-primary text-primary-foreground hover:opacity-90"
              : "bg-anthracite text-white hover:bg-anthracite/90";
            return (
              <Link
                key={category.slug}
                href={href}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${styleClass}`}
              >
                {icon}
                {category.name}
              </Link>
            );
          })}
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
            {/* Editorials Sidebar */}
            {editorials && editorials.length > 0 && (
              <section>
                <h3 className="font-editorial text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-primary rounded-full" />
                  Éditoriaux récents
                </h3>
                <div className="space-y-3">
                  {editorials.map((editorial) => (
                    <Link
                      key={editorial.id}
                      href={`/editorial/${editorial.slug}`}
                      className="block group"
                    >
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {editorial.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {editorial.publishedAt ? new Date(editorial.publishedAt).toLocaleDateString('fr-FR') : 'Récent'}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Bensirac Profile */}
            <section className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <PenLine className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-editorial font-bold text-foreground text-sm">{BENSIRAC.alias}</h4>
                  <p className="text-xs text-muted-foreground">{BENSIRAC.title}</p>
                </div>
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                {BENSIRAC.bio}
              </p>
              <Link href="/editoriaux" className="text-sm text-primary font-medium hover:underline">
                Voir tous les éditoriaux →
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
