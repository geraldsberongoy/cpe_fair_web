import { Game, CreateGameDto } from '@/types/game';
import api from './api';

export const gameService = {
    getGames: async (sortBy?: 'name' | 'category', order?: 'asc' | 'desc', category?: string, isGroup?: boolean): Promise<Game[]> => {
        try {
            const params = new URLSearchParams();
            if (sortBy) params.append('sortBy', sortBy);
            if (order) params.append('order', order);
            if (category && category !== 'All') params.append('category', category);
            if (isGroup !== undefined) params.append('isGroup', String(isGroup));
            
            const response = await api.get(`/game?${params.toString()}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch games:', error);
            return [];
        }
    },
    getGamesById: async (id: string): Promise<Game | null> => {
        try {
            const response = await api.get(`/game/${id}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch game:', error);
            return null;
        }
    },
    createGame: async (game: CreateGameDto): Promise<Game | null> => {
        try {
            const response = await api.post('/game', game);
            return response.data;
        } catch (error) {
            console.error('Failed to create game:', error);
            return null;
        }
    },
    updateGame: async (id: string, game: Game): Promise<Game | null> => {
        try {
            const response = await api.put(`/game/${id}`, game);
            return response.data;
        } catch (error) {
            console.error('Failed to update game:', error);
            return null;
        }
    },
    deleteGame: async (id: string): Promise<boolean> => {
        try {
            await api.delete(`/game/${id}`);
            return true;
        } catch (error) {
            console.error('Failed to delete game:', error);
            return false;
        }
    },

}
