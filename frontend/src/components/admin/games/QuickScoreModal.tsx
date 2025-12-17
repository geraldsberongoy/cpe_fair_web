"use client";

import { useState, useEffect, useMemo } from "react";
import { useCreateScore } from "@/hooks/useScore";
import { useTeams } from "@/hooks/useTeams";
import { Trophy } from "lucide-react";
import { Team } from "@/services/team.service";
import { Game } from "@/types/game";
import { toast } from "react-toastify";
import BaseModal from "@/components/ui/base-modal";
import PlayerSelector from "@/components/admin/score/PlayerSelector";
import GroupSection from "@/components/admin/score/GroupSection";

interface QuickScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: Game;
}

export default function QuickScoreModal({
  isOpen,
  onClose,
  game,
}: QuickScoreModalProps) {
  const { data: teams = [], isLoading: teamsLoading } = useTeams();
  const createScoreMutation = useCreateScore();

  // --- Form State ---
  const [formData, setFormData] = useState({
    teamId: "",
    points: 100,
    contributor: "",
  });

  const [members, setMembers] = useState<string[]>(["", ""]);

  // --- Auto-select first team ---
  useEffect(() => {
    if (teams.length > 0 && !formData.teamId) {
      setFormData((prev) => ({ ...prev, teamId: teams[0].id }));
    }
  }, [teams, formData.teamId]);

  // --- Reset form when modal opens ---
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        points: 100,
        contributor: "",
      }));
      setMembers(["", ""]);
    }
  }, [isOpen]);

  // --- Get selected team name for server-side player search ---
  const selectedTeamName = useMemo(() => {
    const selectedTeam = teams.find((t: Team) => t.id === formData.teamId);
    return selectedTeam?.section_represented || selectedTeam?.name || "";
  }, [teams, formData.teamId]);

  // --- Handlers ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (game.is_group && members.some((m) => m.trim() === "")) {
      toast.error("Please fill in all member names");
      return;
    }

    if (!formData.contributor.trim()) {
      toast.error("Please select a contributor");
      return;
    }

    createScoreMutation.mutate(
      {
        teamId: formData.teamId,
        points: formData.points,
        game: game.name,
        category: game.category,
        contributor: formData.contributor,
        isGroup: game.is_group,
        members: game.is_group ? members : [],
      },
      {
        onSuccess: () => {
          // Reset Form
          setFormData((prev) => ({
            ...prev,
            points: 100,
            contributor: "",
          }));
          setMembers(["", ""]);
          onClose();
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
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Quick Score"
      icon={Trophy}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Game Name (Read-only) */}
        <div>
          <label className="block text-xs font-bold mb-1.5 text-[#8a8d99] uppercase tracking-wider">
            Game
          </label>
          <div className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded-lg p-3 text-[#ece5d8] flex items-center justify-between">
            <span>{game.name}</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full border ${
                game.is_group
                  ? "border-purple-500/30 text-purple-400 bg-purple-500/10"
                  : "border-blue-500/30 text-blue-400 bg-blue-500/10"
              }`}
            >
              {game.is_group ? "PARTY" : "SOLO"}
            </span>
          </div>
        </div>

        {/* Team Selector */}
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
                  {t.name} ({t.section_represented})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Player/Group Fields */}
        {game.is_group ? (
          <GroupSection
            groupName={formData.contributor}
            onGroupNameChange={(val) =>
              setFormData({ ...formData, contributor: val })
            }
            members={members}
            setMembers={setMembers}
            teamName={selectedTeamName}
          />
        ) : (
          <PlayerSelector
            label="Contributor (Player)"
            value={formData.contributor}
            onChange={(val) => setFormData({ ...formData, contributor: val })}
            teamName={selectedTeamName}
          />
        )}

        {/* Points */}
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
          disabled={createScoreMutation.isPending || !formData.contributor}
          className="w-full bg-[#d3bc8e] text-[#1e2130] font-bold py-3 rounded-lg hover:bg-[#e6cfa3] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6 shadow-lg shadow-[#d3bc8e]/10"
        >
          {createScoreMutation.isPending ? "Logging Score..." : "Log Score"}
        </button>
      </form>
    </BaseModal>
  );
}
