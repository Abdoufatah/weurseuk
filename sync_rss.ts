import { syncRssFeeds } from './server/jobs/rss-sync';

async function main() {
  try {
    console.log('[RSS-Sync] Starting manual RSS sync...');
    const result = await syncRssFeeds();
    console.log('[RSS-Sync] ✅ Sync completed:', result);
    process.exit(0);
  } catch (error) {
    console.error('[RSS-Sync] ❌ Error:', error);
    process.exit(1);
  }
}

main();
