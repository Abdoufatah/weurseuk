/**
 * Insert BenSirac article: Refondation curriculaire au Sénégal et IA
 */
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const article = {
  title: "Refondation curriculaire au Sénégal : l'intelligence artificielle traitée en compétence, pas en rupture",
  slug: "refondation-curriculaire-senegal-intelligence-artificielle-competence-rupture",
  excerpt: "Une refondation qui convoque la mémoire de six anciens ministres de l'Éducation pour parler de conduite du changement, de contraintes budgétaires et de négociations sociales, mais qui ne réunit pas, avec la même solennité, un ministre, un philosophe de la technique et un spécialiste de gouvernance algorithmique pour parler de ce que l'intelligence artificielle fait à l'idée même de savoir — cette refondation n'a pas encore compris à quoi elle a affaire.",
  content: `<p>Une refondation qui convoque la mémoire de six anciens ministres de l'Éducation pour parler de conduite du changement, de contraintes budgétaires et de négociations sociales, mais qui ne réunit pas, avec la même solennité, un ministre, un philosophe de la technique et un spécialiste de gouvernance algorithmique pour parler de ce que l'intelligence artificielle fait à l'idée même de savoir — cette refondation n'a pas encore compris à quoi elle a affaire. C'est la thèse que je défends ici, et je la défends en assumant qu'elle contredit, sur ce point précis, l'optimisme que suscite par ailleurs le chantier engagé à Dakar.</p>

<h2>Ce que le cadrage officiel a choisi de dire</h2>

<p>Le 22 juillet 2026, le ministre de l'Éducation nationale Moustapha Mamba Guirassy a réuni pour la première fois le Comité scientifique de la refondation curriculaire et le Conseil consultatif des anciens ministres. Le message qu'il a porté, rapporté par Le Soleil, était sans ambiguïté sur l'objet de cette rencontre : les anciens ministres étaient appelés à partager leur vécu des grandes réformes, des contraintes budgétaires, des négociations avec les partenaires sociaux et des difficultés rencontrées dans la conduite du changement. Rien à redire sur le principe — la mémoire institutionnelle est un capital réel, et le Sénégal a raison de ne pas la dilapider à chaque alternance, contrairement à tant d'autres États africains. Mais ce cadrage dit aussi, en creux, ce que cette instance n'était pas mandatée à faire : penser, au niveau des finalités, ce que signifie éduquer un citoyen dont une part croissante de la pensée sera coproduite avec des systèmes d'intelligence artificielle.</p>

<p>L'IA a bien été mentionnée dans les échanges de cette journée — aux côtés de l'intégration des langues nationales, de l'inclusion des daaras et de la décentralisation du système. Elle y figure donc. Mais elle y figure comme un point parmi d'autres, jamais comme le sujet qui justifierait, à lui seul, une convocation dédiée d'experts capables d'en mesurer la portée civilisationnelle.</p>

<h2>L'architecture institutionnelle confirme le diagnostic</h2>

<p>Ce n'est pas un hasard de calendrier, c'est un choix de classification. Le Comité scientifique de la refondation, présidé par le professeur Abdoullah Cissé, est structuré en cinq sous-comités : finalités de l'éducation, langues et apprentissages, santé et bien-être, gouvernance et financement, et sciences et numérique. L'intelligence artificielle est logée dans ce dernier sous-comité — aux côtés du numérique et des sciences en général — et non dans celui des finalités.</p>

<p>Ce rangement a un sens qu'il faut nommer sans détour : il fait de l'IA une compétence technique à acquérir, au même titre qu'une discipline scientifique, plutôt qu'une question transversale qui devrait irriguer la réflexion sur les finalités éducatives, la citoyenneté, la gouvernance du système et même les langues d'apprentissage — puisque les grands modèles de langue reconfigurent déjà, de fait, le rapport des jeunes générations à l'écrit, à l'argumentation et à la mémorisation. Traiter l'IA comme une case du numérique, c'est présupposer qu'elle s'ajoute à l'école telle qu'elle est ; or l'hypothèse la plus sérieuse, portée notamment par les travaux de l'UNESCO sur les futurs de l'éducation, est qu'elle modifie l'école telle qu'elle pense.</p>

<h2>Le contre-argument le plus fort — et pourquoi il ne suffit pas</h2>

<p>L'objection la plus solide à ma thèse est d'ordre pragmatique, et je la prends au sérieux : l'État sénégalais n'est pas resté dans la rhétorique. Plus de trois mille enseignants ont déjà été certifiés en compétences numériques et en intelligence artificielle à l'issue d'une phase pilote jugée concluante, avec une généralisation annoncée à l'ensemble des cent onze mille enseignants du pays, sous la co-présidence des ministères de l'Éducation nationale et de l'Enseignement supérieur, de la Recherche et de l'Innovation, dans le cadre du New Deal technologique et de la vision Sénégal 2050. C'est, à l'échelle ouest-africaine, un rythme d'exécution rare. On aurait tort de le minorer.</p>

<p>Mais l'exécution technique ne répond pas à la question que je pose. Certifier des enseignants à l'usage d'outils d'IA, c'est équiper l'école pour fonctionner avec l'IA. Ce n'est pas la même chose que de doter le Comité scientifique — celui qui décide des finalités, à l'horizon 2050 — d'une capacité à penser ce que l'omniprésence de ces outils fait à l'autorité du maître, à la valeur de l'effort intellectuel, à la définition même de ce qu'on appelle « savoir » dans un pays où l'école se veut aussi porteuse de valeurs et de repères culturels. On peut former les enseignants à l'usage d'un marteau sans avoir décidé quelle maison on construit. C'est précisément cette décision-là — architecturale, pas technique — qui semble aujourd'hui confiée à un sous-comité parmi cinq, plutôt qu'érigée en question fondatrice de toute la refondation.</p>

<h2>Ce que je crois, et ce que je ne peux pas encore vérifier</h2>

<p>Je dois être honnête sur les limites de ce diagnostic : je n'ai pas accès à la composition nominative du sous-comité « sciences et numérique », et il est possible qu'il compte en son sein des personnalités capables précisément de porter cette réflexion de rupture plutôt que d'accumulation de compétences. Si c'est le cas, mon inquiétude serait apaisée par les faits, non par la communication. Mais l'absence, à ce jour, de tout signal public allant dans ce sens — aucune déclaration du ministre, aucun compte rendu de presse, aucun document stratégique consulté ne mentionne une réflexion sur l'IA comme redéfinition des finalités éducatives — constitue en soi un indice. Un chantier qui pense vraiment le changement de paradigme le dit, le nomme, l'organise visiblement. Celui-ci, pour l'instant, ne le fait pas.</p>

<p>Ma conviction, et je l'assume comme telle : le Sénégal a les moyens, la volonté politique et la continuité institutionnelle pour réussir une refondation curriculaire ambitieuse. Il n'a pas encore, à en juger par les signaux disponibles, décidé de faire de l'intelligence artificielle autre chose qu'une compétence de plus sur une liste déjà longue — langues nationales, daaras, décentralisation, sciences. Tant que ce déplacement ne sera pas opéré, du sous-comité technique vers la table des finalités, la refondation sénégalaise restera, sur ce point précis, une modernisation de l'école plutôt qu'une refondation du rapport au savoir. Ce sera au Comité scientifique, et non aux six anciens ministres réunis en juillet, de dire s'il a l'intention de faire ce pas.</p>`,
  authorId: 30001, // BenSirac
  categoryId: 30009, // Éditorial
  categorySlug: "editorial",
  publishedAt: new Date("2026-08-02T08:00:00Z"),
  isFeatured: true,
  region: "SÉNÉGAL",
};

