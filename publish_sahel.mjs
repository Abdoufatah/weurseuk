import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const title = "Sahel : Derrière la menace jihadiste, les mécanismes silencieux d'une déstabilisation régionale et l'ombre des puissances étrangères";
const slug = "sahel-menace-jihadiste-destabilisation-regionale-puissances-etrangeres";
const excerpt = "Par-delà les lectures simplistes d'un « projet islamique », l'expansion des groupes armés au Sahel révèle une réalité plus complexe — et plus préoccupante pour des pays comme le Sénégal et le Maroc — où l'instrumentalisation du wahhabisme et les intérêts des puissances non africaines jouent un rôle déterminant. Comprendre cette réalité n'est pas seulement un exercice académique : c'est une nécessité politique et civilisationnelle.";

const content = `<h2>I. Le Sahel, épicentre d'une crise multidimensionnelle</h2>

<p>Le Sahel, cette vaste bande semi-aride qui s'étend de l'Atlantique à la mer Rouge, est aujourd'hui bien plus qu'une simple réalité géographique. Il est devenu le miroir brisé des vulnérabilités structurelles des États africains postcoloniaux et l'épicentre d'une crise systémique où se nouent, en une trame serrée, fragilités internes, instrumentalisation religieuse et appétits géostratégiques extérieurs.</p>

<p>En tant que spécialiste en information documentaire et chercheur en religions, sociétés et dynamiques transnationales, je ne peux m'en tenir à la seule surface des événements. L'analyse rigoureuse de ce dossier impose de recourir simultanément à la critique des sources — distinguer propagande, désinformation et donnée vérifiée —, à la sociologie des religions, à la géopolitique comparée et à la mémoire longue des sociétés sahélo-maghrébines. C'est cet outillage pluridisciplinaire que cet éditorial entend mobiliser.</p>

<p>La menace jihadiste, souvent présentée par les médias dominants comme la cause première de l'instabilité, n'est en réalité qu'une manifestation symptomatique de dynamiques plus profondes. Elle est à la fois effet — des fractures sociales, économiques et identitaires — et outil — au service d'agendas géostratégiques qui dépassent largement la région. Toute lecture qui s'arrête à la surface doctrinale ou sécuritaire du phénomène rate l'essentiel.</p>

<blockquote><em>Note méthodologique : Cet éditorial s'appuie sur un corpus documentaire croisant rapports de l'International Crisis Group (ICG), données ACLED, Policy Papers du Policy Center for the New South (PCNS, Rabat), productions de l'IRIS, de l'ISS Africa, des études de terrain publiées par l'EMP de Bamako, ainsi que les travaux académiques sur le salafisme ouest-africain. La pluralité des sources est ici un choix épistémologique délibéré.</em></blockquote>

<h2>II. Mali 2012 : le point de bascule et l'économie politique du chaos</h2>

<p>Depuis la crise de 2012, le Mali s'est imposé comme le point de bascule d'une recomposition sécuritaire profonde en Afrique de l'Ouest. L'effondrement partiel de l'État malien — accentué par la déstabilisation de la Libye en 2011 et la circulation incontrôlée d'armements — a ouvert un vide institutionnel et territorial que les groupes affiliés à Al-Qaeda (AQMI, Ansar Dine) et à l'État islamique (EIGS) ont su coloniser avec une redoutable efficacité adaptative.</p>

<p>L'intervention française (Opération Serval, puis Barkhane) a certes contenu une avancée rapide vers Bamako, mais elle n'a jamais résolu les contradictions fondamentales : gouvernance défaillante, absence de l'État dans les zones périphériques, marginalisation des populations peules et touarègues, impunité des forces de sécurité maliennes. Comme le démontrent les données de l'Armed Conflict Location &amp; Event Data Project (ACLED) et les analyses de l'ICG, la menace jihadiste ne s'est pas éteinte : elle s'est fragmentée, localisée, hybridée avec la criminalité organisée et les conflits intercommunautaires.</p>

<p>C'est ici que la posture du spécialiste en information documentaire devient indispensable : il faut cartographier les flux — d'armes, de fonds, d'idéologies, de combattants — pour comprendre comment le désordre se reproduit. Et cette cartographie révèle, inévitablement, que le chaos sahélien n'est pas seulement subi. Il est, pour certains acteurs, productif.</p>

<h3>Le sous-sol comme vecteur de déstabilisation</h3>

<p>Le Sahel recèle des richesses colossales : or, uranium, lithium, pétrole, phosphate, fer, manganèse. Ces ressources, vitales pour la transition énergétique mondiale et les industries de pointe, transforment la région en un objet de convoitise intense. Or, un État fragilisé par l'insécurité est un État incapable de négocier des contrats équitables, de contrôler l'exploitation de son sous-sol ou de défendre sa souveraineté économique.</p>

<p>La corrélation entre zones d'insécurité et zones d'extraction n'est pas fortuite. Elle procède, au moins partiellement, d'une logique que certains analystes désignent sous le concept de <strong>« déstabilisation utile »</strong> : maintenir un niveau d'instabilité suffisant pour affaiblir les États, sans pour autant les faire s'effondrer totalement, de manière à sécuriser l'accès aux ressources sans en assumer les coûts diplomatiques ou sécuritaires officiels.</p>

<blockquote><em>L'urgence, pour le chercheur comme pour le décideur, est de ne pas se laisser enfermer dans le cadre narratif de la « guerre contre le terrorisme » qui, depuis vingt ans, a servi à légitimer des présences militaires étrangères dont les bilans, en termes de stabilisation, sont au mieux contestables, au pire contre-productifs.</em></blockquote>

<h2>III. Le wahhabisme au Sahel : anatomie d'une transplantation doctrinale</h2>

<p>L'une des dimensions les plus insidieuses — et les moins bien documentées par les médias généralistes — de la crise sahélienne réside dans la transformation profonde du paysage religieux sous l'effet de l'implantation wahhabite. En tant que chercheur spécialisé dans les dynamiques religieuses transnationales, je souhaite ici dépasser les simplifications habituelles pour proposer une lecture plus fine.</p>

<h3>Genèse et définition : une doctrine arabe dans un monde africain</h3>

<p>Le wahhabisme est un courant doctrinal sunnite ultraconservateur né au XVIII<sup>e</sup> siècle dans la péninsule arabique, sous l'impulsion de Mohammed ben Abdelwahhab, en alliance fondatrice avec la maison des Saoud. Il repose sur un littéralisme scripturaire radical, le rejet de toute <em>bid'ah</em> (innovation religieuse), la condamnation des pratiques soufies, des cultes des saints et de l'ensemble des médiations rituelles qui caractérisent l'islam populaire africain.</p>

<p>Cette doctrine est, par construction, exogène aux sociétés sahéliennes. L'islam de cette région s'était historiquement construit dans une interaction fertile avec les réalités locales : confréries soufies (Mouridiyya, Tidjaniyya, Qadiriyya), cultes des saints et marabouts, pratiques syncrétiques issues des religions traditionnelles, rôle des femmes dans la transmission du savoir religieux. Cet islam de la tolérance et de la médiation constituait un puissant facteur de cohésion sociale et de régulation des conflits.</p>

<h3>Les vecteurs de propagation : une ingénierie sociale du religieux</h3>

<p>Dès les années 1970-1980, les pétrodollars du Golfe ont financé une transformation silencieuse mais radicale du paysage religieux sahélien. Les mécanismes en sont multiples et convergents :</p>

<p><strong>1. L'infrastructure religieuse comme levier d'influence :</strong> Des mosquées modernes, des madrasas bien équipées, des centres islamiques dotés de bibliothèques ont été implantés dans des zones où l'État était absent ou défaillant. Ces infrastructures n'étaient pas neutres : elles venaient avec des imams formés en Arabie Saoudite ou au Qatar, diffusant une vision de l'islam en rupture avec les traditions locales.</p>

<p><strong>2. La formation des clercs comme outil de transformation générationnelle :</strong> L'octroi massif de bourses d'études dans les universités islamiques de Médine et de Riyad a produit une nouvelle génération de religieux sahéliens formés à l'extérieur, revenus avec une légitimité renforcée par le prestige des lieux de formation, mais aussi avec une vision de l'islam en contradiction profonde avec celle de leurs aînés.</p>

<p><strong>3. L'humanitaire comme prosélytisme :</strong> Des ONG islamiques, financées par les mêmes sources, ont opéré dans les zones les plus pauvres, conditionnant parfois l'aide matérielle à l'adoption de pratiques wahhabites. Cette stratégie — que les spécialistes du prosélytisme comparé désignent comme « aide conditionnelle » — crée une dépendance économique qui sape les liens communautaires traditionnels.</p>

<p><strong>4. La révolution numérique comme accélérateur :</strong> Chaînes satellitaires, sites web, réseaux sociaux : les contenus wahhabites ont su utiliser les nouvelles technologies pour contourner les autorités religieuses locales et atteindre directement les jeunes.</p>

<h3>Impact sociologique : déculturation et fabrique de la radicalité</h3>

<p>D'un point de vue sociologique, l'impact du wahhabisme au Sahel est celui d'un agent de déculturation systématique. En délégitimant les confréries, les marabouts, les pratiques ancestrales, il a créé un vide identitaire que les groupes jihadistes ont pu combler avec leur offre de sens, de solidarité et d'appartenance.</p>

<p>Il importe cependant de ne pas établir une équation simpliste entre wahhabisme et jihadisme. La grande majorité des wahhabites et salafistes sahéliens ne sont pas violents. Mais le wahhabisme prépare un terrain cognitif particulier : il habitue les fidèles à considérer les pratiques locales comme illicites, à percevoir les autorités religieuses traditionnelles comme corrompues, et à accepter une vision binaire du monde entre islam « authentique » et société « dégénérée ».</p>

<blockquote><em>Observation de terrain (contexte marocain) : Le Maroc offre un cas d'étude comparatif instructif. Confronté à des dynamiques similaires d'infiltration salafiste dans les années 1990-2000, l'État marocain a développé une politique religieuse volontariste : réforme du Conseil des Oulémas, formation centralisée des imams, promotion du « islam du juste milieu » (wasatiyya), rayonnement continental de l'Institut Mohammed VI pour la formation des imams.</em></blockquote>

<h2>IV. La stratégie du chaos contrôlé : violence, ressources et puissances étrangères</h2>

<h3>Le mécanisme de la déstabilisation utile</h3>

<p>Un État en guerre est un État affaibli dans ses capacités de négociation. Il ne peut contrôler efficacement l'exploitation de ses ressources naturelles, ni imposer des normes environnementales ou sociales aux entreprises étrangères qui y opèrent. Les concessions minières signées dans un contexte de crise sont structurellement défavorables aux États hôtes.</p>

<p>Par ailleurs, la menace terroriste — réelle ou instrumentalisée — justifie le recours à des sociétés de sécurité privées ou à des groupes paramilitaires étrangers qui, en échange de leur protection, obtiennent des accès directs aux zones extractives. Le groupe Wagner — rebaptisé Africa Corps — illustre parfaitement ce modèle au Mali, au Burkina Faso et au Niger : sécurité contre ressources, sans les contraintes des accords intergouvernementaux formels.</p>

<h3>Les acteurs extérieurs : cartographie d'une compétition tous azimuts</h3>

<p><strong>La Russie :</strong> À travers Africa Corps, la Russie a su combler le vide laissé par les départs français au Mali, au Burkina Faso et au Niger. Son modèle est pragmatique : soutien militaire et sécuritaire aux régimes en difficulté, en échange de concessions minières directes (or, uranium). Cette stratégie s'accompagne d'une campagne de désinformation ciblée, exploitant les sentiments anti-français et les frustrations postcoloniales.</p>

<p><strong>La Chine :</strong> La Chine maintient une présence économique significative au Sahel, axée sur les infrastructures et l'extraction de matières premières. Sa politique de non-ingérence déclarée lui confère une image avantageuse, mais ses contrats — souvent opaques — et la « diplomatie de la dette » qu'ils impliquent créent des dépendances structurelles.</p>

<p><strong>La Turquie :</strong> La Turquie développe une stratégie d'influence multidimensionnelle : liens religieux et éducatifs, bourses d'études, exportation de drones Bayraktar TB2, formation militaire. Cette présence, perçue comme moins intrusive que celle des puissances occidentales, repose également sur une rhétorique de solidarité islamique qui mérite une analyse critique.</p>

<p><strong>Les puissances occidentales :</strong> La France subit la conséquence de décennies d'ambiguïté entre lutte antiterroriste et préservation d'intérêts néocoloniaux — la « Françafrique » — qui a fini par générer un rejet populaire profond dans plusieurs pays. Son retrait forcé du Mali, du Burkina Faso et du Niger n'est pas seulement une défaite militaire ; c'est une crise de légitimité politique.</p>

<blockquote><em>Perspective marocaine : Le Maroc, à travers sa diplomatie religieuse (formation des imams africains, réseau des oulémas africains) et ses investissements économiques croissants en Afrique subsaharienne, constitue un acteur singulier dans ce paysage. Il ne s'agit pas ici d'un acteur uniquement sécuritaire ou extractiviste, mais d'un pays qui cherche à projeter un modèle de gouvernance religieuse et de développement intégré.</em></blockquote>

<h2>V. Le Sénégal face au risque : résilience structurelle et vulnérabilités réelles</h2>

<p>Le Sénégal présente, à première vue, des atouts considérables face à la menace jihadiste. Sa stabilité institutionnelle, sa tradition démocratique, et surtout le rôle structurant des grandes confréries soufies — Mouridiyya, Tidjaniyya, Qadiriyya, Layéniyya — constituent des facteurs de résilience dont il faut mesurer la réalité sans les idéaliser.</p>

<p>Les confréries sénégalaises ne sont pas simplement des organisations religieuses. Elles sont des systèmes intégrés de socialisation, de régulation économique, de médiation politique et de production identitaire. Le cheikh est à la fois guide spirituel, autorité morale, recours en cas de conflit et opérateur économique. Cette densité institutionnelle informelle constitue un rempart réel contre la radicalisation.</p>

<p>Mais ce rempart présente des failles. La crise des confréries — vieillissement des chefs, contestation par une jeunesse connectée et déracinée, concurrence du wahhabisme dans les zones urbaines périphériques — est réelle. La pauvreté dans certaines régions (Casamance, zones frontalières avec le Mali, Ferlo) crée des terrains de recrutement pour des discours alternatifs.</p>

<p>Le risque pour le Sénégal n'est pas celui d'une islamisation brutale par la force. C'est celui d'une <strong>infiltration progressive</strong>, exploitant les failles sociales, doctrinales et institutionnelles. Et ce risque est amplifié par les dynamiques régionales : la déstabilisation du Mali crée des zones de non-droit aux portes du pays.</p>

<h2>VI. Repenser la réponse : vers une souveraineté renouvelée et une résilience endogène</h2>

<p>La crise sahélienne appelle une réponse qui soit à la hauteur de sa complexité. Six axes méritent d'être prioritairement investis :</p>

<p><strong>1. Réarmement doctrinal et protection du patrimoine religieux :</strong> Il est impératif de soutenir activement les formes d'islam traditionnelles — soufisme, jurisprudence malékite, culte des saints dans ses dimensions sociologiques — comme rempart contre la déculturation wahhabite.</p>

<p><strong>2. Souveraineté extractive et contrats équitables :</strong> Les États sahéliens doivent reprendre le contrôle effectif de leurs ressources naturelles. Cela implique de renégocier les contrats miniers pour garantir une redistribution équitable des revenus.</p>

<p><strong>3. Restauration de l'État et investissement social massif :</strong> Le vide institutionnel est la première ressource des groupes jihadistes. Combler ce vide suppose un réinvestissement massif dans les services publics de base dans les zones périphériques.</p>

<p><strong>4. Renseignement local et prévention des conflits communautaires :</strong> Le renseignement humain, fondé sur une connaissance fine des dynamiques locales, est plus efficace que les approches technologiques.</p>

<p><strong>5. Diplomatie africaine unie et partenariats équilibrés :</strong> Face à des menaces transnationales et à des ingérences multiples, une coordination régionale forte est indispensable. La CEDEAO doit être réformée et renforcée.</p>

<p><strong>6. Information documentaire et contre-narratif :</strong> En ma qualité de spécialiste en information documentaire, j'insiste sur un point souvent négligé : la bataille des récits est aussi déterminante que la bataille des armes.</p>

<h2>Conclusion : Une menace systémique qui appelle une réponse civilisationnelle</h2>

<p>L'expérience sahélienne montre que la progression des groupes jihadistes procède d'un système adaptatif, capable d'exploiter simultanément les failles politiques, économiques, sociales, doctrinales et informationnelles. Cette menace est intrinsèquement liée aux rivalités géopolitiques mondiales, à la convoitise des ressources et à l'instrumentalisation du religieux par des acteurs dont les agendas n'ont souvent rien à voir avec la foi.</p>

<p>Pour le Sénégal, pour le Maroc et pour l'ensemble de la sous-région, le défi est clair : il ne s'agit pas de contenir une idéologie abstraite par des moyens uniquement militaires, mais de prévenir les conditions concrètes qui permettent à ces groupes de s'implanter et de prospérer. Il s'agit d'affirmer une souveraineté pleine et entière — politique, économique, doctrinale et informationnelle — contre les instrumentalisations internes et les ingérences externes.</p>

<p>Il s'agit, en définitive, d'un <strong>enjeu civilisationnel</strong> : celui de sociétés africaines qui décident de leur propre destin, fondé sur leurs valeurs, leurs traditions et leur volonté collective. Le Sahel n'est pas condamné. Mais sa résilience ne viendra pas de l'extérieur. <strong>Elle sera endogène, ou elle ne sera pas.</strong></p>

<hr/>

<h3>Note de l'auteur</h3>
<p>Cet éditorial a été rédigé depuis une posture délibérément pluridisciplinaire, croisant les outils de la science de l'information documentaire, de la sociologie des religions, de la géopolitique comparée et de l'observation de terrain dans le contexte marocain et sahélien. Il ne prétend pas à l'exhaustivité, mais à la rigueur : chaque affirmation est étayée par des sources académiques ou institutionnelles référencées.</p>

<h3>Références et sources documentaires</h3>
<ol>
  <li>International Crisis Group. <em>Crise au Mali : comprendre les dynamiques de la violence.</em></li>
  <li>ACLED. <em>Données sur les conflits et la violence politique en Afrique de l'Ouest.</em> acleddata.com</li>
  <li>Policy Center for the New South. (2026). <em>La souveraineté des pays de l'Alliance du Sahel : ambitions et contraintes.</em> Rabat : PCNS.</li>
  <li>France 24. (2025). <em>Or, lithium, uranium... Washington mise sur le commerce pour renouer avec les juntes au Sahel.</em></li>
  <li>EMP Bamako. (2024). <em>Le djihadisme et le terrorisme dans la région du Sahel : entre enjeu géopolitique et intérêt économique.</em></li>
  <li>IRIS. <em>Sahel : de quelles luttes d'influence parle-t-on ?</em> iris-france.org</li>
  <li>Policy Center for the New South. (2025). <em>Genèse et évolution des groupes extrémistes armés au Sahel.</em> Rida Lyammouri &amp; Fadoua Ammari.</li>
  <li>ISS Africa. <em>US minerals diplomacy tests Sahel countries' partnership choices.</em> issafrica.org</li>
  <li>Madore, F. (2017). <em>Le nouveau dynamisme du salafisme en Afrique de l'Ouest.</em></li>
  <li>Institut Mohammed VI pour la formation des imams, morchidines et morchidates. <em>Rapports d'activité 2022-2024.</em></li>
  <li>Coulon, C. (1981). <em>Le marabout et le prince : islam et pouvoir au Sénégal.</em> Paris : Pédone.</li>
  <li>Loimeier, R. (2016). <em>Islamic Reform in Twentieth-Century Africa.</em> Edinburgh University Press.</li>
</ol>

<p><em>© 2026 — Éditorial analytique | Abdou Fatah FALL, Chercheur en Religions, Sociétés &amp; Dynamiques Transnationales — Rabat, Maroc</em></p>`;

// Dépublier les anciens éditoriaux Bensirac de la position "featured"
await conn.execute(
  'UPDATE editorials SET isFeatured = 0 WHERE categoryId = 30009 AND isFeatured = 1'
);
console.log('Anciens éditoriaux dé-featuredés');

// Insérer le nouvel éditorial
const [r] = await conn.execute(
  `INSERT INTO editorials
    (title, slug, excerpt, content, categoryId, authorId, isPublished, isFeatured, publishedAt, createdAt, updatedAt)
   VALUES (?, ?, ?, ?, 30009, 30001, 1, 1, NOW(), NOW(), NOW())`,
  [title, slug, excerpt, content]
);
console.log('Éditorial Sahel publié, ID:', r.insertId);

// Vérification
const [check] = await conn.execute(
  `SELECT e.id, LEFT(e.title,80) as title, e.isPublished, e.isFeatured, jp.name, jp.photoUrl
   FROM editorials e
   JOIN journalist_profiles jp ON e.authorId = jp.id
   WHERE e.id = ?`,
  [r.insertId]
);
console.log(JSON.stringify(check[0], null, 2));

await conn.end();
