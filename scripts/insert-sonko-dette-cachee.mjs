import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const id = 1860007;
const title = "Ce que Sonko a vraiment dit sur la dette cachée — Analyse d'un échange sous haute tension";
const slug = "sonko-dette-cachee-analyse-discours-rfi-france24";
const excerpt = "En 101 secondes d'échange avec les journalistes de RFI et France 24, Ousmane Sonko a produit l'un des moments les plus révélateurs de sa trajectoire politique. L'opposition y voit un aveu d'irresponsabilité ; le camp Pastef, un discours délibérément tronqué. Ni l'un ni l'autre ne dit toute la vérité. Une lecture rigoureuse de la transcription s'impose.";
const authorId = 30001; // Bensirac / Abdou Fatah Fall
const categoryId = 30008; // Analyses
const coverImageUrl = 'https://i.imgur.com/s2BDkNU.jpeg'; // fallback Imgur
const isPublished = 1;
const isFeatured = 1;
const type = 'standard';
const now = new Date();

const content = `<div class="editorial-body">

<p class="chapeau" style="font-style:italic; border-left:3px solid #c9a84c; padding-left:1.2rem; margin-bottom:2rem; font-family:'Cormorant Garamond', serif; font-size:1.15rem; line-height:1.8; color:#444;">En 101 secondes d'échange avec les journalistes de RFI et France 24, Ousmane Sonko a produit l'un des moments les plus révélateurs de sa trajectoire politique. L'opposition y voit un aveu d'irresponsabilité ; le camp Pastef, un discours délibérément tronqué. Ni l'un ni l'autre ne dit toute la vérité. Une lecture rigoureuse de la transcription s'impose.</p>

<h2 style="font-family:'Cormorant Garamond', serif; font-size:1.4rem; font-weight:700; margin:2rem 0 1rem; color:#1a1a1a; border-bottom:1px solid #e0c97a; padding-bottom:0.4rem;">I. La scène de l'échange : une dramaturgie construite</h2>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">L'interview accordée conjointement à RFI et France 24 le 15 juin 2026 intervient dans un contexte politique singulier : Ousmane Sonko vient d'être limogé de la Primature et siège désormais à la présidence de l'Assemblée nationale. Il est donc, pour la première fois depuis mars 2024, un acteur institutionnel sans responsabilité exécutive directe. Cette position nouvelle modifie structurellement le registre de sa parole : il peut désormais formuler des critiques, des regrets et des injonctions sans en porter la charge gouvernementale immédiate.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">La question du journaliste est formulée avec une précision chirurgicale : <em>« Est-ce que vous ne regrettez pas, finalement, cette dette que vous avez découverte, cachée ? Est-ce que vous ne regrettez pas de ne pas avoir demandé son annulation pure et simple, mais plutôt d'entrer dans des négociations qui semblent s'enliser ? »</em> La double négation (<em>ne regrettez-vous pas</em>) est un procédé rhétorique classique de l'interview politique : elle présuppose l'existence d'un regret et invite l'interviewé à soit le confirmer, soit le dénier. C'est un piège sémantique bien tendu.</p>

<h2 style="font-family:'Cormorant Garamond', serif; font-size:1.4rem; font-weight:700; margin:2rem 0 1rem; color:#1a1a1a; border-bottom:1px solid #e0c97a; padding-bottom:0.4rem;">II. La réponse de Sonko : anatomie d'un discours en trois temps</h2>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; margin-bottom:0.8rem;"><strong>Premier temps — La justification de la transparence (00:24–00:57)</strong></p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Sonko ne répond pas directement à la question du regret. Il opère une substitution thématique : au lieu de parler de ce qu'il <em>regrette</em>, il parle de ce qu'il a <em>choisi</em>. <em>« Nous avons fait une option, celle de partir sur une bonne base, et non pas de dissimuler des chiffres, parce que ça nous aurait rattrapé tôt ou tard. »</em> Cette formulation est politiquement habile : elle transforme la révélation de la dette — qui a précipité la dégradation de la note souveraine — en acte de courage et de vertu républicaine. La référence à la <em>« crise grecque »</em> n'est pas anodine : elle convoque un précédent européen dramatique pour légitimer le choix de la transparence comme seule alternative à une catastrophe plus grave.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Ce premier temps est une <strong>stratégie de cadrage</strong> (<em>framing</em>) : Sonko redéfinit le terrain du débat. La question était <em>« regrettez-vous ? »</em> ; la réponse est <em>« nous avons fait le bon choix »</em>. Il ne nie pas les conséquences douloureuses de la révélation, mais il les présente comme le prix nécessaire d'une gestion saine.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; margin-bottom:0.8rem;"><strong>Deuxième temps — La concession sur la dette odieuse (01:07–01:25)</strong></p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">C'est ici que l'échange devient analytiquement le plus riche. Pressé par le journaliste sur la notion de <em>dette odieuse</em> — terme qu'il avait lui-même employé en tant que chef de parti —, Sonko produit une réponse en deux volets qui mérite d'être citée intégralement :</p>

<blockquote style="border-left:3px solid #c9a84c; padding:0.8rem 1.2rem; margin:1.5rem 0; font-style:italic; font-family:'Cormorant Garamond', serif; font-size:1.1rem; color:#555; background:#fdf9f0;">
<em>« Oui, dette odieuse, vous utilisez le terme, je l'ai utilisé une ou deux fois. C'est toute une procédure. Je n'avais pas tous les leviers. Quand je parlais à certaines occasions, je parlais en tant que chef de parti politique qui donne son opinion. N'oubliez pas que j'étais simple Premier ministre. Les pouvoirs du Premier ministre sont extrêmement limités dans ce pays. »</em>
</blockquote>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Cette séquence est d'une densité rhétorique exceptionnelle. Elle contient au moins quatre opérations discursives distinctes :</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1rem;"><strong>1. La minimisation de la fréquence</strong> (<em>« une ou deux fois »</em>) — Sonko reconnaît avoir utilisé le terme <em>dette odieuse</em>, mais en réduit immédiatement la portée en suggérant qu'il s'agissait d'occurrences marginales, non d'une position programmatique structurée. C'est une <strong>stratégie de distanciation lexicale</strong> : il prend acte du mot sans en assumer pleinement la charge politique.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1rem;"><strong>2. L'invocation de la procédure</strong> (<em>« C'est toute une procédure »</em>) — Cette formule vague est un écran technique. Elle suggère que l'annulation d'une dette odieuse est une démarche juridiquement complexe, ce qui est factuellement exact : la doctrine de la <em>dette odieuse</em> en droit international n'a pas de mécanisme d'application contraignant reconnu par les institutions financières internationales. Mais elle sert aussi à déplacer la responsabilité de l'inaction vers la complexité procédurale plutôt que vers un choix politique délibéré.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1rem;"><strong>3. La distinction entre le chef de parti et le Premier ministre</strong> — C'est l'opération la plus sophistiquée et la plus contestable. Sonko soutient que ses déclarations sur la dette odieuse relevaient de son statut de <em>« chef de parti politique qui donne son opinion »</em>, et non de ses fonctions gouvernementales. Cette distinction est juridiquement recevable — un Premier ministre n'est pas lié par ses déclarations antérieures en tant qu'opposant —, mais elle est politiquement problématique. Car c'est précisément cette ambiguïté entre le discours de l'opposant et la parole du gouvernant qui a alimenté l'incertitude des marchés et des agences de notation. Moody's et Standard &amp; Poor's ne distinguent pas, dans leur évaluation du risque souverain, entre la parole du chef de parti et celle du Premier ministre : ils évaluent le signal politique global émis par le gouvernement.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;"><strong>4. La dépréciation de la fonction</strong> (<em>« simple Premier ministre »</em>, <em>« pouvoirs extrêmement limités »</em>) — Cette formulation est remarquable. Sonko, qui a exercé la fonction de Premier ministre pendant plus d'un an, la qualifie rétrospectivement de <em>« simple »</em> et en minimise les prérogatives. C'est une <strong>stratégie de déresponsabilisation institutionnelle</strong> : en réduisant la portée de sa propre fonction, il réduit mécaniquement l'étendue de sa responsabilité dans les décisions prises — ou non prises — durant cette période.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; margin-bottom:0.8rem;"><strong>Troisième temps — La rupture avec Diomaye et la ligne inchangée (01:25–01:41)</strong></p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">À la question <em>« Étiez-vous en désaccord avec le Président sur ce sujet ? »</em>, Sonko répond : <em>« On n'en a jamais discuté. On a toujours été en phase sur la gestion de la dette. Jusqu'à notre dernière discussion où la question a été soulevée et qu'il m'a confirmé que la ligne n'a pas changé. »</em></p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Cette séquence finale est la plus chargée politiquement, et la plus opaque. Elle contient une contradiction interne : comment peut-on <em>n'avoir jamais discuté</em> d'un sujet et avoir <em>toujours été en phase</em> sur ce même sujet ? La cohérence logique de cette affirmation est douteuse. Elle suggère soit que la question n'était pas un point de tension entre les deux hommes — ce qui contredirait les informations circulant sur leurs divergences —, soit que Sonko choisit de ne pas révéler la nature réelle de leurs échanges.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">La mention de <em>« notre dernière discussion »</em> est particulièrement significative. Elle renvoie implicitement à la rupture politique qui a conduit au limogeage de Sonko, et la formulation <em>« il m'a confirmé que la ligne n'a pas changé »</em> peut être lue de deux façons radicalement opposées : soit comme une confirmation de convergence, soit comme une mise en scène de la divergence — Diomaye aurait <em>confirmé</em> une ligne que Sonko conteste désormais depuis l'Assemblée nationale.</p>

<h2 style="font-family:'Cormorant Garamond', serif; font-size:1.4rem; font-weight:700; margin:2rem 0 1rem; color:#1a1a1a; border-bottom:1px solid #e0c97a; padding-bottom:0.4rem;">III. Ce que l'opposition dit — et ce qu'elle omet</h2>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">L'opposition soutient que Sonko a, dans cet échange, reconnu implicitement que ses déclarations sur la dette odieuse ont contribué à la dégradation de la note souveraine du Sénégal. Cette lecture s'appuie sur la distinction qu'il opère lui-même entre sa parole de chef de parti et ses responsabilités gouvernementales : si cette distinction est valide, alors ses déclarations antérieures étaient irresponsables au regard de leur impact sur la perception du risque souverain.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Cette lecture n'est pas sans fondement. La chronologie est établie : Sonko a utilisé le terme <em>dette odieuse</em> à plusieurs reprises en 2024, alors qu'il était déjà Premier ministre. En octobre 2024, Moody's a procédé à une première dégradation, suivie d'une seconde en février 2025. Standard &amp; Poor's a suivi en juillet 2025. En l'espace de quatre mois, la note souveraine du Sénégal a perdu trois niveaux — une dégringolade que des observateurs qualifient de rare, surtout pour un État qui n'est pas en défaut de paiement ou en pleine restructuration.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Cependant, l'opposition commet une erreur d'attribution causale. Les agences de notation ont explicitement fondé leurs dégradations sur les <strong>données de la Cour des comptes</strong> — le ratio dette/PIB passé de 74,4 % à 99,7 %, le déficit réévalué de 4,9 % à 12,3 % —, et non sur les déclarations verbales de Sonko. Ce sont les <strong>chiffres</strong>, pas les mots, qui ont déclenché la sanction des marchés. Imputer la dégradation aux déclarations de Sonko, c'est confondre le signal et la cause.</p>

<h2 style="font-family:'Cormorant Garamond', serif; font-size:1.4rem; font-weight:700; margin:2rem 0 1rem; color:#1a1a1a; border-bottom:1px solid #e0c97a; padding-bottom:0.4rem;">IV. Ce que le camp Pastef dit — et ce qu'il tait</h2>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Le camp Pastef soutient que le discours de Sonko a été <em>détourné</em> et que ses propos ont été sortis de leur contexte. Cette lecture est partiellement fondée : la distinction entre la parole du chef de parti et celle du Premier ministre est réelle, et la question de la dette odieuse est effectivement une question de doctrine juridique complexe, pas une simple déclaration politique.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Mais le camp Pastef tait l'essentiel : Sonko était Premier ministre lorsqu'il a utilisé le terme <em>dette odieuse</em> dans des espaces publics. La distinction entre sa casquette de chef de parti et sa fonction gouvernementale, si elle est juridiquement recevable, est politiquement inopérante dans le contexte de la communication financière internationale. Les marchés et les agences de notation ne lisent pas les organigrammes partisans : ils lisent les signaux émis par les responsables politiques en exercice.</p>

<h2 style="font-family:'Cormorant Garamond', serif; font-size:1.4rem; font-weight:700; margin:2rem 0 1rem; color:#1a1a1a; border-bottom:1px solid #e0c97a; padding-bottom:0.4rem;">V. Ce qui s'est effectivement dit — et ce que cela révèle</h2>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Une lecture strictement orthodoxe de la transcription permet de dégager les conclusions suivantes :</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1rem;"><strong>Premièrement</strong>, Sonko n'a pas exprimé de regret sur la <em>révélation</em> de la dette cachée. Il a défendu ce choix comme une nécessité de transparence et de bonne gestion. Sur ce point, sa position est cohérente et défendable.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1rem;"><strong>Deuxièmement</strong>, Sonko a reconnu avoir utilisé le terme <em>dette odieuse</em>, mais en a minimisé la fréquence et la portée, en invoquant sa qualité de chef de parti pour distancer ses déclarations de ses responsabilités gouvernementales. Cette opération de distanciation est rhétoriquement sophistiquée mais politiquement fragile.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1rem;"><strong>Troisièmement</strong>, la formulation <em>« je n'avais pas tous les leviers »</em> est l'aveu le plus significatif de l'échange. Elle reconnaît implicitement que ses déclarations sur la dette odieuse allaient au-delà de ce qu'il était en mesure d'accomplir institutionnellement. C'est moins un aveu d'irresponsabilité qu'une reconnaissance de l'écart entre le discours de l'opposant et les contraintes du gouvernant — un écart que tout analyste politique sérieux avait identifié dès 2024.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;"><strong>Quatrièmement</strong>, la séquence finale sur les rapports avec Diomaye est délibérément ambiguë. Elle ne confirme ni ne dément une rupture sur la question de la dette. Elle laisse ouverte la possibilité que Sonko, depuis l'Assemblée nationale, entende exercer une pression sur l'exécutif pour qu'il aille plus loin sur la restructuration de la dette — une injonction politique déguisée en récit de convergence.</p>

<h2 style="font-family:'Cormorant Garamond', serif; font-size:1.4rem; font-weight:700; margin:2rem 0 1rem; color:#1a1a1a; border-bottom:1px solid #e0c97a; padding-bottom:0.4rem;">Conclusion : la polémique comme révélateur</h2>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">La polémique suscitée par cet échange révèle moins une faute de communication de Sonko qu'une tension structurelle dans la politique économique du régime Pastef : la tension entre un discours de rupture souverainiste — dont la <em>dette odieuse</em> était l'expression la plus radicale — et les contraintes d'une gestion orthodoxe des finances publiques dans un contexte de forte dépendance aux marchés internationaux.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Sonko n'a pas <em>reconnu</em> son irresponsabilité. Il a reconnu les limites institutionnelles de sa fonction. Ce n'est pas la même chose. Mais il a aussi, implicitement, admis que le discours de l'opposant et la pratique du gouvernant ne peuvent pas coexister indéfiniment sans coût politique. C'est, en définitive, la leçon la plus importante de ces 101 secondes.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:0.9rem; line-height:1.7; margin-top:2.5rem; padding-top:1rem; border-top:1px solid #e0c97a; color:#666; font-style:italic;">© 2026 — Weurseuk. Analyse de Abdou Fatah Fall (Bensirac), chercheur en sciences politiques et dynamiques transnationales, journaliste analyste spécialisé sur le Sénégal.</p>

</div>`;

try {
  await connection.execute(
    `INSERT INTO editorials 
      (id, title, slug, excerpt, content, authorId, categoryId, coverImageUrl, isPublished, publishedAt, type, isFeatured, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      title,
      slug,
      excerpt,
      content,
      authorId,
      categoryId,
      coverImageUrl,
      isPublished,
      now,
      type,
      isFeatured,
      now,
      now,
    ]
  );
  console.log(`✅ Article inséré avec succès : ID=${id}, slug="${slug}"`);
} catch (err) {
  console.error('❌ Erreur lors de l\'insertion :', err.message);
} finally {
  await connection.end();
}
