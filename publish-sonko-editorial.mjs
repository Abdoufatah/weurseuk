import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const title = "La recomposition silencieuse — Ce que le limogeage de Sonko révèle vraiment";
const slug = "recomposition-silencieuse-limogeage-sonko-diomaye";
const excerpt = "Quand les commentateurs s'épuisent à lire une rupture, les faits murmurent autre chose. Le départ de Sonko de la Primature et sa nomination à la tête de l'Assemblée nationale n'est ni une disgrâce ni une marginalisation. C'est une recomposition stratégique, méthodique, dont la logique profonde échappe à ceux qui lisent la politique sénégalaise à la surface des événements.";
const coverImageUrl = "/manus-storage/SDiomaye_Sonko_wm_181e5ea8.jpg";
const categoryId = 30009; // Éditorial
const authorId = 30001;   // Bensirac
const type = "exclusive";

const content = `<article class="editorial-html-content">

  <div class="lead-paragraph">
    <p>Quand les commentateurs s'épuisent à lire une rupture, les faits murmurent autre chose. Le départ de Sonko de la Primature et sa nomination à la tête de l'Assemblée nationale n'est ni une disgrâce ni une marginalisation. C'est une recomposition stratégique, méthodique, dont la logique profonde échappe à ceux qui lisent la politique sénégalaise à la surface des événements.</p>
  </div>

  <div class="editorial-body">

    <div class="section">
      <div class="section-header">
        <div class="section-number">01</div>
        <h2 class="section-title">Ce que les faits disent avant que les commentateurs ne parlent</h2>
      </div>
      <p>Il y a dans la politique sénégalaise une tendance lourde à confondre le mouvement avec la rupture, le repositionnement avec la défaite. Depuis l'annonce du départ d'Ousmane Sonko de la Primature et sa désignation comme président de l'Assemblée nationale, les analyses se sont multipliées, souvent construites sur une même prémisse implicite : quelque chose s'est cassé. Une alliance fragilisée. Un homme affaibli. Un pouvoir qui se reconfigure contre lui-même.</p>
      <p>Cette lecture est séduisante. Elle est aussi, à bien des égards, insuffisante.</p>
      <p>Pour comprendre ce qui se joue réellement, il faut revenir aux faits bruts, avant que les interprétations ne les recouvrent. Sonko quitte la Primature. Il prend la tête de l'hémicycle. Ahmadou Al Aminou Lô est nommé Premier ministre. Bassirou Diomaye Faye reste à la présidence. Le PASTEF conserve une majorité parlementaire confortable. Aucun de ces faits, pris isolément ou ensemble, ne dessine une rupture. Ils dessinent une recomposition.</p>
    </div>

    <div class="divider"><span class="divider-ornament">✦ ✦ ✦</span></div>

    <div class="section">
      <div class="section-header">
        <div class="section-number">02</div>
        <h2 class="section-title">La bipolarisation comme anomalie, non comme norme</h2>
      </div>
      <p>Le tandem Diomaye-Sonko à l'exécutif était, dès le départ, une configuration atypique. Deux hommes de tempéraments opposés, porteurs de légitimités distinctes, partageant un même espace institutionnel conçu pour une seule tête politique dominante. La cohabitation au sommet de l'exécutif entre un président garant des équilibres et un Premier ministre accélérateur de ruptures n'est pas une formule durable dans un système présidentialiste comme celui du Sénégal.</p>
      <p>Ce n'est pas une critique. C'est une réalité structurelle. Les systèmes politiques ont leurs propres lois de gravité. Et l'une d'elles veut que la bipolarisation du pouvoir exécutif génère, à terme, des frictions institutionnelles que même la meilleure volonté politique ne peut indéfiniment contenir.</p>
      <p>La question n'était donc pas de savoir si cette configuration tiendrait, mais quand et comment elle se résoudrait. La réponse est venue sous la forme d'une recomposition fonctionnelle : chacun à son étage institutionnel, chacun avec son outil propre.</p>
    </div>

    <div class="divider"><span class="divider-ornament">✦ ✦ ✦</span></div>

    <div class="section">
      <div class="section-header">
        <div class="section-number">03</div>
        <h2 class="section-title">Ahmadou Al Aminou Lô, ou le choix du chirurgien</h2>
      </div>
      <p>La nomination d'Ahmadou Al Aminou Lô à la Primature est, à elle seule, un signal fort sur la nature de la transition en cours. Ce n'est pas le choix d'un homme politique. C'est le choix d'un technocrate d'État, d'un gestionnaire des équilibres, d'un homme dont le profil répond précisément aux exigences du moment.</p>
      <p>C'est ici que le choix d'Ahmadou Al Aminou Lô cesse d'être un simple remplacement de personnel pour devenir un acte de stratégie d'État.</p>
      <p>Son profil n'est pas celui d'un tribun. C'est un technocrate de l'État profond, dont le parcours ressemble à une préparation méthodique, presque clinique, à la gestion d'une économie en convalescence. Ancien directeur national de la BCEAO, il a passé des années au cœur même des mécanismes monétaires de la zone franc — les flux de liquidité, les contraintes de refinancement, les tensions entre politique budgétaire et rigueur monétaire que le pacte CFA impose à chacun de ses membres. Il ne découvrira pas ces réalités depuis la Primature. Il les connaît depuis leurs tuyaux les plus profonds.</p>
      <p>À cela s'ajoute son passage comme Secrétaire général du Gouvernement — poste discret mais cardinal, véritable chambre de coordination de l'action interministérielle, où se lisent les arbitrages réels, où circulent les dossiers avant qu'ils n'arrivent sur la table des décideurs visibles. Et sa responsabilité dans le suivi de l'Agenda Sénégal 2050 lui a forgé une troisième dimension : celle de la planification stratégique à long terme, de la projection au-delà des urgences conjoncturelles.</p>
      <p>Dans une conjoncture où le Sénégal doit simultanément assainir ses finances, reconquérir la confiance du FMI, gérer l'entrée en production pétrolière et gazière, et résister aux pressions des agences de notation, le pouvoir n'avait pas besoin d'un second accélérateur politique. Il avait besoin d'un chirurgien des équilibres. C'est précisément ce qu'Alamine Lô représente.</p>
    </div>

    <div class="divider"><span class="divider-ornament">✦ ✦ ✦</span></div>

    <div class="section">
      <div class="section-header">
        <div class="section-number">04</div>
        <h2 class="section-title">On ne marginalise pas un homme en lui donnant les clés du palais</h2>
      </div>
      <p>Sonko à l'Assemblée nationale, ce n'est pas Sonko marginalisé. C'est Sonko repositionné sur un terrain possiblement plus décisif que celui qu'il quitte. L'initiative législative, le contrôle de l'action gouvernementale, la capacité de remodeler dans la durée le cadre juridique et institutionnel hérité de l'ordre postcolonial — voilà ce que la présidence de l'hémicycle met à portée. C'est là que se refondent les États, pas nécessairement dans l'urgence opérationnelle du Conseil des ministres.</p>
      <p>Ce qui se dessine, en réalité, c'est une reconfiguration vers un schéma plus classique : un président garant de l'orientation stratégique, un Premier ministre chirurgien des équilibres, un leader politique majeur investi dans le travail de fond législatif. La bipolarisation de l'exécutif cède la place à une répartition fonctionnelle des rôles. Chacun à son étage. Chacun avec son outil.</p>
      <p>Sonko et Diomaye ont des tempéraments que tout oppose. L'un est un accélérateur, l'homme des mobilisations et des ruptures symboliques. L'autre est un stabilisateur, attentif aux équilibres, aux temporalités longues. Mais l'opposition de tempéraments ne signifie pas l'incompatibilité de projet. L'histoire connaît ces attelages improbables qui durent précisément parce qu'ils ne se ressemblent pas.</p>
    </div>

    <div class="divider"><span class="divider-ornament">✦ ✦ ✦</span></div>

    <div class="conclusion">
      <div class="section-header">
        <div class="section-number">05</div>
        <h2 class="section-title">Ce que les faits murmurent quand les commentateurs crient</h2>
      </div>
      <p>Bassirou Diomaye Faye a déclaré publiquement, et à plusieurs reprises, vouloir un jour permettre à Ousmane Sonko d'accéder à la magistrature suprême. Cette déclaration n'était pas rhétorique. Relue depuis la nomination à l'Assemblée, elle prend une autre densité. L'expérience gouvernementale comme formation. La présidence du Parlement comme légitimation institutionnelle. La présidentialisation progressive d'un parcours.</p>
      <p>Si cette hypothèse est juste — et les actes posés ne l'infirment pas —, alors ce que l'on observe n'est pas un réajustement conjoncturel. C'est la mise en œuvre méthodique d'une stratégie à long terme, où chaque mouvement prépare le suivant, où chaque repositionnement est une case gagnée sur l'échiquier.</p>
      <p class="final-line"><em>L'histoire jugera si la méthode était à la hauteur des ambitions. Mais pour l'instant, ceux qui annoncent la rupture lisent peut-être un texte qu'ils ont eux-mêmes écrit.</em></p>
    </div>

  </div>

</article>`;

// Vérifier si l'article existe déjà
const [existing] = await conn.query('SELECT id FROM editorials WHERE slug = ?', [slug]);
if (existing.length > 0) {
  console.log('Article déjà publié, mise à jour...');
  await conn.query(
    `UPDATE editorials SET title=?, excerpt=?, content=?, coverImageUrl=?, categoryId=?, authorId=?, 
     isPublished=1, isFeatured=1, type=?, publishedAt=NOW() WHERE slug=?`,
    [title, excerpt, content, coverImageUrl, categoryId, authorId, type, slug]
  );
  console.log('✅ Article mis à jour:', existing[0].id);
} else {
  const [result] = await conn.query(
    `INSERT INTO editorials (title, slug, excerpt, content, coverImageUrl, categoryId, authorId, isPublished, isFeatured, type, publishedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, 1, 1, ?, NOW())`,
    [title, slug, excerpt, content, coverImageUrl, categoryId, authorId, type]
  );
  console.log('✅ Article publié avec ID:', result.insertId);
}

await conn.end();
console.log('Publication terminée.');
