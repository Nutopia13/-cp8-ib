import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerPulseRoutes } from "./routes/pulse";
import { registerOptionsRoutes } from "./routes/options";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Register pulse routes
  registerPulseRoutes(app);

  // Register options routes
  registerOptionsRoutes(app);

  return httpServer;
}
