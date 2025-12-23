"use client";

import { memo } from "react";
import StarryBackground from "../../StarryBackground";

interface GameCardProps {
  gameName: string;
  onClick: () => void;
}

/**
 * Card component for selecting a game in the category view
 * Memoized to prevent unnecessary re-renders
 */
export const GameCard = memo(({ gameName, onClick }: GameCardProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 bg-linear-to-b from-[#2a2640]/60 to-[#1a1630]/70
                  transition-all duration-300 group text-left relative overflow-hidden"
    >
      <StarryBackground starCount={5} />
      
      {/* Border Designs */}
      <div
        className="absolute inset-0 border-4 border-[#A89265] group-hover:border-[#f2d9a7] transition-colors duration-300"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      />
      <div className="absolute inset-2 border-2 border-[#f0e6d2]/40" />

      {/* Corner Ornaments - Top Left */}
      <div className="absolute top-0 left-0 w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#FEF4BF] to-transparent" />
        <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-[#FEF4BF] to-transparent" />
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#FEF4BF]/60" />
        <div className="absolute top-0 left-0 w-3 h-3 bg-linear-to-br group-hover:scale-125 transition-transform duration-300" />
      </div>

      {/* Corner Ornaments - Top Right */}
      <div className="absolute top-0 right-0 w-12 h-12">
        <div className="absolute top-0 right-0 w-full h-1 bg-linear-to-l from-[#FEF4BF] to-transparent" />
        <div className="absolute top-0 right-0 w-1 h-full bg-linear-to-b from-[#FEF4BF] to-transparent" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#FEF4BF]/60" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-linear-to-bl group-hover:scale-125 transition-transform duration-300" />
      </div>

      {/* Corner Ornaments - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-12 h-12">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-[#FEF4BF] to-transparent" />
        <div className="absolute bottom-0 left-0 w-1 h-full bg-linear-to-t from-[#FEF4BF] to-transparent" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#FEF4BF]/60" />
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-linear-to-tr group-hover:scale-125 transition-transform duration-300" />
      </div>

      {/* Corner Ornaments - Bottom Right */}
      <div className="absolute bottom-0 right-0 w-12 h-12">
        <div className="absolute bottom-0 right-0 w-full h-1 bg-linear-to-l from-[#FEF4BF] to-transparent" />
        <div className="absolute bottom-0 right-0 w-1 h-full bg-linear-to-t from-[#FEF4BF] to-transparent" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#FEF4BF]/60" />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-linear-to-tl group-hover:scale-125 transition-transform duration-300" />
      </div>

      {/* Side Decorations */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-2 h-16 bg-linear-to-r from-[#FEF4BF]/20 to-transparent" />
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-2 h-16 bg-linear-to-l from-[#FEF4BF]/20 to-transparent" />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-2 w-16 bg-linear-to-b from-[#FEF4BF]/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-2 w-16 bg-linear-to-t from-[#FEF4BF]/20 to-transparent" />

      {/* Game title */}
      <div className="flex items-center justify-center mb-6 w-full">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#FEF4BF]/50 to-transparent max-w-16" />
        <h3
          className="text-2xl text-transparent bg-clip-text bg-linear-to-b from-[#f0e6d2] via-[#d3bc8e] to-[#9d8f6f] drop-shadow-[0_0_30px_rgba(211,188,142,0.8)] font-bold text-center mx-4 group-hover:scale-105 transition-transform duration-300"
          style={{ textShadow: "0 0 5px rgba(251, 191, 36, 0.6)" }}
        >
          {gameName}
        </h3>
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-[#FEF4BF]/50 to-transparent max-w-16" />
      </div>

      {/* Action Button Section */}
      <div className="flex flex-col items-center justify-center space-y-4 my-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="relative">
            <div className="absolute inset-0 bg-[#9d8f6f]/20 blur-xl group-hover:bg-amber-400/40 transition-all duration-300" />
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
      </div>

      {/* Bottom ornamental dots */}
      <div className="flex gap-2 mt-4 justify-center">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 border border-[#d3bc8e]/60 group-hover:bg-[#d3bc8e]/40 transition-all duration-300"
            style={{
              transform: "rotate(45deg)",
              transitionDelay: `${i * 50}ms`,
            }}
          />
        ))}
      </div>
    </button>
  );
});

GameCard.displayName = "GameCard";

export default GameCard;

