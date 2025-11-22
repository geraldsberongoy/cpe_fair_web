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
router.get("/", getTeams);
router.get("/:id", getTeamById);

// --- Admin Routes ---
router.post("/", requireAdmin, createTeam);
router.put("/:id", requireAdmin, updateTeam);
router.delete("/:id", requireAdmin, deleteTeam);

export default router;