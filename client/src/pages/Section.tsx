import { trpc } from "@/lib/trpc";
import { useParams } from "wouter";
import ArticleCard from "@/components/ArticleCard";
import AdPlacement from "@/components/AdPlacement";
import { Newspaper } from "lucide-react";
import { useMemo } from "react";

const SECTION_CONFIG: Record<string, { title: string; region?: string; description: string }> = {
  senegal: {
    title: "Sénégal",
    region: "senegal",
    description: "Toute l'actualité politique, économique, sociale et culturelle du Sénégal.",
  },
  "afrique-ouest": {
    title: "Afrique de l'Ouest",
    region: "afrique_ouest",
    description: "Les événements majeurs, analyses régionales et dynamiques transnationales de l'Afrique de l'Ouest.",
  },
  monde: {
    title: "Monde",
    region: "monde",
    description: "Perspectives internationales et impact des événements mondiaux sur la région.",
  },
  culture: {
    title: "Culture",
    description: "Arts, littérature, musique, cinéma et patrimoine culturel.",
  },
  sport: {
    title: "Sport",
    description: "Actualités sportives du Sénégal, d'Afrique et du monde.",
  },
};

export default function Section() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  
  // Try to get config from SECTION_CONFIG first (for regions)
  let config = SECTION_CONFIG[slug];
  
  // If not found, fetch from categories
  const { data: category } = trpc.categories.bySlug.useQuery(
    { slug },
    { enabled: !config }
  );
  
  if (!config && category) {
    config = {
      title: category.name,
      description: category.description || "",
    };
  }
  
  if (!config) {
    config = {
      title: "Section",
      description: "Actualités",
    };
  }

  // For editorial categories (analyses, editoriaux, etc.), use editorials.byCategory
  // For region-based sections (senegal, afrique-ouest, monde), use articles.list
  const isEditorialCategory = !config.region;
  
  const { data: editorials, isLoading: editorialsLoading } = trpc.editorials.byCategory.useQuery(
    { categoryId: category?.id || 0 },
    { enabled: isEditorialCategory && !!category?.id }
  );
  
  const queryInput = useMemo(() => ({
    limit: 20 as const,
    offset: 0,
    ...(config.region ? { region: config.region } : {}),
  }), [config.region]);

  const { data: articles, isLoading: articlesLoading } = trpc.articles.list.useQuery(
    queryInput,
    { enabled: !isEditorialCategory }
  );
  
  const isLoading = isEditorialCategory ? editorialsLoading : articlesLoading;
  const displayItems = isEditorialCategory ? editorials : articles;

  return (
    <div className="min-h-screen font-sans-editorial">
      {/* Section header */}
      <section className="bg-foreground text-background py-10 md:py-14">
        <div className="container">
          <h1 className="font-editorial text-3xl md:text-4xl font-bold">{config.title}</h1>
          <p className="text-background/60 mt-2 max-w-2xl">{config.description}</p>
        </div>
      </section>

      <div className="container mt-6">
        <AdPlacement type="leaderboard" />
      </div>

      <div className="container mt-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-muted/30 rounded-lg h-32 animate-pulse" />
                ))}
              </div>
            ) : displayItems && displayItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayItems.map((item: any) => (
                  isEditorialCategory ? (
                    <a key={item.id} href={`/editorial/${item.slug}`}>
                      <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="font-editorial text-lg font-bold mb-2 line-clamp-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{item.excerpt}</p>
                          <div className="mt-auto text-xs text-muted-foreground">
                            {new Date(item.publishedAt).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <ArticleCard
                      key={item.id}
                      title={item.title}
                      excerpt={item.excerpt}
                      imageUrl={item.imageUrl}
                      sourceUrl={item.sourceUrl}
                      sourceName={item.sourceName}
                      region={item.region}
                      publishedAt={item.publishedAt}
                    />
                  )
                ))}
              </div>
            ) : (
              <div className="bg-muted/30 rounded-lg p-12 text-center">
                <Newspaper className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-editorial text-lg font-semibold mb-2">Aucun article disponible</h3>
                <p className="text-muted-foreground text-sm">
                  {isEditorialCategory ? "Aucun article de cette rubrique pour le moment." : "Les articles de cette section apparaîtront ici dès l'activation des flux RSS."}
                </p>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <AdPlacement type="mpu" />
            <AdPlacement type="mpu" />
          </aside>
        </div>
      </div>
    </div>
  );
}
