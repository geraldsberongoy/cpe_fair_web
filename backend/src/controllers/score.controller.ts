import type { Request, Response } from "express";
import { supabase } from "../lib/supabaseClient.js";
import { logger } from "../utils/logger.js";
import type { Score, CreateScoreDto, UpdateScoreDto } from "../types/score.js";

// -------------------- GET ALL SCORES --------------------
export const getScores = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;

    // We type the response from Supabase manually to ensure safety
    let query = supabase
      .from("score")
      .select(`
        id,
        points,
        game,
        details,
        created_at,
        team:team_id ( name, color, element )
      `)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (type === "solo") {
      query = query.eq("details->>is_group", "false");
    } else if (type === "group") {
      query = query.eq("details->>is_group", "true");
    }

    const { data, error } = await query;

    if (error) {
      logger.error("Failed to fetch scores", error);
      return res.status(500).json({ error: error.message });
    }

    // Transform using the Score type logic
    const formattedData = data.map((score: any) => ({
      id: score.id,
      teamId: score.team?.id,
      teamName: score.team?.name, // Joined field
      teamColor: score.team?.color, // Joined field
      game: score.game,
      points: score.points,
      // Safely access the JSONB fields matching our new Interface
      contributor: score.details?.contributor_name || "Traveler",
      isGroup: score.details?.is_group || false,
      members: score.details?.members || [],
      createdAt: score.created_at
    }));

    res.status(200).json(formattedData);
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
  const { teamId, points, game, contributor, isGroup, members } = req.body;

  if (!teamId || !points || !game) {
    return res.status(400).json({ error: "teamId, points, and game are required" });
  }

  try {
    // Construct the DB Payload matches 'Score' interface structure (minus id/created_at)
    const payload = {
      team_id: teamId,
      points,
      game,
      details: {
        contributor_name: contributor || (isGroup ? "Unnamed Party" : "Unknown"),
        is_group: isGroup || false,
        members: members || []
      }
    };

    const { data, error: insertError } = await supabase
      .from("score")
      .insert(payload)
      .select()
      .single();

    if (insertError) {
      logger.error("Insert error", insertError);
      return res.status(500).json({ error: insertError.message });
    }

    return res.status(201).json({ message: "Score logged", data });
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
  const { teamId, points, game, contributor, isGroup, members } = req.body;

  try {
    const updates = {
      team_id: teamId,
      points,
      game,
      details: {
        contributor_name: contributor,
        is_group: isGroup,
        members: members
      }
    };

    const { data, error: updateError } = await supabase
      .from("score")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      logger.error("Update error", updateError);
      return res.status(500).json({ error: updateError.message });
    }
    return res.status(200).json({ message: "Score updated successfully", data });
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
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (deleteError) {
      logger.error("Delete error", deleteError);
      return res.status(500).json({ error: deleteError.message });
    }
    return res.status(200).json({ message: "Score revoked", data: { id } });
  } catch (err) {
    logger.error("Unexpected error in deleteScore", err);
    return res.status(500).json({ error: "Failed to delete score" });
  }
};

// -------------------- GROUPED SCORES (Leaderboard) --------------------
export const getScoresByAllSectionTeam = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("score")
      .select(`
        id, points, game, details, created_at,
        team:team_id ( name, color, element )
      `)
      .is("deleted_at", null);

    if (error) {
      logger.error("Failed to fetch scores", error);
      return res.status(500).json({ error: error.message });
    }

    const { sort, order } = req.query;
    let scoresData = data || [];

    const cleanScores = scoresData.map((s: any) => ({
      ...s,
      teamName: s.team?.name || "Unknown",
      contributor: s.details?.contributor_name
    }));

    const sectionMap: Record<string, any[]> = {};
    cleanScores.forEach((score) => {
      const nation = score.teamName;
      if (!sectionMap[nation]) sectionMap[nation] = [];
      sectionMap[nation].push(score);
    });

    const result = Object.entries(sectionMap).map(([teamName, scores]) => {
      const totalPoints = scores.reduce((sum, s) => sum + (s.points ?? 0), 0);
      
      if (sort === "points") {
        scores.sort((a, b) => (order === "asc" ? a.points - b.points : b.points - a.points));
      }

      return {
        section_team: teamName, 
        totalPoints,
        scores
      };
    });

    result.sort((a, b) => b.totalPoints - a.totalPoints);

    res.status(200).json(result);
  } catch (err: any) {
    logger.error("Failed to fetch grouped scores", err);
    res.status(500).json({ error: err.message });
  }
};

// -------------------- SPECIFIC NATION SCORES --------------------
export const getScoresBySectionTeam = async (req: Request, res: Response) => {
  const { section_team } = req.params;

  try {
    const { data, error } = await supabase
      .from("score")
      .select(`
        *,
        team:team_id!inner(name, color)
      `)
      .eq("team.name", section_team)
      .is("deleted_at", null);

    if (error) {
      logger.error("Failed to fetch scores", error);
      return res.status(500).json({ error: error.message });
    }

    const formattedScores = (data || []).map((s: any) => ({
      ...s,
      contributor: s.details?.contributor_name,
      isGroup: s.details?.is_group
    }));

    const totalPoints = formattedScores.reduce((sum, score) => sum + (score.points ?? 0), 0);

    res.status(200).json({
      section_team,
      totalPoints,
      scores: formattedScores,
    });
  } catch (err: any) {
    logger.error("Failed to fetch scores", err);
    res.status(500).json({ error: err.message });
  }
};