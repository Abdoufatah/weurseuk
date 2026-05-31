import { createConnection } from 'mysql2/promise';
import { readFileSync } from 'fs';

// Lire DATABASE_URL depuis l'environnement
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const conn = await createConnection(dbUrl);

// Lister les auteurs
const [authors] = await conn.execute('SELECT id, name, bio, avatar_url FROM authors LIMIT 20');
console.log('=== AUTHORS ===');
console.log(JSON.stringify(authors, null, 2));

// Trouver l'article précédent de Pape Amadou Fall
const [articles] = await conn.execute(
  `SELECT e.id, e.title, e.slug, e.excerpt, LEFT(e.content, 300) as content_preview, 
   e.category_id, e.author_id, e.cover_image_url, e.status, e.type, e.published_at,
   a.name as author_name, c.name as category_name, c.slug as category_slug
   FROM editorials e 
   JOIN authors a ON e.author_id = a.id 
   JOIN categories c ON e.category_id = c.id
   WHERE a.name LIKE '%Pape%' OR a.name LIKE '%Amadou Fall%'
   ORDER BY e.published_at DESC LIMIT 3`
);
console.log('=== ARTICLES PAPE AMADOU FALL ===');
console.log(JSON.stringify(articles, null, 2));

// Lister les catégories
const [cats] = await conn.execute('SELECT id, name, slug FROM categories LIMIT 20');
console.log('=== CATEGORIES ===');
console.log(JSON.stringify(cats, null, 2));

await conn.end();
