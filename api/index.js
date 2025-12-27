// Vercel serverless function entry point
import { createApp } from '../dist/index.mjs';

let app;

export default async function handler(req, res) {
    // Initialize app on first request (cold start)
    if (!app) {
        app = await createApp();
    }

    return app(req, res);
}
