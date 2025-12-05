import { Router } from "express";
import { requireAdmin } from "../middlewares/auth.js";
import { 
  getTeams, 
  getTeamById, 
  createTeam, 
  updateTeam, 
  deleteTeam 
} from "../controllers/team.controller.js";

const router = Router();

// --- Public Routes ---

/**
 * GET /api/team
 * List all teams.
 * Response: List of teams (JSON)
 */
router.get("/", getTeams);

/**
 * GET /api/team/:id
 * Get a single team by ID.
 * Param: id (string) - The team ID
 * Response: Team details (JSON)
 */
router.get("/:id", getTeamById);

// --- Admin Routes ---

/**
 * POST /api/team
 * Create a new team (Admin only).
 * Body:
 *  - name (string): Name of the team (Required)
 *  - color (string): Tailwind color class or hex code
 * Response: Team created successfully (201)
 */
router.post("/", requireAdmin, createTeam);

/**
 * PUT /api/team/:id
 * Update a team (Admin only).
 * Param: id (string) - The team ID
 * Body:
 *  - name (string): Name of the team
 *  - color (string): Tailwind color class or hex code
 * Response: Team updated successfully (200)
 */
router.put("/:id", requireAdmin, updateTeam);

/**
 * DELETE /api/team/:id
 * Delete a team (Admin only).
 * Param: id (string) - The team ID
 * Response: Team deleted successfully (200)
 */
router.delete("/:id", requireAdmin, deleteTeam);

export default router;