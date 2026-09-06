import { execFileSync } from "node:child_process";
import { and, eq } from "drizzle-orm";
import * as db from "../server/db.ts";

const SOURCE_PATH = "/home/ubuntu/upload/CORRIGE-ACCORDAVECFMI.docx";
const TITLE = "Accord Sénégal-FMI : le piège d’une souveraineté sous tutelle";
const SLUG = "accord-senegal-fmi-le-piege-d-une-souverainete-sous-tutelle";
const EDITORIAL_CATEGORY_ID = 30009;
const PAPE_AMADOU_FALL_AUTHOR_ID = 60002;
const COVER_IMAGE_URL = "/manus-storage/imf-siege-washington-dc_cafae5f5.jpg";
const ILLUSTRATION_CREDIT = "Illustration — Siège du Fonds monétaire international, Washington, D.C., International Monetary Fund, domaine public, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:IMF_building_HR.jpg).";

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractEditorialFromDocx() {
  const xml = execFileSync("unzip", ["-p", SOURCE_PATH, "word/document.xml"], { encoding: "utf8" });
  const plainText = decodeXml(xml
    .replace(/<w:p\b[^>]*>/g, "\n\n")
    .replace(/<w:tab\b[^>]*\/>/g, "\t")
    .replace(/<[^>]+>/g, ""))
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const paragraphs = plainText.split(/\n\n+/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const titleIndex = paragraphs.findIndex((paragraph) => paragraph.includes("Accord Sénégal-FMI") && paragraph.includes("souveraineté sous tutelle"));
  if (titleIndex < 0 || paragraphs.length - titleIndex < 5) {
    throw new Error("Le titre ou la structure du document Word ne correspond pas au texte attendu.");
  }

  const bodyParagraphs = paragraphs.slice(titleIndex + 1);
  return {
    excerpt: bodyParagraphs[0],
    content: `## Éditorial\n\n${bodyParagraphs.join("\n\n")}\n\n---\n\n*${ILLUSTRATION_CREDIT}*`,
  };
}

async function main() {
  const { excerpt, content } = extractEditorialFromDocx();
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
    authorId: PAPE_AMADOU_FALL_AUTHOR_ID,
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
    author: "Pape Amadou Fall",
    approval: "Fatah",
    coverImageUrl: COVER_IMAGE_URL,
  }));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
