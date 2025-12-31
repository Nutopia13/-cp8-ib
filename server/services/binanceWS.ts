import WebSocket from 'ws';
import { EventEmitter } from 'events';
import { dataStore, type OHLCV, type Timeframe } from './dataStore';

interface BinanceKline {
    e: string;      // Event type
    E: number;      // Event time
    s: string;      // Symbol
    k: {
        t: number;    // Kline start time
        T: number;    // Kline close time
        s: string;    // Symbol
        i: string;    // Interval
        f: number;    // First trade ID
        L: number;    // Last trade ID
        o: string;    // Open price
        c: string;    // Close price
        h: string;    // High price
        l: string;    // Low price
        v: string;    // Base asset volume
        n: number;    // Number of trades
        x: boolean;   // Is this kline closed?
        q: string;    // Quote asset volume
        V: string;    // Taker buy base asset volume
        Q: string;    // Taker buy quote asset volume
    };
}

interface StreamData {
    stream: string;
    data: BinanceKline;
}

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/stream?streams=btcusdt@kline_5m/btcusdt@kline_15m/btcusdt@kline_1h/btcusdt@kline_4h';
const RECONNECT_DELAYS = [1000, 2000, 4000, 8000, 16000, 30000]; // Exponential backoff
const HEARTBEAT_INTERVAL = 30000; // 30 seconds

/**
 * Binance WebSocket Manager
 * Handles connection, reconnection, and real-time kline data streaming
 */
export class BinanceWebSocket extends EventEmitter {
    private ws: WebSocket | null = null;
    private reconnectAttempt = 0;
    private reconnectTimeout: NodeJS.Timeout | null = null;
    private heartbeatInterval: NodeJS.Timeout | null = null;
    private isIntentionallyClosed = false;

    constructor() {
        super();
    }

    /**
     * Connect to Binance WebSocket streams
     */
    connect(): void {
        if (this.ws) {
            console.log('[BinanceWS] Already connected or connecting');
            return;
        }

        this.isIntentionallyClosed = false;
        console.log('[BinanceWS] Connecting to Binance WebSocket...');

        this.ws = new WebSocket(BINANCE_WS_URL);

        this.ws.on('open', () => {
            console.log('[BinanceWS] ✓ Connected successfully');
            this.reconnectAttempt = 0;
            this.startHeartbeat();
            this.emit('connected');
        });

        this.ws.on('message', (data: WebSocket.Data) => {
            try {
                const message: StreamData = JSON.parse(data.toString());
                this.handleMessage(message);
            } catch (error) {
                console.error('[BinanceWS] Error parsing message:', error);
            }
        });

        this.ws.on('error', (error) => {
            console.error('[BinanceWS] WebSocket error:', error.message);
            this.emit('error', error);
        });

        this.ws.on('close', () => {
            console.log('[BinanceWS] Connection closed');
            this.stopHeartbeat();
            this.ws = null;

            if (!this.isIntentionallyClosed) {
                this.scheduleReconnect();
            }

            this.emit('disconnected');
        });
    }

    /**
     * Handle incoming kline messages
     */
    private handleMessage(message: StreamData): void {
        if (message.data.e !== 'kline') return;

        const kline = message.data.k;
        const timeframe = this.parseTimeframe(kline.i);

        if (!timeframe) {
            console.warn(`[BinanceWS] Unknown timeframe: ${kline.i}`);
            return;
        }

        // Convert to OHLCV format
        const candle: OHLCV = {
            timestamp: kline.t,
            open: parseFloat(kline.o),
            high: parseFloat(kline.h),
            low: parseFloat(kline.l),
            close: parseFloat(kline.c),
            volume: parseFloat(kline.v),
        };

        // Always update the data store (for real-time updates of current candle)
        dataStore.addCandle(timeframe, candle);

        // Only emit 'candleClosed' event when candle actually closes
        if (kline.x) {
            console.log(`[BinanceWS] Candle closed: ${timeframe} at ${new Date(candle.timestamp).toISOString()}`);
            this.emit('candleClosed', { timeframe, candle });
        } else {
            // Emit 'candleUpdate' for real-time updates
            this.emit('candleUpdate', { timeframe, candle });
        }
    }

    /**
     * Parse Binance interval string to our Timeframe type
     */
    private parseTimeframe(interval: string): Timeframe | null {
        const map: Record<string, Timeframe> = {
            '5m': '5m',
            '15m': '15m',
            '1h': '1h',
            '4h': '4h',
        };
        return map[interval] || null;
    }

    /**
     * Start heartbeat to detect dead connections
     */
    private startHeartbeat(): void {
        this.stopHeartbeat();

        this.heartbeatInterval = setInterval(() => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.ping();
            }
        }, HEARTBEAT_INTERVAL);
    }

    /**
     * Stop heartbeat
     */
    private stopHeartbeat(): void {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }

    /**
     * Schedule reconnection with exponential backoff
     */
    private scheduleReconnect(): void {
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }

        const delay = RECONNECT_DELAYS[Math.min(this.reconnectAttempt, RECONNECT_DELAYS.length - 1)];
        console.log(`[BinanceWS] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempt + 1})...`);

        this.reconnectTimeout = setTimeout(() => {
            this.reconnectAttempt++;
            this.connect();
        }, delay);
    }

    /**
     * Disconnect from WebSocket
     */
    disconnect(): void {
        console.log('[BinanceWS] Disconnecting...');
        this.isIntentionallyClosed = true;

        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }

        this.stopHeartbeat();

        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    /**
     * Check if connected
     */
    isConnected(): boolean {
        return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
    }
}

// Singleton instance
export const binanceWS = new BinanceWebSocket();
