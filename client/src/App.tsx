import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import VenuePage from "./pages/VenuePage";
import ExperiencesPage from "./pages/ExperiencesPage";
import ExplorePage from "./pages/ExplorePage";
import TravelPage from "./pages/TravelPage";
import SchedulePage from "./pages/SchedulePage";
import FaqPage from "./pages/FaqPage";
import RsvpRegistryPage from "./pages/RsvpRegistryPage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/venue"} component={VenuePage} />
      <Route path={"/experiences"} component={ExperiencesPage} />
      <Route path={"/explore"} component={ExplorePage} />
      <Route path={"/travel"} component={TravelPage} />
      <Route path={"/schedule"} component={SchedulePage} />
      <Route path={"/404"} component={NotFound} />
      <Route path={"/faq"} component={FaqPage} />
      <Route path={"/rsvp"} component={RsvpRegistryPage} />
      <Route component={NotFound} />
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
