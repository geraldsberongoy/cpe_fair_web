import { Router } from "express";
import { requireAdmin } from "../middlewares/auth.js";
import {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from "../controllers/player.controller.js";

const router = Router();

// --- Public Routes (Read Only) ---

/**
 * GET /api/player
 * List all players.
 * Response: List of players (JSON)
 */
router.get("/", getPlayers);

/**
 * GET /api/player/:id
 * Get a single player by ID.
 * Param: id (string) - The player ID
 * Response: Player details (JSON)
 */
router.get("/:id", getPlayerById);

// --- Admin Routes (Protected) ---

/**
 * POST /api/player
 * Create a new player (Admin only).
 * Body:
 *  - full_name (string): Full name of the player (Required)
 *  - cys (string): Course, Year, and Section (Required)
 *  - team_id (string): UUID of the team
 * Response: Player created successfully (201)
 */
router.post("/", requireAdmin, createPlayer);

/**
 * PUT /api/player/:id
 * Update a player (Admin only).
 * Param: id (string) - The player ID
 * Body:
 *  - full_name (string): Full name of the player
 *  - cys (string): Course, Year, and Section
 *  - team_id (string): UUID of the team
 * Response: Player updated successfully (200)
 */
router.put("/:id", requireAdmin, updatePlayer);

/**
 * DELETE /api/player/:id
 * Delete a player (Admin only).
 * Param: id (string) - The player ID
 * Response: Player deleted successfully (200)
 */
router.delete("/:id", requireAdmin, deletePlayer);

export default router;