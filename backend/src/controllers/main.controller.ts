import type { Request, Response } from "express";
import { supabase } from "../lib/supabaseClient.js";
import { logger } from "../utils/logger.js";

// Import your types here
import { Main, CreateMainDto, UpdateMainDto } from "../types/main.js";

// ---------------------------------------------------------
// 1. GET MAIN DATA
// ---------------------------------------------------------
export const getMain = async (req: Request, res: Response) => {
  try {
    // Use .returns<Main[]>() to tell TS that 'data' is an array of 'Main' objects
    const { data, error } = await supabase
      .from("main")
      .select("*")
      .returns<Main[]>();

    if (error) {
      logger.error("Failed to fetch main data", error);
      return res.status(500).json({ error: error.message });
    }

    // Now 'data' is strictly typed.
    // If you try data[0].wrong_field, TS will throw an error.
    res.status(200).json(data);
  } catch (err: any) {
    logger.error("Unexpected error in getMainData", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ---------------------------------------------------------
// 2. CREATE MAIN RECORD
// ---------------------------------------------------------
// We use Request<Params, ResBody, ReqBody> generic to type req.body
// Request<{}, {}, CreateMainDto> means:
// - No URL params
// - Response body is default
// - Request body MUST match CreateMainDto
export const createMain = async (
  req: Request<{}, {}, CreateMainDto>,
  res: Response
) => {
  const newMainData = req.body;

  // Validation happens automatically here.
  // If you try to use newMainData.randomField, TS will yell at you.

  try {
    const { error: insertError } = await supabase
      .from("main")
      .insert(newMainData);

    if (insertError) {
      logger.error("Supabase insert error", insertError);
      return res.status(500).json({ error: insertError.message });
    }
    return res.status(201).json({ message: "Successfully added the player" });
  } catch (error) {
    logger.error("Unexpected error in createMain", error);
    return res
      .status(500)
      .json({ error: "An error occurred while saving the player" });
  }
};

// ---------------------------------------------------------
// 3. UPDATE MAIN RECORD
// ---------------------------------------------------------
// We use Request<{ id: string }, {}, UpdateMainDto>
// - req.params.id is now a string
// - req.body is now UpdateMainDto
export const updateMain = async (
  req: Request<{ id: string }, {}, UpdateMainDto>,
  res: Response
) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const { error: updateError } = await supabase
      .from("main")
      .update(updateData)
      .eq("id", id);

    if (updateError) {
      logger.error("Supabase update error", updateError);
      return res.status(500).json({ error: updateError.message });
    }
    return res
      .status(200)
      .json({ message: "Successfully updated the player", success: true });
  } catch (error) {
    logger.error("Unexpected error in updateMain", error);
    return res
      .status(500)
      .json({
        error: "An error occurred while updating the player",
        success: false,
      });
  }
};

export const deleteMain = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { error: deleteError } = await supabase
      .from("main")
      .delete()
      .eq("id", id);

    if (deleteError) {
      logger.error("Supabase delete error", deleteError);
      return res.status(500).json({ error: deleteError.message });
    }
    return res
      .status(200)
      .json({ message: "Successfully deleted the player", success: true });
  } catch (error) {
    logger.error("Unexpected error in deleteMain", error);
    return res
      .status(500)
      .json({
        error: "An error occurred while deleting the player",
        success: false,
      });
  }
};
