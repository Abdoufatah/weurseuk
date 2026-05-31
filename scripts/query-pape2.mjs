import { createConnection } from 'mysql2/promise';

const dbUrl = process.env.DATABASE_URL;
const conn = await createConnection(dbUrl);

// Article précédent de Pape Amadou Fall (authorId = 60002)
const [articles] = await conn.execute(
  `SELECT id, title, slug, excerpt, LEFT(content, 800) as content_preview, 
   categoryId, authorId, coverImageUrl, isPublished, isFeatured, type, publishedAt
   FROM editorials 
   WHERE authorId = 60002
   ORDER BY publishedAt DESC LIMIT 3`
);
console.log('=== ARTICLES PAPE AMADOU FALL ===');
console.log(JSON.stringify(articles, null, 2));

await conn.end();
