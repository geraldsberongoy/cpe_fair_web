import { Router } from "express";
import { login, logout } from "../controllers/auth.controller.js";

const router = Router();

/**
 * POST /api/auth/login
 * Verify admin secret.
 * Body:
 *  - secret (string): The admin password/key
 * Response: 200 if valid, 401 if invalid
 */
router.post("/login", login);

/**
 * POST /api/auth/logout
 * Log out (stateless).
 * Response: 200 OK
 */
router.post("/logout", logout);

export default router;
