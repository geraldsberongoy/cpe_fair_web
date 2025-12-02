import express from "express";
import type { Request, Response } from "express";

import cors from "cors";
import dotenv from "dotenv";

import { logger } from "./utils/logger.js";

import scoreRoutes from "./routes/score.routes.js";
import playerRoutes from "./routes/player.routes.js";
import teamRoutes from "./routes/team.routes.js";
import gameRoutes from "./routes/game.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use("/api/score", scoreRoutes);
app.use("/api/player", playerRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/auth", authRoutes);

// Test routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Health Check: API is running!" });
});

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Hello from the ACCESS Leaderboard Express API!" });
});

// --- Start Server ---
app.listen(PORT, () => {
  logger.info("Server started successfully", {
    port: PORT,
    environment: process.env.NODE_ENV || "development",
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
  });
  // Keep console.log for immediate visibility during development
  console.log(`\nServer is running on http://localhost:${PORT}/api`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 4));
});
