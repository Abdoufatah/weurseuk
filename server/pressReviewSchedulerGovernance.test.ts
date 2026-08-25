import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("gouvernance des parutions éditoriales", () => {
  const source = fs.readFileSync(
    path.resolve(process.cwd(), "server/journalists/press-review-scheduler.ts"),
    "utf8",
  );

  it("ne programme plus de publication éditoriale biquotidienne", () => {
    expect(source).not.toContain('from "node-cron"');
    expect(source).not.toContain('schedule("30 7');
    expect(source).not.toContain('schedule("30 14');
  });

  it("refuse une publication manuelle non arbitrée", () => {
    expect(source).toContain("arbitrage explicite de Fatah requis");
  });
});
