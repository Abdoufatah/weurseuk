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

const title = "De Pretoria à Dakar : la xénophobie, exutoire d'économies en peine";
const slug = "pretoria-dakar-xenophobie-exutoire-economies-peine";
const excerpt = "L'Afrique du Sud traverse actuellement une nouvelle secousse identitaire majeure. À l'approche des élections municipales prévues pour la fin de l'année, la haine de l'autre, et plus spécifiquement de l'autre Noir africain, s'est muée en un argument de campagne normalisé. Ce phénomène, loin d'être une anomalie isolée, offre un miroir déformant mais d'une brûlante actualité pour le Sénégal, où les germes d'une rhétorique similaire commencent à cibler la communauté d'origine guinéenne.";

const content = `<article class="editorial-content">

<p>L'Afrique du Sud traverse actuellement une nouvelle secousse identitaire majeure. À l'approche des élections municipales prévues pour la fin de l'année, la haine de l'autre, et plus spécifiquement de l'autre Noir africain, s'est muée en un argument de campagne normalisé. Ce phénomène, loin d'être une anomalie isolée, offre un miroir déformant mais d'une brûlante actualité pour le Sénégal, où les germes d'une rhétorique similaire commencent à cibler la communauté d'origine guinéenne, notamment les Peuls du Fouta-Djalon. L'analyse de ces dynamiques démontre comment la faillite des politiques socio-économiques prépare systématiquement le terrain aux pires dérives identitaires.</p>

<p>La vague de violences qui a culminé autour de l'ultimatum du 30 juin dernier, lancé par le collectif March and March, n'est pas un simple accès de colère populaire spontané, mais plutôt le produit d'un cynisme politique bien rodé. Les leaders populistes et certains partis d'opposition drapent leur discours dans la légalité républicaine, affirmant ne cibler que l'immigration clandestine ou la criminalité transfrontalière. Pourtant, les faits contredisent cette rhétorique légaliste puisque les violences et les pillages se concentrent presque exclusivement sur les migrants noirs africains vivant dans les townships les plus pauvres. Bien que des ressortissants européens ou asiatiques résident également en situation irrégulière dans le pays, ils échappent globalement à cette vindicte populaire.</p>

<p>C'est pourquoi les analystes parlent aujourd'hui d'afrophobie plutôt que de xénophobie au sens large. Il s'agit d'une hostilité sélective, intra-africaine, où le Noir étranger cumule une double altérité dépréciée. Ce rejet s'accompagne d'un déni total de la réalité économique, ignorant les données de la Banque mondiale qui démontrent que chaque immigré établi à son compte a créé environ deux emplois pour des Sud-Africains. Face à la faim et à la précarité, les faits macroéconomiques pèsent malheureusement bien peu.</p>

<p>Pour éviter d'affronter ses propres démons et la détresse de ses townships, le ministère sud-africain des Affaires étrangères persiste dans un déni sémantique constant depuis des années, qualifiant ces agressions de simple criminalité ordinaire. Face à cette situation, l'Union Africaine et la Communauté de développement d'Afrique australe brillent par leur impuissance. L'Afrique du Sud pesant d'un poids politique et économique disproportionné sur la scène régionale, toute velléité de sanction ou de pression multilatérale est tuée dans l'œuf, ce qui consacre la difficulté du projet panafricaniste à se réaliser face aux replis nationaux.</p>

<h2>L'amnésie historique et l'aliénation postcoloniale</h2>

<p>Le paradoxe le plus tragique de cette crise réside dans l'oubli de la solidarité d'hier. Durant les décennies de lutte contre l'Apartheid, de nombreux pays du continent ont payé un lourd tribut pour soutenir la libération des Sud-Africains. En marchant aujourd'hui vers les échoppes de leurs frères africains dans les townships plutôt que vers les centres financiers de Sandton ou les grands domaines agricoles de Stellenbosch, ou la ville exclusivement blanche d'Orania qui concentrent pourtant les richesses héritées de la ségrégation raciale, les foules en colère valident l'analyse de Steve Biko selon laquelle l'arme la plus puissante entre les mains de l'oppresseur est l'esprit de l'opprimé. L'opprimé s'en prend ainsi à plus vulnérable que lui. Le parti au pouvoir a manifestement failli à sa mission éducative en ne transmettant pas cette mémoire de la solidarité continentale à une jeunesse désœuvrée, désormais proie facile pour les discours démagogiques.</p>

<h2>Le miroir sénégalais ou les fissures du mythe de la Téranga</h2>

<p>C'est sous ce prisme qu'il convient d'analyser avec la plus grande gravité les signaux faibles qui émergent au Sénégal à l'encontre de la communauté d'origine guinéenne. Le processus de construction du bouc émissaire à Dakar emprunte exactement les mêmes sentiers rhétoriques qu'à Johannesburg. Ce qui commence par un discours en apparence légitime sur la régulation des frontières et le contrôle nécessaire de l'économie informelle glisse rapidement vers une stigmatisation ciblée. On accuse progressivement les ressortissants guinéens de contrôler des pans entiers du commerce de détail et d'altérer l'équilibre démographique du pays. On assiste également à l'importation de concepts identitaires occidentaux nocifs, à l'image du « grand remplacement », pour justifier une hostilité croissante.</p>

<p>Le danger de cette dérive réside dans la banalisation de la haine. La légendaire Téranga sénégalaise n'est pas un bouclier immuable, et elle peut s'effondrer si la parole publique tolère la désignation d'un groupe ethnique ou national comme responsable des difficultés économiques et sociales de la nation. Les appels à s'en prendre aux commerces ou à la présence guinéenne ne relèvent pas du débat démocratique sur l'immigration, mais de l'infraction pénale pure et simple. Naguère, et c'est certainement encore le cas, le quotidien où je travaillais interdisait formellement la mention de l'ethnie ou de la nationalité de l'auteur présumé ou reconnu coupable d'un délit ou d'un crime, pour en éviter une lecture stigmatisante. L'histoire africaine contemporaine nous enseigne que les pires drames humains commencent toujours par la déshumanisation verbale et la tolérance des discours de haine dans l'espace public.</p>

<p>Ne perdons pas de vue que les Sénégalais sont présents et actifs, partout ailleurs en Afrique et dans le reste du monde, avec ou sans papiers. Et n'oublions surtout pas la sanglant et douloureux conflit sénégalo-mauritanien de mars 1989…</p>

<h2>Pour un sursaut républicain et panafricain</h2>

<p>La crise sud-africaine montre de manière éclatante qu'une politique migratoire purement défensive et déconnectée de la justice sociale ne fait que nourrir le monstre identitaire. Pour l'Afrique du Sud comme pour le Sénégal, la réponse aux tensions communautaires ne peut pas se limiter à des déclarations de principe ou à des mesures sécuritaires. Il est urgent d'affronter les causes réelles de la frustration populaire en s'attaquant au chômage des jeunes, aux inégalités et à l'absence de perspectives d'avenir, tout en faisant preuve d'une fermeté judiciaire absolue contre les instigateurs de haine. Réinvestir l'espace public par l'éducation civique et la mémoire des solidarités régionales est indispensable pour préserver la cohésion nationale et africaine et ne pas sacrifier la paix civile sur l'autel de calculs politiques à court terme.</p>

</article>`;

// Catégorie : Analyses (ID 30008) pour Pape Amadou Fall (ID 60002)
const authorId = 60002;
const categoryId = 30008;

const now = new Date();

await connection.execute(
  `INSERT INTO editorials (title, slug, excerpt, content, authorId, categoryId, isPublished, isFeatured, useAlias, publishedAt, createdAt, updatedAt)
   VALUES (?, ?, ?, ?, ?, ?, 1, 1, 0, ?, ?, ?)`,
  [title, slug, excerpt, content, authorId, categoryId, now, now, now]
);

console.log("✅ Article De Pretoria à Dakar publié sous la signature de Pape Amadou Fall");
console.log("   Slug:", slug);
console.log("   Catégorie: Analyses (ID 30008)");
console.log("   Auteur: Pape Amadou Fall (ID 60002)");
console.log("   Featured: Oui (À la Une)");

await connection.end();
