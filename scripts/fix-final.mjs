import { createConnection } from 'mysql2/promise';

const dbUrl = process.env.DATABASE_URL;
const conn = await createConnection(dbUrl);

const [rows] = await conn.execute('SELECT content FROM editorials WHERE id = 1710002');
let content = rows[0].content;

// Correction 1 : "chausser la place" → "chauffer la place"
content = content.replace(/chausser la place/g, 'chauffer la place');

// Correction 2 : "primatoria le" → "primatoriale" (espace parasite)
content = content.replace(/primatoria le/g, 'primatoriale');

const ok1 = content.includes('chauffer la place');
const ok2 = content.includes('primatoriale');
const noBad1 = !content.includes('chausser la place');
const noBad2 = !content.includes('primatoria le');

console.log('chauffer la place:', ok1, '| chausser supprimé:', noBad1);
console.log('primatoriale:', ok2, '| espace parasite supprimé:', noBad2);

await conn.execute('UPDATE editorials SET content = ?, updatedAt = NOW() WHERE id = 1710002', [content]);
console.log('Corrections applied.');
await conn.end();
