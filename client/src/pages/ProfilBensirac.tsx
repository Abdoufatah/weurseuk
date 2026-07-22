import { trpc } from "@/lib/trpc";
import { BENSIRAC, ASSETS } from "@shared/constants";
import { Link } from "wouter";
import AdPlacement from "@/components/AdPlacement";
import { PenLine, BookOpen, Globe, Twitter, Linkedin, Facebook } from "lucide-react";

export default function ProfilBensirac() {
  const { data: editorials } = trpc.editorials.published.useQuery({ limit: 10, offset: 0 });

  return (
    <div className="min-h-screen font-sans-editorial">
      {/* Hero profile */}
      <section className="relative bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={ASSETS.coverBanner} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary shadow-2xl">
                <img
                  src={BENSIRAC.photo}
                  alt={BENSIRAC.alias}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="font-editorial text-4xl md:text-5xl font-bold">{BENSIRAC.alias}</h1>
              <p className="text-primary text-lg font-medium mt-2">{BENSIRAC.title}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 text-sm text-background/70 bg-background/10 px-3 py-1 rounded-full">
                  <BookOpen className="w-3.5 h-3.5" />
                  Chercheur en sciences religieuses
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-background/70 bg-background/10 px-3 py-1 rounded-full">
                  <Globe className="w-3.5 h-3.5" />
                  Analyste politique
                </span>
              </div>
              <p className="text-background/60 mt-6 max-w-xl leading-relaxed">
                {BENSIRAC.bio}
              </p>
              {/* Social links */}
              <div className="flex items-center justify-center md:justify-start gap-3 mt-6">
                <a href={BENSIRAC.socialLinks.twitter} className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href={BENSIRAC.socialLinks.linkedin} className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href={BENSIRAC.socialLinks.facebook} className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-8">
        <AdPlacement type="leaderboard" />
      </div>

      {/* Editorials list */}
      <section className="container mt-10 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-editorial text-2xl font-bold mb-6 flex items-center gap-2">
              <PenLine className="w-5 h-5 text-primary" />
              Éditoriaux publiés
            </h2>
            {editorials && editorials.length > 0 ? (
              <div className="space-y-6">
                {editorials.map((ed) => (
                  <Link key={ed.id} href={`/editorial/${ed.slug}`} className="block group">
                    <div className="bg-card rounded-lg border border-border p-5 card-hover">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-primary-foreground bg-primary px-2 py-0.5 rounded">
                        Éditorial
                      </span>
                      <h3 className="font-editorial text-xl font-semibold mt-3 group-hover:text-primary transition-colors">
                        {ed.title}
                      </h3>
                      {ed.excerpt && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{ed.excerpt}</p>
                      )}
                      <p className="text-xs text-muted-foreground/70 mt-3">
                        {ed.publishedAt
                          ? new Date(ed.publishedAt).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : ""}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-muted/30 rounded-lg p-12 text-center">
                <PenLine className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-editorial text-lg font-semibold mb-2">Aucun éditorial publié</h3>
                <p className="text-muted-foreground text-sm">Les publications de Bensirac apparaîtront ici.</p>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="font-editorial text-base font-bold mb-3">Domaines d'expertise</h3>
              <ul className="space-y-2">
                {[
                  "Sciences religieuses",
                  "Sociétés et dynamiques transnationales",
                  "Analyse politique — Sénégal",
                  "Géopolitique ouest-africaine",
                  "Journalisme d'investigation",
                ].map((domain) => (
                  <li key={domain} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {domain}
                  </li>
                ))}
              </ul>
            </div>
            <AdPlacement type="mpu" />
          </aside>
        </div>
      </section>
    </div>
  );
}
