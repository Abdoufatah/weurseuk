import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const dbSource = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
const rssSource = readFileSync(resolve(process.cwd(), "server/rssService.ts"), "utf8");

describe("contrat de synchronisation RSS", () => {
  it("horodate les articles déjà connus lorsqu’un flux les revérifie", () => {
    expect(dbSource).toContain("export async function markAggregatedArticleFetched");
    expect(dbSource).toContain("set({ fetchedAt: new Date() })");
    expect(rssSource).toContain("await db.markAggregatedArticleFetched(sourceUrl)");
    expect(rssSource).toContain("result.verifiedArticles++");
  });
});
