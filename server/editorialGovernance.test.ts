import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(projectRoot, relative), "utf8");

describe("gouvernance éditoriale arbitré", () => {
  it("empêche l’agent de publier automatiquement les contenus générés", () => {
    const source = read("server/journalists/admin-agent.ts");
    expect(source).toContain("isPublished: false");
    expect(source).toContain('status: "generating" | "drafted" | "failed"');
    expect(source).not.toContain("isPublished: true,");
  });

  it("empêche également l’intégration automatisée de contourner l’arbitrage", () => {
    const source = read("server/routers.ts");
    const n8nBlock = source.slice(source.indexOf("n8n: router"));
    expect(n8nBlock).toContain("isPublished: false");
    expect(n8nBlock).toContain('status: "draft"');
    expect(n8nBlock).not.toContain("isPublished: true");
  });

  it("programme uniquement un rappel d’arbitrage non génératif et non publiant", () => {
    const source = read("server/editorialGovernance.ts");
    const serverSource = read("server/_core/index.ts");
    expect(source).toContain('WEEKLY_EDITORIAL_REMINDER_CRON = "0 30 8 * * 1"');
    expect(source).toContain("generated: false, published: false");
    expect(serverSource).toContain("editorial-arbitration-reminder");
  });
});
