import { createConnection } from 'mysql2/promise';

const dbUrl = process.env.DATABASE_URL;
const conn = await createConnection(dbUrl);

const [tables] = await conn.execute('SHOW TABLES');
console.log('=== TABLES ===');
console.log(JSON.stringify(tables, null, 2));

await conn.end();
