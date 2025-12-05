import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  scoreService,
  SectionTeamScoreResponse,
} from "../services/score.service";
import { Score, CreateScoreDto, UpdateScoreDto } from "../types/score";

export const SCORE_KEYS = {
  all: ["scores"] as const,
  aggregated: (includeMiniGames?: boolean) => 
    ["scores", "aggregated", includeMiniGames] as const,
  sectionTeam: (team: string, includeMiniGames?: boolean) => 
    ["scores", "sectionTeam", team, includeMiniGames] as const,
  categoryStandings: (category: string) =>
    ["scores", "categoryStandings", category] as const,
  byGame: (game: string, sortBy: string) =>
    ["scores", "game", game, sortBy] as const,
};

export const useScores = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: [...SCORE_KEYS.all, page, limit],
    queryFn: () => scoreService.getAllScores(page, limit),
    placeholderData: keepPreviousData,
  });
};

export const useScoresByGame = (
  game: string | null,
  sortBy: string = "points"
) => {
  return useQuery({
    queryKey: game ? SCORE_KEYS.byGame(game, sortBy) : ["scores", "none"],
    queryFn: () =>
      game
        ? scoreService.getScoresByGame(game, sortBy)
        : Promise.resolve({
            data: [],
            meta: { total: 0, page: 1, limit: 100, totalPages: 0 },
          }),
    enabled: !!game,
    placeholderData: keepPreviousData,
  });
};

export const useAggregatedScores = (includeMiniGames: boolean = false) => {
  return useQuery({
    queryKey: SCORE_KEYS.aggregated(includeMiniGames),
    queryFn: () => scoreService.getAggregatedScores(includeMiniGames),
  });
};

export const useSectionTeamScores = (
  sectionTeam: string,
  includeMiniGames: boolean = false
) => {
  return useQuery({
    queryKey: SCORE_KEYS.sectionTeam(sectionTeam, includeMiniGames),
    queryFn: () => scoreService.getScoresBySectionTeam(sectionTeam, includeMiniGames),
    enabled: !!sectionTeam, // Only fetch if team name is provided
  });
};

export const useCategoryStandings = (category: string) => {
  return useQuery({
    queryKey: SCORE_KEYS.categoryStandings(category),
    queryFn: () => scoreService.getCategoryStandings(category),
    enabled: !!category,
  });
};

export const useCreateScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateScoreDto) => scoreService.createScore(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scores"] });
    },
  });
};

export const useUpdateScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: UpdateScoreDto }) =>
      scoreService.updateScore(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scores"] });
    },
  });
};

export const useDeleteScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => scoreService.deleteScore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scores"] });
    },
  });
};
