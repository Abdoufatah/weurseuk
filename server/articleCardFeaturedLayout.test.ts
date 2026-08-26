import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const articleCardSource = readFileSync(
  resolve(process.cwd(), "client/src/components/ArticleCard.tsx"),
  "utf8",
);

describe("carte À la Une — illustration", () => {
  it("réserve une place réduite à la couverture sur ordinateur tout en conservant une carte lisible", () => {
    expect(articleCardSource).toContain('h-32 md:h-auto md:w-[22%] md:min-h-[200px]');
    expect(articleCardSource).toContain('object-contain bg-muted/30');
    expect(articleCardSource).toContain('md:w-[78%] md:p-6');
  });
});
