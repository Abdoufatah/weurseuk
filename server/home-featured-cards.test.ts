import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const homePageSource = readFileSync(
  resolve(process.cwd(), "client/src/pages/Home.tsx"),
  "utf8",
);

describe("présentation des articles À la Une", () => {
  it("utilise le gabarit vertical ample de référence sous la vidéo", () => {
    expect(homePageSource).toContain("gabarit éditorial vertical de référence, juste après la vidéo");
    expect(homePageSource).toContain("className=\"max-w-3xl ml-5 md:ml-10\"");
    expect(homePageSource).toContain("className=\"border-primary/25 shadow-sm\"");
    expect(homePageSource).toContain("isFeatured");
    expect(homePageSource).toContain("text-4xl md:text-5xl");
    expect(homePageSource).toContain("w-1.5 h-10 md:h-12");
    expect(homePageSource).not.toContain("cartes éditoriales douces");
  });

  it("préserve la signature d’alias dans les articles À la Une", () => {
    expect(homePageSource).toContain("useAlias");
    expect(homePageSource).toContain("authorAlias");
  });
});
