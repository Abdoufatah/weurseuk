/**
 * Seed initial Aïdara press review videos from playlist RSS
 * Run once to populate the database with the latest 15 videos
 */
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const PLAYLIST_ID = "PLPiTOZE0J9YbxIu1eRdkPLUAA8EbJ5ywa";
const CHANNEL_ID = "UCh57LRfcD3Z4TK6WrzL39GA";

function parseYouTubeRSS(xml) {
  const entries = [];
  const channelNameMatch = xml.match(/<author>\s*<name>([^<]+)<\/name>/);
  const channelName = channelNameMatch ? channelNameMatch[1] : "2A TV - LA CHAÎNE DU PEUPLE";

  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;
  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1];
    const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const titleMatch = entry.match(/<title>([^<]+)<\/title>/);
    const publishedMatch = entry.match(/<published>([^<]+)<\/published>/);
    const thumbnailMatch = entry.match(/<media:thumbnail[^>]*url="([^"]+)"/);

    if (videoIdMatch && titleMatch) {
      entries.push({
        videoId: videoIdMatch[1],
        title: titleMatch[1]
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'"),
        channelId: CHANNEL_ID,
        channelName,
        thumbnailUrl: thumbnailMatch
          ? thumbnailMatch[1]
          : `https://i.ytimg.com/vi/${videoIdMatch[1]}/hqdefault.jpg`,
        publishedAt: publishedMatch ? new Date(publishedMatch[1]) : new Date(),
      });
    }
  }
  return entries;
}

async function main() {
  const url = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`;
  console.log("[Aïdara-Seed] Fetching playlist RSS...");
  const response = await fetch(url, {
    headers: { "User-Agent": "Weurseuk/1.0 (News Aggregator)" },
  });

  if (!response.ok) {
    console.error(`[Aïdara-Seed] HTTP ${response.status}`);
    process.exit(1);
  }

  const xml = await response.text();
  const entries = parseYouTubeRSS(xml);
  console.log(`[Aïdara-Seed] Found ${entries.length} videos in playlist`);

  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  let inserted = 0;

  for (const video of entries) {
    try {
      const [result] = await connection.execute(
        `INSERT IGNORE INTO youtube_videos (videoId, channelId, channelName, title, thumbnailUrl, publishedAt)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [video.videoId, video.channelId, video.channelName, video.title, video.thumbnailUrl, video.publishedAt]
      );
      if (result.affectedRows > 0) {
        inserted++;
        console.log(`  ✅ Inserted: ${video.title.substring(0, 60)}`);
      } else {
        console.log(`  ⏭️  Already exists: ${video.title.substring(0, 60)}`);
      }
    } catch (e) {
      console.error(`  ❌ Error: ${e.message}`);
    }
  }

  await connection.end();
  console.log(`\n[Aïdara-Seed] Done: ${inserted} new videos inserted`);
  
  // Show latest
  if (entries.length > 0) {
    console.log(`\n📺 Latest: "${entries[0].title}"`);
    console.log(`   Published: ${entries[0].publishedAt}`);
    console.log(`   URL: https://www.youtube.com/watch?v=${entries[0].videoId}`);
  }
}

main().catch(console.error);
