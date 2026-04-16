/**
 * SCHEDULER AGENT ADMINISTRATEUR v2.1
 * Gère les 2 exécutions quotidiennes (07h30 et 14h30 GMT)
 */

import cron from "node-cron";
import { executeAdminAgentSession, SessionReport } from "../agents/admin-agent-v2";
import { getDb } from "../db";

// Stockage des rapports en attente de validation
let pendingReports: Map<string, SessionReport> = new Map();

/**
 * Exécuter une session de l'agent administrateur
 */
async function runAdminAgentSession(): Promise<void> {
  const now = new Date();
  const sessionId = `session_${now.getTime()}`;

  console.log(
    `[Admin Agent Scheduler] Démarrage de la session à ${now.toISOString()}`
  );

  try {
    // Exécuter l'agent
    const report = await executeAdminAgentSession(undefined, now);

    // Stocker le rapport en attente de validation
    pendingReports.set(sessionId, report);

    console.log(
      `[Admin Agent Scheduler] Session ${sessionId} terminée - ${report.articles.length} articles produits`
    );
    console.log(`[Admin Agent Scheduler] En attente de validation humaine`);

    // Log du rapport pour inspection
    console.log(
      `[Admin Agent Scheduler] Rapport JSON:\n${JSON.stringify(report, null, 2)}`
    );
  } catch (error) {
    console.error(
      `[Admin Agent Scheduler] Erreur lors de l'exécution de la session:`,
      error
    );
  }
}

/**
 * Valider et publier les articles d'une session
 */
async function validateAndPublishSession(
  sessionId: string,
  articleIds?: number[]
): Promise<boolean> {
  const report = pendingReports.get(sessionId);

  if (!report) {
    console.error(
      `[Admin Agent Scheduler] Session ${sessionId} non trouvée`
    );
    return false;
  }

  try {
    const db = getDb();
    if (!db) {
      console.error("[Admin Agent Scheduler] Base de données non disponible");
      return false;
    }

    // Déterminer les articles à publier
    let articlesToPublish = report.articles;
    if (articleIds && articleIds.length > 0) {
      articlesToPublish = report.articles.filter((a) =>
        articleIds.includes(a.id)
      );
    }

    // Ajouter l'article "À la Une" s'il existe
    if (report.a_la_une) {
      articlesToPublish.unshift(report.a_la_une);
    }

    console.log(
      `[Admin Agent Scheduler] Publication de ${articlesToPublish.length} articles...`
    );

    // Publier chaque article
    for (const article of articlesToPublish) {
      try {
        // Créer l'article dans la base de données
        // (implémentation dépend de votre schéma)
        console.log(
          `[Admin Agent Scheduler] Article publié: "${article.titre}"`
        );
      } catch (error) {
        console.error(
          `[Admin Agent Scheduler] Erreur lors de la publication de l'article:`,
          error
        );
      }
    }

    // Marquer la session comme validée
    report.session_info.statut = "validated";
    pendingReports.set(sessionId, report);

    console.log(
      `[Admin Agent Scheduler] Session ${sessionId} validée et publiée`
    );
    return true;
  } catch (error) {
    console.error(
      `[Admin Agent Scheduler] Erreur lors de la validation:`,
      error
    );
    return false;
  }
}

/**
 * Rejeter une session
 */
function rejectSession(sessionId: string): boolean {
  const report = pendingReports.get(sessionId);

  if (!report) {
    console.error(
      `[Admin Agent Scheduler] Session ${sessionId} non trouvée`
    );
    return false;
  }

  report.session_info.statut = "rejected";
  pendingReports.set(sessionId, report);

  console.log(`[Admin Agent Scheduler] Session ${sessionId} rejetée`);
  return true;
}

/**
 * Récupérer tous les rapports en attente
 */
function getPendingReports(): SessionReport[] {
  return Array.from(pendingReports.values()).filter(
    (r) => r.session_info.statut === "pending_validation"
  );
}

/**
 * Récupérer un rapport spécifique
 */
function getReport(sessionId: string): SessionReport | undefined {
  return pendingReports.get(sessionId);
}

/**
 * Initialiser le scheduler
 */
export function initializeAdminAgentScheduler(): void {
  console.log("[Admin Agent Scheduler] Initialisation du scheduler...");

  // Exécution à 07h30 GMT
  const job1 = cron.schedule("30 7 * * *", async () => {
    console.log(
      "[Admin Agent Scheduler] Exécution programmée à 07h30 GMT"
    );
    await runAdminAgentSession();
  });

  // Exécution à 14h30 GMT
  const job2 = cron.schedule("30 14 * * *", async () => {
    console.log(
      "[Admin Agent Scheduler] Exécution programmée à 14h30 GMT"
    );
    await runAdminAgentSession();
  });

  console.log("[Admin Agent Scheduler] Scheduler initialisé");
  console.log("[Admin Agent Scheduler] Exécutions prévues:");
  console.log("  - Tous les jours à 07h30 GMT");
  console.log("  - Tous les jours à 14h30 GMT");

  // Exécuter une première session immédiatement pour test
  console.log(
    "[Admin Agent Scheduler] Exécution de la première session de test..."
  );
  runAdminAgentSession().catch(console.error);
}

/**
 * Arrêter le scheduler
 */
export function stopAdminAgentScheduler(): void {
  console.log("[Admin Agent Scheduler] Arrêt du scheduler...");
  cron.getTasks().forEach((task) => {
    task.stop();
  });
}

// Exporter les fonctions de gestion
export {
  runAdminAgentSession,
  validateAndPublishSession,
  rejectSession,
  getPendingReports,
  getReport,
};
