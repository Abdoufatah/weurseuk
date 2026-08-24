import { describe, expect, it } from "vitest";
import {
  SITE_ORIGIN,
  buildBreadcrumbStructuredData,
  buildNewsArticleStructuredData,
  buildSitemapXml,
  buildWebsiteStructuredData,
  serializeStructuredData,
} from "./seo";

describe("socle SEO public", () => {
  it("produit un sitemap XML avec des URL canoniques et des dates valides", () => {
    const xml = buildSitemapXml([
      { loc: "/", priority: 1, changefreq: "daily" },
      { loc: "/editorial/analyse-senegal", lastmod: new Date("2026-08-24T10:00:00Z"), priority: 0.8 },
    ]);

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain(`<loc>${SITE_ORIGIN}/editorial/analyse-senegal</loc>`);
    expect(xml).toContain("<lastmod>2026-08-24</lastmod>");
    expect(xml).toContain("<priority>0.8</priority>");
  });

  it("décrit la marque, l’article et son fil d’Ariane selon Schema.org", () => {
    const website = buildWebsiteStructuredData();
    const article = buildNewsArticleStructuredData({
      headline: "Une analyse de référence",
      description: "Un chapeau rigoureux.",
      canonicalUrl: `${SITE_ORIGIN}/editorial/analyse-senegal`,
      image: "https://images.example.org/cover.jpg",
      datePublished: new Date("2026-08-24T10:00:00Z"),
      authorName: "Bensirac",
      articleSection: "Éditoriaux",
    });
    const breadcrumbs = buildBreadcrumbStructuredData([
      { name: "Accueil", url: SITE_ORIGIN },
      { name: "Éditoriaux", url: `${SITE_ORIGIN}/editoriaux` },
    ]);

    expect(website["@graph"]).toHaveLength(2);
    expect(article["@type"]).toBe("NewsArticle");
    expect(article.mainEntityOfPage).toEqual({ "@type": "WebPage", "@id": `${SITE_ORIGIN}/editorial/analyse-senegal` });
    expect(breadcrumbs.itemListElement).toHaveLength(2);
    expect(serializeStructuredData({ value: "<script>" })).toContain("\\u003cscript>");
  });
});
