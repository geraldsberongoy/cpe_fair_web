import api from "./api";

export interface MasterScoreLedger {
  id: string;
  team_id: string;
  team_name: string;
  section_represented: string;
  points: number;
  game: string;
  category: string;
  contributor_name: string;
  is_group: boolean;
  members: string[];
  created_at: string;
}

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
