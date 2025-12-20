import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Breakouts from "@/pages/Breakouts";
import Reversals from "@/pages/Reversals";
import Structure from "@/pages/Structure";
import CrossAnalysis from "@/pages/CrossAnalysis";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Breakouts} />
      <Route path="/reversals" component={Reversals} />
      <Route path="/structure" component={Structure} />
      <Route path="/cross-analysis" component={CrossAnalysis} />
      <Route component={NotFound} />
    </Switch>
  );
}

import { TimezoneProvider } from "@/lib/timezone-context";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TimezoneProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </TimezoneProvider>
    </QueryClientProvider>
  );
}

export default App;
