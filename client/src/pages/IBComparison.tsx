import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { TrendingUp, TrendingDown, Activity, Clock, Target, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function IBComparison() {
    return (
        <DashboardLayout
            subtitle="IB Period Comparison: 09:30-10:30 vs 10:30-11:30"
            dateRange="253 Trading Days (2025)"
        >
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

                {/* IB Size Distribution Comparison */}
                <BentoCard colSpan={6} rowSpan={2} title="IB Size Distribution">
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-cyan-400">IB1 (09:30-10:30)</span>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">Medium</span>
                                        <span className="text-white font-semibold">49.0%</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500" style={{ width: '49%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">Small</span>
                                        <span className="text-white font-semibold">37.9%</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-cyan-500" style={{ width: '37.9%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">Large</span>
                                        <span className="text-white font-semibold">9.5%</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-500" style={{ width: '9.5%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-border">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-orange-400">IB2 (10:30-11:30)</span>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">Small</span>
                                        <span className="text-white font-semibold">57.7%</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-cyan-500" style={{ width: '57.7%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">Medium</span>
                                        <span className="text-white font-semibold">35.6%</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500" style={{ width: '35.6%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">Large</span>
                                        <span className="text-white font-semibold">3.2%</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-500" style={{ width: '3.2%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BentoCard>

                {/* Range Statistics Comparison */}
                <BentoCard colSpan={6} rowSpan={2} title="Range Statistics">
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div>
                                <div className="text-xs text-muted-foreground mb-1">Metric</div>
                            </div>
                            <div>
                                <div className="text-xs text-cyan-400 font-semibold mb-1">IB1</div>
                            </div>
                            <div>
                                <div className="text-xs text-orange-400 font-semibold mb-1">IB2</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-3 text-center py-2 border-b border-border">
                                <div className="text-xs text-muted-foreground text-left">Avg Range</div>
                                <div className="text-sm font-bold text-cyan-400">$1,391</div>
                                <div className="text-sm font-bold text-orange-400">$1,084</div>
                            </div>
                            <div className="grid grid-cols-3 gap-3 text-center py-2 border-b border-border">
                                <div className="text-xs text-muted-foreground text-left">Median Range</div>
                                <div className="text-sm font-bold text-cyan-400">$1,215</div>
                                <div className="text-sm font-bold text-orange-400">$958</div>
                            </div>
                            <div className="grid grid-cols-3 gap-3 text-center py-2 border-b border-border">
                                <div className="text-xs text-muted-foreground text-left">% of Price</div>
                                <div className="text-sm font-bold text-cyan-400">1.408%</div>
                                <div className="text-sm font-bold text-orange-400">1.092%</div>
                            </div>
                            <div className="grid grid-cols-3 gap-3 text-center py-2">
                                <div className="text-xs text-muted-foreground text-left">Difference</div>
                                <div className="text-sm font-bold text-green-400 col-span-2">-22% smaller →</div>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-800 rounded p-3 mt-4">
                            <p className="text-xs text-muted-foreground">
                                <span className="text-cyan-400 font-semibold">Key Insight:</span> IB1 ranges are ~22% larger on average, capturing more initial volatility from market open.
                            </p>
                        </div>
                    </div>
                </BentoCard>

                {/* Breakout Frequency */}
                <BentoCard colSpan={6} rowSpan={2} title="Breakout Patterns">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-semibold text-cyan-400 mb-3">IB1 (09:30-10:30)</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                                        <span className="text-xs text-muted-foreground">High Only</span>
                                        <span className="text-sm font-bold text-green-400">35.2%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                                        <span className="text-xs text-muted-foreground">Low Only</span>
                                        <span className="text-sm font-bold text-red-400">39.5%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                                        <span className="text-xs text-muted-foreground">Both</span>
                                        <span className="text-sm font-bold text-yellow-400">23.3%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                                        <span className="text-xs text-muted-foreground">Neither</span>
                                        <span className="text-sm font-bold text-gray-400">2.0%</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-orange-400 mb-3">IB2 (10:30-11:30)</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                                        <span className="text-xs text-muted-foreground">High Only</span>
                                        <span className="text-sm font-bold text-green-400">34.4%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                                        <span className="text-xs text-muted-foreground">Low Only</span>
                                        <span className="text-sm font-bold text-red-400">38.7%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                                        <span className="text-xs text-muted-foreground">Both</span>
                                        <span className="text-sm font-bold text-yellow-400">24.9%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-slate-900/50 rounded">
                                        <span className="text-xs text-muted-foreground">Neither</span>
                                        <span className="text-sm font-bold text-gray-400">2.0%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-800 rounded p-3">
                            <p className="text-xs text-muted-foreground">
                                <span className="text-cyan-400 font-semibold">Key Insight:</span> Breakout frequency is nearly identical (~98% for both). Timing doesn't significantly affect whether breakouts occur.
                            </p>
                        </div>
                    </div>
                </BentoCard>

                {/* Extensions & Time */}
                <BentoCard colSpan={6} rowSpan={2} title="Extensions & Timing">
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-semibold text-white mb-3">Range Extensions</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="text-xs text-muted-foreground">IB1 (09:30-10:30)</div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Upside</span>
                                            <span className="text-green-400 font-semibold">0.89×</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Downside</span>
                                            <span className="text-red-400 font-semibold">0.86×</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">{'>'}1.5× IB</span>
                                            <span className="text-yellow-400 font-semibold">19.8%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-xs text-muted-foreground">IB2 (10:30-11:30)</div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Upside</span>
                                            <span className="text-green-400 font-semibold">0.98×</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Downside</span>
                                            <span className="text-red-400 font-semibold">0.94×</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">{'>'}1.5× IB</span>
                                            <span className="text-yellow-400 font-semibold">24.5%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-border">
                            <h4 className="text-sm font-semibold text-white mb-3">Time to Breakout</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-3 text-center">
                                    <div className="text-xs text-muted-foreground mb-1">IB1</div>
                                    <div className="text-2xl font-bold text-cyan-400">59 min</div>
                                </div>
                                <div className="bg-orange-500/10 border border-orange-500/30 rounded p-3 text-center">
                                    <div className="text-xs text-muted-foreground mb-1">IB2</div>
                                    <div className="text-2xl font-bold text-orange-400">53 min</div>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-3">IB2 breaks out ~6 minutes faster (less time until 16:00 close)</p>
                        </div>
                    </div>
                </BentoCard>

                {/* Conditional Probabilities */}
                <BentoCard colSpan={12} rowSpan={2} title="Conditional Probabilities by IB Size">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Small IB */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
                                <Target size={16} />
                                Small IB Days
                            </h4>
                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-slate-900/50 rounded p-2">
                                        <div className="text-xs text-muted-foreground">IB1 Breakout</div>
                                        <div className="text-lg font-bold text-green-400">100%</div>
                                    </div>
                                    <div className="bg-slate-900/50 rounded p-2">
                                        <div className="text-xs text-muted-foreground">IB2 Breakout</div>
                                        <div className="text-lg font-bold text-green-400">99.3%</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-slate-900/50 rounded p-2">
                                        <div className="text-xs text-muted-foreground">IB1 Reversal</div>
                                        <div className="text-lg font-bold text-yellow-400">30.2%</div>
                                    </div>
                                    <div className="bg-slate-900/50 rounded p-2">
                                        <div className="text-xs text-muted-foreground">IB2 Reversal</div>
                                        <div className="text-lg font-bold text-orange-400">37.7%</div>
                                    </div>
                                </div>
                                <div className="bg-orange-900/20 border border-orange-500/30 rounded p-2">
                                    <p className="text-xs text-muted-foreground">
                                        <AlertTriangle size={12} className="inline mr-1" />
                                        IB2 has <span className="text-orange-400 font-semibold">higher reversal risk</span> (37.7% vs 30.2%)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Medium IB */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-green-400 flex items-center gap-2">
                                <Activity size={16} />
                                Medium IB Days
                            </h4>
                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-slate-900/50 rounded p-2">
                                        <div className="text-xs text-muted-foreground">IB1 Breakout</div>
                                        <div className="text-lg font-bold text-green-400">97.6%</div>
                                    </div>
                                    <div className="bg-slate-900/50 rounded p-2">
                                        <div className="text-xs text-muted-foreground">IB2 Breakout</div>
                                        <div className="text-lg font-bold text-green-400">95.6%</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-slate-900/50 rounded p-2">
                                        <div className="text-xs text-muted-foreground">IB1 Reversal</div>
                                        <div className="text-lg font-bold text-yellow-400">21.8%</div>
                                    </div>
                                    <div className="bg-slate-900/50 rounded p-2">
                                        <div className="text-xs text-muted-foreground">IB2 Reversal</div>
                                        <div className="text-lg font-bold text-green-400">4.4%</div>
                                    </div>
                                </div>
                                <div className="bg-green-900/20 border border-green-500/30 rounded p-2">
                                    <p className="text-xs text-muted-foreground">
                                        <CheckCircle2 size={12} className="inline mr-1" />
                                        IB2 medium days are <span className="text-green-400 font-semibold">very directional</span> (only 4.4% reversals)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Large IB */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                                <TrendingUp size={16} />
                                Large IB Days
                            </h4>
                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-slate-900/50 rounded p-2">
                                        <div className="text-xs text-muted-foreground">IB1 Breakout</div>
                                        <div className="text-lg font-bold text-green-400">91.7%</div>
                                    </div>
                                    <div className="bg-slate-900/50 rounded p-2">
                                        <div className="text-xs text-muted-foreground">IB2 Breakout</div>
                                        <div className="text-lg font-bold text-green-400">100%</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-slate-900/50 rounded p-2">
                                        <div className="text-xs text-muted-foreground">IB1 Reversal</div>
                                        <div className="text-lg font-bold text-green-400">4.2%</div>
                                    </div>
                                    <div className="bg-slate-900/50 rounded p-2">
                                        <div className="text-xs text-muted-foreground">IB2 Reversal</div>
                                        <div className="text-lg font-bold text-yellow-400">25.0%</div>
                                    </div>
                                </div>
                                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded p-2">
                                    <p className="text-xs text-muted-foreground">
                                        <AlertTriangle size={12} className="inline mr-1" />
                                        IB2 large days are <span className="text-yellow-400 font-semibold">rare</span> (only 8 occurrences) - small sample size
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </BentoCard>

                {/* Trading Recommendation */}
                <BentoCard colSpan={12} rowSpan={1} title="🎯 Trading Recommendation">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-900/10 border-2 border-cyan-500/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <CheckCircle2 size={20} className="text-cyan-400" />
                                <h3 className="text-lg font-bold text-cyan-400">IB1 (09:30-10:30 ET) - RECOMMENDED</h3>
                            </div>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span><span className="text-white font-semibold">22% larger ranges</span> - more profit potential</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span><span className="text-white font-semibold">Balanced distribution</span> - 49% medium, 38% small</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span><span className="text-white font-semibold">Lower reversal risk</span> - especially on small IB days (30.2% vs 37.7%)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span><span className="text-white font-semibold">More consistent patterns</span> - better sample of medium/large IB days</span>
                                </li>
                            </ul>
                            <div className="mt-4 pt-4 border-t border-cyan-500/30">
                                <p className="text-xs text-cyan-300 font-semibold">Best for: Momentum/trend trading with larger profit targets</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-orange-900/30 to-orange-900/10 border border-orange-500/30 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Activity size={20} className="text-orange-400" />
                                <h3 className="text-lg font-bold text-orange-400">IB2 (10:30-11:30 ET) - ALTERNATIVE</h3>
                            </div>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400 mt-1">•</span>
                                    <span><span className="text-white font-semibold">Smaller ranges</span> - tighter stops possible</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-cyan-400 mt-1">•</span>
                                    <span><span className="text-white font-semibold">Faster breakouts</span> - 53 min vs 59 min avg</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span><span className="text-white font-semibold">Medium IB = very directional</span> - only 4.4% reversals</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-400 mt-1">⚠</span>
                                    <span><span className="text-white font-semibold">Higher extensions</span> - 0.98× vs 0.89× relative to smaller IB</span>
                                </li>
                            </ul>
                            <div className="mt-4 pt-4 border-t border-orange-500/30">
                                <p className="text-xs text-orange-300 font-semibold">Best for: Tight-stop scalping, medium IB day filtering</p>
                            </div>
                        </div>
                    </div>
                </BentoCard>
            </BentoGrid>
        </DashboardLayout>
    );
}
