/**
 * RSS Auto-Sync Cron Service
 * Synchronizes RSS feeds automatically at regular intervals.
 * Runs inside the Express server process — no external cron daemon needed.
 */

import { syncAllRssSources } from "./rssService";

const SYNC_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes
const STARTUP_DELAY_MS = 15 * 1000; // 15 seconds after server start

let syncTimer: ReturnType<typeof setInterval> | null = null;
let isRunning = false;
let lastSyncAt: Date | null = null;
let lastSyncResults: { totalNew: number; sources: number; errors: number } | null = null;

async function runSync() {
  if (isRunning) {
    console.log("[RSS-Cron] Sync already in progress, skipping...");
    return;
  }

  isRunning = true;
  const startTime = Date.now();
  console.log(`[RSS-Cron] Starting automatic RSS sync at ${new Date().toISOString()}`);

  try {
    const results = await syncAllRssSources();
    const totalNew = results.reduce((sum, r) => sum + r.newArticles, 0);
    const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0);
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    lastSyncAt = new Date();
    lastSyncResults = {
      totalNew,
      sources: results.length,
      errors: totalErrors,
    };

    console.log(
      `[RSS-Cron] Sync complete in ${duration}s: ${totalNew} new articles from ${results.length} sources` +
      (totalErrors > 0 ? ` (${totalErrors} errors)` : "")
    );
  } catch (err: any) {
    console.error(`[RSS-Cron] Sync failed: ${err.message}`);
  } finally {
    isRunning = false;
  }
}

/**
 * Start the automatic RSS sync cron.
 * Called once from the server startup.
 */
export function startRssCron() {
  console.log(`[RSS-Cron] Scheduling automatic sync every ${SYNC_INTERVAL_MS / 60000} minutes`);

  // Run first sync after a short delay to let the server fully start
  setTimeout(() => {
    runSync();
  }, STARTUP_DELAY_MS);

  // Then run at regular intervals
  syncTimer = setInterval(() => {
    runSync();
  }, SYNC_INTERVAL_MS);

  // Prevent the timer from keeping the process alive if everything else shuts down
  if (syncTimer.unref) {
    syncTimer.unref();
  }
}

/**
 * Stop the automatic RSS sync cron.
 */
export function stopRssCron() {
  if (syncTimer) {
    clearInterval(syncTimer);
    syncTimer = null;
    console.log("[RSS-Cron] Automatic sync stopped");
  }
}

/**
 * Get the current status of the RSS cron.
 */
export function getRssCronStatus() {
  return {
    isActive: syncTimer !== null,
    isCurrentlyRunning: isRunning,
    lastSyncAt,
    lastSyncResults,
    intervalMinutes: SYNC_INTERVAL_MS / 60000,
  };
}

/**
 * Manually trigger a sync (from admin endpoint).
 */
export async function triggerManualSync() {
  return runSync();
}
