import { Link } from "wouter";
import {
  BadgeCheck,
  CheckCircle2,
  FileSearch,
  Handshake,
  Landmark,
  MessageSquareWarning,
  Scale,
  ShieldCheck,
  Split,
} from "lucide-react";

const commitments = [
  {
    icon: FileSearch,
    title: "Vérifier avant d’affirmer",
    text: "Nous distinguons les faits établis, les déclarations attribuées et les analyses. Un élément incertain est présenté comme tel, sans être transformé en certitude par le titre ou la mise en page.",
  },
  {
    icon: BadgeCheck,
    title: "Attribuer et contextualiser",
    text: "Toute information empruntée à une source tierce est attribuée. Les articles agrégés renvoient vers le contenu original ; les contenus natifs exposent leur auteur, leur rubrique et leur date de publication.",
  },
  {
    icon: Split,
    title: "Séparer information et commentaire",
    text: "Les éditoriaux, analyses, enquêtes, dépêches et contenus partenaires sont identifiés par des repères éditoriaux explicites afin que la nature de chaque texte soit immédiatement lisible.",
  },
];

export default function Methodology() {
  return (
    <div className="min-h-screen font-sans-editorial">
      <section className="bg-foreground text-background border-b border-primary/30">
        <div className="container py-14 md:py-20 max-w-5xl">
          <div className="flex items-center gap-3 text-primary mb-5">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">Engagement éditorial</span>
          </div>
          <h1 className="font-editorial text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
            Méthodologie <span className="text-primary">et corrections</span>
          </h1>
          <p className="mt-6 max-w-3xl text-base md:text-lg leading-relaxed text-background/75">
            La confiance se construit par la méthode : sources identifiées, distinction des registres, correction visible des erreurs et droit au signalement pour les lecteurs concernés.
          </p>
        </div>
      </section>

      <section className="container py-14 md:py-20">
        <div className="max-w-3xl">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.18em]">Notre cadre de travail</p>
          <h2 className="mt-3 font-editorial text-3xl md:text-4xl font-bold text-foreground">Une information exigeante, lisible dans sa fabrication</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Weurseuk publie des contenus natifs et rassemble des informations issues de sources tierces. Ces deux pratiques n’appellent pas le même traitement : l’une engage directement la rédaction ; l’autre impose une attribution claire et un accès au document original. Dans tous les cas, nous cherchons à rendre visible ce qui est établi, ce qui est rapporté et ce qui relève de l’interprétation.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {commitments.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-editorial text-xl font-bold text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-accent/25">
        <div className="container py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-primary text-xs font-semibold uppercase tracking-[0.18em]">Repères de lecture</p>
            <h2 className="mt-3 font-editorial text-3xl md:text-4xl font-bold text-foreground">Ce que signifient nos catégories éditoriales</h2>
          </div>
          <div className="mt-9 overflow-hidden rounded-2xl border border-border bg-card">
            <dl className="divide-y divide-border">
              <div className="grid gap-2 p-6 md:grid-cols-[13rem_1fr] md:gap-8">
                <dt className="font-editorial text-lg font-bold text-foreground">Faits établis</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">Informations vérifiées et attribuées à des documents, données, témoins identifiés ou sources crédibles. Lorsque le degré de certitude est limité, cette limite est indiquée.</dd>
              </div>
              <div className="grid gap-2 p-6 md:grid-cols-[13rem_1fr] md:gap-8">
                <dt className="font-editorial text-lg font-bold text-foreground">Déclarations</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">Propos, annonces ou positions rapportés avec leur auteur et leur contexte. Leur publication ne vaut pas, à elle seule, validation de leur véracité.</dd>
              </div>
              <div className="grid gap-2 p-6 md:grid-cols-[13rem_1fr] md:gap-8">
                <dt className="font-editorial text-lg font-bold text-foreground">Analyses et éditoriaux</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">Lectures argumentées, signées et assumées comme telles. Elles s’appuient sur des faits et des sources, mais ne se confondent pas avec une dépêche d’information.</dd>
              </div>
              <div className="grid gap-2 p-6 md:grid-cols-[13rem_1fr] md:gap-8">
                <dt className="font-editorial text-lg font-bold text-foreground">Agrégation</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">Synthèses de contenus publiés par des médias tiers. La source est nommée et le lecteur est orienté vers la publication originale.</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="container py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <Landmark className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="font-editorial text-3xl font-bold text-foreground">Précautions et responsabilité</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>Les personnes mises en cause dans une procédure, une enquête ou un contentieux sont traitées dans le respect de la présomption d’innocence. La rédaction s’efforce de distinguer les actes de procédure, les faits documentés et les allégations.</p>
              <p>Les sources anonymes ne sont utilisées que lorsque leur protection est justifiée. Leur information est alors soumise à une vérification renforcée et leur statut n’est jamais masqué au lecteur.</p>
              <p>Les contenus publicitaires, sponsorisés ou partenaires doivent être distingués visuellement et textuellement du travail éditorial indépendant.</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <Scale className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="font-editorial text-3xl font-bold text-foreground">Corrections et droit de réponse</h2>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>Lorsqu’une erreur matérielle est établie, Weurseuk la corrige avec une mention explicite lorsque la modification affecte le sens, les faits, l’attribution ou l’intégrité du contenu.</p>
              <p>Un signalement peut déboucher sur une correction, une clarification, une réponse motivée ou le maintien du contenu lorsqu’aucune erreur n’est établie. Les demandes portant sur un droit de réponse sont examinées selon le cadre légal et déontologique applicable.</p>
              <p>Cette page est un engagement de méthode ; elle ne remplace pas les procédures prévues par la loi, mais organise un accès direct et lisible à la rédaction.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-primary/20 bg-primary/5">
        <div className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
              <MessageSquareWarning className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 font-editorial text-2xl md:text-3xl font-bold text-foreground">Signaler une erreur ou demander une précision</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Indiquez le lien de l’article, le passage concerné, la nature de la demande et, si possible, les éléments permettant à la rédaction de l’examiner.</p>
            <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90" aria-label="Accéder à la page de contact pour signaler une erreur">
              Contacter la rédaction
              <Handshake className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-7 md:p-9">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h2 className="font-editorial text-xl font-bold text-foreground">Révision de nos pratiques</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Cette méthodologie est appelée à évoluer avec les pratiques de vérification, les obligations applicables et les retours des lecteurs. Toute évolution substantielle sera rendue publique sur cette page.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
