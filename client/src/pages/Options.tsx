import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Activity, BarChart3, Info, ArrowUpRight, Clock, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
interface OptionsPulse {
    timestamp: string;
    btc_price: number;
    time_to_0dte_expiry: string;
    iv_surface_metrics?: {
        atm_iv: {
            atm_iv: number;
            atm_strike: number;
            call_iv: number;
            put_iv: number;
        };
        iv_skew: {
            skew_5pct: number;
            skew_10pct: number;
            skew_15pct: number;
            weighted_skew: number;
            interpretation: string;
        };
        vwiv: {
            vwiv_calls: number;
            vwiv_puts: number;
            vwiv_spread: number;
            flow_interpretation: string;
        };
    };
    directional_bias: {
        score: number;
        interpretation: string;
        confidence: string;
    };
    volatility_momentum: {
        score: number;
        interpretation: string;
    };
    key_levels: {
        max_call_oi_strike: number | null;
        max_put_oi_strike: number | null;
        gamma_flip_level: number;
        interpretation: string;
    };
    dte_mode: string;
    fetched_at: string;
}

// --- Visual Components ---
const MetricCard = ({ title, icon: Icon, children, className }: any) => (
    <div className={cn("relative overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm p-6 shadow-sm transition-all hover:border-primary/20 hover:shadow-md", className)}>
        <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <Icon className="h-4 w-4" />
            <h3 className="text-sm font-medium uppercase tracking-wider">{title}</h3>
        </div>
        {children}
    </div>
);

const SkewBar = ({ value, max = 10 }: { value: number, max?: number }) => {
    const percentage = Math.min(Math.abs(value) / max * 100, 100);
    const isPositive = value > 0;
    const colorClass = isPositive ? "bg-destructive shadow-[0_0_10px_rgba(239,68,68,0.4)]" : "bg-bullish shadow-[0_0_10px_rgba(34,197,94,0.4)]";

    return (
        <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
                <span className={!isPositive ? "text-bullish" : "text-muted-foreground"}>BULLISH (Calls)</span>
                <span className={isPositive ? "text-destructive" : "text-muted-foreground"}>BEARISH (Puts)</span>
            </div>
            <div className="relative h-4 w-full rounded-full bg-secondary/50 overflow-hidden">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-foreground/20 z-10" />
                <div
                    className={cn("absolute top-0 bottom-0 transition-all duration-500 rounded-full", colorClass)}
                    style={{
                        left: isPositive ? '50%' : undefined,
                        right: !isPositive ? '50%' : undefined,
                        width: `${percentage / 2}%`
                    }}
                />
            </div>
            <div className="text-right text-xs text-muted-foreground font-mono">
                Skew: {value > 0 ? '+' : ''}{value.toFixed(2)}%
            </div>
        </div>
    );
};

const VWIVCompare = ({ calls, puts }: { calls: number, puts: number }) => {
    const total = calls + puts;
    const callPct = (calls / total) * 100;
    const putPct = (puts / total) * 100;

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-end">
                <div className="text-left">
                    <span className="text-xs text-muted-foreground block mb-1">CALLS VWIV</span>
                    <span className="text-xl font-bold text-bullish">{calls.toFixed(2)}%</span>
                </div>
                <div className="text-right">
                    <span className="text-xs text-muted-foreground block mb-1">PUTS VWIV</span>
                    <span className="text-xl font-bold text-destructive">{puts.toFixed(2)}%</span>
                </div>
            </div>

            <div className="flex w-full h-3 rounded-full overflow-hidden">
                <div
                    className="bg-bullish transition-all duration-500 shadow-[0_0_15px_rgba(34,197,94,0.3)] z-10"
                    style={{ width: `${callPct}%` }}
                />
                <div
                    className="bg-destructive transition-all duration-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] z-10"
                    style={{ width: `${putPct}%` }}
                />
            </div>
        </div>
    );
};

