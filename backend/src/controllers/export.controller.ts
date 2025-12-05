import type { Request, Response } from "express";
import { supabase } from "../lib/supabaseClient.js"; 
import { logger } from "../utils/logger.js";

// -------------------- GET MASTER SCORE LEDGER (JSON) --------------------
export const getMasterScoreLedger = async (req: Request, res: Response) => {
  try {
    // Fetch data from master_score_ledger view
    const { data, error } = await supabase
      .from("master_score_ledger")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      logger.error("Failed to fetch master score ledger", error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err: any) {
    logger.error("Failed to fetch master score ledger", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// -------------------- EXPORT MASTER SCORE LEDGER TO EXCEL --------------------
export const exportMasterScoreLedger = async (req: Request, res: Response) => {
  try {
    const ExcelJS = (await import("exceljs")).default;
    
    // Fetch data from master_score_ledger view
    const { data, error } = await supabase
      .from("master_score_ledger")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      logger.error("Failed to fetch master score ledger", error);
      return res.status(500).json({ error: error.message });
    }

    // Create workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Score Ledger");

    // Define columns
    worksheet.columns = [
      { header: "ID", key: "id", width: 40 },
      { header: "Team ID", key: "team_id", width: 40 },
      { header: "Team Name", key: "team_name", width: 20 },
      { header: "Section Represented", key: "section_represented", width: 20 },
      { header: "Points", key: "points", width: 10 },
      { header: "Game", key: "game", width: 25 },
      { header: "Category", key: "category", width: 15 },
      { header: "Contributor", key: "contributor_name", width: 25 },
      { header: "Is Group", key: "is_group", width: 10 },
      { header: "Members", key: "members", width: 40 },
      { header: "Created At", key: "created_at", width: 20 },
    ];

    // Style header row
    worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1e2130" },
    };
    worksheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };

    // Add data rows
    data?.forEach((row: any) => {
      worksheet.addRow({
        id: row.id,
        team_id: row.team_id,
        team_name: row.team_name,
        section_represented: row.section_represented,
        points: row.points,
        game: row.game,
        category: row.category,
        contributor_name: row.contributor_name,
        is_group: row.is_group ? "Yes" : "No",
        members: Array.isArray(row.members) ? row.members.join(", ") : "",
        created_at: row.created_at ? new Date(row.created_at).toLocaleString() : "",
      });
    });

    // Add borders to all cells
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // Set response headers for file download
    const fileName = `Master_Score_Ledger_${new Date().toISOString().split("T")[0]}.xlsx`;
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    // Write to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (err: any) {
    logger.error("Failed to export master score ledger", err);
    res.status(500).json({ error: "Failed to export data" });
  }
};
