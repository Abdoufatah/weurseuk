import { describe, expect, it } from "vitest";
import { rankSearchCandidates } from "./searchRanking";

describe("rankSearchCandidates", () => {
  const candidates = [
    { id: 1, title: "Sénégal : une analyse de référence", authorName: "Abdou Fatah Fall", authorAlias: "Bensirac", categoryName: "Analyses", contentType: "editorial" as const, slug: "analyse-senegal", publishedAt: new Date("2026-08-20") },
    { id: 2, title: "Dépêche générale", sourceName: "Le Soleil", categoryName: "Actualité", contentType: "article" as const, slug: "depeche-generale", publishedAt: new Date("2026-08-22") },
  ];

  it("trouve les contenus malgré les accents et donne priorité au titre", () => {
    const results = rankSearchCandidates(candidates, "senegal");
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe("analyse-senegal");
  });

  it("interroge les auteurs, rubriques et sources sans retourner les requêtes trop courtes", () => {
    expect(rankSearchCandidates(candidates, "bensirac")[0].id).toBe(1);
    expect(rankSearchCandidates(candidates, "actualite")[0].id).toBe(2);
    expect(rankSearchCandidates(candidates, "s")).toEqual([]);
  });
});
