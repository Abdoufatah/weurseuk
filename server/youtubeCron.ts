/**
 * Compatibility surface for the former in-process YouTube scheduler.
 * Recurring execution is exclusively handled by the authenticated platform
 * task registered on /api/scheduled/youtube-sync.
 */

import { runScheduledYoutubeSync } from "./youtubeScheduled";

let lastSyncAt: Date | null = null;
let lastSyncResults: { newVideos: number; errors: number } | null = null;

/** Manual/server-side invocation retained for diagnostics; it does not schedule work. */
export async function runYouTubeSyncNow() {
  const result = await runScheduledYoutubeSync();
  lastSyncAt = new Date();
  lastSyncResults = result.videos;
  return result;
}

/** The durable platform task owns recurring execution. */
export function startYouTubeCron() {
  console.log("[YouTube-Cron] Synchronisation récurrente gérée par la tâche périodique de la plateforme");
}

/** Present for compatibility with existing callers; no local timer exists to stop. */
export function stopYouTubeCron() {
  console.log("[YouTube-Cron] Aucune minuterie interne active");
}

export function getYouTubeCronStatus() {
  return {
    isActive: false,
    isCurrentlyRunning: false,
    lastSyncAt,
    lastSyncResults,
    intervalHours: 2,
    executionMode: "platform-scheduled" as const,
  };
}
