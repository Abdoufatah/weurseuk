import { readFileSync } from "node:fs";
import { and, eq } from "drizzle-orm";
import * as db from "../server/db.ts";

const SOURCE_PATH = "/home/ubuntu/upload/pasted_content.txt";
const TITLE = "La rupture ne consiste pas à changer les bénéficiaires de l’exception";
const SLUG = "la-rupture-ne-consiste-pas-a-changer-les-beneficiaires-de-l-exception";
const EDITORIAL_CATEGORY_ID = 30009;
const ABDOU_FATAH_FALL_AUTHOR_ID = 30001;

function extractEditorial(source) {
  const normalizedSource = source.replace(/\r\n/g, "\n");
  const safeStart = normalizedSource.indexOf("La rupture ne consiste pas à changer les bénéficiaires de l’exception", normalizedSource.indexOf("Manus is an AI"));
  const chapeauMarker = "\nChapeau\n";
  const editorialMarker = "\nÉditorial\n";
  const referencesMarker = "\nRéférences\n";
  const sourceEndMarker = "\nContenu solide. Prêt à le partager";

  if (safeStart < 0) throw new Error("Titre éditorial introuvable dans le document fourni.");
  const publicationSource = normalizedSource.slice(safeStart);
  const chapeauStart = publicationSource.indexOf(chapeauMarker);
  const editorialStart = publicationSource.indexOf(editorialMarker);
  const referencesStart = publicationSource.indexOf(referencesMarker);
  const publicationEnd = publicationSource.indexOf(sourceEndMarker);

  if (chapeauStart < 0 || editorialStart < 0 || referencesStart < 0 || publicationEnd < 0) {
    throw new Error("Structure éditoriale incomplète : chapeau, corps ou références introuvables.");
  }

  const excerpt = publicationSource
    .slice(chapeauStart + chapeauMarker.length, editorialStart)
    .trim();
  const body = publicationSource
    .slice(editorialStart + editorialMarker.length, referencesStart)
    .trim();
  const references = publicationSource
    .slice(referencesStart + referencesMarker.length, publicationEnd)
    .trim();

  return { excerpt, content: `## Éditorial\n\n${body}\n\n## Références\n\n${references}` };
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
    author: "Abdou Fatah Fall",
    approval: "Fatah",
  }));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
