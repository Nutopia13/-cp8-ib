import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from "recharts";
import { structureDistData, retestData, volumeProfileData } from "@/lib/mock-data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border p-2 rounded-lg shadow-lg text-xs">
        <p className="font-mono text-muted-foreground mb-1">{label}</p>
        <p className="font-medium text-foreground">
          Count: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default function Structure() {
  return (
    <DashboardLayout 
      subtitle="Market Structure Analysis - NY Session"
      dateRange="Jan 1 - Dec 31, 2025"
    >
      <BentoGrid>
        
        {/* IB Range Size Distribution */}
        <BentoCard colSpan={6} rowSpan={2} title="IB Range Size Distribution">
          <div className="flex gap-4 mb-4 text-xs font-mono">
            <div className="px-2 py-1 bg-muted rounded">Avg: $850</div>
            <div className="px-2 py-1 bg-muted rounded">Max: $2,400</div>
            <div className="px-2 py-1 bg-muted rounded">Min: $200</div>
          </div>
          <div className="h-[250px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={structureDistData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                 <XAxis dataKey="range" fontSize={10} tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" />
                 <YAxis fontSize={10} tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" />
                 <Tooltip cursor={{fill: 'var(--color-muted)/20'}} content={<CustomTooltip />} />
                 <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </BentoCard>

        {/* Retest Analysis */}
        <BentoCard colSpan={6} rowSpan={2} title="Retest Analysis">
          <div className="grid grid-cols-2 h-full">
            <div className="h-full relative min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={retestData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {retestData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center space-y-4 pr-8">
              <div className="flex justify-between items-center border-b border-border/50 pb-2">
                 <span className="text-sm text-muted-foreground">Retest Prob</span>
                 <span className="font-mono font-bold text-success">68%</span>
              </div>
              <div className="flex justify-between items-center border-b border-border/50 pb-2">
                 <span className="text-sm text-muted-foreground">Success Rate</span>
                 <span className="font-mono font-bold text-bullish">72%</span>
              </div>
              <div className="flex justify-between items-center border-b border-border/50 pb-2">
                 <span className="text-sm text-muted-foreground">Avg Time</span>
                 <span className="font-mono font-bold">45m</span>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Comparison Matrix */}
        <BentoCard colSpan={12} rowSpan={2} title="IB Extension Comparison">
          <div className="overflow-x-auto">
             <table className="w-full text-sm mt-2">
                <thead className="text-xs text-muted-foreground bg-muted/20">
                  <tr>
                    <th className="p-3 text-left">Condition</th>
                    <th className="p-3 text-right">Count</th>
                    <th className="p-3 text-right">Breakout %</th>
                    <th className="p-3 text-right">Reversal %</th>
                    <th className="p-3 text-right">Trend Strength</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                   <tr>
                     <td className="p-3 font-medium">IB1 {'>'} IB2</td>
                     <td className="p-3 text-right font-mono">145</td>
                     <td className="p-3 text-right font-mono text-bullish">72%</td>
                     <td className="p-3 text-right font-mono text-bearish">28%</td>
                     <td className="p-3 text-right">
                       <div className="h-1.5 w-24 bg-muted ml-auto rounded-full overflow-hidden">
                         <div className="h-full bg-bullish w-[72%]"></div>
                       </div>
                     </td>
                   </tr>
                   <tr>
                     <td className="p-3 font-medium">IB1 {'<'} IB2</td>
                     <td className="p-3 text-right font-mono">82</td>
                     <td className="p-3 text-right font-mono text-warning">45%</td>
                     <td className="p-3 text-right font-mono text-success">55%</td>
                     <td className="p-3 text-right">
                       <div className="h-1.5 w-24 bg-muted ml-auto rounded-full overflow-hidden">
                         <div className="h-full bg-warning w-[45%]"></div>
                       </div>
                     </td>
                   </tr>
                   <tr>
                     <td className="p-3 font-medium">IB1 ≈ IB2</td>
                     <td className="p-3 text-right font-mono">23</td>
                     <td className="p-3 text-right font-mono">50%</td>
                     <td className="p-3 text-right font-mono">50%</td>
                     <td className="p-3 text-right">
                       <div className="h-1.5 w-24 bg-muted ml-auto rounded-full overflow-hidden">
                         <div className="h-full bg-muted-foreground w-[50%]"></div>
                       </div>
                     </td>
                   </tr>
                </tbody>
             </table>
          </div>
        </BentoCard>

        {/* Volume Profile */}
        <BentoCard colSpan={6} rowSpan={2} title="Volume Profile">
           <div className="h-[250px] w-full flex items-end justify-between gap-1 px-2">
              {volumeProfileData.map((d, i) => (
                <div key={i} className="w-full flex flex-col justify-end group h-full relative" title={`Price: ${d.priceLevel} Vol: ${d.volume}`}>
                  <div 
                    className="w-full bg-muted-foreground/30 hover:bg-bullish transition-colors rounded-sm"
                    style={{ height: `${(d.volume / 1000) * 100}%` }}
                  ></div>
                </div>
              ))}
           </div>
        </BentoCard>
        
        {/* Session Timeline */}
        <BentoCard colSpan={6} rowSpan={2} title="Session Timeline">
           <div className="h-[250px] w-full flex flex-col justify-center gap-6 px-4">
              {/* Timeline Track */}
              <div className="relative w-full h-2 bg-muted rounded-full">
                <div className="absolute top-0 left-0 h-full w-[20%] bg-muted-foreground/20 rounded-l-full" title="Pre-market"></div>
                <div className="absolute top-0 left-[20%] h-full w-[10%] bg-bullish/50" title="Open"></div>
                <div className="absolute top-0 left-[30%] h-full w-[40%] bg-muted-foreground/10" title="Mid-Day"></div>
                <div className="absolute top-0 left-[70%] h-full w-[30%] bg-warning/40 rounded-r-full" title="Close"></div>
                
                {/* Markers */}
                <div className="absolute top-4 left-[20%] -translate-x-1/2 text-[10px] font-mono text-muted-foreground">09:30</div>
                <div className="absolute top-4 left-[30%] -translate-x-1/2 text-[10px] font-mono text-muted-foreground">10:30</div>
                <div className="absolute top-4 left-[70%] -translate-x-1/2 text-[10px] font-mono text-muted-foreground">14:00</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-muted/20 rounded border border-border/50">
                  <div className="text-xs text-muted-foreground mb-1">Open Volatility</div>
                  <div className="text-lg font-mono font-bold text-bullish">High</div>
                </div>
                <div className="p-3 bg-muted/20 rounded border border-border/50">
                  <div className="text-xs text-muted-foreground mb-1">Close Trend</div>
                  <div className="text-lg font-mono font-bold text-warning">Mixed</div>
                </div>
              </div>
           </div>
        </BentoCard>

      </BentoGrid>
    </DashboardLayout>
  );
}
