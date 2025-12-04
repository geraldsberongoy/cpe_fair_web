import { useMutation } from "@tanstack/react-query";
import { exportService } from "@/services/export.service";
import * as XLSX from "xlsx";

export const useExportMasterScoreLedger = () => {
  return useMutation({
    mutationFn: () => exportService.getMasterScoreLedger(),
    onSuccess: (data) => {
      // Transform data for Excel
      const excelData = data.map((row) => ({
        "Score ID": row.score_id,
        Points: row.points,
        "Created At": row.created_at ? new Date(row.created_at).toLocaleString() : "",
        Game: row.game_name,
        Category: row.game_category,
        "Is Group": row.is_group ? "Yes" : "No",
        "Team ID": row.team_id,
        "Team Name": row.team_name,
        "Section Represented": row.section_represented,
        Contributor: row.contributor,
        Members: row.members && row.members !== "[]" ? row.members : "",
      }));

      // Create worksheet and workbook
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Score Ledger");

      // Download file
      const fileName = `Master_Score_Ledger_${new Date().toISOString().split("T")[0]}.xlsx`;
      XLSX.writeFile(workbook, fileName);
    },
  });
};
