// YouTube RSS feed URL format
const YOUTUBE_RSS_BASE = "https://www.youtube.com/feeds/videos.xml?channel_id=";

interface YouTubeRSSEntry {
  videoId: string;
  title: string;
  channelId: string;
  channelName: string;
  thumbnailUrl: string;
  publishedAt: Date;
}

/**
 * Parse YouTube RSS XML to extract video entries
 */
function parseYouTubeRSS(xml: string, channelId: string): YouTubeRSSEntry[] {
  const entries: YouTubeRSSEntry[] = [];
  
  // Extract channel name
  const channelNameMatch = xml.match(/<author>\s*<name>([^<]+)<\/name>/);
  const channelName = channelNameMatch ? channelNameMatch[1] : "Unknown";
  
  // Extract entries
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

/**
 * Fetch latest videos from a single YouTube channel via RSS
 */
async function fetchChannelVideos(channelId: string): Promise<YouTubeRSSEntry[]> {
  try {
    const url = `${YOUTUBE_RSS_BASE}${channelId}`;
    const response = await fetch(url, { 
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "Weurseuk/1.0 (News Aggregator)" }
    });
    
    if (!response.ok) {
      console.log(`[YouTube] ⚠️ HTTP ${response.status} for channel ${channelId}`);
      return [];
    }
    
    const xml = await response.text();
    return parseYouTubeRSS(xml, channelId);
  } catch (error: any) {
    console.log(`[YouTube] ⚠️ Error fetching ${channelId}: ${error.message}`);
    return [];
  }
}

/**
 * Sync all active YouTube channels - fetch latest videos and store in DB
 */
export async function syncYouTubeVideos(): Promise<{ newVideos: number; errors: number }> {
  console.log("[YouTube] Starting sync...");
  
  const connection = await import("mysql2/promise").then(m => 
    m.createConnection(process.env.DATABASE_URL!)
  );
  
  // Get all active channels
  const [channels] = await connection.execute(
    "SELECT channelId, name FROM youtube_channels WHERE isActive = 1"
  ) as any;
  
  let newVideos = 0;
  let errors = 0;
  
  // Process channels in batches of 5 to avoid rate limiting
  for (let i = 0; i < channels.length; i += 5) {
    const batch = channels.slice(i, i + 5);
    
    const results = await Promise.allSettled(
      batch.map((ch: any) => fetchChannelVideos(ch.channelId))
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
            // Check if row was inserted (not ignored)
            const [res] = await connection.execute("SELECT ROW_COUNT() as cnt") as any;
            if (res[0].cnt > 0) newVideos++;
          } catch (e: any) {
            // Duplicate entry is fine, skip
            if (!e.message?.includes("Duplicate")) {
              errors++;
            }
          }
        }
      } else {
        errors++;
      }
    }
    
    // Small delay between batches
    if (i + 5 < channels.length) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  
  await connection.end();
  console.log(`[YouTube] ✅ Sync complete: ${newVideos} new videos, ${errors} errors`);
  return { newVideos, errors };
}

/**
 * Get latest YouTube videos for display in ad slots
 */
export async function getLatestYouTubeVideos(limit: number = 20): Promise<any[]> {
  const connection = await import("mysql2/promise").then(m => 
    m.createConnection(process.env.DATABASE_URL!)
  );
  
  const [videos] = await connection.execute(
    `SELECT videoId, channelId, channelName, title, thumbnailUrl, publishedAt 
     FROM youtube_videos 
     ORDER BY publishedAt DESC 
     LIMIT ${Number(limit)}`
  );
  
  await connection.end();
  return videos as any[];
}
