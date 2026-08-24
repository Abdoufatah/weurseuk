import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("page À propos — équipe éditoriale", () => {
  it("récupère les profils publics et conserve un bloc éditorialiste distinct", () => {
    const source = readFileSync(resolve(process.cwd(), "client/src/pages/APropos.tsx"), "utf8");

    expect(source).toContain("trpc.journalists.list.useQuery");
    expect(source).toContain("L’équipe éditoriale");
    expect(source).toContain("journalist.id !== 30001");
    expect(source).toContain("L'éditorialiste");
  });
});
