/**
 * useInstagramStory
 * Génère une image Story Instagram (1080 × 1920 px) côté client via Canvas API.
 *
 * Charte graphique Weurseuk :
 *   - Fond : anthracite profond (#1a1c22) avec dégradé vertical vers noir
 *   - Bande dorée (#c9a84c) en haut et en bas
 *   - Photo auteur / image illustrative centrée en haut
 *   - Titre en blanc, grand, typographie sérif
 *   - Byline dorée : "Par [Auteur]"
 *   - Logo Weurseuk en bas
 *   - URL de l'article en petit
 */

import { ASSETS } from "@shared/constants";

export interface StoryOptions {
  title: string;
  authorName?: string;
  authorImageUrl?: string;   // photo auteur ou image illustrative
  categoryLabel?: string;
  articleUrl?: string;
}

// Couleurs Weurseuk
const GOLD = "#c9a84c";
const ANTHRACITE = "#1a1c22";
const WHITE = "#ffffff";
const GOLD_LIGHT = "#e8c97a";

const W = 1080;
const H = 1920;

/** Charge une image cross-origin via un proxy canvas-safe */
async function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    // Ajouter un paramètre cache-buster pour éviter les erreurs CORS sur certains CDN
    img.src = src.includes("?") ? src : `${src}?cb=${Date.now()}`;
  });
}

