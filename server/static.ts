import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

export function serveStatic(app: Express) {
  // For ESM modules, we need to use import.meta.url
  // In Vercel serverless, we need to resolve relative to the current module
  let distPath: string;

  // Check if we're in a bundled environment (Vercel)
  if (typeof __dirname !== 'undefined') {
    // CommonJS or bundled code
    distPath = path.resolve(__dirname, "public");
  } else {
    // ESM - use import.meta.url
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    distPath = path.resolve(__dirname, "public");
  }

  if (!fs.existsSync(distPath)) {
    console.error(`Could not find the build directory: ${distPath}`);
    // In production/Vercel, try alternative paths
    const altPaths = [
      path.join(process.cwd(), "dist", "public"),
      path.join(process.cwd(), "public"),
      "/var/task/dist/public", // Vercel serverless path
    ];

    for (const altPath of altPaths) {
      if (fs.existsSync(altPath)) {
        distPath = altPath;
        console.log(`Found build directory at: ${distPath}`);
        break;
      }
    }

    if (!fs.existsSync(distPath)) {
      throw new Error(
        `Could not find the build directory. Tried: ${distPath}, ${altPaths.join(", ")}`
      );
    }
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
