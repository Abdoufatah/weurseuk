import { useState } from "react";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const ITEMS_PER_PAGE = 12;

export default function Category() {
  const [route, params] = useRoute("/section/:slug");
  const slug = params?.slug as string;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<number | null>(null);

  // Fetch category info
  const { data: category } = trpc.categories.bySlug.useQuery({ slug }, { enabled: !!slug });
  
  // Fetch editorials for this category
  const { data: allEditorials, isLoading } = trpc.editorials.byCategory.useQuery(
    { categoryId: category?.id || 0 },
    { enabled: !!category?.id }
  );

  // Fetch tags if category is "Société"
  const { data: tags } = trpc.tags.list.useQuery();

  // Filter editorials by tag if selected
  const filteredEditorials = selectedTag && slug === "societe"
    ? allEditorials?.filter((e: any) => e.tags?.some((t: any) => t.id === selectedTag))
    : allEditorials;

  // Pagination
  const totalPages = Math.ceil((filteredEditorials?.length || 0) / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEditorials = filteredEditorials?.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-editorial text-2xl font-bold mb-2">Rubrique non trouvée</h1>
          <p className="text-muted-foreground mb-6">La rubrique demandée n'existe pas.</p>
          <Link href="/" className="text-primary font-medium hover:underline">← Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  console.log('Category:', category, 'Slug:', slug);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 md:py-16">
        <div className="container">
          <h1 className="font-editorial text-4xl md:text-5xl font-bold mb-4">Section {category.name}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{category.description}</p>
        </div>
      </div>

      <div className="container py-12">
        {/* Tags filter for Société */}
        {slug === "societe" && tags && tags.length > 0 && (
          <div className="mb-8">
            <h3 className="font-editorial font-bold mb-4">Filtrer par thématique</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => { setSelectedTag(null); setCurrentPage(1); }}
              >
                Tous
              </Button>
              {tags.map((tag: any) => (
                <Button
                  key={tag.id}
                  variant={selectedTag === tag.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setSelectedTag(tag.id); setCurrentPage(1); }}
                >
                  #{tag.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Articles grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : paginatedEditorials && paginatedEditorials.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedEditorials.map((article: any) => (
                <Link key={article.id} href={`/editorial/${article.slug}`}>
                  <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                          {category.name}
                        </span>
                        {article.isFeatured && (
                          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                            En vedette
                          </span>
                        )}
                      </div>
                      <h3 className="font-editorial font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">{article.excerpt || article.content?.substring(0, 150)}</p>
                      <div className="text-xs text-muted-foreground">
                        {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-muted/30 rounded-lg p-12 text-center text-muted-foreground">
            <p>Aucun article dans cette rubrique pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
