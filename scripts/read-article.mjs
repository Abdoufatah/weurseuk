import { createConnection } from 'mysql2/promise';
import { JSDOM } from 'jsdom';

const dbUrl = process.env.DATABASE_URL;
const conn = await createConnection(dbUrl);

const [rows] = await conn.execute('SELECT content FROM editorials WHERE id = 1710002');
const html = rows[0].content;

// Extraire le texte brut via JSDOM
const dom = new JSDOM(html);
const text = dom.window.document.body.textContent
  .replace(/\s+/g, ' ')
  .trim();

console.log(text);
await conn.end();
