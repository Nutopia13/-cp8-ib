import axios from 'axios';
import { dataStore, type OHLCV, type Timeframe } from './dataStore';

const BINANCE_API_URL = 'https://api.binance.com/api/v3/klines';

// Binance interval mapping
const INTERVAL_MAP: Record<Timeframe, string> = {
    '5m': '5m',
    '15m': '15m',
    '1h': '1h',
    '4h': '4h',
};

interface BinanceKlineData extends Array<any> {
    0: number;   // Open time
    1: string;   // Open
    2: string;   // High
    3: string;   // Low
    4: string;   // Close
    5: string;   // Volume
    6: number;   // Close time
}

/**
 * Fetch historical kline data from Binance REST API
 * @param symbol - Trading pair (e.g., 'BTCUSDT')
 * @param timeframe - Timeframe to fetch
 * @param days - Number of days of historical data (default: 30)
 * @returns Array of OHLCV candles
 */
export async function fetchHistoricalData(
    symbol: string,
    timeframe: Timeframe,
    days: number = 30
): Promise<OHLCV[]> {
    const interval = INTERVAL_MAP[timeframe];
    const limit = calculateLimit(timeframe, days);

    console.log(`[HistoricalFetch] Fetching ${days} days of ${timeframe} data for ${symbol} (${limit} candles)...`);

    try {
        const response = await axios.get(BINANCE_API_URL, {
            params: {
                symbol,
                interval,
                limit,
            },
        });

        const candles: OHLCV[] = response.data.map((kline: BinanceKlineData) => ({
            timestamp: kline[0],
            open: parseFloat(kline[1]),
            high: parseFloat(kline[2]),
            low: parseFloat(kline[3]),
            close: parseFloat(kline[4]),
            volume: parseFloat(kline[5]),
        }));

        console.log(`[HistoricalFetch] ✓ Fetched ${candles.length} candles for ${timeframe}`);
        return candles;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`[HistoricalFetch] API error:`, error.response?.data || error.message);
        } else {
            console.error(`[HistoricalFetch] Error fetching data:`, error);
        }
        throw error;
    }
}

/**
 * Calculate number of candles needed for given days
 */
function calculateLimit(timeframe: Timeframe, days: number): number {
    const candlesPerDay: Record<Timeframe, number> = {
        '5m': 288,   // 24 * 60 / 5
        '15m': 96,   // 24 * 60 / 15
        '1h': 24,    // 24
        '4h': 6,     // 24 / 4
    };

    const limit = Math.min(candlesPerDay[timeframe] * days, 1000); // Binance max is 1000
    return limit;
}

/**
 * Initialize all timeframes with historical data
 */
export async function initializeAllTimeframes(symbol: string = 'BTCUSDT', days: number = 30): Promise<void> {
    const timeframes: Timeframe[] = ['5m', '15m', '1h', '4h'];

    console.log(`[HistoricalFetch] Initializing all timeframes with ${days} days of data...`);

    for (const timeframe of timeframes) {
        try {
            const candles = await fetchHistoricalData(symbol, timeframe, days);
            dataStore.initializeHistorical(timeframe, candles);

            // Add small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
            console.error(`[HistoricalFetch] Failed to initialize ${timeframe}:`, error);
            // Continue with other timeframes even if one fails
        }
    }

    console.log('[HistoricalFetch] ✓ All timeframes initialized');
}
