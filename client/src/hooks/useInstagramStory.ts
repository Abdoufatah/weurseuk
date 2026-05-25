/**
 * useInstagramStory / generateFacebookReel
 * Génère des images verticales 1080 × 1920 px côté client via Canvas API.
 *
 * Stratégie de lien direct (un seul clic) :
 *   - Sur mobile : Web Share API → partage natif de l'image + URL de l'article
 *     en une seule action. L'utilisateur choisit Instagram/Facebook dans la feuille
 *     de partage système. L'URL de l'article est transmise comme texte associé.
 *   - Sur desktop : téléchargement de l'image PNG + copie de l'URL dans le
 *     presse-papiers automatiquement.
 *   - L'URL de l'article est aussi inscrite en grand dans l'image (zone basse)
 *     pour qu'elle soit visible dans la story/reel.
 */

import { ASSETS } from "@shared/constants";

export interface StoryOptions {
  title: string;
  authorName?: string;
  authorImageUrl?: string;
  categoryLabel?: string;
  articleUrl?: string;
}

export type ReelOptions = StoryOptions;

const GOLD = "#c9a84c";
const ANTHRACITE = "#1a1c22";
const WHITE = "#ffffff";
const GOLD_LIGHT = "#e8c97a";

const W = 1080;
const H = 1920;

async function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src.includes("?") ? src : `${src}?cb=${Date.now()}`;
  });
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
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

async function drawAuthorPhoto(
  ctx: CanvasRenderingContext2D,
  authorImageUrl: string,
  photoX: number,
  photoY: number,
  photoSize: number,
  borderColor: string,
  shadowColor: string
) {
  const photo = await loadImage(authorImageUrl);
  if (!photo) return;

  const isPortrait = photo.height > photo.width * 1.2;
  const isSquarish =
    Math.abs(photo.width - photo.height) / Math.max(photo.width, photo.height) < 0.3;
  const cx = W / 2;
  const cy = photoY + photoSize / 2;
  const radius = photoSize / 2;

  if (isPortrait || isSquarish) {
    ctx.save();
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = 50;
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 8, 0, Math.PI * 2);
    ctx.fillStyle = borderColor;
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();
    const scale = Math.max(photoSize / photo.width, photoSize / photo.height);
    const sw = photoSize / scale;
    const sh = photoSize / scale;
    const sx = (photo.width - sw) / 2;
    const sy = (photo.height - sh) / 2;
    ctx.drawImage(photo, sx, sy, sw, sh, cx - radius, cy - radius, photoSize, photoSize);
    ctx.restore();
  } else {
    ctx.save();
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoSize, photoSize, 24);
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

/**
 * Dessine le bloc "lien direct" en bas de l'image :
 * - Fond semi-transparent arrondi
 * - Texte "Lire l'article :" en doré
 * - URL de l'article en blanc, lisible
 */
