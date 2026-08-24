import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const home = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const styles = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

describe("préférence de mouvement réduit", () => {
  it("désactive les animations et transitions non essentielles dans la feuille globale", () => {
    expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
    expect(styles).toContain("animation-duration: 0.01ms !important");
    expect(styles).toContain("transition-duration: 0.01ms !important");
    expect(styles).toContain(".breaking-ticker");
  });

  it("met la vidéo d’ouverture en pause lorsque le lecteur préfère un mouvement réduit", () => {
    expect(home).toContain("prefers-reduced-motion: reduce");
    expect(home).toContain("heroVideoRef.current?.pause()");
    expect(home).toContain("autoPlay={!prefersReducedMotion}");
    expect(home).toContain("loop={!prefersReducedMotion}");
  });
});
