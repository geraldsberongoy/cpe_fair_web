"use client";

import { memo } from "react";

interface LoadingSkeletonProps {
  count?: number;
  type?: "card" | "podium" | "game";
}

/**
 * Genshin-themed loading skeleton component
 */
export const LoadingSkeleton = memo(({ count = 3, type = "card" }: LoadingSkeletonProps) => {
  if (type === "podium") {
    return (
      <div className="flex justify-center items-end gap-2 md:gap-8 animate-pulse">
        {/* 2nd place */}
        <div className="w-24 md:w-75 h-40 md:h-60 rounded-t-xl bg-gradient-to-b from-gray-400/30 to-gray-500/20 border border-gray-400/30" />
        {/* 1st place */}
        <div className="w-24 md:w-75 h-50 md:h-70 rounded-t-xl bg-gradient-to-b from-yellow-500/30 to-yellow-600/20 border border-yellow-500/30" />
        {/* 3rd place */}
        <div className="w-24 md:w-75 h-35 md:h-50 rounded-t-xl bg-gradient-to-b from-orange-500/30 to-orange-600/20 border border-orange-500/30" />
      </div>
    );
  }

  if (type === "game") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="h-48 rounded-xl bg-gradient-to-b from-[#2a2640]/60 to-[#1a1630]/70 border-2 border-[#d3bc8e]/20"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="h-full flex flex-col items-center justify-center p-6 space-y-4">
              <div className="h-6 w-32 bg-[#d3bc8e]/20 rounded" />
              <div className="w-16 h-16 border-2 border-[#9d8f6f]/30 bg-[#2a2f4a]/50" />
              <div className="h-3 w-20 bg-[#d3bc8e]/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default card skeleton
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-full h-20 rounded-xl bg-gradient-to-r from-[#2a2640]/60 to-[#1a1630]/70 border border-white/10 flex items-center justify-between p-6"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10" />
            <div className="space-y-2">
              <div className="h-5 w-32 bg-white/10 rounded" />
              <div className="h-3 w-24 bg-white/5 rounded" />
            </div>
          </div>
          <div className="text-right space-y-2">
            <div className="h-6 w-16 bg-[#d3bc8e]/20 rounded" />
            <div className="h-3 w-12 bg-white/5 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
});

LoadingSkeleton.displayName = "LoadingSkeleton";

export default LoadingSkeleton;
