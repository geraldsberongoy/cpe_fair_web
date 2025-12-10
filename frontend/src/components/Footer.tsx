

"use client";

import React from "react";
import Image from "next/image";
import AccessLogo from "@/assets/images/logos/access_logo.svg";
import { GameCategory } from "@/types/game";

interface FooterProps {
  onCategorySelect?: (category: GameCategory | "Overall") => void;
}

const Footer: React.FC<FooterProps> = ({ onCategorySelect }) => {
  const currentYear = new Date().getFullYear();

  const handleCategoryClick = (category: GameCategory | "Overall") => {
    if (onCategorySelect) {
      onCategorySelect(category);
      // Smooth scroll to top where leaderboard is
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full bg-gradient-to-b from-[#000000] to-[#1a1630] text-white overflow-hidden">
      {/* Ornate top border with gradient */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#d3bc8e] to-transparent"></div>
      
      {/* Corner decorations */}
      <div className="absolute top-2 left-4 w-6 h-6 border-t border-l border-[#d3bc8e]/50"></div>
      <div className="absolute top-2 right-4 w-6 h-6 border-t border-r border-[#d3bc8e]/50"></div>
      
      {/* Floating particles with Genshin colors */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => {
          const size = Math.random() * 2 + 1;
          const duration = Math.random() * 10 + 8;
          const delay = Math.random() * 5;
          return (
            <div
              key={i}
              className="absolute rounded-full bg-[#d3bc8e]/20"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `footerFloat ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            ></div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* CPE Fair Info */}
          <div className="flex flex-col items-center md:items-start relative">
            <h3 className="text-lg font-bold mb-2 text-[#f0e6d2] drop-shadow-[0_0_8px_rgba(240,230,210,0.4)]">
              CPE Fair
            </h3>
            <p className="text-[#c8b896] text-xs text-center md:text-left leading-relaxed">
              May the blessings of the Archons guide your journey!
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center relative">
            <h3 className="text-lg font-bold mb-2 text-[#f0e6d2] drop-shadow-[0_0_8px_rgba(240,230,210,0.4)]">
              Quick Links
            </h3>
            <ul className="space-y-2 text-center">
              <li>
                <button
                  onClick={() => handleCategoryClick("Overall")}
                  className="text-[#c8b896] text-sm hover:text-[#f0e6d2] transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(211,188,142,0.5)] cursor-pointer"
                >
                  Leaderboard
                </button>
              </li>
              <li>
                <a
                  href="/contributors"
                  className="text-[#c8b896] text-sm hover:text-[#f0e6d2] transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(211,188,142,0.5)]"
                >
                  Contributors
                </a>
              </li>
            </ul>
          </div>

          {/* Competitions */}
          <div className="flex flex-col items-center md:items-end relative">
            <h3 className="text-lg font-bold mb-2 text-[#f0e6d2] drop-shadow-[0_0_8px_rgba(240,230,210,0.4)]">
              Competitions
            </h3>
            <ul className="space-y-1.5 text-center md:text-right">
              <li>
                <button
                  onClick={() => handleCategoryClick("Sports")}
                  className="text-[#c8b896] text-xs hover:text-[#d3bc8e] transition-colors duration-300 cursor-pointer hover:drop-shadow-[0_0_6px_rgba(211,188,142,0.5)]"
                >
                  Sports
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick("Esports")}
                  className="text-[#c8b896] text-xs hover:text-[#d3bc8e] transition-colors duration-300 cursor-pointer hover:drop-shadow-[0_0_6px_rgba(211,188,142,0.5)]"
                >
                  Esports
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick("Board")}
                  className="text-[#c8b896] text-xs hover:text-[#d3bc8e] transition-colors duration-300 cursor-pointer hover:drop-shadow-[0_0_6px_rgba(211,188,142,0.5)]"
                >
                  Logic &amp; Board Games
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick("Quiz Bee")}
                  className="text-[#c8b896] text-xs hover:text-[#d3bc8e] transition-colors duration-300 cursor-pointer hover:drop-shadow-[0_0_6px_rgba(211,188,142,0.5)]"
                >
                  Academics
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick("Talents")}
                  className="text-[#c8b896] text-xs hover:text-[#d3bc8e] transition-colors duration-300 cursor-pointer hover:drop-shadow-[0_0_6px_rgba(211,188,142,0.5)]"
                >
                  Talents
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick("Mini Games")}
                  className="text-[#c8b896] text-xs hover:text-[#d3bc8e] transition-colors duration-300 cursor-pointer hover:drop-shadow-[0_0_6px_rgba(211,188,142,0.5)]"
                >
                  Mini Games
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#d3bc8e]/30 to-transparent"></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image 
              src={AccessLogo} 
              alt="Access Logo" 
              width={56} 
              height={56}
              className="drop-shadow-[0_0_8px_rgba(211,188,142,0.6)]"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 pt-2">
          <p className="text-[#9d8f6f] text-xs text-center md:text-left">
            © {currentYear} CPE Fair. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-[#9d8f6f] text-xs">Powered by</span>
            <span className="text-[#d3bc8e] font-semibold text-xs drop-shadow-[0_0_4px_rgba(211,188,142,0.5)]">
              The Seven Archons
            </span>
          </div>
        </div>
      </div>

      {/* Bottom corner decorations */}
      <div className="absolute bottom-2 left-4 w-6 h-6 border-b border-l border-[#d3bc8e]/50"></div>
      <div className="absolute bottom-2 right-4 w-6 h-6 border-b border-r border-[#d3bc8e]/50"></div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes footerFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-15px) translateX(8px) scale(1.1);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-25px) translateX(-8px) scale(0.9);
            opacity: 0.3;
          }
          75% { 
            transform: translateY(-15px) translateX(8px) scale(1.1);
            opacity: 0.6;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;


