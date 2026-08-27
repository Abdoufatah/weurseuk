import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Editoriaux from "./pages/Editoriaux";
import EditorialDetail from "./pages/EditorialDetail";
import ArticleDetail from "./pages/ArticleDetail";
import ProfilBensirac from "./pages/ProfilBensirac";
import Section from "./pages/Section";
import Category from "./pages/Category";
import Admin from "./pages/Admin";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";
import Television from "./pages/Television";
import Search from "./pages/Search";
import Methodology from "./pages/Methodology";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BreakingNewsTicker from "./components/BreakingNewsTicker";

// Deployment trigger: 2026-08-27 - Propager les quatre encarts exclusivement réservés à la rédaction
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#contenu-principal" className="skip-link">Aller au contenu principal</a>
      <Header />
      <BreakingNewsTicker />
      <main id="contenu-principal" tabIndex={-1} className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/">
        <PublicLayout><Home /></PublicLayout>
      </Route>
      <Route path="/editoriaux">
        <PublicLayout><Editoriaux /></PublicLayout>
      </Route>
      <Route path="/editorial/:slug">
        <PublicLayout><EditorialDetail /></PublicLayout>
      </Route>
      <Route path="/:category/:slug">
        <PublicLayout><EditorialDetail /></PublicLayout>
      </Route>
      <Route path="/article/:slug">
        <PublicLayout><ArticleDetail /></PublicLayout>
      </Route>
      <Route path="/profil-bensirac">
        <PublicLayout><ProfilBensirac /></PublicLayout>
      </Route>
      <Route path="/section/:slug">
        <PublicLayout><Section /></PublicLayout>
      </Route>
      <Route path="/actualite">
        <PublicLayout><Section /></PublicLayout>
      </Route>
      <Route path="/politique-economie">
        <PublicLayout><Section /></PublicLayout>
      </Route>
      <Route path="/international">
        <PublicLayout><Section /></PublicLayout>
      </Route>
      <Route path="/societe">
        <PublicLayout><Section /></PublicLayout>
      </Route>
      <Route path="/analyses">
        <PublicLayout><Section /></PublicLayout>
      </Route>
      <Route path="/essai">
        <PublicLayout><Section /></PublicLayout>
      </Route>
      <Route path="/dossiers">
        <PublicLayout><Section /></PublicLayout>
      </Route>
      <Route path="/a-propos">
        <PublicLayout><APropos /></PublicLayout>
      </Route>
      <Route path="/contact">
        <PublicLayout><Contact /></PublicLayout>
      </Route>
      <Route path="/television">
        <Television />
      </Route>
      <Route path="/recherche">
        <PublicLayout><Search /></PublicLayout>
      </Route>
      <Route path="/methodologie-corrections">
        <PublicLayout><Methodology /></PublicLayout>
      </Route>
      <Route path="/admin" component={Admin} />
      <Route path="/404">
        <PublicLayout><NotFound /></PublicLayout>
      </Route>
      <Route>
        <PublicLayout><NotFound /></PublicLayout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
