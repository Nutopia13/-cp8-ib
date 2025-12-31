import { IndicatorValues } from '../indicators/calculator';

export interface PulseScore {
    score: number;              // 0-100 composite score
    signal: 'bullish' | 'neutral' | 'bearish';
    breakdown: {
        roc: number;              // Weighted contribution
        stochastic: number;
        ad_osc: number;
        cmf: number;
        rsi: number;
        macd: number;
    };
}

// Weighting configuration
const WEIGHTS = {
    roc: 0.20,         // 20%
    stochastic: 0.15,  // 15%
    ad_osc: 0.15,      // 15%
    cmf: 0.20,         // 20%
    rsi: 0.15,         // 15%
    macd: 0.15,        // 15%
};

/**
 * Normalize a value to 0-100 scale
 * @param value - The value to normalize
 * @param min - Minimum expected value
 * @param max - Maximum expected value
 * @param invert - If true, higher input values result in lower normalized values
 */
function normalize(value: number, min: number, max: number, invert: boolean = false): number {
    const clamped = Math.max(min, Math.min(max, value));
    let normalized = ((clamped - min) / (max - min)) * 100;

    if (invert) {
        normalized = 100 - normalized;
    }

    return normalized;
}

/**
 * Normalize ROC to 0-100 scale
 * ROC typically ranges from -10 to +10 for most assets
 * Lower values (negative) = bullish, higher values (positive) = bearish
 */
function normalizeROC(roc: number): number {
    return normalize(roc, -10, 10, true);
}

/**
 * Normalize Stochastic %K (already 0-100)
 * Lower values = bullish, higher values = bearish
 */
function normalizeStochastic(stoch: number): number {
    return 100 - stoch; // Invert: lower stoch = higher score
}

/**
 * Normalize A/D Oscillator
 * Positive values indicate accumulation (bullish), negative indicate distribution (bearish)
 */
function normalizeAD(ad: number): number {
    // A/D can vary widely, normalize around ±1,000,000
    return normalize(ad, -1000000, 1000000, true);
}

/**
 * Normalize CMF (Chaikin Money Flow)
 * Range: -1 to +1
 * Positive = accumulation (bullish), negative = distribution (bearish)
 */
function normalizeCMF(cmf: number): number {
    return normalize(cmf, -1, 1, true);
}

/**
 * Normalize RSI
 * Range: 0-100
 * Low RSI (<30) = oversold (bullish), high RSI (>70) = overbought (bearish)
 */
function normalizeRSI(rsi: number): number {
    return 100 - rsi; // Invert: lower RSI = higher score
}

/**
 * Normalize MACD Histogram
 * Positive histogram = bullish momentum, negative = bearish momentum
 */
function normalizeMACD(histogram: number): number {
    // MACD histogram typically ranges from -500 to +500 for BTC
    return normalize(histogram, -500, 500, true);
}

/**
 * Calculate composite market pulse score
 * @param indicators - Technical indicator values
 * @returns Pulse score object with breakdown
 */
export function calculatePulseScore(indicators: IndicatorValues): PulseScore {
    // Normalize each indicator to 0-100 scale (higher = more bullish)
    const normalized = {
        roc: normalizeROC(indicators.roc),
        stochastic: normalizeStochastic(indicators.stochastic),
        ad_osc: normalizeAD(indicators.ad_osc),
        cmf: normalizeCMF(indicators.cmf),
        rsi: normalizeRSI(indicators.rsi),
        macd: normalizeMACD(indicators.macd.histogram),
    };

    // Calculate weighted contributions
    const breakdown = {
        roc: normalized.roc * WEIGHTS.roc,
        stochastic: normalized.stochastic * WEIGHTS.stochastic,
        ad_osc: normalized.ad_osc * WEIGHTS.ad_osc,
        cmf: normalized.cmf * WEIGHTS.cmf,
        rsi: normalized.rsi * WEIGHTS.rsi,
        macd: normalized.macd * WEIGHTS.macd,
    };

    // Sum weighted contributions for final score
    const score = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

    // Determine signal based on thresholds
    let signal: 'bullish' | 'neutral' | 'bearish';
    if (score <= 20) {
        signal = 'bearish'; // Note: Lower score = bearish in this system
    } else if (score >= 80) {
        signal = 'bullish';  // Higher score = bullish
    } else {
        signal = 'neutral';
    }

    return {
        score: Math.round(score * 100) / 100, // Round to 2 decimal places
        signal,
        breakdown,
    };
}

/**
 * Get signal description
 */
export function getSignalDescription(signal: 'bullish' | 'neutral' | 'bearish'): string {
    const descriptions = {
        bullish: 'Strong buying pressure - Consider long positions',
        neutral: 'Mixed signals - Wait for clearer trend',
        bearish: 'Strong selling pressure - Consider short positions or exit longs',
    };
    return descriptions[signal];
}
