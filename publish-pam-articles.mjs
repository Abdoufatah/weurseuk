import 'dotenv/config';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { editorials } from './drizzle/schema.ts';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

// Article portrait Bensirac sur Dr Adama Aly Pam
const portraitContent = `# Adama Aly Pam : L'archiviste qui interroge la mémoire africaine

Dans le paysage intellectuel africain contemporain, Adama Aly Pam incarne une voix singulière : celle d'un homme qui interroge la mémoire pour mieux comprendre le présent.

Titulaire de deux doctorats, de Paris Sciences Lettres et de l'UCAD, il est formé à l'exigence rigoureuse de l'École nationale des chartes. Il fait des archives non pas de simples dépôts du passé, mais des lieux vivants où se jouent les rapports de pouvoir, de savoir et d'identité.

Du Sénégal à Paris, en passant par le Canada et le Togo, son parcours témoigne d'un engagement constant pour la valorisation des patrimoines documentaires africains.

À l'UNESCO, où il dirige les archives et bibliothèques, il œuvre à inscrire la mémoire dans une dynamique globale, tout en posant une question essentielle : qui écrit l'histoire, et à partir de quelles traces ?

Son travail s'inscrit ainsi dans une réflexion plus large sur la décolonisation des savoirs et la souveraineté intellectuelle du continent africain.`;

const portraitSlug = 'adama-aly-pam-archiviste-memoire-africaine';
const portraitData = {
  title: 'Adama Aly Pam : L\'archiviste qui interroge la mémoire africaine',
  slug: portraitSlug,
  excerpt: 'Portrait d\'un intellectuel qui interroge la mémoire pour mieux comprendre le présent. Archiviste, paléographe, directeur des archives et bibliothèques à l\'UNESCO.',
  content: portraitContent,
  imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663077132964/gZtFuPhj9JU8iVtsGM9iQB/a278340b-86f0-44f4-89e9-52c775f034f3_e8fbbf3d.jpg',
  region: 'senegal',
  publishedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

await db.insert(editorials).values(portraitData);
console.log('✓ Article portrait Bensirac publié:', portraitSlug);

// Article du Dr Adama Aly Pam
const pameContent = `# La Bibliothèque universitaire de Dakar et la naissance de l'école de bibliothécaires

Lorsque se posa la question de l'implantation du Centre régional de formation des bibliothécaires (CRFB), la présence de la Bibliothèque universitaire de Dakar pesa de manière décisive dans le choix du Sénégal. Le projet initial porté par l'UNESCO prévoyait la création simultanée d'une école de bibliothécaires et d'une bibliothèque pilote de lecture publique appelée à servir de centre d'application pédagogique. Ce schéma ne fut toutefois que partiellement retenu : la bibliothèque pilote fut finalement installée à Abidjan, tandis que Dakar conserva l'école. Ce glissement eut des conséquences structurantes, faisant de la Bibliothèque universitaire, par défaut mais par nécessité, le principal terrain d'apprentissage et d'expérimentation pour les futurs bibliothécaires formés au CRFB.

Cette situation plaça la Bibliothèque universitaire de Dakar au cœur du dispositif de formation, dans un rôle à la fois central et ambivalent. Les quatre bibliothécaires professionnels alors en poste, tous français, constituaient les seuls spécialistes exerçant en Afrique de l'Ouest francophone. Leur expertise les désignait naturellement comme les principaux enseignants et encadreurs des élèves du Centre. Leur position dominante dans le champ professionnel en faisait des acteurs clés de la réussite du projet, mais leur engagement resta mesuré. Le conservateur en chef donna un accord de principe pour l'enseignement, sans réel enthousiasme, et les négociations avec la direction du CRFB se révélèrent longues et difficiles. Le recteur de l'Université de Dakar, Lelièvre, archiviste paléographe, dut lui-même intervenir afin de tenter de lever les réticences et de faciliter la coopération.

Ces résistances s'expliquent pour une large part par la situation institutionnelle de la Bibliothèque universitaire elle-même et par le profil des bibliothécaires concernés, peu familiers des enjeux de la lecture publique qui constituaient pourtant un axe fort du projet du CRFB. Installée dans des locaux provisoires, exigus et dispersés, la bibliothèque peinait en outre à remplir pleinement sa mission académique. Dans son rapport d'avril 1962, Michel Bouvy, directeur du Centre, dressait un constat sévère, allant jusqu'à affirmer que la bibliothèque « n'avait pas d'âme ». Il soulignait en particulier les carences de la section Droit et Lettres, pourtant la seule susceptible de soutenir les enseignements du Centre : absence d'usuels et d'ouvrages de référence en libre accès, inexistence de périodiques en salle de travail, bibliographies reléguées en magasin et classées selon des critères peu fonctionnels. Les tentatives de réorganisation engagées se heurtèrent à une forte inertie institutionnelle, généralement justifiée par un prétendu manque de place que Bouvy jugeait largement infondé.

Ces contraintes matérielles et organisationnelles pesaient directement sur la qualité des enseignements dispensés, notamment en bibliographie, qui exigeaient un accès direct et autonome aux outils documentaires. Elles révèlent les contradictions d'une bibliothèque universitaire appelée à jouer un rôle de centre d'application pédagogique sans disposer encore des conditions spatiales et fonctionnelles adéquates.

Dans le même temps, se posa la question stratégique de la direction future du CRFB. Soucieuse d'assurer la pérennité de l'institution au terme de son financement initial de quatre ans, l'UNESCO cherchait à identifier et à former un cadre sénégalais appelé à prendre la relève. Les démarches entreprises en 1962 restèrent sans succès, en raison du nombre encore limité de diplômés de niveau licence et de la concurrence d'autres secteurs professionnels plus attractifs. Michel Bouvy insista alors auprès des autorités sur la nécessité de définir clairement le statut, les conditions matérielles et les perspectives de carrière du futur directeur, condition indispensable pour susciter des candidatures solides.

C'est finalement dans ce contexte qu'intervint le recrutement d'Amadou Alassane Bousso, jeune diplômé sénégalais, appelé à devenir le premier directeur national de l'École après une formation internationale de dix-huit mois associant Dakar, la France et plusieurs pays européens. Cette transition marqua une étape décisive dans l'appropriation nationale de l'institution.

Ainsi, la Bibliothèque universitaire de Dakar apparaît, dans cette séquence fondatrice, comme un acteur institutionnel à la fois contraint et structurant. En devenant le creuset de la formation des premiers bibliothécaires professionnels formés en Afrique de l'Ouest, elle a contribué, parfois malgré elle, à l'émergence d'un champ professionnel autonome. Son histoire est indissociable de celle du CRFB et, plus largement, de la construction des politiques de la lecture, de l'enseignement supérieur et de la documentation dans le Sénégal indépendant. La commémoration de la Bibliothèque universitaire est aussi celle de cet héritage fondateur, à la croisée de la coopération internationale, de l'université et de la professionnalisation des savoirs documentaires.`;

const pameSlug = 'bibliotheque-universitaire-dakar-ecole-bibliothecaires';
const pameData = {
  title: 'La Bibliothèque universitaire de Dakar et la naissance de l\'école de bibliothécaires',
  slug: pameSlug,
  excerpt: 'Une analyse historique et institutionnelle de la Bibliothèque universitaire de Dakar et du rôle fondateur du Centre régional de formation des bibliothécaires.',
  content: pameContent,
  region: 'senegal',
  publishedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

await db.insert(editorials).values(pameData);
console.log('✓ Article du Dr Adama Aly Pam publié:', pameSlug);

console.log('\n✓ Tous les articles ont été publiés avec succès!');
await connection.end();
