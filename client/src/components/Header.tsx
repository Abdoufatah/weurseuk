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
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-border" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)' }}>

      {/* Main nav : logo + rubriques sur la même ligne */}
      <div className="container">
        <div className="flex items-stretch justify-between gap-4" style={{ minHeight: '56px' }}>
          {/* Logo — occupe toute la hauteur du header */}
          <Link href="/" className="flex-shrink-0 flex items-stretch">
            <img
              src={ASSETS.logo}
              alt="Weurseuk"
              className="h-full w-auto object-contain"
              style={{ maxHeight: '56px' }}
            />
          </Link>

          {/* Desktop nav — rubriques principales */}
          <nav className="hidden lg:flex items-center gap-0 flex-1 justify-center">
            {NAV_SECTIONS.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className={`px-2 py-2 text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 whitespace-nowrap relative ${
                  location === section.href
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                }`}
                style={location === section.href ? { borderBottom: '2px solid currentColor', marginBottom: '-1px' } : {}}
              >
                {section.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-accent flex-shrink-0"
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
