import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { gameService } from "../services/game.service";
import { Game, CreateGameDto } from "../types/game";

export const GAME_KEYS = {
  all: ["games"] as const,
  list: (sortBy?: string, order?: string, category?: string, isGroup?: boolean) => ["games", "list", sortBy, order, category, isGroup] as const,
};

export const useGames = (sortBy?: 'name' | 'category', order?: 'asc' | 'desc', category?: string, isGroup?: boolean) => {
  return useQuery({
    queryKey: GAME_KEYS.list(sortBy, order, category, isGroup),
    queryFn: () => gameService.getGames(sortBy, order, category, isGroup),
  });
};

export const useCreateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (game: CreateGameDto) => gameService.createGame(game),
    onSuccess: () => {
      // Invalidates ['games'] and everything under it (like ['games', 'list', ...])
      queryClient.invalidateQueries({ queryKey: GAME_KEYS.all });
    },
  });
};

export const useUpdateGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateGameDto }) => gameService.updateGame(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GAME_KEYS.all });
    },
  });
};

export const useDeleteGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => gameService.deleteGame(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GAME_KEYS.all });
    },
  });
};