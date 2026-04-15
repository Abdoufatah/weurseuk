import { eq, desc, and, sql, like, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users,
  categories, InsertCategory,
  editorials, InsertEditorial,
  rssSources, InsertRssSource,
  aggregatedArticles, InsertAggregatedArticle,
  breakingNews, InsertBreakingNews,
  journalistProfiles, InsertJournalistProfile,
  articleTags, InsertArticleTag,
  editorialTagsJunction, InsertEditorialTagsJunction,
  comments, InsertComment,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ==================== USERS ====================

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ==================== CATEGORIES ====================

export async function getAllCategories() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(categories).orderBy(categories.sortOrder);
}

export async function getCategoryBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return result[0];
}

export async function createCategory(data: InsertCategory) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(categories).values(data);
}

// ==================== EDITORIALS ====================

export async function getPublishedEditorials(limit = 20, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(editorials)
    .where(eq(editorials.isPublished, true))
    .orderBy(desc(editorials.publishedAt))
    .limit(limit)
    .offset(offset);
}

export async function getFeaturedEditorials(limit = 5) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(editorials)
    .where(and(eq(editorials.isPublished, true), eq(editorials.isFeatured, true)))
    .orderBy(desc(editorials.publishedAt))
    .limit(limit);
}

export async function getEditorialBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(editorials).where(eq(editorials.slug, slug)).limit(1);
  return result[0];
}

export async function getEditorialById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(editorials).where(eq(editorials.id, id)).limit(1);
  return result[0];
}

export async function getAllEditorials(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(editorials)
    .orderBy(desc(editorials.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getEditorialsByCategory(categoryId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(editorials)
    .where(and(eq(editorials.categoryId, categoryId), eq(editorials.isPublished, true)))
    .orderBy(desc(editorials.createdAt));
}

export async function createEditorial(data: InsertEditorial) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(editorials).values(data);
  return result;
}

export async function updateEditorial(id: number, data: Partial<InsertEditorial>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(editorials).set(data).where(eq(editorials.id, id));
}

export async function deleteEditorial(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(editorials).where(eq(editorials.id, id));
}

// ==================== RSS SOURCES ====================

export async function getAllRssSources() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(rssSources).orderBy(rssSources.name);
}

export async function getActiveRssSources() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(rssSources).where(eq(rssSources.isActive, true));
}

export async function createRssSource(data: InsertRssSource) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(rssSources).values(data);
}

export async function updateRssSource(id: number, data: Partial<InsertRssSource>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(rssSources).set(data).where(eq(rssSources.id, id));
}

export async function deleteRssSource(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(rssSources).where(eq(rssSources.id, id));
}

// ==================== AGGREGATED ARTICLES ====================

export async function getAggregatedArticles(limit = 30, offset = 0, region?: string, categoryId?: number) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (region) conditions.push(eq(aggregatedArticles.region, region as any));
  if (categoryId) conditions.push(eq(aggregatedArticles.categoryId, categoryId));

  const query = db.select().from(aggregatedArticles)
    .orderBy(desc(aggregatedArticles.publishedAt))
    .limit(limit)
    .offset(offset);

  if (conditions.length > 0) {
    return query.where(and(...conditions));
  }
  return query;
}

export async function getFeaturedArticles(limit = 6) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(aggregatedArticles)
    .where(eq(aggregatedArticles.isFeatured, true))
    .orderBy(desc(aggregatedArticles.publishedAt))
    .limit(limit);
}

export async function createAggregatedArticle(data: InsertAggregatedArticle) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(aggregatedArticles).values(data);
}

export async function bulkCreateAggregatedArticles(data: InsertAggregatedArticle[]) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  if (data.length === 0) return;
  await db.insert(aggregatedArticles).values(data);
}

export async function updateAggregatedArticle(id: number, data: Partial<InsertAggregatedArticle>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(aggregatedArticles).set(data).where(eq(aggregatedArticles.id, id));
}

export async function deleteAggregatedArticle(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(aggregatedArticles).where(eq(aggregatedArticles.id, id));
}

