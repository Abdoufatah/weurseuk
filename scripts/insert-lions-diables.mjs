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

const title = "Deux buts, puis la chute aux enfers — Lions vs Diables Rouges";
const slug = "lions-diables-rouges-coupe-monde-lecon-nation";
const excerpt = "Il est des défaites, comme celle du Sénégal contre la Belgique en 16ème de finale de la Coupe du monde, qui mettent tout un peuple face à son propre miroir. Mener par deux buts à zéro jusqu'aux toutes dernières minutes, puis chuter aux enfers, relève moins de l'accident que de la tragédie. C'est une parabole qui interpelle la Nation sur sa capacité à consolider ses victoires.";

const content = `<article class="editorial-content">

<p>Il est des défaites, comme celle du Sénégal contre la Belgique en 16ème de finale de la Coupe du monde, qui mettent tout un peuple face à son propre miroir. Mener par deux buts à zéro jusqu'aux toutes dernières minutes d'un match décisif, puis chuter aux enfers, relève moins de l'accident que de la tragédie. C'est certes une catastrophe sportive, mais plus encore une parabole qui interpelle la Nation.</p>

<h2>Quatre-vingt-cinq minutes de maîtrise</h2>

<p>Pendant quelque quatre-vingt-cinq minutes, les « Lions de la Téranga » ont administré, à qui voulait, une magistrale leçon de football, mêlant intelligence tactique, discipline collective, courage physique et efficacité offensive. Les « Diables rouges », pourtant réputés pour leur maîtrise des grands rendez-vous, semblaient résignés. Les « Lions » les avaient apparemment domptés. Les huitièmes de finale leur paraissaient définitivement ouverts ; mais les « Diables rouges » étaient toujours aux abois, plus incisifs que jamais.</p>

<h2>Les cinq dernières minutes : le basculement</h2>

<p>Puis vinrent les cinq dernières minutes, un très court laps de temps qui a suffi pour faire basculer le destin d'un match et rappeler une profonde faiblesse. Le péché qui a fait chuter les « Lions » n'est pas un déficit de talent, car Sadio Mané et sa bande de professionnels aguerris en ont à revendre. Ils ont plutôt souffert d'un déficit de culture de maintien des prémices de victoire jusqu'à leur éclosion. Pour gagner, prendre l'avantage sur l'adversaire compte, mais faut-il le conserver jusqu'au terme de la confrontation.</p>

<h2>Une allégorie nationale</h2>

<p>Cette rencontre est une allégorie qui renvoie à nos rapports aux défis politiques, intellectuels, technologiques, économiques et sociaux qui interpellent une nation dans son entièreté. Le Sénégal regorge de talents dans tous les domaines. Nos sportifs rivalisent avec les meilleurs comme nous l'avons appréciés en de nombreuses autres compétitions que ce Mondial infernal. Nos ingénieurs formés à bonne école sont parmi les meilleurs au monde. Nos chercheurs sont tout aussi compétents. Nos entrepreneurs tirent tant bien que mal leur épingle du jeu. Nos artistes brillent et certains, tel Youssou Ndour, éblouissent la planète. Nous savons créer, surprendre, séduire et faire rêver. Nous savons ouvrir des portes que beaucoup nous croyaient incapables de franchir.</p>

<p>Mais combien de fois avons-nous vu des projets remarquables échouer au moment décisif ? Combien d'entreprises sénégalaises, démarrées avec enthousiasme, disparaissent faute de trésorerie, de gouvernance, de stratégie ou de capacité à anticiper les crises ? Combien d'industries naissantes s'effondrent devant une concurrence étrangère mieux organisée ? Combien de programmes publics prometteurs restent en plan, ne sont pas mis en œuvre, sinon biaisés, parce que étouffés par l'improvisation, la rupture de la continuité de l'État au gré des changements de régime et par des querelles d'ego au sommet ?</p>

<h2>Le déficit de consolidation</h2>

<p>Le parallèle est frappant. Une entreprise s'effondre souvent après des années de succès apparent, lorsqu'elle s'ankylose dans le confort de la chose acquise, cessant du coup d'anticiper les risques. De la même manière, les « Lions » n'ont pas perdu ce match de tous les espoirs d'une Nation contre les perfides « Diables rouges » parce qu'ils étaient inférieurs. Ils l'ont raté parce qu'ils ont cru que le plus difficile était déjà accompli, et ont quasiment cessé de se battre, sous le regard d'un entraîneur, Pape Thiaw, qui a semblé avoir perdu tous ses repères pour la suite. Or, comme le disait à juste raison, le président Abdou Diouf, « c'est le difficile qui est le chemin ». Dans toute compétition, qu'elle soit sportive ou économique, c'est précisément lorsque l'on croit avoir gagné que le danger est le plus grand et s'amplifie, jusqu'au bout du bout.</p>

<h2>Science de la gestion des émotions</h2>

<p>Le football moderne n'est plus seulement une affaire de technique ou de tactique. Il est devenu une science de la gestion des émotions, de la concentration et de la maîtrise parfaite du jeu et de ses enjeux. Il en va exactement de même pour l'entreprise moderne. La qualité d'un produit ne suffit plus. Il faut une organisation solide, une vision, une discipline de tous les instants. Les cinq dernières minutes d'un match ressemblent aux cinq années décisives de la courbe d'évolution d'une entreprise. Ce sont celles où se décide sa survie et où s'opère son point d'inflexion.</p>

<h2>Au-delà du gazon</h2>

<p>Cette défaite des « Lions » devra être méditée bien au-delà du gazon du Lumen Field de Seattle. Elle interroge notre rapport à l'adversité du temps et des autres. Nous excellons souvent dans l'effort de conquête, mais nous accordons moins d'attention à l'effort de consolidation. Nous lançons volontiers des projets, mais nous ne nous investissons pas suffisamment dans leur pérennité. Nous célébrons les lancements et les inaugurations, plus que les accomplissements sur la durée.</p>

<p>Une nation ne devient pas émergente parce qu'elle croule sous les promesses. Elle le devient lorsqu'elle transforme les promesses en institutions solides, ses ambitions en résultats durables et ses succès ponctuels en habitudes.</p>

<h2>La leçon pour l'économie</h2>

<p>Les Lions n'ont pas manqué de courage. Ils ont simplement découvert, dans la douleur, qu'au plus haut niveau mondial, le talent ne pardonne aucune seconde d'inattention. Cette leçon vaut également pour notre économie. À l'heure où le Sénégal nourrit de grandes ambitions industrielles, énergétiques et technologiques, la question n'est plus seulement de savoir comment démarrer. La véritable question est de savoir comment durer.</p>

<p>Le pays est aujourd'hui à l'image de notre équipe nationale. Les ressources sont là. Les compétences existent. Les opportunités sont réelles. Mais rien n'est irréversible. Les richesses naturelles ne garantissent pas le développement. Elles peuvent même accélérer le déclin si elles ne sont pas exploitées et administrées avec rigueur, dans l'intérêt commun et primordial de la Nation. Les entreprises nationales ne survivront pas grâce au seul patriotisme économique. Elles devront gagner en compétitivité, face à la concurrence, mais sans que l'accompagnement public ne leur fasse défaut. Les réformes politiques ne produiront d'effets que si elles s'accompagnent d'une culture de responsabilité et d'évaluation.</p>

<h2>Conclusion : apprendre de l'erreur</h2>

<p>Les « Diables rouges » n'ont pas seulement remporté un match. Ils ont démontré ce que signifie y croire jusqu'au bout. Le Sénégal, lui, a encore appris, à ses dépens, qu'une victoire n'est jamais acquise avant le coup de sifflet final.</p>

<p>Puissions-nous tirer de cette amère déconvenue sportive une leçon qui dépasse le football. Une nation qui apprend de ses erreurs et qui travaille à ne plus perdre, quand le triomphe est presque écrit, est une nation qui finira, un jour, par gagner son match pour la vie, pour le développement.</p>

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

console.log("✅ Article Lions vs Diables Rouges publié sous la signature de Pape Amadou Fall");
console.log("   Slug:", slug);
console.log("   Catégorie: Dossiers (ID 30010)");
console.log("   Auteur: Pape Amadou Fall (ID 60002)");

await connection.end();
