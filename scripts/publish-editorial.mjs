/**
 * Script de publication d'éditorial directement en base de données
 * Usage : node scripts/publish-editorial.mjs
 */
import "dotenv/config";
import mysql from "mysql2/promise";

const TITLE = "Les parapluies corruptogènes";
const SUBTITLE = "Comment le protocole fabrique l'opacité";
const EXCERPT = "Dans l'espace public sénégalais, certaines formules semblent anodines à force d'être banalisées. « Sous le haut patronage du Président de la République ». « Sous les instructions de Son Excellence ». « Grâce à la générosité de Monsieur le Ministre ». On les lit sans y prêter attention. C'est précisément là leur pouvoir.";

const CONTENT = `<p class="editorial-rubrique"><em>Anthropologie politique — Sénégal</em></p>

<h2>Comment le protocole fabrique l'opacité</h2>

<p>Dans l'espace public sénégalais, certaines formules semblent anodines à force d'être banalisées. « Sous le haut patronage du Président de la République ». « Sous les instructions de Son Excellence ». « Grâce à la générosité de Monsieur le Ministre ». On les lit sur des bâches de cérémonies, des programmes de colloques, des affiches de tournois sportifs. On les lit sans y prêter attention. C'est précisément là leur pouvoir.</p>

<h3>Le langage comme architecture du pouvoir</h3>

<p>Toute anthropologie du pouvoir commence par une évidence trop souvent négligée : le langage ne décrit pas le réel, il le produit. Les mots n'accompagnent pas les institutions, ils les organisent. Et quand un événement est annoncé « sous le haut patronage » d'un chef d'État, cela signifie bien plus qu'une approbation morale ou un décorum de chancellerie.</p>

<p>Dans l'imaginaire politique local, forgé par des décennies de centralisation postcoloniale, une telle formule active un faisceau d'attentes très concrètes : une bénédiction officielle qui légitime, un intérêt personnel de l'autorité qui engage, une protection politique qui rassure — et, presque inévitablement, une contribution financière qui s'impose. Le mot « patronage » ne ment pas sur sa nature. Il renvoie historiquement à une relation verticale entre un protecteur et ses dépendants. Le patron donne, couvre, recommande, finance. Les autres reçoivent, remercient, s'alignent. Ce n'est pas une relation citoyenne fondée sur l'égalité devant la règle commune. C'est une relation de clientèle.</p>

<blockquote><p>« Le vocabulaire pompeux masque la trivialité de la transaction. On n'écrit pas : nous avons besoin de financement. On écrit : sous le haut patronage de. Le langage sublime la demande en distinction, convertit la sollicitation en honneur. »</p></blockquote>

<p>La persistance de ces formules au Sénégal n'est pas un accident stylistique. Elle est le signe d'une survie : celle d'un imaginaire politique pré-républicain, celui du chef dispensateur de faveurs, contre lequel les constitutions ont été écrites mais que les pratiques n'ont pas encore congédié.</p>

<h3>Une généalogie coloniale que l'indépendance n'a pas liquidée</h3>

<p>Pour comprendre cet imaginaire, il faut remonter à l'ordre colonial français. L'administration coloniale ne gouvernait pas principalement par la loi universelle, mais par une hiérarchie de médiations : gouverneur, commandant de cercle, chefs cantonaux, notables reconnus. Le pouvoir se présentait comme protecteur, arbitre et distributeur. Il récompensait les fidélités, sanctionnait les écarts, sélectionnait les intermédiaires utiles. Dans cet univers, obtenir le patronage de l'autorité, c'était accéder à des ressources, à des marchés, à des exemptions.</p>

<p>La décolonisation politique n'a pas entièrement détruit cette matrice. Les drapeaux ont changé, les constitutions ont été nationalisées, mais certaines formes mentales du pouvoir sont restées intactes. L'État postcolonial a hérité non seulement des bâtiments administratifs, mais aussi des réflexes de centralisation paternaliste. Le chef d'État africain, dans de nombreux contextes, a été reconstruit comme figure tutélaire : père de la nation, source ultime des grâces. Le vocabulaire du patronage a prospéré dans cet espace.</p>

<p>Ce n'est pas une spécificité sénégalaise. C'est un héritage structurel partagé à des degrés divers par l'ensemble des sociétés francophones d'Afrique de l'Ouest. Mais le Sénégal, fort de sa tradition administrative relativement structurée, de sa presse vivante, de ses alternances politiques, se trouve peut-être mieux armé que d'autres pour regarder ce mécanisme en face.</p>

<h3>La mécanique financière cachée derrière le prestige</h3>

<p>Le cœur du problème n'est pas symbolique, il est matériel. Lorsqu'une structure annonce un événement sous le haut patronage d'une haute autorité, une attente financière très concrète s'enclenche. Les organisateurs espèrent : enveloppes discrètes, prises en charge logistiques, subventions exceptionnelles, contributions en espèces, facilitations administratives. Cette attente n'est pas formulée. Elle est précisément sa force : elle fonctionne sur le mode de l'implicite, du non-dit, de l'obligation sans contrat.</p>

<p>Or les rémunérations légales d'un ministre ou d'un directeur général, dans un environnement où les sollicitations sont incessantes, ne permettent généralement pas d'y répondre par des moyens licites. Une tension structurelle apparaît alors : le prestige du poste crée des demandes que le revenu officiel ne peut satisfaire. La réponse systémique à cette tension, c'est l'économie grise du pouvoir — circuits parallèles, caisses informelles, surfacturations, commissions non tracées.</p>

<blockquote><p>« Le patronage symbolique fabrique une pression matérielle. Et cette pression appelle, presque mécaniquement, des ressources qui ne peuvent venir que de l'ombre. »</p></blockquote>

<p>C'est pourquoi il serait insuffisant de ne voir dans ces pratiques qu'une simple morale défaillante. On n'est pas face à des prédateurs isolés. On est face à un système d'obligations dans lequel des acteurs souvent contraints naviguent du mieux qu'ils peuvent, avec les règles du jeu qu'on leur a transmises.</p>

<h3>La corruption comme économie sociale, non comme simple vice</h3>

<p>Dans plusieurs sociétés ouest-africaines, le statut social élevé s'accompagne d'attentes redistributives puissantes. Celui qui « est arrivé » doit aider : famille élargie, village d'origine, dahira, association sportive, cérémonie religieuse, réseau politique. Lorsqu'un responsable public occupe une position stratégique, ces attentes se multiplient. Il devient un guichet social. Refuser expose à l'accusation d'arrogance, d'ingratitude, d'oubli des siens.</p>

<p>La corruption n'apparaît alors pas seulement comme enrichissement personnel ; elle fonctionne aussi, et parfois surtout, comme mode de financement d'obligations sociales politiquement indispensables. C'est ce qui lui confère sa durabilité : elle répond à des demandes réelles, elle circule dans un système de sens cohérent.</p>

<p>Les parapluies corruptogènes s'inscrivent dans ce système. Ils ritualisent et légitiment la demande d'argent sous forme d'hommage protocolaire. Ils transforment une extraction en cérémonie. Ils font de l'opacité une forme de politesse.</p>

<h3>Rupture proclamée, structures mentales intactes</h3>

<p>Le pouvoir actuel au Sénégal a largement mobilisé le registre de la rupture, de la souveraineté recouvrée, de la refondation. Ces mots engagent. Ils suscitent un espoir réel, notamment dans les franges les plus jeunes et les plus éduquées d'une société qui réclame justice, exemplarité, dignité institutionnelle.</p>

<p>Mais toute rupture authentique commence par une révolution des catégories mentales. Elle change les réflexes administratifs, elle touche les rites du pouvoir, elle réforme la grammaire de la domination. Or une révolution qui se contente de changer les visages sans toucher les mécanismes ne fait que déplacer les mêmes engrenages sous de nouveaux noms.</p>

<blockquote><p>« On peut remplacer les hommes sans déplacer les logiques. On peut crier à la souveraineté tout en conservant des structures mentales coloniales et néo-patrimoniales. La rupture véritable se mesure non aux discours mais aux dispositifs qu'on démantèle. »</p></blockquote>

<p>Si demain les invitations officielles continuent d'exhiber « sous le haut patronage de », si les cérémonies d'État perpétuent le culte de la générosité personnelle du dirigeant, si les financements publics continuent de transiter par des enveloppes et des réseaux plutôt que par des lignes budgétaires traçables, alors beaucoup comprendront que la vieille matrice n'a pas disparu. Elle a simplement changé d'occupants.</p>

<h3>Ce que pourrait signifier une décolonisation administrative</h3>

<p>La décolonisation, au sens le plus sérieux du terme, n'est pas seulement monétaire, diplomatique ou linguistique. Elle est aussi administrative et psychologique. Elle touche à la façon dont l'État se raconte à lui-même et à ses citoyens.</p>

<p>Il est permis d'imaginer ce que cela pourrait produire concrètement. Des fonds culturels et sportifs publics, dotés de critères transparents et ouverts à candidature, pourraient remplacer les enveloppes discrètes. Des budgets d'appui associatif, audités et publiés, pourraient se substituer à la générosité discrétionnaire des ministres. Un langage institutionnel sobre et républicain — « partenariat institutionnel », « soutien public accordé selon procédure » — pourrait peu à peu démonétiser le prestige personnel attaché aux fonctions.</p>

<p>Ce ne seraient pas seulement des réformes techniques. Ce serait un signal adressé à la société tout entière : une association n'a pas à chercher un parrain politique pour exister. Un artiste n'a pas à courtiser un directeur général pour obtenir une salle. Un club sportif n'a pas à figurer sous le haut patronage de quiconque pour mériter un financement. La valeur d'une initiative se mesure à ses mérites, pas à la hauteur de la signature qui la couvre.</p>

<p>Cela supposerait, bien entendu, un courage politique réel. Renoncer aux avantages immédiats que confèrent les réseaux de patronage — loyautés, visibilité, influence — pour construire une institutionnalité durable n'est pas un choix sans coût. C'est précisément pourquoi ce choix serait significatif.</p>

<h3>La lumière après les parapluies</h3>

<p>Le Sénégal traverse un moment charnière. Une nouvelle génération, instruite et connectée, regarde ses institutions avec une exigence inédite. Elle n'ignore pas les héritages. Elle en comprend les contraintes. Mais elle refuse de les naturaliser, de les accepter comme une fatalité culturelle ou comme une identité intangible.</p>

<p>Cette génération sait, au fond, que les parapluies corruptogènes ne sont pas des mots anodins. Ce sont des dispositifs politiques. Ils abritent des hiérarchies anciennes, des circuits opaques, une certaine conception du pouvoir : verticale, personnalisée, fondée sur la grâce plutôt que sur le droit.</p>

<p>Un État moderne ne repose pas sur la générosité de ses titulaires. Il repose sur la prévisibilité de ses règles. Le citoyen n'y remercie pas un homme pour ce que l'institution lui doit selon la loi. Il demande des comptes à l'institution elle-même. La différence entre ces deux postures n'est pas anecdotique. C'est la différence entre la sujétion et la citoyenneté.</p>

<blockquote><p>« La révolution véritable commence lorsque les mots cessent de mentir. Lorsque la République cesse de parler la langue de la cour. Lorsque l'État n'est plus un parrain, mais une institution. »</p></blockquote>

<p>Ce chemin n'est pas tracé d'avance. Il ne s'emprunte pas par décret. Il se construit par des choix quotidiens, par des refus discrets, par la décision de quelques-uns de résister à la logique du système — et par la vigilance d'une société civile qui sait désormais nommer ce qu'elle voit.</p>

<p>Les parapluies peuvent se fermer. Cela s'est déjà vu, ailleurs, ici. La lumière peut entrer.</p>

<p class="editorial-signature"><em>— Bensirac<br>Anthropologie politique, sociétés postcoloniales d'Afrique de l'Ouest</em></p>`;

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 200);
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }

  const conn = await mysql.createConnection(url);

  // Récupérer l'ID de la catégorie "Éditorial"
  const [cats] = await conn.execute(
    "SELECT id FROM categories WHERE name LIKE '%ditorial%' LIMIT 1"
  );
  const categoryId = cats.length > 0 ? cats[0].id : null;
  console.log("Category ID:", categoryId);

  // Récupérer l'ID de l'auteur Bensirac (journalist profile)
  const [authors] = await conn.execute(
    "SELECT id FROM journalist_profiles WHERE alias LIKE '%Bensirac%' LIMIT 1"
  );
  const authorId = authors.length > 0 ? authors[0].id : null;
  console.log("Author ID:", authorId);

  const slug = slugify(TITLE);
  const now = new Date();

  // Vérifier si l'éditorial existe déjà
  const [existing] = await conn.execute(
    "SELECT id FROM editorials WHERE slug = ?",
    [slug]
  );

  if (existing.length > 0) {
    console.log("Editorial already exists with ID:", existing[0].id);
    await conn.end();
    return;
  }

  const [result] = await conn.execute(
    `INSERT INTO editorials 
     (title, slug, excerpt, content, categoryId, authorId, isPublished, isFeatured, publishedAt, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, 1, 0, ?, ?, ?)`,
    [TITLE, slug, EXCERPT, CONTENT, categoryId, authorId, now, now, now]
  );

  console.log("Editorial published successfully! ID:", result.insertId);
  console.log("URL: /editorial/" + slug);
  await conn.end();
}

main().catch(console.error);
