import type { Express, Request, Response } from "express";
import { calculatePulse, calculateAllPulses } from "../pulse/service";
import { dataStore, type Timeframe } from "../services/dataStore";

export function registerPulseRoutes(app: Express): void {
    /**
     * GET /api/pulse/all
     * Get current pulse data for all timeframes
     */
    app.get("/api/pulse/all", (_req: Request, res: Response) => {
        try {
            const allPulses = calculateAllPulses();
            const result: Record<string, any> = {};

            allPulses.forEach((pulse, timeframe) => {
                result[timeframe] = pulse;
            });

            res.json(result);
        } catch (error) {
            console.error("[API] Error getting all pulses:", error);
            res.status(500).json({ error: "Failed to calculate pulse data" });
        }
    });

    /**
     * GET /api/pulse/:timeframe
     * Get current pulse data for specific timeframe
     */
    app.get("/api/pulse/:timeframe", (req: Request, res: Response) => {
        try {
            const timeframe = req.params.timeframe as Timeframe;

            if (!['5m', '15m', '1h', '4h'].includes(timeframe)) {
                return res.status(400).json({ error: "Invalid timeframe. Use: 5m, 15m, 1h, or 4h" });
            }

            const pulse = calculatePulse(timeframe);

            if (!pulse) {
                return res.status(404).json({ error: "Insufficient data for this timeframe" });
            }

            res.json(pulse);
        } catch (error) {
            console.error(`[API] Error getting pulse for ${req.params.timeframe}:`, error);
            res.status(500).json({ error: "Failed to calculate pulse data" });
        }
    });

    /**
     * GET /api/pulse/history/:timeframe
     * Get historical candle data for specific timeframe
     */
    app.get("/api/pulse/history/:timeframe", (req: Request, res: Response) => {
        try {
            const timeframe = req.params.timeframe as Timeframe;
            const limit = parseInt(req.query.limit as string) || 100;

            if (!['5m', '15m', '1h', '4h'].includes(timeframe)) {
                return res.status(400).json({ error: "Invalid timeframe" });
            }

            const candles = dataStore.getCandles(timeframe, limit);

            res.json({
                timeframe,
                count: candles.length,
                candles,
            });
        } catch (error) {
            console.error(`[API] Error getting history for ${req.params.timeframe}:`, error);
            res.status(500).json({ error: "Failed to get historical data" });
        }
    });
}
