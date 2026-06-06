import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Titre et slug
const title = "Le discours d'un président — Wade comme miroir, Sonko comme repoussoir";
const slug = "discours-president-wade-miroir-sonko-repoussoir";

// Chapeau (excerpt)
const excerpt = "En célébrant le centenaire d'Abdoulaye Wade au Grand Théâtre, Bassirou Diomaye Faye n'a pas seulement rendu hommage à un patriarche de la République. Il a, en creux, dressé le portrait d'un adversaire innommé — et signifié, avec la force tranquille de celui qui tient les rênes, qu'il ne peut y avoir qu'un seul centre de pouvoir légitime dans ce pays.";

// Contenu HTML formaté dans le style des articles précédents de Pape Amadou Fall
const content = `<p style="font-style: italic; border-left: 3px solid #c9a84c; padding-left: 1rem; margin-bottom: 2rem; color: #d4b896;">En célébrant le centenaire d'Abdoulaye Wade au Grand Théâtre, Bassirou Diomaye Faye n'a pas seulement rendu hommage à un patriarche de la République. Il a, en creux, dressé le portrait d'un adversaire innommé — et signifié, avec la force tranquille de celui qui tient les rênes, qu'il ne peut y avoir qu'un seul centre de pouvoir légitime dans ce pays.</p>

<p>La célébration, le 4 juin dernier au Grand Théâtre, du Centenaire du président Abdoulaye Wade, une quinzaine d'années après sa sortie du pouvoir, fut un moment solennel d'une rare intensité émotionnelle. Ce qui en restera le plus dans les mémoires sera sans doute, moins l'éclat fastueux de la cérémonie, que le retentissant discours tenu par le président Bassirou Faye. Plus qu'un éloge historique digne du grand homme d'État qui était honoré et fêté de son vivant, ce discours a surtout frappé les esprits avertis, de par les messages politiques délivrés à l'adresse du présent.</p>

<p>Bassirou Faye a longuement et dignement célébré celui que l'on appelle volontiers en Afrique un « Père de la Nation ». Le Wade dont il a rappelé aux Sénégalais qui l'écoutaient <em>urbi et orbi</em> les qualités d'homme d'État était patient dans l'opposition, faisait preuve de retenue face à ses adversaires, avait la capacité de combattre sans détruire ni déchirer, et donnait à la Nation et à la République la primauté sur les ambitions personnelles.</p>

<p>De ce discours — dont d'aucuns disent déjà qu'il est le meilleur depuis son accession à la magistrature suprême — il plaît de retenir et de souligner nombre de passages qui sonnent comme des leçons de vie politique.</p>

<h2>Un florilège de maximes républicaines</h2>

<p>En voici quelques-unes, qui méritent d'être citées dans leur intégralité :</p>

<blockquote>
<p>« Faire de la patience une forme haute du courage, car il est plus difficile d'attendre sans faiblir que de céder à l'emportement d'un jour. »</p>
<p>« Rien de durable ne naît dans la précipitation, et les plus justes causes sont presque toujours les plus patientes. »</p>
<p>« On peut vouloir l'emporter sans vouloir humilier, et le respect d'un homme survit à l'affrontement des idées. »</p>
<p>« Le pouvoir se transmet par la seule volonté du peuple et dans la grandeur, jamais par la rue ni par la force. »</p>
<p>« La démocratie n'est pas un butin que l'on arrache et que l'on garde jalousement. C'est une flamme que l'on se passe de main en main, et qu'il ne faut pas laisser s'éteindre. »</p>
<p>« L'adversaire d'aujourd'hui n'est pas un ennemi. C'est un compatriote, souvent bienveillant, qui voit le pays autrement, et avec lequel il faudra, une fois le combat terminé, continuer d'habiter en paix la même maison-Sénégal. »</p>
<p>« Nos désaccords, si profonds soient-ils, demeurent des désaccords entre frères. On peut s'opposer sans se déchirer, et se succéder sans se détruire. »</p>
<p>« Aucune querelle, si vive soit-elle, ne mérite que l'on déchire le pays qui nous est commun. »</p>
<p>« Rien de grand ne se bâtit sans une conviction plus grande que l'œuvre elle-même. »</p>
<p>« Servir sa jeunesse vaudra toujours mieux que se servir d'elle. »</p>
<p>« Ne jamais désespérer du Sénégal, ni même d'un compagnon de lutte qui se perd dans l'acrimonie et la haine de l'autre. »</p>
</blockquote>

<h2>Le miroir inversé : Wade comme contre-modèle implicite de Sonko</h2>

<p>Les mots de Bassirou n'ont pas traversé le temps pour seulement saluer un vieillard au soir encore heureux d'une vie pleinement remplie. Ils s'adressaient à un homme qui a brillé par son absence et dont le nom ne sera pas prononcé une seule fois, mais que tout le monde a clairement identifié. Dans ce miroir inversé, chaque valeur ou vertu reconnue en Wade renvoie à son contraire chez cette personne, à qui sont indirectement reprochés son impatience à prendre le pouvoir, ses excès, sa mégalomanie et le fait d'avoir placé sa personne, ses amis et son parti au-dessus de la République. Celui dont il est question continue de bâtir le dessein politique dont il se croit investi, sur la confrontation permanente, la polarisation assumée, la rhétorique de la rupture radicale et la guerre totale contre les institutions, les adversaires et même les alliés, ainsi que le déplore Bassirou Faye.</p>

<p>Il n'a certes pas mis de nom sur ce portrait. Mais l'accusé est l'un des hommes politiques les plus actifs de la cité. Ousmane Sonko, le Premier ministre récemment défenestré, sait bien qu'il est la cible visée par cette singulière diatribe. Son camp le sait également. Tout comme les observateurs, qu'ils se prononcent ou s'abstiennent de commenter la sortie du président.</p>

<h2>L'art de l'effacement symbolique</h2>

<p>Quoi qu'il en soit, en politique, l'allusion est souvent plus puissante que l'attaque frontale, le silence plus dévastateur que la parole. Ne pas nommer quelqu'un dans un discours public qui lui est pourtant destiné, c'est, au fond, l'effacer symboliquement. C'est lui dire qu'il n'est même plus digne d'être cité. C'est traiter l'ancien Premier ministre non pas comme un adversaire politique à combattre, mais comme une erreur de parcours à corriger, une parenthèse à refermer, une page à tourner.</p>

<h2>La verticalité républicaine réaffirmée</h2>

<p>En insistant sur la « primauté de la Nation », en répétant que les hommes passent, que les partis passent, que les ambitions passent, mais que la République demeure, Bassirou Faye ne fait que rappeler à l'ordre la verticalité de l'Exécutif républicain. Cette doctrine, qui a été et demeure le socle des régimes qui se sont succédé au Sénégal, place l'État au-dessus des individus et le président de la République qui l'incarne, au plus haut niveau, au-dessus des logiques partisanes et des leaderships parallèles.</p>

<p>Ainsi, derrière l'humilité apparente de l'hommage rendu à Gorgui, le « Patriarche de la République », est apparue en filigrane, mais distinctement, une affirmation de souveraineté. Elle pose qu'il ne peut y avoir dans ce pays qu'un seul centre de pouvoir légitime, et ce centre, c'est la présidence. Toute concurrence, tout leadership alternatif, toute ambition parallèle devient, dans cette logique, une atteinte à l'intérêt supérieur de la Nation. Jusqu'à ce que le peuple souverain en décide autrement, librement et sereinement, par la seule voie acceptable en démocratie mature, celle des urnes, et non de l'insurrection.</p>

<p>Le « Gardien de la Révolution » l'entendra-t-il de cette oreille ? Le proche avenir nous le dira…</p>

<p class="copyright">© 2026 — Analyse politique · Weurseuk · Pape Amadou Fall · Journaliste et analyste politique</p>`;

// Vérifier que l'article n'existe pas déjà
const [existing] = await conn.execute('SELECT id FROM editorials WHERE slug = ?', [slug]);
if (existing.length > 0) {
  console.log('Article déjà existant, ID:', existing[0].id);
  await conn.end();
  process.exit(0);
}

// Insérer l'article
// authorId 60002 = Pape Amadou Fall
// categoryId 30008 = Analyses
const publishedAt = new Date('2026-06-06T10:00:00.000Z');
const [result] = await conn.execute(
  `INSERT INTO editorials 
   (id, title, slug, excerpt, content, coverImageUrl, categoryId, authorId, isPublished, isFeatured, publishedAt, createdAt, updatedAt, type)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)`,
  [
    1860004,
    title,
    slug,
    excerpt,
    content,
    null,
    30008,  // Analyses
    60002,  // Pape Amadou Fall
    1,      // isPublished
    0,      // isFeatured
    publishedAt,
    'analysis'
  ]
);

console.log('Article inséré avec succès, ID:', result.insertId || 1860004);
await conn.end();
