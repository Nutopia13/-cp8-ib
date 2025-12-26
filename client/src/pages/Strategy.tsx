import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import {
    BookOpen, Target, Clock, TrendingUp, BarChart3,
    Shield, AlertTriangle, CheckCircle2, Zap,
    Activity, Layers, Brain
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function Strategy() {
    return (
        <DashboardLayout
            subtitle="CP-8 Trading Strategy"
            dateRange="NY Session Only"
        >
            <BentoGrid>
                {/* Header Card */}
                <BentoCard colSpan={12} rowSpan={1} title="Full Trading Strategy - CP-8">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        A systematic discretionary approach for futures/crypto day trading during the New York session,
                        built on <span className="text-bullish font-medium">Auction Market Theory</span>,
                        <span className="text-bullish font-medium"> Market Profile</span>, and
                        <span className="text-bullish font-medium"> Orderflow</span> analysis.
                    </p>
                </BentoCard>

                {/* 1. General Context */}
                <BentoCard colSpan={12} rowSpan={2} title="1. General Context" className="overflow-hidden">
                    <div className="space-y-4 text-sm">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-bullish/10 flex items-center justify-center shrink-0">
                                <Brain size={18} className="text-bullish" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium mb-2">Framework Overview</h4>
                                <p className="text-muted-foreground leading-relaxed mb-3">
                                    This strategy uses <strong>Auction Market Theory (AMT)</strong> and <strong>Market Profile</strong> to understand market structure and identify high-probability trade setups.
                                </p>
                                <div className="space-y-2 pl-4 border-l-2 border-bullish/30">
                                    <div>
                                        <p className="font-medium text-xs text-bullish mb-1">Balanced vs Imbalanced Conditions</p>
                                        <p className="text-xs text-muted-foreground">Markets rotate in <em>balance</em> (range-bound, two-sided auction) or move in <em>imbalance</em> (initiative directional move, one-sided auction).</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-xs text-bullish mb-1">Key AMT Concepts</p>
                                        <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                                            <li><strong>Value Area (VA):</strong> Price range where ~70% of volume occurred</li>
                                            <li><strong>Point of Control (POC):</strong> Price level with highest volume</li>
                                            <li><strong>Excess / Unfair Highs & Lows:</strong> Rejected prices with significant tails/wicks</li>
                                            <li><strong>Single Prints:</strong> Prices traded only once, often filled on retracement</li>
                                            <li><strong>High Volume Nodes (HVN):</strong> Acceptance areas, act as support/resistance</li>
                                            <li><strong>Low Volume Nodes (LVN):</strong> Rejection areas, price moves quickly through</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 mt-4">
                            <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
                                <BarChart3 size={18} className="text-warning" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium mb-2">200-Day Volume Profile Context</h4>
                                <p className="text-muted-foreground text-xs leading-relaxed">
                                    Uses long-term <strong>Volume Profile</strong> (composite 200-day view) to identify:
                                </p>
                                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside mt-2">
                                    <li><strong>Composite Balance Areas:</strong> Major HVNs where price spent significant time</li>
                                    <li><strong>Acceptance vs Rejection Zones:</strong> Distinguish between where institutions accumulated (HVN) vs where price was rejected (LVN)</li>
                                    <li><strong>Macro Context Levels:</strong> Key levels that frame today's intraday structure</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 mt-4 p-3 bg-muted/20 rounded-lg border border-border/50">
                            <Target size={18} className="text-success shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <h4 className="font-medium mb-1">Trading Goal</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    <strong>Trade rotations inside balance</strong> (fade extremes back to value) and <strong>trade breaks out of balance</strong> (join initiative moves) during the NY session, with strict risk management and fixed risk-reward ratios.
                                </p>
                            </div>
                        </div>
                    </div>
                </BentoCard>

                {/* AMT Visual - Smaller */}
                <BentoCard colSpan={4} rowSpan={1} title="AMT Concepts">
                    <div className="w-full h-[200px] flex items-center justify-center bg-muted/10 rounded-lg overflow-hidden">
                        <img
                            src="/amt_market_profile.png"
                            alt="AMT Market Profile Concept"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </BentoCard>

                {/* IB Visual - Smaller */}
                <BentoCard colSpan={4} rowSpan={1} title="IB Scenarios">
                    <div className="w-full h-[200px] flex items-center justify-center bg-muted/10 rounded-lg overflow-hidden">
                        <img
                            src="/initial_balance.png"
                            alt="Initial Balance Breakout and Reversal Setups"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </BentoCard>

                {/* 2. Session & Timeframes */}
                <BentoCard colSpan={6} rowSpan={2} title="2. Session & Timeframes">
                    <div className="space-y-4 text-sm">
                        <div className="flex items-start gap-3">
                            <Clock size={18} className="text-bullish shrink-0 mt-1" />
                            <div className="flex-1">
                                <h4 className="font-medium mb-2">NY Session Only (Monday - Friday)</h4>
                                <p className="text-xs text-muted-foreground mb-3">
                                    All trades occur during the New York session due to superior liquidity, volatility, and clearer response at key AMT levels.
                                </p>
                            </div>
                        </div>

                        <div className="bg-muted/20 rounded-lg p-3 border border-border/50 space-y-3">
                            <div>
                                <p className="font-medium text-xs text-bullish mb-1.5">1H Timeframe → Context</p>
                                <p className="text-xs text-muted-foreground">Used to define balance vs imbalance, value migration, key levels, and main directional bias.</p>
                            </div>
                            <div>
                                <p className="font-medium text-xs text-success mb-1.5">15M Timeframe → Execution</p>
                                <p className="text-xs text-muted-foreground">Used for precise entries using Initial Balance (IB) concepts and intraday structure.</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-medium text-xs">Session Behavior Patterns</h4>
                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <AlertTriangle size={14} className="text-warning shrink-0 mt-0.5" />
                                    <p className="text-xs text-muted-foreground">
                                        <strong>Pre-NY / NY Open (9:30-10:00 ET):</strong> Higher volatility, often see liquidity sweeps and false moves
                                    </p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 size={14} className="text-success shrink-0 mt-0.5" />
                                    <p className="text-xs text-muted-foreground">
                                        <strong>Post-10:00 ET:</strong> More stable, clearer directional moves once initial volatility settles
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-2 bg-bullish/5 border border-bullish/20 rounded text-[11px] text-muted-foreground">
                            <strong className="text-bullish">Why NY Session?</strong> Maximum liquidity concentration, institutional participation, and most reliable response at AMT-defined levels.
                        </div>
                    </div>
                </BentoCard>

                {/* 3. Tools & Confluence */}
                <BentoCard colSpan={6} rowSpan={2} title="3. Tools & Confluence">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="amt">
                            <AccordionTrigger className="text-xs font-medium py-2">
                                <div className="flex items-center gap-2">
                                    <Layers size={14} className="text-bullish" />
                                    Auction Market Theory & Market Profile
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-xs text-muted-foreground space-y-2 pb-3">
                                <p><strong>Balance vs Imbalance:</strong> Markets alternate between range-bound rotation (balance) and directional movement (imbalance).</p>
                                <p><strong>Value Area (VA):</strong> The price range where the majority (~70%) of volume occurred. Represents fair value.</p>
                                <p><strong>Unfair Highs/Lows:</strong> Price extremes that were quickly rejected, often with long wicks. These represent "unfair" prices.</p>
                                <p><strong>How It's Used:</strong> Balance "ranges" define where to fade (trade mean reversion) vs where to join (trade initiative moves when breaking balance).</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="volume">
                            <AccordionTrigger className="text-xs font-medium py-2">
                                <div className="flex items-center gap-2">
                                    <BarChart3 size={14} className="text-warning" />
                                    200d Volume Context
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-xs text-muted-foreground space-y-2 pb-3">
                                <p><strong>What It Is:</strong> Long-term composite volume profile showing where price has spent the most time over 200 days.</p>
                                <p><strong>HVNs (High Volume Nodes):</strong> Price levels with heavy volume = balance/acceptance zones = support/resistance.</p>
                                <p><strong>LVNs (Low Volume Nodes):</strong> Price levels with minimal volume = rejection zones = price moves quickly through these.</p>
                                <p><strong>How It's Used:</strong> Frames macro balance areas and provides context for today's price action relative to longer-term structure.</p>

                                <div className="mt-3 rounded-lg overflow-hidden border border-border/50 bg-muted/20">
                                    <div className="p-2 bg-bullish/10 border-b border-border/50">
                                        <p className="text-[11px] font-medium text-bullish">📊 Real Volume Profile Example</p>
                                    </div>
                                    <img
                                        src="/volume_profile_example.png"
                                        alt="Real BTC Volume Profile showing HVNs and LVNs"
                                        className="w-full h-auto"
                                    />
                                    <p className="text-[10px] text-muted-foreground p-2 bg-muted/10">
                                        BTC/USDT Volume Profile: Left histogram shows volume distribution. Notice dense HVN clusters (wide bars) acting as support/resistance, and thin LVN gaps where price moves quickly.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="delta">
                            <AccordionTrigger className="text-xs font-medium py-2">
                                <div className="flex items-center gap-2">
                                    <Activity size={14} className="text-success" />
                                    Delta Profile & Cluster Search
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-xs text-muted-foreground space-y-2 pb-3">
                                <p><strong>Delta:</strong> Difference between aggressive buyers (market buy orders) vs aggressive sellers (market sell orders) at each price.</p>
                                <p><strong>Cluster Analysis:</strong> Looking for dense buying/selling clusters at key prices that indicate absorption or aggressive initiative activity.</p>
                                <p className="pt-2 text-bullish"><strong>Primary Signal: ABSORPTION</strong></p>
                                <ul className="list-disc list-inside space-y-1 pl-2">
                                    <li><strong>Sell Absorption:</strong> Aggressive buyers but price NOT making new highs → potential sell reversal signal</li>
                                    <li><strong>Buy Absorption:</strong> Aggressive sellers but price NOT making new lows → potential buy reversal signal</li>
                                </ul>
                                <p className="pt-2"><strong>How It's Used:</strong> Confirms or invalidates breakout attempts. Heavy absorption against a move = likely failure.</p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="ib">
                            <AccordionTrigger className="text-xs font-medium py-2">
                                <div className="flex items-center gap-2">
                                    <Zap size={14} className="text-warning" />
                                    Initial Balance (IB)
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-xs text-muted-foreground space-y-2 pb-3">
                                <p><strong>Definition:</strong> A fixed time range at the start of the NY session (typically first 30-60 minutes) used to frame intraday structure.</p>
                                <p><strong>IB High/Low:</strong> The high and low of this opening range become key reference levels for the rest of the session.</p>
                                <p><strong>How It's Used:</strong> Determines breakout vs reversal logic. Price action relative to IB defines trade bias:</p>
                                <ul className="list-disc list-inside space-y-1 pl-2">
                                    <li>Clean break + hold outside IB = continuation bias</li>
                                    <li>Sweep of IB extreme + rejection = reversal bias</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </BentoCard>

                {/* 4. Trade Selection Logic */}
                <BentoCard colSpan={12} rowSpan={3} title="4. How Context Guides Trades (Top-Down Process)">
                    <div className="space-y-4 text-sm">
                        {/* Step 1 */}
                        <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-bullish/5 to-transparent rounded-lg border-l-2 border-bullish">
                            <div className="w-8 h-8 rounded-full bg-bullish/20 flex items-center justify-center shrink-0 font-bold text-bullish">
                                1
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                    <BarChart3 size={16} className="text-bullish" />
                                    1H Context (Balance Map)
                                </h4>
                                <p className="text-xs text-muted-foreground mb-3">Identify the macro structure before taking any trade.</p>

                                <div className="space-y-2 text-xs">
                                    <div className="bg-muted/30 p-2 rounded">
                                        <p className="font-medium text-bullish mb-1">Key Questions:</p>
                                        <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                                            <li>Are we inside a higher-timeframe balance or breaking away from one?</li>
                                            <li>Where is today's price relative to composite value, HVNs, LVNs?</li>
                                            <li>Where are prior day VAH/VAL and POC?</li>
                                        </ul>
                                    </div>

                                    <div className="bg-muted/30 p-2 rounded">
                                        <p className="font-medium text-success mb-1">Define Bias:</p>
                                        <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                                            <li><strong>Inside Balance:</strong> Fade mean reversion (sell highs, buy lows)</li>
                                            <li><strong>Breaking Balance:</strong> Join initiative moves when market leaves balance with acceptance</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-warning/5 to-transparent rounded-lg border-l-2 border-warning">
                            <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center shrink-0 font-bold text-warning">
                                2
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                    <Clock size={16} className="text-warning" />
                                    NY Session & Initial Balance
                                </h4>
                                <p className="text-xs text-muted-foreground mb-3">When NY opens, map the Initial Balance structure.</p>

                                <div className="space-y-2 text-xs">
                                    <div className="bg-muted/30 p-2 rounded">
                                        <p className="font-medium text-warning mb-1">Map IB Range:</p>
                                        <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                                            <li>Mark IB High / IB Low (first 30-60 min of NY session)</li>
                                            <li>Note relationship of IB to higher-timeframe balance (inside / above / below)</li>
                                        </ul>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-success/10 p-2 rounded border border-success/30">
                                            <p className="font-medium text-success mb-1 text-[11px]">Breakout Conditions</p>
                                            <p className="text-[11px] text-muted-foreground">IB at edge of value + initiative volume in direction of break</p>
                                        </div>
                                        <div className="bg-bearish/10 p-2 rounded border border-bearish/30">
                                            <p className="font-medium text-bearish mb-1 text-[11px]">Reversal Conditions</p>
                                            <p className="text-[11px] text-muted-foreground">IB breaks into excess/LVN areas + absorption shows rejection</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-success/5 to-transparent rounded-lg border-l-2 border-success">
                            <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center shrink-0 font-bold text-success">
                                3
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                    <TrendingUp size={16} className="text-success" />
                                    15M Structure & Orderflow
                                </h4>
                                <p className="text-xs text-muted-foreground mb-3">Refine entry timing using lower timeframe structure and delta confirmation.</p>

                                <div className="space-y-2 text-xs">
                                    <div className="bg-muted/30 p-2 rounded">
                                        <p className="font-medium text-success mb-1">Execution Checklist:</p>
                                        <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                                            <li>Refine key levels on 15M</li>
                                            <li>Spot liquidity grabs, sweeps of IB high/low</li>
                                            <li>Use Delta Profile & Cluster Search at those levels</li>
                                        </ul>
                                    </div>

                                    <div className="bg-bullish/10 p-2 rounded border border-bullish/30">
                                        <p className="font-medium text-bullish mb-1 text-[11px]">Confirmation Signals</p>
                                        <ul className="list-disc list-inside space-y-0.5 text-[11px] text-muted-foreground">
                                            <li><strong>For Breakouts:</strong> Strong initiative flow in direction of break (NO heavy absorption)</li>
                                            <li><strong>For Reversals:</strong> Absorption against breakout direction (buyers/sellers exhausted)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BentoCard>

                {/* 5. Entry Models */}
                <BentoCard colSpan={6} rowSpan={3} title="5. Entry Models (15M + IB)">
                    <div className="space-y-4">
                        {/* Breakout Setup */}
                        <div className="p-3 bg-gradient-to-br from-success/10 to-transparent rounded-lg border border-success/30">
                            <div className="flex items-center gap-2 mb-3">
                                <TrendingUp size={18} className="text-success" />
                                <h4 className="font-medium text-success">Breakout Continuation Setup</h4>
                            </div>

                            <div className="space-y-3 text-xs">
                                <div>
                                    <p className="font-medium text-muted-foreground mb-1.5">Context:</p>
                                    <ul className="list-disc list-inside space-y-0.5 text-muted-foreground text-[11px]">
                                        <li>Market leaving balance / prior composite range</li>
                                        <li>IB positioned at edge of higher-timeframe value</li>
                                        <li>Initiative volume in direction of break</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-medium text-muted-foreground mb-1.5">Signals:</p>
                                    <ul className="list-disc list-inside space-y-0.5 text-muted-foreground text-[11px]">
                                        <li>15M structure breaking IB high/low</li>
                                        <li>Delta/cluster showing aggression WITH the break (not fading it)</li>
                                    </ul>
                                </div>

                                <div className="bg-success/20 p-2 rounded">
                                    <p className="font-medium mb-1">Entry Conditions:</p>
                                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                                        <li>Clear close outside IB level</li>
                                        <li>Volume/Delta confirmation (no heavy absorption against move)</li>
                                        <li>Price holding outside IB (acceptance, not immediate rejection)</li>
                                    </ul>
                                </div>

                                <div className="bg-bearish/10 p-2 rounded border border-bearish/20">
                                    <p className="font-medium text-bearish mb-1 text-[11px]">What to Avoid:</p>
                                    <p className="text-[11px] text-muted-foreground">Trading breakouts in mid-balance chop or when heavy absorption appears at breakout level</p>
                                </div>
                            </div>
                        </div>

                        {/* Reversal Setup */}
                        <div className="p-3 bg-gradient-to-br from-bearish/10 to-transparent rounded-lg border border-bearish/30">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle size={18} className="text-bearish" />
                                <h4 className="font-medium text-bearish">Reversal / Failed Breakout Setup</h4>
                            </div>

                            <div className="space-y-3 text-xs">
                                <div>
                                    <p className="font-medium text-muted-foreground mb-1.5">Context:</p>
                                    <ul className="list-disc list-inside space-y-0.5 text-muted-foreground text-[11px]">
                                        <li>Market already extended away from value</li>
                                        <li>IB breaks beyond prior extremes but into LVN / excess areas</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-medium text-muted-foreground mb-1.5">Signals:</p>
                                    <ul className="list-disc list-inside space-y-0.5 text-muted-foreground text-[11px]">
                                        <li>Sweep of IB high/low (liquidity grab), then failure to continue</li>
                                        <li>Delta divergence / absorption:
                                            <ul className="list-circle list-inside ml-3 mt-1 space-y-0.5">
                                                <li>Aggressive buyers at top but price stalls or rejects</li>
                                                <li>Aggressive sellers at bottom but price stalls or rejects</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-bearish/20 p-2 rounded">
                                    <p className="font-medium mb-1">Entry Conditions:</p>
                                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                                        <li>Rejection candle back inside IB or back inside prior range</li>
                                        <li>Absorption at extreme (heavy buying/selling but no new high/low)</li>
                                        <li>15M structure break confirming reversal direction</li>
                                    </ul>
                                </div>

                                <div className="bg-warning/10 p-2 rounded border border-warning/20">
                                    <p className="font-medium text-warning mb-1 text-[11px]">What to Avoid:</p>
                                    <p className="text-[11px] text-muted-foreground">Fading strong initiative moves without clear absorption signals or trying to catch falling knives in trending markets</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </BentoCard>

                {/* 6. Risk Management */}
                <BentoCard colSpan={6} rowSpan={3} title="6. Risk & Trade Management">
                    <div className="space-y-4 text-sm">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-bullish/10 rounded-lg border border-bullish/30 text-center">
                                <p className="text-xs text-muted-foreground mb-1">Risk Per Trade</p>
                                <p className="text-3xl font-bold text-bullish">1%</p>
                                <p className="text-[10px] text-muted-foreground mt-1">of account balance</p>
                            </div>
                            <div className="p-3 bg-success/10 rounded-lg border border-success/30 text-center">
                                <p className="text-xs text-muted-foreground mb-1">Risk : Reward</p>
                                <p className="text-3xl font-bold text-success">1 : 2</p>
                                <p className="text-[10px] text-muted-foreground mt-1">minimum target</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="p-3 bg-muted/20 rounded-lg border border-border/50">
                                <div className="flex items-center gap-2 mb-2">
                                    <Shield size={16} className="text-bearish" />
                                    <h4 className="font-medium text-xs">Stop Placement</h4>
                                </div>
                                <ul className="space-y-1.5 text-xs text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="text-success mt-0.5">•</span>
                                        <span><strong>For Breakouts:</strong> Beyond opposite side of structure / IB (e.g., long breakout above IB high = stop below IB low)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-bearish mt-0.5">•</span>
                                        <span><strong>For Reversals:</strong> Beyond the extreme that was swept (e.g., fading failed breakout above IB high = stop above that sweep high)</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-3 bg-muted/20 rounded-lg border border-border/50">
                                <div className="flex items-center gap-2 mb-2">
                                    <Target size={16} className="text-success" />
                                    <h4 className="font-medium text-xs">Take-Profit Logic</h4>
                                </div>
                                <ul className="space-y-1.5 text-xs text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="text-bullish mt-0.5">•</span>
                                        <span>First target at logical intraday level (opposite side of range, prior day extremes, or measured move from IB)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-bullish mt-0.5">•</span>
                                        <span>Consider HVN areas as potential resistance where partial profits make sense</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-bullish mt-0.5">•</span>
                                        <span>LVN areas may allow for wider targets as price often moves quickly through thin volume</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-3 bg-warning/10 rounded-lg border border-warning/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <Zap size={16} className="text-warning" />
                                    <h4 className="font-medium text-xs text-warning">Future Addition: Dynamic Positioning</h4>
                                </div>
                                <p className="text-[11px] text-muted-foreground mb-2">
                                    Concept for scaling in and out based on:
                                </p>
                                <ul className="space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                                    <li>Fresh confirmation from Delta / Cluster absorption at new levels</li>
                                    <li>New structure forming in favor of the trade (higher lows in longs, lower highs in shorts)</li>
                                </ul>
                                <p className="text-[11px] text-muted-foreground mt-2 italic">
                                    For now, core plan remains: 1% risk, 1:2 RR per setup.
                                </p>
                            </div>
                        </div>
                    </div>
                </BentoCard>

                {/* 7. Execution Rules */}
                <BentoCard colSpan={12} rowSpan={2} title="7. Execution Rules & Filters">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        {/* Trading Hours */}
                        <div className="space-y-3">
                            <div className="p-3 bg-success/10 rounded-lg border border-success/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle2 size={16} className="text-success" />
                                    <h4 className="font-medium text-xs text-success">Trade Only When</h4>
                                </div>
                                <ul className="space-y-1.5 text-xs text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="text-success shrink-0 mt-0.5">✓</span>
                                        <span>NY session, Monday–Friday</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-success shrink-0 mt-0.5">✓</span>
                                        <span>Clear context (balance or break) on 1H chart</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-success shrink-0 mt-0.5">✓</span>
                                        <span>Clean IB with well-defined extremes</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-success shrink-0 mt-0.5">✓</span>
                                        <span>Strong confluence of 1H context + IB position + Market Profile levels + Delta/Cluster confirmation</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-3 bg-muted/20 rounded-lg border border-border/50">
                                <div className="flex items-center gap-2 mb-2">
                                    <Activity size={16} className="text-bullish" />
                                    <h4 className="font-medium text-xs">Trade Limits</h4>
                                </div>
                                <ul className="space-y-1.5 text-xs text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="text-bullish shrink-0 mt-0.5">•</span>
                                        <span><strong>Maximum 1-3 trades per day</strong> (quality over quantity)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-bullish shrink-0 mt-0.5">•</span>
                                        <span><strong>No revenge trading</strong> after a loss</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-bullish shrink-0 mt-0.5">•</span>
                                        <span><strong>No immediate re-entry</strong> without fresh signal confirmation</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Avoid */}
                        <div className="space-y-3">
                            <div className="p-3 bg-bearish/10 rounded-lg border border-bearish/30">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle size={16} className="text-bearish" />
                                    <h4 className="font-medium text-xs text-bearish">Avoid Trading When</h4>
                                </div>
                                <ul className="space-y-1.5 text-xs text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="text-bearish shrink-0 mt-0.5">✗</span>
                                        <span>Very choppy days stuck in middle of HTF balance with no clear initiative</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-bearish shrink-0 mt-0.5">✗</span>
                                        <span>Right into major news releases without clear post-news structure</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-bearish shrink-0 mt-0.5">✗</span>
                                        <span>IB is messy, overlapping, or too wide relative to recent ranges</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-bearish shrink-0 mt-0.5">✗</span>
                                        <span>Missing key confluence (e.g., breakout without delta confirmation)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-bearish shrink-0 mt-0.5">✗</span>
                                        <span>Low liquidity days (major holidays, post-NFP chop, etc.)</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-3 bg-bullish/5 rounded-lg border border-bullish/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <BookOpen size={16} className="text-bullish" />
                                    <h4 className="font-medium text-xs text-bullish">Philosophy</h4>
                                </div>
                                <p className="text-xs text-muted-foreground italic leading-relaxed">
                                    "Trade high-probability setups with clear context, strict risk management, and patience.
                                    Let the market come to you. The goal is consistency and preservation of capital, not catching every move."
                                </p>
                            </div>
                        </div>
                    </div>
                </BentoCard>

            </BentoGrid>
        </DashboardLayout>
    );
}
