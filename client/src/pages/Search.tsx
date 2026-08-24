import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, FileSearch, Search as SearchIcon } from "lucide-react";
import { trpc } from "@/lib/trpc";

function getQueryFromLocation() {
  return new URLSearchParams(window.location.search).get("q")?.trim() ?? "";
}

export default function Search() {
  const [, navigate] = useLocation();
  const initialQuery = useMemo(getQueryFromLocation, []);
  const [query, setQuery] = useState(initialQuery);
  const [submittedQuery, setSubmittedQuery] = useState(initialQuery);
  const inputId = "site-search-input";
  const searchInput = submittedQuery.length >= 2 ? { q: submittedQuery } : undefined;
  const { data: results, isLoading } = trpc.search.query.useQuery(searchInput!, {
    enabled: Boolean(searchInput),
  });

  useEffect(() => {
    const syncWithHistory = () => {
      const nextQuery = getQueryFromLocation();
      setSubmittedQuery(nextQuery);
      setQuery(nextQuery);
    };
    window.addEventListener("popstate", syncWithHistory);
    return () => window.removeEventListener("popstate", syncWithHistory);
  }, []);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const normalized = query.trim();
    if (normalized.length < 2) return;
    setSubmittedQuery(normalized);
    navigate(`/recherche?q=${encodeURIComponent(normalized)}`);
  };

  return (
    <section className="container py-8 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="border-b border-primary/20 pb-5">
          <div className="flex items-center gap-2 text-primary">
            <FileSearch className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.16em]">Archives éditoriales</span>
          </div>
          <h1 className="mt-2 font-editorial text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Rechercher dans Weurseuk</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">Retrouvez analyses, enquêtes, éditoriaux, auteurs, rubriques et dépêches sourcées.</p>
        </div>

        <form className="mt-6 flex gap-2" onSubmit={submit} role="search">
          <label className="sr-only" htmlFor={inputId}>Rechercher un sujet, un auteur ou une rubrique</label>
          <input
            id={inputId}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex. Sénégal, Bensirac, économie…"
            className="h-11 min-w-0 flex-1 rounded-md border border-border bg-white px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25"
            autoFocus
          />
          <button type="submit" className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            <SearchIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Rechercher</span>
          </button>
        </form>

        {!submittedQuery && <p className="mt-6 text-sm text-muted-foreground">Saisissez au moins deux caractères pour interroger les contenus publiés.</p>}
        {submittedQuery && isLoading && <p className="mt-8 text-sm text-muted-foreground">Recherche en cours…</p>}
        {submittedQuery && !isLoading && results?.length === 0 && (
          <p className="mt-8 rounded-md border border-border bg-card p-4 text-sm text-muted-foreground">Aucun contenu publié ne correspond à « {submittedQuery} ». Essayez un mot plus général, une rubrique ou le nom d’un auteur.</p>
        )}
        {results && results.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{results.length} résultat{results.length > 1 ? "s" : ""} pour « {submittedQuery} »</p>
            <div className="divide-y divide-border rounded-lg border border-border bg-card">
              {results.map((result) => {
                const isExternalSource = result.contentType === "article" && Boolean(result.sourceUrl?.startsWith("http"));
                const href = result.contentType === "editorial"
                  ? `/${result.slug.includes("/") ? result.slug : `editorial/${result.slug}`}`
                  : isExternalSource ? result.sourceUrl! : `/article/${result.slug}`;
                const label = result.contentType === "editorial" ? result.categoryName || "Contenu natif" : result.sourceName || result.categoryName || "Dépêche";
                const byline = result.useAlias && result.authorAlias ? result.authorAlias : result.authorName || result.sourceName || "Weurseuk";
                return (
                  <Link key={`${result.contentType}-${result.id}`} href={href} className="group block p-4 transition-colors hover:bg-accent/45" target={isExternalSource ? "_blank" : undefined} rel={isExternalSource ? "noopener noreferrer" : undefined}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary">{label}</p>
                        <h2 className="mt-1 font-editorial text-lg font-bold leading-snug text-foreground group-hover:text-primary">{result.title}</h2>
                        {result.excerpt && <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{result.excerpt}</p>}
                        <p className="mt-2 text-xs text-muted-foreground">{byline}{result.publishedAt ? ` · ${new Date(result.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}` : ""}</p>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
