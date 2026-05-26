import { createConnection } from 'mysql2/promise';
import { config } from 'dotenv';
import { writeFileSync } from 'fs';
config();

const conn = await createConnection(process.env.DATABASE_URL);
const [rows] = await conn.execute(
  `SELECT id, title, excerpt, coverImageUrl, categoryId 
   FROM editorials 
   WHERE isPublished = 1 
   ORDER BY id`
);

const data = rows.map(r => ({
  id: r.id,
  title: r.title,
  excerpt: r.excerpt ? r.excerpt.substring(0, 150) : null,
  coverImageUrl: r.coverImageUrl,
  categoryId: r.categoryId,
  hasIllustration: !!r.coverImageUrl
}));

writeFileSync('/tmp/articles_cover.json', JSON.stringify(data, null, 2));
console.log(`Total articles publiés : ${data.length}`);
console.log(`Avec illustration : ${data.filter(a => a.hasIllustration).length}`);
console.log(`Sans illustration : ${data.filter(a => !a.hasIllustration).length}`);
data.forEach(a => console.log(`[${a.hasIllustration ? '✅' : '❌'}] ${a.id} — ${a.title.substring(0, 60)}`));

await conn.end();
