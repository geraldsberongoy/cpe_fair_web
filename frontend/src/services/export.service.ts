import api from "./api";
import { MasterScoreLedger } from "@/types/master_ledger_score";

export const exportService = {
  getMasterScoreLedger: async (): Promise<MasterScoreLedger[]> => {
    try {
      const response = await api.get("/score/ledger");
      return response.data || [];
    } catch (error) {
      console.error("Failed to fetch master score ledger:", error);
      throw error;
    }
  },
};
