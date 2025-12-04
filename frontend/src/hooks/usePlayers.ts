import { useQuery } from "@tanstack/react-query";
import { playerService } from "../services/player.service";

export const PLAYER_KEYS = {
  all: ["players"] as const,
  byTeam: (teamName: string) => ["players", "team", teamName] as const,
};

export const usePlayers = (teamName?: string, select?: (data: any[]) => any[]) => {
  return useQuery({
    queryKey: teamName ? PLAYER_KEYS.byTeam(teamName) : PLAYER_KEYS.all,
    queryFn: () => playerService.getPlayers(teamName),
    enabled: true,
    select: select,
  });
};
