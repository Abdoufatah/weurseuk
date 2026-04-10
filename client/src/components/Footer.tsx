import { Link } from "wouter";
import { ASSETS, NAV_SECTIONS } from "@shared/constants";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={ASSETS.logo} alt="Weurseuk" className="h-10 w-auto mb-4 brightness-200" />
            <p className="text-sm leading-relaxed opacity-70">
              Portail d'information de référence. Sénégal, Afrique de l'Ouest et perspectives mondiales.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Rubriques</h4>
            <ul className="space-y-2">
              {NAV_SECTIONS.slice(1).map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* À propos */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">À propos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/profil-bensirac" className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all">
                  L'éditorialiste
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all">
                  À propos de Weurseuk
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Informations légales</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm opacity-70">
                  Conforme au Code de la Presse du Sénégal (Loi n° 2017-27)
                </span>
              </li>
              <li>
                <span className="text-sm opacity-70">
                  Principes du CORED respectés
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-50">
            &copy; {new Date().getFullYear()} Weurseuk. Tous droits réservés.
          </p>
          <p className="text-xs opacity-50">
            Les articles agrégés renvoient vers leurs sources originales.
          </p>
        </div>
      </div>
    </footer>
  );
}
