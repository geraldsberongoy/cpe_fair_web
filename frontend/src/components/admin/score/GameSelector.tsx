"use client";

import { useState, useMemo } from "react";
import { Game } from "@/types/game"; // Assuming type exists, or use 'any'

interface GameSelectorProps {
  games: Game[];
  onSelect: (game: Game) => void;
  isLoading: boolean;
}

export default function GameSelector({
  games,
  onSelect,
  isLoading,
}: GameSelectorProps) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredGames = useMemo(() => {
    if (!search) return games;
    return games.filter((g) =>
      g.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [games, search]);

  return (
    <div className="relative">
      <label className="block text-xs font-bold mb-1.5 text-[#8a8d99] uppercase tracking-wider">
        Game Event
      </label>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder="Search game..."
        className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded-lg p-3 text-[#ece5d8] focus:border-[#d3bc8e] outline-none transition-colors placeholder:text-[#3b3f54]"
      />

      {isOpen && (
        <div className="absolute z-50 w-full bg-[#1e2130] border border-[#3b3f54] rounded-b-lg mt-0 max-h-48 overflow-y-auto shadow-xl">
          {isLoading ? (
            <div className="p-3 text-sm text-[#8a8d99]">Loading games...</div>
          ) : filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <div
                key={game.id}
                className="p-3 hover:bg-[#d3bc8e]/10 hover:text-[#d3bc8e] cursor-pointer text-sm text-[#ece5d8] transition-colors border-b border-[#3b3f54]/30 flex justify-between items-center"
                onClick={() => {
                  setSearch(game.name);
                  onSelect(game);
                  setIsOpen(false);
                }}
              >
                <span className="font-medium">{game.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3b3f54]/50 text-[#8a8d99] border border-[#3b3f54]">
                    {game.category}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      game.is_group
                        ? "bg-purple-500/20 text-purple-300"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {game.is_group ? "GROUP" : "SOLO"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-sm text-[#8a8d99] text-center">
              No games found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
