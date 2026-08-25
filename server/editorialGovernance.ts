import type { Request, Response as ExpressResponse } from "express";
import { getEditorialGovernanceSettings, updateEditorialGovernanceSettings } from "./db";
import { notifyOwner } from "./_core/notification";
import { sdk } from "./_core/sdk";

export const WEEKLY_EDITORIAL_REMINDER_CRON = "0 30 8 * * 1";

/**
 * This reminder is deliberately non-generative and non-publishing. It asks
 * the owner to arbitrate a potential weekly editorial; it never creates text,
 * changes a draft or queues a Facebook post.
 */
export async function runWeeklyEditorialArbitrationReminder() {
  const settings = await getEditorialGovernanceSettings();
  if (!settings?.automaticPublicationSuspended) {
    throw new Error("La sécurité éditoriale est inactive : rappel interrompu.");
  }

  await updateEditorialGovernanceSettings({ lastReminderAt: new Date() });
  const notified = await notifyOwner({
    title: "Weurseuk — arbitrage éditorial hebdomadaire requis",
    content: "Le créneau du lundi 08:30 GMT est atteint. Aucun éditorial n’a été généré ni publié. Arbitrez explicitement une parution, sa signature — Abdou Fatah Fall ou Bensirac par défaut — et son éventuel statut À la Une avant toute publication.",
  });

  return { notified, remindedAt: new Date().toISOString(), generated: false, published: false };
}

export async function editorialArbitrationReminderScheduledHandler(req: Request, res: ExpressResponse) {
  try {
    const user = await sdk.authenticateRequest(req);
    if (!user.isCron || !user.taskUid) return res.status(403).json({ error: "cron-only" });
    const settings = await getEditorialGovernanceSettings();
    if (!settings || settings.weeklyReminderTaskUid !== user.taskUid) {
      return res.json({ ok: true, skipped: "orphan-or-unmatched-schedule" });
    }
    const result = await runWeeklyEditorialArbitrationReminder();
    return res.json({ handled: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message, timestamp: new Date().toISOString() });
  }
}
