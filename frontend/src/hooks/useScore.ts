import { useQuery } from "@tanstack/react-query";
import { scoreService, SectionTeamScoreResponse, Score } from "../services/score.service";

export const SCORE_KEYS = {
  all: ["scores"] as const,
  aggregated: ["scores", "aggregated"] as const,
  sectionTeam: (team: string) => ["scores", "sectionTeam", team] as const,
  categoryStandings: (category: string) => ["scores", "categoryStandings", category] as const,
};

export const useScores = () => {
  return useQuery({
    queryKey: SCORE_KEYS.all,
    queryFn: scoreService.getAllScores,
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
