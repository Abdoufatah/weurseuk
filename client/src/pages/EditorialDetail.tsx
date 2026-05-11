import { useState } from "react";
import { BENSIRAC } from "@shared/constants";
import { Link, useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import AdPlacement from "@/components/AdPlacement";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Send, Loader2 } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import { Streamdown } from "streamdown";
import { toast } from "sonner";

function CommentsSection({ editorialId }: { editorialId: number }) {
  const { user, isAuthenticated } = useAuth();
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState("");

  const utils = trpc.useUtils();
  const { data: comments, isLoading } = trpc.comments.forEditorial.useQuery({ editorialId });
  const createMut = trpc.comments.create.useMutation({
    onSuccess: () => {
      utils.comments.forEditorial.invalidate({ editorialId });
      setAuthorName("");
      setAuthorEmail("");
      setContent("");
      toast.success("Commentaire soumis pour modération");
    },
    onError: (err) => toast.error(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Veuillez vous connecter pour commenter");
      return;
    }
    createMut.mutate({ editorialId, authorName, authorEmail, content });
  };

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="font-editorial text-2xl font-bold mb-6">Commentaires</h3>

      {/* Comments list */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map(i => <div key={i} className="h-24 bg-muted/30 rounded-lg animate-pulse" />)}
        </div>
      ) : comments && comments.length > 0 ? (
        <div className="space-y-4 mb-8">
          {comments.map((comment: any) => (
            <div key={comment.id} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{comment.authorName}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm mb-8">Aucun commentaire pour le moment.</p>
      )}

      {/* Comment form */}
      {isAuthenticated ? (
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="font-editorial font-bold mb-4">Laisser un commentaire</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Votre nom"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
                className="px-4 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="email"
                placeholder="Votre email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                required
                className="px-4 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <textarea
              placeholder="Votre commentaire..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
            <Button
              type="submit"
              disabled={createMut.isPending || !authorName || !authorEmail || !content}
              className="gap-2"
            >
              {createMut.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Envoi...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Publier le commentaire
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground">Votre commentaire sera modéré avant publication.</p>
          </form>
        </div>
      ) : (
        <div className="bg-muted/30 rounded-lg p-6 text-center">
          <p className="text-sm text-muted-foreground mb-4">Connectez-vous pour laisser un commentaire</p>
          <a href={getLoginUrl()} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium">
            Se connecter
          </a>
        </div>
      )}
    </div>
  );
}

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

  // Déterminer les infos auteur : profil lié en priorité, sinon Bensirac par défaut
  const isBensirac = !editorial.authorPhotoUrl || editorial.authorName === 'Bensirac';
  const authorPhoto = editorial.authorPhotoUrl || BENSIRAC.photo;
  const authorDisplayName = editorial.authorAlias || editorial.authorName || BENSIRAC.alias;
  const authorBioText = editorial.authorBio || BENSIRAC.bio;

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

              {/* Chapeau + photo auteur côte à côte */}
              {editorial.excerpt && (
                <div className="flex items-start gap-5 mt-5 p-5 bg-muted/20 rounded-lg border-l-4 border-primary">
                  <div className="flex-shrink-0">
                    <img
                      src={authorPhoto}
                      alt={authorDisplayName}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover object-top shadow-md"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-light italic">
                      {editorial.excerpt}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-primary">{authorDisplayName}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={authorPhoto} alt={authorDisplayName} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{authorDisplayName}</p>
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
            {editorial.content && editorial.content.trim().startsWith('<') ? (
              <div
                className="editorial-html-content"
                dangerouslySetInnerHTML={{ __html: editorial.content }}
              />
            ) : (
              <div className="prose prose-lg max-w-none prose-headings:font-editorial prose-p:leading-relaxed prose-p:text-foreground/90">
                <Streamdown>{editorial.content}</Streamdown>
              </div>
            )}

            {/* Share */}
            <div className="mt-10 pt-6 border-t border-border">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <ShareButtons
                  title={editorial.title}
                  excerpt={editorial.excerpt || undefined}
                  url={`${window.location.origin}/editorial/${params.slug}`}
                  ogUrl={`${window.location.origin}/api/og/editorial/${params.slug}`}
                />
                {isBensirac ? (
                  <Link href="/profil-bensirac" className="text-sm text-primary font-medium hover:underline">
                    À propos de {BENSIRAC.alias} →
                  </Link>
                ) : (
                  <span className="text-sm text-primary font-medium">{authorDisplayName}</span>
                )}
              </div>
            </div>

            {/* Comments Section */}
            {editorial.id && <CommentsSection editorialId={editorial.id} />}
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <AdPlacement type="mpu" />
            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="font-editorial text-base font-bold mb-3">À propos de l'auteur</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={authorPhoto} alt={authorDisplayName} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{authorDisplayName}</p>
                  {isBensirac && <p className="text-xs text-primary">{BENSIRAC.title}</p>}
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{authorBioText}</p>
            </div>
            <AdPlacement type="mpu" />
          </aside>
        </div>
      </div>
    </div>
  );
}