// --- Main Component ---
export default function Options() {
    const [dteMode, setDteMode] = useState<'1dte' | '2dte' | '3dte' | '7dte'>('2dte');
    const [pulse, setPulse] = useState<OptionsPulse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPulse = async () => {
        try {
            const response = await fetch(`/api/iv-momentum/pulse?dte=${dteMode}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            const data = await response.json();
            setPulse(data);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPulse();
        const interval = setInterval(fetchPulse, 30000);
        return () => clearInterval(interval);
    }, [dteMode]);

    if (loading) return (
        <DashboardLayout>
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="text-muted-foreground animate-pulse">Loading Options Data...</p>
                </div>
            </div>
        </DashboardLayout>
    );

    if (error || !pulse) return (
        <DashboardLayout>
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] gap-4">
                <div className="bg-destructive/10 p-4 rounded-full">
                    <Activity className="h-8 w-8 text-destructive" />
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground">Data Unavailable</h3>
                    <p className="text-sm text-muted-foreground">{error || "No response"}</p>
                </div>
                <button
                    onClick={() => { setLoading(true); fetchPulse(); }}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
                >
                    Retry
                </button>
            </div>
        </DashboardLayout>
    );

    const iv = pulse.iv_surface_metrics;
    const getSkewColor = (val: number) => val > 5 ? "text-destructive" : val < -3 ? "text-bullish" : "text-foreground";
    const getBiasColor = (score: number) => score >= 1 ? "text-bullish" : score <= -1 ? "text-destructive" : "text-yellow-500";
    const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num);

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-in fade-in duration-500">
                {/* Header with Market Stats */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-border/40 pb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                                Options Analysis
                            </h1>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Radio className="h-3 w-3 animate-pulse text-success" />
                                <span>Live</span>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-sm">Real-time IV Surface + Market Structure Analysis</p>
                    </div>

                    {/* Market Stats Inline */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground font-mono">BTC PRICE</p>
                            <p className="text-2xl font-bold font-mono">${pulse.btc_price.toLocaleString()}</p>
                        </div>
                        <div className="h-10 w-px bg-border/50" />
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                                <Clock className="h-3 w-3" /> TIME TO EXPIRY
                            </p>
                            <p className="text-lg font-bold font-mono text-warning">{pulse.time_to_0dte_expiry}</p>
                        </div>
                        <div className="h-10 w-px bg-border/50" />
                        <Select value={dteMode} onValueChange={(v) => { setLoading(true); setDteMode(v as any); }}>
                            <SelectTrigger className="w-[180px] bg-background/50 backdrop-blur-sm">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1dte">⚡ 1DTE (Tomorrow)</SelectItem>
                                <SelectItem value="2dte">🎯 2DTE (2 Days)</SelectItem>
                                <SelectItem value="3dte">💧 3DTE (3 Days)</SelectItem>
                                <SelectItem value="7dte">📅 7DTE (Weekly)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* IV Surface Metrics */}
                {iv && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* ATM IV */}
                        <MetricCard title="ATM Implied Volatility" icon={Activity}>
                            <div className="flex items-baseline justify-between mb-6">
                                <span className="text-5xl font-bold tracking-tighter text-primary drop-shadow-lg">
                                    {iv.atm_iv.atm_iv.toFixed(2)}<span className="text-2xl text-muted-foreground font-normal">%</span>
                                </span>
                                <span className="text-xs font-mono text-muted-foreground px-2 py-1 bg-secondary rounded">
                                    ${iv.atm_iv.atm_strike.toLocaleString()}
                                </span>
                            </div>
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden mb-4">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                    style={{ width: `${Math.min(iv.atm_iv.atm_iv, 100)}%` }}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">CALL IV</p>
                                    <p className="font-mono text-foreground/80">{iv.atm_iv.call_iv.toFixed(2)}%</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground mb-1">PUT IV</p>
                                    <p className="font-mono text-foreground/80">{iv.atm_iv.put_iv.toFixed(2)}%</p>
                                </div>
                            </div>
                        </MetricCard>

                        {/* IV Skew */}
                        <MetricCard title="IV Skew" icon={TrendingUp}>
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className={cn("text-4xl font-bold tracking-tighter", getSkewColor(iv.iv_skew.weighted_skew))}>
                                        {iv.iv_skew.weighted_skew.toFixed(2)}
                                    </span>
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-xs font-bold uppercase",
                                        iv.iv_skew.weighted_skew > 5 ? "bg-destructive/20 text-destructive" :
                                            iv.iv_skew.weighted_skew < -3 ? "bg-bullish/20 text-bullish" :
                                                "bg-yellow-500/20 text-yellow-500"
                                    )}>
                                        {iv.iv_skew.interpretation}
                                    </span>
                                </div>
                                <SkewBar value={iv.iv_skew.weighted_skew} />
                            </div>
                            <div className="space-y-3 pt-4 border-t border-border/50">
                                <p className="text-xs text-muted-foreground italic mb-2">
                                    OTM = Out of The Money (not currently profitable)
                                </p>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">5% OTM</span>
                                    <span className={cn("font-mono", iv.iv_skew.skew_5pct > 0 ? "text-destructive" : "text-bullish")}>
                                        {iv.iv_skew.skew_5pct.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">10% OTM</span>
                                    <span className={cn("font-mono", iv.iv_skew.skew_10pct > 0 ? "text-destructive" : "text-bullish")}>
                                        {iv.iv_skew.skew_10pct.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </MetricCard>

                        {/* VWIV */}
                        <MetricCard title="Volume-Weighted IV" icon={BarChart3}>
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-sm text-foreground/80">{iv.vwiv.flow_interpretation}</span>
                                </div>
                                <VWIVCompare calls={iv.vwiv.vwiv_calls} puts={iv.vwiv.vwiv_puts} />
                            </div>
                            <div className="space-y-2 pt-4 border-t border-border/50">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>SPREAD</span>
                                    <span>{iv.vwiv.vwiv_spread.toFixed(2)}</span>
                                </div>
                            </div>
                        </MetricCard>
                    </div>
                )}

                {/* Scoring Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-xl bg-gradient-to-br from-card to-background p-1 relative overflow-hidden group">
                        <div className="relative bg-card/50 backdrop-blur-xl p-6 rounded-xl border border-border/50 h-full">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <ArrowUpRight className="h-5 w-5 text-primary" />
                                    Directional Bias
                                </h3>
                                <span className="text-xs font-mono text-muted-foreground">
                                    {pulse.directional_bias.confidence}
                                </span>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className={cn("text-5xl font-bold tracking-tighter", getBiasColor(pulse.directional_bias.score))}>
                                    {pulse.directional_bias.score > 0 ? '+' : ''}{pulse.directional_bias.score.toFixed(2)}
                                </div>
                                <div>
                                    <p className="text-xl font-medium">{pulse.directional_bias.interpretation}</p>
                                    <p className="text-sm text-muted-foreground">Scale: -3 to +3</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-br from-card to-background p-1 relative overflow-hidden group">
                        <div className="relative bg-card/50 backdrop-blur-xl p-6 rounded-xl border border-border/50 h-full">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-blue-500" />
                                    Volatility Momentum
                                </h3>
                                <Info className="h-4 w-4 text-muted-foreground/50" />
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-5xl font-bold tracking-tighter text-blue-400">
                                    {pulse.volatility_momentum.score.toFixed(0)}<span className="text-2xl text-muted-foreground/60">/100</span>
                                </div>
                                <div>
                                    <p className="text-xl font-medium">{pulse.volatility_momentum.interpretation}</p>
                                    <p className="text-sm text-muted-foreground">GEX + IV + Volume</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gamma Flip Visualization */}
                <div className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm p-6">
                    <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-6 flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Gamma Flip Level & Key Strikes
                    </h3>

                    <div className="relative h-48 bg-gradient-to-b from-muted/20 to-muted/5 rounded-lg border border-border p-6 mb-6">
                        {(() => {
                            const btcPrice = pulse.btc_price;
                            const gammaFlip = pulse.key_levels.gamma_flip_level;
                            const maxCallOI = pulse.key_levels.max_call_oi_strike || btcPrice + 5000;
                            const maxPutOI = pulse.key_levels.max_put_oi_strike || btcPrice - 5000;

                            const minPrice = Math.min(maxPutOI, gammaFlip, btcPrice) - 2000;
                            const maxPrice = Math.max(maxCallOI, gammaFlip, btcPrice) + 2000;
                            const priceRange = maxPrice - minPrice;

                            const getPosition = (price: number) => ((price - minPrice) / priceRange) * 100;
                            const gammaFlipPos = getPosition(gammaFlip);
                            const btcPricePos = getPosition(btcPrice);
                            const callStrikePos = getPosition(maxCallOI);
                            const putStrikePos = getPosition(maxPutOI);

                            return (
                                <>
                                    {/* Background zones */}
                                    <div className="absolute inset-0 flex">
                                        <div className="bg-destructive/10 border-r-2 border-destructive/30" style={{ width: `${gammaFlipPos}%` }}>
                                            <div className="absolute top-4 left-4 text-xs font-semibold text-destructive">HIGH VOL</div>
                                        </div>
                                        <div className="bg-success/10" style={{ width: `${100 - gammaFlipPos}%` }}>
                                            <div className="absolute top-4 right-4 text-xs font-semibold text-success">LOW VOL</div>
                                        </div>
                                    </div>

                                    {/* Gamma Flip Line */}
                                    <div className="absolute top-0 bottom-0 w-1 bg-warning" style={{ left: `${gammaFlipPos}%` }}>
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-warning text-warning-foreground px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap">
                                            Flip ${formatNumber(Math.round(gammaFlip))}
                                        </div>
                                    </div>

                                    {/* Strikes */}
                                    {pulse.key_levels.max_put_oi_strike && (
                                        <div className="absolute top-0 bottom-0 w-0.5 bg-success/60 border-l-2 border-dashed border-success" style={{ left: `${putStrikePos}%` }}>
                                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-success/90 text-success-foreground px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap">
                                                Support ${formatNumber(Math.round(maxPutOI))}
                                            </div>
                                        </div>
                                    )}

                                    {pulse.key_levels.max_call_oi_strike && (
                                        <div className="absolute top-0 bottom-0 w-0.5 bg-destructive/60 border-l-2 border-dashed border-destructive" style={{ left: `${callStrikePos}%` }}>
                                            <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-destructive/90 text-destructive-foreground px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap">
                                                Resist ${formatNumber(Math.round(maxCallOI))}
                                            </div>
                                        </div>
                                    )}

                                    {/* BTC Price */}
                                    <div className="absolute top-0 bottom-0 flex items-center z-10" style={{ left: `${btcPricePos}%` }}>
                                        <div className="relative">
                                            <div className="w-3 h-3 bg-bullish rounded-full border-2 border-background shadow-lg animate-pulse"></div>
                                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-bullish text-bullish-foreground px-3 py-1 rounded-md text-sm font-bold whitespace-nowrap shadow-lg">
                                                BTC ${formatNumber(Math.round(btcPrice))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className={`p-4 rounded-lg border ${pulse.btc_price > pulse.key_levels.gamma_flip_level ? 'bg-success/10 border-success/30' : 'bg-destructive/10 border-destructive/30'}`}>
                            <p className="text-xs text-muted-foreground mb-1">Status</p>
                            <p className={`text-lg font-bold ${pulse.btc_price > pulse.key_levels.gamma_flip_level ? 'text-success' : 'text-destructive'}`}>
                                {pulse.btc_price > pulse.key_levels.gamma_flip_level ? '✓ Above Flip' : '⚠ Below Flip'}
                            </p>
                        </div>
                        <div className="p-4 rounded-lg border border-border bg-muted/20">
                            <p className="text-xs text-muted-foreground mb-1">Distance</p>
                            <p className="text-lg font-bold font-mono">
                                ${formatNumber(Math.abs(Math.round(pulse.btc_price - pulse.key_levels.gamma_flip_level)))}
                            </p>
                        </div>
                        <div className="p-4 rounded-lg border border-border bg-muted/20">
                            <p className="text-xs text-muted-foreground mb-1">OI Range</p>
                            <p className="text-lg font-bold font-mono">
                                ${formatNumber(Math.abs(Math.round((pulse.key_levels.max_call_oi_strike || 0) - (pulse.key_levels.max_put_oi_strike || 0))))}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Data Info */}
                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div className="p-3 rounded-lg bg-muted/20 border border-border">
                        <p className="mb-1">Calculation Time (UTC)</p>
                        <p className="font-mono text-foreground">
                            {new Date(pulse.timestamp).toLocaleString('en-US', {
                                timeZone: 'UTC',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            })} UTC
                        </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/20 border border-border">
                        <p className="mb-1">Source</p>
                        <p className="font-mono text-success flex items-center gap-2">
                            <Radio className="h-3 w-3 animate-pulse" />
                            Deribit Live Feed
                        </p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
