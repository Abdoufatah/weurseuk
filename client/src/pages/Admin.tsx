import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import {
  PenLine, Newspaper, Rss, AlertTriangle, BarChart3,
  Plus, Trash2, Edit, Eye, EyeOff, Star, Loader2, ArrowLeft
} from "lucide-react";
import { toast } from "sonner";

type Tab = "editorials" | "articles" | "rss" | "breaking" | "stats";

export default function Admin() {
  const { user, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("editorials");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans-editorial">
        <div className="text-center">
          <h2 className="font-editorial text-2xl font-bold mb-4">Accès restreint</h2>
          <p className="text-muted-foreground mb-6">Connectez-vous pour accéder à l'administration.</p>
          <a href={getLoginUrl()} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium">
            Se connecter
          </a>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans-editorial">
        <div className="text-center">
          <h2 className="font-editorial text-2xl font-bold mb-4">Accès non autorisé</h2>
          <p className="text-muted-foreground mb-6">Seuls les administrateurs peuvent accéder à cette section.</p>
          <Link href="/" className="text-primary font-medium hover:underline">← Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "editorials", label: "Éditoriaux", icon: <PenLine className="w-4 h-4" /> },
    { id: "articles", label: "Articles", icon: <Newspaper className="w-4 h-4" /> },
    { id: "rss", label: "Sources RSS", icon: <Rss className="w-4 h-4" /> },
    { id: "breaking", label: "Breaking News", icon: <AlertTriangle className="w-4 h-4" /> },
    { id: "stats", label: "Statistiques", icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen font-sans-editorial bg-muted/20">
      <div className="bg-foreground text-background py-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-background/60 hover:text-background transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-editorial text-xl font-bold">Administration Weurseuk</h1>
          </div>
          <span className="text-sm text-background/60">{user?.name || "Admin"}</span>
        </div>
      </div>

      <div className="container mt-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-card rounded-lg border border-border p-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-6 mb-12">
          {activeTab === "editorials" && <EditorialsTab />}
          {activeTab === "articles" && <ArticlesTab />}
          {activeTab === "rss" && <RssTab />}
          {activeTab === "breaking" && <BreakingTab />}
          {activeTab === "stats" && <StatsTab />}
        </div>
      </div>
    </div>
  );
}

