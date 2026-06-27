import mysql from 'mysql2/promise';
const connection = await mysql.createConnection(process.env.DATABASE_URL);
const [cols] = await connection.execute('DESCRIBE editorials');
cols.forEach(col => console.log(col.Field, '-', col.Type));
await connection.end();
