import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Auteur : Bensirac / Abdou Fatah Fall — ID 60001
// Catégorie : Analyses — ID 30008
const AUTHOR_ID = 60001;
const CATEGORY_ID = 30008;
const ARTICLE_ID = 1860002;

const title = "Diomaye, Sonko et le miroir de 1962 : La solitude du pouvoir face au piège de la redevabilité";
const slug = "diomaye-sonko-miroir-1962-solitude-pouvoir-redevabilite";
const excerpt = "En célébrant le centenaire d'Abdoulaye Wade, le président Bassirou Diomaye Faye n'a pas seulement rendu un hommage d'État. Il a dessiné, en creux, la stature d'une présidence qui s'affranchit des tutelles charismatiques et des impatiences partisanes. Entre la confession-fleuve d'Ousmane Sonko le 2 juin et la solennité républicaine du Grand Théâtre, se joue le grand récit de l'autorité sénégalaise : celui de la rupture inévitable entre la créature et le créateur.";

const content = `<p class="chapeau">En célébrant ce jeudi 4 juin 2026 le centenaire d'Abdoulaye Wade, le président Bassirou Diomaye Faye n'a pas seulement rendu un hommage d'État à l'ancien « Pape du Sopi ». Il a dessiné, en creux, la stature d'une présidence qui s'affranchit des tutelles charismatiques et des impatiences partisanes. Entre la confession-fleuve d'Ousmane Sonko le 2 juin et la solennité républicaine du Grand Théâtre, se joue le grand récit de l'autorité sénégalaise : celui de la rupture inévitable entre la créature et le créateur.</p>

<p class="byline"><em>Par Bensirac · Abdou Fatah Fall · Rabat, juin 2026</em></p>

<p>Trois questions posées sur Facebook par un observateur africain ont le mérite de couper court aux effusions partisanes. Elles sont simples, presque naïves dans leur formulation — et c'est précisément pour cela qu'elles font mouche. À quel moment un ancien Premier ministre limogé décide-t-il de raconter ses conversations privées avec le chef de l'État à la face du monde ? À quel moment peut-on signifier au président de la République qu'on n'est pas disponible à l'heure qu'il fixe ? À quel moment le président de l'Assemblée nationale, troisième personnage de l'État, décide-t-il de tenir conférence de presse à quelques mètres d'un commissariat, comme pour signifier qu'il est lui-même sous surveillance ? Ces trois questions résument, à elles seules, la nature profonde de la crise qui secoue le Sénégal depuis le 22 mai 2026.</p>

<p>Mardi 2 juin 2026, devant les caméras rassemblées près de l'École de police de Dakar, Ousmane Sonko a tenu sa première conférence de presse depuis son limogeage du 22 mai. Il a parlé longuement — très longuement. Il a évoqué des échanges au Palais, des refus de rendez-vous, des messages reçus en soirée, des promesses non tenues, des trahisons perçues. En d'autres termes, il a fait ce que nulle tradition républicaine ne valide : il a livré, en public, les coulisses d'une rupture qui aurait dû rester dans la sphère des délibérations d'État.</p>

<h2>Le spectre de 1962 : Senghor, Dia et la tragédie du bicéphalisme</h2>

<p>Pour qui scrute les dynamiques de l'État sénégalais avec les lunettes des sciences sociales, la crise actuelle n'est pas une anomalie inédite ; elle est la réactivation d'un schéma structurel profond. En décembre 1962, le Sénégal indépendant, alors sous un régime parlementaire bicéphale, vacillait sous le choc d'un affrontement titanesque entre Léopold Sédar Senghor, président de la République aux prérogatives essentiellement diplomatiques et symboliques, et Mamadou Dia, président du Conseil détenant l'essentiel du pouvoir exécutif. Dia, idéologue de la rupture économique et de l'autosuffisance africaine, avait tenté de faire voter par l'Assemblée nationale une motion de censure contre son propre gouvernement — manœuvre constitutionnellement ambiguë qui fut interprétée par Senghor comme une tentative de coup d'État. L'arrestation de Dia, son procès et sa condamnation à la réclusion à perpétuité marquèrent la fin du bicéphalisme sénégalais et l'avènement du présidentialisme fort qui structure encore aujourd'hui les institutions du pays.</p>

<p>Ce précédent historique offre des similitudes théoriques saisissantes avec le face-à-face contemporain entre Bassirou Diomaye Faye et Ousmane Sonko. Dans les deux cas, nous assistons au déchirement d'un couple politique fondateur, né d'une alliance intime pour la conquête de la souveraineté, et miné par l'impossible partage de l'autorité suprême. Mamadou Dia incarnait l'idéologue de la rupture, théorisant le « rejet révolutionnaire des anciennes structures » et la sortie planifiée de l'économie de traite. Sonko, de même, s'est positionné depuis 2014 comme le théoricien du « Projet », la matrice idéologique du PASTEF, dont Diomaye Faye n'était, à l'origine, que le porte-parole institutionnel.</p>

<p>Cependant, les différences entre ces deux époques sont fondamentales et méritent d'être explicitées pour éviter tout anachronisme réducteur. En 1962, le conflit s'est joué dans le cadre d'une Constitution parlementaire où le président du Conseil (Dia) tirait sa légitimité de l'Assemblée nationale, tandis que le président de la République (Senghor) était élu par un collège restreint. En 2026, la donne est inversée : Bassirou Diomaye Faye jouit de l'onction du suffrage universel direct, faisant de lui le seul détenteur de la légitimité populaire directe. Sonko, quant à lui, n'a jamais été élu président — il a été nommé Premier ministre par le président qu'il avait contribué à faire élire. Cette asymétrie fondamentale de légitimité constitutionnelle est ce qui rend la posture de Sonko, depuis son limogeage, politiquement intenable sur le plan du droit.</p>

<h2>La tension tragique : Dette de redevabilité contre majesté présidentielle</h2>

<p>Au cœur de cette rupture réside ce que nous qualifions de « piège de la dette symbolique ». Dans les sociétés d'Afrique de l'Ouest — et la société sénégalaise en est une, profondément, jusque dans ses fibres soufies et ses codes de la <em>kersa</em> (cette pudeur sociale qui commande la retenue et la discrétion) —, la dette morale n'est pas une simple clause de style. Elle est un impératif ontologique. Le slogan de campagne de 2024, <em>Diomaye moy Sonko</em> (« Diomaye, c'est Sonko »), a scellé un pacte de redevabilité dont Sonko entendait faire valoir les termes à vie. Diomaye, dans cette logique, n'était pas président : il était le mandataire d'un projet dont Sonko restait le propriétaire intellectuel et politique.</p>

<p>Or, la fonction présidentielle, par sa nature même sous la Ve République, est une instance de solitude et d'absolu. Elle ne souffre aucun partage, aucune co-gouvernance occulte. Dès lors que Bassirou Diomaye Faye a commencé à exercer la plénitude de ses prérogatives constitutionnelles — notamment en nommant Aminata Touré à la tête de la coalition présidentielle en novembre 2025 sans l'aval de son Premier ministre, ou en affirmant son autorité arbitrale face aux urgences économiques et sociales —, la dette symbolique s'est transformée en conflit ouvert. Sonko a vécu chaque décision autonome du président comme une trahison. Diomaye a vécu chaque tentative de co-gouvernance de Sonko comme une usurpation.</p>

<p>Diomaye Faye se retrouve aujourd'hui dans une position complexe : chef de l'État disposant d'une légitimité électorale réelle, mais gouvernant contre sa propre majorité parlementaire, celle-là même qui est dominée par le parti de l'homme qu'il vient de limoger. Le constitutionnaliste Abdou Ben Said Assadillah, dans une lecture récente de la crise, rappelle que le président ne peut pas dissoudre l'Assemblée nationale avant novembre 2026. Un an et quelques mois à tenir une ligne de crête.</p>

<p>Il serait cependant réducteur — et politiquement malhonnête — de camper Diomaye en simple victime de l'hubris sonkiste. Une voix médiane, raisonnée, exige de lui qu'il veille à ce que les comptes soient soldés : les comptes de la gestion publique, ceux de la justice, ceux des promesses électorales. Cette voix-là a ses droits, et elle les fait valoir. Mais elle ne peut ignorer que le chef de l'État porte simultanément une autre responsabilité, d'un rang supérieur dans la hiérarchie des urgences : celle de préserver la stabilité institutionnelle d'un pays que ses voisins regardent encore comme un modèle relatif.</p>

<p>Diomaye, au fond, a le <em>cardio</em> — comme le note, avec une concision populaire pleine de pertinence, l'observateur africain qui a ouvert ce débat sur Facebook. Il tient. Il encaisse. Il gouverne. Il a nommé Al Aminou Lo à la primature trois jours après le limogeage, sans précipitation, sans effondrement. La décision, sur le fond, peut être discutée. Sur la forme, elle dit quelque chose d'essentiel : cet homme n'est pas manœuvrable comme prévu.</p>

<h2>L'obsession de la centralité : Ousmane Sonko ou la hantise du numéro deux</h2>

<p>Pour comprendre la violence de la rupture, il faut documenter l'obsession de la centralité qui traverse, en filigrane, toute la trajectoire d'Ousmane Sonko. L'homme semble habité par la hantise d'être relégué au second plan, de ne pas être perçu comme le numéro un absolu, partout et à tout prix. Cette obsession s'est lue dans une série de manœuvres d'une cohérence redoutable. Dès décembre 2025, alors qu'il occupait encore la Primature, il déclarait prématurément sa candidature à la présidentielle de 2029 — geste sans précédent dans l'histoire politique sénégalaise, qui revenait à signifier au président en exercice que son Premier ministre se positionnait déjà comme son successeur désigné.</p>

<p>Cette obsession a trouvé son paroxysme lors de sa conférence de presse du mardi 2 juin 2026, tenue près de l'École de police de Dakar. Durant cette longue harangue, Sonko s'est livré à un déballage public sans précédent, violant délibérément les secrets des délibérations de l'État. Raconter ses conversations privées avec le chef de l'État, révéler qu'il s'est déclaré indisponible à l'heure fixée par le président, ou dévoiler des messages reçus en soirée : cette mise en scène victimaire n'était pas un moment de faiblesse. C'était une déclaration de guerre symbolique, destinée à repositionner Sonko non plus comme l'ancien Premier ministre limogé, mais comme le martyr d'un système qui trahit ses propres idéaux.</p>

<p>Ce serait une erreur d'analyse que de lire la conférence du 2 juin comme un moment de fragilité. Elle ressemble davantage à l'acte inaugural d'une campagne présidentielle annoncée avec deux ans et demi d'avance. Le limogeage ne le détruit pas. Il le libère. Il ne dirigera plus un gouvernement dont chaque décision l'aurait renvoyé à ses responsabilités d'exécutif. Il peut désormais occuper la position la plus confortable qui soit en politique africaine : celle de l'opposant structurel qui se réclame du pouvoir sans en assumer les contraintes.</p>

<p>Reste une question que ce dispositif de reconquête ne résout pas : le biais cognitif de départ — la conviction que le président lui doit allégeance — peut-il se transformer en programme de gouvernement cohérent ? Un leader qui a passé deux ans à gouverner sur la base d'une dette symbolique plutôt que sur un pacte républicain clair peut-il, demain, proposer au Sénégal un projet qui dépasse la logique de la revanche ? C'est là que l'analyse politique doit, honnêtement, marquer une pause.</p>

<h2>Le contre-discours du 4 juin : La patience de Diomaye face à la fureur de la primauté</h2>

<p>C'est à cette tentative de déstabilisation symbolique que le président Bassirou Diomaye Faye a répondu, ce jeudi 4 juin 2026, avec une hauteur de vue magistrale. En plaçant sous son haut patronage la célébration du centenaire d'Abdoulaye Wade au Grand Théâtre national, le chef de l'État a opéré un déplacement stratégique majeur. Face à la fureur de la primauté et à l'immédiateté revancharde de son ancien Premier ministre, Diomaye a opposé le temps long de l'histoire et la solennité des institutions.</p>

<p>Dans un discours d'une rare élégance républicaine, Diomaye Faye a célébré trois vertus cardinales de l'ancien président Wade, qui résonnent comme une réfutation philosophique point par point de la méthode Sonko :</p>

<blockquote>« À la jeunesse, à qui notre époque promet sans cesse que tout est facile et que tout est dû, cette vie enseigne une vérité plus rude et plus belle : que rien de durable ne naît dans la précipitation, et que les plus justes causes sont presque toujours les plus patientes. »</blockquote>

<p>Cette apologie de la patience (le <em>mouniou</em> soufi), rappelant les vingt-six ans de combat de Wade avant d'accéder au pouvoir en 2000, fustige en creux l'impatience dévorante de Sonko, pressé de solder les comptes et de se projeter en 2029. De même, en insistant sur le respect de l'adversaire et en rappelant le geste historique de transition pacifique entre Abdou Diouf et Abdoulaye Wade en 2000, le président a rappelé que « l'adversaire d'aujourd'hui n'est pas un ennemi ». C'est une condamnation élégante, sans nom propre, de la rhétorique de guerre civile froide que Sonko distille depuis son limogeage.</p>

<p>Enfin, en s'adressant directement au vieux leader centenaire, Diomaye a prononcé des mots d'une portée politique immense :</p>

<blockquote>« Aux heures où la fonction est la plus solitaire, il est des présences anciennes vers lesquelles l'esprit se tourne : la vôtre est assurément de celles-là. »</blockquote>

<p>Par cette phrase, le président Faye s'affranchit définitivement de la tutelle de son ancien mentor. La source de son inspiration et de son réconfort moral ne se trouve plus dans les officines du parti ou dans les exigences de la Primature, mais dans la lignée des géants de l'histoire nationale. Diomaye s'est fait président au Grand Théâtre, laissant Sonko à ses ressentiments de chef de parti.</p>

<h2>La République à l'épreuve de ses propres enfants</h2>

<p>Ce qui se joue au Sénégal depuis le 22 mai 2026 n'est pas simplement une querelle de personnes, si intenses que soient les personnalités impliquées. C'est une mise à l'épreuve de la maturité institutionnelle d'une démocratie que l'Afrique de l'Ouest regardait, il y a deux ans encore, comme un îlot de stabilité dans un Sahel en feu. La tentation est grande, pour les observateurs extérieurs, de lire cette crise à travers les grilles africaines classiques : le chef charismatique, la loyauté tribale, la trahison personnelle. Cette lecture est réductrice. Elle manque l'essentiel.</p>

<p>La vraie question n'est donc pas de savoir si Diomaye va survivre à Sonko, ou si Sonko va emporter Diomaye. La vraie question est celle-ci : est-ce que la République sénégalaise va sortir de cette épreuve plus solide — avec des règles du jeu clarifiées, des rapports d'autorité mieux balisés, une culture politique moins dépendante des dettes symboliques et des loyautés personnelles ? Ou va-t-elle s'épuiser dans un affrontement entre deux logiques également légitimes dans leurs revendications mais incompatibles dans leurs méthodes ?</p>

<p>Cette question-là dépasse Sonko et Diomaye. Elle dépasse même le PASTEF. Elle touche à ce que les politologues africains, dans la lignée de Mamadou Diouf et de Pape Ndiaye, nomment la <em>culture politique de la postcolonie</em> : la difficulté à faire coexister, dans un même espace institutionnel, la logique de l'État impersonnel héritée de la colonisation et la logique des solidarités primaires qui continuent de structurer les rapports de pouvoir au quotidien. Ni Diomaye ni Sonko n'ont inventé cette tension. Ils en sont, chacun à leur manière, les héritiers et les prisonniers.</p>

<p>Le Sénégal est en train de vivre, en accéléré, ce que toutes les démocraties naissantes traversent tôt ou tard : le moment où les héros de la rupture deviennent les gardiens d'un ordre qu'ils ont eux-mêmes instauré — et où cet ordre commence à leur résister. Diomaye a choisi de tenir la ligne républicaine de la patience et des institutions. Sonko a choisi de la contourner par le haut, fort de sa légitimité de président de l'Assemblée et de sa hantise de la centralité. L'histoire dira qui avait raison. Mais dans l'immédiat, c'est la République qui est à l'épreuve — et c'est à elle, seule, qu'il appartient de trancher.</p>

<h3>Références bibliographiques et sources</h3>
<ol>
<li>Wikipedia, <em>Crise politique de 1962 au Sénégal</em>, https://fr.wikipedia.org/wiki/Crise_politique_de_1962_au_Sénégal.</li>
<li>AVOMM-INFOS, <em>CRISE POLITIQUE DE DECEMBRE 1962 : Comment Mamadou Dia a été « piégé » par l'ancien président Senghor</em>.</li>
<li>Le Soleil, <em>Abdoulaye Wade a 100 ans : le Président Bassirou Diomaye Faye lui rend un hommage d'État</em>, 4 juin 2026.</li>
<li>Gambia Journal, <em>Wade Centenary Tribute Triggers Political Jostling Across Party Lines</em>.</li>
<li>Seneweb, <em>"100 years of Wade": Diomaye Faye's true intentions</em>.</li>
</ol>

<p class="copyright">© 2026 — Analyse politique · Weurseuk · Bensirac / Abdou Fatah Fall · Chercheur en sciences religieuses, sociétés et dynamiques transnationales</p>`;

