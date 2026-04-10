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
  const config = SECTION_CONFIG[params.slug || ""] || {
    title: "Section",
    description: "Actualités",
  };

  const queryInput = useMemo(() => ({
    limit: 20 as const,
    offset: 0,
    ...(config.region ? { region: config.region } : {}),
  }), [config.region]);

  const { data: articles, isLoading } = trpc.articles.list.useQuery(queryInput);

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
            ) : articles && articles.length > 0 ? (
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
            ) : (
              <div className="bg-muted/30 rounded-lg p-12 text-center">
                <Newspaper className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-editorial text-lg font-semibold mb-2">Aucun article disponible</h3>
                <p className="text-muted-foreground text-sm">
                  Les articles de cette section apparaîtront ici dès l'activation des flux RSS.
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
