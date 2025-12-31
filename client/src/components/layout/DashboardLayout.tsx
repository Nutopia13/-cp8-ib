import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  dateRange?: string;
}

import { useTimezone } from "@/lib/timezone-context";

export function DashboardLayout({ children, title = "CP-8", subtitle, dateRange }: DashboardLayoutProps) {
  const [location] = useLocation();
  const { timezone, setTimezone } = useTimezone();

  const strategyTab = { name: "Strategy", path: "/strategy" };
  const optionsTab = { name: "Options", path: "/options" };
  const ibTabs = [
    { name: "Breakouts", path: "/" },
    { name: "Reversals", path: "/reversals" },
    { name: "Cross-Analysis", path: "/cross-analysis" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-bullish/20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <h1 className="text-xl font-bold tracking-tight">{title}</h1>
              {subtitle && <p className="text-xs text-muted-foreground hidden sm:block">{subtitle}</p>}
            </div>

            <nav className="flex items-center space-x-2">
              {/* Strategy Tab */}
              <div className="bg-muted/50 p-1 rounded-lg">
                <Link href={strategyTab.path}>
                  <span
                    className={cn(
                      "px-4 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer",
                      location === strategyTab.path
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    )}
                  >
                    {strategyTab.name}
                  </span>
                </Link>
              </div>

              {/* Separator */}
              <div className="h-6 w-px bg-border mx-1" />

              {/* Options Tab */}
              <div className="bg-muted/50 p-1 rounded-lg">
                <Link href={optionsTab.path}>
                  <span
                    className={cn(
                      "px-4 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer",
                      location === optionsTab.path
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    )}
                  >
                    {optionsTab.name}
                  </span>
                </Link>
              </div>

              {/* Separator */}
              <div className="h-6 w-px bg-border mx-1" />

              {/* IB Group */}
              <div className="bg-muted/50 p-1 rounded-lg flex items-center gap-0.5">
                <span className="text-[10px] text-muted-foreground font-medium px-2">IB</span>
                <div className="h-4 w-px bg-border/50 mx-0.5" />
                {ibTabs.map((tab) => {
                  const isActive = tab.path === "/"
                    ? location === "/"
                    : location.startsWith(tab.path);

                  return (
                    <Link key={tab.path} href={tab.path}>
                      <span
                        className={cn(
                          "px-3 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer",
                          isActive
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                        )}
                      >
                        {tab.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Timezone Switcher */}
            <div className="flex items-center bg-muted/50 p-1 rounded-md">
              {(['NY', 'Kiev', 'Warsaw'] as const).map((tz) => (
                <button
                  key={tz}
                  onClick={() => setTimezone(tz)}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-sm transition-all",
                    timezone === tz
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tz}
                </button>
              ))}
            </div>

            {dateRange && (
              <div className="hidden md:flex items-center px-3 py-1 rounded-md bg-muted/30 border border-border text-xs text-muted-foreground font-mono">
                {dateRange}
              </div>
            )}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-bullish to-success opacity-80" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
