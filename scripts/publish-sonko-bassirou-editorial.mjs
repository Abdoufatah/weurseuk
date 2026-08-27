import { readFileSync } from "node:fs";
import { and, eq } from "drizzle-orm";
import * as db from "../server/db.ts";

const SOURCE_PATH = "/home/ubuntu/upload/Sortirdel’alternativeSonko-Bassirou_article_27_8_2026.md";
const TITLE = "Sortir de l’alternative Sonko-Bassirou";
const SLUG = "sortir-de-l-alternative-sonko-bassirou";
const EDITORIAL_CATEGORY_ID = 30009;
const ABDOU_FATAH_FALL_AUTHOR_ID = 30001;
const COVER_IMAGE_URL = "/manus-storage/assemblee-nationale-dakar-bernard-bill5_50f085f8.jpg";
const ILLUSTRATION_CREDIT = "Illustration — Assemblée nationale du Sénégal à Dakar, Bernard bill5, 2005, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:National_assembly_(Dakar,_Senegal).jpg), licence [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/deed.fr).";

function extractEditorial(source) {
  const normalized = source.replace(/\r\n/g, "\n").trim();
  const titlePattern = new RegExp(`^# ${TITLE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\n+`);
  const withoutTitle = normalized.replace(titlePattern, "");
  const withoutByline = withoutTitle.replace(/^\*\*Par Fatah\*\*\n+/, "");
  const excerptMatch = withoutByline.match(/^##\s+(.+)$/m);

  if (!excerptMatch) throw new Error("Chapeau éditorial introuvable dans le document fourni.");

  return {
    excerpt: excerptMatch[1].trim(),
    content: `${withoutByline.trim()}\n\n---\n\n*${ILLUSTRATION_CREDIT}*`,
  };
}

async function main() {
  const source = readFileSync(SOURCE_PATH, "utf8");
  const { excerpt, content } = extractEditorial(source);
  const existing = await db.getAllEditorials(1200, 0);

  if (existing.some((editorial) => editorial.slug === SLUG || editorial.title === TITLE)) {
    throw new Error("Un éditorial portant déjà ce titre ou ce slug existe : publication interrompue.");
  }

  const database = await db.getDb();
  if (!database) throw new Error("Base de données indisponible.");
  const now = new Date();

  await database.update(db.editorials)
    .set({ isFeatured: false })
    .where(and(
      eq(db.editorials.categoryId, EDITORIAL_CATEGORY_ID),
      eq(db.editorials.isFeatured, true),
    ));

  await db.createEditorial({
    title: TITLE,
    slug: SLUG,
    excerpt,
    content,
    coverImageUrl: COVER_IMAGE_URL,
    type: "editorial",
    categoryId: EDITORIAL_CATEGORY_ID,
    authorId: ABDOU_FATAH_FALL_AUTHOR_ID,
    useAlias: false,
    isPublished: true,
    isFeatured: true,
    approvalStatus: "approved",
    approvedBy: "Fatah",
    approvedAt: now,
    publishedAt: now,
  });

  console.log(JSON.stringify({
    published: true,
    title: TITLE,
    slug: SLUG,
    url: `https://weurseuk.com/editorial/${SLUG}`,
    coverImageUrl: COVER_IMAGE_URL,
    author: "Abdou Fatah Fall",
    approval: "Fatah",
    illustrationLicense: "CC BY-SA 3.0",
  }));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
