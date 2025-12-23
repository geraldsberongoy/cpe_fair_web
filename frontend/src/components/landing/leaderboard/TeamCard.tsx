"use client";

import { ReactNode, memo } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import StarryBackground from "../../StarryBackground";
import { pickBg } from "./constants";

interface TeamCardProps {
  teamName: string;
  rank?: number; // Optional rank number (e.g., #4, #5, etc.)
  points: number;
  subtitle?: string; // e.g., "3 Games Played" or section name
  showPoints?: boolean;
  pointsLabel?: string;
  children: ReactNode; // Modal content
  highlight?: "gold" | "silver" | "bronze" | "none";
}

/**
 * Reusable team card component with background image and modal trigger
 * Memoized to prevent unnecessary re-renders
 */
export const TeamCard = memo(({
  teamName,
  rank,
  points,
  subtitle,
  showPoints = true,
  pointsLabel = "Points",
  children,
  highlight = "none",
}: TeamCardProps) => {
  const bg = pickBg(teamName);

  const highlightClasses = {
    gold: "border-yellow-500/50 hover:bg-yellow-500/30",
    silver: "border-gray-400/50 hover:bg-gray-400/30",
    bronze: "border-orange-700/50 hover:bg-orange-700/30",
    none: "border-white/20",
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          style={{
            backgroundImage: bg
              ? `linear-gradient(rgba(0,0,0,0.10), rgba(0,0,0,0.10)), url(${bg})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={`w-full flex items-center justify-between p-6 rounded-xl border transition-scale duration-300 scale-[1.01] hover:scale-[1.02] group relative overflow-hidden ${highlightClasses[highlight]}`}
        >
          {/* Hover shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#d3bc8e]/0 via-[#f0e6d2]/30 to-[#d3bc8e]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
          
          <StarryBackground starCount={5} />
          
          <div className="flex items-center gap-3 md:gap-6">
            {rank !== undefined && (
              <span className="text-lg md:text-3xl font-bold w-12 text-center text-white/60">
                #{rank}
              </span>
            )}
            <div className="text-left">
              <h3 className="text-md md:text-2xl font-bold text-white">
                {teamName}
              </h3>
              {subtitle && (
                <p className="text-white/60 text-sm md:text-base">{subtitle}</p>
              )}
            </div>
          </div>
          
          {showPoints && (
            <div className="text-right">
              <p className="text-lg md:text-3xl font-bold text-white">
                {points.toLocaleString()}
              </p>
              <p className="text-[10px] md:text-sm text-white/60 uppercase tracking-wider">
                {pointsLabel}
              </p>
            </div>
          )}
        </button>
      </DialogTrigger>
      {children}
    </Dialog>
  );
});

TeamCard.displayName = "TeamCard";

export default TeamCard;

