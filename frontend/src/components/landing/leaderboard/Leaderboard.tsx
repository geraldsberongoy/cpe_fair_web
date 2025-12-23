"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  useAggregatedScores,
  useScoresByGame,
} from "@/hooks/useScore";
import { useTeams } from "@/hooks/useTeams";
import { useGames } from "@/hooks/useGame";
import { GameCategory } from "@/types/game";
import { ChevronLeft } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Score } from "@/types/score";

import Podium from "../Podium";
import StarryBackground from "../../StarryBackground";

import { SECTION_TEAMS, RANK_STYLES, RANK_TEXT_COLORS, pickBg } from "./constants";
import { AggregatedTeam, TeamScore } from "./utils";
import { TeamCard } from "./TeamCard";
import { TeamScoreModal } from "./TeamScoreModal";
import { GamePlayersModal } from "./GamePlayersModal";
import { NoScoreModal } from "./NoScoreModal";
import { GameCard } from "./GameCard";
import { LoadingSkeleton } from "./LoadingSkeleton";

interface LeaderboardProps {
  selectedCategory: GameCategory | "Overall";
}

/**
 * Main Leaderboard component - displays team rankings based on category
 */
const Leaderboard = ({ selectedCategory }: LeaderboardProps) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Data fetching hooks
  const { data: teams = [], isLoading: teamsLoading } = useTeams();
  const { data: gamesData = [], isLoading: gamesLoading } = useGames(
    undefined,
    undefined,
    selectedCategory === "Overall" ? undefined : selectedCategory
  );
  const { data: gameScoresData, isLoading: scoresLoading } = useScoresByGame(
    selectedGame,
    "points"
  );
  const gameScores = gameScoresData?.data || [];
  const { data: aggregatedScores, isLoading: isAggregatedLoading } =
    useAggregatedScores();

  // Reset selected game when category changes
  useEffect(() => {
    setSelectedGame(null);
  }, [selectedCategory]);

  // Calculate Minigame Podium Data
  const miniGamePodiumData = useMemo(() => {
    if (selectedCategory !== "Mini Games") return [];

    const sourceData: AggregatedTeam[] = aggregatedScores || [];
    const podiumData = sourceData.map((team) => ({
      section_team: team.section_team,
      totalPoints: team.minigamePoints || 0,
      scores: (team.minigameScores || []) as TeamScore[],
    }));

    // Ensure all teams are represented
    if (teams && teams.length > 0) {
      teams.forEach((t) => {
        if (!podiumData.find((p) => p.section_team === t.name)) {
          podiumData.push({
            section_team: t.name,
            totalPoints: 0,
            scores: [],
          });
        }
      });
    }

    return podiumData.sort((a, b) => b.totalPoints - a.totalPoints);
  }, [aggregatedScores, teams, selectedCategory]);

  // Memoized complete teams for Overall view
  const completeOverallTeams = useMemo(() => {
    if (selectedCategory !== "Overall" || !aggregatedScores) return [];
    
    const sortedTeams = [...(aggregatedScores as AggregatedTeam[])].sort(
      (a, b) => b.totalPoints - a.totalPoints
    );
    
    const completeTeams = [...sortedTeams];
    const missingTeams = SECTION_TEAMS.filter(
      (teamName) => !sortedTeams.some((t) => t.section_team === teamName)
    );
    
    missingTeams.forEach((teamName) => {
      completeTeams.push({
        section_team: teamName,
        totalPoints: 0,
        scores: [],
      });
    });
    
    return completeTeams;
  }, [aggregatedScores, selectedCategory]);

  // Memoized complete scores for Game Detail view
  const completeGameScores = useMemo(() => {
    if (!selectedGame) return [];
    
    const scores = [...gameScores];
    const missingTeams = SECTION_TEAMS.filter(
      (teamName) => !gameScores.some((s) => s.teamName === teamName)
    );
    
    missingTeams.forEach((teamName, idx) => {
      scores.push({
        id: -(idx + 1), // Use negative numbers for placeholders to avoid collision
        teamName,
        game: selectedGame,
        category: "",
        points: 0,
        contributor: "",
        isGroup: false,
        members: [],
        createdAt: new Date().toISOString(),
      } as Score);
    });
    
    return scores;
  }, [gameScores, selectedGame]);

  // Helper to get rank style
  const getRankStyle = useCallback((index: number, hasScore: boolean) => {
    if (!hasScore) return RANK_STYLES.default;
    if (index === 0) return RANK_STYLES.gold;
    if (index === 1) return RANK_STYLES.silver;
    if (index === 2) return RANK_STYLES.bronze;
    return RANK_STYLES.default;
  }, []);

  const getRankTextColor = useCallback((index: number, hasScore: boolean) => {
    if (!hasScore) return RANK_TEXT_COLORS.default;
    if (index === 0) return RANK_TEXT_COLORS.gold;
    if (index === 1) return RANK_TEXT_COLORS.silver;
    if (index === 2) return RANK_TEXT_COLORS.bronze;
    return RANK_TEXT_COLORS.default;
  }, []);

  // ============= OVERALL VIEW =============
  if (selectedCategory === "Overall") {
    if (isAggregatedLoading || teamsLoading) {
      return (
        <div className="w-full px-[5vw] md:px-[10vw] flex flex-col gap-4 mb-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Overall Leaderboard
          </h2>
          <LoadingSkeleton type="podium" />
          <LoadingSkeleton count={4} />
        </div>
      );
    }

    // No scores - show teams with 0 points
    if (!aggregatedScores || aggregatedScores.length === 0) {
      if (!teams || teams.length === 0) {
        return (
          <div className="text-white text-center">No teams available.</div>
        );
      }

      return (
        <div className="w-full px-[5vw] md:px-[10vw] flex flex-col gap-4 mb-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Overall Leaderboard
          </h2>
          <p className="text-white/60 text-center mb-4">
            No scores recorded yet. Teams will appear here once games are
            played.
          </p>
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              teamName={team.name}
              points={0}
              subtitle={team.section_represented}
            >
              <NoScoreModal teamName={team.name} />
            </TeamCard>
          ))}
        </div>
      );
    }

    const topThree = completeOverallTeams.slice(0, 3);

    return (
      <div className="w-full px-[5vw] md:px-[10vw] flex flex-col gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white text-center">
          Overall Leaderboard
        </h2>
        <Podium topTeams={topThree} />
        {completeOverallTeams.slice(3).map((team, index) => (
          <TeamCard
            key={team.section_team}
            teamName={team.section_team}
            rank={index + 4}
            points={team.totalPoints}
            subtitle={`${team.scores.length} Games Played`}
            pointsLabel="Total Points"
          >
            <TeamScoreModal
              teamName={team.section_team}
              scores={team.scores}
            />
          </TeamCard>
        ))}
      </div>
    );
  }

  // ============= CATEGORY VIEW (Game List) =============
  if (gamesLoading) {
    return (
      <div className="w-full px-[3vh] md:px-[10vh] mb-6">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Select a Game
        </h3>
        <LoadingSkeleton type="game" count={6} />
      </div>
    );
  }

  if (!gamesData || gamesData.length === 0) {
    return (
      <div className="text-white text-center">
        No games available for this category.
      </div>
    );
  }

  // Show game list when no game is selected
  if (!selectedGame) {
    return (
      <div className="w-full px-[3vh] md:px-[10vh] mb-6">
        {/* Mini Games Podium Section */}
        {selectedCategory === "Mini Games" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Mini Games Leaderboard
            </h2>
            {miniGamePodiumData.some((team) => team.totalPoints > 0) ? (
              <>
                <Podium topTeams={miniGamePodiumData} />
                <div className="flex flex-col gap-4 mt-6 w-full px-[3vh] md:px-[10vh]">
                  {miniGamePodiumData.slice(3).map((team, index) => (
                    <TeamCard
                      key={team.section_team}
                      teamName={team.section_team}
                      rank={index + 4}
                      points={team.totalPoints}
                      subtitle={`${team.scores.length} Games Played`}
                      pointsLabel="Total Points"
                    >
                      <TeamScoreModal
                        teamName={team.section_team}
                        scores={team.scores}
                      />
                    </TeamCard>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-white/60 text-center mb-4">
                  No Mini Games scores recorded yet. Teams will appear here once
                  games are played.
                </p>
                <div className="flex flex-col gap-4">
                  {miniGamePodiumData.map((team) => (
                    <TeamCard
                      key={team.section_team}
                      teamName={team.section_team}
                      points={0}
                      subtitle="0 Games Played"
                    >
                      <NoScoreModal
                        teamName={team.section_team}
                        message="This team hasn't participated in any Mini Games yet. Scores will appear here once they start competing."
                      />
                    </TeamCard>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Game Selection Grid */}
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Select a Game
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-[3vh] md:px-[10vh]">
          {gamesData.map((game: { id: string; name: string }) => (
            <GameCard
              key={game.id}
              gameName={game.name}
              onClick={() => setSelectedGame(game.name)}
            />
          ))}
        </div>
      </div>
    );
  }

  // ============= GAME DETAIL VIEW =============
  if (scoresLoading) {
    return (
      <div className="w-full mb-6 px-[5vw] md:px-[10vw]">
        <button
          onClick={() => setSelectedGame(null)}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-3 md:mb-6 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back to Games</span>
        </button>
        <div className="bg-white/10 bg-linear-to-b from-[#2a2640]/30 to-[#1a1630]/70 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20">
          <div className="h-8 w-48 bg-[#d3bc8e]/20 rounded mb-4 animate-pulse" />
          <LoadingSkeleton count={7} />
        </div>
      </div>
    );
  }

  // Use memoized complete scores

  return (
    <div className="w-full mb-6 px-[5vw] md:px-[10vw]">
      <button
        onClick={() => setSelectedGame(null)}
        className="flex items-center gap-2 text-white/80 hover:text-white mb-3 md:mb-6 transition-colors"
      >
        <ChevronLeft size={20} />
        <span>Back to Games</span>
      </button>

      <div className="bg-white/10 bg-linear-to-b from-[#2a2640]/30 to-[#1a1630]/70 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20">
        <h3 className="text-lg md:text-2xl font-bold text-white/10 mb-4 border-b border-white/20 pb-2 text-transparent bg-clip-text bg-linear-to-b from-[#f0e6d2] via-[#d3bc8e] to-[#9d8f6f] drop-shadow-[0_0_30px_rgba(211,188,142,0.8)]">
          {selectedGame}
        </h3>

        <div className="flex flex-col gap-3">
          {completeGameScores.map((score, index) => {
            const bg = pickBg(score.teamName);
            const hasScore = score.points > 0;

            return (
              <Dialog key={score.id}>
                <DialogTrigger asChild>
                  <button
                    className={`w-full group relative overflow-hidden flex items-center justify-between p-4 rounded-lg border transition-all duration-300 hover:scale-[1.01] ${getRankStyle(index, hasScore)}`}
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.10), rgba(0,0,0,0.10)), url(${bg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#d3bc8e]/0 via-[#f0e6d2]/30 to-[#d3bc8e]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                    <div className="flex items-center gap-4">
                      <StarryBackground starCount={5} />
                      {hasScore && (
                        <span
                          className={`text-xl font-bold w-8 text-center ${getRankTextColor(index, hasScore)}`}
                        >
                          #{index + 1}
                        </span>
                      )}
                      <div className="text-left">
                        <p className="font-bold text-sm md:text-lg text-white">
                          {score.teamName}
                        </p>
                        <p className="text-[10px] md:text-sm text-white/60 text-left line-clamp-1">
                          {hasScore
                            ? score.contributor || "None"
                            : "No score yet"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg md:text-xl font-bold text-white">
                        {score.points}
                      </p>
                      <p className="text-[10px] md:text-xs text-white/60 uppercase">
                        Points
                      </p>
                    </div>
                  </button>
                </DialogTrigger>

                {hasScore ? (
                  <GamePlayersModal
                    teamName={score.teamName || "Unknown"}
                    gameName={selectedGame || ""}
                    details={score}
                  />
                ) : (
                  <NoScoreModal
                    teamName={score.teamName || "Unknown"}
                    message={`This team hasn't participated in ${selectedGame} yet. Check back later for results.`}
                  />
                )}
              </Dialog>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
