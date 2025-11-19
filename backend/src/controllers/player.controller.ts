import type { Request, Response } from "express";
import { supabase } from "../lib/supabaseClient.js";
import { logger } from "../utils/logger.js";
import { Player, CreatePlayerDto, UpdatePlayerDto } from "../types/player.js";

// GET /api/player
export const getPlayers = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("player")
      .select("*")
      .returns<Player[]>();

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    logger.error("Failed to fetch players", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

// GET /api/player/:id
export const getPlayerById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("player")
      .select("*")
      .eq("id", id)
      .single(); // Ensures only one row is returned

    if (error) throw error;

    res.json({ message: "Player fetched successfully", data });
  } catch (err: any) {
    logger.error("Failed to get specific player", err);
    res.status(500).json({ error: err.message });
  }
};

// POST /api/player
export const createPlayer = async (
  req: Request<{}, {}, CreatePlayerDto>,
  res: Response
) => {
  try {
    const { data, error } = await supabase
      .from("player")
      .insert(req.body)
      .select()
      .single();
    if (error) throw error;
    res.status(201).json({ message: "Player created successfully", data });
  } catch (err: any) {
    logger.error("Failed to create player", err);
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/player/:id
export const updatePlayer = async (
  req: Request<{ id: string }, {}, UpdatePlayerDto>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("player")
      .update(req.body)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    res.json({ message: "Player updated successfully", data });
  } catch (err: any) {
    logger.error("Failed to update player", err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/player/:id
export const deletePlayer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("player").delete().eq("id", id);
    if (error) throw error;
    res.json({ message: "Player deleted successfully", data: { id } });
  } catch (err: any) {
    logger.error("Failed to delete player", err);
    res.status(500).json({ error: err.message });
  }
};
