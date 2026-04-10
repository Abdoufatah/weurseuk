import 'dotenv/config';

// We need to use the compiled service, so let's use tsx to run the TypeScript directly
import { register } from 'node:module';

// Direct implementation using rss-parser and drizzle
import Parser from 'rss-parser';
import { drizzle } from 'drizzle-orm/mysql2';
import { sql, eq } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL);

const parser = new Parser({
  timeout: 15000,
  headers: {
    'User-Agent': 'Weurseuk-Aggregator/1.0 (+https://weurseuk.com)',
    'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml',
  },
});

function extractImageUrl(item) {
  // Try media:content
  if (item['media:content']?.['$']?.url) return item['media:content']['$'].url;
  if (item['media:thumbnail']?.['$']?.url) return item['media:thumbnail']['$'].url;
  // Try enclosure
  if (item.enclosure?.url && item.enclosure?.type?.startsWith('image')) return item.enclosure.url;
  // Try to extract from content
  const content = item['content:encoded'] || item.content || item.contentSnippet || '';
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];
  return null;
}

function truncateText(text, maxLength) {
  if (!text) return null;
  const clean = text.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
  if (clean.length <= maxLength) return clean;
  return clean.substring(0, maxLength).trim() + '...';
}

async function syncSource(source) {
  const result = { name: source.name, newArticles: 0, errors: [] };
  
  try {
    console.log(`  Fetching ${source.name} (${source.url})...`);
    const feed = await parser.parseURL(source.url);
    const items = feed.items?.slice(0, 15) || [];
    console.log(`    Found ${items.length} items in feed`);

    for (const item of items) {
      try {
        const sourceUrl = item.link || item.guid;
        if (!sourceUrl) continue;
        const title = item.title?.trim();
        if (!title) continue;

        // Check if already exists
        const [existing] = await db.execute(
          sql`SELECT id FROM aggregated_articles WHERE sourceUrl = ${sourceUrl} LIMIT 1`
        );
        if (existing && existing.length > 0) continue;

        const excerpt = truncateText(item.contentSnippet || item.content || item.description, 300);
        const imageUrl = extractImageUrl(item);
        const publishedAt = item.pubDate ? new Date(item.pubDate) : new Date();

        await db.execute(sql`
          INSERT INTO aggregated_articles (title, excerpt, sourceUrl, sourceName, imageUrl, region, publishedAt, isFeatured, isBreakingNews)
          VALUES (${title}, ${excerpt}, ${sourceUrl}, ${source.name}, ${imageUrl}, ${source.region}, ${publishedAt}, false, false)
        `);
        result.newArticles++;
      } catch (itemErr) {
        result.errors.push(itemErr.message);
      }
    }

    // Update lastFetchedAt
    await db.execute(sql`UPDATE rss_sources SET lastFetchedAt = NOW() WHERE id = ${source.id}`);
  } catch (feedErr) {
    result.errors.push(`Feed error: ${feedErr.message}`);
    console.log(`    ERROR: ${feedErr.message}`);
  }

  return result;
}

async function main() {
  console.log('=== Weurseuk RSS Sync ===\n');

  // Get all active sources
  const sources = await db.execute(sql`SELECT * FROM rss_sources WHERE isActive = true ORDER BY name`);
  console.log(`Found ${sources[0].length} active RSS sources\n`);

  let totalNew = 0;
  const results = [];

  for (const source of sources[0]) {
    const result = await syncSource(source);
    results.push(result);
    totalNew += result.newArticles;
    console.log(`    → ${result.newArticles} new articles${result.errors.length > 0 ? ` (${result.errors.length} errors)` : ''}`);
  }

  // Summary
  console.log('\n=== Sync Summary ===');
  console.log(`Total new articles: ${totalNew}`);
  for (const r of results) {
    console.log(`  ${r.name}: +${r.newArticles}${r.errors.length > 0 ? ` (${r.errors.length} errors)` : ''}`);
  }

  // Total articles in DB
  const [count] = await db.execute(sql`SELECT COUNT(*) as cnt FROM aggregated_articles`);
  console.log(`\nTotal articles in database: ${count[0]?.cnt || 0}`);

  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
