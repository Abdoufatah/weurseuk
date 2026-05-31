import { createConnection } from 'mysql2/promise';

const dbUrl = process.env.DATABASE_URL;
const conn = await createConnection(dbUrl);

// ============================================================
// ARTICLE : Faye-Sonko : deal et non duel au sommet ?
// Auteur : Pape Amadou Fall (id=60002)
// Catégorie : Analyses (id=30008)
// Style : identique à l'article précédent "De la dualité à la verticalité"
// ============================================================

const title = "Faye-Sonko\u00a0: deal et non duel au sommet\u00a0?";
const slug = "faye-sonko-deal-non-duel-au-sommet";
const excerpt = "L\u2019on se surprend \u00e0 penser, malgr\u00e9 soi, qu\u2019entre Bassirou Faye et Ousmane Sonko, il n\u2019y a v\u00e9ritablement pas duel et d\u00e9chirement au sommet de l\u2019\u00c9tat, mais plut\u00f4t combine et arrangement, une redistribution des r\u00f4les pour baliser la marche forc\u00e9e du \u00ab\u00a0Gardien de la R\u00e9volution\u00a0\u00bb vers le magist\u00e8re supr\u00eame. Cette hypoth\u00e8se para\u00eet coh\u00e9rente, r\u00e9f\u00e9r\u00e9e \u00e0 la gen\u00e8se m\u00eame de leur tandem, au postulat de d\u00e9part qui faisait de Bassirou Faye un pr\u00e9sident par d\u00e9faut, \u00ab\u00a0chauffant la place\u00a0\u00bb au porteur du \u00ab\u00a0Projet\u00a0\u00bb emp\u00each\u00e9 par la Justice.";

