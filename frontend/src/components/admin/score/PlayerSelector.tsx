"use client";

import { useState, useMemo, useEffect } from "react";
import { User as UserIcon } from "lucide-react";
import { Player } from "@/services/player.service";

interface PlayerSelectorProps {
  value: string;
  onChange: (value: string) => void;
  players: Player[];
  placeholder?: string;
  label?: string;
  showIcon?: boolean;
}

export default function PlayerSelector({
  value,
  onChange,
  players,
  placeholder = "Search player...",
  label,
  showIcon = false,
}: PlayerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value);

  // Sync internal search if external value changes (e.g. form reset)
  useEffect(() => {
    setSearch(value);
  }, [value]);

  const filteredPlayers = useMemo(() => {
    if (!search) return players;
    return players.filter((p) =>
      p.full_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [players, search]);

  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-xs font-bold mb-1.5 text-[#8a8d99] uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        {showIcon && (
          <UserIcon
            size={14}
            className="absolute left-3 top-3 text-[#8a8d99] z-10"
          />
        )}
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder={placeholder}
          className={`w-full bg-[#0c0e16] border border-[#3b3f54] rounded-lg p-3 text-[#ece5d8] focus:border-[#d3bc8e] outline-none transition-colors ${
            showIcon ? "pl-9" : ""
          }`}
          autoComplete="off"
        />

        {isOpen && (search || filteredPlayers.length > 0) && (
          <div className="absolute z-50 w-full bg-[#1e2130] border border-[#3b3f54] rounded-b-lg mt-0 max-h-48 overflow-y-auto shadow-xl top-full left-0">
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player) => (
                <div
                  key={player.id}
                  className="p-2 hover:bg-[#d3bc8e]/10 hover:text-[#d3bc8e] cursor-pointer text-sm text-[#ece5d8]"
                  onClick={() => {
                    setSearch(player.full_name);
                    onChange(player.full_name);
                    setIsOpen(false);
                  }}
                >
                  {player.full_name}{" "}
                  <span className="text-xs text-[#8a8d99]">({player.cys})</span>
                </div>
              ))
            ) : (
              <div className="p-3 text-sm text-[#8a8d99]">No players found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
