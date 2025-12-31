import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart
} from "recharts";
import { breakoutTimeData, breakoutStats, breakoutTableData, heatmapData } from "@/lib/mock-data";
import { ArrowUp, ArrowDown, Activity, Info, TrendingUp, TrendingDown, Clock, AlertCircle, X } from "lucide-react";
import { useState } from "react";

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

import { useTimezone } from "@/lib/timezone-context";

export default function Breakouts() {
  const { formatTime } = useTimezone();
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  // Transform data for charts/tables with timezone
  const localizedTimeData = breakoutTimeData.map(d => ({ ...d, time: formatTime(d.time) }));
  const localizedTableData = breakoutTableData.map(d => ({ ...d, time: formatTime(d.time) }));

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const hours = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
  const localizedHours = hours.map(h => formatTime(h));

  return (
    <DashboardLayout
      subtitle="IB Analysis (09:30-10:30 ET, 60min) - Real 2025 Data"
      dateRange="253 Trading Days Analyzed (Jan-Dec 2025)"
    >
      <BentoGrid>
        {/* Main Chart - Breakout Success by IB Time */}
        <BentoCard colSpan={8} rowSpan={2} title="Breakout Success % by IB Start Time (30-min IB, analyzed until 00:00)" className="min-h-[400px]">
          <div className="w-full h-[320px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={localizedTableData.map(d => ({ time: d.time, success: (100 - d.pct).toFixed(1) }))} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-bullish)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-bullish)" stopOpacity={0} />
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
                  domain={[0, 50]}
                  unit="%"
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-muted-foreground)', strokeWidth: 1 }} />
                <Line
                  type="monotone"
                  dataKey="success"
                  stroke="var(--color-bullish)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "var(--color-bullish)" }}
                  activeDot={{ r: 6, fill: "var(--color-bullish)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </BentoCard>

        {/* Quick Stats - Real 2025 Data */}
        <BentoCard colSpan={4} rowSpan={1} title="2025 IB Statistics (09:30-10:30 ET)">
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="flex flex-col justify-center p-3 bg-muted/20 rounded-lg border border-border/50">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Activity size={12} /> Total Days
              </span>
              <span className="text-2xl font-mono font-bold mt-1">253</span>
            </div>
            <div className="flex flex-col justify-center p-3 bg-muted/20 rounded-lg border border-border/50">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp size={12} /> Breakout Rate
              </span>
              <span className="text-2xl font-mono font-bold mt-1 text-bullish">98%</span>
            </div>
            <div className="flex flex-col justify-center p-3 bg-muted/20 rounded-lg border border-border/50">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Info size={12} /> Avg IB Range
              </span>
              <span className="text-xl font-mono font-bold mt-1 text-cyan-400">$1,391</span>
            </div>
            <div className="flex flex-col justify-center p-3 bg-muted/20 rounded-lg border border-border/50">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock size={12} /> Avg Breakout Time
              </span>
              <span className="text-xl font-mono font-bold mt-1 text-warning">59 min</span>
            </div>
          </div>
        </BentoCard>

        {/* Key Insights - Real 2025 Findings */}
        <BentoCard colSpan={4} rowSpan={1} title="Key Findings">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                <TrendingUp size={14} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-medium">Small IB → High Volatility</p>
                <p className="text-xs text-muted-foreground">100% breakout rate, 30.2% reversal risk, 1.33× avg extension</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-warning/10 flex items-center justify-center shrink-0 mt-0.5">
                <Activity size={14} className="text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium">Medium IB → Balanced</p>
                <p className="text-xs text-muted-foreground">97.6% breakout, 21.8% reversal, most common (49% of days)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-bullish/10 flex items-center justify-center shrink-0 mt-0.5">
                <TrendingDown size={14} className="text-bullish" />
              </div>
              <div>
                <p className="text-sm font-medium">Large IB → Trend Days</p>
                <p className="text-xs text-muted-foreground">91.7% breakout, only 4.2% reversal, strong directional bias</p>
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
                {localizedTableData.map((row, i) => (
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
              {localizedHours.filter((_, i) => i % 2 === 0).map(h => (
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

        {/* Resources Section - Analysis PNG Charts */}
        <BentoCard colSpan={12} rowSpan={3} title="📊 Detailed Analysis Resources">
          <div className="space-y-4">
            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Info size={18} className="text-cyan-400" />
                2025 Initial Balance Study Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <p className="font-semibold text-white mb-1">Study Parameters:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><span className="text-cyan-400">IB Period:</span> 09:30-10:30 ET (60 minutes)</li>
                    <li><span className="text-cyan-400">Analysis Window:</span> 09:30-16:00 ET</li>
                    <li><span className="text-cyan-400">Dataset:</span> 253 trading days (Jan-Dec 2025)</li>
                    <li><span className="text-cyan-400">Asset:</span> BTC/USDT (Binance 5m candles)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Key Statistics:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><span className="text-green-400">98%</span> breakout rate (only 2% range-bound)</li>
                    <li><span className="text-cyan-400">$1,391</span> average IB range (ATR-normalized)</li>
                    <li><span className="text-yellow-400">59 minutes</span> average time to first breakout</li>
                    <li><span className="text-orange-400">19.8%</span> of days extend \u003e1.5× IB range</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { src: "/ib-analysis/01_ib_size_distribution.png", title: "IB Size Distribution", desc: "Small: 38% | Medium: 49% | Large: 10%" },
                { src: "/ib-analysis/02_breakout_frequency_by_size.png", title: "Breakout Patterns by Size", desc: "How IB size affects breakout type" },
                { src: "/ib-analysis/03_hour_of_day_breakout.png", title: "Breakout Timing", desc: "When breakouts occur after IB" },
                { src: "/ib-analysis/04_range_extension_distribution.png", title: "Range Extensions", desc: "How far price extends beyond IB" },
                { src: "/ib-analysis/05_day_of_week_patterns.png", title: "Day-of-Week Analysis", desc: "Monday-Friday breakout patterns" },
                { src: "/ib-analysis/06_conditional_probability_matrix.png", title: "Probability Matrix", desc: "IB Size conditional probabilities" },
              ].map((chart, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-colors cursor-pointer"
                  onClick={() => setExpandedImage(chart.src)}
                >
                  <img
                    src={chart.src}
                    alt={chart.title}
                    className="w-full h-48 object-contain bg-white p-2"
                  />
                  <div className="p-3">
                    <h4 className="font-semibold text-white text-sm mb-1">{chart.title}</h4>
                    <p className="text-xs text-muted-foreground">{chart.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-white mb-2">Critical Trading Insights:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-muted-foreground">
                    <div>
                      <span className="text-green-400 font-semibold">Small IB Days:</span>
                      <p>100% breakout probability with highest volatility (1.33× avg extension). 30.2% reversal risk means both-way action likely.</p>
                    </div>
                    <div>
                      <span className="text-yellow-400 font-semibold">Medium IB Days:</span>
                      <p>Most common pattern (49% of days). 97.6% breakout rate with 21.8% reversal risk. Balanced risk/reward profile.</p>
                    </div>
                    <div>
                      <span className="text-cyan-400 font-semibold">Large IB Days:</span>
                      <p>Strong directional bias - only 4.2% both-way breakouts. 91.7% breakout rate. Best for trend following.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BentoCard>

      </BentoGrid>

      {/* Image Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setExpandedImage(null)}
        >
          <button
            onClick={() => setExpandedImage(null)}
            className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
          >
            <X size={24} className="text-white" />
          </button>
          <img
            src={expandedImage}
            alt="Expanded chart"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </DashboardLayout>
  );
}
