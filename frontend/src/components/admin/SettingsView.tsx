"use client";

import { Download } from "lucide-react";
import { toast } from "react-toastify";
import { useExportMasterScoreLedger } from "@/hooks/useExport";

interface SettingsViewProps {
  teams: any[];
  logs: any[];
}

const SettingsView: React.FC<SettingsViewProps> = ({ teams, logs }) => {
  const exportMutation = useExportMasterScoreLedger();

  const handleExportToExcel = async () => {
    try {
      await exportMutation.mutateAsync();
      toast.success("Excel file downloaded successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export data. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-[#ece5d8] uppercase tracking-widest mb-2">
          Akasha System Config
        </h2>
        <p className="text-[#8a8d99]">Manage Irminsul data.</p>
      </div>
      
      <div className="bg-[#1e2130]/80 border border-[#d3bc8e]/20 rounded-xl p-8 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-[#ece5d8] mb-1">Data Export</h3>
            <p className="text-sm text-[#8a8d99]">
              Download the complete master score ledger as an Excel file
            </p>
          </div>
          <button
            onClick={handleExportToExcel}
            disabled={exportMutation.isPending}
            className="px-6 py-3 bg-[#d3bc8e] text-[#1e2130] rounded-lg font-bold hover:bg-[#e6cfa3] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center gap-2"
          >
            <Download size={18} />
            {exportMutation.isPending ? "Exporting..." : "Export to Excel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
