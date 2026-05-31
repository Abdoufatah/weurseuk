import { createConnection } from 'mysql2/promise';

const dbUrl = process.env.DATABASE_URL;
const conn = await createConnection(dbUrl);

const [rows] = await conn.execute('SELECT id, content FROM editorials WHERE id = 1710002');
let content = rows[0].content;

// Correction : "chausser la place" → "chauffer la place"
content = content.replace(/chausser la place/g, 'chauffer la place');

const ok = content.includes('chauffer la place');
console.log('chauffer la place:', ok);

await conn.execute('UPDATE editorials SET content = ?, updatedAt = NOW() WHERE id = 1710002', [content]);
console.log('Done.');
await conn.end();
