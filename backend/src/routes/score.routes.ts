import { Router } from "express";
import { requireAdmin } from "../middlewares/auth.js";
import {
  getScores,
  createScore,
  updateScore,
  deleteScore,
  getScoresByAllSectionTeam,
  getScoresBySectionTeam,
} from "../controllers/score.controller.js";

const router = Router();

// --- 🌍 PUBLIC ROUTES (Read Only) ---
// Anyone can view the scores
router.get("/", getScores);
router.get("/section_team", getScoresByAllSectionTeam);
router.get("/section_team/:section_team", getScoresBySectionTeam);

// --- 🔒 PROTECTED ROUTES (Admin Only) ---
// Only authenticated admins can change data
router.post("/", requireAdmin, createScore);
router.put("/:id", requireAdmin, updateScore);
router.delete("/:id", requireAdmin, deleteScore);

export default router;