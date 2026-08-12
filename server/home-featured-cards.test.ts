import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const homePageSource = readFileSync(
  resolve(process.cwd(), "client/src/pages/Home.tsx"),
  "utf8",
);

describe("présentation des articles À la Une", () => {
  it("utilise une carte éditoriale compacte et douce, plutôt qu’une photo de fond", () => {
    expect(homePageSource).toContain("cartes éditoriales douces");
    expect(homePageSource).toContain("object-contain");
    expect(homePageSource).toContain("rgba(255,254,249,0.98)");
    expect(homePageSource).toContain("line-clamp-1 sm:line-clamp-2");
  });

  it("préserve la signature d’alias dans les articles À la Une", () => {
    expect(homePageSource).toContain("useAlias");
    expect(homePageSource).toContain("authorAlias");
  });
});
