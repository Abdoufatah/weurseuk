import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const coverImageUrl = '/manus-storage/hemicycle_senegal_293da3e8.jpg';
const distorsionImageUrl = '/manus-storage/distorsion_electorale_senegal_c0b54112.webp';

const title = "L'illusion majoritaire : Pour une refonte proportionnelle du système électoral sénégalais";
const slug = 'illusion-majoritaire-refonte-proportionnelle-systeme-electoral-senegalais';
const excerpt = "Avec moins de 55 % des voix, le PASTEF contrôle 78,79 % de l'Assemblée nationale. Ce n'est pas une majorité — c'est une distorsion institutionnelle. L'analyse rigoureuse du système électoral révèle une distorsion démocratique majeure qui menace la légitimité même de la représentation parlementaire.";
const authorId = 30001; // Bensirac / Abdou Fatah Fall
const categoryId = 30008; // Analyses
const categorySlug = 'analyses';

const content = `<div class="article-intro">
<p>L'idéal démocratique, dans son essence la plus pure, repose sur un postulat mathématique et philosophique d'une simplicité désarmante : l'égalité stricte des voix. Le suffrage universel ne prend tout son sens que lorsque le bulletin déposé dans l'urne par un citoyen de Dakar pèse exactement le même poids politique que celui d'un citoyen de Tambacounda. Pourtant, l'ingénierie électorale sénégalaise, par une architecture complexe et profondément asymétrique, s'évertue à tordre cette réalité.</p>

<p>Le camp du PASTEF justifie aujourd'hui chacune de ses volontés politiques par l'invocation de la volonté populaire. L'argument est séduisant dans sa simplicité : le parti au pouvoir dispose d'une majorité parlementaire, donc il est l'expression fidèle du peuple, donc il est légitime à gouverner seul. Cet argument, qui semble irrésistible en surface, s'effondre dès qu'on l'examine à la lumière des réalités électorales. L'analyse rigoureuse du système électoral révèle précisément le contraire : une distorsion démocratique majeure qui menace la légitimité même de la représentation parlementaire.</p>

<p>Notre postulat est clair : la consolidation de la démocratie sénégalaise exige l'abandon du système <em>winner-take-all</em> au profit d'une représentation proportionnelle intégrale, garantissant ainsi l'équité absolue du suffrage universel et transformant en profondeur la nature même de la représentation parlementaire.</p>
</div>

<div class="article-distortion-card" style="margin:2.5rem 0;background:#1c1c1e;border-radius:4px;padding:1.75rem 2rem;display:grid;grid-template-columns:1fr auto 1fr;gap:1.5rem;align-items:center;">
  <div style="text-align:center;">
    <p style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:6px;font-family:sans-serif;">Part des voix · PASTEF</p>
    <p style="font-family:Georgia,serif;font-size:2.8rem;font-weight:700;color:#fff;line-height:1;margin-bottom:4px;">54,97<span style="font-size:1.4rem">%</span></p>
    <p style="font-size:11px;color:rgba(255,255,255,.5);line-height:1.45;font-family:sans-serif;">1 991 770 suffrages<br>sur 3 649 959 exprimés</p>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:10px;color:rgba(255,255,255,.3);letter-spacing:.1em;text-transform:uppercase;border-left:1px solid rgba(255,255,255,.15);padding-left:1.5rem;text-align:center;line-height:1.5;">
    <span style="font-size:1.8rem;color:#f0c060;display:block;margin-bottom:4px;">→</span>
    <span>+23,82 pts<br>de distorsion</span>
  </div>
  <div style="text-align:center;">
    <p style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:6px;font-family:sans-serif;">Part des sièges · PASTEF</p>
    <p style="font-family:Georgia,serif;font-size:2.8rem;font-weight:700;color:#f0c060;line-height:1;margin-bottom:4px;">78,79<span style="font-size:1.4rem">%</span></p>
    <p style="font-size:11px;color:rgba(255,255,255,.5);line-height:1.45;font-family:sans-serif;">130 sièges<br>sur 165 à l'hémicycle</p>
  </div>
</div>
<p style="font-size:11px;color:#6e6e73;text-align:center;margin-top:-1.5rem;margin-bottom:2.5rem;letter-spacing:.03em;font-family:sans-serif;">Législatives du 17 novembre 2024 · Source : Commission Électorale Nationale Autonome (CENA)</p>

<h2>L'anatomie d'une distorsion démocratique : les leçons des législatives de 2024</h2>

<p>L'Assemblée nationale du Sénégal est composée de 165 députés, élus selon un mode de scrutin parallèle. Une fraction minoritaire — 60 sièges — est pourvue au scrutin proportionnel sur liste nationale. La majorité écrasante de l'hémicycle — 105 sièges — est attribuée au scrutin majoritaire à un tour dans les circonscriptions départementales. C'est précisément dans cette mécanique que réside le vice structurel. Le principe est brutal : la liste qui arrive en tête, ne serait-ce que d'une seule voix, rafle la totalité des sièges du département.</p>

<p>La fracture mathématique apparaît avec une netteté implacable lorsque l'on observe le sort réservé à l'opposition. Takku Wallu Sénégal a obtenu 531 466 voix pour 16 sièges — soit un coût de 33 217 voix par siège. Jàmm ak Njariñ a recueilli 330 865 voix pour 7 sièges — 47 266 voix par siège. Samm Sa Kaddu a mobilisé 222 060 voix pour 3 sièges — 74 020 voix par siège. En cumulant l'ensemble des formations d'opposition, on atteint environ 1 658 189 voix, soit 45,03 % du corps électoral. Cette quasi-moitié de la nation sénégalaise ne se retrouve représentée que par 35 députés — à peine 21,21 % de l'hémicycle.</p>

<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:2rem 0;">
  <div style="background:#f5ecd4;border-radius:3px;padding:1rem 1.1rem;">
    <p style="font-size:1.7rem;font-weight:700;color:#c08b1a;line-height:1.1;margin-bottom:4px;font-family:sans-serif;">15 321</p>
    <p style="font-size:11px;color:#3d3d3f;line-height:1.45;letter-spacing:.02em;font-family:sans-serif;">voix par siège pour le PASTEF</p>
  </div>
  <div style="background:#f5ecd4;border-radius:3px;padding:1rem 1.1rem;">
    <p style="font-size:1.7rem;font-weight:700;color:#c08b1a;line-height:1.1;margin-bottom:4px;font-family:sans-serif;">33 217</p>
    <p style="font-size:11px;color:#3d3d3f;line-height:1.45;letter-spacing:.02em;font-family:sans-serif;">voix par siège pour Takku Wallu</p>
  </div>
  <div style="background:#f5ecd4;border-radius:3px;padding:1rem 1.1rem;">
    <p style="font-size:1.7rem;font-weight:700;color:#c08b1a;line-height:1.1;margin-bottom:4px;font-family:sans-serif;">74 020</p>
    <p style="font-size:11px;color:#3d3d3f;line-height:1.45;letter-spacing:.02em;font-family:sans-serif;">voix par siège pour Samm Sa Kaddu</p>
  </div>
</div>

<p>Le suffrage universel, censé être égal pour tous, est devenu un suffrage à géométrie variable. Un électeur du PASTEF pèse deux fois plus qu'un électeur de Takku Wallu, et près de cinq fois plus qu'un électeur de Samm Sa Kaddu.</p>

<h2>La négation du suffrage universel : une machine à effacer les minorités</h2>

<p>Ce scrutin majoritaire départemental agit comme une machine à effacer les minorités. Dans un grand département urbain, si une liste obtient 150 000 voix et qu'une autre en obtient 145 000, la première s'empare de l'intégralité des sièges. Les 145 000 électeurs de la seconde liste, bien qu'ils représentent une force sociologique et idéologique massive, sont politiquement annihilés.</p>

<blockquote>La légitimité démocratique ne se résume pas à la désignation d'un vainqueur ; elle réside également dans la capacité des institutions à <strong>intégrer les vaincus</strong> dans le jeu politique.</blockquote>

<p>Le système du <em>winner-take-all</em> transforme l'Assemblée nationale en chambre d'enregistrement d'une hégémonie électorale, plutôt qu'en miroir fidèle de la diversité de la nation. En privant près de la moitié du corps électoral d'une représentation proportionnelle à son poids réel, le système actuel nourrit la frustration, radicalise les oppositions extra-parlementaires et fragilise la cohésion nationale.</p>

<figure style="margin:2.5rem 0;text-align:center;">
  <img src="${distorsionImageUrl}" alt="Distorsion électorale Sénégal — Législatives 2024 : voix obtenues vs sièges obtenus" style="max-width:100%;border-radius:4px;" />
  <figcaption style="font-size:12px;color:#6e6e73;margin-top:0.75rem;font-family:sans-serif;font-style:italic;">Distorsion électorale — Législatives 2024 : 54,97 % des voix → 78,79 % des sièges pour le PASTEF. Source : CENA.</figcaption>
</figure>

<h2>La pathologie de la représentation actuelle : des députés parrainés plutôt qu'élus</h2>

<p>La distorsion démocratique n'est que la surface du problème. Il existe une pathologie plus profonde, souvent invisible dans les analyses superficielles : la nature même de la représentation parlementaire. Les députés se réclament aujourd'hui d'abord comme « députés de X » ou « députés de Y » — comme représentants d'un leader politique plutôt que comme mandataires d'une base électorale.</p>

<p>Dans le système actuel, un candidat est élu parce qu'il a été parrainé par un leader politique puissant capable de mobiliser la machine électorale du parti. Le lien entre le député et son électeur est médiatisé par le leader. Le député doit son siège à la machine du parti, pas à la conviction qu'il a su inspirer auprès des populations locales. Cette dynamique crée une hiérarchie rigide où la discipline de parti prime sur la représentation des intérêts locaux.</p>

<p>La réforme proportionnelle changerait radicalement cette équation. Les candidats ne seraient plus élus par une machine centralisée, mais par la conviction qu'ils auraient su inspirer auprès de leurs bases électorales. Un candidat pourrait être élu même sans être le favori du leader national, simplement parce qu'il aurait su convaincre sa circonscription. L'Assemblée nationale cesserait d'être un théâtre d'enregistrement des décisions du leader pour devenir un véritable lieu de débat démocratique.</p>

<h2>Le remède : la proportionnelle intégrale comme paradigme démocratique</h2>

<p>Le remède à cette double pathologie institutionnelle réside dans un changement de paradigme : la refonte proportionnelle intégrale du système électoral. Il s'agit d'appliquer la représentation proportionnelle aux 105 sièges départementaux, exactement comme cela se pratique déjà, avec succès, pour la liste nationale. Dans chaque département, les sièges seraient répartis au prorata des suffrages obtenus par chaque liste.</p>

<p>Appliquons cette logique aux résultats de 2024. Avec un système proportionnel intégral, le PASTEF aurait obtenu environ 90 sièges au lieu de 130 — tout en conservant la majorité absolue. Takku Wallu serait passé de 16 à 24 sièges. Jàmm ak Njariñ de 7 à 15. Samm Sa Kaddu de 3 à 10. L'Assemblée nationale refléterait alors véritablement la pluralité politique du Sénégal, plutôt que de magnifier artificiellement la majorité au détriment des minorités.</p>

<h2>Réfutation de l'objection de la gouvernabilité</h2>

<p>L'objection classique des conservateurs institutionnels est celle de la « gouvernabilité ». Le spectre d'une Assemblée fragmentée, ingouvernable, est régulièrement agité. Cet argument, bien que recevable en théorie, ne résiste pas à l'analyse empirique.</p>

<p>Avec 165 députés, une majorité simple requiert 83 sièges. Même dans le scénario proportionnel décrit ci-dessus, le PASTEF conserverait 90 sièges — une majorité confortable. De plus, l'histoire politique du Sénégal démontre une forte propension à la formation de grandes coalitions. La proportionnelle n'empêcherait pas la formation de majorités ; elle exigerait simplement que ces majorités soient construites sur des compromis réels et des alliances transparentes.</p>

<p>Les démocraties proportionnelles matures le prouvent quotidiennement. L'Allemagne, avec son système mixte sophistiqué, maintient une gouvernance stable tout en garantissant une représentation fidèle. La Suisse, avec son scrutin proportionnel par canton, jouit d'une stabilité politique remarquable. Les pays scandinaves figurent parmi les démocraties les plus stables et les plus efficaces du monde. L'argument de la fragmentation ne tient pas.</p>

<h2>Vers une démocratie véritable</h2>

<div style="margin-top:2rem;padding:2rem 2rem 2rem 1.75rem;border-left:3px solid #c08b1a;background:#f5ecd4;border-radius:0 3px 3px 0;">
<p>Le maintien du scrutin majoritaire pour les listes départementales constitue une anomalie démocratique. Il transforme des victoires électorales légitimes en raz-de-marée parlementaires disproportionnés, étouffant au passage la voix de millions de citoyens. Pire encore, il perpétue une logique de représentation où les députés sont des parrainés plutôt que des élus, où la machine du parti prime sur la conviction des électeurs.</p>

<p>La maturité démocratique du Sénégal, souvent citée en exemple sur le continent africain, doit désormais se traduire par une réforme courageuse de son code électoral. Adopter la proportionnelle pour l'ensemble des sièges de l'Assemblée nationale n'est pas une querelle de techniciens du droit constitutionnel ; c'est un impératif de justice politique.</p>

<p>C'est le seul moyen de garantir que l'hémicycle cesse d'être le théâtre d'une illusion majoritaire pour devenir, enfin, la véritable maison du peuple sénégalais dans toute sa pluralité. Cette réforme est un dépassement : celui qui nous permettra de passer d'une démocratie électorale de confrontation à une démocratie représentative de consensus, où chaque voix compte, où chaque courant politique a sa place, où la légitimité parlementaire repose sur la fidélité à la volonté populaire plutôt que sur l'illusion d'une majorité artificielle.</p>
</div>

<p style="margin-top:3rem;padding-top:1.5rem;border-top:1px solid #d9d4c8;font-size:13px;color:#6e6e73;font-family:sans-serif;"><strong style="color:#1c1c1e;font-weight:600;display:block;margin-bottom:2px;">Bensirac (Abdou Fatah Fall)</strong>Chercheur en sciences religieuses, sociétés et dynamiques transnationales · Institut Œcuménique de Théologie Al Mowafaqa, Rabat · Journaliste et analyste politique<br><em>© 2026 — Analyse politique · Weurseuk</em></p>`;

const publishedAt = new Date('2026-06-11T10:00:00Z');
const id = 1860005;

try {
  await conn.execute(
    `INSERT INTO editorials (id, title, slug, excerpt, content, coverImageUrl, authorId, categoryId, isPublished, publishedAt, type, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, 'analysis', NOW(), NOW())`,
    [id, title, slug, excerpt, content, coverImageUrl, authorId, categoryId, publishedAt]
  );
  console.log('✅ Article inséré avec succès — ID:', id);
  console.log('URL:', `/analyses/${slug}`);
} catch (err) {
  if (err.code === 'ER_DUP_ENTRY') {
    await conn.execute(
      `UPDATE editorials SET title=?, slug=?, excerpt=?, content=?, coverImageUrl=?, authorId=?, categoryId=?, isPublished=1, publishedAt=?, type='analysis', updatedAt=NOW() WHERE id=?`,
      [title, slug, excerpt, content, coverImageUrl, authorId, categoryId, publishedAt, id]
    );
    console.log('✅ Article mis à jour — ID:', id);
  } else {
    throw err;
  }
}

await conn.end();
