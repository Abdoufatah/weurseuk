/**
 * SCHEDULER - AGENT AUTONOME DE REVUE DE PRESSE
 * Exécute l'agent 2 fois par jour (6h et 18h GMT)
 */

import cron from 'node-cron';
import { executePressReviewSession, publishValidatedArticles } from '../agents/press-review-agent';
import type { PressReviewReport } from '../agents/press-review-agent';

// Stockage des rapports en attente de validation
const pendingReports: Map<string, PressReviewReport> = new Map();

/**
 * Exécute une session de revue de presse
 */
async function runPressReviewSession(): Promise<void> {
  try {
    console.log('\n🚀 DÉMARRAGE SESSION REVUE DE PRESSE AUTOMATIQUE');
    console.log(`⏰ Heure: ${new Date().toISOString()}`);

    // Calculer les timestamps
    const now = new Date();
    const lastSession = new Date(now.getTime() - 12 * 60 * 60 * 1000); // 12 heures avant

    // Exécuter l'agent
    const report = await executePressReviewSession(
      now.toISOString(),
      lastSession.toISOString(),
      'Aucun'
    );

    // Stocker le rapport pour validation
    const reportId = `report_${Date.now()}`;
    pendingReports.set(reportId, report);

    console.log(`\n📋 RAPPORT GÉNÉRÉ`);
    console.log(`ID: ${reportId}`);
    console.log(`Articles: ${report.session_info.nb_sujets_total}`);
    console.log(`Statut: ${report.session_info.statut}`);
    console.log(`\n⏳ En attente de validation humaine...`);

    // Notifier l'administrateur
    await notifyAdmin(reportId, report);

  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution de la session:', error);
  }
}

/**
 * Notifie l'administrateur d'un nouveau rapport
 */
async function notifyAdmin(reportId: string, report: PressReviewReport): Promise<void> {
  console.log(`\n📧 NOTIFICATION ADMINISTRATEUR`);
  console.log(`Nouveau rapport disponible: ${reportId}`);
  console.log(`Articles à valider: ${report.session_info.nb_sujets_total}`);
  console.log(`URL de validation: /admin/press-review/${reportId}`);
}

/**
 * Valide et publie les articles d'un rapport
 */
export async function validateAndPublish(
  reportId: string,
  validatedIds: number[]
): Promise<void> {
  const report = pendingReports.get(reportId);
  if (!report) {
    throw new Error(`Rapport non trouvé: ${reportId}`);
  }

  try {
    console.log(`\n✅ VALIDATION ET PUBLICATION`);
    console.log(`Rapport: ${reportId}`);
    console.log(`Articles à publier: ${validatedIds.join(', ')}`);

    await publishValidatedArticles(report, validatedIds);

    // Marquer comme publié
    report.session_info.statut = 'published';
    pendingReports.set(reportId, report);

    console.log(`\n✅ PUBLICATION RÉUSSIE`);
  } catch (error) {
    console.error('❌ Erreur lors de la publication:', error);
    throw error;
  }
}

/**
 * Rejette un rapport
 */
export function rejectReport(reportId: string, reason: string): void {
  const report = pendingReports.get(reportId);
  if (!report) {
    throw new Error(`Rapport non trouvé: ${reportId}`);
  }

  report.session_info.statut = 'rejected';
  pendingReports.set(reportId, report);

  console.log(`\n❌ RAPPORT REJETÉ`);
  console.log(`ID: ${reportId}`);
  console.log(`Raison: ${reason}`);
}

/**
 * Récupère un rapport
 */
export function getReport(reportId: string): PressReviewReport | undefined {
  return pendingReports.get(reportId);
}

/**
 * Liste tous les rapports
 */
export function listReports(): Array<{ id: string; report: PressReviewReport }> {
  return Array.from(pendingReports.entries()).map(([id, report]) => ({
    id,
    report
  }));
}

/**
 * Initialise le scheduler
 */
export function initializePressReviewScheduler(): void {
  console.log('\n📅 INITIALISATION DU SCHEDULER');
  console.log('🕐 Exécutions prévues: 06:00 GMT et 18:00 GMT');

  // Exécution à 6h GMT
  cron.schedule('0 6 * * *', () => {
    console.log('\n⏰ DÉCLENCHEMENT PROGRAMMÉ: 6h GMT');
    runPressReviewSession();
  }, {
    timezone: 'GMT'
  });

  // Exécution à 18h GMT
  cron.schedule('0 18 * * *', () => {
    console.log('\n⏰ DÉCLENCHEMENT PROGRAMMÉ: 18h GMT');
    runPressReviewSession();
  }, {
    timezone: 'GMT'
  });

  console.log('✅ Scheduler initialisé avec succès');
}

/**
 * Exécute une session immédiatement (pour tests)
 */
export async function runNow(): Promise<void> {
  console.log('\n🧪 EXÉCUTION IMMÉDIATE (TEST)');
  await runPressReviewSession();
}

export default initializePressReviewScheduler;
