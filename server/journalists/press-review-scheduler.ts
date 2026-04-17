/**
 * Press Review Scheduler v2.2
 * Exécute les sessions de revue de presse à 07h30 et 14h30 GMT
 * Les articles sont directement publiés en base de données
 */

import { generateAndPublishPressReview, PressReviewSession } from "./admin-agent";
import { schedule } from "node-cron";

// Historique des sessions en mémoire
const sessions: Map<string, PressReviewSession> = new Map();

/**
 * Initialise le scheduler biquotidien
 */
export function initializePressReviewScheduler() {
  console.log("[PressReviewScheduler] Initialisation du scheduler v2.2");

  // 07h30 GMT
  schedule("30 7 * * *", async () => {
    console.log("[PressReviewScheduler] Session matinale (07:30 GMT)");
    await runPressReviewSession();
  }, { timezone: "UTC" });

  // 14h30 GMT
  schedule("30 14 * * *", async () => {
    console.log("[PressReviewScheduler] Session après-midi (14:30 GMT)");
    await runPressReviewSession();
  }, { timezone: "UTC" });

  console.log("[PressReviewScheduler] ✅ Scheduler v2.2 actif (07h30 et 14h30 GMT)");
}

/**
 * Exécute une session de revue de presse
 */
async function runPressReviewSession() {
  try {
    const session = await generateAndPublishPressReview();
    sessions.set(session.sessionId, session);

    if (session.status === "published") {
      console.log(`[PressReviewScheduler] ✅ ${session.articlesPublished.length} articles publiés`);
    } else {
      console.log(`[PressReviewScheduler] ⚠️ Session échouée: ${session.incidents.join(", ")}`);
    }
  } catch (error) {
    console.error("[PressReviewScheduler] ❌ Erreur:", error);
  }
}

// Exports pour les tRPC procedures
export function getSession(sessionId: string) { return sessions.get(sessionId); }
export function getAllSessions() { return Array.from(sessions.values()); }
export function listReports() { return getAllSessions().map(s => ({ id: s.sessionId, report: s })); }
export function getReport(id: string) { return sessions.get(id); }
export function rejectReport(id: string, reason: string) {
  const s = sessions.get(id);
  if (s) { s.status = "failed"; console.log(`[Scheduler] Session rejetée: ${id} - ${reason}`); }
}
export async function validateAndPublish(id: string, _ids: number[]) {
  console.log(`[Scheduler] Session ${id} déjà publiée automatiquement`);
}
export async function runNow() {
  console.log("[PressReviewScheduler] Exécution manuelle");
  await runPressReviewSession();
}
