import mysql from "mysql2/promise";
import { readFile } from "node:fs/promises";

const sourcePath = "/home/ubuntu/upload/pasted_file_oZ5NDJ_fonds-speciaux-senegal-article(1).md";
const markdown = await readFile(sourcePath, "utf8");

function inlineMarkdown(value) {
  return value
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function toHtml(value) {
  const lines = value.split(/\r?\n/);
  const html = [];

  for (let index = 3; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) continue;
    if (line === "---") {
      html.push("<hr />");
    } else if (/^\*\*.+\*\*$/.test(line)) {
      html.push(`<h2>${inlineMarkdown(line.replace(/^\*\*|\*\*$/g, ""))}</h2>`);
    } else {
      html.push(`<p>${inlineMarkdown(line)}</p>`);
    }
  }

  return html.join("\n");
}

const article = {
  title: "Fonds spéciaux au Sénégal : une réforme nécessaire prise en otage",
  slug: "fonds-speciaux-senegal-reforme-necessaire-prise-en-otage",
  excerpt:
    "À l’Assemblée nationale, l’encadrement des fonds spéciaux ravive une controverse plus ancienne que la Constitution de 2001 : comment organiser le contrôle de dépenses sensibles sans paralyser l’action de l’État ?",
  content: toHtml(markdown),
  authorId: 30001,
  categoryId: 30008,
  publishedAt: new Date("2026-08-14T12:15:00Z"),
};

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const [existing] = await connection.execute(
  "SELECT id FROM editorials WHERE slug = ? LIMIT 1",
  [article.slug],
);

if (existing.length) {
  await connection.execute(
    `UPDATE editorials
       SET title = ?, excerpt = ?, content = ?, authorId = ?, categoryId = ?,
           isPublished = 1, isFeatured = 1, publishedAt = ?, type = 'analysis', useAlias = 0,
           updatedAt = NOW()
     WHERE slug = ?`,
    [article.title, article.excerpt, article.content, article.authorId, article.categoryId, article.publishedAt, article.slug],
  );
  console.log("Analyse existante mise à jour.");
} else {
  const [result] = await connection.execute(
    `INSERT INTO editorials
       (title, slug, excerpt, content, authorId, categoryId, isPublished, isFeatured, publishedAt, createdAt, updatedAt, type, useAlias)
     VALUES (?, ?, ?, ?, ?, ?, 1, 1, ?, NOW(), NOW(), 'analysis', 0)`,
    [article.title, article.slug, article.excerpt, article.content, article.authorId, article.categoryId, article.publishedAt],
  );
  console.log(`Analyse publiée avec l’identifiant ${result.insertId}.`);
}

await connection.end();
