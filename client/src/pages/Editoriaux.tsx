import { trpc } from "@/lib/trpc";
import { BENSIRAC } from "@shared/constants";
import ArticleCard from "@/components/ArticleCard";
import AdPlacement from "@/components/AdPlacement";
import { PenLine } from "lucide-react";

export default function Editoriaux() {
  const { data: editorials, isLoading } = trpc.editorials.byCategory.useQuery({ categoryId: 30009 });

  return (
    <div className="min-h-screen font-sans-editorial">
      {/* Hero */}
      <section className="bg-foreground text-background py-12 md:py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
              <img src={BENSIRAC.photo} alt={BENSIRAC.alias} className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <h1 className="font-editorial text-3xl md:text-4xl font-bold">Éditoriaux</h1>
              <p className="text-background/70 text-sm mt-1">
                par <span className="text-primary font-semibold">{BENSIRAC.alias}</span> — {BENSIRAC.title}
              </p>
            </div>
          </div>
          <p className="text-background/60 max-w-2xl leading-relaxed">
            Analyses approfondies, perspectives critiques et réflexions sur les dynamiques politiques, sociales et transnationales du Sénégal et de l'Afrique de l'Ouest.
          </p>
        </div>
      </section>

      <div className="container mt-8">
        <AdPlacement type="leaderboard" />
      </div>

      <div className="container mt-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-muted/30 rounded-lg h-40 animate-pulse" />
                ))}
              </div>
            ) : editorials && editorials.length > 0 ? (
              <div className="space-y-6">
                {editorials.map((ed) => (
                  <ArticleCard
                    key={ed.id}
                    title={ed.title}
                    excerpt={ed.excerpt}
                    imageUrl={ed.coverImageUrl}
                    publishedAt={ed.publishedAt}
                    isEditorial
                    editorialSlug={ed.slug}
                    isFeatured
                  />
                ))}
              </div>
            ) : (
              <div className="bg-muted/30 rounded-lg p-12 text-center">
                <PenLine className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-editorial text-lg font-semibold text-foreground mb-2">Aucun éditorial publié</h3>
                <p className="text-muted-foreground text-sm">
                  Les éditoriaux de Bensirac apparaîtront ici dès leur publication.
                </p>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-5">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-primary">
                  <img src={BENSIRAC.photo} alt={BENSIRAC.alias} className="w-full h-full object-cover object-top" />
                </div>
                <h3 className="font-editorial text-lg font-bold mt-3">{BENSIRAC.alias}</h3>
                <p className="text-sm text-primary">{BENSIRAC.title}</p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{BENSIRAC.bio}</p>
              </div>
            </div>
            <AdPlacement type="mpu" />
          </aside>
        </div>
      </div>
    </div>
  );
}
