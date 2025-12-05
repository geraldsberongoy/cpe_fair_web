import api from "./api";
import { GameCategory } from "../types/game";
import { Score, CreateScoreDto, UpdateScoreDto } from "../types/score";

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

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const scoreService = {
  /**
   * Get all scores with pagination
   */
  getAllScores: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Score>> => {
    try {
      const response = await api.get("/score", { params: { page, limit } });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch scores:", error);
      return { data: [], meta: { total: 0, page, limit, totalPages: 0 } };
    }
  },

  /**
   * Get scores for a specific game with sorting
   */
  getScoresByGame: async (
    game: string,
    sortBy: string = "points",
    page: number = 1,
    limit: number = 100
  ): Promise<PaginatedResponse<Score>> => {
    try {
      const response = await api.get("/score", {
        params: { game, sortBy, page, limit },
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch scores for game ${game}:`, error);
      return { data: [], meta: { total: 0, page, limit, totalPages: 0 } };
    }
  },

  /**
   * Get aggregated scores by section team
   * @param includeMiniGames - Whether to include Mini Games category in overall scores (default: false)
   */
  getAggregatedScores: async (
    includeMiniGames: boolean = false
  ): Promise<SectionTeamScoreResponse[]> => {
    try {
      const response = await api.get("/score/section_team", {
        params: { includeMiniGames: includeMiniGames.toString() },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch aggregated scores:", error);
      return [];
    }
  },

  /**
   * Get scores for a specific section team
   * @param sectionTeam The section team identifier (e.g., "Fontaine")
   * @param includeMiniGames - Whether to include Mini Games category (default: false)
   */
  getScoresBySectionTeam: async (
    sectionTeam: string,
    includeMiniGames: boolean = false
  ): Promise<SectionTeamScoreResponse | null> => {
    try {
      const response = await api.get(`/score/section_team/${sectionTeam}`, {
        params: { includeMiniGames: includeMiniGames.toString() },
      });
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
  getCategoryStandings: async (
    category: string
  ): Promise<CategoryStandings | null> => {
    try {
      const response = await api.get(`/score/category-standings`, {
        params: { category },
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
  createScore: async (data: CreateScoreDto): Promise<Score | null> => {
    try {
      const response = await api.post("/score", data);
      return response.data;
    } catch (error) {
      console.error("Failed to create score:", error);
      throw error;
    }
  },

  /**
   * Update an existing score log
   */
  updateScore: async (
    id: string | number,
    data: UpdateScoreDto
  ): Promise<Score | null> => {
    try {
      const response = await api.put(`/score/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Failed to update score:", error);
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
      console.error("Failed to delete score:", error);
      throw error;
    }
  },
};
