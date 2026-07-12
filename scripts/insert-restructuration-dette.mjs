import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;
const url = new URL(DATABASE_URL);

const connection = await mysql.createConnection({
  host: url.hostname,
  port: parseInt(url.port),
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  ssl: { rejectUnauthorized: true }
});

const title = "Sénégal-FMI : Le piège de la rigueur comptable face aux impératifs du développement";
const slug = "senegal-fmi-piege-rigueur-comptable-imperatives-developpement";
const excerpt = "Les récents indicateurs macroéconomiques salués par le Fonds monétaire international affichent une trajectoire flatteuse pour l'économie sénégalaise. Pourtant, derrière la baisse apparente du déficit et le bond mécanique du PIB portés par l'expatriation des rentes pétrolières, se profile une cure d'austérité qui ne dit pas son nom. Entre exigences de transparence des bailleurs et flexibilité nécessaire pour bâtir une souveraineté économique réelle, Dakar avance sur une ligne de crête hautement périlleuse.";

const content = `<article class="editorial-content">

<p>Les statistiques rendues publiques à l'issue de la dernière mission du Fonds monétaire international à Dakar laissent entrevoir une éclaircie dans la grisaille de l'économie sénégalaise. Elles suggèrent même une vigoureuse reprise. Comme s'en félicite un communiqué officiel de l'institution, la croissance du PIB réel aurait atteint 6,7 % en 2025, tandis que le déficit budgétaire global serait fortement réduit, passant de 13,4 % du PIB en 2024 à 6,4 % en 2025.</p>

<p>Mais les clignotants sont-ils réellement au vert ? Pas tout à fait. La croissance mise en avant ne résulte pas de la dynamique interne d'une économie nationale qui demeure en léthargie, mais principalement par valorisation des exportations d'hydrocarbures exploitées par des consortiums internationaux. Le Produit intérieur brut mesure la valeur totale des biens et services produits à l'intérieur des frontières, indépendamment de la nationalité des capitaux. Dans le cas d'espèce, la « richesse nationale » a beau grimper significativement avec l'entrée en production du pétrole et du gaz, elle retombe presque intégralement dans l'escarcelle des géants étrangers aux commandes.</p>

<h2>Le mirage statistique des hydrocarbures</h2>

<p>Atteignant environ 1 600 milliards de FCFA en 2025, la valeur totale de la production brute d'hydrocarbures sur le territoire sénégalais prend les traits d'une manne colossale. Mais cette lueur ne trompera que ceux qui veulent bien l'être. Ces rentrées d'argent frais servent, pour l'essentiel, à amortir les investissements massifs des compagnies étrangères à travers le mécanisme du Cost Oil au profit de Woodside et BP, à rémunérer leurs technologies et à garantir leurs bénéfices.</p>

<p>Si ces exportations gonflent mécaniquement le PIB, elles ne contribuent donc que très marginalement au Revenu national brut, la mesure réelle de la richesse nette qui se reste véritablement dans le tissu local. La contribution directe du secteur aux avoirs nationaux se révèle on ne peut plus modeste, s'élevant à peine à 72,53 milliards de FCFA en 2025 sous forme de redevances, de parts pour Petrosen et d'impôts. C'est une goutte d'eau dans un budget national qui requiert 6 395 milliards de FCFA de recettes globales. Une telle somme n'a pas la consistance nécessaire pour relancer le financement des infrastructures publiques, ni pour se traduire par une amélioration palpable du niveau de vie d'une population qui attend toujours la concrétisation des promesses de prospérité liées à l'ère pétrolière.</p>

<p>En plus de ces faibles ressources issues des contrats de partage de production, le secteur classique du raffinage, de la distribution et de l'importation, qui constitue un pilier fiscal indirect majeur, a permis à la puissance publique d'engranger quelque 665 milliards de FCFA au titre des taxes sectorielles sur les produits pétroliers. À l'inverse, l'État a dû engager 380 milliards de FCFA pour subventionner la consommation énergétique des entreprises, des administrations et des ménages.</p>

<p>Le solde dégagé est certes positif et a pesé dans la réduction du déficit budgétaire, ramené à 6,4 % à la fin de l'année 2025. Mais cela reste un trompe-l'œil, car ce niveau demeure deux fois supérieur à la norme de 3 % fixée par les critères de convergence de l'UEMOA. De surcroît, cet assainissement dont le FMI se félicite à mots couverts découle principalement d'une compression des importations et d'une rationalisation des dépenses publiques. Ce sont là des euphémismes techniques pour désigner l'amorce d'une politique d'austérité que l'institution de Bretton Woods souhaite voir systématisée, face à un exécutif qui oppose une résistance évidente pour des motifs politiques et socio-économiques prévisibles.</p>

<h2>De ladite « dette cachée » au dysfonctionnement technique</h2>

<p>S'il est un point sur lequel l'accord est scellé entre le FMI et l'État du Sénégal, c'est bien celui de la fameuse dette cachée. Le nouveau président de l'Assemblée nationale, qui a abondamment usé de cette accusation politique contre le régime précédent lorsqu'il occupait la fonction de Premier ministre, a fini par reconnaître qu'il ne maîtrisait pas toutes les subtilités du dossier. Le FMI, qui savait parfaitement à quoi s'en tenir, s'est toujours gardé d'employer une terminologie aussi clivante. L'institution préfère manier une sémantique plus sereine, parlant de « misreporting », c'est-à-dire de déclarations erronées imputables à des contrôles internes défaillants, des omissions systémiques ou des méthodes de suivi obsolètes.</p>

<p>Admettre l'existence d'une dette sciemment dissimulée reviendrait, pour le FMI, à confesser une faille majeure dans ses propres missions de surveillance, alors que ses équipes passent plusieurs semaines chaque année à Dakar pour auditer les comptes publics. En privilégiant des termes neutres pointant des lacunes dans le contrôle budgétaire, le Fonds ne valide pas la thèse d'une fraude systémique orchestrée par le pouvoir déchu, mais met en exergue un dysfonctionnement technique et administratif. En clair, ces dettes n'étaient pas invisibles : elles étaient simplement non consolidées et exclues des lois de finances initiales. D'un point de vue purement financier, elles figuraient noir sur blanc dans les livres des créanciers bilatéraux, les comptes des banques commerciales et les bilans internes des sociétés publiques et parapubliques qui les ont contractées.</p>

<p>Pendant des décennies, le FMI a lui-même toléré cette frontière étanche entre la dette de l'État central et celle des agences ou structures de développement public. L'argument alors en vigueur consistait à affirmer que ces entreprises, censées générer leurs propres revenus, portaient un risque commercial indépendant de la fiscalité des contribuables, bien qu'elles bénéficiassent souvent d'une garantie souveraine. Cette démarcation permettait à l'État de présenter un ratio d'endettement vertueux vis-à-vis des critères régionaux. Le problème surgit lorsque ces dettes contingentes deviennent insoutenables. L'État se voit alors contraint d'intervenir par des subventions d'équilibre ou des reprises de passifs pour éviter des faillites en chaîne.</p>

<h2>Les deux faces d'un changement de paradigme</h2>

<p>Le Sénégal n'en était pas encore à ce point de rupture lorsque le débat sur la dette a été politisé. Mais la boîte de Pandore ainsi ouverte a fourni au FMI le parfait prétexte pour rompre avec sa passivité passée et imposer ses nouvelles règles comptables. Désormais, selon la doctrine du Fonds, toute dette contractée par une entité publique, dès lors qu'elle dépend des deniers de l'État ou d'une garantie souveraine, engage directement la signature de la République. Dakar a accepté de se plier à cette exigence, comme s'en est réjouie la dernière mission du FMI, saluant les réformes institutionnelles visant à unifier les fonctions de gestion de la dette. Le Fonds attend du Sénégal qu'il passe d'une gestion administrative fragmentée à une approche financière centralisée, barrant ainsi la route au contournement des plafonds d'endettement par le biais des sociétés d'État.</p>

<p>Ce changement de paradigme présente des avantages certains. L'intégration complète du secteur parapublic permet à une entreprise publique de s'adosser à la signature de l'État pour emprunter à des taux plus avantageux sur les marchés. De plus, elle participe à l'assainissement durable des finances et à la restauration d'une transparence budgétaire indispensable pour reconquérir la confiance des bailleurs de fonds extérieurs.</p>

<p>Cependant, cette approche comporte des angles morts majeurs pour un pays en quête de développement souverain. Tout d'abord, l'intégration des entreprises publiques au sein de l'appareil central risque de brider leur souplesse opérationnelle. Privées de la liberté de lever rapidement des fonds ou de sceller des partenariats stratégiques, elles subiront inévitablement les lourdeurs des circuits administratifs, retardant d'autant le financement de projets industriels ou énergétiques urgents. Ensuite, ce mécanisme induit une certaine déresponsabilisation des gestionnaires. Sachant leurs passifs entièrement consolidés et garantis par le ministère des Finances, les directeurs d'entreprises publiques pourraient relâcher leur discipline financière interne. Enfin, cela envoie un signal ambigu aux marchés. En créant une forme de caisse commune, les difficultés financières d'une seule entité publique dégraderont automatiquement les ratios macroéconomiques globaux de l'État, altérant sa note souveraine et renchérissant le coût du crédit pour l'ensemble de l'économie.</p>

<p>Le dogme porté par le FMI consacre ainsi la victoire d'une logique strictement comptable sur une vision de développement et de prise de risque industriel, pourtant indispensable à un pays qui doit investir massivement dans son économie réelle.</p>

<h2>Les nouvelles exigences de Washington</h2>

<p>Les concessions faites par le Sénégal, notamment la création d'une direction unifiée de la dette, conviennent au FMI mais restent insuffisantes pour déclencher une réponse favorable à la demande de Dakar concernant un nouveau programme de financement. L'institution s'est gardée de toute promesse formelle, se contentant de lister de nouvelles conditions préalables, énoncées à Dakar par Mercedes Vera Martin, chef de mission, et réaffirmées à Washington par Julie Kozack, porte-parole du Fonds. Ces exigences complémentaires que sont le lancement d'un audit de la dette par un cabinet international privé et indépendant, l'achèvement d'un audit continu des arriérés de paiement et le durcissement du contrôle des engagements budgétaires.</p>

<p>Officiellement, ces mesures visent à soutenir la consolidation budgétaire, à réduire les vulnérabilités et à promouvoir une croissance inclusive. Officieusement, même si ces cases étaient cochées, le FMI pousse l'État vers une restructuration globale de sa dette dès que les chiffres réels seront certifiés. Dans cette perspective, les gains et les risques s'équilibrent de manière précaire.</p>

<p>D'un côté, un accord de restructuration crédible est la clé pour débloquer la ligne de crédit de 1,8 milliard de dollars actuellement suspendue et rassurer les autres bailleurs. Sa mise en œuvre allégerait la pression financière à court terme par l'allongement des maturités et la baisse des taux, libérant instantanément des liquidités.</p>

<p>D'un autre côté, persister dans le schéma traditionnel consistant à emprunter à court terme et à des taux élevés pour rembourser des dettes antérieures (« soul bouki, souli bouki »), sans investir dans l'appareil productif, conduira inévitablement le mécanisme à saturation. Une restructuration négociée offre une sortie de crise encadrée, mais son prix social et politique s'annonce exorbitant. Elle entraînerait une dégradation immédiate de la note souveraine, renchérissant le coût des futurs emprunts, tout en s'accompagnant de l'exigence absolue du FMI de supprimer définitivement les subventions énergétiques et d'augmenter la pression fiscale. Ce serait un coût bien lourd à porter pour des dirigeants portés au pouvoir sur une promesse de rupture systémique.</p>

<h2>Arbitrage politique entre pragmatisme et souverainisme</h2>

<p>Pour l'heure, les autorités sénégalaises évitent de se prononcer ouvertement sur l'option d'une restructuration. Le ministre de l'Économie, des Finances et du Plan a récemment recadré les déclarations plutôt empressées de son homologue du Commerce. En martelant que le Sénégal n'en est pas là, notre inamovible grand argentier tente de protéger la crédibilité de la signature de l'État et d'éviter un mouvement de panique chez les investisseurs obligataires. Sa ligne demeure orthodoxe qui passe par l'audit sincère des chiffres, l'assainissement financier par l'effort interne et le respect des engagements. L'option privilégiée reste le reprofilage de la dette, à savoir une négociation amiable pour lisser les échéances de court terme avec les créanciers volontaires, préservant ainsi la réputation financière du pays.</p>

<p>Cependant, si le FMI refusait toute alternative à une restructuration formelle, il est fort probable que le président Bassirou Faye et son nouveau Premier ministre, le technocrate Ahmadou Al Aminou Lô, se résoudraient à un compromis réaliste pour desserrer l'étau financier qui asphyxie le pays. Reste l'inconnue majeure de l'équation, Ousmane Sonko. Désormais installé au perchoir de l'Assemblée nationale après son passage à la Primature, il conserve sa posture critique vis-à-vis des remèdes de Bretton Woods, qu'il perçoit comme une aliénation de la souveraineté économique.</p>

<p>Disposant d'une majorité parlementaire, il pourrait être tenté de rejeter un plan de restructuration assorti de mesures d'austérité trop impopulaires. Dans l'optique de l'échéance présidentielle de 2029, une telle posture lui permettrait de préserver son capital politique auprès de sa base électorale en imputant la responsabilité des choix douloureux au seul pouvoir exécutif. Néanmoins, un blocage institutionnel conduisant le Sénégal au défaut de paiement aggraverait la crise et fragiliserait le « Projet » dont il reste porteur. La position la plus probable de l'Assemblée sera celle d'un arbitre exigeant. Elle devra nécessairement concéder les réformes indispensables au nom du réalisme économique, tout en fixant des lignes rouges strictes pour préserver le pouvoir d'achat des populations. Un retour, en somme, au réalisme souverain.</p>

</article>`;

// Catégorie : Dossiers (ID 30010) pour Pape Amadou Fall (ID 60002)
const authorId = 60002;
const categoryId = 30010;

const now = new Date();

await connection.execute(
  `INSERT INTO editorials (title, slug, excerpt, content, authorId, categoryId, isPublished, isFeatured, useAlias, publishedAt, createdAt, updatedAt)
   VALUES (?, ?, ?, ?, ?, ?, 1, 1, 0, ?, ?, ?)`,
  [title, slug, excerpt, content, authorId, categoryId, now, now, now]
);

console.log("✅ Article Sénégal-FMI publié sous la signature de Pape Amadou Fall");
console.log("   Slug:", slug);
console.log("   Catégorie: Dossiers (ID 30010)");
console.log("   Auteur: Pape Amadou Fall (ID 60002)");

await connection.end();
