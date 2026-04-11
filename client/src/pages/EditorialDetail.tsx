import { trpc } from "@/lib/trpc";
import { BENSIRAC } from "@shared/constants";
import { Link, useParams } from "wouter";
import AdPlacement from "@/components/AdPlacement";
import { ArrowLeft, Calendar, User } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import { Streamdown } from "streamdown";

export default function EditorialDetail() {
  const params = useParams<{ slug: string }>();
  const { data: editorial, isLoading, error } = trpc.editorials.bySlug.useQuery(
    { slug: params.slug || "" },
    { enabled: !!params.slug }
  );

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="h-8 bg-muted/30 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-muted/30 rounded animate-pulse w-1/2" />
          <div className="h-64 bg-muted/30 rounded animate-pulse mt-8" />
        </div>
      </div>
    );
  }

  if (error || !editorial) {
    return (
      <div className="container py-20 text-center">
        <h2 className="font-editorial text-2xl font-bold mb-4">Éditorial introuvable</h2>
        <p className="text-muted-foreground mb-6">Cet éditorial n'existe pas ou a été retiré.</p>
        <Link href="/editoriaux" className="text-primary font-medium hover:underline">
          ← Retour aux éditoriaux
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans-editorial">
      <div className="container py-8">
        <Link href="/editoriaux" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Retour aux éditoriaux
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            {/* Header */}
            <header className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground bg-primary px-2.5 py-1 rounded">
                Éditorial
              </span>
              <h1 className="font-editorial text-3xl md:text-4xl font-bold mt-4 leading-tight text-foreground">
                {editorial.title}
              </h1>
              {editorial.excerpt && (
                <p className="text-lg text-muted-foreground mt-4 leading-relaxed font-light italic">
                  {editorial.excerpt}
                </p>
              )}
              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={BENSIRAC.photo} alt={BENSIRAC.alias} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{BENSIRAC.alias}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {editorial.publishedAt
                        ? new Date(editorial.publishedAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "Non publié"}
                    </span>
                  </div>
                </div>
              </div>
            </header>

            {/* Cover image */}
            {editorial.coverImageUrl && (
              <div className="rounded-lg overflow-hidden mb-8">
                <img src={editorial.coverImageUrl} alt={editorial.title} className="w-full h-auto" />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none prose-headings:font-editorial prose-p:leading-relaxed prose-p:text-foreground/90">
              <Streamdown>{editorial.content}</Streamdown>
            </div>

            {/* Share */}
            <div className="mt-10 pt-6 border-t border-border">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <ShareButtons
                  title={editorial.title}
                  excerpt={editorial.excerpt || undefined}
                />
                <Link href="/profil-bensirac" className="text-sm text-primary font-medium hover:underline">
                  À propos de {BENSIRAC.alias} →
                </Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <AdPlacement type="mpu" />
            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="font-editorial text-base font-bold mb-3">À propos de l'auteur</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={BENSIRAC.photo} alt={BENSIRAC.alias} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{BENSIRAC.alias}</p>
                  <p className="text-xs text-primary">{BENSIRAC.title}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{BENSIRAC.bio}</p>
            </div>
            <AdPlacement type="mpu" />
          </aside>
        </div>
      </div>
    </div>
  );
}
