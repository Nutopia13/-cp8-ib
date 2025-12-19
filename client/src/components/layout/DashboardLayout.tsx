import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  dateRange?: string;
}

export function DashboardLayout({ children, title = "CP-8", subtitle, dateRange }: DashboardLayoutProps) {
  const [location] = useLocation();

  const tabs = [
    { name: "Breakouts", path: "/" },
    { name: "Reversals", path: "/reversals" },
    { name: "Structure", path: "/structure" },
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
            
            <nav className="flex items-center space-x-1 bg-muted/50 p-1 rounded-lg">
              {tabs.map((tab) => {
                // Determine if this tab is active. 
                // For root path "/", only active if location is strictly "/"
                // For other paths, active if location starts with path
                const isActive = tab.path === "/" 
                  ? location === "/" 
                  : location.startsWith(tab.path);
                  
                return (
                  <Link key={tab.path} href={tab.path}>
                    <span
                      className={cn(
                        "px-4 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer",
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
            </nav>
          </div>

          <div className="flex items-center gap-4">
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
