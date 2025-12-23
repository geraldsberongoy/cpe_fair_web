/**
 * Leaderboard-related types
 */

/**
 * Score details interface for type safety
 */
export interface ScoreDetails {
  members?: string[];
  contributor_name?: string;
  contributor?: string;
}

/**
 * Player interface
 */
export interface Player {
  id: string;
  full_name: string;
  cys: string;
}

/**
 * Team score entry - simplified score for aggregated views
 */
export interface TeamScore {
  id: number | string;
  game: string;
  category: string;
  points: number;
  details?: ScoreDetails;
}

/**
 * Aggregated team data
 */
export interface AggregatedTeam {
  section_team: string;
  totalPoints: number;
  minigamePoints?: number;
  scores: TeamScore[];
  minigameScores?: TeamScore[];
}
