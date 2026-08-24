import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const app = fs.readFileSync(path.join(projectRoot, "client/src/App.tsx"), "utf8");
const header = fs.readFileSync(path.join(projectRoot, "client/src/components/Header.tsx"), "utf8");
const styles = fs.readFileSync(path.join(projectRoot, "client/src/index.css"), "utf8");

describe("repères fondamentaux d’accessibilité", () => {
  it("permet de rejoindre directement le contenu principal", () => {
    expect(app).toContain('href="#contenu-principal"');
    expect(app).toContain('id="contenu-principal"');
    expect(app).toContain('tabIndex={-1}');
    expect(styles).toContain(".skip-link");
  });

  it("annonce correctement les navigations et l’état du menu mobile", () => {
    expect(header).toContain('aria-label="Navigation principale"');
    expect(header).toContain('aria-label="Navigation mobile"');
    expect(header).toContain('aria-expanded={mobileOpen}');
    expect(header).toContain('aria-controls="navigation-mobile"');
    expect(header).toContain('aria-current={location === section.href ? "page" : undefined}');
  });

  it("préserve un indicateur de focus visible au clavier", () => {
    expect(styles).toContain(":focus-visible");
    expect(styles).toContain("outline-offset: 3px");
    expect(styles).toContain(".skip-link:focus-visible");
    expect(styles).toContain("translateY(0) !important");
  });
});
