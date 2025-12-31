import type { Express } from "express";
import { createServer, type Server } from "http";
import express, { type Request, Response, NextFunction } from "express";
import { Server as SocketIOServer } from "socket.io";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { binanceWS } from "./services/binanceWS";
import { initializeAllTimeframes } from "./services/historicalData";
import { calculatePulse, calculateAllPulses, checkThresholdCrossing, type PulseData } from "./pulse/service";
import type { Timeframe } from "./services/dataStore";

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

// Store previous pulse scores for threshold crossing detection
const previousPulseScores = new Map<Timeframe, number>();

export async function createApp(): Promise<{ app: Express; httpServer: Server }> {
  const app = express();
  const httpServer = createServer(app);

  // Initialize Socket.IO
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Track connected clients
  io.on('connection', (socket) => {
    log(`Client connected: ${socket.id}`, 'socket.io');

    // Send current pulse data on connection
    const allPulses = calculateAllPulses();
    allPulses.forEach((pulse, timeframe) => {
      if (pulse) {
        socket.emit('pulseUpdate', pulse);
      }
    });

    socket.on('disconnect', () => {
      log(`Client disconnected: ${socket.id}`, 'socket.io');
    });
  });

  // Initialize market pulse system
  (async () => {
    try {
      log('Initializing market pulse system...', 'pulse');

      // Fetch historical data
      await initializeAllTimeframes('BTCUSDT', 30);
      log('✓ Historical data loaded', 'pulse');

      // Connect to Binance WebSocket
      binanceWS.connect();

      // Handle candle close events
      binanceWS.on('candleClosed', ({ timeframe, candle }) => {
        log(`Candle closed: ${timeframe} at ${new Date(candle.timestamp).toISOString()}`, 'pulse');

        // Calculate new pulse
        const pulse = calculatePulse(timeframe);
        if (pulse) {
          // Check for threshold crossings
          const previousScore = previousPulseScores.get(timeframe);
          const crossing = checkThresholdCrossing(previousScore || null, pulse.pulse_score);

          if (crossing) {
            log(
              `⚠️  Pulse ${crossing.direction} through ${crossing.threshold} for ${timeframe}: ${pulse.pulse_score}`,
              'pulse'
            );
          }

          // Store current score
          previousPulseScores.set(timeframe, pulse.pulse_score);

          // Broadcast to all connected clients
          io.emit('pulseUpdate', pulse);
          log(`Pulse updated for ${timeframe}: Score ${pulse.pulse_score} (${pulse.signal})`, 'pulse');
        }
      });

      // Handle real-time updates (for charts)
      binanceWS.on('candleUpdate', ({ timeframe, candle }) => {
        io.emit('candleUpdate', { timeframe, candle });
      });

      binanceWS.on('connected', () => {
        log('✓ WebSocket connected to Binance', 'pulse');
      });

      binanceWS.on('disconnected', () => {
        log('✗ WebSocket disconnected from Binance', 'pulse');
      });

      log('✓ Market pulse system initialized', 'pulse');
    } catch (error) {
      console.error('[Pulse] Initialization error:', error);
    }
  })();


  app.use(
    express.json({
      verify: (req, _res, buf) => {
        req.rawBody = buf;
      },
    }),
  );

  app.use(express.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }

        log(logLine);
      }
    });

    next();
  });

  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  return { app, httpServer };
}

// Only start the server if we're not in a serverless environment
if (process.env.VERCEL !== "1") {
  (async () => {
    const { httpServer } = await createApp();

    // ALWAYS serve the app on the port specified in the environment variable PORT
    // Other ports are firewalled. Default to 5000 if not specified.
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = parseInt(process.env.PORT || "5000", 10);
    httpServer.listen(
      {
        port,
        host: "0.0.0.0",
        reusePort: true,
      },
      () => {
        log(`serving on port ${port}`);
      },
    );
  })();
}
