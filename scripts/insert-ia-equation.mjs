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

const title = "L'IA, une pompe à ressources pour les magnats du numérique";
const slug = "ia-pompe-ressources-magnats-numerique-equation-africaine";
const excerpt = "Ce que l'on appelle « Intelligence artificielle » n'est pas une intelligence autonome comparable à celle de l'Homme, mais une extension technologique de l'intelligence humaine. Les magnats du numérique spolient l'humanité en alimentant leurs systèmes avec les créations intellectuelles de presque toute l'humanité, sans autorisation ni compensation. L'Afrique doit revendiquer sa place comme acteur et copropriétaire, non comme simple réservoir de données.";

const content = `<article class="editorial-content">

<p>Une intelligence peut-elle être réellement artificielle ? Pas tout à fait. Ce que l'on appelle communément « Intelligence artificielle » est une technologie créée par l'Homme, sur la durée, devenue aujourd'hui si performante que les constructions algorithmiques qui lui servent de cerveau sont capables de mémoriser, analyser, organiser, synthétiser et combiner d'immenses quantités d'informations à une volume et une vitesse inaccessibles à l'être humain. Elle contribue à de nouvelles découvertes en révélant des relations ou des solutions que les chercheurs n'avaient pas encore identifiées.</p>

<p>Cependant, contrairement à une vraie intelligence, celle-là humaine, elle ne possède ni conscience, ni émotions, ni expérience personnelle, ni compréhension intrinsèque du sens de ce qu'elle traite. En ce sens, l'intelligence artificielle n'est pas une intelligence autonome comparable à celle de l'Homme, mais plutôt une extension technologique de l'intelligence humaine, destinée à amplifier la production, la circulation et l'exploitation des connaissances créées par l'Homme lui-même. Elle n'existe et n'est productive ou générative qu'en se fondant sur notre intelligence collective, en absorbant et digérant nos livres, nos idées, nos œuvres d'art, les contenus de nos journaux et blogs, nos produits audiovisuels, nos photos et nos conversations et autres publications, à travers des générations. Jusqu'à se les approprier, totalement ou partiellement, comme l'on peut s'en rendre compte, à chaque vérification.</p>

<h2>La spoliation systémique</h2>

<p>En réalité, l'Intelligence artificielle étant sans état d'âme ni conscience, ce sont plutôt les magnats du numérique qui nous spolient en alimentant et entraînant leurs systèmes artificiels d'exploitation avec les créations intellectuelles, scientifiques ou artistiques de presque toute l'humanité, sans autorisation, ni reconnaissance et, le plus souvent, sans compensation. Et c'est là où le bât blesse le plus, par le fait inique que les profits astronomiques, qui se comptent annuellement en milliers de milliards de dollars, tombent dans l'escarcelle d'une poignée de barons du numérique, alors que la matière première traitée est universelle.</p>

<p>Bernie Sanders, depuis des décennies figure la plus emblématique de la gauche américaine, a récemment dénoncé cette forfaiture qui consiste pour les oligarques de la Big Tech (OpenAI, Microsoft, Google, Meta et autres) à transformer des œuvres propres à l'humain en des produits technologiques qu'ils présentent comme des « créations » neuves de leur IA. Mettant leurs données d'entraînement sous le couvert du secret industriel, ils vendent leurs résultats à prix d'or sans avoir à partager les gains réalisés avec les auteurs de base dont ils s'approprient la valeur économique du travail.</p>

<h2>« Quand c'est gratuit, c'est vous qu'on vend »</h2>

<p>L'on ne perçoit pas encore bien cette dépossession des peuples de leurs richesses intellectuelles et artistiques et leur concentration entre les mains d'une oligarchie technologique. Les internautes de tous les pays utilisent sans réserve les outils basés sur l'IA d'autant plus qu'ils sont fort utiles et surtout d'accès libre. Mais il doit être clair pour tous que, sur la Toile, « quand c'est gratuit, c'est vous qu'on vend » ou « si vous ne payez pas le produit, c'est que vous êtes le produit » et encore « les données personnelles sont la monnaie des services gratuits ».</p>

<p>Les géants du numérique nous le disent d'ailleurs plus subtilement en nous rappelant que toute donnée privée collectée l'est dans des « conditions d'utilisation acceptée », et qu'il y a compensation par le biais de services gratuits à travers l'utilisation de leurs réseaux sociaux et des outils IA eux-mêmes. Mais la plupart des internautes dont les données sont grugées donnent leur consentement, sans véritablement savoir à quoi leur « clic d'accord » les engage ou expose véritablement. Et l'usage libre des réseaux sociaux et outils IA que l'on présente comme une « compensation individuelle » est plutôt un appât pour les ferrer encore plus.</p>

<h2>La riposte judiciaire et politique</h2>

<p>Une conscience est en train de se faire jour, en Occident pour l'instant. Les tribunaux américains et européens sont actuellement submergés de procès menés par des auteurs, des artistes pour vider l'abcès de la spoliation dont ils sont victimes. Mais est-ce que les mécanismes traditionnels de la justice et du marché auxquels ils se réfèrent suffiront à protéger les travailleurs intellectuels et créatifs des géants technologiques quasi monopolistiques ? Ne faudrait-il pas instaurer une taxe universelle, comme le préconise Bernie Sanders ?</p>

<p>Son idée audacieuse et pour le moins révolutionnaire va pour un impôt de 50% sur le produit des actions relatives à l'IA. Pour lui, puisque la matière première est un bien commun, les infrastructures qui la traitent doivent être, au moins pour moitié, sous contrôle public. C'est comme pour dire que la valeur ajoutée technologique de l'investissement consenti par les firmes équivaut à celle des données publiques tout-venant qu'elles utilisent massivement. En somme, il voudrait que le public devienne copropriétaire des entreprises d'IA. C'est une vision politique qui cherche à régler le problème à la racine, mais que la réalité économique rend difficile à appliquer. Sanders n'en démord pas moins, comptant aller jusqu'au bout de son idée, avec un projet de loi (<em>American AI Sovereign Wealth Fund Act</em>) qui, au nom de l'intérêt public, accorderait à l'État, américain il va sans dire, une représentation égale à celle des géants de l'IA dans leurs conseils d'administration.</p>

<h2>Les alternatives en débat</h2>

<p>D'autres approches, comme l'obligation de négocier des licences payantes avec les créateurs et producteurs de données ou l'instauration de redevances universelles, sont en ce moment perçues comme des alternatives plus réalistes que la création d'un fonds souverain étatique ou autre, alimenté par des saisies d'actions. Pour l'instant, la tendance forte du marché est la signature de contrats de licence payants entre les éditeurs d'IA et les grands détenteurs de contenus (médias, éditeurs et plateformes). Cette solution n'est évidemment pas la meilleure. Elle s'appliquerait à l'exclusion des pays qui ne pèsent pas lourd sur l'échiquier planétaire et des collectivités de gens ordinaires, alors que l'exigence nouvelle est leur adéquate prise en compte.</p>

<p>C'est, en effet, avec leurs données, que les producteurs et éditeurs d'intelligence artificielle entraînent et développent à foison des modèles économiques qui leur procurent des revenus se chiffrant en milliers de milliards de dollars. Mais on les voit mal lâcher un morceau si dodu, en tout cas pas dans la mesure préconisée par Bernie Sanders. À leur décharge, leurs coûts matériels et technologiques d'existence et de production sont aussi astronomiques que leurs revenus.</p>

<h2>La bulle IA : fiction spéculative et risques systémiques</h2>

<p>Cependant, tout ce qui fait briller les IA n'est pas de l'or, de la valeur réelle. Une immense part de la richesse des « oligarques de la Tech » ne provient pas de leurs ventes réelles. Elle est bâtie sur une fiction, de vertigineuses anticipations spéculatives sur les gains que leurs algorithmes entraînés sur les données publiques promettent de rapporter, plus tard. Cette déconnexion entre la valeur boursière et les revenus réels comporte des risques majeurs. Le niveau de rentabilité requis pour justifier les valorisations boursières actuelles est, en effet, si élevé que la moindre déception dans les chiffres de croissance déclenche des corrections boursières sévères.</p>

<p>Après l'éclatement en 2000 de la bulle informatique provoquant l'effondrement de nombreuses sociétés, allons-nous vers celle de la bulle IA ? Fort possible. Mais si l'histoire de l'Internet balbutie, il pourrait certes y avoir un krach pour certaines valeurs, mais pas la disparition de l'IA. Après la bulle, cette technologie continuera probablement de transformer l'économie mondiale, comme Internet l'a fait après 2000.</p>

<h2>L'équation africaine</h2>

<p>La vraie interrogation est et demeure de s'accorder sur comment la richesse créée avec les données produites par des milliards d'êtres humains pourrait être plus équitablement redistribuée et partagée. Ce débat pourrait devenir central dans les prochaines années, notamment pour les pays du Sud, dont les données et les ressources humaines alimentent également l'économie numérique mondiale.</p>

<p>Les pays africains ont certes beaucoup à gagner des progrès de l'IA dans l'éducation, la santé, l'agriculture, le commerce, l'industrie, ou l'administration. Mais, comme avec leurs ressources naturelles, ils se trouvent dans une situation où la richesse créée à partir de leurs connaissances, de leurs langues et de leurs données humaines est exploitée par quelques grandes entreprises pour enrichir des systèmes étrangers sans retour économique significatif, sauf en termes de consommation.</p>

<p>Nous Africains sommes en droit de revendiquer la reconnaissance de la valeur économique des données et des contenus produits sur le continent, la protection de ce patrimoine, mais également son équitable rémunération lorsqu'il est exploité. De même qu'une juste participation à la valeur créée à partir de ces ressources informationnelles, culturelles et intellectuelles. Le défi est donc de faire en sorte que l'Afrique y participe comme acteur, copropriétaire, bénéficiaire et producteur de technologies, et non plus seulement comme simple réservoir et fournisseur de données. Un combat qui ne sera pas de tout repos, comme d'ailleurs toutes les batailles d'affirmation souveraine.</p>

</article>`;

// Catégorie : Dossiers (ID 30010) pour Amadou Fall = Pape Amadou Fall (ID 60002)
const authorId = 60002;
const categoryId = 30010;

const now = new Date();

await connection.execute(
  `INSERT INTO editorials (title, slug, excerpt, content, authorId, categoryId, isPublished, isFeatured, useAlias, publishedAt, createdAt, updatedAt)
   VALUES (?, ?, ?, ?, ?, ?, 1, 1, 0, ?, ?, ?)`,
  [title, slug, excerpt, content, authorId, categoryId, now, now, now]
);

console.log("✅ Article IA publié sous la signature de Pape Amadou Fall");
console.log("   Slug:", slug);
console.log("   Catégorie: Dossiers (ID 30010)");
console.log("   Auteur: Pape Amadou Fall (ID 60002)");

await connection.end();
