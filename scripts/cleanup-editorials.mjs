/**
 * Script de nettoyage : dépublie les éditoriaux sans auteur (générés par le LLM sans base RSS)
 */
import 'dotenv/config';
import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Dépublier tous les éditoriaux sans authorId (générés automatiquement par le LLM)
const [result] = await conn.execute(
  `UPDATE editorials SET isPublished = 0 WHERE authorId IS NULL AND isPublished = 1`
);
console.log('Éditoriaux dépubliés (sans auteur):', result.affectedRows);

// Vérifier ce qui reste publié
const [remaining] = await conn.execute(
  `SELECT id, title, authorId FROM editorials WHERE isPublished = 1`
);
console.log('Éditoriaux publiés restants:');
remaining.forEach(r => console.log(`  [${r.id}] ${r.title} (auteur: ${r.authorId || 'aucun'})`));

await conn.end();
console.log('Nettoyage terminé.');
