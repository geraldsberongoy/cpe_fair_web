"use client";

import { useState, useEffect, useMemo } from "react";
import { useGames } from "@/hooks/useGame";
import { useCreateScore } from "@/hooks/useScore";
import { usePlayers } from "@/hooks/usePlayers";
import { useTeams } from "@/hooks/useTeams";
// Make sure to import these types or define them if missing
import { Game } from "@/types/game"; 
// Assuming you have these types, otherwise I used 'any' sparingly below
// import { Team, Player } from "@/types"; 

export default function OverviewPage() {
  // 1. Hook Calls
  const { data: gamesData, isLoading: gamesLoading } = useGames();
  const { data: teams = [], isLoading: teamsLoading } = useTeams();
  // Fetch ALL players once. React Query caches this.
  const { data: allPlayers = [] } = usePlayers(); 
  const createScoreMutation = useCreateScore();

  // 2. Form State
  const [formData, setFormData] = useState({
    teamId: "",
    points: 100,
    game: "",
    category: "Sports",
    contributor: "", // This is the player name string
  });

  const [playerSearch, setPlayerSearch] = useState("");
  const [showPlayerDropdown, setShowPlayerDropdown] = useState(false);

  // 3. Set Default Team
  useEffect(() => {
    if (teams.length > 0 && !formData.teamId) {
      setFormData((prev) => ({ ...prev, teamId: teams[0].id }));
    }
  }, [teams, formData.teamId]);

  // 4. DERIVED STATE (The Fix)
  // Find the selected team object
  const selectedTeam = useMemo(() => 
    teams.find((t: any) => t.id === formData.teamId), 
  [teams, formData.teamId]);

  const targetTeamName = selectedTeam?.section_represented || selectedTeam?.name;

  // Filter players based on the selected team (Client-side filtering)
  const teamPlayers = useMemo(() => {
    if (!allPlayers || !targetTeamName) return [];
    
    return allPlayers.filter((p: any) => 
      p.team?.name === targetTeamName || 
      p.team?.section_represented === targetTeamName
    );
  }, [allPlayers, targetTeamName]);

  // Filter that list based on the search input
  const filteredPlayers = useMemo(() => {
    return teamPlayers.filter((p: any) =>
      p.full_name.toLowerCase().includes(playerSearch.toLowerCase())
    );
  }, [teamPlayers, playerSearch]);


  // 5. Handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createScoreMutation.mutate(
      {
        ...formData,
        isGroup: false,
        members: [],
      },
      {
        onSuccess: () => {
          alert("Score logged successfully!");
          // Optional: Reset points or player after success
          setFormData(prev => ({ ...prev, points: 100, contributor: "" }));
          setPlayerSearch("");
        },
        onError: (error) => {
          console.error(error);
          alert("Failed to log score.");
        },
      }
    );
  };

  return (
    <div>
      <div className="max-w-md bg-[#1e2130] p-6 rounded-xl border border-[#3b3f54]">
        <h2 className="text-xl font-bold text-[#d3bc8e] mb-4">
          Log Test Score
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* TEAM SELECTION */}
          <div>
            <label className="block text-sm font-bold mb-2 text-[#ece5d8]">Team</label>
            {teamsLoading ? (
              <p className="text-sm text-[#8a8d99]">Loading teams...</p>
            ) : (
              <select
                value={formData.teamId}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    teamId: e.target.value,
                    contributor: "", // Reset contributor when team changes
                  });
                  setPlayerSearch("");
                }}
                className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded p-2 text-[#ece5d8] focus:border-[#d3bc8e] outline-none transition-colors"
              >
                {teams.map((t: any) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* GAME SELECTION */}
          <div>
            <label className="block text-sm font-bold mb-2 text-[#ece5d8]">Game</label>
            <select
              value={formData.game}
              onChange={(e) => {
                // Auto-set category based on selected game
                const selectedGame = gamesData?.find(g => g.name === e.target.value);
                setFormData({ 
                  ...formData, 
                  game: e.target.value,
                  category: selectedGame?.category || "Sports"
                });
              }}
              className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded p-2 text-[#ece5d8] focus:border-[#d3bc8e] outline-none transition-colors"
            >
              <option value="">Select Game</option>
              {gamesData?.map((g) => (
                <option key={g.id} value={g.name}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          {/* POINTS INPUT */}
          <div>
            <label className="block text-sm font-bold mb-2 text-[#ece5d8]">Points</label>
            <input
              type="number"
              value={formData.points}
              onChange={(e) =>
                setFormData({ ...formData, points: Number(e.target.value) })
              }
              className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded p-2 text-[#ece5d8] focus:border-[#d3bc8e] outline-none transition-colors"
            />
          </div>

          {/* PLAYER SEARCH / DROPDOWN */}
          <div className="relative">
            <label className="block text-sm font-bold mb-2 text-[#ece5d8]">
              Contributor (Player)
            </label>
            <input
              type="text"
              value={playerSearch} // Controlled by search state
              onChange={(e) => {
                setPlayerSearch(e.target.value);
                setFormData({ ...formData, contributor: e.target.value });
                setShowPlayerDropdown(true);
              }}
              onFocus={() => setShowPlayerDropdown(true)}
              // Delay blur to allow click event on dropdown items to register
              onBlur={() => setTimeout(() => setShowPlayerDropdown(false), 200)}
              placeholder="Search player..."
              className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded p-2 text-[#ece5d8] focus:border-[#d3bc8e] outline-none transition-colors"
              autoComplete="off"
            />
            
            {showPlayerDropdown && (playerSearch || filteredPlayers.length > 0) && (
              <div className="absolute z-50 w-full bg-[#1e2130] border border-[#3b3f54] rounded-b-lg mt-0 max-h-48 overflow-y-auto shadow-xl">
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player: any) => (
                    <div
                      key={player.id}
                      className="p-2 hover:bg-[#d3bc8e]/10 hover:text-[#d3bc8e] cursor-pointer text-sm text-[#ece5d8] transition-colors border-b border-[#3b3f54]/30 last:border-0"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          contributor: player.full_name,
                        });
                        setPlayerSearch(player.full_name);
                        setShowPlayerDropdown(false);
                      }}
                    >
                      {player.full_name}{" "}
                      <span className="text-xs text-[#8a8d99] block">
                        {player.cys}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-sm text-[#8a8d99] text-center italic">
                    No players found in {targetTeamName}
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={createScoreMutation.isPending || !formData.game || !formData.contributor}
            className="w-full bg-[#d3bc8e] text-[#1e2130] font-bold py-2.5 rounded hover:bg-[#e6cfa3] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6"
          >
            {createScoreMutation.isPending ? "Logging..." : "Log Score"}
          </button>
        </form>
      </div>
    </div>
  );
}