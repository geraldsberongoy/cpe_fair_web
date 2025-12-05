"use client";

import { Plus, TrendingUp, Trophy } from "lucide-react";
import ScoreTable from "@/components/admin/score/ScoreTable";
import LogScoreModal from "@/components/admin/score/LogScoreModal";
import AddPlayerModal from "@/components/admin/player/AddPlayerModal";
import { useAggregatedScores } from "@/hooks/useScore";

export default function OverviewPage() {
  const { data: aggregatedScores = [], isLoading: loadingScores } =
    useAggregatedScores();

  // Sort teams by total points descending (all teams)
  const rankedTeams = [...aggregatedScores].sort(
    (a, b) => b.totalPoints - a.totalPoints
  );

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#ece5d8]">Admin Overview</h1>
      </div>
      <div className="flex gap-6 relative z-10">
        {/* LEFT: Table (70%) */}
        <div className="flex-[7] min-h-[720px]">
          <ScoreTable />
        </div>

        {/* RIGHT: Actions Sidebar (30%) */}
        <div className="flex-[3] space-y-4">
          <div className="bg-[#1e2130]/80 backdrop-blur-md p-6 rounded-xl border border-[#3b3f54] shadow-2xl">
            <h3 className="text-lg font-bold text-[#d3bc8e] mb-4 flex items-center gap-2">
              <TrendingUp size={18} />
              Actions
            </h3>

            <div className="space-y-3">
              {/* Log Score Button */}
              <LogScoreModal />

              {/* Add Player Button */}
              <AddPlayerModal />
            </div>
          </div>

          {/* Overall Rankings */}
          <div className="bg-[#1e2130]/80 backdrop-blur-md p-6 rounded-xl border border-[#3b3f54] shadow-2xl">
            <h3 className="text-sm font-bold text-[#8a8d99] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Trophy size={16} />
              Overall Rankings
            </h3>
            {loadingScores ? (
              <div className="text-center text-[#8a8d99] text-sm py-4">
                Loading rankings...
              </div>
            ) : rankedTeams.length > 0 ? (
              <div className="space-y-3">
                {rankedTeams.map((team, index) => (
                  <div
                    key={team.section_team}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#0c0e16]/50 border border-[#3b3f54]/50 hover:border-[#d3bc8e]/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                          index === 0
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                            : index === 1
                            ? "bg-gray-400/20 text-gray-300 border border-gray-400/30"
                            : index === 2
                            ? "bg-orange-700/20 text-orange-400 border border-orange-700/30"
                            : "bg-[#3b3f54]/30 text-[#8a8d99] border border-[#3b3f54]/50"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="text-[#ece5d8] text-sm font-medium">
                        {team.section_team}
                      </span>
                    </div>
                    <span className="text-[#d3bc8e] font-bold text-sm">
                      {team.totalPoints}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-[#8a8d99] text-sm py-4">
                No scores yet
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
