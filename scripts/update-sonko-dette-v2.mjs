import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const id = 1860007;
const title = "Sonko sur la dette cachée : ce que tout le monde a raté";
const slug = "sonko-dette-cachee-analyse-discours-rfi-france24";
const excerpt = "Sur les 17 minutes d'entretien exclusif accordé par Ousmane Sonko à RFI et France 24, une séquence de 101 secondes a suffi à embraser le débat public sénégalais. L'opposition y voit un aveu. Le camp Pastef dénonce une manipulation. Les deux se trompent — et la démonstration tient dans un glissement sémantique que personne n'a identifié.";

const content = `<div class="editorial-body">

<p class="chapeau" style="font-style:italic; border-left:3px solid #c9a84c; padding-left:1.2rem; margin-bottom:2rem; font-family:'Cormorant Garamond', serif; font-size:1.15rem; line-height:1.8; color:#444;">Sur les 17 minutes d'entretien exclusif accordé par Ousmane Sonko à RFI et France 24, une séquence de 101 secondes a suffi à embraser le débat public sénégalais. L'opposition y voit un aveu. Le camp Pastef dénonce une manipulation. Les deux se trompent — et la démonstration tient dans un glissement sémantique que personne n'a identifié. Déconstruction d'un échange où la question posée n'est pas celle à laquelle Sonko a répondu.</p>

<h2 style="font-family:'Cormorant Garamond', serif; font-size:1.4rem; font-weight:700; margin:2rem 0 1rem; color:#1a1a1a; border-bottom:1px solid #e0c97a; padding-bottom:0.4rem;">I. Préambule méthodologique</h2>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">L'entretien intégral entre Ousmane Sonko et les journalistes Marc Perelman et Léa-Lisa Westerhoff a duré 17 minutes. La séquence analysée ici — 101 secondes, de 00:00 à 01:41 — a été isolée et découpée par nos soins, parce qu'elle concentre le nœud analytique que l'ensemble des commentateurs a manqué. Ce découpage n'est pas arbitraire : il procède d'une lecture attentive de la dynamique discursive entre les trois intervenants, et de l'identification d'un pivot sémantique invisible à l'écoute superficielle.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">La transcription intégrale de cette séquence est reproduite ci-dessous, avec différenciation typographique des intervenants. C'est à partir de ce matériau brut — et de lui seul — que l'analyse est conduite.</p>

<h2 style="font-family:'Cormorant Garamond', serif; font-size:1.4rem; font-weight:700; margin:2rem 0 1rem; color:#1a1a1a; border-bottom:1px solid #e0c97a; padding-bottom:0.4rem;">II. Transcription intégrale de la séquence (00:00–01:41)</h2>

<div style="background:#fdf9f0; border:1px solid #e0c97a; border-radius:6px; padding:1.5rem; margin:1.5rem 0;">

<p style="margin-bottom:1rem;"><strong style="font-family:'Cormorant Garamond', serif; font-size:1.1rem; color:#8b0000;">MARC PERELMAN</strong> <span style="font-size:0.85rem; color:#888;">[00:00–00:24]</span></p>
<p style="font-family:'Libre Baskerville', serif; font-size:0.95rem; line-height:1.8; margin-bottom:1.5rem; padding-left:1rem; border-left:3px solid #8b0000;"><em>Vous avez beaucoup parlé de souveraineté économique. Or, la dette, vous avez continué à vous endetter auprès de bailleurs internationaux, publics, privés. Est-ce que vous ne regrettez pas, finalement, cette dette que vous avez découverte, cachée ? Est-ce que vous ne regrettez pas de ne pas avoir demandé son annulation pure et simple, mais plutôt d'entrer dans des négociations qui semblent s'enliser ? Est-ce que c'est un regret ?</em></p>

<p style="margin-bottom:1rem;"><strong style="font-family:'Cormorant Garamond', serif; font-size:1.1rem; color:#1a5c1a;">OUSMANE SONKO</strong> <span style="font-size:0.85rem; color:#888;">[00:24–01:04]</span></p>
<p style="font-family:'Libre Baskerville', serif; font-size:0.95rem; line-height:1.8; margin-bottom:1.5rem; padding-left:1rem; border-left:3px solid #1a5c1a;"><em>Vous savez, nous avons fait une option, celle de partir sur une bonne base, et non pas de dissimuler des chiffres, parce que ça nous aurait rattrapé tôt ou tard. Et nous serions peut-être dans une situation de certains pays, une situation ingérable. Nous avons vu le cas de la dette grecque il y a quelques années. Après, une fois qu'on a révélé les vrais chiffres, il faut gérer. La dette, c'est des échéances. C'est un service qu'il faut gérer et qu'il n'attend pas. Et un pays qui se veut souverain doit rembourser ses dettes. Nous nous sommes donné une dette, elle se refinance. En réalité, dans tous les pays du monde, la dette, elle se refinance, elle se renouvelle.</em></p>

<p style="margin-bottom:1rem;"><strong style="font-family:'Cormorant Garamond', serif; font-size:1.1rem; color:#4a0080;">LÉA-LISA WESTERHOFF</strong> <span style="font-size:0.85rem; color:#888;">[01:04–01:07]</span></p>
<p style="font-family:'Libre Baskerville', serif; font-size:0.95rem; line-height:1.8; margin-bottom:1.5rem; padding-left:1rem; border-left:3px solid #4a0080;"><em>Mais vous auriez pu demander son annulation comme une dette odieuse.</em></p>

<p style="margin-bottom:1rem;"><strong style="font-family:'Cormorant Garamond', serif; font-size:1.1rem; color:#1a5c1a;">OUSMANE SONKO</strong> <span style="font-size:0.85rem; color:#888;">[01:07–01:25]</span></p>
<p style="font-family:'Libre Baskerville', serif; font-size:0.95rem; line-height:1.8; margin-bottom:1.5rem; padding-left:1rem; border-left:3px solid #1a5c1a;"><em>Oui, dette odieuse, vous utilisez le terme, je l'ai utilisé une ou deux fois. C'est toute une procédure. Je n'avais pas tous les leviers. Quand je parlais à certaines occasions, je parlais en tant que chef de parti politique qui donne son opinion. N'oubliez pas que j'étais simple Premier ministre. Les pouvoirs du Premier ministre sont extrêmement limités dans ce pays.</em></p>

<p style="margin-bottom:1rem;"><strong style="font-family:'Cormorant Garamond', serif; font-size:1.1rem; color:#8b0000;">MARC PERELMAN</strong> <span style="font-size:0.85rem; color:#888;">[01:25–01:28]</span></p>
<p style="font-family:'Libre Baskerville', serif; font-size:0.95rem; line-height:1.8; margin-bottom:1.5rem; padding-left:1rem; border-left:3px solid #8b0000;"><em>Vous étiez en désaccord avec le Président sur ce sujet ?</em></p>

<p style="margin-bottom:1rem;"><strong style="font-family:'Cormorant Garamond', serif; font-size:1.1rem; color:#1a5c1a;">OUSMANE SONKO</strong> <span style="font-size:0.85rem; color:#888;">[01:28–01:41]</span></p>
<p style="font-family:'Libre Baskerville', serif; font-size:0.95rem; line-height:1.8; margin-bottom:0; padding-left:1rem; border-left:3px solid #1a5c1a;"><em>On n'en a jamais discuté. On a toujours été en phase sur la gestion de la dette. Jusqu'à notre dernière discussion où la question a été soulevée et qu'il m'a confirmé que la ligne n'a pas changé. Nous allons voir ce qui va se passer dans les semaines ou mois à venir.</em></p>

</div>

<h2 style="font-family:'Cormorant Garamond', serif; font-size:1.4rem; font-weight:700; margin:2rem 0 1rem; color:#1a1a1a; border-bottom:1px solid #e0c97a; padding-bottom:0.4rem;">III. Le glissement que personne n'a vu</h2>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Relisons la séquence avec attention. La question de Marc Perelman est limpide : elle porte sur la <strong>dette cachée</strong> — celle découverte par les audits post-électoraux, les 25 points de PIB dissimulés sous le régime Macky Sall. Lambrechts demande à Sonko s'il regrette de ne pas avoir demandé <strong>l'annulation de cette dette cachée</strong> plutôt que d'entrer dans des négociations qui s'enlisent.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Sonko répond à cette question. Il parle de transparence, de la nécessité de révéler les vrais chiffres, du précédent grec, du refinancement. Il est sur le terrain de la <strong>dette cachée</strong>. Jusque-là, la cohérence discursive est intacte.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Puis Léa-Lisa Westerhoff intervient. Et c'est ici que tout bascule.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Sa relance — <em>« Mais vous auriez pu demander son annulation comme une dette odieuse »</em> — opère un <strong>déplacement d'objet</strong>. Elle ne demande plus pourquoi Sonko n'a pas fait annuler la dette cachée. Elle introduit un concept juridique distinct — la <strong>dette odieuse</strong> — et le substitue à l'objet initial de la question. Ce n'est plus : <em>pourquoi n'avez-vous pas fait annuler cette dette dissimulée ?</em> C'est : <em>pourquoi n'avez-vous pas invoqué la doctrine de la dette odieuse ?</em></p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">La dette cachée et la dette odieuse ne sont pas la même chose. La dette cachée est un fait comptable : des engagements financiers dissimulés dans les comptes publics. La dette odieuse est une doctrine juridique internationale : une dette contractée par un régime à des fins contraires aux intérêts du peuple, dont l'annulation peut être sollicitée sous certaines conditions. Les deux notions peuvent se recouper — une dette cachée peut être qualifiée d'odieuse — mais elles ne se confondent pas.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Or, Sonko embraye immédiatement sur le terrain de la dette odieuse. Il répond à Westerhoff, pas à Lambrechts. Il dit : <em>« Oui, dette odieuse, vous utilisez le terme, je l'ai utilisé une ou deux fois. C'est toute une procédure. Je n'avais pas tous les leviers. »</em></p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Ce faisant, il quitte le terrain factuel de la dette cachée pour entrer sur le terrain doctrinal de la dette odieuse. Et c'est ce déplacement — initié par la journaliste, accepté par Sonko — qui a produit toute la polémique.</p>

<h2 style="font-family:'Cormorant Garamond', serif; font-size:1.4rem; font-weight:700; margin:2rem 0 1rem; color:#1a1a1a; border-bottom:1px solid #e0c97a; padding-bottom:0.4rem;">IV. Pourquoi tout le monde s'est trompé</h2>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;"><strong>L'opposition s'est trompée.</strong> Elle a lu la séquence comme un aveu de Sonko reconnaissant que ses déclarations sur la dette odieuse avaient été irresponsables. Elle a interprété <em>« je n'avais pas tous les leviers »</em> comme une confession d'impuissance institutionnelle : Sonko admettrait qu'il ne pouvait pas agir sur la dette odieuse parce qu'il n'était <em>que</em> Premier ministre.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Mais cette lecture ignore le contexte discursif. La question initiale portait sur la <strong>dette cachée</strong>, pas sur la dette odieuse. Quand Sonko dit <em>« je n'avais pas tous les leviers »</em>, il est en train de répondre à une relance qui l'a déjà déplacé sur un autre terrain. La phrase ne signifie pas nécessairement <em>« je ne pouvais pas agir »</em>. Elle peut tout aussi bien signifier : <em>« je n'avais pas toutes les informations »</em> — c'est-à-dire qu'il a parlé de la dette (cachée, potentiellement odieuse) avant de disposer de l'ensemble des données que les audits allaient révéler. C'est un aveu de communication prématurée, pas d'impuissance.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;"><strong>Le camp Pastef s'est trompé.</strong> Il a crié au détournement de propos, sans identifier la mécanique précise de ce détournement. Le problème n'est pas que les propos de Sonko ont été <em>sortis de leur contexte</em> — ils ont été lus dans un contexte discursif déjà déplacé par la relance de Westerhoff. Pastef aurait dû pointer le glissement sémantique opéré par la journaliste, au lieu de se contenter d'un discours victimaire sur la manipulation médiatique.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;"><strong>Les commentateurs se sont trompés.</strong> La quasi-totalité des analyses publiées depuis le 15 juin traitent l'échange comme un bloc homogène, sans distinguer les deux questions (Lambrechts sur la dette cachée, Westerhoff sur la dette odieuse) ni identifier le pivot qui fait basculer la réponse de Sonko d'un registre à l'autre.</p>

<h2 style="font-family:'Cormorant Garamond', serif; font-size:1.4rem; font-weight:700; margin:2rem 0 1rem; color:#1a1a1a; border-bottom:1px solid #e0c97a; padding-bottom:0.4rem;">V. Ce que Sonko a effectivement dit — et ce qu'il n'a pas dit</h2>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Une fois le glissement identifié et neutralisé, que reste-t-il de l'échange ?</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;"><strong>Sur la dette cachée</strong> (réponse à Lambrechts) : Sonko défend le choix de la transparence. Il ne regrette pas la révélation. Il invoque le précédent grec pour justifier que la dissimulation aurait été pire. Il affirme que la dette se gère, se refinance, et qu'un pays souverain honore ses engagements. Cette position est cohérente, défendable, et ne contient aucun aveu problématique.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;"><strong>Sur la dette odieuse</strong> (réponse à Westerhoff) : Sonko reconnaît avoir utilisé le terme, en minimise la fréquence (<em>« une ou deux fois »</em>), invoque la complexité procédurale, et distingue sa parole de chef de parti de ses responsabilités gouvernementales. C'est ici que se situe la phrase <em>« je n'avais pas tous les leviers »</em>.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">La question décisive est : à quoi renvoient ces <em>leviers</em> ? Deux lectures sont possibles :</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1rem;"><strong>Lecture 1</strong> — Les leviers institutionnels. Sonko n'avait pas le pouvoir, en tant que Premier ministre, de déclencher une procédure de qualification de dette odieuse. C'est une excuse de compétence.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;"><strong>Lecture 2</strong> — Les leviers informationnels. Sonko n'avait pas, au moment où il parlait de dette odieuse, l'ensemble des données que les audits allaient produire. Il a qualifié la dette avant d'en connaître toute l'étendue. C'est un aveu de prématurité discursive.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">La lecture 2 est plus cohérente avec le contexte chronologique. En 2024, quand Sonko utilisait le terme <em>dette odieuse</em>, les audits complets de la Cour des comptes n'étaient pas encore finalisés — le rapport définitif date de février 2025. Il parlait donc sur la base d'informations partielles. <em>« Je n'avais pas tous les leviers »</em> signifie alors : je n'avais pas toutes les données pour qualifier cette dette avec la rigueur juridique que la notion de dette odieuse exige.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Cette lecture change radicalement la portée politique de l'échange. Sonko ne reconnaît pas son impuissance. Il reconnaît avoir parlé trop tôt — ce qui est une faute de communication, pas une faute de gouvernance.</p>

<h2 style="font-family:'Cormorant Garamond', serif; font-size:1.4rem; font-weight:700; margin:2rem 0 1rem; color:#1a1a1a; border-bottom:1px solid #e0c97a; padding-bottom:0.4rem;">VI. Le rôle de la relance dans la construction de la polémique</h2>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Il faut nommer ce qui s'est passé : la relance de Léa-Lisa Westerhoff a fonctionné comme un <strong>opérateur de déplacement sémantique</strong>. En introduisant le terme <em>dette odieuse</em> dans un échange qui portait sur la <em>dette cachée</em>, elle a créé les conditions d'une confusion que l'ensemble des acteurs politiques et médiatiques a ensuite exploitée — chacun dans son sens.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Ce n'est pas nécessairement un acte délibéré de manipulation journalistique. C'est un procédé courant dans l'interview politique : la relance qui élargit ou déplace le terrain pour provoquer une réponse plus exploitable. Mais le résultat est là : Sonko a répondu à une question qui n'était pas celle de départ, et c'est cette réponse déplacée qui a alimenté la polémique.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Si Westerhoff n'avait pas introduit le terme <em>dette odieuse</em>, Sonko aurait vraisemblablement continué sur le terrain de la dette cachée — transparence, refinancement, gestion responsable. Il n'y aurait eu aucune polémique. C'est la relance qui a produit le matériau polémique, et c'est l'incapacité des commentateurs à distinguer les deux questions qui a permis à la polémique de prospérer.</p>

<h2 style="font-family:'Cormorant Garamond', serif; font-size:1.4rem; font-weight:700; margin:2rem 0 1rem; color:#1a1a1a; border-bottom:1px solid #e0c97a; padding-bottom:0.4rem;">Conclusion</h2>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Cet échange de 101 secondes est un cas d'école en analyse du discours politique. Il montre comment un glissement sémantique — opéré par une relance journalistique, accepté par l'interviewé, ignoré par les commentateurs — peut produire une polémique entière à partir d'un malentendu structurel.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">Tout le monde s'est trompé parce que personne n'a lu la transcription avec la rigueur qu'elle exigeait. L'opposition a lu un aveu là où il y avait une concession sur la prématurité d'un discours. Le camp Pastef a crié à la manipulation sans identifier le mécanisme précis du déplacement. Les commentateurs ont traité l'échange comme un monolithe, sans en distinguer les strates discursives.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:1rem; line-height:1.85; text-indent:1.5rem; margin-bottom:1.2rem;">La leçon est double. Pour Sonko : se laisser entraîner sur un terrain qui n'est pas celui de la question initiale est une faute tactique — d'autant plus coûteuse qu'elle produit des phrases exploitables hors contexte. Pour l'analyste : la rigueur exige de revenir au matériau brut, de distinguer les intervenants, d'identifier les pivots, et de ne jamais confondre la question posée avec la question à laquelle on a répondu.</p>

<p style="font-family:'Libre Baskerville', serif; font-size:0.9rem; line-height:1.7; margin-top:2.5rem; padding-top:1rem; border-top:1px solid #e0c97a; color:#666; font-style:italic;">© 2026 — Weurseuk. Analyse de Abdou Fatah FALL, chercheur en sciences politiques et dynamiques transnationales, journaliste analyste spécialisé sur le Sénégal.</p>

</div>`;

try {
  await connection.execute(
    `UPDATE editorials SET title = ?, excerpt = ?, content = ?, updatedAt = ? WHERE id = ?`,
    [title, excerpt, content, new Date(), id]
  );
  console.log(`✅ Article ID=${id} mis à jour avec la version 2 (signé Abdou Fatah FALL)`);
} catch (err) {
  console.error('❌ Erreur lors de la mise à jour :', err.message);
} finally {
  await connection.end();
}
