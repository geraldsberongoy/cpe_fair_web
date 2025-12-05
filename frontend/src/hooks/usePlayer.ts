import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { playerService } from "@/services/player.service";
import { Player, CreatePlayerDto, UpdatePlayerDto } from "@/types/player";

// Fetch all players with pagination
export const usePlayers = (
  page: number = 1,
  limit: number = 10,
  teamName?: string,
  search?: string
) => {
  return useQuery({
    queryKey: ["players", page, limit, teamName, search],
    queryFn: () => playerService.getPlayers(page, limit, teamName, search),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Fetch single player by ID
export const usePlayerById = (id: string) => {
  return useQuery({
    queryKey: ["player", id],
    queryFn: () => playerService.getPlayerById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Create player mutation
export const useCreatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePlayerDto) => playerService.createPlayer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });
};

// Update player mutation
export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePlayerDto }) =>
      playerService.updatePlayer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });
};

// Delete player mutation
export const useDeletePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => playerService.deletePlayer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });
};
