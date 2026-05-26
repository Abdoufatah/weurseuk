import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Vérifier les catégories
const [cats] = await conn.query('SELECT id, name, slug FROM categories ORDER BY id');
console.log('Catégories:', cats.map(c => `${c.id}: ${c.name} (${c.slug})`).join('\n'));

// Vérifier le schéma editorials
const [cols] = await conn.query('DESCRIBE editorials');
console.log('\nChamps editorials:', cols.map(c => c.Field).join(', '));

await conn.end();
