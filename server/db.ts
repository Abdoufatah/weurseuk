import { eq, desc, and, sql, like, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users,
  categories, InsertCategory,
  editorials, InsertEditorial,
  rssSources, InsertRssSource,
  aggregatedArticles, InsertAggregatedArticle,
  breakingNews, InsertBreakingNews,
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
