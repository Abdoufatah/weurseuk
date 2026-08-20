/**
 * YouTube Auto-Sync Cron Service
 * Fetches latest videos from top Senegalese YouTube channels via RSS.
 * Runs inside the Express server process — no external cron daemon needed.
 */

import { syncYouTubeVideos, syncAidaraPressReview, syncFabriceNguemaPressReview } from "./youtube-sync";

const SYNC_INTERVAL_MS = 2 * 60 * 60 * 1000; // 2 hours
const STARTUP_DELAY_MS = 30 * 1000; // 30 seconds after server start

let syncTimer: ReturnType<typeof setInterval> | null = null;
let isRunning = false;
let lastSyncAt: Date | null = null;
let lastSyncResults: { newVideos: number; errors: number } | null = null;

async function runSync() {
  if (isRunning) {
    console.log("[YouTube-Cron] Sync already in progress, skipping...");
    return;
  }

  isRunning = true;
  console.log(`[YouTube-Cron] Starting YouTube sync at ${new Date().toISOString()}`);

  try {
    const results = await syncYouTubeVideos();
    // Also sync the two daily press-review programmes shown on the homepage.
    await Promise.all([syncAidaraPressReview(), syncFabriceNguemaPressReview()]);
    lastSyncAt = new Date();
    lastSyncResults = results;
  } catch (err: any) {
    console.error(`[YouTube-Cron] Sync failed: ${err.message}`);
  } finally {
    isRunning = false;
  }
}

/**
 * Legacy compatibility shim. Scheduled YouTube work now runs through the
 * durable authenticated /api/scheduled/youtube-sync endpoint.
 */
export function startYouTubeCron() {
  console.log("[YouTube-Cron] Synchronisation durable gérée par la tâche périodique de la plateforme");
}

/**
 * Stop the automatic YouTube sync cron.
 */
export function stopYouTubeCron() {
  if (syncTimer) {
    clearInterval(syncTimer);
    syncTimer = null;
    console.log("[YouTube-Cron] Automatic sync stopped");
  }
}

/**
 * Get the current status of the YouTube cron.
 */
export function getYouTubeCronStatus() {
  return {
    isActive: syncTimer !== null,
    isCurrentlyRunning: isRunning,
    lastSyncAt,
    lastSyncResults,
    intervalHours: SYNC_INTERVAL_MS / 3600000,
  };
}
