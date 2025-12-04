import api from './api';

export interface Player {
  id: string;
  full_name: string;
  cys: string;
  team_id: string;
  team?: {
    name: string;
    color?: string;
    section_represented?: string;
  };
}

export const playerService = {
  getPlayers: async (teamName?: string): Promise<Player[]> => {
    try {
      const params = teamName ? { team_name: teamName } : {};
      const response = await api.get('/player', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch players:', error);
      return [];
    }
  },

  createPlayer: async (data: Partial<Player>): Promise<Player | null> => {
    try {
      const response = await api.post('/player', data);
      return response.data;
    } catch (error) {
      console.error('Failed to create player:', error);
      throw error;
    }
  }
};
