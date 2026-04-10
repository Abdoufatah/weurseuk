import Parser from "rss-parser";
import * as db from "./db";

const parser = new Parser({
  timeout: 15000,
  headers: {
    "User-Agent": "Weurseuk-Aggregator/1.0",
    "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml",
  },
  customFields: {
    item: [
      ["media:content", "mediaContent", { keepArray: false }],
      ["media:thumbnail", "mediaThumbnail", { keepArray: false }],
      ["media:group", "mediaGroup", { keepArray: false }],
      ["enclosure", "enclosure", { keepArray: false }],
      ["yt:videoId", "ytVideoId"],
    ],
  },
});

interface RssSource {
  id: number;
  name: string;
  url: string;
  region: string;
  categoryId: number | null;
  isActive: boolean;
}

interface SyncResult {
  sourceId: number;
  sourceName: string;
  newArticles: number;
  errors: string[];
}

function extractImageUrl(item: any): string | undefined {
  // YouTube Atom feeds: extract thumbnail from media:group > media:thumbnail
  if (item.mediaGroup?.['media:thumbnail']?.[0]?.['$']?.url) return item.mediaGroup['media:thumbnail'][0]['$'].url;
  if (item.ytVideoId) return `https://img.youtube.com/vi/${item.ytVideoId}/hqdefault.jpg`;
  if (item.mediaContent?.["$"]?.url) return item.mediaContent["$"].url;
  if (item.mediaThumbnail?.["$"]?.url) return item.mediaThumbnail["$"].url;
  if (item.enclosure?.url && item.enclosure?.type?.startsWith("image")) return item.enclosure.url;
  // Try to extract from content/description
  const content = item["content:encoded"] || item.content || item.description || "";
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];
  return undefined;
}

function truncateText(text: string | undefined, maxLength: number): string | undefined {
  if (!text) return undefined;
  // Strip HTML tags
  const clean = text.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return clean.substring(0, maxLength).trim() + "...";
}

export async function syncRssSource(source: RssSource): Promise<SyncResult> {
  const result: SyncResult = {
    sourceId: source.id,
    sourceName: source.name,
    newArticles: 0,
    errors: [],
  };

  try {
    const feed = await parser.parseURL(source.url);
    const items = feed.items?.slice(0, 20) || [];

    for (const item of items) {
      try {
        const sourceUrl = item.link || item.guid;
        if (!sourceUrl) continue;

        const title = item.title?.trim();
        if (!title) continue;

        // Check if article already exists by sourceUrl
        const exists = await db.articleExistsBySourceUrl(sourceUrl);
        if (exists) continue;

        const excerpt = truncateText(item.contentSnippet || (item as any).description, 300);
        const imageUrl = extractImageUrl(item);
        const publishedAt = item.pubDate ? new Date(item.pubDate) : new Date();

        await db.createAggregatedArticle({
          title,
          excerpt: excerpt || undefined,
          sourceUrl,
          sourceName: source.name,
          imageUrl: imageUrl || undefined,
          region: source.region as "senegal" | "afrique_ouest" | "monde",
          categoryId: source.categoryId || undefined,
          publishedAt,
          isFeatured: false,
          isBreakingNews: false,
        });

        result.newArticles++;
      } catch (itemErr: any) {
        result.errors.push(`Item error: ${itemErr.message}`);
      }
    }
  } catch (feedErr: any) {
    result.errors.push(`Feed error: ${feedErr.message}`);
  }

  // Update last fetched timestamp
  try {
    await db.updateRssSource(source.id, { lastFetchedAt: new Date() } as any);
  } catch (_) {}

  return result;
}

export async function syncAllRssSources(): Promise<SyncResult[]> {
  const sources = await db.getAllRssSources();
  const activeSources = sources.filter((s: any) => s.isActive);

  const results: SyncResult[] = [];
  for (const source of activeSources) {
    const result = await syncRssSource(source as RssSource);
    results.push(result);
  }

  return results;
}
