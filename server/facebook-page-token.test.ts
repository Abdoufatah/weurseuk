import { describe, expect, it } from "vitest";

const EXPECTED_PAGE_ID = "1169698876216799";
const PAGE_NAME = "Abdou Fatah FALL";

describe("Facebook Page Access Token", () => {
  it("valide l’accès sécurisé à la Page configurée", async () => {
    const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
    const pageId = process.env.FACEBOOK_PAGE_ID;
    expect(token, "Le jeton de Page doit être configuré").toBeTruthy();
    expect(pageId, "L’identifiant de Page doit être configuré").toBe(EXPECTED_PAGE_ID);

    const query = new URLSearchParams({
      fields: "id,name",
      access_token: token!,
    });
    const response = await fetch(`https://graph.facebook.com/v26.0/${pageId}?${query}`);
    const payload = await response.json() as {
      id?: string;
      name?: string;
      error?: { message?: string };
    };

    expect(response.ok, payload.error?.message ?? "Meta a refusé le jeton de Page").toBe(true);
    expect(payload.id).toBe(EXPECTED_PAGE_ID);
    expect(payload.name).toBe(PAGE_NAME);
  }, 15_000);
});
