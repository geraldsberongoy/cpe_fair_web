import api from "./api";
import {
  Player,
  PlayersResponse,
  CreatePlayerDto,
  UpdatePlayerDto,
} from "@/types/player";

// Transform backend response to frontend format
const transformPlayer = (backendPlayer: any): Player => {
  return {
    id: backendPlayer.id,
    full_name: backendPlayer.full_name,
    cys: backendPlayer.cys,
    teamId: backendPlayer.team_id,
    teamName: backendPlayer.team?.name,
    sectionRepresented: backendPlayer.team?.section_represented,
    createdAt: backendPlayer.created_at,
  };
};

export const playerService = {
  getPlayers: async (
    page: number = 1,
    limit: number = 10,
    teamName?: string
  ): Promise<PlayersResponse> => {
    try {
      const params: any = { page, limit };
      if (teamName) params.team_name = teamName;
      const response = await api.get("/player", { params });

      return {
        data: response.data.data.map(transformPlayer),
        meta: response.data.meta,
      };
    } catch (error) {
      console.error("Failed to fetch players:", error);
      return { data: [], meta: { total: 0, page, limit, totalPages: 0 } };
    }
  },

  getPlayerById: async (id: string): Promise<Player | null> => {
    try {
      const response = await api.get(`/player/${id}`);
      const playerData = response.data?.data || response.data;
      return transformPlayer(playerData);
    } catch (error) {
      console.error("Failed to fetch player by ID:", error);
      return null;
    }
  },

  createPlayer: async (data: CreatePlayerDto): Promise<Player | null> => {
    try {
      const payload = {
        full_name: data.full_name,
        cys: data.cys,
        team_id: data.teamId,
      };
      const response = await api.post("/player", payload);
      return transformPlayer(response.data?.data || response.data);
    } catch (error) {
      console.error("Failed to create player:", error);
      throw error;
    }
  },

  updatePlayer: async (
    id: string,
    data: UpdatePlayerDto
  ): Promise<Player | null> => {
    try {
      const payload = {
        full_name: data.full_name,
        cys: data.cys,
        team_id: data.teamId,
      };
      const response = await api.put(`/player/${id}`, payload);
      return transformPlayer(response.data?.data || response.data);
    } catch (error) {
      console.error("Failed to update player:", error);
      throw error;
    }
  },

  deletePlayer: async (id: string): Promise<void> => {
    try {
      await api.delete(`/player/${id}`);
    } catch (error) {
      console.error("Failed to delete player:", error);
      throw error;
    }
  },
};
export type { Player };
