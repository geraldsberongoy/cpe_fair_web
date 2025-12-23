// Re-export pickBg from constants (memoized version)
export { pickBg } from "./constants";

// Re-export types from centralized location
export type {
  ScoreDetails,
  Player,
  AggregatedTeam,
  TeamScore,
} from "@/types/leaderboard";

// Import types for use in utility functions
import type { ScoreDetails } from "@/types/leaderboard";

/**
 * Get participants string from score details (simple version without player fetching)
 */
export const getParticipantsSimple = (details: ScoreDetails): string => {
  if (
    details?.members &&
    Array.isArray(details.members) &&
    details.members.length > 0
  ) {
    return details.members.join(", ");
  }
  return (
    details?.contributor_name || details?.contributor || "Unknown Contributor"
  );
};
