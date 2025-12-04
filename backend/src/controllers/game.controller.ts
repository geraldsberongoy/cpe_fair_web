import type { Request, Response } from "express";
import { supabase } from "../lib/supabaseClient.js";
import { logger } from "../utils/logger.js";
import type { Game, CreateGameDto, UpdateGameDto } from "../types/game.js";

// GET /api/game - List all games (Public)
export const getGames = async (req: Request, res: Response) => {
  try {
    const { category, sortBy, order, isGroup } = req.query;

    let query = supabase
      .from("game")
      .select("*");

    if (category && typeof category === 'string') {
      query = query.eq("category", category);
    }

    if (isGroup !== undefined && isGroup !== null) {
      const isGroupBool = String(isGroup).toLowerCase() === 'true';
      query = query.eq("is_group", isGroupBool);
    }

    const isDesc = typeof order === 'string' && order.toLowerCase() === 'desc';

    if (sortBy === 'category') {
      query = query.order('category', { ascending: !isDesc })
                   .order('name', { ascending: true });
    } else {
      // Default to name
      query = query.order('name', { ascending: !isDesc });
    }

    const { data, error } = await query.returns<Game[]>();

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    logger.error("Failed to fetch games", err);
    res.status(500).json({ error: err.message });
  }
};

// GET /api/game/:id - Get single game
export const getGameById = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("game")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    res.json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/game - Create new game (Admin)
export const createGame = async (
  req: Request<{}, {}, CreateGameDto>, 
  res: Response
) => {
  const { name, is_group, category } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: "Game name and category are required" });
  }

  try {
    const { data, error } = await supabase
      .from("game")
      .insert([{ name, is_group: is_group || false, category }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ message: "Game created", data });
  } catch (err: any) {
    logger.error("Failed to create game", err);
    // Handle unique constraint error (duplicate name)
    if (err.code === "23505") {
      return res.status(409).json({ error: "Game with this name already exists" });
    }
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/game/:id - Update game (Admin)
export const updateGame = async (
  req: Request<{ id: string }, {}, UpdateGameDto>,
  res: Response
) => {
  const { id } = req.params;
  const { name, is_group, category } = req.body;

  try {
    const { data, error } = await supabase
      .from("game")
      .update({ name, is_group, category })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.json({ message: "Game updated", data });
  } catch (err: any) {
    logger.error("Failed to update game", err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/game/:id - Delete game (Admin)
export const deleteGame = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from("game")
      .delete()
      .eq("id", id);

    if (error) throw error;
    res.json({ message: "Game deleted successfully", data: { id } });
  } catch (err: any) {
    logger.error("Failed to delete game", err);
    // Handle FK constraint (if scores exist for this game)
    if (err.code === "23503") {
      return res.status(400).json({ error: "Cannot delete game: Scores have already been logged for it." });
    }
    res.status(500).json({ error: err.message });
  }
};