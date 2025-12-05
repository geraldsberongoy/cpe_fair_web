import api from './api';

export interface Team {
  id: string;
  name: string;
  color: string;
  section_represented: string;
  created_at: string;
  points?: number; // Added for frontend aggregation
}

export const teamService = {
  getTeams: async (): Promise<Team[]> => {
    try {
      const response = await api.get('/team');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch teams:', error);
      return [];
    }
  },
  
  createTeam: async (data: Partial<Team>): Promise<Team | null> => {
      try {
          const response = await api.post('/team', data);
          return response.data;
      } catch (error) {
          console.error('Failed to create team:', error);
          return null;
      }
  }
};
