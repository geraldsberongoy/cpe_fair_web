"use client";

import { useSectionTeamScores } from "../../hooks/useScore";

const TEAMS = [
  {
    id: "7d1b289e-60bd-4ee9-a9c1-7a989d5aacfb",
    name: "Fontaine",
    color: "bg-blue-500",
    created_at: "2025-11-20T15:53:55.845305+00:00",
    section_represented: "Block 5 (CPE 1-5, 2-5, 3-5, 4-5)",
  },
  {
    id: "6768dab5-5c93-4c52-a7c2-c6215da292ee",
    name: "Inazuma",
    color: "bg-violet-600",
    created_at: "2025-11-20T15:53:55.845305+00:00",
    section_represented: "Block 3 (CPE 1-3, 2-3, 3-3, 4-3)",
  },
  {
    id: "dce80e21-a3a3-4ac4-bb1c-d0cc3acd749e",
    name: "Liyue",
    color: "bg-amber-500",
    created_at: "2025-11-20T15:53:55.845305+00:00",
    section_represented: "Block 2 (CPE 1-2, 2-2, 3-2, 4-2)",
  },
  {
    id: "f9590afa-626c-441e-8cc8-4c4e0085fc10",
    name: "Mondstadt",
    color: "bg-teal-400",
    created_at: "2025-11-20T15:53:55.845305+00:00",
    section_represented: "Block 1 (CPE 1-1, 2-1, 3-1, 4-1)",
  },
  {
    id: "128190a1-ab62-481d-b71a-d040d53bbc6f",
    name: "Natlan",
    color: "bg-red-500",
    created_at: "2025-11-20T15:53:55.845305+00:00",
    section_represented: "Block 6 (CPE 1-6, 2-6, 3-6, 4-6)",
  },
  {
    id: "c5311d70-cdfa-41b3-85b3-1a8d33d99cf9",
    name: "Snezhnaya",
    color: "bg-cyan-200",
    created_at: "2025-11-20T15:53:55.845305+00:00",
    section_represented: "Block 7 & P (CPE 1-7, 2-7, 3-7, 4-7, Ps)",
  },
  {
    id: "5ccccf78-9b02-4909-9108-747a143eb13b",
    name: "Sumeru",
    color: "bg-emerald-500",
    created_at: "2025-11-20T15:53:55.845305+00:00",
    section_represented: "Block 4 (CPE 1-4, 2-4, 3-4, 4-4)",
  },
];

function TeamScoreCard({ team }: { team: typeof TEAMS[0] }) {
  const { data: teamData, isLoading, isError } = useSectionTeamScores(team.name);

  return (
    <div className="p-6 bg-[#1e2130]/50 border border-[#3b3f54] rounded-xl">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-4 h-4 rounded-full ${team.color.replace("bg-", "bg-")}`}
        ></div>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{team.name}</h2>
          <p className="text-sm text-[#8a8d99]">{team.section_represented}</p>
        </div>
        {teamData && (
          <div className="text-right">
            <span className="text-2xl font-bold text-[#d3bc8e]">
              {teamData.totalPoints}
            </span>
            <span className="text-xs text-[#8a8d99] block">Total Points</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-[#d3bc8e]">Fetched Scores:</h3>
        {isLoading ? (
          <p className="text-sm text-[#8a8d99]">Loading scores...</p>
        ) : isError ? (
          <p className="text-sm text-red-400">Error fetching scores.</p>
        ) : teamData && teamData.scores.length > 0 ? (
          <ul className="list-disc list-inside text-sm text-[#ece5d8]/80">
            {teamData.scores.map((score) => (
              <li key={score.id}>
                {score.game}: {score.points} pts
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#8a8d99]">No scores found.</p>
        )}
      </div>
    </div>
  );
}

export default function TestingPage() {
  return (
    <div className="p-8 bg-[#0c0e16] min-h-screen text-[#ece5d8]">
      <h1 className="text-3xl font-bold font-serif text-[#d3bc8e] mb-8">
        Score Service Testing (TanStack Query)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TEAMS.map((team) => (
          <TeamScoreCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}