async function main() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  // Check if already exists
  const [existing] = await connection.execute(
    "SELECT id FROM editorials WHERE slug = ?",
    [article.slug]
  );
  if (existing.length > 0) {
    console.log("Article already exists, updating...");
    await connection.execute(
      `UPDATE editorials SET title=?, excerpt=?, content=?, isFeatured=1 WHERE slug=?`,
      [article.title, article.excerpt, article.content, article.slug]
    );
    console.log("✅ Updated existing article");
    await connection.end();
    return;
  }

  // Insert new article
  const [result] = await connection.execute(
    `INSERT INTO editorials 
     (title, slug, excerpt, content, authorId, categoryId, categorySlug, publishedAt, isFeatured, region, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      article.title,
      article.slug,
      article.excerpt,
      article.content,
      article.authorId,
      article.categoryId,
      article.categorySlug,
      article.publishedAt,
      article.isFeatured ? 1 : 0,
      article.region,
    ]
  );

  console.log(`✅ Article inserted with ID: ${result.insertId}`);
  console.log(`   Title: ${article.title}`);
  console.log(`   Slug: ${article.slug}`);
  console.log(`   Author ID: ${article.authorId} (BenSirac)`);
  console.log(`   Category: Éditorial (${article.categoryId})`);
  console.log(`   Featured: YES`);

  await connection.end();
}

main().catch(console.error);
