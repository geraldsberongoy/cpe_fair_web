import { useQuery } from "@tanstack/react-query";
import { teamService } from "../services/team.service";

export const TEAM_KEYS = {
  all: ["teams"] as const,
};

export const useTeams = () => {
  return useQuery({
    queryKey: TEAM_KEYS.all,
    queryFn: teamService.getTeams,
  });
};
