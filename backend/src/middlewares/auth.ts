import type { Request, Response, NextFunction } from 'express';
import { supabase } from '../lib/supabaseClient.js';
import { logger } from '../utils/logger.js';

// Extend the Express Request type to include the user object
export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const requireAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // STRATEGY 1: "God Mode" API Key (x-admin-key)
    // Best for: Postman, Scripts, Hardware buttons
    const adminSecret = req.headers['x-admin-key'];
    
    if (adminSecret === process.env.ADMIN_SECRET) {
      req.user = { role: 'super_admin', id: 'system' };
      return next(); // ✅ Access Granted
    }

    // STRATEGY 2: Supabase JWT (Authorization: Bearer <token>)
    // Best for: Your React Frontend
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      // Verify the token with Supabase
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        logger.warn('Auth failed: Invalid JWT token');
        res.status(401).json({ error: 'Invalid or expired session' });
        return;
      }

      // (Optional) Strict Check: Ensure the user actually has an "admin" role in your DB?
      // For now, we assume any logged-in user is allowed.
      req.user = user;
      return next(); // ✅ Access Granted
    }

    // If neither strategy worked:
    res.status(401).json({ error: 'Access Denied: Celestia Security Protocol Engaged 🔒' });
    return;

  } catch (err: any) {
    logger.error('Auth Middleware Error', { error: err.message });
    res.status(500).json({ error: 'Internal Server Error during authentication' });
    return;
  }
};