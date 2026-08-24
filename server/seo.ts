import type { Request, Response } from "express";
import * as db from "./db";

export const SITE_ORIGIN = "https://weurseuk.com";
export const SITE_NAME = "Weurseuk";
export const SITE_DESCRIPTION = "L'information de référence. Sénégal, Afrique de l'Ouest et perspectives mondiales.";
export const SITE_LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663077132964/gZtFuPhj9JU8iVtsGM9iQB/LOGOTRANSPARENTWEURSEUK_a5b3c7d2.png";

type SitemapUrl = {
  loc: string;
  lastmod?: Date | null;
  changefreq?: "daily" | "weekly" | "monthly" | "hourly";
  priority?: number;
};

type SitemapEditorial = {
  slug: string;
  updatedAt?: Date | null;
};

type SitemapAggregatedArticle = {
  sourceUrl: string;
  fetchedAt?: Date | null;
  publishedAt?: Date | null;
};

const STATIC_SITEMAP_PATHS: SitemapUrl[] = [
  { loc: "/", changefreq: "daily", priority: 1 },
  { loc: "/actualite", changefreq: "hourly", priority: 0.9 },
  { loc: "/editoriaux", changefreq: "weekly", priority: 0.9 },
  { loc: "/politique-economie", changefreq: "daily", priority: 0.8 },
  { loc: "/international", changefreq: "daily", priority: 0.8 },
  { loc: "/societe", changefreq: "daily", priority: 0.8 },
  { loc: "/analyses", changefreq: "weekly", priority: 0.8 },
  { loc: "/essai", changefreq: "weekly", priority: 0.7 },
  { loc: "/dossiers", changefreq: "weekly", priority: 0.7 },
  { loc: "/television", changefreq: "daily", priority: 0.7 },
  { loc: "/a-propos", changefreq: "monthly", priority: 0.4 },
  { loc: "/contact", changefreq: "monthly", priority: 0.3 },
];

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function safeLastmod(value?: Date | null): string | undefined {
  if (!value || Number.isNaN(value.getTime())) return undefined;
  return value.toISOString().slice(0, 10);
}

function toAbsoluteUrl(pathOrUrl: string): string {
  return pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE_ORIGIN}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function buildSitemapXml(urls: SitemapUrl[]): string {
  const rows = urls.map((entry) => {
    const lastmod = safeLastmod(entry.lastmod);
    return [
      "  <url>",
      `    <loc>${escapeXml(toAbsoluteUrl(entry.loc))}</loc>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : undefined,
      entry.changefreq ? `    <changefreq>${entry.changefreq}</changefreq>` : undefined,
      entry.priority !== undefined ? `    <priority>${entry.priority.toFixed(1)}</priority>` : undefined,
      "  </url>",
    ].filter(Boolean).join("\n");
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join("\n")}\n</urlset>\n`;
}

export function buildWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_ORIGIN}/#organization`,
        name: SITE_NAME,
        url: SITE_ORIGIN,
        logo: {
          "@type": "ImageObject",
          url: SITE_LOGO_URL,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        name: SITE_NAME,
        url: SITE_ORIGIN,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
        inLanguage: "fr-SN",
      },
    ],
  };
}

export function buildNewsArticleStructuredData(input: {
  headline: string;
  description: string;
  canonicalUrl: string;
  image: string;
  datePublished?: Date | null;
  dateModified?: Date | null;
  authorName?: string | null;
  articleSection?: string | null;
}) {
  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: { "@type": "WebPage", "@id": input.canonicalUrl },
    headline: input.headline,
    description: input.description,
    image: [input.image],
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    inLanguage: "fr-SN",
  };

  if (input.datePublished) article.datePublished = input.datePublished.toISOString();
  if (input.dateModified) article.dateModified = input.dateModified.toISOString();
  if (input.authorName) article.author = { "@type": "Person", name: input.authorName };
  if (input.articleSection) article.articleSection = input.articleSection;

  return article;
}

export function buildBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function serializeStructuredData(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export async function getSitemapUrls(): Promise<SitemapUrl[]> {
  const [editorials, articles] = await Promise.all([
    db.getPublishedEditorials(500, 0),
    db.getAggregatedArticles(1000, 0),
  ]);

  const editorialUrls = (editorials as SitemapEditorial[]).map((editorial) => ({
    loc: `/editorial/${editorial.slug}`,
    lastmod: editorial.updatedAt,
    changefreq: "monthly" as const,
    priority: 0.8,
  }));

  const articleUrls = (articles as SitemapAggregatedArticle[])
    .filter((article) => article.sourceUrl.startsWith("/article/"))
    .map((article) => ({
      loc: article.sourceUrl,
      lastmod: article.fetchedAt ?? article.publishedAt,
      changefreq: "weekly" as const,
      priority: 0.6,
    }));

  return [...STATIC_SITEMAP_PATHS, ...editorialUrls, ...articleUrls];
}

export async function sitemapHandler(_req: Request, res: Response) {
  try {
    const urls = await getSitemapUrls();
    res
      .status(200)
      .setHeader("Content-Type", "application/xml; charset=utf-8")
      .setHeader("Cache-Control", "public, max-age=3600")
      .send(buildSitemapXml(urls));
  } catch (error) {
    console.error("[SEO] Sitemap generation failed", error);
    res.status(500).type("text/plain").send("Sitemap unavailable");
  }
}
