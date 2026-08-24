import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("journalisation RSS par source", () => {
  it("associe toute erreur de synchronisation à la source concernée", () => {
    const source = readFileSync(resolve(process.cwd(), "server/rssCron.ts"), "utf8");

    expect(source).toContain("Source en erreur");
    expect(source).toContain("result.sourceName");
    expect(source).toContain("result.errors.join");
  });
});