/** Enveloppe le texte sur plusieurs lignes selon une largeur max */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function generateInstagramStory(options: StoryOptions): Promise<Blob> {
  const { title, authorName, authorImageUrl, categoryLabel, articleUrl } = options;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // ── 1. Fond dégradé anthracite → noir ──────────────────────────────────────
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, ANTHRACITE);
  bgGrad.addColorStop(1, "#0d0e12");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // ── 2. Texture subtile (grain) ─────────────────────────────────────────────
  // Petits points aléatoires semi-transparents pour un effet papier
  ctx.save();
  ctx.globalAlpha = 0.03;
  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = Math.random() * 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = WHITE;
    ctx.fill();
  }
  ctx.restore();

  // ── 3. Bande dorée supérieure ──────────────────────────────────────────────
  ctx.fillStyle = GOLD;
  ctx.fillRect(0, 0, W, 12);

  // ── 4. Logo Weurseuk en haut à gauche ─────────────────────────────────────
  const logoImg = await loadImage(ASSETS.logo);
  if (logoImg) {
    const logoH = 80;
    const logoW = (logoImg.width / logoImg.height) * logoH;
    ctx.drawImage(logoImg, 60, 36, logoW, logoH);
  }

  // ── 5. Label catégorie ─────────────────────────────────────────────────────
  if (categoryLabel) {
    ctx.font = "bold 36px 'Georgia', serif";
    ctx.fillStyle = GOLD;
    ctx.letterSpacing = "4px";
    ctx.fillText(categoryLabel.toUpperCase(), 60, 170);
    ctx.letterSpacing = "0px";
    // Ligne de séparation dorée
    ctx.fillStyle = GOLD;
    ctx.fillRect(60, 185, 120, 3);
  }

  // ── 6. Photo auteur / image illustrative ──────────────────────────────────
  const photoY = categoryLabel ? 220 : 160;
  const photoSize = 420; // carré
  const photoX = (W - photoSize) / 2;

  if (authorImageUrl) {
    const photo = await loadImage(authorImageUrl);
    if (photo) {
      // Clip circulaire pour photo auteur, rectangulaire pour image illustrative
      const isPortrait = photo.height > photo.width * 1.2;
      const isSquarish = Math.abs(photo.width - photo.height) / Math.max(photo.width, photo.height) < 0.3;

      if (isPortrait || isSquarish) {
        // Photo auteur : cercle avec bordure dorée
        const cx = W / 2;
        const cy = photoY + photoSize / 2;
        const radius = photoSize / 2;

        // Ombre portée
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = 40;
        ctx.shadowOffsetY = 10;

        // Bordure dorée
        ctx.beginPath();
        ctx.arc(cx, cy, radius + 8, 0, Math.PI * 2);
        ctx.fillStyle = GOLD;
        ctx.fill();
        ctx.restore();

        // Clip et dessin photo
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.clip();
        // Recadrage centré
        const scale = Math.max(photoSize / photo.width, photoSize / photo.height);
        const sw = photoSize / scale;
        const sh = photoSize / scale;
        const sx = (photo.width - sw) / 2;
        const sy = (photo.height - sh) / 2;
        ctx.drawImage(photo, sx, sy, sw, sh, cx - radius, cy - radius, photoSize, photoSize);
        ctx.restore();
      } else {
        // Image illustrative : rectangle arrondi
        const rr = 24;
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 30;
        ctx.shadowOffsetY = 8;
        ctx.beginPath();
        ctx.roundRect(photoX, photoY, photoSize, photoSize, rr);
        ctx.clip();
        const scale = Math.max(photoSize / photo.width, photoSize / photo.height);
        const sw = photoSize / scale;
        const sh = photoSize / scale;
        const sx = (photo.width - sw) / 2;
        const sy = (photo.height - sh) / 2;
        ctx.drawImage(photo, sx, sy, sw, sh, photoX, photoY, photoSize, photoSize);
        ctx.restore();
      }
    }
  }

  // ── 7. Ligne décorative dorée centrale ────────────────────────────────────
  const dividerY = photoY + photoSize + 60;
  const gradLine = ctx.createLinearGradient(W * 0.1, 0, W * 0.9, 0);
  gradLine.addColorStop(0, "transparent");
  gradLine.addColorStop(0.3, GOLD);
  gradLine.addColorStop(0.7, GOLD);
  gradLine.addColorStop(1, "transparent");
  ctx.fillStyle = gradLine;
  ctx.fillRect(W * 0.1, dividerY, W * 0.8, 2);

  // ── 8. Titre ───────────────────────────────────────────────────────────────
  const titleY = dividerY + 70;
  const titleMaxW = W - 120;
  ctx.font = "bold 72px 'Georgia', 'Times New Roman', serif";
  ctx.fillStyle = WHITE;
  ctx.textAlign = "center";

  const titleLines = wrapText(ctx, title, titleMaxW);
  const titleLineH = 88;
  titleLines.forEach((line, i) => {
    ctx.fillText(line, W / 2, titleY + i * titleLineH);
  });

  // ── 9. Byline auteur ───────────────────────────────────────────────────────
  const bylineY = titleY + titleLines.length * titleLineH + 50;
  if (authorName) {
    ctx.font = "500 48px 'Georgia', serif";
    ctx.fillStyle = GOLD_LIGHT;
    ctx.fillText(`Par ${authorName}`, W / 2, bylineY);
  }

  // ── 10. Bande dorée inférieure + URL ──────────────────────────────────────
  // Dégradé de bas en haut pour fondre vers le fond
  const footerGrad = ctx.createLinearGradient(0, H - 200, 0, H);
  footerGrad.addColorStop(0, "transparent");
  footerGrad.addColorStop(1, "rgba(0,0,0,0.85)");
  ctx.fillStyle = footerGrad;
  ctx.fillRect(0, H - 200, W, 200);

  // Bande dorée basse
  ctx.fillStyle = GOLD;
  ctx.fillRect(0, H - 12, W, 12);

  // URL de l'article
  if (articleUrl) {
    ctx.font = "32px 'Georgia', serif";
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.textAlign = "center";
    // Tronquer l'URL si trop longue
    const shortUrl = articleUrl.replace(/^https?:\/\//, "").substring(0, 50);
    ctx.fillText(shortUrl, W / 2, H - 50);
  }

  // ── 11. Mention "weurseuk.com" ─────────────────────────────────────────────
  ctx.font = "bold 38px 'Georgia', serif";
  ctx.fillStyle = GOLD;
  ctx.textAlign = "center";
  ctx.fillText("weurseuk.com", W / 2, H - 100);

  // ── 12. Export PNG ─────────────────────────────────────────────────────────
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob failed"));
      },
      "image/png",
      1.0
    );
  });
}
