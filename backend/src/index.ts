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

// Define allowed origins
const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://cpefair2025.vercel.app", // Your production Frontend URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // Required if you are sending cookies/headers
  })
);
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
// 1. Export the app for Vercel (Serverless)
export default app;

// 2. Only listen to the port if we are running LOCALLY (not in Vercel)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    logger.info("Server started locally", {
      port: PORT,
      timestamp: new Date().toISOString(),
    });
    console.log(`\nServer is running on http://localhost:${PORT}/api\n`);
    console.log(`Welcome to the ACCESS Leaderboard Express API!\n`);
  });
}
