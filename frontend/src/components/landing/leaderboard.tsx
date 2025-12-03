import { useState, useEffect, useMemo } from "react";
import { useCategoryStandings, useAggregatedScores } from "@/hooks/useScore";
import { usePlayers } from "@/hooks/usePlayers";
import { GameCategory } from "@/types/game";
import { ChevronLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LeaderboardProps {
  selectedCategory: GameCategory | "Overall";
}

const TeamScoreModal = ({
  teamName,
  scores,
}: {
  teamName: string;
  scores: any[];
}) => {
  const { data: players } = usePlayers(teamName);

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

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] bg-[#0a0a2e] border-white/20 text-white">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
          <span>{teamName}</span>
          <span className="text-white/60 text-base font-normal">
            - Score Breakdown
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
                className="bg-white/5 p-4 rounded-lg border border-white/10 flex justify-between items-center"
              >
                <div>
                  <p className="font-bold text-lg text-white">{score.game}</p>
                  <div className="flex flex-col gap-1 text-sm text-white/60">
                    <span className="bg-white/10 px-2 py-0.5 rounded text-xs w-fit">
                      {score.category}
                    </span>
                    <span className="text-white/80">
                      {getParticipants(score.details)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl text-yellow-400">
                    {score.points}
                  </p>
                  <p className="text-xs text-white/40">Points</p>
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
  const { data: players } = usePlayers(teamName);

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

  return (
    <DialogContent className="max-w-md max-h-[80vh] bg-[#0a0a2e] border-white/20 text-white">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-white flex flex-col gap-1">
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
                className="bg-white/5 p-4 rounded-lg border border-white/10 flex justify-between items-center"
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
    if (isAggregatedLoading) {
      return (
        <div className="text-white text-center">
          Loading overall standings...
        </div>
      );
    }

    if (!aggregatedScores || aggregatedScores.length === 0) {
      return (
        <div className="text-white text-center">
          No overall standings available.
        </div>
      );
    }

    // Sort by totalPoints descending
    const sortedTeams = [...aggregatedScores].sort(
      (a, b) => b.totalPoints - a.totalPoints
    );

    return (
      <div className="w-full px-4 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          Overall Leaderboard
        </h2>
        {sortedTeams.map((team, index) => (
          <Dialog key={team.section_team}>
            <DialogTrigger asChild>
              <button
                className={`w-full flex items-center justify-between p-6 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                  index === 0
                    ? "bg-yellow-500/20 border-yellow-500/50 hover:bg-yellow-500/30"
                    : index === 1
                    ? "bg-gray-400/20 border-gray-400/50 hover:bg-gray-400/30"
                    : index === 2
                    ? "bg-orange-700/20 border-orange-700/50 hover:bg-orange-700/30"
                    : "bg-white/10 border-white/20 hover:bg-white/20"
                }`}
              >
                <div className="flex items-center gap-6">
                  <span
                    className={`text-3xl font-bold w-12 text-center ${
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
                    <h3 className="text-2xl font-bold text-white">
                      {team.section_team}
                    </h3>
                    <p className="text-white/60">
                      {team.scores.length} Games Played
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-white">
                    {team.totalPoints.toLocaleString()}
                  </p>
                  <p className="text-sm text-white/60 uppercase tracking-wider">
                    Total Points
                  </p>
                </div>
              </button>
            </DialogTrigger>
            <TeamScoreModal teamName={team.section_team} scores={team.scores} />
          </Dialog>
        ))}
      </div>
    );
  }

  if (isCategoryLoading) {
    return <div className="text-white text-center">Loading standings...</div>;
  }

  if (!categoryStandings || Object.keys(categoryStandings).length === 0) {
    return (
      <div className="text-white text-center">
        No standings available for this category.
      </div>
    );
  }

  // View 1: List of Games
  if (!selectedGame) {
    return (
      <div className="w-full px-4">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Select a Game
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(categoryStandings).map((gameName) => (
            <button
              key={gameName}
              onClick={() => setSelectedGame(gameName)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/20 transition-all duration-300 group text-left"
            >
              <h4 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                {gameName}
              </h4>
              <p className="text-white/60 text-sm mt-2">
                {categoryStandings[gameName].length} Teams
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // View 2: Specific Game Leaderboard
  const teams = categoryStandings[selectedGame] || [];

  return (
    <div className="w-full px-4">
      <button
        onClick={() => setSelectedGame(null)}
        className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
      >
        <ChevronLeft size={20} />
        <span>Back to Games</span>
      </button>

      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h3 className="text-2xl font-bold text-white mb-4 border-b border-white/20 pb-2">
          {selectedGame}
        </h3>

        <div className="flex flex-col gap-3">
          {teams.map((team, index) => {
            return (
              <Dialog key={team.id}>
                <DialogTrigger asChild>
                  <button
                    className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-300 hover:scale-[1.01] ${
                      index === 0
                        ? "bg-yellow-500/20 border-yellow-500/50 hover:bg-yellow-500/30"
                        : index === 1
                        ? "bg-gray-400/20 border-gray-400/50 hover:bg-gray-400/30"
                        : index === 2
                        ? "bg-orange-700/20 border-orange-700/50 hover:bg-orange-700/30"
                        : "bg-white/5 border-transparent hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-4">
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
                        <p className="font-bold text-lg text-white">
                          {team.teamName}
                        </p>
                        <p className="text-sm text-white/60 text-left line-clamp-1">
                          {getParticipantsSimple(team.details)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-white">
                        {team.points}
                      </p>
                      <p className="text-xs text-white/60 uppercase">Points</p>
                    </div>
                  </button>
                </DialogTrigger>

                <GamePlayersModal
                  teamName={team.teamName}
                  gameName={selectedGame}
                  details={team.details}
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