function drawLinkBlock(
  ctx: CanvasRenderingContext2D,
  articleUrl: string,
  centerX: number,
  topY: number,
  accentColor: string
) {
  const blockW = W - 120;
  const blockH = 130;
  const blockX = (W - blockW) / 2;

  // Fond semi-transparent
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(blockX, topY, blockW, blockH, 20);
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.fill();
  // Bordure colorée
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();

  // Label
  ctx.font = "bold 34px 'Georgia', serif";
  ctx.fillStyle = accentColor;
  ctx.textAlign = "center";
  ctx.fillText("Lire l'article complet :", centerX, topY + 50);

  // URL — tronquée si trop longue
  const shortUrl = articleUrl.replace(/^https?:\/\//, "");
  ctx.font = "32px 'Georgia', serif";
  ctx.fillStyle = WHITE;
  const maxUrlW = blockW - 40;
  // Tronquer si nécessaire
  let displayUrl = shortUrl;
  while (ctx.measureText(displayUrl).width > maxUrlW && displayUrl.length > 20) {
    displayUrl = displayUrl.substring(0, displayUrl.length - 4) + "…";
  }
  ctx.fillText(displayUrl, centerX, topY + 100);
}

// ─────────────────────────────────────────────────────────────────────────────
// STORY INSTAGRAM
// ─────────────────────────────────────────────────────────────────────────────

export async function generateInstagramStory(options: StoryOptions): Promise<Blob> {
  const { title, authorName, authorImageUrl, categoryLabel, articleUrl } = options;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Fond
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, ANTHRACITE);
  bgGrad.addColorStop(1, "#0d0e12");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Grain
  ctx.save();
  ctx.globalAlpha = 0.03;
  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = WHITE;
    ctx.fill();
  }
  ctx.restore();

  // Bande dorée supérieure
  ctx.fillStyle = GOLD;
  ctx.fillRect(0, 0, W, 12);

  // Logo
  const logoImg = await loadImage(ASSETS.logo);
  if (logoImg) {
    const logoH = 80;
    const logoW = (logoImg.width / logoImg.height) * logoH;
    ctx.drawImage(logoImg, 60, 36, logoW, logoH);
  }

  // Catégorie
  if (categoryLabel) {
    ctx.font = "bold 36px 'Georgia', serif";
    ctx.fillStyle = GOLD;
    ctx.textAlign = "left";
    ctx.fillText(categoryLabel.toUpperCase(), 60, 170);
    ctx.fillRect(60, 185, 120, 3);
  }

  // Photo auteur
  const photoY = categoryLabel ? 220 : 160;
  const photoSize = 400;
  if (authorImageUrl) {
    await drawAuthorPhoto(ctx, authorImageUrl, (W - photoSize) / 2, photoY, photoSize, GOLD, "rgba(0,0,0,0.6)");
  }

  // Séparateur doré
  const dividerY = photoY + photoSize + 55;
  const gradLine = ctx.createLinearGradient(W * 0.1, 0, W * 0.9, 0);
  gradLine.addColorStop(0, "transparent");
  gradLine.addColorStop(0.3, GOLD);
  gradLine.addColorStop(0.7, GOLD);
  gradLine.addColorStop(1, "transparent");
  ctx.fillStyle = gradLine;
  ctx.fillRect(W * 0.1, dividerY, W * 0.8, 2);

  // Titre
  const titleY = dividerY + 65;
  ctx.font = "bold 68px 'Georgia', 'Times New Roman', serif";
  ctx.fillStyle = WHITE;
  ctx.textAlign = "center";
  const titleLines = wrapText(ctx, title, W - 120);
  const titleLineH = 84;
  titleLines.forEach((line, i) => ctx.fillText(line, W / 2, titleY + i * titleLineH));

  // Byline
  const bylineY = titleY + titleLines.length * titleLineH + 46;
  if (authorName) {
    ctx.font = "500 46px 'Georgia', serif";
    ctx.fillStyle = GOLD_LIGHT;
    ctx.textAlign = "center";
    ctx.fillText(`Par ${authorName}`, W / 2, bylineY);
  }

  // Bloc lien direct (URL lisible en un coup d'œil)
  if (articleUrl) {
    drawLinkBlock(ctx, articleUrl, W / 2, bylineY + 70, GOLD);
  }

  // Pied de page
  const footerGrad = ctx.createLinearGradient(0, H - 200, 0, H);
  footerGrad.addColorStop(0, "transparent");
  footerGrad.addColorStop(1, "rgba(0,0,0,0.85)");
  ctx.fillStyle = footerGrad;
  ctx.fillRect(0, H - 200, W, 200);

  ctx.font = "bold 38px 'Georgia', serif";
  ctx.fillStyle = GOLD;
  ctx.textAlign = "center";
  ctx.fillText("weurseuk.com", W / 2, H - 60);

  ctx.fillStyle = GOLD;
  ctx.fillRect(0, H - 12, W, 12);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => { if (blob) resolve(blob); else reject(new Error("toBlob failed")); },
      "image/png", 1.0
    );
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// REEL FACEBOOK
// ─────────────────────────────────────────────────────────────────────────────

