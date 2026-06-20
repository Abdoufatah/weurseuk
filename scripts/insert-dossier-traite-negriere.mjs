import mysql from "mysql2/promise";

const DATABASE_URL = process.env.DATABASE_URL;
const connection = await mysql.createConnection(DATABASE_URL);

const title = "Traite négrière : le temps de solder les comptes";
const slug = "traite-negriere-le-temps-de-solder-les-comptes";
const excerpt = "L'année 2026 s'annonce comme un tournant décisif. Suite à la résolution du 26 mars des Nations unies déclarant la traite négrière « pire crime contre l'humanité », l'agenda diplomatique est désormais dicté par une urgence de passage à l'acte. Les Africains et la Diaspora noire y croient encore plus fortement, comme ils l'ont réaffirmé lors de la conférence qui a réuni plus de 80 pays à Accra. Avec le soutien déclaré de leaders continentaux, tel le président Bassirou Faye, la mobilisation est résolument pour des mesures concrètes de reconnaissance, de réparation et de préservation de la mémoire des peuples africains.";

const content = `<div class="dossier-content">

<p class="dossier-intro" style="font-size:1.15em; font-weight:500; line-height:1.8; margin-bottom:2rem; border-left:4px solid #c8a000; padding-left:1.5rem;">L'année 2026 s'annonce comme un tournant décisif. Suite à la résolution du 26 mars des Nations unies déclarant la traite négrière « pire crime contre l'humanité », l'agenda diplomatique est désormais dicté par une urgence de passage à l'acte. Les Africains et la Diaspora noire y croient encore plus fortement, comme ils l'ont réaffirmé, lors de la conférence qui a réuni plus de 80 pays, les 17-18 et 19 juin derniers à Accra, pour donner une suite politique et institutionnelle à la résolution onusienne sur la traite transatlantique. Avec le soutien déclaré de leaders continentaux, tel le président Bassirou Faye qui a pris part à la rencontre, la mobilisation est résolument pour des mesures concrètes de reconnaissance, de réparation et de préservation de la mémoire des peuples africains.</p>

<h2 style="color:#c8a000; margin-top:2.5rem;">I. Genèse d'un crime sans précédent</h2>

<p>La traite négrière avait été amorcée au début du XVI<sup>e</sup> siècle (vers 1502-1510), peu après l'arrivée des Européens en Amérique, pour satisfaire le besoin de main-d'œuvre dans l'exploitation des mines d'or et surtout des plantations de coton et de canne à sucre, dans le Nouveau Monde, en substitution à celle amérindienne, littéralement décimée par les guerres et les maladies importées par les conquistadores et les colons. En plus d'être jugés plus robustes et habitués au climat tropical, les Noirs arrachés à l'Afrique mère ont été substitués aux Amérindiens parce que, à la différence de ces natifs, ils n'auraient « pas d'âme » et pouvaient donc être traités comme des bêtes de somme, selon les conclusions de la tristement célèbre « Controverse de Valladolid » (1550-1551).</p>

<p>Ainsi, pendant quatre siècles, jusqu'à son abolition définitive à la fin du XIX<sup>e</sup> siècle, la traite aura ravi à l'Afrique, au bas mot, 15 millions de jeunes au sommet de leur force productive, avec d'incommensurables pertes en vies humaines durant la traversée de l'océan, ces déchirants « voyages sans retour ». Elle a provoqué un dépeuplement massif, une instabilité politique chronique (guerres entre royaumes pour fournir des captifs) et a freiné le développement économique pendant des siècles et des siècles, jusqu'à ce jour.</p>

<h2 style="color:#c8a000; margin-top:2.5rem;">II. L'ampleur économique de la spoliation</h2>

<p>Des chercheurs ont estimé que si l'Afrique avait suivi une trajectoire de croissance démographique et économique normale, son PIB global pourrait être aujourd'hui plusieurs fois supérieur à ce qu'il est présentement. Certains modèles estiment que l'Afrique a perdu l'équivalent de plusieurs dizaines de milliers de milliards de dollars de richesse cumulée sur 400 ans. Les chiffres avancés prennent en compte le revenu du travail non rémunéré, les intérêts composés sur des siècles et les traumatismes sociaux relevant des conséquences de la traite atlantique.</p>

<p>En Europe et aux Amériques, la traite et l'esclavage ont inversement permis la création et l'accumulation de richesses incommensurables, pour avoir été parmi les piliers majeurs sur lesquels a reposé le développement économique et social de ces continents. Alors que la traite des Noirs a ainsi coûté cette fortune colossale à l'Afrique, le profit net qui en est issu pour l'Europe et l'Amérique anglo-saxonne a été estimé à environ 10 % de leur PIB à l'époque de la révolution industrielle.</p>

<p>L'Afrique a, par contre, été contrainte de sortir de l'histoire du progrès technique mondial, au moment où celui-ci s'accélérait dans un Occident esclavagiste, impérial, impérialiste et industriel.</p>

<h2 style="color:#c8a000; margin-top:2.5rem;">III. L'imprescriptibilité du crime et le droit à réparation</h2>

<p>Les préjudices humains, moraux, financiers et économiques induits par le système de la traite et de l'esclavage doivent être réparés aujourd'hui plus que jamais, d'autant qu'il n'y a pas prescription dès lors que le mal fait est reconnu comme un « crime contre l'humanité », le pire. En droit international, un crime contre l'humanité ne « périme » jamais. La résolution des Nations unies qui l'atteste fait s'effondrer l'argument de la « légalité de l'époque » et transforme une question morale en une question de droit. Elle légitime l'inlassable combat des descendants d'esclaves d'Amérique et des Caraïbes, tout comme celui des États africains, pour obtenir non plus seulement la reconnaissance de ce crime, mais encore que les fautifs rendent gorge, d'une manière ou d'une autre.</p>

<h2 style="color:#c8a000; margin-top:2.5rem;">IV. Qui devra payer ?</h2>

<p>Ce sont d'abord les <strong>États occidentaux</strong> qui ont avalisé et codifié par des lois (comme le Code noir en France) un système d'exploitation criminel, exceptionnel par son degré d'inhumanité, sa durée et ses conséquences destructrices sur le long terme.</p>

<p>Ce sont ensuite les <strong>grandes banques et assurances</strong> d'aujourd'hui (JP Morgan Chase, Citibank, Barclays, Lloyd's of London, etc.), sur les institutions ancestrales desquelles reposaient le financement et l'assurance des « cargaisons humaines », qui pouvaient même devenir leur propriété en cas de défaut de paiement.</p>

<p>Ensuite, de <strong>grandes entreprises</strong> qui ont prospéré en ayant leurs fondations bâties sur des plantations de sucre, de coton ou de tabac valorisées grâce à l'esclavage.</p>

<p>Ce sont également les <strong>institutions religieuses</strong> anglicanes et catholiques, qui ont massivement investi dans le transport des esclaves ou utilisé de la main-d'œuvre servile dans certaines propriétés ecclésiastiques aux Amériques.</p>

<p>Il ne faut pas oublier les <strong>universités prestigieuses</strong> comme Harvard, Yale, Brown et Georgetown. Cette dernière a découvert qu'en 1838, elle avait vendu 272 esclaves pour éponger ses dettes et éviter la faillite.</p>

<h2 style="color:#c8a000; margin-top:2.5rem;">V. Les mécanismes de réparation</h2>

<p>La traite négrière et son corollaire, l'esclavage, étant des crimes imprescriptibles, même des siècles après leur pratique et leur abolition, des plaintes peuvent être déposées contre toutes les entités (États, entreprises, banques, assurances, universités) qui ont profité du système. Des économistes estiment que la « spoliation continue » dont ils sont coupables, et qui court depuis 400 ans, est une des principales causes du sous-développement et qu'elle doit, par conséquent, être compensée par des intérêts cumulés.</p>

<p>L'ONU pourrait utiliser sa résolution pour pousser à la création d'un fonds de développement massif, financé par les anciennes puissances coloniales et leurs entreprises historiquement impliquées, non pas comme de « l'aide au développement », mais comme le remboursement d'une dette. Les réparations visent à offrir à l'Afrique les investissements structurels (écoles, hôpitaux, infrastructures) dont elle a été privée par l'extraction de ses forces vives.</p>

<h2 style="color:#c8a000; margin-top:2.5rem;">VI. Le précédent de la Shoah : un modèle juridique applicable</h2>

<p>La Shoah a fait quelque 6 millions de victimes sous l'entreprise génocidaire nazie. Sur les 15 millions d'Africains déracinés par les négriers, plus de deux millions ont péri en mer à cause des conditions inhumaines, des maladies et des révoltes, et 3,5 millions de nouveaux arrivants mouraient du travail forcé dans les trois premières années ; tandis que le calvaire des survivants s'est prolongé pendant quatre siècles.</p>

<p>En qualifiant la traite négrière de « pire crime contre l'humanité », la résolution des Nations unies n'ouvre pas une compétition entre elle et la Shoah aux fins de détrôner cette dernière, même si les statistiques parlent d'elles-mêmes. L'intention est plutôt de corriger ce que de nombreux États et nations considèrent comme une anomalie, un oubli historique et juridique.</p>

<p>À cet égard, le parallèle ainsi établi est d'autant plus intéressant et opportun que le processus de réparation accepté par l'Allemagne, en rapport avec la Shoah, constitue un modèle juridique pour le cas de la traite. La résolution de l'ONU vient simplement dire que la traite négrière, par sa durée et son impact sur la structure actuelle du monde, doit être traitée avec la même gravité juridique et financière, afin d'obtenir les compensations dont les descendants d'esclaves et les pays africains ont été privés jusqu'ici.</p>

<p>Il va de soi que l'argent ne peut pas compenser la perte de vies humaines et l'humiliation, mais qu'il est indispensable pour aider les survivants et les États à se reconstruire. Les experts de l'ONU soutiennent que si l'Allemagne a pu payer des réparations à un État (Israël) qui n'existait pas au moment du crime, alors les puissances coloniales peuvent payer des réparations à des États africains ou caribéens nés après la traite, ainsi qu'aux descendants d'esclaves et à ceux qui ont souffert de ce crime sur le sol africain.</p>

<h2 style="color:#c8a000; margin-top:2.5rem;">VII. Le précédent namibien : la brèche est ouverte</h2>

<p>En 2021, l'Allemagne a franchi un pas déterminant en reconnaissant le génocide des Herero et des Nama (1904-1908) en Namibie. Elle a promis 1,1 milliard d'euros sur 30 ans sous forme d'aide au développement ciblée. C'est la première fois qu'une puissance coloniale applique le « modèle de la Shoah » à un crime commis en Afrique durant la période coloniale. Le modèle allemand prouve que la réparation financière d'un crime contre l'humanité est techniquement et politiquement possible. Il ouvre une brèche juridique dans laquelle devront désormais s'engouffrer tous les pays victimes de la traite, avec la force nouvelle que leur confère la résolution des Nations unies.</p>

<h2 style="color:#c8a000; margin-top:2.5rem;">VIII. L'horizon de septembre 2026</h2>

<p>Nous, Africains du continent et de la Diaspora, sommes en droit d'espérer que la 82<sup>e</sup> Assemblée générale des Nations unies de septembre prochain soit, dans la dynamique actuelle, une étape diplomatique importante dans la démarche collective africaine et caribéenne pour la transformation des avancées normatives obtenues ces dernières années en mécanismes concrets de reconnaissance et de réparation. Que sa résolution historique soit transformée en un accord qui fera que le « temps des excuses » cède enfin la place au « temps des comptes ». La question n'est plus de savoir si le crime a eu lieu, mais comment redistribuer la richesse produite par ce crime afin de stabiliser le XXI<sup>e</sup> siècle pour les descendants des victimes.</p>

<h2 style="color:#c8a000; margin-top:2.5rem;">IX. Les résistances occidentales</h2>

<p>Mais soyons réalistes. Aucune résolution ou accord des Nations unies n'est une loi contraignante à l'échelle mondiale. Il n'existe pas de tribunal international pour juger les crimes du passé lointain. De nombreuses puissances craignent l'ouverture d'une « boîte de Pandore » financière et préfèrent parler de « coopération » plutôt que de « réparation ». Les États-Unis, le Royaume-Uni, l'Allemagne, l'Italie, les Pays-Bas, notamment, ont ainsi voté contre la résolution onusienne de mars dernier, ou se sont abstenus, en vérité pour protéger leurs budgets nationaux.</p>

<p>Ce vote montre que les pays occidentaux les plus influents et qui se disent garants de l'universalité des droits de l'homme, rechignent à juger les crimes dont ils sont eux-mêmes coupables ou, à tout le moins, pratiquent le deux poids, deux mesures entre la Shoah et l'esclavage. Avec cette hiérarchisation de la valeur des vies humaines selon les origines, la réconciliation avec eux sera impossible tant que le « prix » de la vérité sera jugé trop élevé par ceux qui doivent le payer.</p>

<hr style="margin:3rem 0; border-color:#c8a000; opacity:0.3;" />

<p style="font-style:italic; color:#888; text-align:center;">© 2026 — Weurseuk. Dossier rédigé par Abdou Fatah FALL, chercheur en sciences religieuses, sociétés et dynamiques transnationales, journaliste analyste spécialisé sur le Sénégal et l'Afrique de l'Ouest.</p>

</div>`;

const categoryId = 30010; // Dossiers
const authorId = 30001; // Abdou Fatah FALL
const type = "dossier";

// Dé-featurer les anciens articles
await connection.execute(`UPDATE editorials SET isFeatured = 0 WHERE isFeatured = 1`);

// Insérer le dossier
const [result] = await connection.execute(
  `INSERT INTO editorials (id, title, slug, excerpt, content, type, categoryId, authorId, isPublished, isFeatured, publishedAt, createdAt, updatedAt)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 1, NOW(), NOW(), NOW())`,
  [1860010, title, slug, excerpt, content, type, categoryId, authorId]
);

console.log("✅ Dossier inséré avec succès, ID:", 1860010);
console.log("   Titre:", title);
console.log("   Rubrique: Dossiers (ID 30010)");
console.log("   Auteur: Abdou Fatah FALL (ID 30001)");
console.log("   Type: dossier");
console.log("   Featured: oui (À la Une)");

await connection.end();
