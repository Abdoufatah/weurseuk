import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const articleCardSource = readFileSync(
  resolve(process.cwd(), "client/src/components/ArticleCard.tsx"),
  "utf8",
);

describe("carte À la Une — illustration", () => {
  it("réserve une place réduite à la couverture sur ordinateur tout en conservant une carte lisible", () => {
    expect(articleCardSource).toContain('aspect-[2/1] md:aspect-auto');
    expect(articleCardSource).toContain('md:w-[30%] md:min-h-[220px]');
    expect(articleCardSource).toContain('md:w-[70%] md:p-6');
  });
});
