import mysql from "mysql2/promise";

const article = {
  title: "ASER : vingt-cinq ans d’électrification rurale, des engagements inachevés et des capitaux difficiles à suivre",
  slug: "aser-electrification-rurale-engagements-inacheves-capitaux-difficiles-suivre",
  excerpt:
    "Enquête exclusive — Des constats de la Cour des comptes aux décisions de l’ARCOP, ce dossier reconstitue les écarts documentés entre objectifs d’électrification, mobilisation des ressources et traçabilité des financements, sans anticiper sur la procédure judiciaire en cours.",
  authorId: 30001,
  categoryId: 30008,
  publishedAt: new Date(),
  content: `
    <p class="editorial-kicker">Enquête exclusive</p>
    <p class="editorial-standfirst">Créée en 1999 pour porter l’électrification du monde rural, l’Agence sénégalaise d’électrification rurale (ASER) se trouve au croisement d’une promesse de service public et d’une architecture financière complexe. Les documents institutionnels disponibles permettent d’établir des retards de projets, des objectifs non atteints, des déficiences de traçabilité et, pour le marché ASER–AEE Power, une procédure judiciaire désormais ouverte. Ils ne permettent pas, à ce stade, d’imputer une responsabilité pénale individuelle.</p>

    <aside class="editorial-method"><strong>Note de méthode.</strong> Cette enquête sépare les constats établis par les organismes de contrôle, les engagements contractuels, les réponses ou explications attribuées aux acteurs et les faits seulement présumés. Une suspension de marché, un renvoi au procureur ou l’ouverture d’une information judiciaire ne constituent pas une condamnation.</aside>

    <h2>I. Une agence de financement, de maîtrise d’ouvrage et de contrôle</h2>
    <p>Le rapport de la Cour des comptes consacré aux exercices 2018 à 2021 rappelle que l’ASER a été créée par le décret n°99-1254 du 30 décembre 1999, puis placée sous la tutelle technique du ministère chargé de l’Énergie et la tutelle financière du ministère chargé des Finances. Sa mission dépasse l’exécution de travaux : elle porte sur la mobilisation et la gestion de financements, l’appui aux opérateurs, le suivi des projets, les concessions rurales et le contrôle de la conformité des installations.</p>
    <p>Cette position fait de l’agence un point de concentration des engagements publics, des concours de partenaires techniques et financiers et des responsabilités de suivi. Le contrôle de la Cour ne décrit donc pas seulement des retards de chantier : il interroge la capacité institutionnelle à faire correspondre la promesse d’accès universel, l’exécution physique et l’enregistrement comptable des flux.</p>

    <h2>II. Les engagements d’électrification : un écart durable entre cible et réalisation</h2>
    <p>La Cour des comptes indique qu’en 2021 le taux d’électrification rurale était de 58,20 %, contre un objectif de 80 %. Le plan opérationnel alors retenu visait 3&nbsp;216 localités, dont 2&nbsp;702 relevant de la contribution attendue de l’ASER ; 1&nbsp;436 villages étaient électrifiés à l’échéance, soit 53 % de la cible documentée.</p>
    <p>Les projets étudiés donnent la mesure de cet écart. Pour le programme OS MYNA, 368 localités sur 1&nbsp;144 et 16 dorsales sur 20 étaient réalisées à fin 2021. Pour un projet financé à hauteur de 7&nbsp;025&nbsp;441&nbsp;966 FCFA visant 218 localités, 66 étaient électrifiées à l’issue du contrat. Le projet Facilité Énergie UE2, destiné à fournir un service durable à 50&nbsp;000 personnes dans 70 villages, restait inachevé après plusieurs reports. Ces constats n’autorisent pas à réduire les retards à une cause unique : le rapport distingue des difficultés de financement, d’approbation, de trésorerie, de pilotage et d’exécution.</p>

    <h2>III. Ce que les documents établissent sur la traçabilité des ressources</h2>
    <p>Le point le plus sensible du rapport concerne moins l’existence de crédits que la capacité à en suivre la circulation. Selon son tableau de contrôle, des paiements effectués par des partenaires pour le compte de l’ASER ne sont pas retracés dans la comptabilité de l’agence : 78&nbsp;976&nbsp;250 FCFA en 2018, 13&nbsp;175&nbsp;558&nbsp;878 FCFA en 2019, 1&nbsp;770&nbsp;408&nbsp;889 FCFA en 2020 et 10&nbsp;154&nbsp;890&nbsp;040 FCFA en 2021, soit 25&nbsp;179&nbsp;834&nbsp;057 FCFA par addition arithmétique des données publiées.</p>
    <p>Ce total ne vaut pas, à lui seul, preuve de détournement. Il établit une insuffisance de traçabilité comptable que seule l’exploitation des pièces de paiement, des relevés bancaires et des comptes de projet peut lever. La Cour relève également que la Redevance d’électrification rurale, dont les versements de concessionnaires atteignaient 2&nbsp;641&nbsp;094&nbsp;437 FCFA sur la période contrôlée, ne disposait pas d’un compte bancaire dédié au Fonds d’électrification rurale ; la comptabilité ne permettait pas d’isoler les dépenses financées par cette ressource.</p>

    <h2>IV. Le marché ASER–AEE Power : une avance et des questions institutionnelles</h2>
    <p>Les décisions n°107/2024 et n°138/2024 du Comité de règlement des différends de l’ARCOP documentent le dossier relatif à un marché d’électrification rurale impliquant l’ASER, AEE Power EPC SAU et AEE Power Sénégal. La décision n°138 présente un marché principal de 91&nbsp;833&nbsp;980&nbsp;000 FCFA hors taxes portant sur 928 localités. La décision n°107 mentionne une avance de démarrage de 37&nbsp;733&nbsp;592&nbsp;000 FCFA ; la décision n°138 évoque pour sa part une avance correspondant à 40 % du financement, soit 56 millions d’euros. Les documents disponibles ne permettent pas de réconcilier formellement ces deux formulations monétaires : elles doivent donc être conservées distinctement.</p>
    <p>Le 2 octobre 2024, l’ARCOP a prononcé une suspension conservatoire de l’exécution du marché. La décision relève les préoccupations exprimées par Santander et CESCE sur l’utilisation des fonds, ainsi que le retard de transmission de pièces sollicitées auprès de l’ASER. Dans la décision du 24 décembre 2024, le Comité clôt la conciliation et souligne ne pas disposer d’éléments objectifs suffisants pour établir la matérialité et l’imputabilité d’allégations de faux, d’usage de faux et de tentative d’escroquerie ; il les renvoie au procureur compétent.</p>

    <h2>V. Une information judiciaire : ce qu’elle ouvre, ce qu’elle ne tranche pas</h2>
    <p>Le 17 août 2026, l’Agence de presse sénégalaise a rapporté, sur la base d’un communiqué du procureur financier, l’ouverture d’une information judiciaire dans le dossier ASER–AEE Power. Le parquet a évoqué des faits présumés et la poursuite d’investigations, notamment par commission rogatoire internationale et délégation judiciaire.</p>
    <p>Le sens juridique de cette séquence est précis : la justice instruit et recherche les éléments nécessaires à la qualification des faits et à l’identification d’éventuelles responsabilités. Elle ne permet pas de présenter comme acquise la culpabilité d’une personne, d’une société ou d’un responsable administratif. Toute conclusion définitive dépendra des actes d’instruction et, le cas échéant, des décisions de justice.</p>

    <h2>VI. La question publique : rendre les flux vérifiables</h2>
    <p>La principale conclusion de cette enquête est institutionnelle. Lorsqu’une avance de démarrage ou un financement de projet est mobilisé, la documentation publique devrait permettre de distinguer l’engagement, le décaissement, la banque dépositaire, l’affectation, l’exécution des travaux et le solde disponible. À défaut, l’espace entre la ressource annoncée et le résultat constaté devient un espace d’interprétations concurrentes, auquel seules des pièces complètes peuvent répondre.</p>
    <p>Les constats de la Cour des comptes, les procédures de l’ARCOP et l’information judiciaire ouverte ne racontent pas une même chose, ni au même stade. Ils dessinent toutefois une exigence commune : l’électrification rurale ne peut être évaluée seulement par l’annonce des crédits ou des contrats ; elle doit l’être par la matérialité des ouvrages, la lisibilité des comptes et la traçabilité des décisions.</p>

    <hr />
    <h2>Références documentaires</h2>
    <ol>
      <li><a href="https://www.vie-publique.sn/documents/11342/controle-gestion-aser-cour-des-comptes-senegal-2018-2021" target="_blank" rel="noopener noreferrer">Cour des comptes — Rapport d’audit sur la gestion de l’ASER, exercices 2018–2021</a>.</li>
      <li><a href="https://arcop.sn/2024/01/15/decision-2024/" target="_blank" rel="noopener noreferrer">ARCOP — Décision n°107/2024/ARCOP/CRD/DEF du 2 octobre 2024</a>.</li>
      <li><a href="https://www.vie-publique.sn/documents/9040/decision-differend-aee-power-senegal-aee-power-epc-electrification-928-localites-arcop" target="_blank" rel="noopener noreferrer">ARCOP — Décision n°138/2024/ARCOP/CRD/DEF du 24 décembre 2024</a>.</li>
      <li><a href="https://fr.allafrica.com/stories/202608170691.html" target="_blank" rel="noopener noreferrer">APS, reprise par AllAfrica — ouverture d’une information judiciaire dans l’affaire ASER–AEE Power, 17 août 2026</a>.</li>
      <li><a href="https://primature.sn/publications/actualites/conseil-des-ministres-du-05-juin-2024" target="_blank" rel="noopener noreferrer">Primature du Sénégal — Conseil des ministres du 5 juin 2024</a>.</li>
    </ol>
    <p class="editorial-disclaimer"><strong>Avertissement de qualification.</strong> L’ouverture d’une information judiciaire, la suspension d’un marché ou le renvoi d’allégations au procureur ne constituent pas une condamnation. Les personnes et sociétés citées bénéficient de la présomption d’innocence jusqu’à décision définitive.</p>
  `,
};

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const [existing] = await connection.execute("SELECT id FROM editorials WHERE slug = ? LIMIT 1", [article.slug]);

if (existing.length) {
  await connection.execute(
    `UPDATE editorials
       SET title = ?, excerpt = ?, content = ?, authorId = ?, categoryId = ?,
           isPublished = 1, isFeatured = 1, publishedAt = ?, type = 'analysis', useAlias = 0,
           updatedAt = NOW()
     WHERE slug = ?`,
    [article.title, article.excerpt, article.content, article.authorId, article.categoryId, article.publishedAt, article.slug],
  );
  console.log("Enquête ASER existante mise à jour.");
} else {
  const [result] = await connection.execute(
    `INSERT INTO editorials
       (title, slug, excerpt, content, authorId, categoryId, isPublished, isFeatured, publishedAt, createdAt, updatedAt, type, useAlias)
     VALUES (?, ?, ?, ?, ?, ?, 1, 1, ?, NOW(), NOW(), 'analysis', 0)`,
    [article.title, article.slug, article.excerpt, article.content, article.authorId, article.categoryId, article.publishedAt],
  );
  console.log(`Enquête ASER publiée avec l’identifiant ${result.insertId}.`);
}

await connection.end();
