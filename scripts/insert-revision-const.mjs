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

const title = "Révision constitutionnelle : le dessous des cartes";
const slug = "revision-constitutionnelle-dessous-des-cartes-senegal";
const excerpt = "La révision de la Constitution adoptée par l'Assemblée nationale a provoqué une confrontation inédite entre l'Exécutif et le Législatif, pourtant issus de la même majorité politique. Au-delà de la procédure employée, le débat soulève une question essentielle : s'agit-il d'une simple modernisation institutionnelle ou d'une recomposition profonde de l'équilibre des pouvoirs au profit du Parlement et d'un éventuel Premier ministre ?";

const content = `<article class="editorial-content">

<p>De toutes ses soixante-dix années d'existence, depuis le Grand Conseil de l'Afrique occidentale française jusqu'à l'actuelle Assemblée nationale, l'Hémicycle de la place Tacher, aujourd'hui place Soweto, n'avait jamais connu un épisode aussi singulier que celui du mardi 29 juin 2026 : une confrontation ouverte entre un Exécutif et un Législatif pourtant issus de la même majorité politique.</p>

<p>La tentation est grande d'y voir un écho des « événements de 1962 ». Mais la comparaison trouve rapidement ses limites. À l'époque, la crise opposait le président de la République, Léopold Sédar Senghor, au président du Conseil, Mamadou Dia, sur fond de rivalité au sommet de l'État quant à la répartition des pouvoirs. Si les deux hommes appartenaient à la même formation politique, l'UPS, le Parlement avait finalement tranché en faveur de Senghor.</p>

<p>La crise présente est d'une configuration différente. Elle met aux prises le président de la République, Bassirou Faye, et le président de l'Assemblée nationale, Ousmane Sonko, ce dernier s'appuyant sur la majorité parlementaire PASTEF, qui lui est totalement acquise, pour modifier l'architecture des pouvoirs issue de la Constitution en sa faveur et en faveur d'un Premier ministre qui serait placé sous son giron.</p>

<h2>Une procédure accélérée qui divise</h2>

<p>Ainsi, au terme d'une procédure « fast track » qui n'aura pas duré plus de quarante-huit heures, il est, a priori, arrivé à ses fins. Après l'expulsion mouvementée d'Abdou Mbow, député du groupe « Takku Wallu », suivie du boycott du reste de l'opposition, qui, de toute façon, ne pouvait aucunement peser sur la balance, la majorité parlementaire a voté en bloc la modification en profondeur de la Loi fondamentale du pays.</p>

<p>Prévu ou non, il y a eu collision au sommet. Ce vote, guidé et chaperonné par Sonko, a, en effet, été taclé par le gouvernement dont il était le Premier ministre quelques jours plus tôt. Le désaccord émis par Me Moussa Sarr, ministre de la Justice, au nom du chef de l'État, il va de soi, ne porte pas sur la nécessité de réviser la Constitution, d'autant plus que le projet de loi et la proposition de loi dont les deux camps sont porteurs sortent du même moule.</p>

<p>Le texte adopté le 29 juin dernier par la majorité monolithique du PASTEF à l'Assemblée nationale n'est en effet pas une initiative spontanée. Il reprend l'avant-projet préparé par l'Exécutif lui-même, soumis au Conseil constitutionnel par le président Faye le 5 mai 2026 et validé, dans ses grandes lignes, par ce dernier. Les six députés signataires de la proposition de loi n° 17/2026 ont simplement repris ce texte en y intégrant les observations du Conseil constitutionnel et en changeant son emballage procédural. Et en lui donnant une orientation particulière. Ce que le pouvoir rejette.</p>

<h2>Le débat sur la légitimité démocratique</h2>

<p>La Constitution sénégalaise prévoit deux voies pour sa propre révision. C'est soit par le biais d'un projet de loi présidentiel, qui peut éventuellement aboutir à un référendum, soit par une proposition de loi parlementaire, adoptable aux trois cinquièmes sans consultation populaire. Ces deux voies ne sont pas du tout équivalentes en termes de légitimité démocratique. La première maintient ouvert le droit du peuple à se prononcer. La seconde le court-circuite.</p>

<p>Le passage d'un « projet de loi présidentiel » à une « proposition de loi parlementaire » n'est pas une simple nuance technique. C'est un choix stratégique, démocratiquement inélégant, qui voudrait, et qui croit, rendre le référendum impossible et donc faire passer, comme une lettre à la poste, des modifications et des ajouts au service des desseins politiques présents et futurs de Sonko.</p>

<p>Mais il se serait trompé lorsqu'il a déclaré, à la clôture de la session, que le vote entériné équivalait à l'approbation définitive du texte révisé, si l'on en croit un éminent juriste, en l'occurrence Me Doudou Ndoye. Interrogé sur une chaîne de télévision le soir même, celui-ci a fermement rejeté cette assimilation, rappelant qu'en droit sénégalais, le vote de l'Assemblée nationale ne saurait être considéré comme une approbation sans appel.</p>

<h2>Une réforme d'ampleur qui appelle le consensus</h2>

<p>La manœuvre du PASTEF, sous la férule de Sonko, est d'autant plus sujette à caution que la réforme touche à pas moins de trente articles dont la modification est de nature à déstabiliser l'équilibre entre l'Exécutif, le Législatif et même le Judiciaire.</p>

<p>L'ajustement à opérer, à savoir la réécriture du préambule de la Loi fondamentale, la transformation du Conseil constitutionnel en Cour constitutionnelle, la redéfinition des rapports entre le président de la République et son Premier ministre, l'interdiction faite au chef de l'État de diriger un parti, etc., constitue une somme de décisions politiques qui engagent l'avenir du régime.</p>

<p>Il requiert donc un consensus le plus représentatif possible. Prétendre qu'une telle refonte peut se passer de l'assentiment populaire, au motif d'une majorité arithmétique à l'Assemblée, c'est confondre la légalité formelle avec la légitimité démocratique.</p>

<p>L'argument de l'Exécutif ne repose pas seulement sur des principes abstraits. Il s'inscrit dans la tradition sociale et politique du pays. Et, comme l'a rappelé le garde des Sceaux, Me Moussa Sarr, aucune révision constitutionnelle majeure n'a été entreprise dans ce pays sans être précédée de consultations associant l'opposition, la société civile et les différentes sensibilités nationales, jusqu'à son aboutissement consensuel.</p>

<p>Cette pratique, qui a traversé toutes les alternances, a contribué à asseoir cette réputation de stabilité institutionnelle qui nous distingue en Afrique, sous le regard attentif du reste du monde.</p>

<p>Pacte fondamental d'une Nation, une Constitution ne saurait être la propriété d'un chef d'État ou d'une quelconque majorité parlementaire. Sa modification unilatérale, par la seule force du magistère ou du nombre, priverait le texte révisé de l'adhésion collective indispensable à son autorité. Si elle est adoptée dans la confrontation plutôt que dans le consensus, elle ne bénéficierait pas du respect spontané que lui doit l'ensemble des citoyens et des acteurs politiques, y compris ceux qui, demain, pourraient constituer une nouvelle majorité.</p>

<h2>Un rééquilibrage des pouvoirs au profit de Sonko ?</h2>

<p>Le texte constitutionnel, tel que reformaté, apparaît comme visant à affaiblir le président Bassirou Faye durant le temps qui reste de son mandat et dans la perspective d'un second, dans l'hypothèse presque certaine qu'il y aspire. En clair, plusieurs dispositions du texte s'alignent, de manière stratégique, sur le positionnement politique d'Ousmane Sonko, comme adversaire politique du président Faye et aspirant déterminé à la magistrature suprême.</p>

<p>Avec le renforcement des pouvoirs du Premier ministre (articles 42 et 43), habilité à déterminer la politique de la Nation, de pair avec le chef de l'État, et à présider le Conseil des ministres à sa place, Sonko se façonne un cadre absolument favorable lorsque le Parlement, à ses ordres, voudra le replacer à la Primature, ou y installer un « patriote » qui lui sera acquis. Le pouvoir de décision et les marges de manœuvre de Bassirou Faye s'en trouveront drastiquement réduits.</p>

<p>L'article 38 enfonce le clou en l'isolant politiquement. Il ne lui laisse plus le choix de diriger un parti ou une coalition. Or, Ousmane Sonko conserve la présidence et le leadership politique incontesté du PASTEF. Cette asymétrie renforce le poids de Sonko comme véritable chef de la majorité et de la légitimité populaire du mouvement face à un président institutionnellement affaibli sur le plan partisan.</p>

<p>Les articles 25 et 67-1 accroissent considérablement les moyens de contrôle du Parlement sur l'action gouvernementale et les finances de l'État.</p>

<p>L'article 37, afférent à la déclaration de patrimoine du président de la République, a été supprimé de la Loi fondamentale révisée et n'a été réintroduit dans aucun autre article. Pour Ousmane Sonko, ce retrait n'est pas un allègement de l'obligation. Celle-ci est plutôt maintenue, mais sous la stricte surveillance des lois ordinaires et des corps de contrôle, donc du Parlement. C'est une manière de signifier, à sa base électorale en particulier, que c'est désormais lui et l'Assemblée nationale qui dicteront les règles de la transparence et de la reddition des comptes au Sénégal, et non le président de la République, qui serait tenu, par ailleurs, de faire sa déclaration au début et à la fin de son mandat.</p>

<p>Avec la création de la Cour constitutionnelle sur les cendres du Conseil (articles 89 à 92), le président de la République a certes la prérogative de nommer six des neuf membres qui la composent, mais Ousmane Sonko participe directement à l'influence sur la nomination des trois autres membres parmi les cinq potentiels proposés par l'Assemblée nationale. Il acquiert ainsi un rôle institutionnel de premier plan dans le contrôle de la plus haute juridiction arbitrale, électorale et référendaire du pays.</p>

<p>L'article 31 sécurise juridiquement les partis politiques contre les dissolutions administratives et l'article 20 autorise explicitement le financement des partis par la diaspora. Ils constitutionnalisent des garanties de survie pour le PASTEF en particulier, parti qui avait été dissous par simple décret en 2023 et dont le modèle repose largement sur la contribution financière et l'influence de la diaspora sénégalaise.</p>

<p>En clair, le projet de révision constitutionnelle voté par l'Assemblée nationale vise à affaiblir les prérogatives du chef de l'État, à limiter son influence politique et, inversement, à accroître les pouvoirs de l'Assemblée nationale, de son président et d'un éventuel Premier ministre issu de ses rangs.</p>

<h2>La riposte politique du président Faye</h2>

<p>Le président Faye a montré la couleur de son refus de ce musellement politique en rendant publique son intention de créer son propre parti, le 3 juillet dernier, lors d'une rencontre au palais de la République avec un nombre remarquable d'élus locaux.</p>

<p>De la coalition hétéroclite « Diomaye Président », qui avait porté sa candidature en 2024, il veut manifestement passer à une « unité plus organique », plus structurée, à même de lui assurer un relais politique direct et solide à la base. Il va donc créer un parti et surtout le diriger, comme Sonko à la tête du sien. C'est une stratégie essentielle pour consolider sa légitimité face aux structures du PASTEF et préparer les futurs scrutins locaux et nationaux de manière souveraine.</p>

<h2>Conclusion : le peuple doit trancher</h2>

<p>Maintien du régime présidentiel ou basculement vers un régime parlementaire qui a les faveurs immédiates du « président Sonko » ? Toute la question est là.</p>

<p>Le choix à faire n'est point du seul ressort de l'actuelle majorité parlementaire, ni de celui du locataire, toujours légitime et légal, du palais de la République. Il doit nécessairement être validé par le peuple, à qui appartient la souveraineté. À cet égard, et par-delà tous les calculs et tactiques politiques, l'Exécutif est en droit de privilégier le recours au référendum plutôt que le vote partisan du Parlement. Encore faut-il que les citoyens soient bien informés et pleinement conscients de tous les enjeux sous-jacents, du dessous des cartes.</p>

<p>Au demeurant, le Sénégal ne souffre véritablement pas d'un manque de lois ou d'une mauvaise Constitution, mais plutôt d'un défaut d'application rigoureuse des textes existants. L'arsenal juridique actuel offre déjà tous les leviers nécessaires pour lutter contre la corruption, auditer les finances publiques et réformer l'administration sans avoir à toucher à la Loi fondamentale.</p>

<p>Prioriser la révision constitutionnelle, c'est privilégier la politique, presque politicienne, sur les urgences vitales du pays qui se situent ailleurs. Le capital politique et financier investi dans ce « Projet » se ferait au détriment des priorités de l'immense majorité des citoyens. Il serait de nul impact atténuant sur l'inflation et la cherté des denrées de première nécessité qui restent la préoccupation numéro un des ménages. Sérieusement, cette réforme peut attendre…</p>

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

console.log("✅ Article Révision constitutionnelle publié sous la signature de Pape Amadou Fall");
console.log("   Slug:", slug);
console.log("   Catégorie: Analyses (ID 30008)");
console.log("   Auteur: Pape Amadou Fall (ID 60002)");

await connection.end();
