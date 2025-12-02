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

/**
 * GET /api/game
 * List all games.
 * Response: List of games (JSON)
 */
router.get("/", getGames);

/**
 * GET /api/game/:id
 * Get a single game by ID.
 * Param: id (string) - The game ID
 * Response: Game details (JSON)
 */
router.get("/:id", getGameById);

// --- Admin Routes (Protected) ---

/**
 * POST /api/game
 * Create a new game (Admin only).
 * Body:
 *  - name (string): Name of the game (Required)
 *  - is_group (boolean): Whether the game requires a group (Default: false)
 *  - icon (string): Emoji icon for the game
 * Response: Game created successfully (201)
 */
router.post("/", requireAdmin, createGame);

/**
 * PUT /api/game/:id
 * Update a game (Admin only).
 * Param: id (string) - The game ID
 * Body:
 *  - name (string): Name of the game
 *  - is_group (boolean): Whether the game requires a group
 *  - icon (string): Emoji icon for the game
 * Response: Game updated successfully (200)
 */
router.put("/:id", requireAdmin, updateGame);

/**
 * DELETE /api/game/:id
 * Delete a game (Admin only).
 * Param: id (string) - The game ID
 * Response: Game deleted successfully (200)
 */
router.delete("/:id", requireAdmin, deleteGame);

export default router;