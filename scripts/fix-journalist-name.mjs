import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;

async function main() {
  const connection = await mysql.createConnection(DATABASE_URL);
  
  // Récupérer le contenu actuel
  const [rows] = await connection.execute('SELECT content, excerpt FROM editorials WHERE id = 1860007');
  let content = rows[0].content;
  let excerpt = rows[0].excerpt;
  
  // Remplacer Xavier Lambrechts par Marc Perelman partout dans le contenu
  const replacements = [
    ['Xavier Lambrechts', 'Marc Perelman'],
    ['XAVIER LAMBRECHTS', 'MARC PERELMAN'],
    ['Xavier&nbsp;Lambrechts', 'Marc&nbsp;Perelman'],
  ];
  
  let countContent = 0;
  let countExcerpt = 0;
  
  for (const [from, to] of replacements) {
    const regex = new RegExp(from, 'g');
    const matchesContent = content.match(regex);
    if (matchesContent) {
      countContent += matchesContent.length;
      content = content.replace(regex, to);
    }
    if (excerpt) {
      const matchesExcerpt = excerpt.match(regex);
      if (matchesExcerpt) {
        countExcerpt += matchesExcerpt.length;
        excerpt = excerpt.replace(regex, to);
      }
    }
  }
  
  // Mettre à jour en base
  await connection.execute(
    'UPDATE editorials SET content = ?, excerpt = ? WHERE id = 1860007',
    [content, excerpt]
  );
  
  console.log(`✅ Corrections effectuées :`);
  console.log(`   - Contenu : ${countContent} remplacement(s) de "Xavier Lambrechts" → "Marc Perelman"`);
  console.log(`   - Chapeau : ${countExcerpt} remplacement(s)`);
  
  await connection.end();
}

main().catch(e => { console.error(e); process.exit(1); });
