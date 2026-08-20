import { describe, expect, it } from "vitest";
import { normalizeFacebookAccessToken } from "./facebookToken";

describe("Jeton de page Facebook", () => {
  it("est accepté par l’API Meta et identifie un actif de page", async () => {
    const token = normalizeFacebookAccessToken(process.env.FACEBOOK_PAGE_ACCESS_TOKEN);
    expect(token).toBeTruthy();

    const response = await fetch("https://graph.facebook.com/v26.0/me?fields=id,name", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const payload = await response.json() as { id?: string; name?: string; error?: { code?: number; subcode?: number } };

    const diagnostic = payload.error
      ? `Meta a rejeté le jeton (code ${payload.error.code ?? "inconnu"}, sous-code ${payload.error.subcode ?? "aucun"})`
      : "Meta a renvoyé une réponse inattendue";
    expect(response.ok, diagnostic).toBe(true);
    expect(payload.id).toMatch(/^\d+$/);
    expect(payload.name).toBeTruthy();
  }, 30_000);

  it("élimine uniquement une duplication exacte de deux moitiés identiques", () => {
    expect(normalizeFacebookAccessToken("abcabc")).toBe("abc");
    expect(normalizeFacebookAccessToken("abc123")).toBe("abc123");
    expect(normalizeFacebookAccessToken(undefined)).toBeUndefined();
  });
});
