import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const articleCardSource = readFileSync(
  resolve(process.cwd(), "client/src/components/ArticleCard.tsx"),
  "utf8",
);

describe("ArticleCard — liens internes", () => {
  it("préserve les liens internes vers les analyses et les éditoriaux", () => {
    expect(articleCardSource).toContain('isInternalArticle && sourceUrl && sourceUrl.startsWith("/")');
  });
});
