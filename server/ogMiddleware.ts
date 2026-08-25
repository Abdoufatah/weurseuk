/**
 * Open Graph Middleware
 * Détecte les bots des réseaux sociaux (Facebook, Twitter, LinkedIn, Telegram, WhatsApp)
 * et leur sert une page HTML avec les bonnes balises Open Graph dynamiques.
 * Les visiteurs humains reçoivent normalement le React SPA.
 */
import { Request, Response, NextFunction } from "express";
import { getAggregatedArticleBySlug, getEditorialBySlug } from "./db";
import {
  buildBreadcrumbStructuredData,
  buildNewsArticleStructuredData,
  buildWebsiteStructuredData,
  serializeStructuredData,
} from "./seo";

// Liste des user-agents des bots de réseaux sociaux
const SOCIAL_BOT_PATTERNS = [
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
  /telegrambot/i,
  /whatsapp/i,
  /slackbot/i,
  /discordbot/i,
  /googlebot/i,
  /bingbot/i,
  /applebot/i,
  /pinterest/i,
];

function isSocialBot(userAgent: string): boolean {
  return SOCIAL_BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663077132964/gZtFuPhj9JU8iVtsGM9iQB/LOGOTRANSPARENTWEURSEUK_a5b3c7d2.png";

function buildOgHtmlWithRedirect(params: {
  title: string;
  description: string;
  ogUrl: string;
  canonicalUrl: string;
  image: string;
  type?: string;
  structuredData?: unknown[];
}): string {
  const { title, description, ogUrl, canonicalUrl, image, type = "article", structuredData = [] } = params;
  const escaped = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>${escaped(title)}</title>
  <meta name="description" content="${escaped(description)}" />
  <link rel="canonical" href="${escaped(canonicalUrl)}" />
  <!-- Redirection immédiate pour les navigateurs humains (WebView Facebook, Safari, Chrome) -->
  <meta http-equiv="refresh" content="0;url=${escaped(canonicalUrl)}" />
  <!-- Open Graph -->
  <meta property="og:type" content="${type}" />
  <meta property="og:title" content="${escaped(title)}" />
  <meta property="og:description" content="${escaped(description)}" />
  <meta property="og:url" content="${escaped(ogUrl)}" />
  <meta property="og:image" content="${escaped(image)}" />
  <meta property="og:image:secure_url" content="${escaped(image)}" />
  <meta property="og:image:alt" content="${escaped(title)}" />
  <meta property="og:site_name" content="Weurseuk" />
  <meta property="og:locale" content="fr_FR" />
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escaped(title)}" />
  <meta name="twitter:description" content="${escaped(description)}" />
  <meta name="twitter:image" content="${escaped(image)}" />
  <meta name="twitter:image:alt" content="${escaped(title)}" />
  ${structuredData.map((data) => `<script type="application/ld+json">${serializeStructuredData(data)}</script>`).join("\n  ")}
  <!-- Fallback JS redirect -->
  <script>window.location.replace("${escaped(canonicalUrl)}");</script>
</head>
<body>
  <h1>${escaped(title)}</h1>
  <p>${escaped(description)}</p>
  <a href="${escaped(canonicalUrl)}">Lire l'article complet sur Weurseuk</a>
</body>
</html>`;
}

function buildOgHtml(params: {
  title: string;
  description: string;
  url: string;
  image: string;
  type?: string;
}): string {
  const { title, description, url, image, type = "article" } = params;
  const escaped = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>${escaped(title)}</title>
  <meta name="description" content="${escaped(description)}" />
  <link rel="canonical" href="${escaped(url)}" />
  <!-- Open Graph -->
  <meta property="og:type" content="${type}" />
  <meta property="og:title" content="${escaped(title)}" />
  <meta property="og:description" content="${escaped(description)}" />
  <meta property="og:url" content="${escaped(url)}" />
  <meta property="og:image" content="${escaped(image)}" />
  <meta property="og:image:secure_url" content="${escaped(image)}" />
  <meta property="og:image:alt" content="${escaped(title)}" />
  <meta property="og:site_name" content="Weurseuk" />
  <meta property="og:locale" content="fr_FR" />
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escaped(title)}" />
  <meta name="twitter:description" content="${escaped(description)}" />
  <meta name="twitter:image" content="${escaped(image)}" />
  <meta name="twitter:image:alt" content="${escaped(title)}" />
  <script type="application/ld+json">${serializeStructuredData(buildWebsiteStructuredData())}</script>
</head>
<body>
  <h1>${escaped(title)}</h1>
  <p>${escaped(description)}</p>
  <a href="${escaped(url)}">Lire l'article complet sur Weurseuk</a>
</body>
</html>`;
}

