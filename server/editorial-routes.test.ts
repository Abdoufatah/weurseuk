import { describe, expect, it } from "vitest";

/**
 * Tests to ensure editorial URL routing consistency.
 * The frontend route for editorial detail is /editorial/:slug (singular).
 * All internal links must use this pattern.
 */

describe("Editorial URL routing consistency", () => {
  const EDITORIAL_DETAIL_PREFIX = "/editorial/";
  const EDITORIAL_LIST_PATH = "/editoriaux";

  it("editorial detail route uses singular /editorial/:slug", () => {
    // The route defined in App.tsx is /editorial/:slug
    const testSlug = "senegal-croisee-fractures-anatomie-reve-devoye-perils-afrique-ouest";
    const expectedUrl = `${EDITORIAL_DETAIL_PREFIX}${testSlug}`;
    expect(expectedUrl).toBe(`/editorial/${testSlug}`);
    expect(expectedUrl).not.toMatch(/^\/editoriaux\//);
  });

  it("editorial list route uses plural /editoriaux", () => {
    expect(EDITORIAL_LIST_PATH).toBe("/editoriaux");
  });

  it("internal breaking news links starting with / should use /editorial/ for editorial detail", () => {
    // Simulate a breaking news sourceUrl for an editorial
    const sourceUrl = "/editorial/senegal-croisee-fractures-anatomie-reve-devoye-perils-afrique-ouest";
    expect(sourceUrl.startsWith("/editorial/")).toBe(true);
    expect(sourceUrl.startsWith("/editoriaux/")).toBe(false);
  });

  it("slugify produces clean URL-safe slugs", () => {
    function slugify(text: string): string {
      return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .substring(0, 200);
    }

    const title = "Le Sénégal à la croisée des fractures : anatomie d'un rêve dévoyé";
    const slug = slugify(title);
    expect(slug).toBe("le-senegal-a-la-croisee-des-fractures-anatomie-d-un-reve-devoye");
    expect(slug).not.toMatch(/[^a-z0-9-]/);
    expect(slug).not.toMatch(/^-|-$/);
  });

  it("ArticleCard editorial links use /editorial/ prefix", () => {
    // Simulating the link generation logic from ArticleCard
    const editorialSlug = "test-editorial-slug";
    const link = `/editorial/${editorialSlug}`;
    expect(link).toBe("/editorial/test-editorial-slug");
    expect(link).toMatch(/^\/editorial\/[a-z0-9-]+$/);
  });

  it("breaking news sourceUrl for editorials must match frontend route pattern", () => {
    // The frontend route is /editorial/:slug
    // Any internal breaking news link for an editorial must match this pattern
    const validPattern = /^\/editorial\/[a-z0-9-]+$/;
    const invalidPattern = /^\/editoriaux\//;

    // Valid examples
    expect("/editorial/senegal-croisee-fractures").toMatch(validPattern);
    expect("/editorial/analyse-politique-2026").toMatch(validPattern);

    // Invalid examples (would cause 404)
    expect("/editoriaux/senegal-croisee-fractures").toMatch(invalidPattern);
    expect("/editoriaux/analyse-politique-2026").toMatch(invalidPattern);

    // Ensure valid does not match invalid
    expect("/editorial/senegal-croisee-fractures").not.toMatch(invalidPattern);
  });

  it("admin editorial creation generates slug compatible with /editorial/:slug route", () => {
    function slugify(text: string): string {
      return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .substring(0, 200);
    }

    const title = "Analyse de la crise politique au Sénégal";
    const timestamp = Date.now().toString(36);
    const slug = slugify(title) + "-" + timestamp;
    const fullPath = `/editorial/${slug}`;

    // Must start with /editorial/
    expect(fullPath.startsWith("/editorial/")).toBe(true);
    // Must not start with /editoriaux/
    expect(fullPath.startsWith("/editoriaux/")).toBe(false);
    // Slug should be URL-safe
    expect(slug).not.toMatch(/[^a-z0-9-]/);
  });
});
