import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;
const YOUTUBE_RSS_BASE = "https://www.youtube.com/feeds/videos.xml?channel_id=";

function parseYouTubeRSS(xml, channelId) {
  const entries = [];
  const channelNameMatch = xml.match(/<author>\s*<name>([^<]+)<\/name>/);
  const channelName = channelNameMatch ? channelNameMatch[1] : "Unknown";
  
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
        title: titleMatch[1].replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'"),
        channelId,
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
  const connection = await mysql.createConnection(DATABASE_URL);
  
  const [channels] = await connection.execute(
    "SELECT channelId, name FROM youtube_channels WHERE isActive = 1"
  );
  
  console.log(`Found ${channels.length} channels to sync`);
  
  let newVideos = 0;
  let errors = 0;
  
  for (let i = 0; i < channels.length; i += 5) {
    const batch = channels.slice(i, i + 5);
    
    const results = await Promise.allSettled(
      batch.map(async (ch) => {
        const url = `${YOUTUBE_RSS_BASE}${ch.channelId}`;
        const response = await fetch(url, { 
          signal: AbortSignal.timeout(10000),
          headers: { "User-Agent": "Weurseuk/1.0 (News Aggregator)" }
        });
        if (!response.ok) {
          console.log(`  ⚠️ HTTP ${response.status} for ${ch.name}`);
          return [];
        }
        const xml = await response.text();
        return parseYouTubeRSS(xml, ch.channelId);
      })
    );
    
    for (const result of results) {
      if (result.status === "fulfilled") {
        for (const video of result.value) {
          try {
            await connection.execute(
              `INSERT IGNORE INTO youtube_videos (videoId, channelId, channelName, title, thumbnailUrl, publishedAt) 
               VALUES (?, ?, ?, ?, ?, ?)`,
              [video.videoId, video.channelId, video.channelName, video.title, video.thumbnailUrl, video.publishedAt]
            );
            newVideos++;
          } catch (e) {
            if (!e.message?.includes("Duplicate")) errors++;
          }
        }
      } else {
        errors++;
        console.log(`  ❌ ${result.reason?.message}`);
      }
    }
    
    if (i + 5 < channels.length) await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log(`✅ Sync complete: ${newVideos} new videos, ${errors} errors`);
  
  // Show sample
  const [sample] = await connection.execute(
    "SELECT videoId, channelName, title FROM youtube_videos ORDER BY publishedAt DESC LIMIT 5"
  );
  console.log("\nLatest videos:");
  for (const v of sample) {
    console.log(`  - [${v.channelName}] ${v.title}`);
  }
  
  await connection.end();
}

main().catch(e => { console.error(e); process.exit(1); });
