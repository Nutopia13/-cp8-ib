import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile } from "fs/promises";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();


  console.log("building server...");

  // Use TypeScript compiler instead of esbuild to avoid ESM require() issues
  const tscResult = await import("child_process").then(cp =>
    new Promise((resolve, reject) => {
      const proc = cp.spawn("npx", ["tsc", "--project", "tsconfig.server.json"], {
        stdio: "inherit",
        shell: true
      });
      proc.on("close", (code) => {
        if (code === 0) resolve(code);
        else reject(new Error(`tsc exited with code ${code}`));
      });
    })
  );

  console.log("✓ server compiled");
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
