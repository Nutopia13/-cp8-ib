import { dataStore, Timeframe, OHLCV } from '../services/dataStore';
import { calculateIndicators } from '../indicators/calculator';
import { calculatePulseScore, PulseScore } from './composite';

export interface PulseData {
    symbol: string;
    timeframe: Timeframe;
    timestamp: number;
    price: {
        open: number;
        high: number;
        low: number;
        close: number;
        volume: number;
    };
    indicators: {
        roc: number;
        stochastic: number;
        ad_osc: number;
        vwap: number;
        cmf: number;
        rsi: number;
        macd: {
            macd: number;
            signal: number;
            histogram: number;
        };
    };
    pulse_score: number;
    signal: 'bullish' | 'neutral' | 'bearish';
    breakdown: PulseScore['breakdown'];
}

/**
 * Calculate pulse data for a specific timeframe
 * @param timeframe - Timeframe to calculate for
 * @param symbol - Trading symbol (default: BTCUSDT)
 * @returns Pulse data with indicators and score
 */
export function calculatePulse(timeframe: Timeframe, symbol: string = 'BTCUSDT'): PulseData | null {
    const candles = dataStore.getCandles(timeframe);

    if (candles.length < 30) {
        console.warn(`[PulseService] Insufficient data for ${timeframe} (${candles.length} candles)`);
        return null;
    }

    const latest = candles[candles.length - 1];
    if (!latest) return null;

    // Calculate all indicators
    const indicators = calculateIndicators(candles);

    // Calculate composite pulse score
    const pulse = calculatePulseScore(indicators);

    return {
        symbol,
        timeframe,
        timestamp: latest.timestamp,
        price: {
            open: latest.open,
            high: latest.high,
            low: latest.low,
            close: latest.close,
            volume: latest.volume,
        },
        indicators,
        pulse_score: pulse.score,
        signal: pulse.signal,
        breakdown: pulse.breakdown,
    };
}

/**
 * Calculate pulse for all timeframes
 * @returns Map of timeframe to pulse data
 */
export function calculateAllPulses(symbol: string = 'BTCUSDT'): Map<Timeframe, PulseData | null> {
    const timeframes: Timeframe[] = ['5m', '15m', '1h', '4h'];
    const results = new Map<Timeframe, PulseData | null>();

    for (const tf of timeframes) {
        results.set(tf, calculatePulse(tf, symbol));
    }

    return results;
}

/**
 * Check if a pulse score crosses a threshold
 * Used for logging significant events
 */
export function checkThresholdCrossing(
    previousScore: number | null,
    currentScore: number
): { crossed: boolean; threshold: number; direction: 'up' | 'down' } | null {
    if (previousScore === null) return null;

    const thresholds = [20, 80];

    for (const threshold of thresholds) {
        // Crossing up
        if (previousScore < threshold && currentScore >= threshold) {
            return { crossed: true, threshold, direction: 'up' };
        }
        // Crossing down
        if (previousScore > threshold && currentScore <= threshold) {
            return { crossed: true, threshold, direction: 'down' };
        }
    }

    return null;
}
