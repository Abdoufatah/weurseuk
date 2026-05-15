import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Categories for thematic sections
 */
export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * Editorials by Bensirac
 */
export const editorials = mysqlTable("editorials", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  type: varchar("type", { length: 50 }).default("editorial"),
  coverImageUrl: text("coverImageUrl"),
  categoryId: int("categoryId"),
  authorId: int("authorId"),
  isPublished: boolean("isPublished").default(false).notNull(),
  isFeatured: boolean("isFeatured").default(false).notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Editorial = typeof editorials.$inferSelect;
export type InsertEditorial = typeof editorials.$inferInsert;

/**
 * RSS Feed Sources
 */
export const rssSources = mysqlTable("rss_sources", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  url: varchar("url", { length: 1000 }).notNull(),
  logoUrl: text("logoUrl"),
  region: mysqlEnum("region", ["senegal", "afrique_ouest", "monde"]).default("senegal").notNull(),
  categoryId: int("categoryId"),
  isActive: boolean("isActive").default(true).notNull(),
  lastFetchedAt: timestamp("lastFetchedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type RssSource = typeof rssSources.$inferSelect;
export type InsertRssSource = typeof rssSources.$inferInsert;

/**
 * Aggregated articles from RSS feeds
 */
export const aggregatedArticles = mysqlTable("aggregated_articles", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  sourceUrl: varchar("sourceUrl", { length: 1000 }).notNull(),
  sourceName: varchar("sourceName", { length: 200 }).notNull(),
  sourceLogoUrl: text("sourceLogoUrl"),
  imageUrl: text("imageUrl"),
  categoryId: int("categoryId"),
  region: mysqlEnum("region", ["senegal", "afrique_ouest", "monde"]).default("senegal").notNull(),
  isBreakingNews: boolean("isBreakingNews").default(false).notNull(),
  isFeatured: boolean("isFeatured").default(false).notNull(),
  publishedAt: timestamp("publishedAt"),
  fetchedAt: timestamp("fetchedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AggregatedArticle = typeof aggregatedArticles.$inferSelect;
export type InsertAggregatedArticle = typeof aggregatedArticles.$inferInsert;

/**
 * Breaking News entries
 */
export const breakingNews = mysqlTable("breaking_news", {
  id: int("id").autoincrement().primaryKey(),
  headline: varchar("headline", { length: 500 }).notNull(),
  sourceUrl: text("sourceUrl"),
  sourceName: varchar("sourceName", { length: 200 }),
  isActive: boolean("isActive").default(true).notNull(),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BreakingNews = typeof breakingNews.$inferSelect;
export type InsertBreakingNews = typeof breakingNews.$inferInsert;

/**
 * Journalist Profiles - One specialist per rubric
 */
export const journalistProfiles = mysqlTable("journalist_profiles", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  alias: varchar("alias", { length: 100 }),
  email: varchar("email", { length: 320 }).notNull().unique(),
  bio: text("bio"),
  photoUrl: text("photoUrl"),
  categoryId: int("categoryId").notNull(),
  role: mysqlEnum("role", ["reporter", "correspondent", "columnist", "analyst", "editorialist"]).notNull(),
  userId: int("userId"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type JournalistProfile = typeof journalistProfiles.$inferSelect;
export type InsertJournalistProfile = typeof journalistProfiles.$inferInsert;

/**
 * Article Tags - For Société section tagging
 */
export const articleTags = mysqlTable("article_tags", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ArticleTag = typeof articleTags.$inferSelect;
export type InsertArticleTag = typeof articleTags.$inferInsert;

/**
 * Editorial-Tag Junction Table
 */
export const editorialTagsJunction = mysqlTable("editorial_tags_junction", {
  id: int("id").autoincrement().primaryKey(),
  editorialId: int("editorialId").notNull(),
  tagId: int("tagId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type EditorialTagsJunction = typeof editorialTagsJunction.$inferSelect;
export type InsertEditorialTagsJunction = typeof editorialTagsJunction.$inferInsert;

/**
 * Comments on Articles - Moderated with authentication
 */
export const comments = mysqlTable("comments", {
  id: int("id").autoincrement().primaryKey(),
  editorialId: int("editorialId").notNull(),
  userId: int("userId").notNull(),
  authorName: varchar("authorName", { length: 200 }).notNull(),
  authorEmail: varchar("authorEmail", { length: 320 }).notNull(),
  content: text("content").notNull(),
  isApproved: boolean("isApproved").default(false).notNull(),
  isSpam: boolean("isSpam").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  approvedAt: timestamp("approvedAt"),
});

export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;


