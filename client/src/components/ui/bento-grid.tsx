import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-[minmax(180px,auto)]", className)}>
      {children}
    </div>
  );
}

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  action?: ReactNode;
  colSpan?: number; // 1-12 (Desktop)
  rowSpan?: number;
}

export function BentoCard({ children, className, title, action, colSpan = 3, rowSpan = 1 }: BentoCardProps) {
  // Map colSpan to Tailwind classes to ensure they are picked up by the scanner
  // Default is col-span-1 for mobile, we use md:col-span-X logic if needed, but simple mapping:
  // For tablet (2 cols), we probably want everything to be 1 or 2 cols. 
  // Let's just let cards flow naturally on tablet or span full width if they are large on desktop.
  
  const colSpanClass = `lg:col-span-${colSpan}`;
  
  // Responsive logic:
  // If desktop span is >= 6 (half screen), make it full width on tablet (col-span-2)
  // Else make it single column on tablet (col-span-1)
  const tabletClass = colSpan >= 6 ? "md:col-span-2" : "md:col-span-1";
  
  const rowSpanClass = `row-span-${rowSpan}`;

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-border/80",
        // Using style object for exact spans if classes fail, but let's try to rely on safelisting or specific class usage
        // Actually, Tailwind 4 DOES support dynamic values if they are seen in full. 
        // We can't do `lg:col-span-${colSpan}` dynamically without safelisting.
        // So we will use the style prop for the desktop span to be safe, but we need media query support.
        // The best way in React without writing a massive switch statement is actually to just write the switch statement or object map.
        
        // Mobile: Default (col-span-1)
        tabletClass,
        
        // Desktop:
        colSpan === 1 && "lg:col-span-1",
        colSpan === 2 && "lg:col-span-2",
        colSpan === 3 && "lg:col-span-3",
        colSpan === 4 && "lg:col-span-4",
        colSpan === 5 && "lg:col-span-5",
        colSpan === 6 && "lg:col-span-6",
        colSpan === 7 && "lg:col-span-7",
        colSpan === 8 && "lg:col-span-8",
        colSpan === 9 && "lg:col-span-9",
        colSpan === 10 && "lg:col-span-10",
        colSpan === 11 && "lg:col-span-11",
        colSpan === 12 && "lg:col-span-12",
        
        rowSpan === 1 && "row-span-1",
        rowSpan === 2 && "row-span-2",
        rowSpan === 3 && "row-span-3",
        rowSpan === 4 && "row-span-4",
        
        className
      )}
    >
      {(title || action) && (
        <div className="flex items-center justify-between p-4 pb-2 border-b border-border/30 mb-2">
          {title && <h3 className="font-semibold text-xs tracking-wider text-muted-foreground uppercase">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={cn("px-4 pb-4 h-full w-full", (title || action) ? "h-[calc(100%-40px)]" : "")}>
        {children}
      </div>
    </div>
  );
}
