import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const componentSource = readFileSync(
  resolve(process.cwd(), "client/src/components/LazyYouTubeEmbed.tsx"),
  "utf8",
);

describe("LazyYouTubeEmbed — accessibilité de l’activation", () => {
  it("expose une activation native au clavier avec un libellé accessible et un focus visible", () => {
    expect(componentSource).toContain("<button");
    expect(componentSource).toContain('type="button"');
    expect(componentSource).toContain("aria-label={ariaLabel}");
    expect(componentSource).toContain("focus-visible:ring-2");
    expect(componentSource).toContain('<span className="sr-only">{ariaLabel}</span>');
    expect(componentSource).toContain("onClick={() => setIsActive(true)}");
  });
});
