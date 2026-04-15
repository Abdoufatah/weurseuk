import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Get all editorials
const [editorials] = await connection.execute('SELECT id, title, categoryId FROM editorials');
console.log('All editorials:');
editorials.forEach(e => {
  console.log(`  - ID: ${e.id}, Title: ${e.title}, CategoryID: ${e.categoryId}`);
});

// Get all categories
const [categories] = await connection.execute('SELECT id, name, slug FROM categories');
console.log('\nAll categories:');
categories.forEach(c => {
  console.log(`  - ID: ${c.id}, Name: ${c.name}, Slug: ${c.slug}`);
});

// Get editorials in Analyses category (ID should be 5)
const [analysesEditorials] = await connection.execute('SELECT id, title FROM editorials WHERE categoryId = 5');
console.log('\nEditorials in Analyses category:');
analysesEditorials.forEach(e => {
  console.log(`  - ID: ${e.id}, Title: ${e.title}`);
});

await connection.end();
