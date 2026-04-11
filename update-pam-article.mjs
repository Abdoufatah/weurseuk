import 'dotenv/config';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { editorials } from './drizzle/schema.ts';
import { eq } from 'drizzle-orm';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

// URL CDN de la photo du Dr Pam
const pamPhotoUrl = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663077132964/gZtFuPhj9JU8iVtsGM9iQB/a278340b-86f0-44f4-89e9-52c775f034f3_94cc41b6.jpg';

// Trouver l'article du Dr Pam
const articles = await db.select().from(editorials).where(
  (col) => col.title.like('%Adama Aly Pam%')
);

console.log('Articles trouvés:', articles.length);

if (articles.length > 0) {
  const article = articles[0];
  console.log('Article trouvé:', article.title);
  
  // Ajouter la photo au contenu
  const updatedContent = `![Dr Adama Aly Pam](${pamPhotoUrl})\n\n${article.content}`;
  
  // Mettre à jour l'article
  await db.update(editorials)
    .set({ content: updatedContent })
    .where(eq(editorials.id, article.id));
  
  console.log('Article mis à jour avec la photo du Dr Pam');
} else {
  console.log('Aucun article trouvé');
}

await connection.end();