const content = `
<div class="editorial-body" style="font-family:'Libre Baskerville',Georgia,serif;color:#2C1A0E;font-size:1.02rem;line-height:1.95;max-width:760px;margin:0 auto;">

  <style>
    .editorial-body p {
      margin-bottom: 1.9rem;
      text-indent: 1.8em;
      text-align: justify;
      hyphens: auto;
      line-height: 1.95;
    }
    .editorial-body .lead-paragraph,
    .editorial-body .conclusion {
      text-indent: 0;
    }
    .editorial-body h2 + p,
    .editorial-body blockquote + p {
      text-indent: 0;
    }
    .editorial-body .lead-paragraph {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.22rem;
      font-style: italic;
      color: #3D2B1F;
      line-height: 1.85;
      border-left: 4px solid #C8933A;
      padding: 1.2rem 1.8rem;
      margin-bottom: 2.4rem;
      background: rgba(200,147,58,0.04);
    }
    .editorial-body blockquote {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.15rem;
      font-style: italic;
      color: #5C3D2E;
      border-left: 3px solid #C8933A;
      padding: 0.8rem 1.6rem;
      margin: 2rem 0;
      background: rgba(200,147,58,0.04);
    }
    .editorial-body h2 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.35rem;
      font-weight: 600;
      color: #1A0E05;
      margin: 3rem 0 1.2rem;
      letter-spacing: 0.02em;
      text-transform: none;
      border-bottom: 1px solid rgba(200,147,58,0.3);
      padding-bottom: 0.5rem;
    }
    .editorial-body .conclusion {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.08rem;
      font-style: italic;
      color: #3D2B1F;
      border-top: 1px solid rgba(200,147,58,0.4);
      padding-top: 1.5rem;
      margin-top: 2.5rem;
    }
    .editorial-body .author-note {
      font-size: 0.82rem;
      color: #8B6E5A;
      margin-top: 2.5rem;
      font-style: italic;
      text-align: right;
    }
  </style>

  <p class="lead-paragraph">L\u2019on se surprend \u00e0 penser, malgr\u00e9 soi, qu\u2019entre Bassirou Faye et Ousmane Sonko, il n\u2019y a v\u00e9ritablement pas duel et d\u00e9chirement au sommet de l\u2019\u00c9tat, mais plut\u00f4t combine et arrangement, une redistribution des r\u00f4les pour baliser la marche forc\u00e9e du \u00ab\u00a0Gardien de la R\u00e9volution\u00a0\u00bb vers le magist\u00e8re supr\u00eame. Cette hypoth\u00e8se para\u00eet coh\u00e9rente, r\u00e9f\u00e9r\u00e9e \u00e0 la gen\u00e8se m\u00eame de leur tandem, au postulat de d\u00e9part qui faisait de Bassirou Faye un pr\u00e9sident par d\u00e9faut, \u00ab\u00a0chauffant la place\u00a0\u00bb au porteur du \u00ab\u00a0Projet\u00a0\u00bb emp\u00each\u00e9 par la Justice. Le r\u00e9ajustement institutionnel qui s\u2019op\u00e8re aujourd\u2019hui peut bien \u00eatre interpr\u00e9t\u00e9, non pas comme une rupture ou une trahison, mais plut\u00f4t la mise en musique d\u2019un plan de succession ou de r\u00e9trocession du pouvoir au long cours.</p>

  <p>Les cartes seraient en train d\u2019\u00eatre rebattues et redistribu\u00e9es, dans cette optique. Le d\u00e9part d\u2019Ousmane Sonko de la station primatoria le et son remplacement par un homme plus lice et commode donnent les coud\u00e9es franches au Pr\u00e9sident de la R\u00e9publique pour consolider ce qui lui reste d\u2019autorit\u00e9 et travailler \u00e0 l\u2019am\u00e9lioration de la cote du S\u00e9n\u00e9gal aupr\u00e8s de ses partenaires ext\u00e9rieurs.</p>

  <p>Et loin d\u2019\u00eatre une disgr\u00e2ce, le repositionnement de Sonko au perchoir de l\u2019Assembl\u00e9e nationale, sans aucune contestation officielle, est plut\u00f4t une aubaine. Elle le lib\u00e8re des pesanteurs de la gestion contraignante du quotidien, en mettant un terme \u00e0 son exposition directe aux questions qui f\u00e2chent et qui ont trait au co\u00fbt de la vie, au ch\u00f4mage des jeunes et aux arbitrages budg\u00e9taires impopulaires. Il est ainsi prot\u00e9g\u00e9 des cons\u00e9quences des d\u00e9ceptions inh\u00e9rentes \u00e0 l\u2019exercice direct du pouvoir qui avaient commenc\u00e9 \u00e0 \u00e9roder son capital popularit\u00e9. La nouvelle donne renforce, dans le m\u00eame temps, sa libert\u00e9 de parole et de ton indispensable au maintien de la ferveur militante qui devrait le porter jusqu\u2019\u00e0 la prochaine Pr\u00e9sidentielle, voire au-del\u00e0, selon ses aspirations profondes.</p>

  <p>On est ainsi dans une cohabitation de temp\u00e9raments et de r\u00f4les qui servirait adroitement la strat\u00e9gie pour la continuit\u00e9 en douceur du r\u00e9gime, jusqu\u2019\u00e0 la prochaine \u00e9tape. Le jeu est d\u00e9roul\u00e9 par un p\u00f4le pr\u00e9sidentiel rassurant, centr\u00e9 sur l\u2019\u00c9tat, la poursuite plus sereine de la mise en \u0153uvre des politiques publiques et la r\u00e9paration des relations avec les partenaires ext\u00e9rieurs, d\u2019une part, et, de l\u2019autre, un p\u00f4le l\u00e9gislatif et id\u00e9ologique incarnant la rupture radicale d\u2019avec le \u00ab\u00a0Syst\u00e8me\u00a0\u00bb de par sa rh\u00e9torique plus que jamais offensive et qui ne s\u2019embarrassera point d\u2019\u00e9gratigner le pouvoir et de critiquer les partenaires ext\u00e9rieurs, pour donner toujours et plus de gages \u00e0 la jeunesse, celle qui s\u2019\u00e9tait massifi\u00e9e pour porter le tandem au pouvoir en mars 2024.</p>

  <h2>Une ing\u00e9nierie politique \u00e0 double d\u00e9tente</h2>

  <p>Sonko au Perchoir, c\u2019est aussi et surtout lui donner les moyens de lui b\u00e2tir une stature d\u2019homme d\u2019\u00c9tat, de deuxi\u00e8me personnalit\u00e9 de la R\u00e9publique. C\u2019est une l\u00e9gitimit\u00e9 institutionnelle totale qui, ajout\u00e9e \u00e0 son image de tribun \u00e0 cheval sur ses principes, envers et contre tout, lui conf\u00e8re une position d\u2019attente parfaite, de candidat incontournable pour le remplacement de Bassirou Faye avant le terme de son mandat en cours, sinon \u00e0 l\u2019issue de la Pr\u00e9sidentielle de 2029.</p>

  <p>\u00c9videmment, si ce deal existait et s\u2019ex\u00e9cutait, il ne serait sans rencontrer de la r\u00e9sistance. Une partie de l\u2019opposition qui le subodore s\u2019en offusque. Il n\u2019agr\u00e9erait pas non plus le proche entourage de Bassirou Faye et ses affid\u00e9s au sein de la \u00ab\u00a0Coalition Diomaye Pr\u00e9sident\u00a0\u00bb qui sont plut\u00f4t dans une dynamique de second mandat. Il est sans doute vrai qu\u2019un pouvoir vertical comme celui-l\u00e0 s\u2019accommode difficilement avec un effacement volontaire de son tenant au profit d\u2019un tiers, f\u00fbt-il son pygmalion ou l\u2019inverse. Mais ce ne serait point une premi\u00e8re dans l\u2019histoire politique du S\u00e9n\u00e9gal.</p>

  <h2>Les pr\u00e9c\u00e9dents historiques : de Senghor-Diouf \u00e0 Wade-Karim</h2>

  <p>En 1976, le pr\u00e9sident Senghor avait fait r\u00e9former la Constitution en y introduisant le fameux \u00ab\u00a0article\u00a035\u00a0\u00bb. Cette disposition stipulait qu\u2019en cas de d\u00e9mission, d\u2019emp\u00eachement d\u00e9finitif ou de d\u00e9c\u00e8s du pr\u00e9sident de la R\u00e9publique, le Premier ministre terminerait le mandat en cours jusqu\u2019\u00e0 son terme, sans passer par de nouvelles \u00e9lections. Cette clause avait fait l\u2019affaire d\u2019Abdou Diouf rest\u00e9 pr\u00e9sident de la R\u00e9publique pendant quarante ann\u00e9es.</p>

  <p>Le pr\u00e9sident Abdoulaye Wade a voulu en faire autant, en faveur de son fils Karim. Il lui avait construit une haute stature en en faisant, comme cela se disait, le \u00ab\u00a0ministre du Ciel et de la Terre\u00a0\u00bb et lui confiant d\u2019immenses responsabilit\u00e9s politiques, techniques et financi\u00e8res au sommet de l\u2019\u00c9tat. Il avait introduit en juin\u00a02011 un projet de loi constitutionnelle cr\u00e9ant un poste de vice-pr\u00e9sident taill\u00e9 sur mesure pour Karim Wade pour qu\u2019il succ\u00e9d\u00e2t directement \u00e0 son p\u00e8re, avec l\u2019atout d\u2019un ticket pr\u00e9sidentiel p\u00e8re et fils qui aurait toutes les chances d\u2019\u00eatre \u00e9lu d\u00e8s le premier tour, par la magie du \u00ab\u00a0quart bloquant\u00a0\u00bb, c\u2019est-\u00e0-dire 25\u00a0% seulement des suffrages exprim\u00e9s.</p>

  <p>Si le cas Senghor-Diouf a r\u00e9ussi gr\u00e2ce \u00e0 une froide ing\u00e9nierie politique, la tentative de d\u00e9volution du pouvoir Wade-Wade s\u2019est heurt\u00e9e \u00e0 une conscience d\u00e9mocratique plus aigu\u00eb et ardente, port\u00e9e par les mouvements de jeunesse et populaire, dont le Mouvement des forces vives de la nation (M23) et \u00ab\u00a0Y en a marre\u00a0\u00bb, et \u00e0 la pression internationale.</p>

  <h2>La question de l\u2019\u00e9thique d\u00e9mocratique</h2>

  <p>Quoique leurs relations le laissent encore fortement croire, une \u00ab\u00a0combinazione\u00a0\u00bb entre Faye et Sonko ne rel\u00e8verait pas d\u2019affinit\u00e9s familiales, mais d\u2019une connivence politique et id\u00e9ologique. D\u2019aucuns la trouveraient normale ou acceptable la transition qui en ressortirait car elle reposerait sur la continuit\u00e9 du \u00ab\u00a0Projet\u00a0\u00bb, et non sur des liens de sang. Mais elle n\u2019aurait de r\u00e9alit\u00e9 qu\u2019\u00e0 l\u2019\u00e9preuve classique et transparente du suffrage universel.</p>

  <p>Un arrangement consistant pour quelqu\u2019un \u00e0 \u00ab\u00a0chausser la place\u00a0\u00bb \u00e0 un autre, aussi proche soit-il, socialement ou politiquement, pose un s\u00e9rieux probl\u00e8me d\u2019\u00e9thique. Faire d\u2019un mandat en cours un int\u00e9rim pour un \u00ab\u00a0candidat d\u00e9sign\u00e9\u00a0\u00bb \u00e0 qui l\u2019on donne toutes les chances, donne l\u2019impression d\u2019une instrumentalisation du vote populaire. Dans une d\u00e9mocratie digne du nom, on ne doit pouvoir acc\u00e9der au pouvoir que par le canal d\u2019une comp\u00e9tition ouverte, libre et transparente, avec les urnes comme seul arbitre. Sinon, elle ne sera que de fa\u00e7ade, si le processus \u00e9lectoral est v\u00e9cu comme une simple validation d\u2019un plan de succession concoct\u00e9 au sommet de l\u2019\u00c9tat, sur le dos du peuple souverain.</p>

  <p>C\u2019est instrumentaliser l\u2019appareil d\u2019\u00c9tat que de se servir de la Primature puis du Perchoir comme tremplin pour la conservation ou la conqu\u00eate du pouvoir, avec en toile de fond un sch\u00e9ma de redistribution des r\u00f4les et de succession dessin\u00e9 et act\u00e9 en coulisses. Je ne dis pas que cette construction est r\u00e9elle ou probable, mais possible. Quoi qu\u2019il en soit, quand le terme \u00e9choira dans trois ans, Ousmane Sonko devra convaincre les citoyens sur son nom, son histoire, sa propre stature et surtout sur un bilan qu\u2019il aura totalement en partage la pleine responsabilit\u00e9, avec Bassirou Faye, qu\u2019il le veuille ou non.</p>

  <p class="conclusion">Il n\u2019y a d\u2019accord secret ou de position strat\u00e9gique qui puisse absolument assurer la prise du Palais de la R\u00e9publique. Les calculs politiques se heurtent au verdict des urnes, comme en attestent trois alternances d\u00e9mocratiques que la Nation a voulues et v\u00e9cues. C\u2019est le peuple souverain qui a eu et aura toujours le fin mot, pour ou contre.</p>

  <p class="author-note">Pape Amadou Fall &mdash; Historien et journaliste \u00e9conomique</p>

</div>
`;