export async function generateFacebookReel(options: ReelOptions): Promise<Blob> {
  const { title, authorName, authorImageUrl, categoryLabel, articleUrl } = options;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const FB_DARK = "#0a1628";
  const FB_BLUE = "#1877F2";
  const FB_BLUE_LIGHT = "#4a9ff5";

  // Fond bleu nuit
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, FB_DARK);
  bgGrad.addColorStop(0.6, "#060c18");
  bgGrad.addColorStop(1, "#000000");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Lueur bleue
  const glowGrad = ctx.createRadialGradient(W, 0, 0, W, 0, W * 0.8);
  glowGrad.addColorStop(0, "rgba(24,119,242,0.18)");
  glowGrad.addColorStop(1, "transparent");
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, W, H * 0.5);

  // Grain
  ctx.save();
  ctx.globalAlpha = 0.025;
  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = WHITE;
    ctx.fill();
  }
  ctx.restore();

  // Bande dorée supérieure
  ctx.fillStyle = GOLD;
  ctx.fillRect(0, 0, W, 12);

  // Logo
  const logoImg = await loadImage(ASSETS.logo);
  if (logoImg) {
    const logoH = 80;
    const logoW = (logoImg.width / logoImg.height) * logoH;
    ctx.drawImage(logoImg, 60, 36, logoW, logoH);
  }

  // Badge REEL
  ctx.font = "bold 34px 'Georgia', sans-serif";
  ctx.textAlign = "center";
  const badgeText = "REEL";
  const badgeW = ctx.measureText(badgeText).width + 40;
  const badgeH = 52;
  const badgeX = W - badgeW - 50;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(badgeX, 36, badgeW, badgeH, 10);
  ctx.fillStyle = FB_BLUE;
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = WHITE;
  ctx.fillText(badgeText, badgeX + badgeW / 2, 72);

  // Catégorie
  if (categoryLabel) {
    ctx.font = "bold 36px 'Georgia', serif";
    ctx.fillStyle = FB_BLUE_LIGHT;
    ctx.textAlign = "left";
    ctx.fillText(categoryLabel.toUpperCase(), 60, 170);
    ctx.fillStyle = FB_BLUE_LIGHT;
    ctx.fillRect(60, 185, 120, 3);
  }

  // Photo auteur (double bordure bleu + or)
  const photoY = categoryLabel ? 220 : 160;
  const photoSize = 400;
  const photoX = (W - photoSize) / 2;
  if (authorImageUrl) {
    const photo = await loadImage(authorImageUrl);
    if (photo) {
      const isPortrait = photo.height > photo.width * 1.2;
      const isSquarish = Math.abs(photo.width - photo.height) / Math.max(photo.width, photo.height) < 0.3;
      const cx = W / 2;
      const cy = photoY + photoSize / 2;
      const radius = photoSize / 2;

      if (isPortrait || isSquarish) {
        ctx.save();
        ctx.shadowColor = "rgba(24,119,242,0.5)";
        ctx.shadowBlur = 50;
        ctx.beginPath();
        ctx.arc(cx, cy, radius + 12, 0, Math.PI * 2);
        ctx.fillStyle = FB_BLUE;
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, radius + 6, 0, Math.PI * 2);
        ctx.fillStyle = GOLD;
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.clip();
        const scale = Math.max(photoSize / photo.width, photoSize / photo.height);
        const sw = photoSize / scale;
        const sh = photoSize / scale;
        ctx.drawImage(photo, (photo.width - sw) / 2, (photo.height - sh) / 2, sw, sh, cx - radius, cy - radius, photoSize, photoSize);
        ctx.restore();
      } else {
        await drawAuthorPhoto(ctx, authorImageUrl, photoX, photoY, photoSize, FB_BLUE, "rgba(24,119,242,0.4)");
      }
    }
  }

  // Séparateur or → bleu
  const dividerY = photoY + photoSize + 55;
  const gradLine = ctx.createLinearGradient(W * 0.1, 0, W * 0.9, 0);
  gradLine.addColorStop(0, "transparent");
  gradLine.addColorStop(0.3, GOLD);
  gradLine.addColorStop(0.7, FB_BLUE_LIGHT);
  gradLine.addColorStop(1, "transparent");
  ctx.fillStyle = gradLine;
  ctx.fillRect(W * 0.1, dividerY, W * 0.8, 2);

  // Titre
  const titleY = dividerY + 65;
  ctx.font = "bold 68px 'Georgia', 'Times New Roman', serif";
  ctx.fillStyle = WHITE;
  ctx.textAlign = "center";
  const titleLines = wrapText(ctx, title, W - 120);
  const titleLineH = 84;
  titleLines.forEach((line, i) => ctx.fillText(line, W / 2, titleY + i * titleLineH));

  // Byline
  const bylineY = titleY + titleLines.length * titleLineH + 46;
  if (authorName) {
    ctx.font = "500 46px 'Georgia', serif";
    ctx.fillStyle = GOLD_LIGHT;
    ctx.textAlign = "center";
    ctx.fillText(`Par ${authorName}`, W / 2, bylineY);
  }

  // Bloc lien direct
  if (articleUrl) {
    drawLinkBlock(ctx, articleUrl, W / 2, bylineY + 70, FB_BLUE_LIGHT);
  }

  // Pied de page
  const footerGrad = ctx.createLinearGradient(0, H - 220, 0, H);
  footerGrad.addColorStop(0, "transparent");
  footerGrad.addColorStop(1, "rgba(0,0,0,0.9)");
  ctx.fillStyle = footerGrad;
  ctx.fillRect(0, H - 220, W, 220);

  ctx.font = "bold 52px 'Georgia', sans-serif";
  ctx.fillStyle = FB_BLUE_LIGHT;
  ctx.textAlign = "center";
  ctx.fillText("f", W / 2, H - 130);

  ctx.font = "bold 38px 'Georgia', serif";
  ctx.fillStyle = GOLD;
  ctx.fillText("weurseuk.com", W / 2, H - 70);

  ctx.fillStyle = GOLD;
  ctx.fillRect(0, H - 12, W, 12);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => { if (blob) resolve(blob); else reject(new Error("toBlob failed")); },
      "image/png", 1.0
    );
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PARTAGE NATIF (Web Share API) — un seul clic sur mobile
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Partage l'image générée + l'URL de l'article via la feuille de partage
 * native du système (iOS/Android). L'utilisateur choisit Instagram ou Facebook
 * dans la liste des apps disponibles. Un seul clic, pas d'autre périphérique.
 *
 * Sur desktop (Web Share API non disponible ou sans support fichiers) :
 * télécharge l'image et copie l'URL dans le presse-papiers.
 */
export async function shareOrDownload(
  blob: Blob,
  filename: string,
  articleUrl?: string,
  title?: string
): Promise<"shared" | "downloaded"> {
  // Tentative de partage natif avec fichier (mobile)
  if (
    typeof navigator !== "undefined" &&
    "share" in navigator &&
    "canShare" in navigator
  ) {
    const file = new File([blob], filename, { type: "image/png" });
    if ((navigator as Navigator & { canShare: (data: ShareData) => boolean }).canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: title || "Weurseuk",
          text: articleUrl
            ? `Lire l'article : ${articleUrl}`
            : undefined,
          url: articleUrl,
        });
        return "shared";
      } catch {
        // Annulé par l'utilisateur ou erreur — fallback download
      }
    }
  }

  // Fallback desktop : téléchargement + copie URL
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(objectUrl);

  if (articleUrl && typeof navigator !== "undefined" && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(articleUrl);
    } catch {
      // Clipboard non disponible
    }
  }

  return "downloaded";
}
