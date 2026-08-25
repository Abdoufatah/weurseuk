import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const homePageSource = readFileSync(
  resolve(process.cwd(), "client/src/pages/Home.tsx"),
  "utf8",
);

describe("présentation des articles À la Une", () => {
  it("utilise le gabarit vertical de référence sous la vidéo, sans carte compacte", () => {
    expect(homePageSource).toContain("gabarit éditorial vertical de référence, juste après la vidéo");
    expect(homePageSource).toContain("max-w-3xl");
    expect(homePageSource).toContain("className=\"border-primary/25 shadow-sm\"");
    expect(homePageSource).not.toContain("cartes éditoriales douces");
  });

  it("préserve la signature d’alias dans les articles À la Une", () => {
    expect(homePageSource).toContain("useAlias");
    expect(homePageSource).toContain("authorAlias");
  });
});
