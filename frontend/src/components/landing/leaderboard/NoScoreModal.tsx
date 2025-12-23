"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BorderDesign from "../BorderDesign";
import { pickBg } from "./utils";

interface NoScoreModalProps {
  teamName: string;
  message?: string;
}

/**
 * Modal displayed when a team has no scores yet
 */
export const NoScoreModal = ({
  teamName,
  message = "This team hasn't participated in any games yet. Scores will appear here once they start competing.",
}: NoScoreModalProps) => {
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
            No Scores Yet
          </span>
        </DialogTitle>
      </DialogHeader>
      <div className="p-4 text-center">
        <p className="text-white/70 text-sm">{message}</p>
      </div>
    </DialogContent>
  );
};

export default NoScoreModal;
