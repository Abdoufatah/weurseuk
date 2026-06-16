import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const id = 1860007;

// Récupérer le contenu actuel
const [rows] = await connection.execute('SELECT content FROM editorials WHERE id = ?', [id]);
const currentContent = rows[0].content;

// Bloc vidéo à insérer juste après le chapeau (avant le h2 "I. Préambule")
const videoBlock = `
<div style="margin:2rem 0; border:1px solid #e0c97a; border-radius:8px; overflow:hidden; background:#000;">
<video controls playsinline style="width:100%; display:block;" poster="https://i.imgur.com/s2BDkNU.jpeg">
<source src="/manus-storage/SONKOSURLADETTECAHEE_7b23bb1e.mp4" type="video/mp4">
Votre navigateur ne supporte pas la lecture vidéo.
</video>
<p style="font-family:'Libre Baskerville', serif; font-size:0.8rem; color:#888; padding:0.6rem 1rem; margin:0; background:#1a1a1a; text-align:center;">Extrait de l'entretien exclusif d'Ousmane Sonko accordé à RFI et France 24, 15 juin 2026. Séquence isolée et découpée par Abdou Fatah FALL. © RFI / France 24</p>
</div>
`;

// Insérer le bloc vidéo après le chapeau (avant le premier h2)
const updatedContent = currentContent.replace(
  '<h2 style="font-family:\'Cormorant Garamond\', serif; font-size:1.4rem; font-weight:700; margin:2rem 0 1rem; color:#1a1a1a; border-bottom:1px solid #e0c97a; padding-bottom:0.4rem;">I. Préambule méthodologique</h2>',
  videoBlock + '<h2 style="font-family:\'Cormorant Garamond\', serif; font-size:1.4rem; font-weight:700; margin:2rem 0 1rem; color:#1a1a1a; border-bottom:1px solid #e0c97a; padding-bottom:0.4rem;">I. Préambule méthodologique</h2>'
);

try {
  await connection.execute(
    'UPDATE editorials SET content = ?, updatedAt = ? WHERE id = ?',
    [updatedContent, new Date(), id]
  );
  console.log('✅ Vidéo intégrée dans l\'article (crédit RFI/France 24)');
} catch (err) {
  console.error('❌ Erreur :', err.message);
} finally {
  await connection.end();
}
