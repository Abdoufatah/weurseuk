import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext() {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@weurseuk.com",
    name: "Bensirac",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

function createPublicContext() {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

function createUserContext() {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("Weurseuk Backend Procedures", () => {
  // ==================== AUTH ====================
  describe("auth", () => {
    it("auth.me returns null for unauthenticated users", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.auth.me();
      expect(result).toBeNull();
    });

    it("auth.me returns user for authenticated users", async () => {
      const caller = appRouter.createCaller(createAdminContext());
      const result = await caller.auth.me();
      expect(result).toBeDefined();
      expect(result?.name).toBe("Bensirac");
      expect(result?.role).toBe("admin");
    });
  });

  // ==================== CATEGORIES ====================
  describe("categories", () => {
    it("categories.list returns an array", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.categories.list();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  // ==================== EDITORIALS ====================
  describe("editorials", () => {
    it("editorials.published returns an array", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.editorials.published({ limit: 10, offset: 0 });
      expect(Array.isArray(result)).toBe(true);
    });

    it("editorials.featured returns an array", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.editorials.featured();
      expect(Array.isArray(result)).toBe(true);
    });

    it("editorials.bySlug throws NOT_FOUND for non-existent slug", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      await expect(caller.editorials.bySlug({ slug: "non-existent-slug-xyz" }))
        .rejects.toThrow();
    });

    it("editorials.listAll requires admin access", async () => {
      const caller = appRouter.createCaller(createUserContext());
      await expect(caller.editorials.listAll())
        .rejects.toThrow();
    });

    it("editorials.create requires admin access", async () => {
      const caller = appRouter.createCaller(createUserContext());
      await expect(caller.editorials.create({
        title: "Test Editorial",
        content: "Test content",
      })).rejects.toThrow();
    });

    it("editorials.create works for admin", async () => {
      const caller = appRouter.createCaller(createAdminContext());
      const result = await caller.editorials.create({
        title: "Test Editorial from Bensirac",
        content: "Ceci est un éditorial de test pour vérifier le fonctionnement du système.",
        excerpt: "Un test éditorial",
        isPublished: true,
        isFeatured: false,
      });
      expect(result.success).toBe(true);
      expect(result.slug).toBeDefined();
      expect(result.slug.length).toBeGreaterThan(0);
    });
  });

  // ==================== ARTICLES ====================
  describe("articles", () => {
    it("articles.list returns an array", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.articles.list({ limit: 10 });
      expect(Array.isArray(result)).toBe(true);
    });

    it("articles.featured returns an array", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.articles.featured();
      expect(Array.isArray(result)).toBe(true);
    });

    it("articles.list supports region filter", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.articles.list({ limit: 10, region: "senegal" });
      expect(Array.isArray(result)).toBe(true);
    });

    it("articles.create requires admin access", async () => {
      const caller = appRouter.createCaller(createUserContext());
      await expect(caller.articles.create({
        title: "Test Article",
        sourceUrl: "https://example.com/article",
        sourceName: "Test Source",
        region: "senegal",
      })).rejects.toThrow();
    });

    it("articles.create works for admin", async () => {
      const caller = appRouter.createCaller(createAdminContext());
      const result = await caller.articles.create({
        title: "Actualité Sénégal - Test",
        sourceUrl: "https://dakaractu.com/test-article",
        sourceName: "Dakaractu",
        region: "senegal",
        excerpt: "Un article de test",
      });
      expect(result.success).toBe(true);
    });
  });

  // ==================== BREAKING NEWS ====================
  describe("breakingNews", () => {
    it("breakingNews.active returns an array", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const result = await caller.breakingNews.active();
      expect(Array.isArray(result)).toBe(true);
    });

    it("breakingNews.create requires admin access", async () => {
      const caller = appRouter.createCaller(createUserContext());
      await expect(caller.breakingNews.create({
        headline: "Test Breaking News",
      })).rejects.toThrow();
    });

    it("breakingNews.create works for admin", async () => {
      const caller = appRouter.createCaller(createAdminContext());
      const result = await caller.breakingNews.create({
        headline: "URGENT: Test Breaking News",
        sourceName: "Weurseuk",
      });
      expect(result.success).toBe(true);
    });
  });

  // ==================== RSS SOURCES ====================
  describe("rssSources", () => {
    it("rssSources.list requires admin access", async () => {
      const caller = appRouter.createCaller(createUserContext());
      await expect(caller.rssSources.list())
        .rejects.toThrow();
    });

    it("rssSources.create requires admin access", async () => {
      const caller = appRouter.createCaller(createUserContext());
      await expect(caller.rssSources.create({
        name: "Test Source",
        url: "https://example.com/rss",
        region: "senegal",
      })).rejects.toThrow();
    });
  });

  // ==================== STATS ====================
  describe("stats", () => {
    it("stats.overview requires admin access", async () => {
      const caller = appRouter.createCaller(createUserContext());
      await expect(caller.stats.overview())
        .rejects.toThrow();
    });

    it("stats.overview returns counts for admin", async () => {
      const caller = appRouter.createCaller(createAdminContext());
      const result = await caller.stats.overview();
      expect(result).toHaveProperty("articleCount");
      expect(result).toHaveProperty("editorialCount");
      expect(typeof result.articleCount).toBe("number");
      expect(typeof result.editorialCount).toBe("number");
    });
  });
});
