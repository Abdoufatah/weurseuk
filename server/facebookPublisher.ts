import type { Request, Response } from "express";
import { sdk } from "./_core/sdk";
import { normalizeFacebookAccessToken } from "./facebookToken";
import {
  enqueueEligibleFacebookEditorials,
  getFacebookPublicationEditorial,
  getFacebookPublisherSettings,
  getPendingFacebookPublicationJobs,
  markFacebookPublicationFailed,
  markFacebookPublicationPublished,
  markFacebookPublicationPublishing,
} from "./db";

const PUBLIC_SITE_URL = "https://weurseuk.com";

type FacebookEditorial = {
  title: string;
  slug: string;
  excerpt: string | null;
  categorySlug: string | null;
  authorName: string | null;
  authorAlias: string | null;
  useAlias: boolean;
};

export function buildFacebookEditorialPost(editorial: FacebookEditorial) {
  const path = editorial.categorySlug ? `/${editorial.categorySlug}/${editorial.slug}` : `/editorial/${editorial.slug}`;
  const targetUrl = `${PUBLIC_SITE_URL}${path}`;
  const author = editorial.useAlias && editorial.authorAlias ? editorial.authorAlias : editorial.authorName;
  const excerpt = (editorial.excerpt ?? "").replace(/\s+/g, " ").trim();
  const messageParts = [editorial.title.trim()];
  if (excerpt) messageParts.push(excerpt);
  if (author) messageParts.push(`Par ${author}`);
  messageParts.push(`Lire l’analyse sur Weurseuk : ${targetUrl}`);
  return { message: messageParts.join("\n\n"), targetUrl };
}

export async function runFacebookPublicationQueue(limit = 3) {
  const settings = await getFacebookPublisherSettings();
  if (!settings?.isEnabled || !settings.firstPostConfirmed) {
    return { skipped: "publication-not-confirmed", queued: 0, published: 0, failed: 0 };
  }
  const token = normalizeFacebookAccessToken(process.env.FACEBOOK_PAGE_ACCESS_TOKEN);
  const pageId = process.env.FACEBOOK_PAGE_ID;
  if (!token || !pageId) {
    throw new Error("Facebook publisher credentials are not configured");
  }

  const queued = await enqueueEligibleFacebookEditorials();
  const jobs = await getPendingFacebookPublicationJobs(limit);
  let published = 0;
  let failed = 0;
  for (const job of jobs) {
    const editorial = await getFacebookPublicationEditorial(job.editorialId);
    if (!editorial) {
      await markFacebookPublicationFailed(job.id, "Editorial introuvable ou non publié");
      failed += 1;
      continue;
    }
    const { message, targetUrl } = buildFacebookEditorialPost(editorial);
    const claimed = await markFacebookPublicationPublishing(job.id, message, targetUrl);
    if (!claimed) continue;
    try {
      const body = new URLSearchParams({ message, link: targetUrl, access_token: token });
      const response = await fetch(`https://graph.facebook.com/v26.0/${pageId}/feed`, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body,
      });
      const payload = await response.json() as { id?: string; error?: { message?: string } };
      if (!response.ok || !payload.id) {
        throw new Error(payload.error?.message ?? "Meta a refusé la publication");
      }
      await markFacebookPublicationPublished(job.id, payload.id);
      published += 1;
    } catch (error) {
      await markFacebookPublicationFailed(job.id, error instanceof Error ? error.message : String(error));
      failed += 1;
    }
  }
  return { queued, published, failed };
}

export async function facebookPublisherScheduledHandler(req: Request, res: Response) {
  try {
    const user = await sdk.authenticateRequest(req);
    if (!user.isCron || !user.taskUid) {
      return res.status(403).json({ error: "cron-only" });
    }
    const settings = await getFacebookPublisherSettings();
    if (!settings || settings.scheduleTaskUid !== user.taskUid) {
      return res.json({ ok: true, skipped: "orphan-or-unmatched-schedule" });
    }
    const result = await runFacebookPublicationQueue();
    return res.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message, timestamp: new Date().toISOString() });
  }
}
