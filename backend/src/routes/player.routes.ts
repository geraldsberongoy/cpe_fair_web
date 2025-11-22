import { Router } from "express";
import { requireAdmin } from "../middlewares/auth.js"; // Import the security guard
import {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from "../controllers/player.controller.js";

const router = Router();

// --- Public Routes (Read Only) ---
router.get("/", getPlayers);
router.get("/:id", getPlayerById);

// --- Admin Routes (Protected) ---
router.post("/", requireAdmin, createPlayer);
router.put("/:id", requireAdmin, updatePlayer);
router.delete("/:id", requireAdmin, deletePlayer);

export default router;