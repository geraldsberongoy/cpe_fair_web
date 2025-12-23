"use client";

import { useMemo } from "react";
import { usePlayers } from "@/hooks/usePlayer";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import BorderDesign from "../BorderDesign";
import { pickBg, Player, ScoreDetails } from "./utils";

interface GamePlayersModalProps {
  teamName: string;
  gameName: string;
  details: ScoreDetails | undefined;
}

interface Participant {
  name: string;
  fullName: string;
  cys?: string;
}

/**
 * Modal displaying players who participated in a specific game for a team
 */
export const GamePlayersModal = ({
  teamName,
  gameName,
  details,
}: GamePlayersModalProps) => {
  const { data: playersData } = usePlayers(1, 100, teamName);
  const players: Player[] = playersData?.data || [];

  const participants = useMemo<Participant[]>(() => {
    if (
      details?.members &&
      Array.isArray(details.members) &&
      details.members.length > 0
    ) {
      return details.members.map((memberName: string) => {
        const player = players?.find(
          (p) =>
            p.full_name === memberName || p.full_name.includes(memberName)
        );
        return {
          name: memberName,
          fullName: player ? player.full_name : memberName,
          cys: player?.cys,
        };
      });
    }
    // Handle solo/contributor
    const name = details?.contributor_name || details?.contributor || "Unknown";
    const player = players?.find(
      (p) => p.full_name === name || p.full_name.includes(name)
    );
    return [
      {
        name: name,
        fullName: player ? player.full_name : name,
        cys: player?.cys || "",
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
          {participants.map((p, i) => (
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
          ))}
        </div>
      </ScrollArea>
    </DialogContent>
  );
};

export default GamePlayersModal;
