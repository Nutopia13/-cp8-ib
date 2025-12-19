import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart 
} from "recharts";
import { breakoutTimeData, breakoutStats, breakoutTableData, heatmapData } from "@/lib/mock-data";
import { ArrowUp, ArrowDown, Activity, Info, TrendingUp, TrendingDown, Clock, AlertCircle } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border p-2 rounded-lg shadow-lg text-xs">
        <p className="font-mono text-muted-foreground mb-1">{label}</p>
        <p className="font-medium text-bullish">
          Prob: {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export default function Breakouts() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const hours = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

  return (
    <DashboardLayout 
      subtitle="Breakouts Analysis - NY Session"
      dateRange="Jan 1 - Dec 31, 2025"
    >
      <BentoGrid>
        {/* Main Chart */}
        <BentoCard colSpan={8} rowSpan={2} title="Breakout Probability by IB Time" className="min-h-[400px]">
          <div className="w-full h-[320px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={breakoutTimeData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="colorProb" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-bullish)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-bullish)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} opacity={0.5} />
                <XAxis 
                  dataKey="time" 
                  stroke="var(--color-muted-foreground)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  minTickGap={30}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  domain={[0, 100]}
                  unit="%"
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-muted-foreground)', strokeWidth: 1 }} />
                <Line 
                  type="monotone" 
                  dataKey="probability" 
                  stroke="var(--color-bullish)" 
                  strokeWidth={2} 
                  dot={false}
                  activeDot={{ r: 6, fill: "var(--color-bullish)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </BentoCard>

        {/* Quick Stats */}
        <BentoCard colSpan={4} rowSpan={1} title="Quick Stats">
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="flex flex-col justify-center p-3 bg-muted/20 rounded-lg border border-border/50">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Activity size={12} /> Total Sessions
              </span>
              <span className="text-2xl font-mono font-bold mt-1">{breakoutStats.totalSessions}</span>
            </div>
            <div className="flex flex-col justify-center p-3 bg-muted/20 rounded-lg border border-border/50">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp size={12} /> Avg Breakouts
              </span>
              <span className="text-2xl font-mono font-bold mt-1 text-bullish">{breakoutStats.avgBreakouts}</span>
            </div>
            <div className="col-span-2 flex flex-col justify-center p-3 bg-muted/20 rounded-lg border border-border/50">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock size={12} /> Peak Breakout Time
              </span>
              <span className="text-xl font-mono font-bold mt-1 text-warning">{breakoutStats.peakTime}</span>
            </div>
          </div>
        </BentoCard>

        {/* Key Insights */}
        <BentoCard colSpan={4} rowSpan={1} title="Key Insights">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                <TrendingUp size={14} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-medium">Highest Probability</p>
                <p className="text-xs text-muted-foreground">Breakouts peak at {breakoutStats.highest} during 10:30 AM window.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-bearish/10 flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle size={14} className="text-bearish" />
              </div>
              <div>
                <p className="text-sm font-medium">Lowest Probability</p>
                <p className="text-xs text-muted-foreground">Avoid entries after 14:00 ({breakoutStats.lowest} success rate).</p>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Detailed Stats Table */}
        <BentoCard colSpan={8} rowSpan={2} title="Detailed Breakout Statistics" className="overflow-hidden">
          <div className="overflow-auto h-[350px] pr-2">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/30 sticky top-0 z-10 backdrop-blur-sm">
                <tr>
                  <th className="px-4 py-3 font-medium">IB Time</th>
                  <th className="px-4 py-3 font-medium text-right">Sessions</th>
                  <th className="px-4 py-3 font-medium text-right text-bullish">Only ↑</th>
                  <th className="px-4 py-3 font-medium text-right text-bearish">Only ↓</th>
                  <th className="px-4 py-3 font-medium text-right text-warning">Both</th>
                  <th className="px-4 py-3 font-medium text-right">Success %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {breakoutTableData.map((row, i) => (
                  <tr key={i} className="hover:bg-muted/20 transition-colors group">
                    <td className="px-4 py-2 font-mono text-muted-foreground group-hover:text-foreground">{row.time}</td>
                    <td className="px-4 py-2 font-mono text-right">{row.sessions}</td>
                    <td className="px-4 py-2 font-mono text-right text-bullish/80">{row.up}</td>
                    <td className="px-4 py-2 font-mono text-right text-bearish/80">{row.down}</td>
                    <td className="px-4 py-2 font-mono text-right text-warning/80">{row.both}</td>
                    <td className="px-4 py-2 font-mono text-right">
                      <span className={
                        row.pct > 75 ? "text-success font-bold" : 
                        row.pct > 50 ? "text-warning" : "text-bearish"
                      }>
                        {row.pct}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BentoCard>

        {/* Heatmap */}
        <BentoCard colSpan={4} rowSpan={2} title="Breakout Intensity by Hour">
          <div className="flex flex-col h-full">
             <div className="flex justify-between mb-2 pl-8">
               {hours.filter((_, i) => i % 2 === 0).map(h => (
                 <span key={h} className="text-[10px] text-muted-foreground font-mono">{h}</span>
               ))}
             </div>
             <div className="flex-1 flex gap-2">
               <div className="flex flex-col justify-between py-1 text-[10px] text-muted-foreground font-mono w-6">
                 {days.map(d => <span key={d}>{d}</span>)}
               </div>
               <div className="flex-1 grid grid-cols-9 gap-1">
                 {heatmapData.slice(0, 5).flatMap((dayRow, dayIndex) => 
                    dayRow.map((cell, hourIndex) => (
                      <div 
                        key={`${dayIndex}-${hourIndex}`}
                        className="rounded-sm transition-all hover:ring-1 ring-foreground relative group"
                        style={{
                          backgroundColor: `hsl(var(--bullish) / ${cell.value / 100})`,
                          opacity: 0.5 + (cell.value / 200)
                        }}
                      >
                         <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-xl pointer-events-none whitespace-nowrap z-50">
                           {days[dayIndex]} {hours[hourIndex]}: {Math.round(cell.value)}%
                         </div>
                      </div>
                    ))
                 )}
               </div>
             </div>
          </div>
        </BentoCard>

      </BentoGrid>
    </DashboardLayout>
  );
}
