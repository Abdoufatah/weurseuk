import 'dotenv/config';
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;

const title = "Le Sénégal à la croisée des fractures : anatomie d'un rêve dévoyé et des périls qui guettent l'Afrique de l'Ouest";
const slug = "senegal-croisee-fractures-anatomie-reve-devoye-perils-afrique-ouest";
const excerpt = "Il est des moments dans l'histoire politique d'une nation où le silence de l'analyste devient une forme de complicité. Le Sénégal traverse aujourd'hui l'un de ces moments. Entre la dyarchie Faye-Sonko, l'héritage empoisonné de 7 milliards de dollars de dette cachée et les recompositions géopolitiques qui ébranlent l'Afrique de l'Ouest, Bensirac livre l'analyse inaugurale de Weurseuk.";

const content = [
  "Il est des moments dans l'histoire politique d'une nation où le silence de l'analyste devient une forme de complicité. Le Sénégal traverse aujourd'hui l'un de ces moments. Non pas une crise au sens classique du terme — il n'y a ni coup d'État, ni effondrement institutionnel —, mais quelque chose de plus insidieux et, à bien des égards, de plus dangereux : la lente décomposition d'une promesse fondatrice, celle qui avait porté au pouvoir, en mars 2024, le tandem Bassirou Diomaye Faye et Ousmane Sonko.",
  "",
  "C'est précisément parce que cette promesse fut immense — parce qu'elle cristallisait les aspirations d'une génération entière, au Sénégal et bien au-delà — que sa trahison, fût-elle partielle, exige un examen sans concession. C'est à cet exercice que Weurseuk entend se consacrer : non pas le commentaire à chaud, mais l'analyse stratégique de fond, celle qui éclaire les dynamiques profondes par-delà l'écume des événements.",
  "",
  "## La dyarchie impossible : quand deux légitimités s'affrontent au sommet de l'État",
  "",
  "Le 8 avril 2026, des centaines de Sénégalais — travailleurs, syndicalistes, militants de l'opposition — ont défilé dans les rues de Dakar pour dénoncer la hausse du coût de la vie et ce qu'ils qualifient de « promesses trahies ». Cette manifestation, loin d'être un épiphénomène, constitue le symptôme le plus visible d'un malaise structurel qui ronge le sommet de l'État sénégalais.",
  "",
  "Au cœur de ce malaise : une dyarchie de fait entre le président Bassirou Diomaye Faye et le Premier ministre Ousmane Sonko. Ce qui fut présenté comme une alliance organique — le candidat de substitution et l'architecte du mouvement — s'est mué en une rivalité froide dont les manifestations se multiplient depuis le début de l'année 2026.",
  "",
  "Lorsque Sonko déclare devant l'Assemblée nationale : « Je ne travaille pas pour Bassirou Diomaye Faye, je travaille pour le Sénégal », il ne s'agit pas d'une simple formule rhétorique. C'est l'affirmation d'une légitimité concurrente, celle du tribun populaire qui estime que la présidence n'est que le prolongement institutionnel d'un projet politique dont il demeure le dépositaire. En mars 2026, Sonko franchit un seuil supplémentaire en menaçant ouvertement de retirer le PASTEF du gouvernement si le président s'écartait de la vision du parti.",
  "",
  "Face à cette posture, Faye a choisi la voie de l'institutionnalisation. La nomination d'Aminata Touré à la tête de sa coalition, contournant les figures alignées sur Sonko, relève d'une stratégie délibérée d'émancipation présidentielle. Le chef de l'État cherche à incarner une présidence au-dessus des partis, là où son Premier ministre continue de se penser en chef de mouvement révolutionnaire.",
  "",
  "Cette tension n'est pas anecdotique. Elle est structurelle. Elle oppose deux conceptions irréconciliables du pouvoir : l'une institutionnelle et étatique, l'autre idéologique et partisane. L'histoire politique africaine — du Ghana de Nkrumah au Burkina de Sankara — enseigne que de telles dyarchies ne se résolvent jamais dans la durée par le compromis. Elles se dénouent, toujours, par la subordination de l'une des deux légitimités à l'autre.",
  "",
  "## L'héritage empoisonné : 7 milliards de dollars de dette cachée et l'impasse budgétaire",
  "",
  "La crise politique au sommet de l'État se double d'une crise économique dont l'ampleur ne cesse de se révéler. L'audit officiel des finances publiques a mis au jour ce que beaucoup soupçonnaient : l'administration de Macky Sall a légué au Sénégal un passif colossal. Le Fonds monétaire international a confirmé l'existence de 7 milliards de dollars de dette dissimulée entre 2019 et 2024 — soit près de 4 000 milliards de francs CFA. Des sources plus récentes évoquent jusqu'à 13 milliards de dollars de passifs non divulgués.",
  "",
  "Les chiffres sont vertigineux : un déficit budgétaire avoisinant les 14 % du PIB, une dette publique estimée à 132 % du produit intérieur brut à la fin de 2024. Le gouvernement a été contraint de réduire les voyages officiels, tandis que Sonko lui-même a prévenu la population de « difficultés à venir » dans un contexte de récession et de flambée des cours du pétrole.",
  "",
  "C'est ici que la fracture entre les deux têtes de l'exécutif prend une dimension concrète et immédiatement dangereuse. Sur la question cruciale de la restructuration de la dette, Sonko adopte une posture souverainiste, résistant aux prescriptions du FMI, là où Faye fait preuve d'une plus grande flexibilité. Ces signaux contradictoires, émis simultanément depuis le sommet de l'État, ébranlent la confiance des marchés et compliquent les négociations internationales.",
  "",
  "Le paradoxe est cruel : le rêve de rupture porté par le tandem Faye-Sonko se heurte à un mur de réalité budgétaire érigé par le régime qu'ils ont renversé. L'héritage de Macky Sall n'est pas seulement financier ; il est systémique. Il contraint les marges de manœuvre du nouveau pouvoir et transforme chaque promesse non tenue en carburant pour la contestation sociale.",
  "",
  "## L'Afrique de l'Ouest dans l'œil du cyclone : recompositions sécuritaires et fractures géopolitiques",
  "",
  "Le Sénégal ne saurait être analysé en vase clos. Sa crise interne s'inscrit dans un contexte régional d'une complexité sans précédent, où les recompositions géopolitiques redessinent les équilibres de l'Afrique de l'Ouest à une vitesse que peu d'observateurs avaient anticipée.",
  "",
  "Le Sahel est désormais qualifié d'« épicentre du terrorisme mondial » par le Global Terrorism Index. Les régimes militaires du Mali, du Burkina Faso et du Niger, regroupés au sein de l'Alliance des États du Sahel, ont consommé leur rupture avec la CEDEAO et opéré un basculement stratégique vers Moscou. Cette reconfiguration n'est pas simplement diplomatique : elle traduit l'émergence d'un nouvel axe sécuritaire transcontinental, de la mer Rouge au Sahel, qui bouleverse les architectures de sécurité héritées de la période postcoloniale.",
  "",
  "Dans ce paysage en mutation, le Sénégal occupe une position singulière et paradoxale. Sonko, en accusant publiquement Donald Trump de « déstabiliser le monde » lors d'une conférence internationale à Dakar, a posé un acte de souveraineté discursive qui tranche avec la prudence diplomatique traditionnelle de Dakar. Mais cette posture, si elle résonne auprès d'une opinion publique africaine avide de souveraineté, comporte des risques calculables : elle expose le Sénégal à des représailles économiques potentielles à un moment où sa situation budgétaire ne lui permet aucune marge d'erreur.",
  "",
  "La réactivation des réseaux proxy iraniens en Afrique de l'Ouest, la crise du détroit d'Ormuz et ses répercussions sur les prix de l'énergie, l'érosion de l'influence américaine au profit de la Russie dans le Sahel — autant de dynamiques qui transforment l'environnement stratégique du Sénégal et exigent, de la part de ses dirigeants, une cohérence et une clarté de vision que la dyarchie actuelle rend structurellement difficile.",
  "",
  "## La trahison du rêve : quand la rupture promise reproduit les logiques qu'elle prétendait abolir",
  "",
  "Il faut le dire avec la rigueur que commande l'analyse : ce qui se joue au Sénégal en ce printemps 2026 n'est pas simplement une crise de gouvernance. C'est la mise à l'épreuve d'un paradigme — celui de la « rupture systémique » portée par une nouvelle génération de leaders africains.",
  "",
  "Lorsque Faye et Sonko ont accédé au pouvoir en 2024, ils incarnaient une promesse qui dépassait largement les frontières du Sénégal. Ils étaient la preuve vivante qu'un changement radical pouvait advenir par les urnes, que la jeunesse africaine pouvait non seulement contester, mais gouverner. Cette promesse a eu un écho continental, du Nigeria au Kenya, de la Côte d'Ivoire à la RDC.",
  "",
  "Deux ans plus tard, le constat est amer. Non pas que tout ait échoué — les institutions démocratiques tiennent, la liberté de la presse demeure, le cadre constitutionnel est respecté. Mais la trajectoire du pouvoir ne correspond pas à ce qui avait été annoncé. Les réformes structurelles tardent. Le coût de la vie augmente. La dette écrase les marges de manœuvre. Et au sommet, deux hommes qui devaient incarner l'unité d'un projet se disputent la primauté dans un jeu de pouvoir qui rappelle, par bien des aspects, les dynamiques qu'ils prétendaient abolir.",
  "",
  "Les étudiants de l'Université Cheikh Anta Diop qui manifestent leur frustration ne sont pas des opposants au projet initial. Ils en sont les enfants déçus. Et c'est précisément cette déception — celle d'une base qui avait cru — qui constitue le danger le plus grave pour le tandem au pouvoir.",
  "",
  "## Weurseuk : pour une intelligence stratégique au service du débat public",
  "",
  "C'est dans ce contexte que Weurseuk prend la parole. Non pas comme un média de plus dans un paysage déjà saturé, mais comme un espace d'analyse stratégique dont l'ambition est de fournir les clés de compréhension que l'actualité immédiate ne peut offrir.",
  "",
  "Mon parcours de chercheur en sciences religieuses, sociétés et dynamiques transnationales, conjugué à mon expérience de journaliste et d'analyste politique spécialisé sur le Sénégal, m'a enseigné une chose fondamentale : les crises politiques africaines ne peuvent être comprises qu'à travers une grille de lecture multidisciplinaire. Les tensions Faye-Sonko ne relèvent pas uniquement de la science politique ; elles mobilisent la sociologie des mouvements sociaux, l'économie politique de la dette, la géopolitique des alliances régionales, et même l'anthropologie politique du charisme et de la légitimité.",
  "",
  "C'est cette approche — rigoureuse, multidisciplinaire, irréductible aux simplifications — que Weurseuk entend porter. Depuis Dakar, avec le Sénégal comme ancrage, l'Afrique de l'Ouest comme périphérie naturelle, et le monde comme horizon.",
  "",
  "Le Sénégal mérite mieux que le commentaire partisan. L'Afrique de l'Ouest mérite mieux que le sensationnalisme sécuritaire. Et les lecteurs méritent mieux que l'approximation. C'est à cette triple exigence que chaque ligne publiée sur ce portail sera soumise.",
  "",
  "Le rêve de 2024 n'est pas mort. Mais il est à la croisée des chemins. Et c'est précisément dans ces moments d'incertitude que l'analyse éclairée devient non pas un luxe, mais une nécessité démocratique."
].join("\n");

