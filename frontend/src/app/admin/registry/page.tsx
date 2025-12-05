"use client";

import { useState } from "react";
import PlayerTable from "@/components/admin/player/PlayerTable";
import AddPlayerModal from "@/components/admin/player/AddPlayerModal";
import { ArrowUpDown, Filter, Search } from "lucide-react";
import { useTeams } from "@/hooks/useTeams";
import { Team } from "@/services/team.service";

export default function RegistryPage() {
  const [sortBy, setSortBy] = useState<"full_name" | "cys" | "teamName">("full_name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [teamFilter, setTeamFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);
  
  const { data: teams = [] } = useTeams();

  const toggleOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-6">
        <h1 className="text-3xl font-bold text-[#ece5d8]">Manage Registry</h1>
        
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8d99]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search players..."
              className="bg-[#1e2130]/50 border border-[#3b3f54] rounded-lg py-2 pl-10 pr-4 text-sm text-[#ece5d8] placeholder:text-[#8a8d99] focus:border-[#d3bc8e] outline-none transition-colors w-64"
            />
          </div>

          {/* Sort and Filter Controls */}
          <div className="flex items-center gap-2 bg-[#1e2130]/50 p-1 rounded-lg border border-[#d3bc8e]/20">
            <div className="flex items-center px-2 gap-2 border-r border-[#d3bc8e]/10">
              <Filter size={14} className="text-[#8a8d99]" />
              <select
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value)}
                className="bg-transparent text-sm text-[#ece5d8] outline-none cursor-pointer [&>option]:bg-[#1e2130]"
              >
                <option value="All">All Teams</option>
                {teams.map((team: Team) => (
                  <option key={team.id} value={team.section_represented}>
                    {team.section_represented}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center px-2 gap-2 border-r border-[#d3bc8e]/10">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "full_name" | "teamName")
                }
                className="bg-transparent text-sm text-[#ece5d8] outline-none cursor-pointer [&>option]:bg-[#1e2130]"
              >
                <option value="full_name">Name</option>
                <option value="teamName">Team</option>
              </select>
            </div>

            <button
              onClick={toggleOrder}
              className="p-1.5 cursor-pointer hover:bg-[#d3bc8e]/10 rounded-md transition-colors text-[#d3bc8e] flex items-center gap-1 text-xs font-medium uppercase"
            >
              {sortOrder}
              <ArrowUpDown size={14} />
            </button>
          </div>

          {/* Add Player Button */}
          <div className="w-48">
            <button
              onClick={() => setIsAddPlayerModalOpen(true)}
              className="w-full cursor-pointer bg-[#d3bc8e] text-[#1e2130] font-bold py-1.5 px-4 rounded-lg hover:bg-[#e6cfa3] transition-all shadow-lg"
            >
              Add Player
            </button>
            <AddPlayerModal
              isOpen={isAddPlayerModalOpen}
              onClose={() => setIsAddPlayerModalOpen(false)}
            />
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <PlayerTable 
          sortBy={sortBy} 
          sortOrder={sortOrder} 
          teamFilter={teamFilter}
          search={searchQuery}
        />
      </div>
    </>
  );
}
