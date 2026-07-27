import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const title = "Oléagineux : le protectionnisme occidental sous le voile de la vertu écologique";
const slug = "oleagineux-protectionnisme-occidental-voile-vertu-ecologique";
const excerpt = "Sous couvert de grands discours sanitaires et d'impératifs écologiques, les multinationales occidentales de l'agro-industrie mènent une offensive forcenée contre les oléagineux des pays en développement, l'huile de palme en tête. Une guerre économique déguisée en combat de vertu, dont les ressorts remontent à la diabolisation de l'huile d'arachide dans les années 1990.";

const content = `<p>Au siècle dernier, Edward Bernays, auteur de <em>Propaganda</em> et théoricien de l'«&nbsp;ingénierie du consentement&nbsp;», démontrait, avec un cynisme pragmatique, comment manipuler les masses en construisant des récits de toutes pièces. Pour imposer un produit sur le marché, expliquait-il, il suffit de rendre son concurrent indésirable, voire nocif ou moralement condamnable aux yeux du public. Aujourd'hui, cette méthode de guerre psychologique fait rage sur l'échiquier mondial des huiles végétales. Sous couvert de grands discours sanitaires et d'impératifs écologiques, les multinationales occidentales de l'agro-industrie mènent une offensive forcenée contre les oléagineux des pays en développement, l'huile de palme en tête.</p>

<p>Cette diabolisation des oléagineux du «&nbsp;Sud réel&nbsp;» n'est pas nouvelle en soi. Elle n'est que la répétition générale d'un scénario éprouvé il y a plus de trente ans. Dans les décennies postindépendances et jusqu'aux années 1990, l'huile d'arachide, alors fleuron agricole du «&nbsp;Sud réel&nbsp;» notamment de l'Inde, du Nigéria et du Sénégal, subissait les foudres des producteurs de soja américain ainsi que de tournesol et de colza européens. En ces temps, une virulente campagne médiatique avait orchestré une panique générale autour de l'aflatoxine, qualifiant l'arachide de graisse lourde et nocive pour le système cardiovasculaire. Face à elle, les huiles du Nord étaient habilement médiatisées et positionnées comme modernes, légères et salvatrices. L'objectif réel de cette manœuvre mercantile et vénale était tout simplement d'évincer l'arachide des supermarchés européens pour protéger une agriculture occidentale massivement subventionnée et imposer définitivement le soja, le colza et le tournesol sur le marché mondial.</p>

<p>Une fois l'arachide marginalisée, les mêmes intérêts financiers sont revenus à la charge en trouvant leur nouvelle cible idéale, l'huile de palme. Portée par des rendements exceptionnels en Indonésie, en Malaisie et en Côte d'Ivoire, cette huile tropicale s'est rapidement hissée au sommet du marché international. Moins chère, ultra-compétitive et indispensable à l'industrie, elle représente à elle seule près de 40&nbsp;% de la production mondiale de corps gras. Face à cette hégémonie commerciale, attisée par l'explosion de la demande alimentaire et l'essor du biodiesel, la concurrence occidentale a choisi la méthode forte, la même consistant à transformer une rivalité de parts de marché en un combat de vertu.</p>

<p>Pour orchestrer ce grand boycott, les lobbies occidentaux des huiles ont trouvé des alliés de circonstance chez certains écologistes et scientifiques à l'objectivité douteuse, sinon vacillante. Les ONG occidentales martèlent depuis lors la même rengaine, accusant les palmeraies de détruire les forêts primaires et de menacer la biodiversité. Pourtant, l'argumentaire agronomique s'effondre dès qu'on se confronte à la réalité des chiffres. Le palmier à huile est une plante pérenne d'une efficacité biologique inégalée, capable, sans les redoutés fertilisants et pesticides chimiques, de produire jusqu'à quatre tonnes d'huile par hectare et par an, soit un rendement huit à dix fois supérieur à celui du soja, et six fois supérieur à celui du colza ou du tournesol.</p>

<p>C'est ici que réside le véritable «&nbsp;paradoxe vert&nbsp;» de la campagne de dénigrement du palmier à huile. En prônant le bannissement de son huile au profit d'ersatz au rendement beaucoup plus faible, l'industrie occidentale oblige en réalité à une extension massive des surfaces agricoles mondiales. Ce déplacement artificiel de la demande exporte, en effet, la déforestation vers l'Amérique du Sud, où la culture du soja dévore désormais l'Amazonie, le Cerrado et le Gran Chaco. De plus, contrairement au soja ou au colza, qui sont des cultures annuelles intensives gourmandes en labours répétés, en pesticides et en variétés OGM, le palmier à huile produit pendant près de trois décennies sans retournement des sols, limitant ainsi l'érosion et la dépendance aux intrants chimiques comme le très «&nbsp;cancérigène probable&nbsp;» glyphosate. En diabolisant le palmier, l'Occident a réussi le tour de force de valider des hausses de prix sous couvert d'éco-responsabilité, tout en aggravant globalement l'empreinte foncière et chimique de l'agriculture.</p>

<p>Sur le plan de la santé publique, le discours dominant frise également l'hypocrisie. L'argument massue repose sur la teneur en acides gras saturés de l'huile de palme, accusée de boucher les artères et de favoriser des maladies dégénératives, dont Alzheimer. S'il est indéniable qu'un excès de graisses saturées nuit à la santé, la communauté scientifique nuance fortement ce constat en rappelant que l'huile de palme n'y contribue que marginalement au sein d'une alimentation moderne déjà saturée de produits ultra-transformés. Surtout, l'industrie omet de préciser le prix sanitaire de la substitution. Naturellement solides à température ambiante, les huiles de palme et d'arachide offrent une stabilité thermique exceptionnelle qui évite le recours à l'hydrogénation industrielle, ce processus chimique qui génère les redoutables graisses «&nbsp;trans&nbsp;» autrement dites hydrogénées, du fait de leurs effets néfastes sur le système cardiovasculaire.</p>

<p>Ainsi donc, les huiles de substitution occidentales présentent des inconvénients majeurs que le marketing passe sous silence. Structurellement polyinsaturé, le soja s'avère hautement instable. Porté à haute température lors des fritures industrielles ou ménagères, il s'oxyde rapidement pour libérer des composés toxiques et des radicaux libres. De surcroît, sa surconsommation rompt l'équilibre nutritionnel en apportant un excès d'oméga-6, créant un terrain pro-inflammatoire chronique directement lié à l'explosion de l'obésité et du diabète de type 2. En voulant chasser le loup du palmier, l'Occident a tout simplement introduit le tigre du soja et compagnie dans ses assiettes et celles du reste du monde dans son giron commercial.</p>

<p>L'arsenal de cette guerre économique ne se limite pas aux slogans publicitaires et aux étiquettes discriminantes. Face aux règles de l'Organisation mondiale du commerce qui interdisent les barrières douanières directes, l'Union européenne déploie une ingénierie juridique redoutable sous la forme de barrières non tarifaires. Le Règlement européen sur la déforestation importée (EUDR), adopté en 2023, en est l'illustration la plus récente. Son objectif affiché est d'interdire l'importation et la commercialisation sur le marché européen de produits ayant contribué à la déforestation ou à la dégradation des forêts à travers le monde. Ainsi présenté l'EUDR semble noble, mais son application sur le terrain s'avère profondément injuste pour les pays du Sud. En imposant des obligations complexes de géolocalisation des parcelles sous peine d'exclusion des marchés, l'Europe frappe de plein fouet les petits planteurs traditionnels d'Afrique de l'Ouest et centrale. Contrairement aux méga-plantations intégrées d'Asie, ces structures villageoises n'ont ni le capital ni les outils techniques pour absorber de tels coûts administratifs, se voyant ainsi privées des primes liées aux certifications de durabilité.</p>

<p>Ce protectionnisme agressif est toutefois en train de produire l'effet inverse de celui escompté, agissant comme un puissant accélérateur de souveraineté pour les pays producteurs. Constatant le cynisme et la versatilité des marchés du Nord, les acteurs africains réorientent désormais leurs flux vers leurs propres espaces régionaux, comme l'UEMOA, afin de combler le déficit structurel du continent en matières grasses. Cette dynamique s'accompagne d'une industrialisation locale accrue, notamment à travers la valorisation de l'huile de palme pour les secteurs cosmétique et de l'alimentation animale, transformant une contrainte coloniale en un levier d'autosuffisance.</p>

<p>Pendant ce temps, sur les marchés financiers, les rapports de force basculent. Premier producteur mondial, l'Indonésie dicte désormais ses conditions en déployant son programme de biodiesel B50, qui intègre la moitié de sa production nationale de palme dans son mix énergétique. Cette décision stratégique contracte mécaniquement l'offre mondiale et fait incidemment grimper les cours de toutes les huiles végétales à des niveaux record, forçant les grands importateurs mondiaux, comme l'Inde, à arbitrer constamment leurs achats en rapport au panier de la ménagère.</p>

<p>En érigeant ainsi le protectionnisme en dogme moral sous la pression des ONG et des lobbies locaux, l'Occident s'est enfermé dans un triple aveuglement. Il fragilise les économies paysannes du Sud qui dépendent de cette culture pour vivre, détériore la qualité nutritionnelle de ses propres produits industriels et aggrave, par un pur contresens agronomique, la crise écologique globale. Face à cette dérive, le «&nbsp;Sud réel&nbsp;» fait bien de choisir la voie de la rationalité économique, celle de l'intégration régionale et d'un détachement progressif vis-à-vis des exigences occidentales.</p>

<p>Il est heureux qu'en plus de l'emblématique huile d'arachide, le Sénégal joue la carte de la diversification de l'approvisionnement de ses usines en important du palme brut de Côte d'Ivoire et d'autres pays producteurs de la Communauté ouest-africaine et en développant de nouvelles cultures industrielles locales. Le défi majeur est et demeure la souveraineté alimentaire, avec pour objectif de réduire progressivement la dépendance aux marchés extérieurs, dans un cadre régional intégré et dynamique.</p>`;

