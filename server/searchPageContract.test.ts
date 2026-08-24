import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const headerSource = readFileSync(resolve(process.cwd(), "client/src/components/Header.tsx"), "utf8");
const searchSource = readFileSync(resolve(process.cwd(), "client/src/pages/Search.tsx"), "utf8");

describe("Recherche publique", () => {
  it("reste accessible depuis l’en-tête et propose un formulaire correctement étiqueté", () => {
    expect(headerSource).toContain('href="/recherche"');
    expect(searchSource).toContain('role="search"');
    expect(searchSource).toContain('htmlFor={inputId}');
    expect(searchSource).toContain('type="submit"');
    expect(searchSource).toContain("setSubmittedQuery(normalized)");
  });

  it("présente les résultats, les liens et un état vide explicite", () => {
    expect(searchSource).toContain("Aucun contenu publié ne correspond");
    expect(searchSource).toContain("contentType === \"editorial\"");
    expect(searchSource).toContain("/article/${result.slug}");
    expect(searchSource).toContain("isExternalSource ? result.sourceUrl!");
    expect(searchSource).toContain('target={isExternalSource ? "_blank" : undefined}');
    expect(searchSource).toContain("result.useAlias && result.authorAlias ? result.authorAlias");
  });
});
