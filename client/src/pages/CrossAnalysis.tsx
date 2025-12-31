import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { TrendingUp, TrendingDown, Activity, Clock, Target, AlertTriangle, CheckCircle2, BarChart3, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { crossAnalysisData } from "@/lib/mock-data";
import { useTimezone } from "@/lib/timezone-context";

export default function CrossAnalysis() {
    const { formatTime } = useTimezone();
    const localizedData = crossAnalysisData.map(d => ({ ...d, time: formatTime(d.time) }));
    const [activeTab, setActiveTab] = useState<'cross' | 'comparison'>('cross');

    return (
        <DashboardLayout
            subtitle="IB Cross-Analysis & Period Comparison"
            dateRange="253 Trading Days (2025)"
        >
            {/* Tab Navigation */}
            <div className="mb-6 border-b border-border">
                <div className="flex gap-1">
                    <button
                        onClick={() => setActiveTab('cross')}
                        className={cn(
                            "px-6 py-3 text-sm font-medium transition-all border-b-2",
                            activeTab === 'cross'
                                ? "border-cyan-400 text-cyan-400"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <BarChart3 size={16} className="inline mr-2" />
                        Cross-Analysis
                    </button>
                    <button
                        onClick={() => setActiveTab('comparison')}
                        className={cn(
                            "px-6 py-3 text-sm font-medium transition-all border-b-2",
                            activeTab === 'comparison'
                                ? "border-cyan-400 text-cyan-400"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Activity size={16} className="inline mr-2" />
                        IB Period Comparison
                    </button>
                </div>
            </div>

            {/* Cross-Analysis Tab Content */}
            {activeTab === 'cross' && (
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
                                <span className="font-mono text-xs font-bold text-bullish">IB1 {'>'}IB2</span>
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
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${row.structure === 'IB1 > IB2' ? 'text-bullish bg-bullish/10' : 'text-warning bg-warning/10'
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
            )}

            {/* IB Period Comparison Tab Content */}
            {activeTab === 'comparison' && (
                <BentoGrid>
                    {/* Executive Summary */}
                    <BentoCard colSpan={12} rowSpan={1} title="Executive Summary">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-cyan-400">IB1: 09:30-10:30 ET</h3>
                                <p className="text-sm text-muted-foreground">First hour of NY session - captures initial volatility from overnight positioning</p>
                                <div className="grid grid-cols-2 gap-2 mt-3">
                                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-2">
                                        <div className="text-xs text-muted-foreground">Avg Range</div>
                                        <div className="text-xl font-bold text-cyan-400">$1,391</div>
                                    </div>
                                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-2">
                                        <div className="text-xs text-muted-foreground">Size Dist.</div>
                                        <div className="text-sm font-semibold text-white">49% Medium</div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-orange-400">IB2: 10:30-11:30 ET</h3>
                                <p className="text-sm text-muted-foreground">Second hour - predominantly smaller ranges after initial move</p>
                                <div className="grid grid-cols-2 gap-2 mt-3">
                                    <div className="bg-orange-500/10 border border-orange-500/30 rounded p-2">
                                        <div className="text-xs text-muted-foreground">Avg Range</div>
                                        <div className="text-xl font-bold text-orange-400">$1,084</div>
                                    </div>
                                    <div className="bg-orange-500/10 border border-orange-500/30 rounded p-2">
                                        <div className="text-xs text-muted-foreground">Size Dist.</div>
                                        <div className="text-sm font-semibold text-white">58% Small</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BentoCard>

                    {/* Quick Summary Cards */}
                    <BentoCard colSpan={4} rowSpan={1} title="🎯 Winner">
                        <div className="flex flex-col items-center justify-center h-full p-4 bg-gradient-to-br from-cyan-900/30 to-cyan-900/10 rounded-lg border-2 border-cyan-500/50">
                            <div className="text-4xl font-bold text-cyan-400 mb-2">IB1</div>
                            <div className="text-sm text-center text-muted-foreground">
                                <CheckCircle2 size={16} className="inline mr-1" />
                                Better for momentum trading
                            </div>
                        </div>
                    </BentoCard>

                    <BentoCard colSpan={4} rowSpan={1} title="Range Difference">
                        <div className="flex flex-col items-center justify-center h-full p-4">
                            <div className="text-4xl font-bold text-green-400 mb-2">22%</div>
                            <div className="text-sm text-center text-muted-foreground">IB1 ranges are larger</div>
                        </div>
                    </BentoCard>

                    <BentoCard colSpan={4} rowSpan={1} title="Breakout Speed">
                        <div className="flex flex-col items-center justify-center h-full p-4">
                            <div className="text-4xl font-bold text-yellow-400 mb-2">6 min</div>
                            <div className="text-sm text-center text-muted-foreground">IB2 breaks out faster</div>
                        </div>
                    </BentoCard>

                    {/* Key Differences Table */}
                    {/* IB1 Analysis Card */}
                    <BentoCard colSpan={6} rowSpan={2} title="IB1 Analysis (09:30-10:30)">
                        <div className="flex flex-col h-full bg-cyan-950/10 p-4 rounded-lg border border-cyan-500/20">
                            <div className="flex items-center justify-between mb-4 pb-2 border-b border-cyan-500/30">
                                <span className="text-cyan-400 font-bold text-lg">Dominant Strategy: Trend</span>
                                <Activity className="text-cyan-400" size={20} />
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-background/40 p-3 rounded">
                                        <div className="text-xs text-muted-foreground">True Breakout (Trend)</div>
                                        <div className="text-2xl font-bold text-cyan-400">57.1%</div>
                                        <div className="text-[10px] text-green-400">High Reliability</div>
                                    </div>
                                    <div className="bg-background/40 p-3 rounded">
                                        <div className="text-xs text-muted-foreground">Avg Range</div>
                                        <div className="text-xl font-semibold text-white">$1,391</div>
                                        <div className="text-[10px] text-muted-foreground">Larger Range</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Risk Metrics</h4>
                                    <div className="flex justify-between items-center text-sm p-2 bg-background/20 rounded">
                                        <span>Median Reversal Risk</span>
                                        <span className="font-mono font-bold text-yellow-400">42.9%</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm p-2 bg-background/20 rounded">
                                        <span>Avg Time to Breakout</span>
                                        <span className="font-mono text-muted-foreground">59 min</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Size Reliability (True Breakout)</h4>
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div className="bg-background/20 p-2 rounded">
                                            <div className="text-[10px] text-muted-foreground">Small</div>
                                            <div className="font-bold text-yellow-400">46.8%</div>
                                        </div>
                                        <div className="bg-background/20 p-2 rounded">
                                            <div className="text-[10px] text-muted-foreground">Medium</div>
                                            <div className="font-bold text-green-400">66.9%</div>
                                        </div>
                                        <div className="bg-background/20 p-2 rounded">
                                            <div className="text-[10px] text-muted-foreground">Large</div>
                                            <div className="font-bold text-cyan-400">76.2%</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Detailed Reliability Table</h4>
                                    <div className="overflow-hidden rounded border border-white/10">
                                        <table className="w-full text-xs text-center">
                                            <thead className="bg-white/5 text-muted-foreground">
                                                <tr>
                                                    <th className="py-2 px-1 font-medium">Size</th>
                                                    <th className="py-2 px-1 font-medium">Reversal Risk</th>
                                                    <th className="py-2 px-1 font-medium">Avg Ext</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                <tr>
                                                    <td className="py-2 text-muted-foreground">Small</td>
                                                    <td className="py-2 text-yellow-500 font-mono">30.2%</td>
                                                    <td className="py-2 font-mono text-cyan-400">1.33x</td>
                                                </tr>
                                                <tr className="bg-white/5">
                                                    <td className="py-2 text-muted-foreground">Medium</td>
                                                    <td className="py-2 text-green-400 font-bold font-mono">21.8%</td>
                                                    <td className="py-2 font-mono text-cyan-400">0.84x</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2 text-muted-foreground">Large</td>
                                                    <td className="py-2 text-green-400 font-bold font-mono">4.2%</td>
                                                    <td className="py-2 font-mono text-cyan-400">0.50x</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex justify-between items-center text-xs mt-2 px-1">
                                        <span className="text-muted-foreground">Most Common</span>
                                        <span className="text-cyan-400">Medium (49%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BentoCard>

                    {/* IB2 Analysis Card */}
                    <BentoCard colSpan={6} rowSpan={2} title="IB2 Analysis (10:30-11:30)">
                        <div className="flex flex-col h-full bg-orange-950/10 p-4 rounded-lg border border-orange-500/20">
                            <div className="flex items-center justify-between mb-4 pb-2 border-b border-orange-500/30">
                                <span className="text-orange-400 font-bold text-lg">Dominant Strategy: Speed</span>
                                <Target className="text-orange-400" size={20} />
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-background/40 p-3 rounded">
                                        <div className="text-xs text-muted-foreground">True Breakout (Trend)</div>
                                        <div className="text-2xl font-bold text-orange-400">55.3%</div>
                                        <div className="text-[10px] text-yellow-500">Moderate Reliability</div>
                                    </div>
                                    <div className="bg-background/40 p-3 rounded">
                                        <div className="text-xs text-muted-foreground">Avg Range</div>
                                        <div className="text-xl font-semibold text-white">$1,084</div>
                                        <div className="text-[10px] text-muted-foreground">Smaller Range</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Risk Metrics</h4>
                                    <div className="flex justify-between items-center text-sm p-2 bg-background/20 rounded">
                                        <span>Median Reversal Risk</span>
                                        <span className="font-mono font-bold text-orange-400">44.7%</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm p-2 bg-background/20 rounded">
                                        <span>Avg Time to Breakout</span>
                                        <span className="font-mono text-muted-foreground">53 min</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Size Reliability (True Breakout)</h4>
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div className="bg-background/20 p-2 rounded">
                                            <div className="text-[10px] text-muted-foreground">Small</div>
                                            <div className="font-bold text-yellow-400">47.1%</div>
                                        </div>
                                        <div className="bg-background/20 p-2 rounded">
                                            <div className="text-[10px] text-muted-foreground">Medium</div>
                                            <div className="font-bold text-green-400">71.1%</div>
                                        </div>
                                        <div className="bg-background/20 p-2 rounded">
                                            <div className="text-[10px] text-muted-foreground">Large</div>
                                            <div className="font-bold text-orange-400">81.8%</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Detailed Reliability Table</h4>
                                    <div className="overflow-hidden rounded border border-white/10">
                                        <table className="w-full text-xs text-center">
                                            <thead className="bg-white/5 text-muted-foreground">
                                                <tr>
                                                    <th className="py-2 px-1 font-medium">Size</th>
                                                    <th className="py-2 px-1 font-medium">Reversal Risk</th>
                                                    <th className="py-2 px-1 font-medium">Avg Ext</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                <tr>
                                                    <td className="py-2 text-muted-foreground">Small</td>
                                                    <td className="py-2 text-red-400 font-bold font-mono">37.7%</td>
                                                    <td className="py-2 font-mono text-cyan-400">2.02x</td>
                                                </tr>
                                                <tr className="bg-white/5">
                                                    <td className="py-2 text-muted-foreground">Medium</td>
                                                    <td className="py-2 text-green-400 font-bold font-mono">4.4%</td>
                                                    <td className="py-2 font-mono text-orange-400">0.55x</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2 text-muted-foreground">Large</td>
                                                    <td className="py-2 text-yellow-500 font-mono">25.0%</td>
                                                    <td className="py-2 font-mono text-orange-400">0.96x</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="flex justify-between items-center text-xs mt-2 px-1">
                                        <span className="text-muted-foreground">Most Common</span>
                                        <span className="text-orange-400">Small (58%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BentoCard>
                </BentoGrid>
            )}
        </DashboardLayout>
    );
}
