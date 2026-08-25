/**
 * Press Review Scheduler v2.2
 * Les anciens déclenchements automatiques sont suspendus.
 * Toute parution éditoriale relève désormais d’un arbitrage explicite.
 */

import { generateAndPublishPressReview, PressReviewSession } from "./admin-agent";

// Historique des sessions en mémoire
const sessions: Map<string, PressReviewSession> = new Map();

/**
 * Conserve le point d’initialisation sans planifier de publication.
 * La périodicité sera rétablie uniquement après choix et arbitrage de Fatah.
 */
export function initializePressReviewScheduler() {
  console.log("[PressReviewScheduler] Publication automatique suspendue : arbitrage éditorial requis");
}

/**
 * Exécute une session de revue de presse
 */
async function runPressReviewSession() {
  try {
    const session = await generateAndPublishPressReview();
    sessions.set(session.sessionId, session);

    if (session.status === "drafted") {
      console.log(`[PressReviewScheduler] ✅ ${session.articlesPublished.length} brouillons créés, arbitrage requis`);
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
  throw new Error("Publication éditoriale suspendue : arbitrage explicite de Fatah requis");
}
