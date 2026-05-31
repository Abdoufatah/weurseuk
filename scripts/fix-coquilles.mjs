import { createConnection } from 'mysql2/promise';

const dbUrl = process.env.DATABASE_URL;
const conn = await createConnection(dbUrl);

// Récupérer le contenu actuel
const [rows] = await conn.execute(
  'SELECT id, content FROM editorials WHERE id = 1710002'
);

if (!rows.length) {
  console.error('Article not found');
  process.exit(1);
}

let content = rows[0].content;

// Correction 1 : "lice" → "lisse"
content = content.replace('plus lice et commode', 'plus lisse et commode');

// Correction 2 : "Assembl\u00e9e national," → "Assembl\u00e9e nationale,"
// (dans le corps de l'article, deux occurrences possibles)
content = content.replace(/Assembl\u00e9e national\b(?!e)/g, 'Assembl\u00e9e nationale');

// Correction 3 : "aigue" → "aiguë"
content = content.replace(/aigu\u00eb/g, 'aigu\u00eb'); // déjà correct si présent
content = content.replace(/aigue\b/g, 'aigu\u00eb');

// Vérification
const hasLisse = content.includes('plus lisse et commode');
const hasNationale = content.includes('Assembl\u00e9e nationale');
const hasAigue = content.includes('aigu\u00eb');

console.log('lisse:', hasLisse);
console.log('nationale:', hasNationale);
console.log('aiguë:', hasAigue);

// Mise à jour
await conn.execute(
  'UPDATE editorials SET content = ?, updatedAt = NOW() WHERE id = 1710002',
  [content]
);

console.log('Corrections applied successfully.');
await conn.end();
