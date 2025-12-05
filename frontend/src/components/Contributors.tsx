"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Contributors = () => {
  const router = useRouter();

  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
      <button
        onClick={() => router.push("/contributors")}
        className="group relative"
        aria-label="View Contributors"
      >
        {/* Main Button Container */}
        <div className="relative overflow-hidden">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#d3bc8e]/30 to-[#9d8f6f]/20 blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />

          {/* Button Background */}
          <div className="relative px-4 py-2 md:px-5 md:py-2.5 bg-gradient-to-br from-[#2a2640]/90 to-[#1a1630]/95 border-2 border-[#d3bc8e]/60 group-hover:border-[#f0e6d2] rounded-lg backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(211,188,142,0.3)] group-hover:shadow-[0_0_30px_rgba(240,230,210,0.5)]">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f0e6d2]/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

            {/* Content */}
            <div className="relative flex items-center gap-2">
              {/* Icon */}
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-[#d3bc8e] group-hover:text-[#f0e6d2] transition-colors duration-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>

            </div>

            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#f0e6d2]/40 group-hover:border-[#f0e6d2]/80 transition-colors duration-300" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#f0e6d2]/40 group-hover:border-[#f0e6d2]/80 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#f0e6d2]/40 group-hover:border-[#f0e6d2]/80 transition-colors duration-300" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#f0e6d2]/40 group-hover:border-[#f0e6d2]/80 transition-colors duration-300" />
          </div>
        </div>

        {/* Floating Particles on Hover */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#d3bc8e] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-float"
              style={{
                left: `${20 + i * 30}%`,
                bottom: "-10px",
                animationDelay: `${i * 0.2}s`,
                boxShadow: "0 0 4px rgba(211, 188, 142, 0.8)",
              }}
            />
          ))}
        </div>
      </button>

      {/* Tooltip */}
      <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-[#1a1630]/95 border border-[#d3bc8e]/60 rounded px-3 py-1.5 backdrop-blur-sm">
          <p className="text-xs text-[#c8b896] whitespace-nowrap">
            Meet the Archons behind this project
          </p>
          {/* Tooltip Arrow */}
          <div className="absolute -top-1 right-4 w-2 h-2 bg-[#1a1630] border-t border-l border-[#d3bc8e]/60 transform rotate-45" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-30px) scale(1);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float 1.5s ease-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Contributors;

