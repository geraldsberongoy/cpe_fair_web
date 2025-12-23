"use client";

import { usePlayers } from "@/hooks/usePlayer";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import BorderDesign from "../BorderDesign";
import { pickBg, TeamScore, Player, ScoreDetails } from "./utils";

interface TeamScoreModalProps {
  teamName: string;
  scores: TeamScore[];
}

/**
 * Modal displaying a team's score breakdown across all games
 */
export const TeamScoreModal = ({ teamName, scores }: TeamScoreModalProps) => {
  const { data: playersData } = usePlayers(1, 100, teamName);
  const players: Player[] = playersData?.data || [];

  const getParticipants = (details: ScoreDetails | undefined): string => {
    if (
      details?.members &&
      Array.isArray(details.members) &&
      details.members.length > 0
    ) {
      const memberDetails = details.members.map((memberName: string) => {
        const player = players?.find(
          (p) =>
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
          {[...scores]
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

export default TeamScoreModal;
