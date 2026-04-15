import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const [categories] = await connection.execute('SELECT id, name, slug FROM categories');
console.log('Categories:');
categories.forEach(c => {
  console.log(`  ${c.id}: "${c.name}" (slug: "${c.slug}")`);
});

await connection.end();
