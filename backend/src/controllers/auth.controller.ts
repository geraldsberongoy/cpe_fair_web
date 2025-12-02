import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req: Request, res: Response) => {
  const { secret } = req.body;

  if (!secret) {
    return res.status(400).json({ error: "Secret is required" });
  }

  // Check against the environment variable
  if (secret === process.env.ADMIN_SECRET) {
    return res.status(200).json({ message: "Authenticated" });
  }

  return res.status(401).json({ error: "Invalid secret" });
};

export const logout = async (req: Request, res: Response) => {
  // Since we are using stateless auth (headers), we just return success.
  // The client is responsible for forgetting the secret.
  return res.status(200).json({ message: "Logged out successfully" });
};
