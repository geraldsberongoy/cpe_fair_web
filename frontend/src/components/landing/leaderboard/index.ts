/**
 * Leaderboard Component Module
 * 
 * Refactored from a 953-line monolithic component into modular, 
 * maintainable pieces following React best practices.
 */

// Main component
export { default as Leaderboard } from "./Leaderboard";
export { default } from "./Leaderboard";

// Sub-components
export { TeamCard } from "./TeamCard";
export { TeamScoreModal } from "./TeamScoreModal";
export { GamePlayersModal } from "./GamePlayersModal";
export { NoScoreModal } from "./NoScoreModal";
export { GameCard } from "./GameCard";
export { LoadingSkeleton } from "./LoadingSkeleton";

// Constants and utilities
export { SECTION_TEAMS, BG_MAP, GAME_CATEGORIES, pickBg, RANK_STYLES, RANK_TEXT_COLORS } from "./constants";
export type { SectionTeam, GameCategoryType } from "./constants";
export { getParticipantsSimple } from "./utils";
export type { 
  ScoreDetails, 
  Player, 
  AggregatedTeam, 
  TeamScore 
} from "@/types/leaderboard";
