import type { Request, Response } from "express";
import { sdk } from "./_core/sdk";
import { getYoutubeSyncSettings, updateYoutubeSyncSettings } from "./db";
import {
  syncAidaraPressReview,
  syncFabriceNguemaPressReview,
  syncYouTubeVideos,
} from "./youtube-sync";

/** Executes the complete YouTube refresh once; all writes are idempotent. */
export async function runScheduledYoutubeSync() {
  const [videos, aidara, fabriceNguema] = await Promise.all([
    syncYouTubeVideos(),
    syncAidaraPressReview(),
    syncFabriceNguemaPressReview(),
  ]);
  return { videos, aidara, fabriceNguema };
}

/** Accepts only the registered Heartbeat task and returns inspectable JSON. */
export async function youtubeSyncScheduledHandler(req: Request, res: Response) {
  try {
    const user = await sdk.authenticateRequest(req);
    if (!user.isCron || !user.taskUid) {
      return res.status(403).json({ error: "cron-only" });
    }

    const settings = await getYoutubeSyncSettings();
    if (!settings?.isEnabled || settings.scheduleCronTaskUid !== user.taskUid) {
      return res.json({ ok: true, skipped: "orphan-or-disabled-schedule" });
    }

    const result = await runScheduledYoutubeSync();
    await updateYoutubeSyncSettings({ lastRunAt: new Date() });
    return res.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message, timestamp: new Date().toISOString() });
  }
}
