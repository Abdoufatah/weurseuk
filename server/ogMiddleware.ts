/**
 * Open Graph Middleware
 * Détecte les bots des réseaux sociaux (Facebook, Twitter, LinkedIn, Telegram, WhatsApp)
 * et leur sert une page HTML avec les bonnes balises Open Graph dynamiques.
 * Les visiteurs humains reçoivent normalement le React SPA.
 */
import { Request, Response, NextFunction } from "express";
import { getEditorialBySlug } from "./db";

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
  <!-- Open Graph -->
  <meta property="og:type" content="${type}" />
  <meta property="og:title" content="${escaped(title)}" />
  <meta property="og:description" content="${escaped(description)}" />
  <meta property="og:url" content="${escaped(url)}" />
  <meta property="og:image" content="${escaped(image)}" />
  <meta property="og:site_name" content="Weurseuk" />
  <meta property="og:locale" content="fr_FR" />
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escaped(title)}" />
  <meta name="twitter:description" content="${escaped(description)}" />
  <meta name="twitter:image" content="${escaped(image)}" />
  <!-- Redirect humains vers le SPA -->
  <script>window.location.href = "${escaped(url)}";</script>
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

    // Route : /editorial/:slug (monté sur /api/og) ou /api/og/editorial/:slug
    const editorialMatch = req.path.match(/^(?:\/editorial)?\/([^/]+)$/);
    if (editorialMatch) {
      const slug = editorialMatch[1];
      try {
        const editorial = await getEditorialBySlug(slug);
        if (editorial) {
          const title = `${editorial.title} — Weurseuk`;
          const description =
            editorial.excerpt ||
            editorial.content.replace(/<[^>]+>/g, "").substring(0, 200) + "...";
          const url = `${origin}/editorial/${slug}`;
          const image = editorial.coverImageUrl || LOGO_URL;

          return res
            .status(200)
            .setHeader("Content-Type", "text/html; charset=utf-8")
            .setHeader("Cache-Control", "public, max-age=300")
            .send(buildOgHtml({ title, description, url, image }));
        }
      } catch (err) {
        console.error("[OG Middleware] Error fetching editorial:", err);
      }
    }

    // Route : / (page d'accueil)
    if (req.path === "/" || req.path === "") {
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
