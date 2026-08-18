import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Facebook publication eligibility", () => {
  it("sélectionne les articles selon leur insertion récente plutôt que leur date éditoriale", () => {
    const source = readFileSync(new URL("./db.ts", import.meta.url), "utf8");
    const eligibilitySection = source.slice(
      source.indexOf("export async function enqueueEligibleFacebookEditorials"),
      source.indexOf("export async function getPendingFacebookPublicationJobs"),
    );

    expect(eligibilitySection).toContain("gte(editorials.createdAt, settings.enabledAt)");
    expect(eligibilitySection).not.toContain("gte(editorials.publishedAt, settings.enabledAt)");
  });
});
