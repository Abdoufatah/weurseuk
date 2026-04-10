import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ASSETS, NAV_SECTIONS } from "@shared/constants";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      {/* Top bar */}
      <div className="bg-foreground text-background">
        <div className="container flex items-center justify-between py-1.5 text-xs">
          <span className="font-sans-editorial tracking-wide opacity-80">
            Portail d'Information — Sénégal &middot; Afrique de l'Ouest &middot; Monde
          </span>
          <div className="hidden sm:flex items-center gap-4">
            <span className="opacity-70">
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {user?.role === "admin" && (
                  <Link href="/admin" className="hover:text-primary transition-colors">
                    <Settings className="w-3.5 h-3.5" />
                  </Link>
                )}
                <button onClick={() => logout()} className="hover:text-primary transition-colors">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <a href={getLoginUrl()} className="hover:text-primary transition-colors flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>Connexion</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src={ASSETS.logo}
              alt="Weurseuk"
              className="h-12 sm:h-14 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_SECTIONS.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  location === section.href
                    ? "text-primary bg-accent"
                    : "text-foreground/80 hover:text-primary hover:bg-accent/50"
                }`}
              >
                {section.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <nav className="container py-4 space-y-1">
            {NAV_SECTIONS.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className={`block px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  location === section.href
                    ? "text-primary bg-accent"
                    : "text-foreground/80 hover:text-primary hover:bg-accent/50"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {section.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border mt-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-3 px-4">
                  <span className="text-sm text-muted-foreground">{user?.name}</span>
                  {user?.role === "admin" && (
                    <Link href="/admin" className="text-primary text-sm" onClick={() => setMobileOpen(false)}>
                      Admin
                    </Link>
                  )}
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="text-sm text-destructive">
                    Déconnexion
                  </button>
                </div>
              ) : (
                <a href={getLoginUrl()} className="block px-4 py-2.5 text-sm font-medium text-primary">
                  Connexion
                </a>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
