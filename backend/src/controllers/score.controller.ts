import type { Request, Response } from "express";
import { supabase } from "../lib/supabaseClient.js";
import { logger } from "../utils/logger.js";
import { Score, CreateScoreDto, UpdateScoreDto } from "../types/score.js";

// -------------------- GET ALL SCORES --------------------
export const getScores = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;
    let query = supabase
      .from("score")
      .select("*, player:player_id(full_name), team:team_id(team_name)")
      .returns<Score[]>();

    if (type === "player") {
      query = (query as any).is("team_id", null); // Only individual player scores
    } else if (type === "team") {
      query = (query as any).is("player_id", null); // Only team scores
    }

    const { data, error } = await query;

    if (error) {
      logger.error("Failed to fetch scores", error);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (err: any) {
    logger.error("Unexpected error in getScores", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// -------------------- CREATE SCORE --------------------
export const createScore = async (
  req: Request<{}, {}, CreateScoreDto>,
  res: Response
) => {
  const newScore = req.body;

  if (!newScore.player_id && !newScore.team_id) {
    return res
      .status(400)
      .json({ error: "Either player_id or team_id is required" });
  }

  try {
    const { data, error: insertError } = await supabase
      .from("score")
      .insert(newScore)
      .select()
      .single();
    if (insertError) {
      logger.error("Insert error", insertError);
      return res.status(500).json({ error: insertError.message });
    }
    return res.status(201).json({ message: "Score added successfully", data });
  } catch (err) {
    logger.error("Unexpected error in createScore", err);
    return res.status(500).json({ error: "Failed to create score" });
  }
};

// -------------------- UPDATE SCORE --------------------
export const updateScore = async (
  req: Request<{ id: string }, {}, UpdateScoreDto>,
  res: Response
) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const { data, error: updateError } = await supabase
      .from("score")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      logger.error("Update error", updateError);
      return res.status(500).json({ error: updateError.message });
    }
    return res
      .status(200)
      .json({ message: "Score updated successfully", data });
  } catch (err) {
    logger.error("Unexpected error in updateScore", err);
    return res.status(500).json({ error: "Failed to update score" });
  }
};

// -------------------- DELETE SCORE --------------------
export const deleteScore = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { error: deleteError } = await supabase
      .from("score")
      .delete()
      .eq("id", id);

    if (deleteError) {
      logger.error("Delete error", deleteError);
      return res.status(500).json({ error: deleteError.message });
    }
    return res
      .status(200)
      .json({ message: "Score deleted successfully", data: { id } });
  } catch (err) {
    logger.error("Unexpected error in deleteScore", err);
    return res.status(500).json({ error: "Failed to delete score" });
  }
};

// GET scores by section team
export const getScoresBySectionTeam = async (req: Request, res: Response) => {
  const { section_team } = req.params;

  try {
    // Extend Score type to include joined player and team fields
    type ScoreWithJoins = Score & {
      player?: { full_name: string; section: string } | null;
      team?: { team_name: string; section: string } | null;
    };
    const { data, error } = await supabase
      .from("score")
      .select(
        `
        *,
        player:player_id(full_name, section),
        team:team_id(team_name, section)
      `
      )
      .returns<ScoreWithJoins[]>();

    if (error) {
      logger.error("Failed to fetch scores", error);
      return res.status(500).json({ error: error.message });
    }

    // Safely filter scores by section
    const filteredScores = (data || []).filter((score) => {
      const playerSection = score.player?.section;
      const teamSection = score.team?.section;
      return (
        (playerSection && playerSection === section_team) ||
        (teamSection && teamSection === section_team)
      );
    });

    // Calculate total points
    const totalPoints = filteredScores.reduce(
      (sum, score) => sum + (score.points ?? 0),
      0
    );

    res.status(200).json({
      section_team,
      totalPoints,
      scores: filteredScores,
    });
  } catch (err: any) {
    logger.error("Failed to fetch scores", err);
    res.status(500).json({ error: err.message });
  }
};
