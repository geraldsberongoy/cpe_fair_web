import { useState, useEffect, useMemo } from "react";
import {
  useCategoryStandings,
  useAggregatedScores,
  useScoresByGame,
} from "@/hooks/useScore";
import { usePlayers } from "@/hooks/usePlayer";
import { useGames } from "@/hooks/useGame";
import { useTeams } from "@/hooks/useTeams";
import { GameCategory } from "@/types/game";
import { ChevronLeft, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Podium from "./Podium";

import FontaineBG from "@/assets/images/backgrounds/fontaine.jpg";
import InazumaBG from "@/assets/images/backgrounds/inazuma.jpg";
import LiyueBG from "@/assets/images/backgrounds/liyue.jpg";
import MondstadtBG from "@/assets/images/backgrounds/mondstadt.jpg";
import NatlanBG from "@/assets/images/backgrounds/natlan.jpg";
import SumeruBG from "@/assets/images/backgrounds/sumeru.jpg";
import SnezhnayaBG from "@/assets/images/backgrounds/snezhnaya.jpg";
import BorderDesign from "./BorderDesign";
import StarryBackground from "../StarryBackground";

import { Score } from "@/types/score";

const BG_MAP: Record<string, string> = {
  fontaine: FontaineBG.src,
  inazuma: InazumaBG.src,
  liyue: LiyueBG.src,
  mondstadt: MondstadtBG.src,
  natlan: NatlanBG.src,
  sumeru: SumeruBG.src,
  snezhnaya: SnezhnayaBG.src,
};
const pickBg = (name?: string | null) => {
  if (!name) return undefined;
  const key = name.toLowerCase();
  for (const k of Object.keys(BG_MAP)) {
    if (key.includes(k)) return BG_MAP[k];
  }
  return undefined;
};

interface LeaderboardProps {
  selectedCategory: GameCategory | "Overall";
}

export const TeamScoreModal = ({
  teamName,
  scores,
}: {
  teamName: string;
  scores: any[];
}) => {
  const { data: playersData } = usePlayers(1, 100, teamName);
  const players = playersData?.data || [];

  const getParticipants = (details: any) => {
    if (
      details?.members &&
      Array.isArray(details.members) &&
      details.members.length > 0
    ) {
      // Try to match members with fetched players to get full details
      const memberDetails = details.members.map((memberName: string) => {
        const player = players?.find(
          (p: any) =>
            p.full_name === memberName || p.full_name.includes(memberName)
        );
        return player ? `${player.full_name} (${player.cys})` : memberName;
      });
      return memberDetails.join(", ");
    }
    return (
      details?.contributor_name || details?.contributor || "Unknown Contributor"
    );
  };

  const bg = pickBg(teamName);
  return (
    <DialogContent
      className="max-w-[90%] sm:max-w-md max-h-[80vh] bg-[#2a2640]/10 bg-linear-to-b from-[#2a2640]/30 to-[#1a1630]/70 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.30), rgba(0,0,0,0.30)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <BorderDesign />
      <DialogHeader>
        <DialogTitle className="px-2 text-2xl font-bold flex flex-col items-center text-transparent bg-clip-text bg-linear-to-b from-[#f0e6d2] via-[#d3bc8e] to-[#9d8f6f] drop-shadow-[0_0_30px_rgba(211,188,142,0.8)]">
          <span>{teamName}</span>
          <span className="text-white/50 text-base font-normal">
            Score Breakdown
          </span>
        </DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-[60vh] pr-4">
        <div className="flex flex-col gap-3 mt-4">
          {scores
            .sort((a, b) => b.points - a.points)
            .map((score) => (
              <div
                key={score.id}
                className="p-4 rounded-lg border border-white/10 flex justify-between items-center bg-linear-to-br from-[#FEF4BF]/30 to-transparent"
              >
                <div>
                  <p className="font-bold text-sm md:text-lg text-white">
                    {score.game}
                  </p>
                  <div className="flex flex-col gap-1 text-[10px] md:text-sm text-white/60">
                    <span className="bg-white/10 px-2 py-0.5 rounded text-[8px] md:text-xs w-fit">
                      {score.category}
                    </span>
                    <span className="text-white/80">
                      {getParticipants(score.details)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl text-white/10 text-transparent bg-clip-text bg-linear-to-b from-[#f0e6d2] via-[#d3bc8e] to-[#9d8f6f]">
                    {score.points}
                  </p>
                  <p className="text-[8px] md:text-xs text-white/40">Points</p>
                </div>
              </div>
            ))}
        </div>
      </ScrollArea>
    </DialogContent>
  );
};

const GamePlayersModal = ({
  teamName,
  gameName,
  details,
}: {
  teamName: string;
  gameName: string;
  details: any;
}) => {
  const { data: playersData } = usePlayers(1, 100, teamName);
  const players = playersData?.data || [];

  const participants = useMemo(() => {
    if (
      details?.members &&
      Array.isArray(details.members) &&
      details.members.length > 0
    ) {
      return details.members.map((memberName: string) => {
        const player = players?.find(
          (p: any) =>
            p.full_name === memberName || p.full_name.includes(memberName)
        );
        return {
          name: memberName,
          fullName: player ? player.full_name : memberName,
          cys: player ? player.cys : "N/A",
        };
      });
    }
    // Handle solo/contributor
    const name = details?.contributor_name || details?.contributor || "Unknown";
    const player = players?.find(
      (p: any) => p.full_name === name || p.full_name.includes(name)
    );
    return [
      {
        name: name,
        fullName: player ? player.full_name : name,
        cys: player ? player.cys : "",
      },
    ];
  }, [details, players]);

  const bg = pickBg(teamName);
  return (
    <DialogContent
      className="max-w-[90%] sm:max-w-md max-h-[80vh] bg-[#2a2640]/10 bg-linear-to-b from-[#2a2640]/30 to-[#1a1630]/70 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.30), rgba(0,0,0,0.30)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <BorderDesign />
      <DialogHeader>
        <DialogTitle className="px-2 text-2xl font-bold flex flex-col items-center text-transparent bg-clip-text bg-linear-to-b from-[#f0e6d2] via-[#d3bc8e] to-[#9d8f6f] drop-shadow-[0_0_30px_rgba(211,188,142,0.8)]">
          <span>{teamName}</span>
          <span className="text-white/60 text-base font-normal">
            {gameName} Roster
          </span>
        </DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh] pr-4 mt-4">
        <div className="flex flex-col gap-2">
          {participants.map(
            (p: { fullName: string; cys: string }, i: number) => (
              <div
                key={i}
                className="bg-linear-to-br from-[#FEF4BF]/30 to-transparent p-4 rounded-lg border border-white/10 flex justify-between items-center"
              >
                <span className="font-bold text-white">{p.fullName}</span>
                {p.cys && (
                  <span className="text-white/60 text-sm bg-white/10 px-2 py-1 rounded">
                    {p.cys}
                  </span>
                )}
              </div>
            )
          )}
        </div>
      </ScrollArea>
    </DialogContent>
  );
};

const Leaderboard = ({ selectedCategory }: LeaderboardProps) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Fetch teams for when there are no scores
  const { data: teams = [], isLoading: teamsLoading } = useTeams();

  // Fetch games for the selected category (for non-Overall view)
  const { data: gamesData = [], isLoading: gamesLoading } = useGames(
    undefined,
    undefined,
    selectedCategory === "Overall" ? undefined : selectedCategory
  );

  // Fetch scores by game when a game is selected
  const { data: gameScoresData, isLoading: scoresLoading } = useScoresByGame(
    selectedGame,
    "points"
  );
  const gameScores = gameScoresData?.data || [];

  const { data: categoryStandings, isLoading: isCategoryLoading } =
    useCategoryStandings(
      selectedCategory === "Overall" ? "" : selectedCategory
    );

  const { data: aggregatedScores, isLoading: isAggregatedLoading } =
    useAggregatedScores();

  // Reset selected game when category changes
  useEffect(() => {
    setSelectedGame(null);
  }, [selectedCategory]);

  // Simple helper for list view (no player fetching here to avoid spamming requests)
  const getParticipantsSimple = (details: any) => {
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

  if (selectedCategory === "Overall") {
    if (isAggregatedLoading || teamsLoading) {
      return (
        <div className="text-white text-center">
          Loading overall standings...
        </div>
      );
    }

    // Sort by totalPoints descending
    const sortedTeams = [...aggregatedScores || []].sort(
      (a, b) => b.totalPoints - a.totalPoints
    );

    
    const sectionTeams = [
      "Fontaine", "Snezhnaya", "Sumeru", "Mondstadt",
      "Liyue", "Inazuma", "Natlan"
    ]
// Start with existing team objects
const completeTeams = [...sortedTeams]; // assuming gameScores is in this shape
const topThree = [...completeTeams].slice(0, 3);
// Find missing teams
const missingTeams = sectionTeams.filter(
  (teamName) => !sortedTeams.some((t) => t.section_team === teamName)
);

// Append missing teams
missingTeams.forEach((teamName) => {
  completeTeams.push({
    section_team: teamName,
    totalPoints: 0,
    scores: [], // no individual scores yet
  });
});

    return (
      <div className="w-full px-[5vw] md:px-[10vw] flex flex-col gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white text-center">
          Overall Leaderboard
        </h2>
        <Podium topTeams={topThree} />
        {completeTeams.slice(3).map((team, index) => {
          const bg = pickBg(team.section_team);
          return (
            <Dialog key={team.section_team}>
              <DialogTrigger asChild>
                <button
                  style={{
                    backgroundImage: bg
                      ? `linear-gradient(rgba(0,0,0,0.10), rgba(0,0,0,0.10)), url(${bg})`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className={`w-full flex items-center justify-between p-6 rounded-xl border transition-scale duration-300 scale-[1.01] hover:scale-[1.02] group relative overflow-hidden ${
                    bg
                      ? "border-white/20"
                      : index === 0
                      ? "border-yellow-500/50 hover:bg-yellow-500/30"
                      : index === 1
                      ? "border-gray-400/50 hover:bg-gray-400/30"
                      : index === 2
                      ? "border-orange-700/50 hover:bg-orange-700/30"
                      : "border-white/20"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d3bc8e]/0 via-[#f0e6d2]/30 to-[#d3bc8e]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                  <StarryBackground starCount={10} />
                  <div className="flex items-center gap-3 md:gap-6">
                    <span
                      className={`text-lg md:text-3xl font-bold w-12 text-center text-white/60`}
                    >
                      #{index + 4}
                    </span>
                    <div className="text-left">
                      <h3 className="text-md md:text-2xl font-bold text-white">
                        {team.section_team}
                      </h3>
                      <p className="text-white/60 text-sm md:text-2xl">
                        {team.scores.length} Games Played
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg md:text-3xl font-bold text-white">
                      {team.totalPoints.toLocaleString()}
                    </p>
                    <p className="text-[10px] md:text-sm text-white/60 uppercase tracking-wider">
                      Total Points
                    </p>
                  </div>
                </button>
              </DialogTrigger>
              <TeamScoreModal
                teamName={team.section_team}
                scores={team.scores}
              />
            </Dialog>
          );
        })}
      </div>
    );
  }

  if (gamesLoading) {
    return <div className="text-white text-center">Loading games...</div>;
  }

  if (!gamesData || gamesData.length === 0) {
    return (
      <div className="text-white text-center">
        No games available for this category.
      </div>
    );
  }

  // View 1: List of Games
  if (!selectedGame) {
    return (
      <div className="w-full px-[3vh] md:px-[10vh] mb-6">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Select a Game
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gamesData.map((game: any) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game.name)}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 bg-linear-to-b from-[#2a2640]/60 to-[#1a1630]/70
                          transition-all duration-300 group text-left"
            >
              <StarryBackground starCount={10} />
              {/* BORDER DESIGNS */}
              <div
                className="absolute inset-0 border-4 border-[#A89265] group-hover:border-[#f2d9a7] transition-colors duration-300"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                }}
              ></div>
              <div className="absolute inset-2 border-2 border-[#f0e6d2]/40"></div>

              {/* Corner Ornaments - Top Left */}
              <div className="absolute top-0 left-0 w-12 h-12">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#FEF4BF] to-transparent"></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-[#FEF4BF] to-transparent"></div>
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#FEF4BF]/60"></div>
                <div
                  className={`absolute top-0 left-0 w-3 h-3 bg-linear-to-br group-hover:scale-125 transition-transform duration-300`}
                ></div>
              </div>

              {/* Corner Ornaments - Top Right */}
              <div className="absolute top-0 right-0 w-12 h-12">
                <div className="absolute top-0 right-0 w-full h-1 bg-linear-to-l from-[#FEF4BF] to-transparent"></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-linear-to-b from-[#FEF4BF] to-transparent"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#FEF4BF]/60"></div>
                <div
                  className={`absolute top-0 right-0 w-3 h-3 bg-linear-to-bl group-hover:scale-125 transition-transform duration-300`}
                ></div>
              </div>

              {/* Corner Ornaments - Bottom Left */}
              <div className="absolute bottom-0 left-0 w-12 h-12">
                <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-[#FEF4BF] to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-1 h-full bg-linear-to-t from-[#FEF4BF] to-transparent"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#FEF4BF]/60"></div>
                <div
                  className={`absolute bottom-0 left-0 w-3 h-3 bg-linear-to-tr group-hover:scale-125 transition-transform duration-300`}
                ></div>
              </div>

              {/* Corner Ornaments - Bottom Right */}
              <div className="absolute bottom-0 right-0 w-12 h-12">
                <div className="absolute bottom-0 right-0 w-full h-1 bg-linear-to-l from-[#FEF4BF] to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-1 h-full bg-linear-to-t from-[#FEF4BF] to-transparent"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#FEF4BF]/60"></div>
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 bg-linear-to-tl  group-hover:scale-125 transition-transform duration-300`}
                ></div>
              </div>

              {/* Side Decorations */}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-2 h-16 bg-linear-to-r from-[#FEF4BF]/20 to-transparent"></div>
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-2 h-16 bg-linear-to-l from-[#FEF4BF]/20 to-transparent"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-2 w-16 bg-linear-to-b from-[#FEF4BF]/20 to-transparent"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-2 w-16 bg-linear-to-t from-[#FEF4BF]/20 to-transparent"></div>

              {/* END BORDER DESIGNS */}

              {/* Game title */}
              <div className="flex items-center justify-center mb-6 w-full">
                <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#FEF4BF]/50 to-transparent max-w-16"></div>
                <h3
                  className={`text-2xl text-transparent bg-clip-text bg-linear-to-b from-[#f0e6d2] via-[#d3bc8e] to-[#9d8f6f] drop-shadow-[0_0_30px_rgba(211,188,142,0.8)] font-bold text-center mx-4 group-hover:scale-105 transition-transform duration-300`}
                  style={{
                    textShadow: "0 0 5px rgba(251, 191, 36, 0.6)",
                  }}
                >
                  {game.name}
                </h3>
                <div className="flex-1 h-px bg-linear-to-l from-transparent via-[#FEF4BF]/50 to-transparent max-w-16"></div>
              </div>

              {/* Action Buttons Section */}
              <div className="flex flex-col items-center justify-center space-y-4 my-6">
                {/* View Rankings - Primary Action */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#9d8f6f]/20 blur-xl group-hover:bg-amber-400/40 transition-all duration-300"></div>
                    <div className="relative w-16 h-16 border-2 border-[#9d8f6f] group-hover:border-[#d3bc8e] flex items-center justify-center transition-all duration-300 bg-linear-to-br from-[#2a2f4a] to-[#1a1f3a]">
                      <svg
                        className="w-8 h-8 text-[#d3bc8e] group-hover:text-[#f0e6d2] transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-transparent bg-clip-text bg-linear-to-b from-[#f0e6d2] via-[#d3bc8e] to-[#9d8f6f] transition-colors uppercase tracking-wider">
                    View Rankings
                  </p>
                </div>

                {/* Secondary Actions Row */}
                <div className="flex gap-3 items-center justify-center w-full px-4">
                  {/* View Bracketing Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Implement bracketing view
                      alert(`View bracketing for ${game.name}`);
                    }}
                    className="flex-1 flex flex-col items-center gap-2 px-3 py-2 border border-[#9d8f6f]/40 hover:border-[#d3bc8e]/60 rounded bg-[#1a1f3a]/50 hover:bg-[#2a2f4a]/70 transition-all duration-300 group/btn"
                  >
                    <svg
                      className="w-5 h-5 text-[#c8b896] group-hover/btn:text-[#d3bc8e] transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                    <span className="text-[10px] text-[#c8b896] group-hover/btn:text-[#d3bc8e] uppercase tracking-wide transition-colors">
                      Bracketing
                    </span>
                  </button>

                  {/* View Schedule Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Implement schedule view
                      alert(`View schedule for ${game.name}`);
                    }}
                    className="flex-1 flex flex-col items-center gap-2 px-3 py-2 border border-[#9d8f6f]/40 hover:border-[#d3bc8e]/60 rounded bg-[#1a1f3a]/50 hover:bg-[#2a2f4a]/70 transition-all duration-300 group/btn"
                  >
                    <svg
                      className="w-5 h-5 text-[#c8b896] group-hover/btn:text-[#d3bc8e] transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-[10px] text-[#c8b896] group-hover/btn:text-[#d3bc8e] uppercase tracking-wide transition-colors">
                      Schedule
                    </span>
                  </button>
                </div>
              </div>

              {/* Bottom ornamental dots */}
              <div className="flex gap-2 mt-4 justify-center">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 border border-[#d3bc8e]/60 group-hover:bg-[#d3bc8e]/40 transition-all duration-300`}
                    style={{
                      transform: "rotate(45deg)",
                      transitionDelay: `${i * 50}ms`,
                    }}
                  ></div>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // View 2: Specific Game Leaderboard
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
        <div className="text-white text-center">Loading rankings...</div>
      </div>
    );
  }

  const sectionTeams = [
      "Fontaine", "Snezhnaya", "Sumeru", "Mondstadt",
      "Liyue", "Inazuma", "Natlan"
    ]
// Start with existing scores
const completeScores = [...gameScores];

// Find missing teams
const missingTeams = sectionTeams.filter(
  (teamName) => !gameScores.some((s) => s.teamName === teamName)
);

// Append missing teams with points = 0
missingTeams.forEach((teamName) => {
  completeScores.push({
    id: Math.random(), // temporary unique id
    teamName,
    game: selectedGame || "",
    category: "",
    points: 0,
    contributor: "",
    isGroup: false,
    members: [],
    createdAt: new Date().toISOString(),
  } as Score);
});
  return (
    <div className="w-full mb-6 px-[5vw] md:px-[10vw] ">
      <button
        onClick={() => setSelectedGame(null)}
        className="flex items-center gap-2 text-white/80  hover:text-white mb-3 md:mb-6 transition-colors"
      >
        <ChevronLeft size={20} />
        <span>Back to Games</span>
      </button>

      <div className="bg-white/10 bg-linear-to-b from-[#2a2640]/30 to-[#1a1630]/70 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20">
        <h3 className="text-lg md:text-2xl font-bold text-white/10 mb-4 border-b border-white/20 pb-2 text-transparent bg-clip-text bg-linear-to-b from-[#f0e6d2] via-[#d3bc8e] to-[#9d8f6f] drop-shadow-[0_0_30px_rgba(211,188,142,0.8)]">
          {selectedGame}
        </h3>

        <div className="flex flex-col gap-3">
          {completeScores.map((score, index) => {
            const bg = pickBg(score.teamName);
            return (
              <Dialog key={score.id}>
                <DialogTrigger asChild>
                  <button
                    className={`w-full group relative overflow-hidden flex items-center justify-between p-4 rounded-lg border transition-all duration-300 hover:scale-[1.01] ${
                      index === 0
                        ? "bg-yellow-500/20 border-yellow-500/50 hover:bg-yellow-500/30"
                        : index === 1
                        ? "bg-gray-400/20 border-gray-400/50 hover:bg-gray-400/30"
                        : index === 2
                        ? "bg-orange-700/20 border-orange-700/50 hover:bg-orange-700/30"
                        : "bg-white/5 border-transparent hover:bg-white/10"
                    }`}
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.10), rgba(0,0,0,0.10)), url(${bg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#d3bc8e]/0 via-[#f0e6d2]/30 to-[#d3bc8e]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                    <div className="flex items-center gap-4">
                      <StarryBackground starCount={10} />
                      <span
                        className={`text-xl font-bold w-8 text-center ${
                          index === 0
                            ? "text-yellow-400"
                            : index === 1
                            ? "text-gray-300"
                            : index === 2
                            ? "text-orange-400"
                            : "text-white/60"
                        }`}
                      >
                        #{index + 1}
                      </span>
                      <div className="text-left">
                        <p className="font-bold text-sm md:text-lg text-white">
                          {score.teamName}
                        </p>
                        <p className="text-[10px] md:text-sm text-white/60 text-left line-clamp-1">
                          {score.contributor || "None"}
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

                <GamePlayersModal
                  teamName={score.teamName || "Unknown"}
                  gameName={selectedGame || ""}
                  details={score}
                />
              </Dialog>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
