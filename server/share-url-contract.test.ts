import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const articleCard = readFileSync(resolve(process.cwd(), "client/src/components/ArticleCard.tsx"), "utf8");
const editorialDetail = readFileSync(resolve(process.cwd(), "client/src/pages/EditorialDetail.tsx"), "utf8");
const shareButtons = readFileSync(resolve(process.cwd(), "client/src/components/ShareButtons.tsx"), "utf8");
const shareUrls = readFileSync(resolve(process.cwd(), "client/src/lib/shareUrls.ts"), "utf8");
const ogMiddleware = readFileSync(resolve(process.cwd(), "server/ogMiddleware.ts"), "utf8");

describe("contrat des liens de partage", () => {
  it("partage les éditoriaux avec leur URL canonique lisible, jamais la route interne OG", () => {
    expect(articleCard).toContain("/editorial/${editorialSlug}");
    expect(editorialDetail).not.toContain("/api/og/editorial/${params.slug}");
    expect(articleCard).not.toContain("/api/og/editorial/${editorialSlug}");
  });

  it("transforme une route interne d’article agrégé en URL complète et encode les cinq réseaux", () => {
    expect(articleCard).toContain('isInternalArticle && sourceUrl?.startsWith("/")');
    expect(articleCard).toContain("${typeof window !== \"undefined\" ? window.location.origin : \"\"}${sourceUrl}");
    expect(shareButtons).toContain('from "@/lib/shareUrls"');
    ["wa.me", "twitter.com/intent/tweet", "facebook.com/sharer", "linkedin.com/sharing", "t.me/share/url"].forEach((network) => {
      expect(shareUrls).toContain(network);
    });
    expect(shareUrls).toContain("encodeURIComponent(url)");
  });

  it("sert des métadonnées spécifiques aux rubriques natives et aux articles agrégés", () => {
    expect(ogMiddleware).toContain("politique-economie");
    expect(ogMiddleware).toContain("getAggregatedArticleBySlug");
    expect(ogMiddleware).toContain('req.path.match(/^\\/article\\/([^/]+)$/)');
    expect(ogMiddleware).toContain('article.imageUrl?.startsWith("http") ? article.imageUrl : LOGO_URL');
  });

  it("utilise la couverture native disponible avant le logo de repli", () => {
    expect(ogMiddleware).toContain("editorial.coverImageUrl?.startsWith('/manus-storage/')");
    expect(ogMiddleware).toContain("${origin}${editorial.coverImageUrl}");
    expect(ogMiddleware).toContain("PUBLIC_OG_IMAGES[slug] || coverImage || LOGO_URL");
  });
});
