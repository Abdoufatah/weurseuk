import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;
const url = new URL(DATABASE_URL);

const connection = await mysql.createConnection({
  host: url.hostname,
  port: parseInt(url.port) || 3306,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  ssl: { rejectUnauthorized: false }
});

const title = "Le nombre et l'âme — Pastef face à l'épreuve de ses propres principes";
const slug = "le-nombre-et-lame-pastef-face-epreuve-principes";
const excerpt = "Le 22 juin 2026, le groupe parlementaire Pastef déposait à l'Assemblée nationale la proposition de loi n°17/2026 portant révision de vingt-neuf articles de la Constitution. En moins de quarante-huit heures, la Conférence des présidents validait une procédure d'examen accélérée. Il ne s'agissait pas d'une urgence nationale. Il s'agissait d'une urgence politique. Ce détail change tout.";

const content = `<article class="editorial-content">

<h2>I. 130 sièges, combien de Sénégalais ?</h2>

<p>Le résultat des législatives de novembre 2024 a quelque chose de vertigineux. Pastef remporte 130 des 165 sièges de l'Assemblée nationale — soit les trois quarts du Parlement — avec 54,97 % des suffrages exprimés. La victoire est incontestable. Le mandat, réel. Mais à y regarder de plus près, une arithmétique moins confortable se dessine : l'ensemble des formations d'opposition a réuni, ce même jour, environ 1,6 million de voix, contre un peu moins de deux millions pour Pastef. L'écart, en termes de citoyens réels, est d'environ 330 000 voix. Soit, en proportion d'un pays de dix-sept millions d'habitants, une marge bien plus étroite que les sièges ne le suggèrent.</p>

<p>Ce n'est pas une curiosité statistique. C'est le révélateur d'un biais structurel inhérent au scrutin majoritaire : le système amplifie les victoires, il ne les légitime pas à proportion. La démocratie formelle — celle qui se résume à compter les sièges et à en tirer toutes les conséquences — n'épuise pas la démocratie substantielle, celle qui oblige le vainqueur à gouverner pour l'ensemble du corps civique, y compris pour ceux qui ont voté autrement. Rousseau, que les héritiers de toutes les révolutions citent volontiers, l'avait formulé avec une netteté inconfortable : la volonté générale n'est pas la somme des volontés particulières. Elle est ce que le peuple veut pour lui-même en tant que peuple — non ce qu'une majorité impose à une minorité au nom du nombre.</p>

<p>Or c'est précisément ce que la procédure accélérée de juin 2026 révèle : une confiance absolue dans le nombre, et une indifférence relative à ce que ce nombre signifie. Réviser vingt-neuf articles d'une Constitution — le texte fondamental qui organise le vivre-ensemble — sans consultation préalable des forces minoritaires, sans dialogue inclusif avec la société civile ni avec l'opposition, c'est traiter le Parlement comme une simple chambre d'enregistrement d'une volonté déjà décidée ailleurs. Le Garde des sceaux lui-même, au nom du gouvernement, a été contraint de le rappeler : aucune révision constitutionnelle majeure n'a jamais été engagée au Sénégal, depuis 1992, sans concertation préalable avec l'ensemble des acteurs politiques. Cette tradition n'est pas une formalité. Elle est le ciment de la stabilité institutionnelle sénégalaise — une stabilité que le pays a su préserver, avec un orgueil légitime, là où tant d'autres ont flanché.</p>

<h2>II. Quarante jours qui trahissent une intention</h2>

<p>Une réforme se juge autant à son contenu qu'à son calendrier. Et le calendrier, ici, parle avant le texte. Le 22 mai 2026, Ousmane Sonko est limogé de la Primature par le président Bassirou Diomaye Faye. Le 26 mai — quatre jours plus tard — il est élu président de l'Assemblée nationale, fort de la majorité parlementaire que Pastef contrôle. Le 19 juin, la proposition de loi constitutionnelle est transmise à la présidence de la République pour avis. Le 22 juin, elle est déposée en séance plénière. Le 29 juin, le vote est prévu.</p>

<p>Quarante jours. De la Primature au contrôle d'une réforme qui renforce précisément les prérogatives de l'Assemblée nationale et du Premier ministre — au détriment du président de la République. La coïncidence est trop parfaite pour être fortuite. Ce que la chronologie révèle, ce n'est pas une vision institutionnelle mûrie de longue date : c'est un repositionnement tactique d'une rapidité remarquable. L'homme qui a quitté l'exécutif par la porte de derrière revient par celle du législatif, avec dans les mains un texte qui redistribue les cartes à son avantage. On peut appeler cela de la résilience politique. On peut aussi l'appeler ce que c'est.</p>

<p>L'analyse du contenu confirme cette lecture. Parmi les innovations majeures du texte : le renforcement des pouvoirs du Premier ministre, l'élargissement des prérogatives des commissions d'enquête parlementaires, la création d'une Cour constitutionnelle dont trois membres seraient désignés sur proposition du président de l'Assemblée nationale. Chacune de ces dispositions, prise isolément, peut se défendre sur le plan des principes. L'ensemble, dans ce contexte précis, dessine le portrait d'une réforme sur mesure — cousue pour l'instant, pour l'homme, pour la position qu'il occupe désormais.</p>

<h2>III. Ils l'ont dit, ils l'ont écrit</h2>

<p>La mémoire est le premier outil du journaliste. Et la mémoire sénégalaise est longue, heureusement. Pendant les années Macky Sall, Pastef a fait de la résistance aux abus de majorité parlementaire l'un de ses axes de combat les plus constants. Ousmane Sonko, ses lieutenants, ses militants ont vitupéré — avec raison — contre des lois votées à la hussarde, des réformes imposées sans dialogue, une mécanique du nombre mise au service d'un agenda présidentiel que l'opposition jugeait illégitime dans ses méthodes. Ces positions ne sont pas des rumeurs. Elles sont consignées, archivées, accessibles.</p>

<p>Il existe une catégorie politique que l'on pourrait nommer, avec une pointe d'ironie : le confort de l'opposition. C'est ce moment où la pureté des principes est sans coût, où l'exigence éthique ne s'applique qu'à l'adversaire, où l'on peut réclamer ce que l'on n'aurait jamais à pratiquer. Pastef a longtemps occupé ce territoire avec une éloquence certaine. La question qui se pose aujourd'hui n'est pas rhétorique : qu'est-ce qui distingue, dans la méthode, la majorité Pastef de juin 2026 de la majorité APR qu'elle a combattue pendant des années ? Si la réponse est uniquement « nos intentions sont meilleures », alors nous ne sommes plus dans le domaine de la démocratie institutionnelle, mais dans celui de la foi — et la foi, comme chacun sait, ne se décrète pas.</p>

<p>L'éthique en politique n'est pas un ornement du discours. Elle est une contrainte opérationnelle. Elle oblige à vouloir pour l'adversaire ce qu'on réclame pour soi-même. Elle interdit la règle du double standard. Et c'est précisément ce standard double que cette réforme, dans ses conditions d'élaboration, expose au grand jour.</p>

<h2>IV. Et si demain le vent tourne ?</h2>

<p>Il existe un test simple pour évaluer la sincérité d'une réforme institutionnelle : est-elle voulue même par ceux qui en seraient les premiers perdants si la conjoncture se retournait ? Les juristes appellent cela le critère de généralité. Les philosophes du droit, depuis Kant, parlent d'universalisabilité. La question n'est pas abstraite : elle est, dans le cas sénégalais, d'une brûlante actualité.</p>

<p>Si demain Ousmane Sonko accède à la présidence de la République — scénario que ses partisans appellent de leurs vœux pour 2029 — et que Pastef perd la majorité à l'Assemblée nationale, les dispositions aujourd'hui défendues avec ardeur joueront mécaniquement contre lui. Un Premier ministre aux pouvoirs renforcés issu d'un autre camp. Une Assemblée avec des prérogatives élargies contrôlée par l'opposition. Une Cour constitutionnelle partiellement composée sur proposition d'un président de l'Assemblée adverse. Les architectes de la réforme actuelle accepteront-ils ce jeu symétrique ? L'histoire politique africaine, dont on ferait mal de sous-estimer les leçons, invite à un scepticisme prudent.</p>

<p>Car c'est là la marque des réformes de circonstance : elles sont conçues pour gagner, pas pour durer. Elles habillent un rapport de forces momentané en architecture institutionnelle permanente. Et lorsque le rapport de forces se retourne, elles deviennent soit des obstacles à contourner, soit des textes à réviser à nouveau — au gré d'une nouvelle majorité, avec une nouvelle urgence, un nouveau calendrier accéléré. Ce cycle n'est pas une fatalité africaine : c'est une pathologie universelle des démocraties immatures, dont le remède réside précisément dans l'exigence de généralité que Pastef semble aujourd'hui disposé à sacrifier sur l'autel de l'opportunité.</p>

<h2>V. La modernisation comme règlement de comptes</h2>

<p>Il serait intellectuellement malhonnête de nier la légitimité de fond de certaines réformes proposées. La transformation du Conseil constitutionnel en Cour constitutionnelle, l'incompatibilité entre la fonction présidentielle et la direction d'un parti politique, le renforcement du contrôle parlementaire sur les conventions d'investissement liées aux ressources naturelles — ces mesures s'inscrivent dans une tradition réformiste sénégalaise qui remonte aux Assises nationales de 2009, aux travaux de la Commission nationale de réforme des institutions de 2013. Elles ne sont pas sorties de nulle part.</p>

<p>Mais la légitimité du contenu ne suffit pas à valider la méthode. Et c'est ici que l'analyste, même bienveillant, bute sur un os. Lorsque des réformes institutionnelles longtemps recommandées sont subitement exhumées et forcées en quarante jours — précisément au lendemain d'une rupture interne au sein du pouvoir, précisément lorsqu'elles renforcent les positions de celui qui les initie — la coïncidence cesse d'être une coïncidence. Elle devient un aveu. Non pas un aveu de mauvaise volonté nécessairement, mais un aveu d'opportunisme : celui qui consiste à habiller une stratégie de pouvoir en projet de refondation républicaine.</p>

<p>Les juristes parlent de <em>loi de circonstance</em> pour désigner ces textes taillés pour un moment, un homme, une position. L'histoire parlementaire sénégalaise en a connu. Le Sénégal mérite mieux que d'en produire une nouvelle, fût-elle portée par ceux qui ont fait de la rupture avec les vieilles pratiques le cœur de leur identité politique.</p>

<h2>VI. On ne bâtit pas une République avec sa colère</h2>

<p>Il serait commode de conclure sur une formule définitive. Mais la réalité politique sénégalaise, dans ce qu'elle a de plus stimulant, résiste aux clôtures. Ce qui est en jeu ici dépasse la querelle entre Diomaye et Sonko, dépasse même l'avenir de Pastef. Ce qui est en jeu, c'est la conception que le Sénégal se fait de ses propres institutions — et de la manière dont on les fait évoluer.</p>

<p>La démocratie ne se résume pas à celui qui gagne d'une voix et prend tout. Elle est, dans sa version la plus exigeante, l'art de gouverner en tenant compte de ceux qu'on a battus — non par générosité, mais par intelligence politique : parce que les vaincus d'aujourd'hui sont les électeurs de demain, parce que les institutions perdurent au-delà des majorités, parce qu'une Constitution qui ne vaut que pour ceux qui la rédigent n'est pas une Constitution, c'est un rapport de forces habillé en droit.</p>

<p>Le Sénégal a construit, au fil des décennies et des alternances, une tradition institutionnelle que peu de pays de la région peuvent se targuer d'égaler. Cette tradition repose sur un principe simple : on ne change pas les règles du jeu sans consulter tous les joueurs. Pastef, dans l'opposition, l'a exigé avec véhémence. Pastef au pouvoir se doit de l'honorer — non par obligation formelle, mais parce que c'est cela, précisément, qu'une rupture signifie : ne pas reproduire ce qu'on a combattu.</p>

<p>La colère légitime qui a porté ce mouvement au pouvoir en 2024 est une énergie politique réelle. Mais les meilleures réformes ne naissent pas de la colère. Elles naissent de la vision — de la capacité à imaginer des règles que l'on voudrait encore, même si demain le vent tourne.</p>

<hr/>
<p class="sources"><em>Sources : Agence Ecofin, Senenews, Pulse.sn, APS, Afrik-Inform, Wikipedia (élections législatives 2024). Proposition de loi n°17/2026, Assemblée nationale du Sénégal.</em></p>

</article>`;

// Catégorie Éditoriaux = ID 30009, Auteur Bensirac = ID 30001
const [catResult] = await connection.execute("SELECT id FROM categories WHERE slug = 'editoriaux'");
const categoryId = catResult[0]?.id || 30009;

const now = new Date();

await connection.execute(
  `INSERT INTO editorials (title, slug, excerpt, content, authorId, categoryId, isFeatured, isPublished, useAlias, publishedAt, createdAt, updatedAt)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    title,
    slug,
    excerpt,
    content,
    30001, // Bensirac (Abdou Fatah Fall)
    categoryId,
    1, // isFeatured - en Une
    1, // isPublished
    1, // useAlias = true → affiche "Bensirac"
    now,
    now,
    now
  ]
);

console.log("✅ Éditorial 'Le nombre et l'âme' publié sous la signature Bensirac");
console.log(`   Slug: ${slug}`);
console.log(`   Catégorie: Éditoriaux (ID ${categoryId})`);
console.log(`   Auteur: Bensirac (useAlias=1)`);

await connection.end();
