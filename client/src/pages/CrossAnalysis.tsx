import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { crossAnalysisData } from "@/lib/mock-data";
import { Activity, ArrowRight, TrendingUp } from "lucide-react";
import { useTimezone } from "@/lib/timezone-context";

export default function CrossAnalysis() {
    const { formatTime } = useTimezone();
    const localizedData = crossAnalysisData.map(d => ({ ...d, time: formatTime(d.time) }));

    return (
        <DashboardLayout
            subtitle="Cross Analysis: Time x Market Structure"
            dateRange="Jan 1 - Dec 31, 2025"
        >
            <BentoGrid>

                {/* Intro Card */}
                <BentoCard colSpan={4} rowSpan={1} title="Cross-Analysis Logic">
                    <div className="p-4 space-y-2 text-sm text-muted-foreground">
                        <p>This view breaks down Breakout Probabilities by <span className="text-foreground font-medium">Market Structure</span> (IB1 vs IB2) and <span className="text-foreground font-medium">Time of Day</span>.</p>
                        <div className="flex items-center gap-2 mt-4 text-xs bg-muted/30 p-2 rounded border border-border">
                            <Activity size={12} />
                            <span>Use this to filter your bias based on how the first hour ({formatTime("09:30")}-{formatTime("10:30")}) evolved.</span>
                        </div>
                    </div>
                </BentoCard>

                {/* Legend */}
                <BentoCard colSpan={8} rowSpan={1} title="Structure Definitions">
                    <div className="grid grid-cols-2 gap-4 h-full items-center p-2">
                        <div className="flex flex-col gap-1 p-3 border border-bullish/20 bg-bullish/5 rounded-lg">
                            <span className="font-mono text-xs font-bold text-bullish">IB1 {'>'} IB2</span>
                            <span className="text-xs text-muted-foreground">The first 30m range ({formatTime("09:30")}-{formatTime("10:00")}) is WIDER than the second 30m ({formatTime("10:00")}-{formatTime("11:00")}). Indicates early volatility, likely chop or range-bound until breakout.</span>
                        </div>
                        <div className="flex flex-col gap-1 p-3 border border-warning/20 bg-warning/5 rounded-lg">
                            <span className="font-mono text-xs font-bold text-warning">IB1 {'<'} IB2</span>
                            <span className="text-xs text-muted-foreground">The second 30m range ({formatTime("10:00")}-{formatTime("11:00")}) EXPANDED the initial range. Often indicates a trend day initiation or a stop hunt.</span>
                        </div>
                    </div>
                </BentoCard>

                {/* Main Data Table */}
                <BentoCard colSpan={12} rowSpan={3} title="Conditional Probabilities Table" className="overflow-hidden">
                    <div className="overflow-auto h-[500px] w-full">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 sticky top-0 z-10 backdrop-blur-sm shadow-sm">
                                <tr>
                                    <th className="px-6 py-3 font-medium">IB Time</th>
                                    <th className="px-6 py-3 font-medium">Structure Condition</th>
                                    <th className="px-6 py-3 font-medium text-right text-bullish">Breakout %</th>
                                    <th className="px-6 py-3 font-medium text-right text-bearish">Reversal %</th>
                                    <th className="px-6 py-3 font-medium text-right">Sessions</th>
                                    <th className="px-6 py-3 font-medium text-right">Insight</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {localizedData.map((row, i) => (
                                    <tr key={i} className="hover:bg-muted/10 transition-colors group">
                                        <td className="px-6 py-3 font-mono text-muted-foreground group-hover:text-foreground font-medium">{row.time}</td>
                                        <td className="px-6 py-3 font-mono">
                                            <span className={`px-2 py-0.5 rounded textxs font-bold ${row.structure === 'IB1 > IB2' ? 'text-bullish bg-bullish/10' : 'text-warning bg-warning/10'
                                                }`}>
                                                {row.structure}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3 font-mono text-right font-bold text-bullish/90">
                                            {row.breakout_prob.toFixed(1)}%
                                        </td>
                                        <td className="px-6 py-3 font-mono text-right text-bearish/90">
                                            {row.reversal_prob.toFixed(1)}%
                                        </td>
                                        <td className="px-6 py-3 font-mono text-right text-muted-foreground">
                                            {row.count}
                                        </td>
                                        <td className="px-6 py-3 text-right">
                                            {row.breakout_prob > 60 ? (
                                                <span className="flex items-center justify-end gap-1 text-[10px] text-success font-medium uppercase tracking-wider">
                                                    Trend Continuation
                                                    <TrendingUp size={12} />
                                                </span>
                                            ) : row.reversal_prob > 60 ? (
                                                <span className="flex items-center justify-end gap-1 text-[10px] text-bearish font-medium uppercase tracking-wider">
                                                    High Risk Reversal
                                                    <Activity size={12} />
                                                </span>
                                            ) : (
                                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Neutral / Chop</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </BentoCard>

            </BentoGrid>
        </DashboardLayout>
    );
}
