import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const pagePath = path.join(projectRoot, "client/src/pages/Methodology.tsx");
const appPath = path.join(projectRoot, "client/src/App.tsx");
const footerPath = path.join(projectRoot, "client/src/components/Footer.tsx");

describe("page Méthodologie et corrections", () => {
  it("expose les engagements, les corrections et un parcours de signalement", () => {
    const page = fs.readFileSync(pagePath, "utf8");
    expect(page).toContain("Méthodologie");
    expect(page).toContain("Faits établis");
    expect(page).toContain("Déclarations");
    expect(page).toContain("Corrections et droit de réponse");
    expect(page).toContain('href="/contact"');
    expect(page).toContain('aria-label="Accéder à la page de contact pour signaler une erreur"');
  });

  it("est accessible depuis la route publique et le pied de page", () => {
    expect(fs.readFileSync(appPath, "utf8")).toContain('path="/methodologie-corrections"');
    expect(fs.readFileSync(footerPath, "utf8")).toContain('href="/methodologie-corrections"');
  });
});
