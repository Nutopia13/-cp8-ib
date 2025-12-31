import { ROC, Stochastic, RSI, MACD, ADX, AwesomeOscillator } from 'technicalindicators';
import { OHLCV } from '../services/dataStore';
import dayjs from 'dayjs';

export interface IndicatorValues {
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
}

/**
 * Calculate Rate of Change (ROC)
 * Formula: ((Current Close - Close N periods ago) / Close N periods ago) × 100
 * @param closes - Array of close prices
 * @param period - Look-back period (default: 14)
 */
function calculateROC(closes: number[], period: number = 14): number {
    if (closes.length < period + 1) return 0;

    const roc = ROC.calculate({
        values: closes,
        period,
    });

    return roc.length > 0 ? roc[roc.length - 1] : 0;
}

/**
 * Calculate Stochastic %K
 * Formula: ((Current Close - Lowest Low) / (Highest High - Lowest Low)) × 100
 * @param highs - Array of high prices
 * @param lows - Array of low prices
 * @param closes - Array of close prices
 * @param period - Look-back period (default: 14)
 */
function calculateStochastic(
    highs: number[],
    lows: number[],
    closes: number[],
    period: number = 14
): number {
    if (highs.length < period) return 0;

    const stoch = Stochastic.calculate({
        high: highs,
        low: lows,
        close: closes,
        period,
        signalPeriod: 3,
    });

    return stoch.length > 0 ? stoch[stoch.length - 1].k : 0;
}

/**
 * Calculate Accumulation/Distribution Oscillator
 * Formula: ((Close - Low) - (High - Close)) / (High - Low) × Volume
 * Simplified version using Money Flow Multiplier
 */
function calculateADOscillator(candles: OHLCV[]): number {
    if (candles.length === 0) return 0;

    let ad = 0;
    for (const candle of candles) {
        const { high, low, close, volume } = candle;
        if (high === low) continue; // Avoid division by zero

        const mfm = ((close - low) - (high - close)) / (high - low);
        ad += mfm * volume;
    }

    return ad;
}

/**
 * Calculate VWAP (Volume Weighted Average Price)
 * Formula: Cumulative(Typical Price × Volume) / Cumulative(Volume)
 * Resets daily
 * @param candles - Array of OHLCV candles
 */
function calculateVWAP(candles: OHLCV[]): number {
    if (candles.length === 0) return 0;

    // Filter candles to today only
    const todayStart = dayjs().startOf('day').valueOf();
    const todayCandles = candles.filter(c => c.timestamp >= todayStart);

    if (todayCandles.length === 0) return candles[candles.length - 1]?.close || 0;

    let cumulativeTPV = 0;  // Typical Price × Volume
    let cumulativeVolume = 0;

    for (const candle of todayCandles) {
        const typicalPrice = (candle.high + candle.low + candle.close) / 3;
        cumulativeTPV += typicalPrice * candle.volume;
        cumulativeVolume += candle.volume;
    }

    return cumulativeVolume > 0 ? cumulativeTPV / cumulativeVolume : 0;
}

/**
 * Calculate Chaikin Money Flow (CMF)
 * Formula: Sum(Money Flow Volume over N periods) / Sum(Volume over N periods)
 * @param candles - Array of OHLCV candles
 * @param period - Look-back period (default: 21)
 */
function calculateCMF(candles: OHLCV[], period: number = 21): number {
    if (candles.length < period) return 0;

    const recentCandles = candles.slice(-period);

    let sumMFV = 0;
    let sumVolume = 0;

    for (const candle of recentCandles) {
        const { high, low, close, volume } = candle;
        if (high === low) continue;

        const mfm = ((close - low) - (high - close)) / (high - low);
        sumMFV += mfm * volume;
        sumVolume += volume;
    }

    return sumVolume > 0 ? sumMFV / sumVolume : 0;
}

/**
 * Calculate RSI (Relative Strength Index)
 * @param closes - Array of close prices
 * @param period - Look-back period (default: 14)
 */
function calculateRSI(closes: number[], period: number = 14): number {
    if (closes.length < period + 1) return 50; // Neutral

    const rsi = RSI.calculate({
        values: closes,
        period,
    });

    return rsi.length > 0 ? rsi[rsi.length - 1] : 50;
}

/**
 * Calculate MACD (Moving Average Convergence Divergence)
 * @param closes - Array of close prices
 */
function calculateMACD(closes: number[]): { macd: number; signal: number; histogram: number } {
    if (closes.length < 26) {
        return { macd: 0, signal: 0, histogram: 0 };
    }

    const macd = MACD.calculate({
        values: closes,
        fastPeriod: 12,
        slowPeriod: 26,
        signalPeriod: 9,
        SimpleMAOscillator: false,
        SimpleMASignal: false,
    });

    if (macd.length === 0) {
        return { macd: 0, signal: 0, histogram: 0 };
    }

    const latest = macd[macd.length - 1];
    return {
        macd: latest.MACD || 0,
        signal: latest.signal || 0,
        histogram: latest.histogram || 0,
    };
}

/**
 * Calculate all technical indicators for the given candles
 * @param candles - Array of OHLCV candles
 * @returns Object containing all indicator values
 */
export function calculateIndicators(candles: OHLCV[]): IndicatorValues {
    if (candles.length < 30) {
        console.warn('[Indicators] Insufficient data for accurate calculations');
    }

    const closes = candles.map(c => c.close);
    const highs = candles.map(c => c.high);
    const lows = candles.map(c => c.low);

    return {
        roc: calculateROC(closes),
        stochastic: calculateStochastic(highs, lows, closes),
        ad_osc: calculateADOscillator(candles),
        vwap: calculateVWAP(candles),
        cmf: calculateCMF(candles),
        rsi: calculateRSI(closes),
        macd: calculateMACD(closes),
    };
}
