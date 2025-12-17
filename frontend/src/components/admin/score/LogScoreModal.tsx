"use client";

import { useState, useEffect, useMemo } from "react";
import { useGames } from "@/hooks/useGame";
import { useCreateScore } from "@/hooks/useScore";
import { useTeams } from "@/hooks/useTeams";
import { Users } from "lucide-react";
import { Team } from "@/services/team.service";
import { Game } from "@/types/game";
import { toast } from "react-toastify";
import BaseModal from "@/components/ui/base-modal";

import GameSelector from "./GameSelector";
import PlayerSelector from "./PlayerSelector";
import GroupSection from "./GroupSection";

interface LogScoreModalProps {
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  prefilledGame?: Game;
}

export default function LogScoreModal({
  trigger,
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  prefilledGame,
}: LogScoreModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = externalIsOpen !== undefined;
  const open = isControlled ? externalIsOpen : internalOpen;

  const handleClose = () => {
    if (isControlled) {
      externalOnClose?.();
    } else {
      setInternalOpen(false);
    }
  };

  const { data: gamesData = [], isLoading: gamesLoading } = useGames();
  const { data: teams = [], isLoading: teamsLoading } = useTeams();

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

  // --- Pre-fill Game ---
  useEffect(() => {
    if (open && prefilledGame) {
      setFormData((prev) => ({
        ...prev,
        game: prefilledGame.name,
        category: prefilledGame.category,
        isGroup: prefilledGame.is_group,
        contributor: "",
      }));
      if (prefilledGame.is_group) {
        setMembers(["", ""]);
      }
    }
  }, [open, prefilledGame]);

  // --- Auto-select first team ---
  useEffect(() => {
    if (teams.length > 0 && !formData.teamId) {
      setFormData((prev) => ({ ...prev, teamId: teams[0].id }));
    }
  }, [teams, formData.teamId]);

  // --- Get selected team name for server-side player search ---
  const selectedTeamName = useMemo(() => {
    const selectedTeam = teams.find((t: Team) => t.id === formData.teamId);
    return selectedTeam?.section_represented || selectedTeam?.name || "";
  }, [teams, formData.teamId]);

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
          handleClose();
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
      {!isControlled &&
        (trigger || (
          <button
            onClick={() => setInternalOpen(true)}
            className="w-full cursor-pointer bg-[#d3bc8e] text-[#1e2130] font-bold py-3 px-4 rounded-lg hover:bg-[#e6cfa3] transition-all shadow-lg"
          >
            Log Score
          </button>
        ))}

      <BaseModal
        isOpen={open}
        onClose={handleClose}
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
                    {t.name} ({t.section_represented})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* 2. Game Selector */}
          <GameSelector
            games={gamesData}
            isLoading={gamesLoading}
            selectedGameName={formData.game}
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
