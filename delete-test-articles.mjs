import 'dotenv/config';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { editorials } from './drizzle/schema.ts';
import { eq } from 'drizzle-orm';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

// Trouver et supprimer les articles de test
const testArticles = await db.select().from(editorials).where(
  (col) => col.title.like('%Test%') || col.title.like('%test%')
);

console.log('Articles de test trouvés:', testArticles.length);

for (const article of testArticles) {
  console.log('Suppression:', article.title);
  await db.delete(editorials).where(eq(editorials.id, article.id));
}

console.log('Suppression terminée');

await connection.end();