const breakingHeadline = "ÉDITORIAL INAUGURAL | Bensirac : « Le Sénégal à la croisée des fractures » — Analyse stratégique sur la dyarchie Faye-Sonko et les périls géopolitiques";

async function publishEditorial() {
  const connection = await mysql.createConnection(DATABASE_URL);
  
  try {
    // Insert the editorial
    const [result] = await connection.execute(
      "INSERT INTO editorials (title, slug, excerpt, content, isPublished, isFeatured, categoryId, publishedAt, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())",
      [title, slug, excerpt, content, true, true, 1]
    );
    
    console.log('Editorial published successfully! ID:', result.insertId);
    
    // Add a breaking news for the editorial launch
    await connection.execute(
      "INSERT INTO breaking_news (headline, sourceUrl, sourceName, isActive, createdAt) VALUES (?, ?, ?, ?, NOW())",
      [breakingHeadline, "/editorial/senegal-croisee-fractures-anatomie-reve-devoye-perils-afrique-ouest", "Weurseuk", true]
    );
    
    console.log('Breaking news for editorial launch created!');
    
    // Deactivate old test breaking news
    const [updateResult] = await connection.execute(
      "UPDATE breaking_news SET isActive = false WHERE headline LIKE '%Test%'"
    );
    
    console.log('Old test breaking news deactivated:', updateResult.affectedRows, 'rows');
    
  } catch (error) {
    console.error('Error publishing editorial:', error);
  } finally {
    await connection.end();
  }
}

publishEditorial();
