import { Router } from "express";
import { requireAdmin } from "../middlewares/auth.js";
import {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
} from "../controllers/game.controller.js";

const router = Router();

// --- Public Routes ---
router.get("/", getGames);
router.get("/:id", getGameById);

// --- Admin Routes (Protected) ---
router.post("/", requireAdmin, createGame);
router.put("/:id", requireAdmin, updateGame);
router.delete("/:id", requireAdmin, deleteGame);

export default router;