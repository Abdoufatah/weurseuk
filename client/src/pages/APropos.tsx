import { Link } from "wouter";
import { ASSETS, BENSIRAC } from "@shared/constants";
import {
  Globe,
  Eye,
  Shield,
  BookOpen,
  Users,
  Target,
  Scale,
  Lightbulb,
  ArrowRight,
  MapPin,
  Newspaper,
  PenLine,
} from "lucide-react";

export default function APropos() {
  return (
    <div className="min-h-screen font-sans-editorial">
      {/* Hero Section */}
      <section className="relative h-[320px] md:h-[380px] overflow-hidden">
        <img
          src={ASSETS.coverBanner}
          alt="Weurseuk - À propos"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-10 md:pb-14">
            <div className="max-w-3xl">
              <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
                À propos
              </p>
              <h1 className="font-editorial text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                Weurseuk, l'information{" "}
                <span className="text-primary">de référence</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed">
                Un regard depuis le Sénégal, ancré en Afrique de l'Ouest, ouvert sur le monde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-editorial text-2xl md:text-3xl font-bold text-foreground">
                Notre mission
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Weurseuk</strong> est né d'une conviction profonde : l'Afrique de l'Ouest, et le Sénégal en particulier, méritent un espace d'information qui soit à la hauteur de la complexité de leurs dynamiques politiques, économiques, sociales et culturelles. Un espace qui ne se contente pas de relayer l'actualité, mais qui l'éclaire, la contextualise et la soumet à l'exigence de la rigueur analytique.
              </p>
              <p>
                Notre mission est de produire et de rassembler une information de référence, vérifiée et approfondie, qui permette à chaque lecteur de comprendre les enjeux qui façonnent le Sénégal, l'Afrique de l'Ouest et le monde. Nous aspirons à être le portail où la qualité éditoriale rencontre l'exhaustivité de la couverture.
              </p>
              <p>
                En conjuguant éditoriaux d'analyse, agrégation intelligente des grandes sources d'information et couverture thématique rigoureuse, Weurseuk se positionne comme un carrefour intellectuel au service du débat public éclairé.
              </p>
            </div>
          </div>
          <div className="bg-accent/30 rounded-2xl p-8 border border-border">
            <h3 className="font-editorial text-lg font-bold text-foreground mb-6">
              Weurseuk en chiffres
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">13+</div>
                <p className="text-sm text-muted-foreground">Sources d'information agrégées</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">7</div>
                <p className="text-sm text-muted-foreground">Rubriques thématiques</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <p className="text-sm text-muted-foreground">Actualisation continue</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">3</div>
                <p className="text-sm text-muted-foreground">Échelles géographiques</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-foreground text-background">
        <div className="container py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-editorial text-2xl md:text-3xl font-bold">
                Notre vision
              </h2>
            </div>
            <p className="text-background/80 text-lg leading-relaxed">
              Nous croyons que l'information de qualité est un bien public. Weurseuk ambitionne de devenir le portail de référence pour quiconque souhaite comprendre les dynamiques contemporaines du Sénégal et de l'Afrique de l'Ouest, avec la profondeur d'analyse et la rigueur éditoriale que l'on attend des plus grands médias internationaux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background/5 rounded-xl p-6 border border-background/10">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-editorial text-lg font-bold mb-3">Ancrage sénégalais</h3>
              <p className="text-background/70 text-sm leading-relaxed">
                Le Sénégal est notre point d'ancrage. Nous couvrons en profondeur la vie politique, économique, sociale et culturelle du pays, avec une attention particulière aux dynamiques qui échappent souvent aux radars des médias généralistes.
              </p>
            </div>
            <div className="bg-background/5 rounded-xl p-6 border border-background/10">
              <Globe className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-editorial text-lg font-bold mb-3">Périphérie ouest-africaine</h3>
              <p className="text-background/70 text-sm leading-relaxed">
                L'Afrique de l'Ouest constitue notre périphérie naturelle. Les enjeux sécuritaires, les intégrations régionales, les transitions politiques et les dynamiques transnationales y sont suivis avec la même exigence analytique.
              </p>
            </div>
            <div className="bg-background/5 rounded-xl p-6 border border-background/10">
              <Lightbulb className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-editorial text-lg font-bold mb-3">Ouverture mondiale</h3>
              <p className="text-background/70 text-sm leading-relaxed">
                Weurseuk est ouvert sur le monde. Les perspectives internationales, les analyses comparatives et les éclairages géopolitiques nourrissent une compréhension globale des enjeux qui traversent nos sociétés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs Section */}
      <section className="container py-16 md:py-20">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-editorial text-2xl md:text-3xl font-bold text-foreground">
              Nos valeurs
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chaque contenu publié sur Weurseuk est soumis à un cadre déontologique strict, inspiré des plus hauts standards du journalisme international et conforme au Code de la Presse du Sénégal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="flex gap-4 p-6 rounded-xl border border-border hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Scale className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-editorial font-bold text-foreground mb-2">Rigueur et exactitude</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Chaque fait est vérifié, chaque source est identifiée, chaque analyse est fondée sur des données vérifiables. La rigueur scientifique guide notre travail éditorial au quotidien.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-6 rounded-xl border border-border hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-editorial font-bold text-foreground mb-2">Indépendance éditoriale</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Weurseuk n'est affilié à aucun parti politique, aucun groupe d'intérêt, aucune puissance économique. Notre seule allégeance est envers la vérité des faits et la qualité de l'analyse.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-6 rounded-xl border border-border hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-editorial font-bold text-foreground mb-2">Respect des sources</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Les articles agrégés renvoient systématiquement vers leurs sources originales. Nous ne republions jamais intégralement le contenu de tiers, conformément au droit d'auteur et à l'éthique journalistique.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-6 rounded-xl border border-border hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Newspaper className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-editorial font-bold text-foreground mb-2">Séparation publicité / éditorial</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Conformément au Code de la Presse du Sénégal (Loi n° 2017-27), tout espace publicitaire est clairement identifié et visuellement distinct du contenu éditorial. Aucune confusion n'est tolérée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Éditorialiste Section */}
      <section className="bg-accent/30 border-y border-border">
        <div className="container py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={BENSIRAC.photo}
                  alt={BENSIRAC.alias}
                  className="w-full h-[400px] object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-xl px-6 py-3 shadow-lg">
                <p className="font-editorial font-bold text-lg">{BENSIRAC.alias}</p>
                <p className="text-sm opacity-90">{BENSIRAC.title}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <PenLine className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-editorial text-2xl md:text-3xl font-bold text-foreground">
                  L'éditorialiste
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Bensirac</strong> est le regard analytique de Weurseuk. Chercheur en sciences religieuses, sociétés et dynamiques transnationales, journaliste senior et analyste politique spécialisé sur le Sénégal, il apporte à chaque éditorial une profondeur conceptuelle et une rigueur scientifique qui font la signature du portail.
                </p>
                <p>
                  Ses éditoriaux ne se contentent pas de commenter l'actualité : ils la décryptent, la contextualisent dans les dynamiques longues et proposent des grilles de lecture originales, nourries par une expertise académique et une connaissance intime des réalités sénégalaises et ouest-africaines.
                </p>
                <p>
                  Chaque publication de Bensirac est le fruit d'un travail d'analyse approfondi, où la rigueur du chercheur rencontre l'acuité du journaliste. C'est cette double exigence qui fait de ses éditoriaux des textes de référence.
                </p>
              </div>
              <div className="flex items-center gap-4 mt-6">
                <Link
                  href="/profil-bensirac"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Voir le profil complet
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/editoriaux"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
                >
                  Lire les éditoriaux
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement juridique */}
      <section className="container py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-editorial text-2xl md:text-3xl font-bold text-foreground">
              Conformité et engagement juridique
            </h2>
          </div>
          <div className="bg-card rounded-xl border border-border p-8 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Weurseuk exerce son activité dans le strict respect du <strong className="text-foreground">Code de la Presse du Sénégal</strong> (Loi n° 2017-27 du 13 juillet 2017), qui régit l'ensemble des activités de presse écrite, audiovisuelle et en ligne sur le territoire national.
            </p>
            <p>
              Nous adhérons aux principes déontologiques du <strong className="text-foreground">Conseil pour l'Observation des Règles d'Éthique et de Déontologie dans les Médias (CORED)</strong>, et nous nous engageons à respecter les dispositions relatives au droit de réponse, à la protection des sources, à la présomption d'innocence et à la dignité des personnes.
            </p>
            <p>
              La séparation entre contenu éditorial et espaces publicitaires est une obligation légale que Weurseuk applique avec la plus grande rigueur. Tout contenu sponsorisé ou publicitaire est explicitement identifié comme tel, conformément aux articles pertinents du Code de la Presse.
            </p>
            <p>
              Les articles agrégés depuis des sources tierces sont présentés sous forme de résumés avec attribution systématique de la source et lien vers le contenu original, dans le respect du droit d'auteur et des bonnes pratiques de l'agrégation de contenu.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 border-t border-border">
        <div className="container py-12 text-center">
          <h3 className="font-editorial text-xl font-bold text-foreground mb-3">
            Rejoignez la communauté Weurseuk
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Restez informé des dernières analyses et actualités du Sénégal, de l'Afrique de l'Ouest et du monde.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Newspaper className="w-4 h-4" />
              Explorer les actualités
            </Link>
            <Link
              href="/editoriaux"
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <PenLine className="w-4 h-4" />
              Lire les éditoriaux
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
