// Vercel serverless function entry point
// This imports the compiled Express app and exports it as a Vercel handler

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

// Import the bundled Express app
const app = require(join(__dirname, '..', 'dist', 'index.cjs'));

// Export for Vercel serverless
export default app;
