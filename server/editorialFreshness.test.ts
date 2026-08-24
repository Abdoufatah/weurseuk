import { describe, expect, it } from "vitest";
import { formatLatestEdition } from "../client/src/lib/editorialFreshness";

describe("formatLatestEdition", () => {
  it("indique que la date correspond à la dernière édition effectivement disponible", () => {
    expect(formatLatestEdition("2026-08-21T08:00:00Z")).toContain("Dernière édition disponible");
    expect(formatLatestEdition("2026-08-21T08:00:00Z")).toContain("21 août 2026");
  });

  it("reste explicite quand la date source est absente ou illisible", () => {
    expect(formatLatestEdition()).toBe("Dernière édition disponible");
    expect(formatLatestEdition("date-invalide")).toBe("Dernière édition disponible");
  });
});
