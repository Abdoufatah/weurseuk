import mysql from 'mysql2/promise';
const conn = await mysql.createConnection(process.env.DATABASE_URL);

const [all] = await conn.execute("SELECT e.id, e.title, e.categoryId, e.authorId, e.isPublished, e.slug, j.name as journalistName FROM editorials e LEFT JOIN journalist_profiles j ON e.authorId = j.id ORDER BY e.id DESC");
console.log("=== TOUS LES ÉDITORIAUX ===");
for (const e of all) {
  const catName = {30004:"Actualité",30005:"Pol&Éco",30006:"International",30007:"Société",30008:"Analyses",30009:"Éditorial"}[e.categoryId] || `?${e.categoryId}`;
  console.log(`  ID:${e.id} | ${catName} | author:${e.authorId} (${e.journalistName||'N/A'}) | PUB:${e.isPublished} | slug:${e.slug || 'NULL'} | ${e.title?.substring(0,60)}`);
}

// Articles dans Éditorial qui ne sont PAS de Bensirac
const [wrongInEditorial] = await conn.execute("SELECT id, title, authorId, slug FROM editorials WHERE categoryId = 30009 AND (authorId IS NULL OR authorId != 0)");
console.log(`\n=== ARTICLES MAL PLACÉS DANS ÉDITORIAL: ${wrongInEditorial.length} ===`);
for (const e of wrongInEditorial) {
  console.log(`  ID:${e.id} | author:${e.authorId} | ${e.title?.substring(0,60)}`);
}

await conn.end();
