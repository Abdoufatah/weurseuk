import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { JOURNALISTS } from "./config";

describe("rédaction automatisée — profils réels", () => {
  it("utilise les cinq membres réels de l'équipe éditoriale", () => {
    expect(Object.values(JOURNALISTS).map((journalist) => journalist.name)).toEqual([
      "Fatou Ndiaye",
      "Birama Diop",
      "Sougoufara Diaw",
      "Mously Diakhaté",
      "Moustapha Faye",
    ]);
  });

  it("relie chaque publication automatisée à un profil auteur réel", () => {
    const source = readFileSync(resolve(process.cwd(), "server/journalists/admin-agent.ts"), "utf8");

    expect(source).toContain("const AUTHOR_PROFILE_MAP");
    expect(source).toContain("authorId: AUTHOR_PROFILE_MAP[assignment.journalistId]");
    expect(source).not.toContain('journalistId: "awa_diop"');
    expect(source).not.toContain('journalistId: "moussa_fall"');
  });
});
