import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Breakouts from "@/pages/Breakouts";
import Reversals from "@/pages/Reversals";
import Structure from "@/pages/Structure";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Breakouts} />
      <Route path="/reversals" component={Reversals} />
      <Route path="/structure" component={Structure} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
