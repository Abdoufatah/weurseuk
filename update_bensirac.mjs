import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const photoUrl = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663077132964/gZtFuPhj9JU8iVtsGM9iQB/bensirac-portrait_1363624a.png';
const bio = "Chercheur en sciences religieuses, sociétés et dynamiques transnationales. Journaliste et analyste politique spécialisé sur le Sénégal et l'Afrique de l'Ouest. Ses publications se distinguent par leur rigueur scientifique, leur profondeur conceptuelle et leur niveau d'analyse extrêmement élevé.";

const [r] = await conn.execute(
  'UPDATE journalist_profiles SET name = ?, alias = ?, photoUrl = ?, bio = ?, categoryId = ? WHERE id = ?',
  ['Abdou Fatah Fall', 'Bensirac', photoUrl, bio, 30009, 30001]
);
console.log('Profil mis à jour:', r.affectedRows, 'ligne(s)');

const [check] = await conn.execute('SELECT id, name, alias, photoUrl FROM journalist_profiles WHERE id = 30001');
console.log(JSON.stringify(check[0], null, 2));

await conn.end();
