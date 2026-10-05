import { describe, expect, it } from "vitest";
import { selectDiverseRssArticles } from "./db";

describe("selectDiverseRssArticles", () => {
  it("empêche une source unique d’occuper tous les emplacements de l’accueil", () => {
    const articles = [
      ...Array.from({ length: 17 }, (_, index) => ({ id: index + 1, sourceName: "Leral" })),
      ...Array.from({ length: 3 }, (_, index) => ({ id: index + 101, sourceName: "APS" })),
      ...Array.from({ length: 3 }, (_, index) => ({ id: index + 201, sourceName: "Dakaractu" })),
      ...Array.from({ length: 3 }, (_, index) => ({ id: index + 301, sourceName: "Le Soleil" })),
      ...Array.from({ length: 3 }, (_, index) => ({ id: index + 401, sourceName: "RFI Afrique" })),
      ...Array.from({ length: 3 }, (_, index) => ({ id: index + 501, sourceName: "Senego" })),
    ];

    const result = selectDiverseRssArticles(articles, 12);
    const names = result.map((article) => article.sourceName);

    expect(result).toHaveLength(12);
    expect(names.filter((name) => name === "Leral")).toHaveLength(2);
    expect(new Set(names).size).toBeGreaterThanOrEqual(6);
  });

  it("complète le module lorsqu’il y a peu de sources actives", () => {
    const articles = Array.from({ length: 5 }, (_, index) => ({ id: index + 1, sourceName: "APS" }));

    expect(selectDiverseRssArticles(articles, 5)).toHaveLength(5);
  });
});
