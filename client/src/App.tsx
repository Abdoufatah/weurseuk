import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Editoriaux from "./pages/Editoriaux";
import EditorialDetail from "./pages/EditorialDetail";
import ProfilBensirac from "./pages/ProfilBensirac";
import Section from "./pages/Section";
import Category from "./pages/Category";
import Admin from "./pages/Admin";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BreakingNewsTicker from "./components/BreakingNewsTicker";

// Deployment trigger: 2026-04-16 - Force production sync
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <BreakingNewsTicker />
      <main className="flex-1">{children}</main>
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
      <Route path="/profil-bensirac">
        <PublicLayout><ProfilBensirac /></PublicLayout>
      </Route>
      <Route path="/section/:slug">
        <PublicLayout><Section /></PublicLayout>
      </Route>
      <Route path="/a-propos">
        <PublicLayout><APropos /></PublicLayout>
      </Route>
      <Route path="/contact">
        <PublicLayout><Contact /></PublicLayout>
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
