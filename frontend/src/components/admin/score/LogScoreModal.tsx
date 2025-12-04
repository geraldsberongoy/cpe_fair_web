"use client";

import { useState, useEffect, useMemo } from "react";
import { useGames } from "@/hooks/useGame";
import { useCreateScore } from "@/hooks/useScore";
import { usePlayers } from "@/hooks/usePlayer";
import { useTeams } from "@/hooks/useTeams";
import { Users } from "lucide-react";
import { Team } from "@/services/team.service";
import { Player } from "@/services/player.service";
import type { PlayerWithTeam } from "@/types/player";
import { toast } from "react-toastify";
import BaseModal from "@/components/ui/base-modal";

import GameSelector from "./GameSelector";
import PlayerSelector from "./PlayerSelector";
import GroupSection from "./GroupSection";

interface LogScoreModalProps {
  trigger?: React.ReactNode;
}

export default function LogScoreModal({ trigger }: LogScoreModalProps) {
  const [open, setOpen] = useState(false);
  const { data: gamesData = [], isLoading: gamesLoading } = useGames();
  const { data: teams = [], isLoading: teamsLoading } = useTeams();
  const { data: playersResponse } = usePlayers(1, 100); // Fetch first 100 players
  const allPlayers = playersResponse?.data || [];
  const createScoreMutation = useCreateScore();

  // --- Form State ---
  const [formData, setFormData] = useState({
    teamId: "",
    points: 100,
    game: "",
    category: "Sports",
    contributor: "",
    isGroup: false,
  });

  const [members, setMembers] = useState<string[]>(["", ""]);

  // --- Auto-select first team ---
  useEffect(() => {
    if (teams.length > 0 && !formData.teamId) {
      setFormData((prev) => ({ ...prev, teamId: teams[0].id }));
    }
  }, [teams, formData.teamId]);

  // --- Filter Players by Team ---
  const teamPlayers = useMemo(() => {
    const selectedTeam = teams.find((t: Team) => t.id === formData.teamId);
    const targetName = selectedTeam?.section_represented || selectedTeam?.name;

    if (!targetName) return [];

    return allPlayers.filter(
      (p: Player) =>
        p.teamName === targetName || p.sectionRepresented === targetName
    );
  }, [teams, formData.teamId, allPlayers]);

  // --- Handlers ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.isGroup && members.some((m) => m.trim() === "")) {
      toast.error("Please fill in all member names");
      return;
    }

    createScoreMutation.mutate(
      { ...formData, members: formData.isGroup ? members : [] },
      {
        onSuccess: () => {
          // Reset Form
          setFormData((prev) => ({
            ...prev,
            points: 100,
            contributor: "",
            game: "",
            isGroup: false,
          }));
          setMembers(["", ""]);
          setOpen(false);
          toast.success("Score logged successfully!");
        },
        onError: (err) => {
          console.error(err);
          toast.error("Failed to log score.");
        },
      }
    );
  };

  return (
    <>
      {trigger || (
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-[#d3bc8e] text-[#1e2130] font-bold py-3 px-4 rounded-lg hover:bg-[#e6cfa3] transition-all shadow-lg"
        >
          Log Score
        </button>
      )}

      <BaseModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Log Score"
        icon={Users}
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Team Selector */}
          <div>
            <label className="block text-xs font-bold mb-1.5 text-[#8a8d99] uppercase tracking-wider">
              Team / Section
            </label>
            {teamsLoading ? (
              <p className="text-sm text-[#8a8d99]">Loading teams...</p>
            ) : (
              <select
                value={formData.teamId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    teamId: e.target.value,
                    contributor: "",
                  })
                }
                className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded-lg p-3 text-[#ece5d8] focus:border-[#d3bc8e] outline-none transition-colors appearance-none"
              >
                {teams.map((t: Team) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* 2. Game Selector */}
          <GameSelector
            games={gamesData}
            isLoading={gamesLoading}
            onSelect={(game) => {
              setFormData({
                ...formData,
                game: game.name,
                category: game.category,
                isGroup: game.is_group,
                contributor: "",
              });
              if (game.is_group) setMembers(["", ""]);
            }}
          />

          {/* 3. Player/Group Fields */}
          {formData.isGroup ? (
            <GroupSection
              groupName={formData.contributor}
              onGroupNameChange={(val) =>
                setFormData({ ...formData, contributor: val })
              }
              members={members}
              setMembers={setMembers}
              players={teamPlayers}
            />
          ) : (
            <PlayerSelector
              label="Contributor (Player)"
              value={formData.contributor}
              onChange={(val) => setFormData({ ...formData, contributor: val })}
              players={teamPlayers}
            />
          )}

          {/* 4. Points */}
          <div>
            <label className="block text-xs font-bold mb-1.5 text-[#8a8d99] uppercase tracking-wider">
              Points
            </label>
            <input
              type="number"
              value={formData.points}
              onChange={(e) =>
                setFormData({ ...formData, points: Number(e.target.value) })
              }
              className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded-lg p-3 text-[#ece5d8] focus:border-[#d3bc8e] outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={
              createScoreMutation.isPending ||
              !formData.game ||
              !formData.contributor
            }
            className="w-full bg-[#d3bc8e] text-[#1e2130] font-bold py-3 rounded-lg hover:bg-[#e6cfa3] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6 shadow-lg shadow-[#d3bc8e]/10"
          >
            {createScoreMutation.isPending ? "Logging Score..." : "Log Score"}
          </button>
        </form>
      </BaseModal>
    </>
  );
}