// Catégorie : Politique & Économie (ID 30002) ou Analyses (30005)
// Pape Amadou Fall = authorId 60002
const categoryId = 30005; // Analyses
const authorId = 60002;
const authorPhotoUrl = '/manus-storage/PapeAmadouFall-halo_866d6297.png';
const authorName = 'Pape Amadou Fall';
const categoryName = 'Analyses';
const categorySlug = 'analyses';
const publishedAt = new Date('2026-07-27T08:00:00Z');

// Vérifier si l'article existe déjà
const [existing] = await conn.execute('SELECT id FROM editorials WHERE slug = ?', [slug]);
if (existing.length > 0) {
  console.log('Article déjà existant, mise à jour...');
  await conn.execute(
    `UPDATE editorials SET title=?, excerpt=?, content=?, categoryId=?, authorId=?, isPublished=1, isFeatured=1, publishedAt=?, updatedAt=NOW() WHERE slug=?`,
    [title, excerpt, content, categoryId, authorId, publishedAt, slug]
  );
} else {
  console.log('Insertion du nouvel article...');
  await conn.execute(
    `INSERT INTO editorials (title, slug, excerpt, content, type, categoryId, authorId, isPublished, isFeatured, useAlias, publishedAt, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, 'editorial', ?, ?, 1, 1, 0, ?, NOW(), NOW())`,
    [title, slug, excerpt, content, categoryId, authorId, publishedAt]
  );
}

// Vérification
const [rows] = await conn.execute('SELECT id, title, isFeatured, isPublished FROM editorials WHERE slug = ?', [slug]);
console.log('✅ Article inséré/mis à jour :', rows[0]);

await conn.end();
