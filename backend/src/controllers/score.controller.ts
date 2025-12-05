import type { Request, Response } from "express";
import { supabase } from "../lib/supabaseClient.js";
import { logger } from "../utils/logger.js";
import type { Score, CreateScoreDto, UpdateScoreDto } from "../types/score.js";

// -------------------- GET ALL SCORES (Feed) --------------------
export const getScores = async (req: Request, res: Response) => {
  try {
    const { type, game, sortBy, category, page, limit } = req.query;

    const pageInt = page ? parseInt(page as string) : 1;
    const limitInt = limit ? parseInt(limit as string) : 10;
    const from = (pageInt - 1) * limitInt;
    const to = from + limitInt - 1;

    let query = supabase
      .from("score")
      .select(
        `
        id,
        points,
        game,
        category,
        details,
        created_at,
        team:team_id ( name ) 
      `,
        { count: "exact" }
      )
      .is("deleted_at", null)
      .range(from, to);

    if (type === "solo") {
      query = query.eq("details->>is_group", "false");
    } else if (type === "group") {
      query = query.eq("details->>is_group", "true");
    }

    if (category && typeof category === "string") {
      query = query.eq("category", category);
    }

    if (game && typeof game === "string") {
      query = query.eq("game", game);
    }

    // Apply sorting based on sortBy parameter
    if (sortBy === "category") {
      query = query
        .order("category", { ascending: true })
        .order("created_at", { ascending: false });
    } else if (sortBy === "points") {
      query = query
        .order("points", { ascending: false })
        .order("created_at", { ascending: false });
    } else {
      // Default to created_at
      query = query.order("created_at", { ascending: false });
    }

    const { data, error, count } = await query;

    if (error) {
      logger.error("Failed to fetch scores", error);
      return res.status(500).json({ error: error.message });
    }

    const formattedData = data.map((score: any) => ({
      id: score.id,
      teamId: score.team?.id,
      teamName: score.team?.name,
      game: score.game,
      category: score.category,
      points: score.points,
      contributor: score.details?.contributor_name || "Traveler",
      isGroup: score.details?.is_group || false,
      members: score.details?.members || [],
      createdAt: score.created_at,
    }));

    res.status(200).json({
      data: formattedData,
      meta: {
        total: count,
        page: pageInt,
        limit: limitInt,
        totalPages: count ? Math.ceil(count / limitInt) : 0,
      },
    });
  } catch (err: any) {
    logger.error("Unexpected error in getScores", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// -------------------- CREATE SCORE --------------------
export const createScore = async (
  req: Request<{}, {}, CreateScoreDto>, // 👈 Using the DTO here
  res: Response
) => {
  const { teamId, points, game, category, contributor, isGroup, members } =
    req.body;

  if (!teamId || !points || !game || !category) {
    return res
      .status(400)
      .json({
        error: "Missing required fields: teamId, points, game, category",
      });
  }

  try {
    const payload = {
      team_id: teamId,
      points,
      game,
      category,
      details: {
        contributor_name:
          contributor || (isGroup ? "Unnamed Party" : "Unknown"),
        is_group: isGroup || false,
        members: members || [],
      },
    };

    const { data, error: insertError } = await supabase
      .from("score")
      .insert([payload])
      .select()
      .single();

    if (insertError) {
      logger.error("Insert error", insertError);
      return res.status(500).json({ error: insertError.message });
    }

    return res.status(201).json({ message: "Score logged", data });
  } catch (err: any) {
    logger.error("Unexpected error in createScore", err);
    return res.status(500).json({ error: "Failed to create score" });
  }
};

// -------------------- UPDATE SCORE --------------------
export const updateScore = async (
  req: Request<{ id: string }, {}, UpdateScoreDto>, // 👈 Using the Update DTO
  res: Response
) => {
  const { id } = req.params;
  const { teamId, points, game, category, contributor, isGroup, members } =
    req.body;

  try {
    // Only update fields that are present in the request
    const updates: any = {};
    if (teamId) updates.team_id = teamId;
    if (points !== undefined) updates.points = points;
    if (game) updates.game = game;
    if (category) updates.category = category;

    // For JSONB, we usually need to merge or rewrite the whole object.
    // Simplicity approach: Rewrite 'details' if any detail field is provided
    if (contributor || isGroup !== undefined || members) {
      updates.details = {
        contributor_name: contributor,
        is_group: isGroup,
        members: members,
      };
    }

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
    return res
      .status(200)
      .json({ message: "Score updated successfully", data });
  } catch (err: any) {
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
  } catch (err: any) {
    logger.error("Unexpected error in deleteScore", err);
    return res.status(500).json({ error: "Failed to delete score" });
  }
};

// -------------------- GROUPED SCORES (Leaderboard) --------------------
export const getScoresByAllSectionTeam = async (
  req: Request,
  res: Response
) => {
  try {
    const { sort, order, game, category, includeMiniGames } = req.query;

    // 1. Build Query
    let query = supabase
      .from("score")
      .select(
        `
        id, points, game, category, details, created_at,
        team:team_id ( name )
      `
      )
      .is("deleted_at", null);

    // 2. Apply Filter
    if (game && typeof game === "string") {
      query = query.eq("game", game);
    }

    if (category && typeof category === "string") {
      query = query.eq("category", category);
    }

    // 3. Exclude Mini Games from overall calculations by default
    // Only include if explicitly requested via includeMiniGames=true
    if (includeMiniGames !== "true" && !category) {
      query = query.neq("category", "Mini Games");
    }

    const { data, error } = await query;

    if (error) {
      logger.error("Failed to fetch scores", error);
      return res.status(500).json({ error: error.message });
    }

    // 3. Group By Team
    let scoresData = data || [];

    const cleanScores = scoresData.map((s: any) => ({
      ...s,
      teamName: s.team?.name || "Unknown",
      contributor: s.details?.contributor_name,
    }));

    const sectionMap: Record<string, any[]> = {};
    cleanScores.forEach((score) => {
      const nation = score.teamName;
      if (!sectionMap[nation]) sectionMap[nation] = [];
      sectionMap[nation].push(score);
    });

    const result = Object.entries(sectionMap).map(([teamName, scores]) => {
      const totalPoints = scores.reduce((sum, s) => sum + (s.points ?? 0), 0);

      // Sort the internal list of scores if requested
      if (sort === "points") {
        scores.sort((a, b) =>
          order === "asc" ? a.points - b.points : b.points - a.points
        );
      }

      return {
        section_team: teamName,
        totalPoints,
        scores,
      };
    });

    // We now respect the 'order' parameter for the main list too.
    // Default to 'desc' (Highest points first) if not specified.
    if (order === "asc") {
      result.sort((a, b) => a.totalPoints - b.totalPoints);
    } else {
      result.sort((a, b) => b.totalPoints - a.totalPoints);
    }

    res.status(200).json(result);
  } catch (err: any) {
    logger.error("Failed to fetch grouped scores", err);
    res.status(500).json({ error: err.message });
  }
};

// -------------------- SPECIFIC NATION SCORES --------------------
export const getScoresBySectionTeam = async (req: Request, res: Response) => {
  const { section_team } = req.params;
  const { game, category, includeMiniGames } = req.query;

  try {
    let query = supabase
      .from("score")
      .select(
        `
        *,
        team:team_id!inner(name)
      `
      )
      .eq("team.name", section_team)
      .is("deleted_at", null);

    if (game) {
      query = query.eq("game", game);
    }

    if (category && typeof category === "string") {
      query = query.eq("category", category);
    }

    // Exclude Mini Games from overall calculations by default
    if (includeMiniGames !== "true" && !category) {
      query = query.neq("category", "Mini Games");
    }

    const { data, error } = await query;

    if (error) {
      logger.error("Failed to fetch scores", error);
      return res.status(500).json({ error: error.message });
    }

    const formattedScores = (data || []).map((s: any) => ({
      ...s,
      contributor: s.details?.contributor_name,
      isGroup: s.details?.is_group,
    }));

    const totalPoints = formattedScores.reduce(
      (sum, score) => sum + (score.points ?? 0),
      0
    );

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

// -------------------- CATEGORY STANDINGS (Grouped by Game) --------------------
export const getCategoryStandings = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    let query = supabase
      .from("score")
      .select(
        `
        id, points, game, category, details, created_at,
        team:team_id ( name )
      `
      )
      .is("deleted_at", null);

    if (category && typeof category === "string") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      logger.error("Failed to fetch category standings", error);
      return res.status(500).json({ error: error.message });
    }

    // Group by game
    const gamesMap: Record<string, any[]> = {};

    (data || []).forEach((score: any) => {
      const gameName = score.game;
      if (!gamesMap[gameName]) gamesMap[gameName] = [];

      gamesMap[gameName].push({
        id: score.id,
        teamName: score.team?.name || "Unknown",
        points: score.points,
        category: score.category,
        details: score.details,
      });
    });

    // Sort each game's scores by points (descending)
    Object.keys(gamesMap).forEach((game) => {
      gamesMap[game].sort((a, b) => b.points - a.points);
    });

    res.status(200).json(gamesMap);
  } catch (err: any) {
    logger.error("Unexpected error in getCategoryStandings", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