const publishedAt = new Date('2026-06-04T18:00:00Z');

// Vérifier si l'article existe déjà
const [existing] = await conn.execute('SELECT id FROM editorials WHERE id = ?', [ARTICLE_ID]);
if (existing.length > 0) {
  console.log('Article déjà existant, mise à jour...');
  await conn.execute(
    `UPDATE editorials SET title=?, slug=?, excerpt=?, content=?, authorId=?, categoryId=?, publishedAt=?, isPublished=1, updatedAt=NOW() WHERE id=?`,
    [title, slug, excerpt, content, AUTHOR_ID, CATEGORY_ID, publishedAt, ARTICLE_ID]
  );
} else {
  await conn.execute(
    `INSERT INTO editorials (id, title, slug, excerpt, content, authorId, categoryId, isPublished, publishedAt, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, NOW(), NOW())`,
    [ARTICLE_ID, title, slug, excerpt, content, AUTHOR_ID, CATEGORY_ID, publishedAt]
  );
}

console.log('✅ Article Diomaye-Sonko-1962 inséré avec succès');
console.log(`   Slug: ${slug}`);
console.log(`   Auteur ID: ${AUTHOR_ID} (Bensirac / Abdou Fatah Fall)`);
console.log(`   Catégorie ID: ${CATEGORY_ID} (Analyses)`);

await conn.end();
