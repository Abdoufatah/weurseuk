export type ShareNetwork = "WhatsApp" | "X (Twitter)" | "Facebook" | "LinkedIn" | "Telegram";

export interface SharePayload {
  url: string;
  title: string;
  excerpt?: string;
  authorName?: string;
}

export function buildShareUrl(network: ShareNetwork, payload: SharePayload): string {
  const { url, title, excerpt, authorName } = payload;
  const byline = authorName ? `Par ${authorName}` : "";

  switch (network) {
    case "WhatsApp":
      return `https://wa.me/?text=${encodeURIComponent(`*${title}*${byline ? `\n${byline}` : ""}${excerpt ? `\n\n${excerpt}` : ""}\n\n${url}`)}`;
    case "X (Twitter)": {
      const base = `"${title}"${authorName ? ` — ${authorName}` : ""}`;
      const maxExcerpt = 240 - base.length;
      const summary = excerpt && maxExcerpt > 20
        ? ` | ${excerpt.substring(0, maxExcerpt - 3)}${excerpt.length > maxExcerpt - 3 ? "…" : ""}`
        : "";
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${base}${summary}`)}&url=${encodeURIComponent(url)}`;
    }
    case "Facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    case "LinkedIn": {
      const summary = excerpt ? `&summary=${encodeURIComponent(excerpt.substring(0, 256))}` : "";
      const fullTitle = authorName ? `${title} — ${authorName}` : title;
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(fullTitle)}${summary}`;
    }
    case "Telegram":
      return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${title}${byline ? `\n${byline}` : ""}${excerpt ? `\n\n${excerpt.substring(0, 200)}${excerpt.length > 200 ? "…" : ""}` : ""}`)}`;
  }
}
