import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, ScatterChart, Scatter, Legend, LineChart, Line, ComposedChart, Area
} from "recharts";
import { structureDistData, retestData, volumeProfileData } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, Zap, Activity, ArrowUpRight, ArrowDownRight, BarChart3 } from "lucide-react";

const ComparisonTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border p-2 rounded-lg shadow-lg text-xs">
        <p className="font-mono text-muted-foreground">{payload[0].payload?.condition}</p>
        <p className="font-mono text-foreground text-[11px]">Breakouts: {payload[0].payload?.breakout}%</p>
        <p className="font-mono text-foreground text-[11px]">Reversals: {payload[0].payload?.reversal}%</p>
      </div>
    );
  }
  return null;
};

const comparisonData = [
  { condition: 'IB1 > IB2', x: 72, y: 28, breakout: 72, reversal: 28, count: 145 },
  { condition: 'IB1 < IB2', x: 45, y: 55, breakout: 45, reversal: 55, count: 82 },
  { condition: 'IB1 ≈ IB2', x: 50, y: 50, breakout: 50, reversal: 50, count: 23 },
];

export default function Structure() {
  return (
    <DashboardLayout 
      subtitle="Market Structure Analysis - NY Session"
      dateRange="Jan 1 - Dec 31, 2025"
    >
      <BentoGrid>
        
        {/* IB Range Size Distribution - Left Histogram */}
        <BentoCard colSpan={4} rowSpan={2} title="IB Range Distribution">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={structureDistData}
                margin={{ top: 10, right: 15, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.3} />
                <XAxis 
                  dataKey="range" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  stroke="var(--color-muted-foreground)"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  stroke="var(--color-muted-foreground)" 
                  label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  cursor={{ fill: 'var(--color-muted)/30' }} 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    fontSize: '11px',
                    padding: '6px 8px'
                  }}
                />
                <Bar dataKey="count" fill="var(--color-bullish)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-muted/20 rounded border border-border/50">
              <p className="text-muted-foreground text-[10px] mb-1">AVG</p>
              <p className="font-mono font-bold text-bullish">$850</p>
            </div>
            <div className="p-2 bg-muted/20 rounded border border-border/50">
              <p className="text-muted-foreground text-[10px] mb-1">MAX</p>
              <p className="font-mono font-bold text-warning">$2,400</p>
            </div>
            <div className="p-2 bg-muted/20 rounded border border-border/50">
              <p className="text-muted-foreground text-[10px] mb-1">MIN</p>
              <p className="font-mono font-bold">$200</p>
            </div>
          </div>
        </BentoCard>

        {/* IB1 vs IB2 Scatter Plot - Center */}
        <BentoCard colSpan={4} rowSpan={2} title="IB1 vs IB2 Comparison">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
                <XAxis 
                  dataKey="x" 
                  name="Breakout %" 
                  domain={[0, 100]} 
                  stroke="var(--color-muted-foreground)" 
                  fontSize={10} 
                  tickLine={false}
                  label={{ value: 'Breakout %', position: 'bottom', offset: 0, fontSize: 10 }}
                />
                <YAxis 
                  dataKey="y" 
                  name="Reversal %" 
                  domain={[0, 100]} 
                  stroke="var(--color-muted-foreground)" 
                  fontSize={10}
                  tickLine={false}
                  label={{ value: 'Reversal %', angle: -90, position: 'left' }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={<ComparisonTooltip />}
                />
                <Scatter 
                  name="Market Structure" 
                  data={comparisonData} 
                  fill="var(--color-bullish)"
                  fillOpacity={0.6}
                  shape="circle"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </BentoCard>

        {/* Retest Analysis - Right Side */}
        <BentoCard colSpan={4} rowSpan={2} title="Retest Dynamics">
          <div className="h-[300px] w-full flex flex-col gap-6">
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={retestData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {retestData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} opacity={0.85} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2 bg-success/10 border border-success/30 rounded-lg">
                <p className="text-muted-foreground text-[10px] mb-1">Retest Prob</p>
                <p className="font-mono font-bold text-success text-lg">68%</p>
              </div>
              <div className="p-2 bg-bullish/10 border border-bullish/30 rounded-lg">
                <p className="text-muted-foreground text-[10px] mb-1">Success</p>
                <p className="font-mono font-bold text-bullish text-lg">72%</p>
              </div>
              <div className="p-2 bg-warning/10 border border-warning/30 rounded-lg">
                <p className="text-muted-foreground text-[10px] mb-1">Avg Time</p>
                <p className="font-mono font-bold text-warning text-lg">45m</p>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Full Width Comparison Table */}
        <BentoCard colSpan={12} rowSpan={1} title="Extended IB Comparison Matrix">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/20 border-b border-border/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Condition</th>
                  <th className="px-4 py-3 text-center font-semibold">Sessions</th>
                  <th className="px-4 py-3 text-center font-semibold">Breakout %</th>
                  <th className="px-4 py-3 text-center font-semibold">Reversal %</th>
                  <th className="px-4 py-3 text-center font-semibold">Avg Range</th>
                  <th className="px-4 py-3 text-center font-semibold">Volatility</th>
                  <th className="px-4 py-3 text-right font-semibold">Signal Strength</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr className="hover:bg-muted/10 transition-colors group">
                  <td className="px-4 py-3 font-medium text-foreground">IB1 {'>'} IB2</td>
                  <td className="px-4 py-3 text-center font-mono text-sm">145</td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono font-bold text-bullish">72%</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono font-bold text-bearish">28%</span>
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-xs">$1,050</td>
                  <td className="px-4 py-3 text-center">
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-bullish/10 text-bullish rounded text-xs font-medium">
                      <TrendingUp size={12} /> High
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end">
                      <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-bullish to-success" style={{width: '72%'}}></div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors group">
                  <td className="px-4 py-3 font-medium text-foreground">IB1 {'<'} IB2</td>
                  <td className="px-4 py-3 text-center font-mono text-sm">82</td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono font-bold text-warning">45%</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono font-bold text-success">55%</span>
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-xs">$720</td>
                  <td className="px-4 py-3 text-center">
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-warning/10 text-warning rounded text-xs font-medium">
                      <Activity size={12} /> Medium
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end">
                      <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-warning to-muted-foreground" style={{width: '45%'}}></div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors group">
                  <td className="px-4 py-3 font-medium text-foreground">IB1 ≈ IB2</td>
                  <td className="px-4 py-3 text-center font-mono text-sm">23</td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono font-bold">50%</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-mono font-bold">50%</span>
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-xs">$610</td>
                  <td className="px-4 py-3 text-center">
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-muted-foreground/10 text-muted-foreground rounded text-xs font-medium">
                      <Zap size={12} /> Neutral
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end">
                      <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-muted-foreground" style={{width: '50%'}}></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BentoCard>

        {/* Volume Profile */}
        <BentoCard colSpan={6} rowSpan={2} title="Volume Profile by Price Level">
          <div className="h-[250px] w-full flex items-end justify-between gap-0.5 px-2">
            {volumeProfileData.map((d, i) => (
              <div 
                key={i} 
                className="w-full flex flex-col justify-end group h-full relative hover:brightness-150 transition-all" 
                title={`Price: $${d.priceLevel} Vol: ${d.volume}`}
              >
                <div 
                  className="w-full bg-gradient-to-t from-bullish via-bullish to-bullish/30 rounded-t-sm shadow-sm group-hover:shadow-bullish/30 transition-all"
                  style={{ height: `${(d.volume / 1000) * 100}%`, minHeight: '2px' }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap z-50 border border-border/50 font-mono">
                    ${d.priceLevel}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-muted-foreground flex justify-between px-2">
            <span className="font-mono">${volumeProfileData[0].priceLevel}</span>
            <span className="font-mono">${volumeProfileData[volumeProfileData.length - 1].priceLevel}</span>
          </div>
        </BentoCard>

        {/* Key Insights */}
        <BentoCard colSpan={6} rowSpan={2} title="Structure Insights">
          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-bullish/20 bg-bullish/5 hover:bg-bullish/10 transition-colors">
              <div className="flex items-start gap-3">
                <ArrowUpRight size={16} className="text-bullish mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Bullish Structure</p>
                  <p className="text-xs text-muted-foreground mt-0.5">When IB1 {'>'} IB2, expansion increases probability of upside breakouts to 72%.</p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-bearish/20 bg-bearish/5 hover:bg-bearish/10 transition-colors">
              <div className="flex items-start gap-3">
                <ArrowDownRight size={16} className="text-bearish mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Reversal Risk</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Contraction (IB1 {'<'} IB2) signals higher reversal risk at 55% probability.</p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-warning/20 bg-warning/5 hover:bg-warning/10 transition-colors">
              <div className="flex items-start gap-3">
                <BarChart3 size={16} className="text-warning mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Optimal Range</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Most reliable setups occur when IB range is between $600-$1,200.</p>
                </div>
              </div>
            </div>
          </div>
        </BentoCard>

      </BentoGrid>
    </DashboardLayout>
  );
}
