import FontaineBG from "@/assets/images/backgrounds/fontaine.jpg";
import InazumaBG from "@/assets/images/backgrounds/inazuma.jpg";
import LiyueBG from "@/assets/images/backgrounds/liyue.jpg";
import MondstadtBG from "@/assets/images/backgrounds/mondstadt.jpg";
import NatlanBG from "@/assets/images/backgrounds/natlan.jpg";
import SumeruBG from "@/assets/images/backgrounds/sumeru.jpg";
import SnezhnayaBG from "@/assets/images/backgrounds/snezhnaya.jpg";

/**
 * All section teams in the competition
 */
export const SECTION_TEAMS = [
  "Fontaine",
  "Snezhnaya",
  "Sumeru",
  "Mondstadt",
  "Liyue",
  "Inazuma",
  "Natlan",
] as const;

export type SectionTeam = (typeof SECTION_TEAMS)[number];

/**
 * Background images mapped to team names (singleton - only created once)
 */
export const BG_MAP: Record<string, string> = {
  fontaine: FontaineBG.src,
  inazuma: InazumaBG.src,
  liyue: LiyueBG.src,
  mondstadt: MondstadtBG.src,
  natlan: NatlanBG.src,
  sumeru: SumeruBG.src,
  snezhnaya: SnezhnayaBG.src,
};

/**
 * Memoization cache for pickBg lookups
 */
const bgCache = new Map<string, string | undefined>();

/**
 * Pick background image based on team name (memoized)
 * Results are cached so repeated lookups for the same team are instant
 */
export const pickBg = (name?: string | null): string | undefined => {
  if (!name) return undefined;
  
  // Check cache first
  const cacheKey = name.toLowerCase();
  if (bgCache.has(cacheKey)) {
    return bgCache.get(cacheKey);
  }
  
  // Find matching background
  let result: string | undefined = undefined;
  for (const k of Object.keys(BG_MAP)) {
    if (cacheKey.includes(k)) {
      result = BG_MAP[k];
      break;
    }
  }
  
  // Store in cache and return
  bgCache.set(cacheKey, result);
  return result;
};

/**
 * Game categories
 */
export const GAME_CATEGORIES = ["Overall", "Mini Games", "E-Sports", "Board Games"] as const;

export type GameCategoryType = (typeof GAME_CATEGORIES)[number];

/**
 * Rank styling classes for leaderboard positions
 */
export const RANK_STYLES = {
  gold: "bg-yellow-500/20 border-yellow-500/50 hover:bg-yellow-500/30",
  silver: "bg-gray-400/20 border-gray-400/50 hover:bg-gray-400/30",
  bronze: "bg-orange-700/20 border-orange-700/50 hover:bg-orange-700/30",
  default: "bg-white/5 border-transparent hover:bg-white/10",
} as const;

export const RANK_TEXT_COLORS = {
  gold: "text-yellow-400",
  silver: "text-gray-300", 
  bronze: "text-orange-400",
  default: "text-white/60",
} as const;
