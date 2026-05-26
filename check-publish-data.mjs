import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(conn);

const [cats] = await conn.query('SHOW TABLES');
console.log('TABLES:', JSON.stringify(cats, null, 2));

const [bensirac] = await conn.query("SELECT id, name, alias, role FROM journalist_profiles WHERE name LIKE '%Fatah%' OR alias LIKE '%Bensirac%' LIMIT 5");
console.log('BENSIRAC:', JSON.stringify(bensirac, null, 2));

const [schema] = await conn.query('DESCRIBE editorials');
console.log('EDITORIALS SCHEMA:', JSON.stringify(schema.map(r => r.Field), null, 2));

await conn.end();