// ==================== BREAKING NEWS ====================

export async function getActiveBreakingNews() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(breakingNews)
    .where(eq(breakingNews.isActive, true))
    .orderBy(desc(breakingNews.createdAt))
    .limit(10);
}

export async function createBreakingNewsItem(data: InsertBreakingNews) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(breakingNews).values(data);
}

export async function updateBreakingNewsItem(id: number, data: Partial<InsertBreakingNews>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(breakingNews).set(data).where(eq(breakingNews.id, id));
}

export async function deleteBreakingNewsItem(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(breakingNews).where(eq(breakingNews.id, id));
}

// ==================== STATS ====================

export async function getArticleCount() {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql<number>`count(*)` }).from(aggregatedArticles);
  return result[0]?.count ?? 0;
}

export async function getEditorialCount() {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql<number>`count(*)` }).from(editorials);
  return result[0]?.count ?? 0;
}

// ==================== JOURNALIST PROFILES ====================

export async function getJournalistProfiles(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(journalistProfiles)
    .where(eq(journalistProfiles.isActive, true))
    .orderBy(journalistProfiles.name)
    .limit(limit)
    .offset(offset);
}

export async function getJournalistByCategory(categoryId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(journalistProfiles)
    .where(and(eq(journalistProfiles.categoryId, categoryId), eq(journalistProfiles.isActive, true)))
    .limit(1);
  return result[0] || null;
}

export async function createJournalistProfile(data: InsertJournalistProfile) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(journalistProfiles).values(data);
}

export async function updateJournalistProfile(id: number, data: Partial<InsertJournalistProfile>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(journalistProfiles).set(data).where(eq(journalistProfiles.id, id));
}

export async function deleteJournalistProfile(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(journalistProfiles).set({ isActive: false }).where(eq(journalistProfiles.id, id));
}

// ==================== ARTICLE TAGS ====================

export async function getAllTags() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(articleTags).orderBy(articleTags.name);
}

export async function createTag(data: InsertArticleTag) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(articleTags).values(data);
}

export async function getEditorialTags(editorialId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select({ tag: articleTags })
    .from(editorialTagsJunction)
    .innerJoin(articleTags, eq(editorialTagsJunction.tagId, articleTags.id))
    .where(eq(editorialTagsJunction.editorialId, editorialId));
}

export async function addTagToEditorial(editorialId: number, tagId: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(editorialTagsJunction).values({ editorialId, tagId });
}

export async function removeTagFromEditorial(editorialId: number, tagId: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(editorialTagsJunction)
    .where(and(eq(editorialTagsJunction.editorialId, editorialId), eq(editorialTagsJunction.tagId, tagId)));
}

// ==================== COMMENTS ====================

export async function getEditorialComments(editorialId: number, approvedOnly = true) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(comments.editorialId, editorialId), eq(comments.isSpam, false)];
  if (approvedOnly) conditions.push(eq(comments.isApproved, true));
  return db.select().from(comments)
    .where(and(...conditions))
    .orderBy(desc(comments.createdAt));
}

export async function getPendingComments(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(comments)
    .where(and(eq(comments.isApproved, false), eq(comments.isSpam, false)))
    .orderBy(desc(comments.createdAt))
    .limit(limit);
}

export async function createComment(data: InsertComment) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(comments).values(data);
}

export async function approveComment(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(comments).set({ isApproved: true, approvedAt: new Date() }).where(eq(comments.id, id));
}

export async function markCommentAsSpam(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(comments).set({ isSpam: true }).where(eq(comments.id, id));
}

export async function deleteComment(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(comments).where(eq(comments.id, id));
}

// ==================== RSS DEDUPLICATION ====================

export async function articleExistsBySourceUrl(sourceUrl: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  const result = await db.select({ id: aggregatedArticles.id })
    .from(aggregatedArticles)
    .where(eq(aggregatedArticles.sourceUrl, sourceUrl))
    .limit(1);
  return result.length > 0;
}
