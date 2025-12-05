import { Router } from "express";
import { requireAdmin } from "../middlewares/auth.js";
import {
  getScores,
  createScore,
  updateScore,
  deleteScore,
  getScoresByAllSectionTeam,
  getScoresBySectionTeam,
  getCategoryStandings,
} from "../controllers/score.controller.js";
import { exportMasterScoreLedger, getMasterScoreLedger } from "../controllers/export.controller.js";

const router = Router();

// --- PUBLIC ROUTES (Read Only) ---

/**
 * GET /api/score
 * List all scores.
 * Query:
 *  - type (string): "solo" or "group"
 *  - category (string): Filter by category
 * Response: List of scores (JSON)
 */
router.get("/", getScores);

/**
 * GET /api/score/category-standings
 * Get scores grouped by game for a specific category.
 * Query:
 *  - category (string): Filter by category (e.g., "Sports")
 * Response: Map of games to ranked scores (JSON)
 */
router.get("/category-standings", getCategoryStandings);

/**
 * GET /api/score/section_team
 * Get aggregated scores by section team.
 * Query:
 *  - game (string): Filter by game
 *  - category (string): Filter by category
 *  - sort (string): "points"
 *  - order (string): "asc" or "desc"
 * Response: Aggregated scores (JSON)
 */
router.get("/section_team", getScoresByAllSectionTeam);

/**
 * GET /api/score/section_team/:section_team
 * Get scores for a specific section team.
 * Param: section_team (string) - The section team identifier
 * Query:
 *  - game (string): Filter by game
 *  - category (string): Filter by category
 * Response: Scores for the section team (JSON)
 */
router.get("/section_team/:section_team", getScoresBySectionTeam);

// --- PROTECTED ROUTES (Admin Only) ---

/**
 * POST /api/score
 * Create a new score (Admin only).
 * Body:
 *  - teamId (string): UUID of the team (Required)
 *  - points (number): Points to award (Required)
 *  - game (string): Name of the game (Required)
 *  - category (string): Category of the game (Required)
 *  - contributor (string): Name of the contributor
 *  - isGroup (boolean): Whether it is a group score
 *  - members (string[]): List of member names (if group)
 * Response: Score created successfully (201)
 */
router.post("/", requireAdmin, createScore);

/**
 * PUT /api/score/:id
 * Update a score (Admin only).
 * Param: id (string) - The score ID
 * Body:
 *  - teamId (string): UUID of the team
 *  - points (number): Points to award
 *  - game (string): Name of the game
 *  - category (string): Category of the game
 *  - contributor (string): Name of the contributor
 *  - isGroup (boolean): Whether it is a group score
 *  - members (string[]): List of member names (if group)
 * Response: Score updated successfully (200)
 */
router.put("/:id", requireAdmin, updateScore);

/**
 * DELETE /api/score/:id
 * Delete a score (Admin only).
 * Param: id (string) - The score ID
 * Response: Score deleted successfully (200)
 */
router.delete("/:id", requireAdmin, deleteScore);

/**
 * GET /api/score/ledger
 * Get master score ledger as JSON (Admin only).
 * Response: Array of all ledger records
 */
router.get("/ledger", requireAdmin, getMasterScoreLedger);

/**
 * GET /api/score/export
 * Export master score ledger to Excel (Admin only).
 * Response: Excel file download
 */
router.get("/export", requireAdmin, exportMasterScoreLedger);

export default router;