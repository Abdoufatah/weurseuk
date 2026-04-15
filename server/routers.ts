import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as db from "./db";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  return next({ ctx });
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 200);
}

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ==================== CATEGORIES ====================
  categories: router({
    list: publicProcedure.query(async () => {
      return db.getAllCategories();
    }),
    bySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
      return db.getCategoryBySlug(input.slug);
    }),
    create: adminProcedure.input(z.object({
      name: z.string().min(1),
      slug: z.string().min(1),
      description: z.string().optional(),
      sortOrder: z.number().optional(),
    })).mutation(async ({ input }) => {
      await db.createCategory(input);
      return { success: true };
    }),
  }),

  // ==================== EDITORIALS ====================
  editorials: router({
    published: publicProcedure.input(z.object({
      limit: z.number().min(1).max(50).default(20),
      offset: z.number().min(0).default(0),
    }).optional()).query(async ({ input }) => {
      const { limit = 20, offset = 0 } = input ?? {};
      return db.getPublishedEditorials(limit, offset);
    }),
    featured: publicProcedure.query(async () => {
      return db.getFeaturedEditorials(5);
    }),
    bySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
      const editorial = await db.getEditorialBySlug(input.slug);
      if (!editorial) throw new TRPCError({ code: 'NOT_FOUND', message: 'Editorial not found' });
      return editorial;
    }),
    byCategory: publicProcedure.input(z.object({ categoryId: z.number() })).query(async ({ input }) => {
      return db.getEditorialsByCategory(input.categoryId);
    }),
    // Admin CRUD
    listAll: adminProcedure.input(z.object({
      limit: z.number().min(1).max(100).default(50),
      offset: z.number().min(0).default(0),
    }).optional()).query(async ({ input }) => {
      const { limit = 50, offset = 0 } = input ?? {};
      return db.getAllEditorials(limit, offset);
    }),
    create: adminProcedure.input(z.object({
      title: z.string().min(1),
      excerpt: z.string().optional(),
      content: z.string().min(1),
      coverImageUrl: z.string().optional(),
      categoryId: z.number().optional(),
      isPublished: z.boolean().default(false),
      isFeatured: z.boolean().default(false),
    })).mutation(async ({ ctx, input }) => {
      const slug = slugify(input.title) + "-" + Date.now().toString(36);
      await db.createEditorial({
        ...input,
        slug,
        authorId: ctx.user.id,
        publishedAt: input.isPublished ? new Date() : undefined,
      });
      return { success: true, slug };
    }),
    update: adminProcedure.input(z.object({
      id: z.number(),
      title: z.string().min(1).optional(),
      excerpt: z.string().optional(),
      content: z.string().optional(),
      coverImageUrl: z.string().optional(),
      categoryId: z.number().optional(),
      isPublished: z.boolean().optional(),
      isFeatured: z.boolean().optional(),
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      const existing = await db.getEditorialById(id);
      if (!existing) throw new TRPCError({ code: 'NOT_FOUND' });
      if (data.isPublished && !existing.isPublished) {
        (data as any).publishedAt = new Date();
      }
      if (data.title) {
        (data as any).slug = slugify(data.title) + "-" + Date.now().toString(36);
      }
      await db.updateEditorial(id, data);
      return { success: true };
    }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      await db.deleteEditorial(input.id);
      return { success: true };
    }),
  }),

  // ==================== AGGREGATED ARTICLES ====================
  articles: router({
    list: publicProcedure.input(z.object({
      limit: z.number().min(1).max(50).default(30),
      offset: z.number().min(0).default(0),
      region: z.string().optional(),
      categoryId: z.number().optional(),
    }).optional()).query(async ({ input }) => {
      const { limit = 30, offset = 0, region, categoryId } = input ?? {};
      return db.getAggregatedArticles(limit, offset, region, categoryId);
    }),
    featured: publicProcedure.query(async () => {
      return db.getFeaturedArticles(6);
    }),
    create: adminProcedure.input(z.object({
      title: z.string().min(1),
      excerpt: z.string().optional(),
      sourceUrl: z.string().url(),
      sourceName: z.string().min(1),
      sourceLogoUrl: z.string().optional(),
      imageUrl: z.string().optional(),
      categoryId: z.number().optional(),
      region: z.enum(["senegal", "afrique_ouest", "monde"]).default("senegal"),
      isBreakingNews: z.boolean().default(false),
      isFeatured: z.boolean().default(false),
      publishedAt: z.date().optional(),
    })).mutation(async ({ input }) => {
      await db.createAggregatedArticle({
        ...input,
        publishedAt: input.publishedAt ?? new Date(),
      });
      return { success: true };
    }),
    update: adminProcedure.input(z.object({
      id: z.number(),
      title: z.string().optional(),
      excerpt: z.string().optional(),
      isBreakingNews: z.boolean().optional(),
      isFeatured: z.boolean().optional(),
      categoryId: z.number().optional(),
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await db.updateAggregatedArticle(id, data);
      return { success: true };
    }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      await db.deleteAggregatedArticle(input.id);
      return { success: true };
    }),
  }),

  // ==================== RSS SOURCES ====================
  rssSources: router({
    list: adminProcedure.query(async () => {
      return db.getAllRssSources();
    }),
    create: adminProcedure.input(z.object({
      name: z.string().min(1),
      url: z.string().url(),
      logoUrl: z.string().optional(),
      region: z.enum(["senegal", "afrique_ouest", "monde"]).default("senegal"),
      categoryId: z.number().optional(),
    })).mutation(async ({ input }) => {
      await db.createRssSource(input);
      return { success: true };
    }),
    update: adminProcedure.input(z.object({
      id: z.number(),
      name: z.string().optional(),
      url: z.string().url().optional(),
      logoUrl: z.string().optional(),
      region: z.enum(["senegal", "afrique_ouest", "monde"]).optional(),
      isActive: z.boolean().optional(),
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await db.updateRssSource(id, data);
      return { success: true };
    }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      await db.deleteRssSource(input.id);
      return { success: true };
    }),
  }),

  // ==================== BREAKING NEWS ====================
  breakingNews: router({
    active: publicProcedure.query(async () => {
      return db.getActiveBreakingNews();
    }),
    create: adminProcedure.input(z.object({
      headline: z.string().min(1),
      sourceUrl: z.string().optional(),
      sourceName: z.string().optional(),
    })).mutation(async ({ input }) => {
      await db.createBreakingNewsItem(input);
      return { success: true };
    }),
    update: adminProcedure.input(z.object({
      id: z.number(),
      headline: z.string().optional(),
      isActive: z.boolean().optional(),
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await db.updateBreakingNewsItem(id, data);
      return { success: true };
    }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      await db.deleteBreakingNewsItem(input.id);
      return { success: true };
    }),
  }),

  // ==================== RSS SYNC ====================
  rssSync: router({
    syncAll: adminProcedure.mutation(async () => {
      const { syncAllRssSources } = await import("./rssService");
      const results = await syncAllRssSources();
      return results;
    }),
    status: adminProcedure.query(async () => {
      const { getRssCronStatus } = await import("./rssCron");
      return getRssCronStatus();
    }),
    triggerSync: adminProcedure.mutation(async () => {
      const { triggerManualSync } = await import("./rssCron");
      await triggerManualSync();
      const { getRssCronStatus } = await import("./rssCron");
      return getRssCronStatus();
    }),
  }),

  // ==================== JOURNALIST PROFILES ====================
  journalists: router({
    list: publicProcedure.query(async () => {
      return db.getJournalistProfiles();
    }),
    byCategory: publicProcedure.input(z.object({ categoryId: z.number() })).query(async ({ input }) => {
      return db.getJournalistByCategory(input.categoryId);
    }),
    create: adminProcedure.input(z.object({
      name: z.string().min(1),
      alias: z.string().optional(),
      email: z.string().email(),
      bio: z.string().optional(),
      photoUrl: z.string().optional(),
      categoryId: z.number(),
      role: z.enum(["reporter", "correspondent", "columnist", "analyst", "editorialist"]),
    })).mutation(async ({ input }) => {
      await db.createJournalistProfile(input);
      return { success: true };
    }),
    update: adminProcedure.input(z.object({
      id: z.number(),
      name: z.string().min(1).optional(),
      alias: z.string().optional(),
      bio: z.string().optional(),
      photoUrl: z.string().optional(),
      role: z.enum(["reporter", "correspondent", "columnist", "analyst", "editorialist"]).optional(),
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await db.updateJournalistProfile(id, data);
      return { success: true };
    }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      await db.deleteJournalistProfile(input.id);
      return { success: true };
    }),
  }),

  // ==================== ARTICLE TAGS ====================
  tags: router({
    list: publicProcedure.query(async () => {
      return db.getAllTags();
    }),
    create: adminProcedure.input(z.object({
      name: z.string().min(1),
      slug: z.string().min(1),
      description: z.string().optional(),
    })).mutation(async ({ input }) => {
      await db.createTag(input);
      return { success: true };
    }),
    forEditorial: publicProcedure.input(z.object({ editorialId: z.number() })).query(async ({ input }) => {
      return db.getEditorialTags(input.editorialId);
    }),
    addToEditorial: adminProcedure.input(z.object({
      editorialId: z.number(),
      tagId: z.number(),
    })).mutation(async ({ input }) => {
      await db.addTagToEditorial(input.editorialId, input.tagId);
      return { success: true };
    }),
    removeFromEditorial: adminProcedure.input(z.object({
      editorialId: z.number(),
      tagId: z.number(),
    })).mutation(async ({ input }) => {
      await db.removeTagFromEditorial(input.editorialId, input.tagId);
      return { success: true };
    }),
  }),

  // ==================== COMMENTS ====================
  comments: router({
    forEditorial: publicProcedure.input(z.object({ editorialId: z.number() })).query(async ({ input }) => {
      return db.getEditorialComments(input.editorialId, true);
    }),
    pending: adminProcedure.query(async () => {
      return db.getPendingComments();
    }),
    create: protectedProcedure.input(z.object({
      editorialId: z.number(),
      authorName: z.string().min(1),
      authorEmail: z.string().email(),
      content: z.string().min(1),
    })).mutation(async ({ input, ctx }) => {
      await db.createComment({
        ...input,
        userId: ctx.user.id,
        isApproved: false,
        isSpam: false,
      });
      return { success: true };
    }),
    approve: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      await db.approveComment(input.id);
      return { success: true };
    }),
    markSpam: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      await db.markCommentAsSpam(input.id);
      return { success: true };
    }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      await db.deleteComment(input.id);
      return { success: true };
    }),
  }),

  // ==================== STATS (Admin) ====================
  stats: router({
    overview: adminProcedure.query(async () => {
      const [articleCount, editorialCount] = await Promise.all([
        db.getArticleCount(),
        db.getEditorialCount(),
      ]);
      return { articleCount, editorialCount };
    }),
  }),
});

export type AppRouter = typeof appRouter;
