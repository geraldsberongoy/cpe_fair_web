import api from './api';
import { GameCategory } from "../types/game";

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

export interface CategoryStandings {
  [gameName: string]: {
    id: number;
    teamName: string;
    points: number;
    category: GameCategory;
    details: any;
  }[];
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
  getAggregatedScores: async (): Promise<SectionTeamScoreResponse[]> => {
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
  },

  /**
   * Get category standings
   * @param category The category to filter by (e.g., "Sports")
   */
  getCategoryStandings: async (category: string): Promise<CategoryStandings | null> => {
    try {
      const response = await api.get(`/score/category-standings`, {
        params: { category }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch standings for ${category}:`, error);
      return null;
    }
  },

  /**
   * Create a new score log
   */
  createScore: async (data: any): Promise<Score | null> => {
    try {
      const response = await api.post('/score', data);
      return response.data;
    } catch (error) {
      console.error('Failed to create score:', error);
      throw error;
    }
  },

  /**
   * Update an existing score log
   */
  updateScore: async (id: string | number, data: any): Promise<Score | null> => {
    try {
      const response = await api.put(`/score/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update score:', error);
      throw error;
    }
  },

  /**
   * Delete a score log
   */
  deleteScore: async (id: string | number): Promise<void> => {
    try {
      await api.delete(`/score/${id}`);
    } catch (error) {
      console.error('Failed to delete score:', error);
      throw error;
    }
  }
};

