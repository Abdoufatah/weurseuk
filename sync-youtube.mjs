import 'dotenv/config';
import Parser from 'rss-parser';
import mysql from 'mysql2/promise';

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
      ["yt:videoId", "ytVideoId"],
    ],
  },
});

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const sources = [
  { id: 30001, name: 'EvenProd', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCKKbOgsOxOT83r1TdfjMaYg', region: 'senegal', categoryId: 5 },
  { id: 30002, name: 'Marodi TV Sénégal', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCqe0sSESmaQbLFdTExctQLA', region: 'senegal', categoryId: 5 },
];

let totalNew = 0;

for (const source of sources) {
  try {
    const feed = await parser.parseURL(source.url);
    const items = feed.items?.slice(0, 15) || [];
    let newCount = 0;

    for (const item of items) {
      const sourceUrl = item.link || item.guid;
      if (!sourceUrl) continue;
      const title = item.title?.trim();
      if (!title) continue;

      // Check if already exists
      const [existing] = await conn.execute('SELECT id FROM aggregated_articles WHERE sourceUrl = ?', [sourceUrl]);
      if (existing.length > 0) continue;

      // Extract thumbnail
      let imageUrl = null;
      if (item.ytVideoId) {
        imageUrl = `https://img.youtube.com/vi/${item.ytVideoId}/hqdefault.jpg`;
      }

      // Extract description
      let excerpt = item.contentSnippet || item.content || '';
      excerpt = excerpt.replace(/<[^>]*>/g, '').trim().substring(0, 300);

      const publishedAt = item.pubDate ? new Date(item.pubDate) : new Date();

      await conn.execute(
        'INSERT INTO aggregated_articles (title, excerpt, sourceUrl, sourceName, imageUrl, region, categoryId, isFeatured, isBreakingNews, publishedAt, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
        [title, excerpt || null, sourceUrl, source.name, imageUrl, source.region, source.categoryId, false, false, publishedAt]
      );
      newCount++;
    }

    console.log(`${source.name}: ${newCount} nouvelles vidéos importées`);
    totalNew += newCount;

    // Update lastFetchedAt
    await conn.execute('UPDATE rss_sources SET lastFetchedAt = NOW() WHERE id = ?', [source.id]);
  } catch (err) {
    console.error(`Erreur ${source.name}:`, err.message);
  }
}

console.log(`\nTotal: ${totalNew} vidéos importées`);
await conn.end();
