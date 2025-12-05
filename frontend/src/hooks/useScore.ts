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
  aggregated: ["scores", "aggregated"] as const,
  sectionTeam: (team: string) => ["scores", "sectionTeam", team] as const,
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

export const useAggregatedScores = () => {
  return useQuery({
    queryKey: SCORE_KEYS.aggregated,
    queryFn: scoreService.getAggregatedScores,
  });
};

export const useSectionTeamScores = (sectionTeam: string) => {
  return useQuery({
    queryKey: SCORE_KEYS.sectionTeam(sectionTeam),
    queryFn: () => scoreService.getScoresBySectionTeam(sectionTeam),
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
      queryClient.invalidateQueries({ queryKey: SCORE_KEYS.all });
      queryClient.invalidateQueries({ queryKey: SCORE_KEYS.aggregated });
    },
  });
};

export const useUpdateScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: UpdateScoreDto }) =>
      scoreService.updateScore(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCORE_KEYS.all });
      queryClient.invalidateQueries({ queryKey: SCORE_KEYS.aggregated });
    },
  });
};

export const useDeleteScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => scoreService.deleteScore(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SCORE_KEYS.all });
      queryClient.invalidateQueries({ queryKey: SCORE_KEYS.aggregated });
    },
  });
};
