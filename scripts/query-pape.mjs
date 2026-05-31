import { createConnection } from 'mysql2/promise';

const dbUrl = process.env.DATABASE_URL;
const conn = await createConnection(dbUrl);

// Colonnes de journalist_profiles
const [cols] = await conn.execute('DESCRIBE journalist_profiles');
console.log('=== JOURNALIST_PROFILES COLUMNS ===');
console.log(cols.map(c => c.Field).join(', '));

// Lister les journalist_profiles
const [journalists] = await conn.execute('SELECT * FROM journalist_profiles LIMIT 20');
console.log('=== JOURNALIST PROFILES ===');
console.log(JSON.stringify(journalists, null, 2));

// Colonnes de editorials
const [ecols] = await conn.execute('DESCRIBE editorials');
console.log('=== EDITORIALS COLUMNS ===');
console.log(ecols.map(c => c.Field).join(', '));

// Lister les catégories
const [cats] = await conn.execute('SELECT id, name, slug FROM categories LIMIT 20');
console.log('=== CATEGORIES ===');
console.log(JSON.stringify(cats, null, 2));

// Trouver l'article précédent de Pape Amadou Fall
const [articles] = await conn.execute(
  `SELECT e.id, e.title, e.slug, e.excerpt, LEFT(e.content, 400) as content_preview, 
   e.category_id, e.author_id, e.cover_image_url, e.status, e.type, e.published_at
   FROM editorials e 
   ORDER BY e.published_at DESC LIMIT 5`
);
console.log('=== RECENT ARTICLES ===');
console.log(JSON.stringify(articles, null, 2));

await conn.end();
