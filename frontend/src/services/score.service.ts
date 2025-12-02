import api from './api';

export interface Score {
  id: number;
  team_id: string;
  game: string;
  points: number;
  details: any;
  created_at: string;
}

export interface SectionTeamScoreResponse {
  section_team: string;
  totalPoints: number;
  scores: Score[];
}

export const scoreService = {
  /**
   * Get all scores
   */
  getAllScores: async (): Promise<Score[]> => {
    try {
      const response = await api.get('/score');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch scores:', error);
      return [];
    }
  },

  /**
   * Get aggregated scores by section team
   */
  getAggregatedScores: async () => {
    try {
      const response = await api.get('/score/section_team');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch aggregated scores:', error);
      return [];
    }
  },

  /**
   * Get scores for a specific section team
   * @param sectionTeam The section team identifier (e.g., "Fontaine")
   */
  getScoresBySectionTeam: async (sectionTeam: string): Promise<SectionTeamScoreResponse | null> => {
    try {
      const response = await api.get(`/score/section_team/${sectionTeam}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch scores for ${sectionTeam}:`, error);
      return null;
    }
  }
};
