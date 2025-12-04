"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useGames } from "@/hooks/useGame";
import { useCreateScore } from "@/hooks/useScore";
import { usePlayers } from "@/hooks/usePlayers";
import { useTeams } from "@/hooks/useTeams";
import { Plus, Trash2, Users, User } from "lucide-react"; // Icons for UI

export default function OverviewPage() {
  // 1. Hook Calls
  const { data: gamesData = [], isLoading: gamesLoading } = useGames();
  const { data: teams = [], isLoading: teamsLoading } = useTeams();
  const { data: allPlayers = [] } = usePlayers();
  const createScoreMutation = useCreateScore();

  // 2. Form State
  const [formData, setFormData] = useState({
    teamId: "",
    points: 100,
    game: "",
    category: "Sports",
    contributor: "", // This stores Player Name (Solo) OR Group Name (Group)
    isGroup: false,  // New field to track game type
  });

  // State for Group Members (Start with 2 empty slots)
  const [members, setMembers] = useState<string[]>(["", ""]);

  // --- Search States ---
  // We use 'activeSearchIndex' to know WHICH field is currently showing a dropdown
  // -1 = Solo Player Field
  // 0, 1, 2... = Group Member Fields
  const [activeSearchIndex, setActiveSearchIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [gameSearch, setGameSearch] = useState("");
  const [showGameDropdown, setShowGameDropdown] = useState(false);

  // 3. Set Default Team
  useEffect(() => {
    if (teams.length > 0 && !formData.teamId) {
      setFormData((prev) => ({ ...prev, teamId: teams[0].id }));
    }
  }, [teams, formData.teamId]);

  // 4. DERIVED STATE (Filters)
  const selectedTeam = useMemo(
    () => teams.find((t: any) => t.id === formData.teamId),
    [teams, formData.teamId]
  );

  const targetTeamName = selectedTeam?.section_represented || selectedTeam?.name;

  // Filter Players based on Team + Current Typing
  const filteredPlayers = useMemo(() => {
    if (!allPlayers || !targetTeamName) return [];

    const teamPlayers = allPlayers.filter(
      (p: any) =>
        p.team?.name === targetTeamName ||
        p.team?.section_represented === targetTeamName
    );

    return teamPlayers.filter((p: any) =>
      p.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allPlayers, targetTeamName, searchQuery]);

  // Filter Games
  const filteredGames = useMemo(() => {
    if (!gamesData) return [];
    return gamesData.filter((g) =>
      g.name.toLowerCase().includes(gameSearch.toLowerCase())
    );
  }, [gamesData, gameSearch]);

  // 5. Member Management Functions
  const handleAddMember = () => {
    setMembers([...members, ""]);
  };

  const handleRemoveMember = (index: number) => {
    const newMembers = [...members];
    newMembers.splice(index, 1);
    setMembers(newMembers);
  };

  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
    setSearchQuery(value); // Update search query as they type
  };

  // 6. Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // specific validation for groups
    if (formData.isGroup) {
        if(members.some(m => m.trim() === "")) {
            alert("Please fill in all member names");
            return;
        }
    }

    createScoreMutation.mutate(
      {
        ...formData,
        // If it's a group game, send the members array, otherwise empty
        members: formData.isGroup ? members : [],
      },
      {
        onSuccess: () => {
          alert("Score logged successfully!");
          setFormData((prev) => ({
            ...prev,
            points: 100,
            contributor: "",
            game: "",
            isGroup: false,
          }));
          setMembers(["", ""]);
          setGameSearch("");
          setSearchQuery("");
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
      <div className="max-w-md bg-[#1e2130] p-6 rounded-xl border border-[#3b3f54] shadow-2xl">
        <h2 className="text-xl font-bold text-[#d3bc8e] mb-6 flex items-center gap-2">
           <Users size={20} />
           Log Score
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* TEAM SELECTION */}
          <div>
            <label className="block text-xs font-bold mb-1.5 text-[#8a8d99] uppercase tracking-wider">
              Team / Section
            </label>
            {teamsLoading ? (
              <p className="text-sm text-[#8a8d99]">Loading teams...</p>
            ) : (
              <select
                value={formData.teamId}
                onChange={(e) => {
                  setFormData({ ...formData, teamId: e.target.value, contributor: "" });
                  setSearchQuery("");
                }}
                className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded-lg p-3 text-[#ece5d8] focus:border-[#d3bc8e] outline-none transition-colors appearance-none"
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
          <div className="relative">
            <label className="block text-xs font-bold mb-1.5 text-[#8a8d99] uppercase tracking-wider">
              Game Event
            </label>
            <input
              type="text"
              value={gameSearch}
              onChange={(e) => {
                setGameSearch(e.target.value);
                setShowGameDropdown(true);
              }}
              onFocus={() => setShowGameDropdown(true)}
              onBlur={() => setTimeout(() => setShowGameDropdown(false), 200)}
              placeholder="Search game..."
              className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded-lg p-3 text-[#ece5d8] focus:border-[#d3bc8e] outline-none transition-colors placeholder:text-[#3b3f54]"
            />
            
            {showGameDropdown && (
              <div className="absolute z-50 w-full bg-[#1e2130] border border-[#3b3f54] rounded-b-lg mt-0 max-h-48 overflow-y-auto shadow-xl">
                {filteredGames.length > 0 ? (
                  filteredGames.map((game) => (
                    <div
                      key={game.id}
                      className="p-3 hover:bg-[#d3bc8e]/10 hover:text-[#d3bc8e] cursor-pointer text-sm text-[#ece5d8] transition-colors border-b border-[#3b3f54]/30 flex justify-between items-center"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          game: game.name,
                          category: game.category,
                          isGroup: game.is_group, // Detect if group game!
                          contributor: "", // Reset contributor on game change
                        });
                        // Reset members if switching to group
                        if (game.is_group) setMembers(["", ""]); 
                        
                        setGameSearch(game.name);
                        setShowGameDropdown(false);
                      }}
                    >
                      <span className="font-medium">{game.name}</span>
                      <div className="flex items-center gap-2">
                        {/* Category Badge */}
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3b3f54]/50 text-[#8a8d99] border border-[#3b3f54]">
                          {game.category}
                        </span>
                        {/* Group/Solo Badge */}
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${game.is_group ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'}`}>
                            {game.is_group ? 'GROUP' : 'SOLO'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                    <div className="p-3 text-sm text-[#8a8d99] text-center">No games found</div>
                )}
              </div>
            )}
          </div>

          {/* DYNAMIC FIELDS: SOLO VS GROUP */}
          {formData.isGroup ? (
            // --- GROUP GAME UI ---
            <div className="bg-[#161822] p-4 rounded-lg border border-[#3b3f54]/50 space-y-4">
                <div className="flex items-center gap-2 mb-2 border-b border-[#3b3f54] pb-2">
                    <Users size={16} className="text-[#d3bc8e]" />
                    <span className="text-sm font-bold text-[#d3bc8e]">Group Details</span>
                </div>

                {/* Group Name Input */}
                <div>
                    <label className="block text-xs font-bold mb-1.5 text-[#8a8d99]">Group / Team Name</label>
                    <input
                        type="text"
                        value={formData.contributor}
                        onChange={(e) => setFormData({...formData, contributor: e.target.value})}
                        placeholder="e.g. Team Alpha, The Warriors"
                        className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded p-2 text-[#ece5d8] focus:border-[#d3bc8e] outline-none text-sm"
                    />
                </div>

                {/* Members List */}
                <div>
                    <label className="block text-xs font-bold mb-1.5 text-[#8a8d99]">Members</label>
                    <div className="space-y-2">
                        {members.map((member, index) => (
                            <div key={index} className="relative flex items-center gap-2">
                                <User size={14} className="absolute left-3 text-[#8a8d99] z-10" />
                                <input
                                    type="text"
                                    value={member}
                                    onChange={(e) => handleMemberChange(index, e.target.value)}
                                    onFocus={() => {
                                        setActiveSearchIndex(index);
                                        setSearchQuery(member); // Load current value into search
                                    }}
                                    onBlur={() => setTimeout(() => setActiveSearchIndex(null), 200)}
                                    placeholder={`Member ${index + 1}`}
                                    className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded p-2 pl-9 text-[#ece5d8] focus:border-[#d3bc8e] outline-none text-sm"
                                    autoComplete="off"
                                />
                                
                                {/* Remove Button (Only show if more than 2 members) */}
                                {members.length > 2 && (
                                    <button 
                                        type="button" 
                                        onClick={() => handleRemoveMember(index)}
                                        className="p-2 text-[#8a8d99] hover:text-red-400 hover:bg-red-900/20 rounded transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}

                                {/* Dropdown for this specific member slot */}
                                {activeSearchIndex === index && (searchQuery || filteredPlayers.length > 0) && (
                                    <div className="absolute top-full left-0 z-50 w-full bg-[#1e2130] border border-[#3b3f54] rounded-b-lg mt-1 max-h-40 overflow-y-auto shadow-xl">
                                        {filteredPlayers.length > 0 ? (
                                            filteredPlayers.map((player: any) => (
                                                <div
                                                    key={player.id}
                                                    className="p-2 hover:bg-[#d3bc8e]/10 hover:text-[#d3bc8e] cursor-pointer text-sm text-[#ece5d8]"
                                                    onClick={() => {
                                                        handleMemberChange(index, player.full_name);
                                                        setActiveSearchIndex(null);
                                                    }}
                                                >
                                                    {player.full_name} <span className="text-xs text-[#8a8d99]">({player.cys})</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-2 text-xs text-[#8a8d99]">No players found</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {/* Add Member Button */}
                    <button
                        type="button"
                        onClick={handleAddMember}
                        className="mt-3 text-xs flex items-center gap-1 text-[#d3bc8e] hover:text-[#e6cfa3] font-bold"
                    >
                        <Plus size={14} /> Add Another Member
                    </button>
                </div>
            </div>
          ) : (
            // --- SOLO PLAYER UI ---
            <div className="relative">
              <label className="block text-xs font-bold mb-1.5 text-[#8a8d99] uppercase tracking-wider">
                Contributor (Player)
              </label>
              <input
                type="text"
                value={formData.contributor} // Use local search state for display
                onChange={(e) => {
                   setFormData({ ...formData, contributor: e.target.value });
                   setSearchQuery(e.target.value);
                }}
                onFocus={() => {
                    setActiveSearchIndex(-1); // -1 indicates Solo Field
                    setSearchQuery(formData.contributor);
                }}
                onBlur={() => setTimeout(() => setActiveSearchIndex(null), 200)}
                placeholder="Search player..."
                className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded-lg p-3 text-[#ece5d8] focus:border-[#d3bc8e] outline-none transition-colors"
                autoComplete="off"
              />
              
              {activeSearchIndex === -1 && (searchQuery || filteredPlayers.length > 0) && (
                <div className="absolute z-50 w-full bg-[#1e2130] border border-[#3b3f54] rounded-b-lg mt-0 max-h-48 overflow-y-auto shadow-xl">
                  {filteredPlayers.length > 0 ? (
                    filteredPlayers.map((player: any) => (
                      <div
                        key={player.id}
                        className="p-2 hover:bg-[#d3bc8e]/10 hover:text-[#d3bc8e] cursor-pointer text-sm text-[#ece5d8]"
                        onClick={() => {
                          setFormData({ ...formData, contributor: player.full_name });
                          setActiveSearchIndex(null);
                        }}
                      >
                        {player.full_name} <span className="text-xs text-[#8a8d99]">({player.cys})</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-[#8a8d99]">No players found</div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* POINTS INPUT */}
          <div>
            <label className="block text-xs font-bold mb-1.5 text-[#8a8d99] uppercase tracking-wider">Points</label>
            <input
              type="number"
              value={formData.points}
              onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) })}
              className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded-lg p-3 text-[#ece5d8] focus:border-[#d3bc8e] outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={createScoreMutation.isPending || !formData.game || !formData.contributor}
            className="w-full bg-[#d3bc8e] text-[#1e2130] font-bold py-3 rounded-lg hover:bg-[#e6cfa3] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6 shadow-lg shadow-[#d3bc8e]/10"
          >
            {createScoreMutation.isPending ? "Logging Score..." : "Log Score"}
          </button>
        </form>
      </div>
    </div>
  );
}