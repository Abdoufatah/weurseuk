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
  const { data: latestEditorial } = trpc.editorials.latest.useQuery();

  // Use fallback categories if API returns empty
  const displayCategories = (categories && categories.length > 0) ? categories : FALLBACK_CATEGORIES;
  const filteredCategories = displayCategories.filter(c => ["actualite", "politique-economie", "international", "societe", "analyses", "editorial"].includes(c.slug));

  return (
    <div className="min-h-screen font-sans-editorial">

      {/* ===== HERO IMMERSIF : image de fond + À la Une superposés ===== */}
      <section className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - 112px)', minHeight: '400px', maxHeight: '560px' }}>
        {/* Vidéo de fond pleine largeur — autoplay, silencieuse, en boucle */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
          poster={ASSETS.coverBanner}
        >
          <source src="/manus-storage/hero-video_61b2ff3e.mp4" type="video/mp4" />
          {/* Fallback image si la vidéo ne charge pas */}
          <img src={ASSETS.coverBanner} alt="Weurseuk - Portail d'Information" className="w-full h-full object-cover" />
        </video>
        {/* Dégradé léger en bas uniquement pour la transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Logo Weurseuk — bas droite, bien visible */}
        <div className="absolute bottom-4 right-0">
          <div className="container flex justify-end">
            <img
              src={ASSETS.logo}
              alt="Weurseuk"
              className="h-20 md:h-24 w-auto drop-shadow-2xl"
              style={{ filter: 'brightness(2.2) drop-shadow(0 2px 16px rgba(0,0,0,0.9))' }}
            />
          </div>
        </div>
      </section>

      {/* ===== BLOC À LA UNE — chevauchement sur le hero ===== */}
      {latestEditorial && (
        <div className="relative z-10" style={{ marginTop: '-3rem', animation: 'fadeSlideUp 0.8s ease-out 0.3s both' }}>
          <div className="container pb-2">
            {/* Label À la Une */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-xs font-semibold uppercase tracking-widest flex items-center gap-2">
                <span className="w-4 h-px bg-primary inline-block" />
                À la Une
              </span>
              <Link href="/editoriaux" className="text-primary text-xs font-medium hover:underline flex items-center gap-1">
                Tous les éditoriaux <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            {/* Carte éditoriale compacte */}
            <Link href={`/editorial/${latestEditorial.slug}`} className="group block">
              <div className="flex gap-0 rounded-lg overflow-hidden border border-white/10 bg-black/70 backdrop-blur-md shadow-xl hover:bg-black/80 transition-colors">
                {/* Photo auteur */}
                {latestEditorial.coverImageUrl ? (
                  <div className="w-24 md:w-32 flex-shrink-0 overflow-hidden">
                    <img
                      src={latestEditorial.coverImageUrl}
                      alt={latestEditorial.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (latestEditorial as any).authorPhotoUrl ? (
                  <div className="w-24 md:w-32 flex-shrink-0 overflow-hidden">
                    <img
                      src={(latestEditorial as any).authorPhotoUrl}
                      alt={(latestEditorial as any).authorName || 'Auteur'}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : null}
                {/* Contenu textuel */}
                <div className="flex-1 px-4 py-3 flex flex-col justify-between">
                  <div>
                    <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5 uppercase tracking-wide">
                      Éditorial
                    </span>
                    <h3 className="font-editorial text-sm md:text-base font-bold text-white leading-snug mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
                      {latestEditorial.title}
                    </h3>
                    {latestEditorial.excerpt && (
                      <p className="text-white/85 text-xs leading-relaxed line-clamp-2 hidden md:block">
                        {latestEditorial.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20">
                    <div className="flex items-center gap-1.5">
                      {(latestEditorial as any).authorName && (
                        <span className="text-xs text-white/80 font-semibold">{(latestEditorial as any).authorName}</span>
                      )}
                      {latestEditorial.publishedAt && (
                        <span className="text-xs text-white/55">
                          · {new Date(latestEditorial.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-primary font-semibold group-hover:underline">
                      Lire →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

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
