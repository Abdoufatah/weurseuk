import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const title = "Une fédération pour sortir de la crise malienne ?";
const slug = "federation-sortir-crise-malienne-solution-federale-confederale";
const excerpt = "Terrassé par une offensive conjointe inédite des rebelles touaregs et des djihadistes du JNIM, le Mali traverse la crise la plus dramatique de son histoire récente. Alors que l'asphyxie économique menace Bamako et que les limites de la junte et de ses alliés russes sont mises à nu, la survie du pays ne dépendra plus seulement des armes, mais de sa capacité à se réinventer. Entre le piège d'une partition explosive et l'impossible statu quo, la voie d'une refondation fédérale ou confédérale s'impose comme l'ultime clé d'une stabilité durable.";

const authorId = 60002; // Pape Amadou Fall
const categoryId = 30006; // International
const publishedAt = new Date('2026-06-15T10:00:00Z');
const id = 1860006;

const content = `<div class="article-body">

<p class="article-paragraph">Le Mali vit une période de déstabilisation sans précédent, sous le coup d'une offensive massive et coordonnée lancée le 25 avril 2026 par une alliance tactique inédite entre les rebelles touaregs du Front de Libération de l'Azawad (FLA) et les djihadistes du Jama'at Nusrat al-Islam wal-Muslimin (JNIM), ou Groupe de Soutien à l'Islam et aux Musulmans. Frappant simultanément sur plusieurs fronts du nord au sud du pays, les insurgés ont repris Kidal, capitale symbolique de la rébellion touarègue, se sont emparés de Bourem et de pans entiers de la région de Gao, tandis que le JNIM attaquait Bamako, Kati, Sévaré et Mopti. Sous ces coups conjugués, l'armée malienne (FAMa) et ses alliés russes d'Africa Corps ont subi des pertes sévères. Cette offensive, la plus dévastatrice depuis la rébellion de 2012, a également coûté la vie au ministre de la Défense, Sadio Camara, portant un sérieux coup politique et militaire au cœur de la junte. Elle révèle, au-delà des gains territoriaux, la consolidation d'une alliance stratégique entre forces séparatistes et djihadistes qui bouleverse durablement l'équilibre des forces au Sahel.</p>

<p class="article-paragraph">L'insécurité a même gagné l'extrême ouest du pays, notamment la région de Kayes, zone vitale pour l'économie et jusque-là relativement épargnée. Le JNIM accentue sa pression sur les axes Dakar-Bamako et Nouakchott-Bamako, limitant très fortement l'approvisionnement de la capitale en hydrocarbures et autres denrées vitales. C'est sans doute le développement le plus inquiétant en ces temps tourmentés. En frappant la région de Kayes et en accentuant l'insécurité sur les axes vers le Sénégal et la Mauritanie et en bloquant les douanes et le commerce transfrontalier, le JNIM œuvre à l'asphyxie économique et financière de l'État malien. L'inflation à Bamako atteint des sommets, fragilisant le soutien populaire dont bénéficiait encore la junte.</p>

<p class="article-paragraph">L'Alliance des États du Sahel (AES), censée être un bouclier solidaire, a montré ses limites. Le Burkina Faso et le Niger qui la composent, aux côtés du Mali, sont trop accaparés par la défense de leur propre territoire pour envoyer des renforts massifs vers le Nord-Mali. Bamako se retrouve donc seul pour gérer un front qui s'étend désormais sur plus de 2 000 kilomètres, de la frontière algérienne aux faubourgs de Kayes. Et l'on voit mal les autorités maliennes appeler à la rescousse les armées des pays de la CEDEAO et encore moins la France, après leur rupture qui n'avait guère été à l'amiable.</p>

<h2 class="article-subtitle">Un contrat social à refonder</h2>

<p class="article-paragraph">La crise malienne, par sa nature multidimensionnelle — sécuritaire, politique, sociale et économique —, impose une approche qui dépasse le cadre strictement militaire. L'enjeu majeur reste la restauration d'un contrat social entre l'État et l'ensemble des populations, notamment celles des régions du Nord et du Centre. Quelle que soit la solution, elle devra nécessairement accorder une plus grande autonomie de gestion aux collectivités locales pour que les populations se sentent représentées, que les richesses du pays soient mieux valorisées et partagées et que les services publics — école, santé, justice — soient accessibles partout.</p>

<p class="article-paragraph">Celle qui doit s'imposer de fait est la restauration de l'ordre constitutionnel antérieur, lequel remettrait les pouvoirs civils et militaires ainsi que la société civile, chacun à sa place et dans son rôle, car la stabilité est le socle de toute solution durable. Le rétablissement d'un pouvoir civil légitime est une condition sine qua non pour renouer pleinement le dialogue avec les indépendantistes du Nord et, éventuellement, avec les groupes armés qui leur sont alliés, en vue d'un retour à la paix intérieure.</p>

<p class="article-paragraph">La vérité évidente est que face aux rébellions qui secouent le Mali depuis l'aube de l'indépendance, le pouvoir central, qu'il soit civil ou militaire, n'a jamais été à la hauteur. Il a été et demeure miné par le clientélisme politique et la démagogie qui empêchent d'appréhender la montée des périls, et par la corruption au sein de l'administration et d'une armée sous-équipée et minée par des problèmes de gestion.</p>

<p class="article-paragraph">Il est sans doute vrai que le pays a été en 2011 la victime collatérale d'une géopolitique qui le dépassait. Sans l'intervention internationale en Libye pour faire tomber Mouammar Kadhafi, les groupes indépendantistes n'auraient probablement pas eu les moyens militaires de défaire l'armée malienne en si peu de temps. Toujours est-il que si l'État avait maintenu une administration forte et une armée républicaine opérationnelle sur l'ensemble du territoire, l'invasion de 2012 aurait pu être contenue dès ses débuts. La crise était évitable avec une gouvernance plus inclusive et une vigilance sécuritaire plus forte et soutenue.</p>

<p class="article-paragraph">L'unité du Mali, qu'elle soit impériale, coloniale ou républicaine, a toujours été ressentie par une partie des populations comme une structure verticale imposée, plutôt que comme la résultante d'un contrat social horizontal librement consenti. À travers le temps, elle a conséquemment été déconstruite par des forces contraires. Cette réalité historique qui perdure fait douter de la possibilité du maintien de l'intégrité du pays.</p>

<h2 class="article-subtitle">Partition ou fédération : le dilemme territorial</h2>

<p class="article-paragraph">La partition est une option qui présente des risques considérables pour les populations qui vivent dans le Nord, le Centre et le Sud. Une partition risquerait de provoquer des déplacements massifs de populations ainsi que des conflits insolubles autour des terres agricoles et des parcours de transhumance du bétail, particulièrement dans le Centre, la croisée des chemins devenue la « zone grise » du pays depuis 2015. Elle donnerait également naissance, au Nord, à un État susceptible de devenir un sanctuaire permanent pour les groupes terroristes et les réseaux de narcotrafic, faute de ressources administratives et militaires suffisantes. Qui plus est, elle serait contraire au principe de l'intangibilité des frontières héritées de la colonisation, et risquerait d'encourager des mouvements sécessionnistes dans d'autres pays d'Afrique de l'Ouest, tel le Sénégal voisin.</p>

<p class="article-paragraph">Si la partition apparaît beaucoup trop risquée, une fédération, ou une confédération, pourrait être une solution de rechange acceptable. Elle apparaît, en effet, comme un modèle de « rupture douce » répondant au besoin de souveraineté du Nord sans briser totalement ses liens historiques avec le Sud et le Centre.</p>

<h2 class="article-subtitle">L'architecture fédérale : une souveraineté partagée</h2>

<p class="article-paragraph">Dans un État fédéral, le Mali resterait une seule entité sur la scène internationale, mais avec une redistribution radicale du pouvoir. Les différentes entités disposeraient de leur propre Constitution, de leur propre police et d'une gestion autonome de leurs ressources naturelles et fiscales. Les citoyens pourraient circuler, travailler et commercer librement d'une entité à l'autre. Le pouvoir central de Bamako ne conserverait que les fonctions régaliennes : la monnaie, la diplomatie et une défense nationale incluant des unités régionales intégrées. Cela permettrait de maintenir l'intégrité territoriale tout en offrant une autonomie quasi-totale aux régions, répondant ainsi aux revendications identitaires et désamorçant la lutte pour le contrôle du pouvoir central, puisque chaque entité deviendrait maîtresse de son destin politique.</p>

<p class="article-paragraph">C'est aussi une vision pragmatique, celle d'un partenariat économique entre plusieurs entités autonomes mais interdépendantes. Dans cette configuration, la relation ne serait plus celle d'un centre avec sa périphérie, mais une synergie entre pôles complémentaires. Une fédération ou une confédération permettrait de maximiser les atouts spécifiques de chaque zone sans la lourdeur d'une administration centralisée souvent perçue comme prédatrice.</p>

<p class="article-paragraph">Dans une confédération, chaque entité gérerait sa propre fiscalité. Cela obligerait chaque État à plus de redevabilité, à être plus responsable de son propre développement, au lieu d'attendre tout d'un budget national souvent mal réparti. Chaque entité disposerait également de ses propres forces de sécurité intérieure, mieux acceptées car issues du terroir. La sécurité serait ainsi assise sur la coopération plutôt que sur la contrainte, et l'armée nationale ne serait plus perçue comme une force étrangère dans certaines localités du Nord.</p>

<p class="article-paragraph">Cette approche de « synergie souveraine » est audacieuse car elle accepte l'idée que l'union forcée est l'ennemie de l'unité réelle. En se séparant juridiquement pour mieux coopérer économiquement et militairement, les différentes entités pourraient enfin sortir de la méfiance et de l'animosité réciproques.</p>

<h2 class="article-subtitle">Les obstacles à une refondation</h2>

<p class="article-paragraph">Cependant, un tel projet demande une classe politique visionnaire, capable de renoncer au prestige du « grand Mali » actuel pour construire une « Union malienne » plus stable et certainement plus riche. Or, pour la Junte, on sent qu'admettre une fédération ou une confédération maintenant pourrait être orgueilleusement perçu comme une capitulation. Pour les mouvements du Nord, leur sensation actuelle de supériorité militaire peut les pousser à l'intransigeance, à exiger une indépendance totale plutôt qu'une synergie institutionnelle.</p>

<p class="article-paragraph">L'autre obstacle réside dans le jeu des intérêts étrangers. Le Mali est aujourd'hui le théâtre d'une « nouvelle guerre froide » où les puissances extérieures, notamment occidentales et russe, cherchent avant tout à sécuriser des zones d'influence, des ressources et des positions géostratégiques à leur profit. Dans l'hypothèse d'une reconfiguration fédérale ou confédérale, ce « jeu des grands » pourrait agir soit comme un accélérateur de division, soit comme un frein total. Les puissances déjà installées pourraient percevoir tout changement de structure étatique comme une menace pour leurs acquis, les poussant à saboter les tentatives de dialogue interne afin de maintenir le statu quo qui les arrange.</p>

<p class="article-paragraph">La réussite des solutions possibles dépendra de la capacité des acteurs maliens à privilégier l'intérêt national et à bâtir un consensus qui respecte la diversité culturelle et historique du pays.</p>

<p class="article-copyright">© 2026 — Analyse géopolitique. Pape Amadou Fall pour Weurseuk — Portail d'Information Sénégal/Afrique de l'Ouest.</p>

</div>`;

try {
  await conn.execute(
    `INSERT INTO editorials (id, title, slug, excerpt, content, coverImageUrl, authorId, categoryId, isPublished, publishedAt, type, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, 'analysis', NOW(), NOW())`,
    [id, title, slug, excerpt, content, null, authorId, categoryId, publishedAt]
  );
  console.log('✅ Article inséré avec succès — ID:', id);
  console.log('URL:', `/international/${slug}`);
} catch (err) {
  if (err.code === 'ER_DUP_ENTRY') {
    await conn.execute(
      `UPDATE editorials SET title=?, slug=?, excerpt=?, content=?, authorId=?, categoryId=?, isPublished=1, publishedAt=?, type='analysis', updatedAt=NOW() WHERE id=?`,
      [title, slug, excerpt, content, authorId, categoryId, publishedAt, id]
    );
    console.log('✅ Article mis à jour — ID:', id);
  } else {
    throw err;
  }
}

await conn.end();
process.exit(0);
