import { createConnection } from 'mysql2/promise';
import { config } from 'dotenv';
config();

const conn = await createConnection(process.env.DATABASE_URL);

// 1. Mettre à jour le profil de Dr Adama Aly Pam (id 60001)
const bio = `Archiviste paléographe de formation, écrivain et chercheur spécialisé dans la mémoire documentaire et les archives de l'Afrique subsaharienne. Ses travaux portent sur la conservation du patrimoine écrit africain, la diplomatique des sources arabes et ajami, ainsi que sur les dynamiques historiques de long terme qui structurent les sociétés sahéliennes. Il contribue à Weurseuk en qualité d'analyste, apportant une lecture érudite et rigoureuse des enjeux politiques, culturels et historiques du Sénégal et de l'Afrique de l'Ouest.`;

await conn.execute(
  `UPDATE journalist_profiles SET 
    bio = ?,
    photoUrl = ?,
    role = 'analyst',
    alias = 'Dr Adama Aly Pam',
    updatedAt = NOW()
  WHERE id = 60001`,
  [bio, '/manus-storage/AdamaAliPam_portrait_clean_6b2afffa.png']
);
console.log('✅ Profil Dr Adama Aly Pam mis à jour');

// 2. Mettre à jour l'image illustrative de ses articles avec la version 16:9
// Chercher les articles liés à ce profil
const [articles] = await conn.execute(
  `SELECT id, title, coverImageUrl FROM editorials WHERE authorId = 60001`
);
console.log(`Articles trouvés : ${articles.length}`);

for (const art of articles) {
  if (!art.coverImageUrl || art.coverImageUrl.includes('AdamaAliPam')) {
    await conn.execute(
      `UPDATE editorials SET coverImageUrl = ?, updatedAt = NOW() WHERE id = ?`,
      ['/manus-storage/AdamaAliPam_illustration_e7b474b1.png', art.id]
    );
    console.log(`  ✅ Article "${art.title}" — illustration mise à jour`);
  } else {
    console.log(`  ℹ️  Article "${art.title}" — déjà une illustration spécifique, conservée`);
  }
}

await conn.end();
console.log('Terminé.');
