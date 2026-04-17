/**
 * Press Review Scheduler
 * Runs biquotidian sessions at 07:30 and 14:30 GMT
 */

import { generatePressReviewSession, validateAndPublishSession, PressReviewSession } from "./admin-agent";
import { schedule } from "node-cron";

// Store sessions in memory (in production, use database)
const sessions: Map<string, PressReviewSession> = new Map();

/**
 * Initialize the scheduler
 */
export function initializePressReviewScheduler() {
  console.log("[PressReviewScheduler] Initializing scheduler");

  // Run at 07:30 GMT
  schedule("30 7 * * *", async () => {
    console.log("[PressReviewScheduler] Running morning session (07:30 GMT)");
    await runPressReviewSession();
  }, { timezone: "UTC" });

  // Run at 14:30 GMT
  schedule("30 14 * * *", async () => {
    console.log("[PressReviewScheduler] Running afternoon session (14:30 GMT)");
    await runPressReviewSession();
  }, { timezone: "UTC" });

  console.log("[PressReviewScheduler] ✅ Scheduler initialized");
}

/**
 * Run a press review session
 */
export async function runPressReviewSession() {
  try {
    const session = await generatePressReviewSession();
    if (!session) {
      console.error("[PressReviewScheduler] Failed to generate session");
      return;
    }

    // Store session
    sessions.set(session.sessionId, session);

    // Auto-validate and publish (can be changed to require manual validation)
    const published = await validateAndPublishSession(session);
    if (published) {
      console.log(`[PressReviewScheduler] ✅ Session published: ${session.sessionId}`);
    }
  } catch (error) {
    console.error("[PressReviewScheduler] Error running session:", error);
  }
}

/**
 * Get session by ID
 */
export function getSession(sessionId: string): PressReviewSession | undefined {
  return sessions.get(sessionId);
}

/**
 * Get all sessions
 */
export function getAllSessions(): PressReviewSession[] {
  return Array.from(sessions.values());
}

/**
 * Validate session (for manual validation)
 */
export async function validateSession(sessionId: string): Promise<boolean> {
  const session = sessions.get(sessionId);
  if (!session) {
    console.error(`[PressReviewScheduler] Session not found: ${sessionId}`);
    return false;
  }

  return await validateAndPublishSession(session);
}

/**
 * Reject session
 */
export function rejectReport(sessionId: string, reason: string): void {
  const session = sessions.get(sessionId);
  if (!session) {
    console.error(`[PressReviewScheduler] Session not found: ${sessionId}`);
    return;
  }

  session.status = "rejected";
  session.validationFeedback = reason;
  console.log(`[PressReviewScheduler] Session rejected: ${sessionId} - Reason: ${reason}`);
}

/**
 * Run now (for manual trigger)
 */
export async function runNow(): Promise<void> {
  console.log("[PressReviewScheduler] Manual trigger - Running session now");
  await runPressReviewSession();
}
