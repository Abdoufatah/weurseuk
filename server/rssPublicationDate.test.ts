import { describe, expect, it } from "vitest";
import { resolveRssPublishedAt } from "./rssService";

describe("resolveRssPublishedAt", () => {
  const fetchedAt = new Date("2026-10-05T23:30:00.000Z");

  it("conserve une date RSS cohérente", () => {
    expect(resolveRssPublishedAt("Sun, 05 Oct 2026 23:15:00 GMT", fetchedAt).toISOString())
      .toBe("2026-10-05T23:15:00.000Z");
  });

  it("ramène une date future incohérente à l’instant de récupération", () => {
    expect(resolveRssPublishedAt("Wed, 07 Oct 2026 21:18:00 +0200", fetchedAt).toISOString())
      .toBe(fetchedAt.toISOString());
  });

  it("ramène une date absente ou invalide à l’instant de récupération", () => {
    expect(resolveRssPublishedAt(undefined, fetchedAt).toISOString()).toBe(fetchedAt.toISOString());
    expect(resolveRssPublishedAt("date-invalide", fetchedAt).toISOString()).toBe(fetchedAt.toISOString());
  });
});