const now = new Date();
const publishedAt = now.toISOString().slice(0, 19).replace('T', ' ');

// Vérifier si l'article existe déjà
const [existing] = await conn.execute(
  'SELECT id FROM editorials WHERE slug = ?', [slug]
);

if (existing.length > 0) {
  console.log('Article already exists with id:', existing[0].id, '— updating...');
  await conn.execute(
    `UPDATE editorials SET title=?, excerpt=?, content=?, categoryId=?, authorId=?, 
     coverImageUrl=?, isPublished=1, isFeatured=1, type='editorial', publishedAt=?
     WHERE slug=?`,
    [title, excerpt, content, 30008, 60002, '/manus-storage/PapeAmadouFall_b2fa0025.png', publishedAt, slug]
  );
  console.log('Article updated successfully.');
} else {
  const id = 1710002;
  await conn.execute(
    `INSERT INTO editorials (id, title, slug, excerpt, content, coverImageUrl, categoryId, authorId, isPublished, isFeatured, type, publishedAt, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 1, 'editorial', ?, ?, ?)`,
    [id, title, slug, excerpt, content, '/manus-storage/PapeAmadouFall_b2fa0025.png', 30008, 60002, publishedAt, publishedAt, publishedAt]
  );
  console.log('Article inserted with id:', id);
}

await conn.end();
console.log('Done.');
