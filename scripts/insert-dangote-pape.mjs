import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Auteur : Pape Amadou Fall — ID 60002
// Catégorie : Analyses — ID 30008
const AUTHOR_ID = 60002;
const CATEGORY_ID = 30008;
const ARTICLE_ID = 1860003;

const title = "La Banque mondiale toujours en service commandé contre l'Afrique ?";
const slug = "banque-mondiale-service-commande-afrique-dangote-nigeria";
const excerpt = "Soixante-cinq ans après les indépendances, le face-à-face entre l'Afrique et les institutions de Bretton Woods n'a rien perdu de sa brutalité. La guerre ouverte entre le Nigeria et la Banque mondiale autour de la méga-raffinerie Dangote en est la dernière et la plus éclatante illustration. Derrière le discours technocratique sur la concurrence et l'efficience du marché se cache une logique implacable : entraver l'industrialisation africaine pour perpétuer la dépendance aux importations.";

const content = `<p class="chapeau">Soixante-cinq ans après les indépendances, le face-à-face entre l'Afrique et les institutions de Bretton Woods n'a rien perdu de sa brutalité. La guerre ouverte entre le Nigeria et la Banque mondiale autour de la méga-raffinerie Dangote en est la dernière et la plus éclatante illustration. Derrière le discours technocratique sur la concurrence et l'efficience du marché se cache une logique implacable : entraver l'industrialisation africaine pour perpétuer la dépendance aux importations.</p>

<p>Pourquoi le Fonds monétaire international et la Banque mondiale semblent-ils hostiles au développement de l'Afrique ? Lancinante depuis les indépendances, la question se pose avec toujours plus d'acuité. Le décalage reste patent entre les pétitions de principe de ces institutions en faveur de la reconstruction du monde et de l'éradication de la misère, et leurs politiques concrètes, dont l'effet récurrent est d'entraver l'industrialisation africaine.</p>

<p>Des experts assurent qu'il n'y a nullement, de la part de la Banque et du Fonds, une volonté délibérée de « bloquer » l'Afrique, mais une fixation sur le dogme libéral de l'avantage comparatif, qui dicte de se spécialiser là où l'on est le plus efficace, tout en ouvrant son marché à la concurrence, surtout lorsque les prix induits sont plus avantageux pour les consommateurs. À l'inverse, le credo de ces institutions est que les politiques industrielles actives — subventions, protections tarifaires, préférences nationales — distordent les marchés et génèrent des inefficiences coûteuses pour les pays concernés.</p>

<p>La logique des institutions de Bretton Woods semble faire abstraction du fait historique qu'aucune des puissances actuelles n'est devenue industrielle en libéralisant tous azimuts son marché à ses débuts. Elles ont toutes, sans exception, massivement protégé leurs industries naissantes derrière des barrières tarifaires et non tarifaires et des subventions publiques, avant de s'ouvrir — ou de se refermer — selon leurs intérêts du moment.</p>

<h2>Obstruction de la trajectoire historique de l'industrialisation</h2>

<p>En interdisant ces outils aux pays africains au nom de la « saine concurrence », les institutions de Bretton Woods leur obstruent délibérément la trajectoire historique de l'industrialisation, privilégiant les secteurs exportateurs de ressources naturelles, généralement exploitées par des entités étrangères, comme au « temps béni des colonies ». Ce ne sont pas des bons samaritains, mais des banques qui servent les intérêts de leurs actionnaires — les pays riches — tout en prétendant servir le développement.</p>

<p>Lorsqu'elles interviennent dans un pays pauvre en imposant la priorité à l'exportation brute de ses matières premières, la privatisation ou l'ouverture à la concurrence de ses secteurs stratégiques, la suppression des subventions aux produits vitaux et la limitation des investissements publics jugés non rentables à court terme, le tout au nom du rétablissement des équilibres macroéconomiques, c'est la souveraineté industrielle du pays qui est sacrifiée sur l'autel des équilibres budgétaires immédiats.</p>

<h2>Dangote en rébellion contre les institutions de Bretton Woods</h2>

<p>L'Afrique commence à se rebeller contre ce diktat d'un autre âge. En est une illustration significative la guerre de tranchées entre le Nigeria et la Banque mondiale, dont l'enjeu central est la raffinerie de pétrole du milliardaire Aliko Dangote, érigée non loin de Lagos et saluée lors de son inauguration, le 22 mai 2023, comme le symbole d'une Afrique de l'Ouest en voie d'émancipation industrielle. D'une capacité de 650 000 barils par jour, c'est la plus grande raffinerie d'Afrique et l'une des plus grandes du monde.</p>

<p>L'argument massue de la Banque, résumé dans son rapport d'avril 2026, est qu'en suspendant les licences d'importation de carburant pour donner les coudées franches à la production locale, quasi exclusivement assurée par la raffinerie Dangote, Abuja crée les conditions d'un risque de monopole systémique. Ce monopole serait d'autant plus préjudiciable aux consommateurs qu'ils paieraient le litre d'essence plus cher qu'avec des carburants importés.</p>

<h2>L'approche de la Banque mondiale est erronée</h2>

<p>Mais l'approche de la Banque mondiale est complètement erronée. Nul besoin d'être « expert énergétique » pour savoir qu'une fois le fret, l'assurance et les coûts logistiques pris en compte, l'essence importée coûterait en réalité plus que ce que projette la Banque mondiale. En vérité, avant la mise en service de la raffinerie Dangote, l'État maintenait bas les prix à la pompe en les subventionnant massivement — à hauteur de plusieurs milliards de dollars par an — sur des carburants importés.</p>

<p>C'est une aberration économique qui grugeait les réserves de devises du pays et enrichissait inversement les compagnies et intermédiaires extérieurs. « Vouloir réintroduire massivement les carburants importés sous prétexte de concurrence, c'est condamner le raffinage local au profit des traders européens et scier la branche de l'indépendance énergétique sur laquelle le Nigeria tente enfin de s'asseoir », résume un économiste nigérian.</p>

<p>On ne se lassera pas de rappeler aux institutions de Bretton Woods, qui font la sourde oreille, que la « protection des industries naissantes » est un outil judicieux dont la quasi-totalité des puissances occidentales et asiatiques d'aujourd'hui ont fait usage lors de leur propre décollage économique. Pour être rentable et amortir ses milliards de dollars d'investissements, Dangote a besoin, au moins dans un premier temps, d'une protection souveraine de l'État nigérian. Les raffineries européennes ou asiatiques concurrentes bénéficient aujourd'hui d'effets d'échelle, d'infrastructures amorties depuis des décennies et de circuits financiers ultra-optimisés, contre lesquels une industrie africaine naissante ne peut lutter à armes inégales, sans la protection souveraine d'un État.</p>

<h2>Une méga-raffinerie, pilier de l'intégration énergétique ouest-africaine</h2>

<p>La méga-raffinerie de Dangote fait vigoureusement son chemin. Boostée par la fermeture du détroit d'Ormuz, elle tourne à plein régime et écoule ses surplus, pas seulement en Afrique de l'Ouest, mais également vers l'Europe, contre des monnaies fortes, se prémunissant ainsi contre les fluctuations du naira. Elle s'impose progressivement comme le pivot énergétique de l'intégration ouest-africaine, d'autant plus solidement que les délais de transport entre les différents ports de la région sont sans commune mesure avec ceux qui séparent la côte ouest-africaine de l'Occident ou du Moyen-Orient ; ce qui allège d'autant ses coûts. En réponse concrète aux pressions internationales, plus Dangote s'imposera comme le fournisseur incontournable et compétitif du continent, plus les arguments en faveur d'un retour aux importations extra-africaines perdront de leur pertinence politique et économique.</p>

<p>La voie de la sagesse économique ne se trouve probablement ni dans le monopole incontrôlé de Dangote, ni dans la libéralisation sauvage préconisée par la Banque mondiale. Le Nigeria, et à travers lui l'Afrique, a besoin d'une régulation forte. L'État nigérian doit jouer son rôle de garde-fou en protégeant sa grande raffinerie contre le dumping, tout en lui exigeant une transparence totale sur les prix et une efficacité industrielle qui préserve le pouvoir d'achat de ses citoyens.</p>

<p>La Banque mondiale a finalement retiré son spécieux rapport de son site, avant de le remplacer par une version plus nuancée et réaliste. Elle maintient l'idée d'une concurrence à terme, mais insiste désormais sur une mise en œuvre progressive et bien séquencée, plutôt que sur une ouverture immédiate. Une retraite diplomatique qui a l'allure d'une grande et belle victoire pour Aliko Dangote et le Nigéria.</p>

<h2>Le Sénégal, une souveraineté énergétique sous pression</h2>

<p>Qu'en sera-t-il pour le Sénégal ? Le pétrole et le gaz, à peine entrés en exploitation, ne tarderont pas à devenir le cœur d'une opposition entre la volonté de transformer localement les ressources et les injonctions des institutions financières internationales, qui, comme on l'a vu, privilégient l'efficience marchande à court terme sur la souveraineté industrielle.</p>

<p>Le parallèle avec le Nigeria est révélateur. À travers le canal de la dette, ces bailleurs conditionnent leur soutien à la suppression des subventions et à la libéralisation des marchés, plaçant Dakar devant un dilemme douloureux entre financement extérieur et ambition nationale. Trois fronts de friction se dessinent. Ce sont la modernisation de la Société Africaine de Raffinage (SAR) face au dogme de la libre concurrence, la volonté de subventionner les prix à la pompe qui heurte la « vérité des prix » que veut imposer le FMI, et le risque de voir tout projet d'extension du raffinage jugé « inefficace » par des institutions qui préfèrent l'exportation brute pour rééquilibrer la balance des paiements.</p>

<p>Pourtant, le Sénégal dispose d'atouts majeurs face à ces pressions. Contrairement au Nigeria, où l'État fait face au monopole privé de la méga-raffinerie Dangote, Dakar s'appuie sur la SAR, un outil industriel public-privé historique, ancré dans le paysage national depuis 1962. Cette dimension institutionnelle rend l'accusation de monopole difficile à soutenir. De plus, la stratégie Gas-to-Power qui vise à substituer le gaz national au fioul importé pour alimenter la Senelec s'intègre habilement dans la rhétorique internationale de la transition énergétique, offrant moins de prise aux critiques extérieures.</p>

<p>Le véritable danger pour le Sénégal n'est donc pas un blocage frontal, mais un étouffement progressif par le marché. Si les coûts de raffinage locaux dépassent les cours mondiaux, la production nationale sera contournée sans qu'il soit besoin de la moindre injonction extérieure. Ironiquement, la menace pourrait venir de la raffinerie Dangote elle-même, qui est en train de prendre ses quartiers sur le marché ouest-africain. Au fond, ce bras de fer illustre le fossé qui sépare des dirigeants africains pensant en termes de temps long et de rattrapage historique, et des technocrates de Washington raisonnant en équilibres budgétaires immédiats, obnubilés par le remboursement des dettes dues aux puissants actionnaires de leurs institutions, leur bras armé dans cette « guerre continue » contre le développement véritable de l'Afrique.</p>

<p class="copyright">© 2026 — Analyse économique · Weurseuk · Pape Amadou Fall · Journaliste et analyste économique</p>`;

const publishedAt = new Date('2026-06-04T18:30:00Z');

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

console.log('✅ Article Dangote / Banque mondiale inséré avec succès');
console.log(`   Slug: ${slug}`);
console.log(`   Auteur ID: ${AUTHOR_ID} (Pape Amadou Fall)`);
console.log(`   Catégorie ID: ${CATEGORY_ID} (Analyses)`);

await conn.end();
