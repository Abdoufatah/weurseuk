import type { Request, Response as ExpressResponse } from "express";
import { getFacebookPublisherSettings, updateFacebookPublisherSettings } from "./db";
import { normalizeFacebookAccessToken } from "./facebookToken";
import { notifyOwner } from "./_core/notification";
import { sdk } from "./_core/sdk";

const META_GRAPH_VERSION = "v26.0";

export type FacebookTokenInspection = {
  ok: boolean;
  status: "valid" | "invalid" | "configuration-error" | "network-error";
  diagnostic: string;
  pageName?: string;
};

type Fetcher = (input: RequestInfo | URL, init?: RequestInit) => Promise<globalThis.Response>;

/**
 * Interroge uniquement l'actif Page configuré. Cette fonction ne crée aucun
 * post, ne consulte aucune file et ne modifie aucun contenu sur Meta.
 */
export async function inspectFacebookPageToken(
  token: string | undefined,
  pageId: string | undefined,
  request: Fetcher = fetch,
): Promise<FacebookTokenInspection> {
  if (!token || !pageId) {
    return {
      ok: false,
      status: "configuration-error",
      diagnostic: "Le jeton ou l’identifiant de la page Facebook n’est pas configuré.",
    };
  }

  try {
    const response = await request(
      `https://graph.facebook.com/${META_GRAPH_VERSION}/${encodeURIComponent(pageId)}?fields=id,name`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const payload = await response.json() as {
      id?: string;
      name?: string;
      error?: { code?: number; subcode?: number; message?: string };
    };

    if (!response.ok || payload.id !== pageId) {
      const error = payload.error;
      const code = error?.code ?? "inconnu";
      const subcode = error?.subcode ?? "aucun";
      const reason = error?.message?.replace(/\s+/g, " ").trim().slice(0, 360);
      return {
        ok: false,
        status: "invalid",
        diagnostic: `Meta a refusé le jeton pour la page configurée (code ${code}, sous-code ${subcode})${reason ? ` : ${reason}` : ""}.`,
      };
    }

    return {
      ok: true,
      status: "valid",
      diagnostic: `Jeton accepté pour la page ${payload.name ?? pageId}.`,
      pageName: payload.name,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      ok: false,
      status: "network-error",
      diagnostic: `La vérification Meta n’a pas pu aboutir : ${message.replace(/\s+/g, " ").slice(0, 360)}.`,
    };
  }
}

export async function runFacebookPageTokenCheck() {
  const previousSettings = await getFacebookPublisherSettings();
  const token = normalizeFacebookAccessToken(process.env.FACEBOOK_PAGE_ACCESS_TOKEN);
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const inspection = await inspectFacebookPageToken(token, pageId);

  await updateFacebookPublisherSettings({
    tokenLastCheckedAt: new Date(),
    tokenLastStatus: inspection.status,
    tokenLastDiagnostic: inspection.diagnostic,
  });

  const notified = inspection.ok || previousSettings?.tokenLastStatus === inspection.status
    ? false
    : await notifyOwner({
        title: "Weurseuk — contrôle du jeton Facebook : action requise",
        content: `${inspection.diagnostic}\n\nAucune publication Facebook n’a été tentée. Renouvelez le jeton de page, enregistrez-le dans les réglages sécurisés du projet, puis laissez le contrôle suivant confirmer son acceptation.`,
      });

  return { ...inspection, notified, checkedAt: new Date().toISOString() };
}

export async function facebookTokenCheckScheduledHandler(req: Request, res: ExpressResponse) {
  try {
    const user = await sdk.authenticateRequest(req);
    if (!user.isCron || !user.taskUid) {
      return res.status(403).json({ error: "cron-only" });
    }
    const settings = await getFacebookPublisherSettings();
    if (!settings || settings.tokenCheckTaskUid !== user.taskUid) {
      return res.json({ ok: true, skipped: "orphan-or-unmatched-schedule" });
    }
    const result = await runFacebookPageTokenCheck();
    return res.json({ handled: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message, timestamp: new Date().toISOString() });
  }
}