// ==================== EDITORIALS TAB ====================
function EditorialsTab() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const utils = trpc.useUtils();
  const { data: editorials, isLoading } = trpc.editorials.listAll.useQuery();
  const createMut = trpc.editorials.create.useMutation({
    onSuccess: () => {
      utils.editorials.listAll.invalidate();
      utils.editorials.published.invalidate();
      setShowForm(false);
      setTitle(""); setExcerpt(""); setContent("");
      toast.success("Éditorial créé avec succès");
    },
    onError: (err) => toast.error(err.message),
  });
  const deleteMut = trpc.editorials.delete.useMutation({
    onSuccess: () => {
      utils.editorials.listAll.invalidate();
      utils.editorials.published.invalidate();
      toast.success("Éditorial supprimé");
    },
  });
  const updateMut = trpc.editorials.update.useMutation({
    onSuccess: () => {
      utils.editorials.listAll.invalidate();
      utils.editorials.published.invalidate();
      toast.success("Éditorial mis à jour");
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-editorial text-lg font-bold">Gestion des éditoriaux</h2>
        <Button onClick={() => setShowForm(!showForm)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Nouvel éditorial
        </Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-lg border border-border p-6 space-y-4">
          <input
            type="text"
            placeholder="Titre de l'éditorial"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm"
          />
          <input
            type="text"
            placeholder="Résumé / chapeau (optionnel)"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm"
          />
          <textarea
            placeholder="Contenu de l'éditorial (Markdown supporté)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm font-mono"
          />
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="rounded" />
              Publier immédiatement
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="rounded" />
              Mettre en avant
            </label>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => createMut.mutate({ title, excerpt: excerpt || undefined, content, isPublished, isFeatured })}
              disabled={!title || !content || createMut.isPending}
              size="sm"
            >
              {createMut.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publier"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Annuler</Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-muted/30 rounded-lg animate-pulse" />)}</div>
      ) : editorials && editorials.length > 0 ? (
        <div className="space-y-2">
          {editorials.map((ed) => (
            <div key={ed.id} className="bg-card rounded-lg border border-border p-4 flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm truncate">{ed.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {ed.isPublished ? (
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded">Publié</span>
                  ) : (
                    <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Brouillon</span>
                  )}
                  {ed.isFeatured && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded">En vedette</span>}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateMut.mutate({ id: ed.id, isPublished: !ed.isPublished })}
                  title={ed.isPublished ? "Dépublier" : "Publier"}
                >
                  {ed.isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateMut.mutate({ id: ed.id, isFeatured: !ed.isFeatured })}
                  title={ed.isFeatured ? "Retirer de la une" : "Mettre en une"}
                >
                  <Star className={`w-3.5 h-3.5 ${ed.isFeatured ? "fill-primary text-primary" : ""}`} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { if (confirm("Supprimer cet éditorial ?")) deleteMut.mutate({ id: ed.id }); }}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-muted/30 rounded-lg p-8 text-center text-muted-foreground text-sm">
          Aucun éditorial. Cliquez sur "Nouvel éditorial" pour commencer.
        </div>
      )}
    </div>
  );
}

// ==================== ARTICLES TAB ====================
function ArticlesTab() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [region, setRegion] = useState<"senegal" | "afrique_ouest" | "monde">("senegal");
  const [isBreaking, setIsBreaking] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const utils = trpc.useUtils();
  const { data: articles, isLoading } = trpc.articles.list.useQuery({ limit: 50 });
  const createMut = trpc.articles.create.useMutation({
    onSuccess: () => {
      utils.articles.list.invalidate();
      utils.articles.featured.invalidate();
      setShowForm(false);
      setTitle(""); setExcerpt(""); setSourceUrl(""); setSourceName(""); setImageUrl("");
      toast.success("Article ajouté");
    },
    onError: (err) => toast.error(err.message),
  });
  const deleteMut = trpc.articles.delete.useMutation({
    onSuccess: () => {
      utils.articles.list.invalidate();
      toast.success("Article supprimé");
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-editorial text-lg font-bold">Articles agrégés</h2>
        <Button onClick={() => setShowForm(!showForm)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Ajouter manuellement
        </Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-lg border border-border p-6 space-y-4">
          <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm" />
          <input type="text" placeholder="Résumé" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm" />
          <div className="grid grid-cols-2 gap-4">
            <input type="url" placeholder="URL source" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm" />
            <input type="text" placeholder="Nom de la source" value={sourceName} onChange={(e) => setSourceName(e.target.value)} className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm" />
          </div>
          <input type="url" placeholder="URL image (optionnel)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm" />
          <div className="flex items-center gap-4">
            <select value={region} onChange={(e) => setRegion(e.target.value as any)} className="px-4 py-2.5 rounded-md border border-input bg-background text-sm">
              <option value="senegal">Sénégal</option>
              <option value="afrique_ouest">Afrique de l'Ouest</option>
              <option value="monde">Monde</option>
            </select>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={isBreaking} onChange={(e) => setIsBreaking(e.target.checked)} />
              Breaking News
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
              À la une
            </label>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => createMut.mutate({ title, excerpt: excerpt || undefined, sourceUrl, sourceName, imageUrl: imageUrl || undefined, region, isBreakingNews: isBreaking, isFeatured })}
              disabled={!title || !sourceUrl || !sourceName || createMut.isPending}
              size="sm"
            >
              {createMut.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ajouter"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Annuler</Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-14 bg-muted/30 rounded-lg animate-pulse" />)}</div>
      ) : articles && articles.length > 0 ? (
        <div className="space-y-2">
          {articles.map((a) => (
            <div key={a.id} className="bg-card rounded-lg border border-border p-3 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-sm truncate">{a.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{a.sourceName} — {a.region}</p>
              </div>
              <div className="flex items-center gap-1">
                <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-muted-foreground hover:text-primary">
                  <Eye className="w-3.5 h-3.5" />
                </a>
                <Button variant="outline" size="sm" onClick={() => { if (confirm("Supprimer ?")) deleteMut.mutate({ id: a.id }); }} className="text-destructive hover:text-destructive">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-muted/30 rounded-lg p-8 text-center text-muted-foreground text-sm">
          Aucun article agrégé. Ajoutez des sources RSS ou des articles manuellement.
        </div>
      )}
    </div>
  );
}

// ==================== RSS TAB ====================
function RssTab() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [region, setRegion] = useState<"senegal" | "afrique_ouest" | "monde">("senegal");

  const utils = trpc.useUtils();
  const { data: sources, isLoading } = trpc.rssSources.list.useQuery();
  const createMut = trpc.rssSources.create.useMutation({
    onSuccess: () => {
      utils.rssSources.list.invalidate();
      setShowForm(false);
      setName(""); setUrl("");
      toast.success("Source RSS ajoutée");
    },
    onError: (err) => toast.error(err.message),
  });
  const deleteMut = trpc.rssSources.delete.useMutation({
    onSuccess: () => {
      utils.rssSources.list.invalidate();
      toast.success("Source supprimée");
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-editorial text-lg font-bold">Sources RSS</h2>
        <Button onClick={() => setShowForm(!showForm)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Ajouter une source
        </Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-lg border border-border p-6 space-y-4">
          <input type="text" placeholder="Nom de la source (ex: Dakaractu)" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm" />
          <input type="url" placeholder="URL du flux RSS" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm" />
          <select value={region} onChange={(e) => setRegion(e.target.value as any)} className="px-4 py-2.5 rounded-md border border-input bg-background text-sm">
            <option value="senegal">Sénégal</option>
            <option value="afrique_ouest">Afrique de l'Ouest</option>
            <option value="monde">Monde</option>
          </select>
          <div className="flex gap-3">
            <Button onClick={() => createMut.mutate({ name, url, region })} disabled={!name || !url || createMut.isPending} size="sm">
              {createMut.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ajouter"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Annuler</Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-14 bg-muted/30 rounded-lg animate-pulse" />)}</div>
      ) : sources && sources.length > 0 ? (
        <div className="space-y-2">
          {sources.map((s) => (
            <div key={s.id} className="bg-card rounded-lg border border-border p-3 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-sm">{s.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{s.url}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded ${s.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {s.isActive ? "Actif" : "Inactif"}
                </span>
                <Button variant="outline" size="sm" onClick={() => { if (confirm("Supprimer cette source ?")) deleteMut.mutate({ id: s.id }); }} className="text-destructive hover:text-destructive">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-muted/30 rounded-lg p-8 text-center text-muted-foreground text-sm">
          Aucune source RSS configurée. Ajoutez les flux des médias sénégalais et ouest-africains.
        </div>
      )}
    </div>
  );
}

// ==================== BREAKING NEWS TAB ====================
function BreakingTab() {
  const [showForm, setShowForm] = useState(false);
  const [headline, setHeadline] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceName, setSourceName] = useState("");

  const utils = trpc.useUtils();
  const { data: news, isLoading } = trpc.breakingNews.active.useQuery();
  const createMut = trpc.breakingNews.create.useMutation({
    onSuccess: () => {
      utils.breakingNews.active.invalidate();
      setShowForm(false);
      setHeadline(""); setSourceUrl(""); setSourceName("");
      toast.success("Breaking news ajouté");
    },
    onError: (err) => toast.error(err.message),
  });
  const deleteMut = trpc.breakingNews.delete.useMutation({
    onSuccess: () => {
      utils.breakingNews.active.invalidate();
      toast.success("Breaking news supprimé");
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-editorial text-lg font-bold">Breaking News</h2>
        <Button onClick={() => setShowForm(!showForm)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Nouvelle alerte
        </Button>
      </div>

      {showForm && (
        <div className="bg-card rounded-lg border border-border p-6 space-y-4">
          <input type="text" placeholder="Titre de l'alerte" value={headline} onChange={(e) => setHeadline(e.target.value)} className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm" />
          <div className="grid grid-cols-2 gap-4">
            <input type="url" placeholder="URL source (optionnel)" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm" />
            <input type="text" placeholder="Nom de la source (optionnel)" value={sourceName} onChange={(e) => setSourceName(e.target.value)} className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-sm" />
          </div>
          <div className="flex gap-3">
            <Button onClick={() => createMut.mutate({ headline, sourceUrl: sourceUrl || undefined, sourceName: sourceName || undefined })} disabled={!headline || createMut.isPending} size="sm">
              {createMut.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publier l'alerte"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Annuler</Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">{[1,2].map(i => <div key={i} className="h-14 bg-muted/30 rounded-lg animate-pulse" />)}</div>
      ) : news && news.length > 0 ? (
        <div className="space-y-2">
          {news.map((n) => (
            <div key={n.id} className="bg-card rounded-lg border border-destructive/20 p-3 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                  <h3 className="font-medium text-sm truncate">{n.headline}</h3>
                </div>
                {n.sourceName && <p className="text-xs text-muted-foreground mt-0.5 ml-6">{n.sourceName}</p>}
              </div>
              <Button variant="outline" size="sm" onClick={() => { if (confirm("Supprimer ?")) deleteMut.mutate({ id: n.id }); }} className="text-destructive hover:text-destructive">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-muted/30 rounded-lg p-8 text-center text-muted-foreground text-sm">
          Aucune alerte active.
        </div>
      )}
    </div>
  );
}

// ==================== STATS TAB ====================
function StatsTab() {
  const { data: stats, isLoading } = trpc.stats.overview.useQuery();

  if (isLoading) return <div className="h-32 bg-muted/30 rounded-lg animate-pulse" />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-card rounded-lg border border-border p-6 text-center">
        <Newspaper className="w-8 h-8 text-primary mx-auto mb-2" />
        <p className="text-3xl font-bold font-editorial">{stats?.articleCount ?? 0}</p>
        <p className="text-sm text-muted-foreground mt-1">Articles agrégés</p>
      </div>
      <div className="bg-card rounded-lg border border-border p-6 text-center">
        <PenLine className="w-8 h-8 text-primary mx-auto mb-2" />
        <p className="text-3xl font-bold font-editorial">{stats?.editorialCount ?? 0}</p>
        <p className="text-sm text-muted-foreground mt-1">Éditoriaux</p>
      </div>
    </div>
  );
}
