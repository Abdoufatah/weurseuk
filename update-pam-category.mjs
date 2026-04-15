import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Get Analyses category ID
const [cats] = await connection.execute('SELECT id FROM categories WHERE slug = ?', ['analyses']);
const analysesId = cats[0]?.id;

if (!analysesId) {
  console.error('Analyses category not found');
  process.exit(1);
}

// Update Dr Pam articles to Analyses category
const [result] = await connection.execute(
  'UPDATE editorials SET categoryId = ? WHERE title LIKE ?',
  [analysesId, '%Bibliothèque universitaire%']
);

console.log(`Updated ${result.affectedRows} articles to Analyses category`);

// Verify
const [editorials] = await connection.execute(`
  SELECT e.id, e.title, c.name as categoryName 
  FROM editorials e 
  LEFT JOIN categories c ON e.categoryId = c.id
  WHERE e.title LIKE '%Bibliothèque%' OR e.title LIKE '%Pam%'
`);

console.log('\nUpdated editorials:');
editorials.forEach(e => {
  console.log(`  - ${e.title} → ${e.categoryName}`);
});

await connection.end();
