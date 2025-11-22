import type { Request, Response } from "express";
import { supabase } from "../lib/supabaseClient.js";
import { logger } from "../utils/logger.js";
import type { Team, CreateTeamDto, UpdateTeamDto } from "../types/team.js";

// GET /api/team - List all Nations
export const getTeams = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("team")
      .select("*")
      .order("name", { ascending: true })
      .returns<Team[]>();

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    logger.error("Failed to fetch teams", err);
    res.status(500).json({ error: err.message });
  }
};

// GET /api/team/:id - Get details of one Nation
export const getTeamById = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("team")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    res.json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/team - Create a new Nation
export const createTeam = async (
  req: Request<{}, {}, CreateTeamDto>, 
  res: Response
) => {
  const { name, color } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Team name is required" });
  }

  try {
    const { data, error } = await supabase
      .from("team")
      .insert([{ name, color }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ message: "Team created successfully", data });
  } catch (err: any) {
    logger.error("Failed to create team", err);
    if (err.code === "23505") {
      return res.status(409).json({ error: "Team with this name already exists" });
    }
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/team/:id - Update Nation details
export const updateTeam = async (
  req: Request<{ id: string }, {}, UpdateTeamDto>, 
  res: Response
) => {
  const { id } = req.params;
  const { name, color } = req.body;

  try {
    const { data, error } = await supabase
      .from("team")
      .update({ name, color })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.json({ message: "Team updated successfully", data });
  } catch (err: any) {
    logger.error("Failed to update team", err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/team/:id - Delete a Nation
export const deleteTeam = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from("team")
      .delete()
      .eq("id", id);

    if (error) throw error;
    res.json({ message: "Team deleted successfully" });
  } catch (err: any) {
    logger.error("Failed to delete team", err);
    if (err.code === "23503") {
      return res.status(400).json({ error: "Cannot delete Team: It still has registered Players or Scores." });
    }
    res.status(500).json({ error: err.message });
  }
};