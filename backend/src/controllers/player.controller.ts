import type { Request, Response } from "express";
import { supabase } from "../lib/supabaseClient.js"; // Updated Import
import { logger } from "../utils/logger.js";
import type { Player, CreatePlayerDto, UpdatePlayerDto } from "../types/player.js";

// GET /api/player
export const getPlayers = async (req: Request, res: Response) => {
  try {
    const { team_name } = req.query;

    let query = supabase
      .from("player")
      .select(`
        *,
        team:team_id ( name, section_represented )
      `)
      .order("full_name", { ascending: true });

    if (team_name && typeof team_name === 'string') {
      // First find the team ID
      const { data: teamData, error: teamError } = await supabase
        .from("team")
        .select("id")
        .eq("name", team_name)
        .single();

      if (teamError || !teamData) {
        // If team not found, return empty list
        return res.json([]);
      }

      query = query.eq("team_id", teamData.id);
    }

    const { data, error } = await query;

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
      .select(`
        *,
        team:team_id ( name, section_represented )
      `)
      .eq("id", id)
      .single();

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
  const { full_name, cys, team_id } = req.body;

  if (!full_name || !cys) {
    return res.status(400).json({ error: "Name and CYS are required" });
  }

  try {
    const { data, error } = await supabase
      .from("player")
      .insert([{ full_name, cys, team_id }])
      .select(`
        *,
        team:team_id ( name, section_represented )
      `)
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
  const { id } = req.params;
  const { full_name, cys, team_id } = req.body;

  try {
    const { data, error } = await supabase
      .from("player")
      .update({ full_name, cys, team_id })
      .eq("id", id)
      .select(`
        *,
        team:team_id ( name, section_represented )
      `)
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