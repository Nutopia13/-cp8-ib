/**
 * Data Store for OHLCV (Open, High, Low, Close, Volume) candle data
 * Maintains in-memory storage for multiple timeframes with circular buffer
 */

export interface OHLCV {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export type Timeframe = '5m' | '15m' | '1h' | '4h';

const MAX_CANDLES = 500; // Maximum candles to store per timeframe

class DataStore {
    private data: Map<Timeframe, OHLCV[]>;

    constructor() {
        this.data = new Map();
        // Initialize storage for each timeframe
        (['5m', '15m', '1h', '4h'] as Timeframe[]).forEach(tf => {
            this.data.set(tf, []);
        });
    }

    /**
     * Add a new candle to the specified timeframe
     * If max capacity reached, removes oldest candle (circular buffer)
     */
    addCandle(timeframe: Timeframe, candle: OHLCV): void {
        const candles = this.data.get(timeframe);
        if (!candles) return;

        // Check if this candle already exists (by timestamp)
        const existingIndex = candles.findIndex(c => c.timestamp === candle.timestamp);

        if (existingIndex >= 0) {
            // Update existing candle (for incomplete candles that get updated)
            candles[existingIndex] = candle;
        } else {
            // Add new candle
            candles.push(candle);

            // Maintain max size using circular buffer
            if (candles.length > MAX_CANDLES) {
                candles.shift(); // Remove oldest
            }
        }
    }

    /**
     * Get all candles for a timeframe
     */
    getCandles(timeframe: Timeframe, limit?: number): OHLCV[] {
        const candles = this.data.get(timeframe) || [];
        if (limit) {
            return candles.slice(-limit);
        }
        return [...candles]; // Return copy
    }

    /**
     * Get the most recent candle for a timeframe
     */
    getLatest(timeframe: Timeframe): OHLCV | null {
        const candles = this.data.get(timeframe) || [];
        return candles.length > 0 ? candles[candles.length - 1] : null;
    }

    /**
     * Get number of candles stored for a timeframe
     */
    getCount(timeframe: Timeframe): number {
        return this.data.get(timeframe)?.length || 0;
    }

    /**
     * Initialize with historical data
     */
    initializeHistorical(timeframe: Timeframe, candles: OHLCV[]): void {
        // Sort by timestamp
        const sorted = candles.sort((a, b) => a.timestamp - b.timestamp);
        // Keep only the most recent MAX_CANDLES
        const trimmed = sorted.slice(-MAX_CANDLES);
        this.data.set(timeframe, trimmed);
        console.log(`[DataStore] Initialized ${timeframe} with ${trimmed.length} candles`);
    }

    /**
     * Clear all data
     */
    clear(): void {
        (['5m', '15m', '1h', '4h'] as Timeframe[]).forEach(tf => {
            this.data.set(tf, []);
        });
    }
}

// Singleton instance
export const dataStore = new DataStore();