export function ogMiddleware() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userAgent = req.headers["user-agent"] || "";
    console.log(`[OG-DEBUG] path=${req.path} ua=${userAgent.substring(0, 60)} isBot=${isSocialBot(userAgent)}`);

    // Ignorer les fichiers statiques (CSS, JS, images, etc.)
    if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/i)) {
      return next();
    }

    // Quand monté sur /api/og, la route est /api/og/editorial/:slug ou /api/og/:slug
    // req.path sera /editorial/:slug ou /:slug selon le montage
    // En production sur Cloud Run, req.get("host") retourne l'hôte interne.
    // On utilise le domaine public connu, avec fallback sur l'hôte local pour le dev.
    const host = req.get("host") || "";
    const isLocalDev = host.includes("localhost") || host.includes("127.0.0.1") || host.includes(".manus.computer");
    const origin = isLocalDev
      ? `${req.protocol}://${host}`
      : "https://weurseuk.com";

    // Routes natives : /:slug lorsque le middleware est monté sur /editorial,
    // ou /rubrique/:slug lorsqu'il est monté globalement en production.
    const editorialMatch = req.path.match(/^(?:\/(?:editorial|editoriaux|analyses|politique-economie|essai|dossiers))?\/([^/]+)$/);
    if (editorialMatch) {
      const slug = editorialMatch[1];
      // RÈGLE : seuls les bots sociaux reçoivent la page OG HTML.
      // Les humains (y compris WebView Facebook) doivent recevoir le SPA React.
      // Cela s'applique quel que soit le point de montage du middleware.
      if (!isSocialBot(userAgent)) {
        return next();
      }
      try {
        const editorial = await getEditorialBySlug(slug);
        if (editorial) {
          const title = `${editorial.title} — Weurseuk`;
          // og:description = excerpt complet en priorité, sinon extrait du contenu
          const description =
            editorial.excerpt ||
            editorial.content.replace(/<[^>]+>/g, "").substring(0, 200) + "...";
          // La route singulière est l’URL canonique historique et contractuelle des contenus natifs.
          // Les routes de rubrique restent des accès de navigation secondaires.
          const catSlug = (editorial as any).categorySlug || 'editorial';
          const canonicalUrl = `${origin}/editorial/${slug}`;
          // ogUrl = URL canonique de l'article (Facebook doit scraper la page de l'article directement)
          const ogUrl = canonicalUrl;
          // og:image : utiliser une image CDN publique (sans signature) pour Facebook
          // Les images /manus-storage/* utilisent des URLs signées CloudFront qui expirent.
          // Mapping slug -> URL image publique permanente (Imgur ou autre CDN public)
          const PUBLIC_OG_IMAGES: Record<string, string> = {
            'recomposition-silencieuse-limogeage-sonko-diomaye': 'https://i.imgur.com/s2BDkNU.jpeg',
          };
          // Une couverture interne est exposée via le proxy stable du portail :
          // le robot social obtient ainsi une redirection fraîche vers le CDN à chaque récupération.
          const coverImage = editorial.coverImageUrl?.startsWith('/manus-storage/')
            ? `${origin}${editorial.coverImageUrl}?v=${editorial.updatedAt?.getTime?.() ?? editorial.publishedAt?.getTime?.() ?? "1"}`
            : editorial.coverImageUrl?.startsWith("https://")
              ? editorial.coverImageUrl
              : undefined;
          const image = PUBLIC_OG_IMAGES[slug] || coverImage || LOGO_URL;
          const authorName = editorial.useAlias && editorial.authorAlias ? editorial.authorAlias : editorial.authorName;
          const structuredData = [
            buildWebsiteStructuredData(),
            buildNewsArticleStructuredData({
              headline: editorial.title,
              description,
              canonicalUrl,
              image,
              datePublished: editorial.publishedAt,
              dateModified: editorial.updatedAt,
              authorName,
              articleSection: editorial.categoryName,
            }),
            buildBreadcrumbStructuredData([
              { name: "Accueil", url: origin },
              { name: editorial.categoryName || "Éditoriaux", url: `${origin}/${catSlug}` },
              { name: editorial.title, url: canonicalUrl },
            ]),
          ];

          return res
            .status(200)
            .setHeader("Content-Type", "text/html; charset=utf-8")
            .setHeader("Cache-Control", "no-store, no-cache, must-revalidate")
            .send(buildOgHtmlWithRedirect({ title, description, ogUrl, canonicalUrl, image, structuredData }));
        }
      } catch (err) {
        console.error("[OG Middleware] Error fetching editorial:", err);
      }
    }

    // Route des articles agrégés sauvegardés dans Weurseuk : /article/:slug.
    // Les lecteurs humains reçoivent le SPA ; les robots sociaux reçoivent un aperçu exploitable.
    const aggregatedArticleMatch = req.path.match(/^\/article\/([^/]+)$/);
    if (aggregatedArticleMatch) {
      if (!isSocialBot(userAgent)) {
        return next();
      }
      try {
        const slug = aggregatedArticleMatch[1];
        const article = await getAggregatedArticleBySlug(slug);
        if (article) {
          const canonicalUrl = `${origin}/article/${slug}`;
          const description =
            article.excerpt ||
            article.content?.replace(/<[^>]+>/g, "").substring(0, 200) ||
            `Article sélectionné par Weurseuk depuis ${article.sourceName}.`;
          const image = article.imageUrl?.startsWith("http") ? article.imageUrl : LOGO_URL;
          const structuredData = [
            buildWebsiteStructuredData(),
            buildNewsArticleStructuredData({
              headline: article.title,
              description,
              canonicalUrl,
              image,
              datePublished: article.publishedAt,
              dateModified: article.fetchedAt ?? article.publishedAt,
              authorName: article.sourceName,
              articleSection: article.region,
            }),
            buildBreadcrumbStructuredData([
              { name: "Accueil", url: origin },
              { name: "Actualité", url: `${origin}/actualite` },
              { name: article.title, url: canonicalUrl },
            ]),
          ];
          return res
            .status(200)
            .setHeader("Content-Type", "text/html; charset=utf-8")
            .setHeader("Cache-Control", "no-store, no-cache, must-revalidate")
            .send(buildOgHtmlWithRedirect({
              title: `${article.title} — Weurseuk`,
              description,
              ogUrl: canonicalUrl,
              canonicalUrl,
              image,
              structuredData,
            }));
        }
      } catch (err) {
        console.error("[OG Middleware] Error fetching aggregated article:", err);
      }
    }

    // Route : / (page d'accueil) — uniquement pour les bots sociaux
    if (req.path === "/" || req.path === "") {
      if (!isSocialBot(userAgent)) {
        return next();
      }
      const title = "Weurseuk — Portail d'Information Sénégal / Afrique de l'Ouest";
      const description =
        "L'information de référence. Sénégal, Afrique de l'Ouest et perspectives mondiales. Éditoriaux, analyses et actualités en continu.";
      const url = origin;
      return res
        .status(200)
        .setHeader("Content-Type", "text/html; charset=utf-8")
        .setHeader("Cache-Control", "public, max-age=300")
        .send(buildOgHtml({ title, description, url, image: LOGO_URL, type: "website" }));
    }

    return next();
  };
}
