/**
 * Options Pulse API Routes
 * 
 * Fetches live BTC options momentum data by running the Python pulse system
 */

import { Router } from "express";
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

interface OptionsPulse {
    timestamp: string;
    btc_price: number;
    time_to_0dte_expiry: string;
    directional_bias: {
        score: number;
        interpretation: string;
        confidence: string;
        components: Record<string, number>;
    };
    volatility_momentum: {
        score: number;
        interpretation: string;
        drivers: Record<string, any>;
    };
    key_levels: {
        max_call_oi_strike: number | null;
        max_put_oi_strike: number | null;
        gamma_flip_level: number;
        interpretation: string;
    };
    raw_metrics: Record<string, number>;
    status?: string;
    reason?: string;
}

export function registerOptionsRoutes(app: Router) {

    /**
     * GET /api/options/pulse
     * Fetch current options momentum pulse
     * 
     * Query params:
     * - dte: '0dte' | '1dte' | '2dte' | '3dte' | '7dte' | 'both' | 'all' (default: '2dte')
     */
    app.get('/api/options/pulse', async (req, res) => {
        try {
            const dteMode = (req.query.dte as string) || '2dte';

            // Validate DTE mode
            if (!['0dte', '1dte', '2dte', '3dte', '7dte', 'both', 'all'].includes(dteMode)) {
                return res.status(400).json({
                    error: 'Invalid DTE mode. Must be 0dte, 1dte, 2dte, 3dte, 7dte, both, or all'
                });
            }

            // Path to Python system
            const pulsePath = path.join(process.cwd(), '..', 'btc_0dte_pulse');
            const pythonPath = path.join(pulsePath, 'venv', 'Scripts', 'python.exe');

            // Create a single-run script
            const scriptPath = path.join(pulsePath, 'fetch_pulse_once.py');

            // Set environment variables and run Python script
            const env = {
                ...process.env,
                DTE_MODE: dteMode,
                DERIBIT_ENV: 'test' // or 'prod' based on config
            };

            // Execute Python script with timeout
            const { stdout, stderr } = await execAsync(
                `"${pythonPath}" "${scriptPath}"`,
                {
                    cwd: pulsePath,
                    env: env,
                    timeout: 15000 // 15 second timeout
                }
            );

            // Parse JSON output from Python
            const pulse: OptionsPulse = JSON.parse(stdout.trim());

            // Add metadata
            const response = {
                ...pulse,
                dte_mode: dteMode,
                fetched_at: new Date().toISOString(),
                source: 'deribit_test'
            };

            res.json(response);

        } catch (error: any) {
            console.error('Error fetching options pulse:', error);

            res.status(500).json({
                error: 'Failed to fetch options pulse',
                message: error.message,
                timestamp: new Date().toISOString()
            });
        }
    });

    /**
     * GET /api/options/status
     * Health check for options system
     */
    app.get('/api/options/status', async (req, res) => {
        try {
            const pulsePath = path.join(process.cwd(), '..', 'btc_0dte_pulse');
            const pythonPath = path.join(pulsePath, 'venv', 'Scripts', 'python.exe');

            // Quick check if Python environment exists
            await execAsync(`"${pythonPath}" --version`, { timeout: 5000 });

            res.json({
                status: 'operational',
                python_available: true,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            res.json({
                status: 'degraded',
                python_available: false,
                error: 'Python environment not found',
                timestamp: new Date().toISOString()
            });
        }
    });

    /**
     * GET /api/iv-momentum/pulse
     * Fetch IV Momentum pulse for 1-2-3-7 DTE analysis
     * 
     * Query params:
     * - dte: '1dte' | '2dte' | '3dte' | '7dte' (default: '2dte')
     */
    app.get('/api/iv-momentum/pulse', async (req, res) => {
        try {
            const dteMode = (req.query.dte as string) || '2dte';

            // Validate DTE mode (1dte, 2dte, 3dte, 7dte for unified Options dashboard)
            if (!['1dte', '2dte', '3dte', '7dte'].includes(dteMode)) {
                return res.status(400).json({
                    error: 'Invalid DTE mode. Must be 1dte, 2dte, 3dte, or 7dte'
                });
            }

            // Path to Python system
            const pulsePath = path.join(process.cwd(), '..', 'btc_0dte_pulse');
            const pythonPath = path.join(pulsePath, 'venv', 'Scripts', 'python.exe');

            // IV-enhanced script
            const scriptPath = path.join(pulsePath, 'fetch_iv_pulse.py');

            // Set environment variables
            const env = {
                ...process.env,
                DTE_MODE: dteMode,
                DERIBIT_ENV: 'test'
            };

            // Execute Python script
            const { stdout, stderr } = await execAsync(
                `"${pythonPath}" "${scriptPath}"`,
                {
                    cwd: pulsePath,
                    env: env,
                    timeout: 20000 // 20 second timeout for IV calculations
                }
            );

            // Parse JSON output
            const pulse = JSON.parse(stdout.trim());

            // Add metadata
            const response = {
                ...pulse,
                dte_mode: dteMode,
                fetched_at: new Date().toISOString(),
                source: 'deribit_test_iv'
            };

            res.json(response);

        } catch (error: any) {
            console.error('Error fetching IV momentum pulse:', error);

            res.status(500).json({
                error: 'Failed to fetch IV momentum pulse',
                message: error.message,
                timestamp: new Date().toISOString()
            });
        }
    });
}
