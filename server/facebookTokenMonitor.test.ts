import { describe, expect, it } from "vitest";
import { inspectFacebookPageToken } from "./facebookTokenMonitor";

describe("Contrôle périodique du jeton Facebook", () => {
  it("valide la page configurée par une requête de lecture seule", async () => {
    let requestUrl = "";
    let authorization = "";
    const inspection = await inspectFacebookPageToken(
      "jeton-de-test",
      "1169698876216799",
      async (input, init) => {
        requestUrl = String(input);
        authorization = String((init?.headers as Record<string, string>).Authorization);
        return new Response(JSON.stringify({ id: "1169698876216799", name: "Abdou Fatah FALL" }), { status: 200 });
      },
    );

    expect(requestUrl).toContain("/1169698876216799?fields=id,name");
    expect(requestUrl).not.toContain("/feed");
    expect(authorization).toBe("Bearer jeton-de-test");
    expect(inspection).toMatchObject({ ok: true, status: "valid", pageName: "Abdou Fatah FALL" });
  });

  it("signale le rejet Meta sans effectuer de publication", async () => {
    const inspection = await inspectFacebookPageToken(
      "jeton-de-test",
      "1169698876216799",
      async () => new Response(JSON.stringify({ error: { code: 190, subcode: 463, message: "Session has expired" } }), { status: 400 }),
    );

    expect(inspection.ok).toBe(false);
    expect(inspection.status).toBe("invalid");
    expect(inspection.diagnostic).toContain("code 190");
    expect(inspection.diagnostic).toContain("sous-code 463");
  });
});
