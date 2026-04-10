import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import { sql } from 'drizzle-orm';

const db = drizzle(process.env.DATABASE_URL);

// Categories to seed
const categoriesData = [
  { name: 'Politique', slug: 'politique', description: 'Actualité politique du Sénégal et de l\'Afrique', sortOrder: 1 },
  { name: 'Économie', slug: 'economie', description: 'Économie, finances et développement', sortOrder: 2 },
  { name: 'Société', slug: 'societe', description: 'Société, éducation et santé', sortOrder: 3 },
  { name: 'International', slug: 'international', description: 'Actualité internationale et diplomatie', sortOrder: 4 },
  { name: 'Culture', slug: 'culture', description: 'Culture, arts et patrimoine', sortOrder: 5 },
  { name: 'Sport', slug: 'sport', description: 'Sport et compétitions', sortOrder: 6 },
  { name: 'Sciences & Religion', slug: 'sciences-religion', description: 'Sciences religieuses et dynamiques transnationales', sortOrder: 7 },
];

// RSS Sources to seed
const rssSourcesData = [
  // === SÉNÉGAL ===
  { name: 'Dakaractu', url: 'https://www.dakaractu.com/xml/', region: 'senegal', categoryId: null },
  { name: 'Senenews', url: 'https://www.senenews.com/feed/', region: 'senegal', categoryId: null },
  { name: 'Le Soleil', url: 'https://lesoleil.sn/feed/', region: 'senegal', categoryId: null },
  { name: 'APS (Agence de Presse Sénégalaise)', url: 'https://aps.sn/feed/', region: 'senegal', categoryId: null },
  { name: 'Senego', url: 'https://senego.com/feed', region: 'senegal', categoryId: null },
  { name: 'Leral', url: 'https://www.leral.net/xml/syndication.rss', region: 'senegal', categoryId: null },
  { name: 'Emedia', url: 'https://emedia.sn/feed/', region: 'senegal', categoryId: null },
  { name: 'Pressafrik', url: 'https://www.pressafrik.com/xml/syndication.rss', region: 'senegal', categoryId: null },
  { name: 'Sud Quotidien', url: 'https://www.sudquotidien.sn/feed/', region: 'senegal', categoryId: null },
  // === AFRIQUE DE L'OUEST / INTERNATIONAL ===
  { name: 'RFI Afrique', url: 'https://www.rfi.fr/fr/afrique/rss', region: 'afrique_ouest', categoryId: null },
  { name: 'France24 Afrique', url: 'https://www.france24.com/fr/afrique/rss', region: 'afrique_ouest', categoryId: null },
  { name: 'AllAfrica Sénégal', url: 'https://allafrica.com/tools/headlines/rdf/senegal/headlines.rdf', region: 'senegal', categoryId: null },
  { name: 'AllAfrica Afrique de l\'Ouest', url: 'https://allafrica.com/tools/headlines/rdf/westafrica/headlines.rdf', region: 'afrique_ouest', categoryId: null },
];

async function seed() {
  console.log('=== Seeding Categories ===');
  for (const cat of categoriesData) {
    try {
      await db.execute(sql`
        INSERT IGNORE INTO categories (name, slug, description, sortOrder)
        VALUES (${cat.name}, ${cat.slug}, ${cat.description}, ${cat.sortOrder})
      `);
      console.log(`  ✓ Category: ${cat.name}`);
    } catch (e) {
      console.log(`  ⚠ Category ${cat.name} already exists or error: ${e.message}`);
    }
  }

  console.log('\n=== Seeding RSS Sources ===');
  for (const src of rssSourcesData) {
    try {
      await db.execute(sql`
        INSERT IGNORE INTO rss_sources (name, url, region, isActive)
        VALUES (${src.name}, ${src.url}, ${src.region}, true)
      `);
      console.log(`  ✓ Source: ${src.name} (${src.region})`);
    } catch (e) {
      console.log(`  ⚠ Source ${src.name} error: ${e.message}`);
    }
  }

  // Verify counts
  const [catCount] = await db.execute(sql`SELECT COUNT(*) as cnt FROM categories`);
  const [srcCount] = await db.execute(sql`SELECT COUNT(*) as cnt FROM rss_sources`);
  console.log(`\n=== Summary ===`);
  console.log(`Categories in DB: ${JSON.stringify(catCount)}`);
  console.log(`RSS Sources in DB: ${JSON.stringify(srcCount)}`);

  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
