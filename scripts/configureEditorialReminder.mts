import { createHeartbeatJob, updateHeartbeatJob } from "../server/_core/heartbeat";
import { getEditorialGovernanceSettings, updateEditorialGovernanceSettings } from "../server/db";
import { WEEKLY_EDITORIAL_REMINDER_CRON } from "../server/editorialGovernance";

const job = {
  name: "weurseuk-editorial-arbitration-reminder",
  cron: WEEKLY_EDITORIAL_REMINDER_CRON,
  path: "/api/scheduled/editorial-arbitration-reminder",
  method: "POST" as const,
  payload: {},
  description: "Rappel non publiant : arbitrage éditorial hebdomadaire de Fatah, lundi 08:30 GMT.",
};

async function main() {
  const settings = await getEditorialGovernanceSettings();
  if (!settings) throw new Error("Configuration éditoriale indisponible");

  let taskUid = settings.weeklyReminderTaskUid;
  if (taskUid) {
    await updateHeartbeatJob(taskUid, { ...job, enable: true }, "");
  } else {
    const created = await createHeartbeatJob(job, "");
    taskUid = created.taskUid;
  }

  await updateEditorialGovernanceSettings({
    weeklyReminderTaskUid: taskUid,
    weeklyCron: WEEKLY_EDITORIAL_REMINDER_CRON,
    automaticPublicationSuspended: true,
    exceptionalPublicationRequiresApproval: true,
    defaultSignaturePolicy: "Abdou Fatah Fall ou Bensirac",
  });

  console.log(JSON.stringify({ taskUid, cron: WEEKLY_EDITORIAL_REMINDER_CRON, publishing: false }));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
