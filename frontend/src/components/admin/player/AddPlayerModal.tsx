"use client";

import { useState, useEffect } from "react";
import { useCreatePlayer } from "@/hooks/usePlayer";
import { useTeams } from "@/hooks/useTeams";
import { UserPlus } from "lucide-react";
import { Team } from "@/services/team.service";
import { toast } from "react-toastify";
import BaseModal from "@/components/ui/base-modal";

interface AddPlayerModalProps {
  trigger?: React.ReactNode;
}

export default function AddPlayerModal({ trigger }: AddPlayerModalProps) {
  const [open, setOpen] = useState(false);
  const { data: teams = [], isLoading: teamsLoading } = useTeams();
  const createPlayerMutation = useCreatePlayer();

  // --- Form State ---
  const [formData, setFormData] = useState({
    full_name: "",
    cys: "",
    teamId: "",
  });

  // --- Auto-select first team ---
  useEffect(() => {
    if (teams.length > 0 && !formData.teamId) {
      setFormData((prev) => ({ ...prev, teamId: teams[0].id }));
    }
  }, [teams, formData.teamId]);

  // --- Handlers ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.full_name.trim()) {
      toast.error("Please enter player's full name");
      return;
    }

    if (!formData.cys.trim()) {
      toast.error("Please enter player's CYS");
      return;
    }

    if (!formData.teamId) {
      toast.error("Please select a team");
      return;
    }

    createPlayerMutation.mutate(
      {
        full_name: formData.full_name,
        cys: formData.cys,
        teamId: formData.teamId,
      },
      {
        onSuccess: () => {
          // Reset Form
          setFormData({
            full_name: "",
            cys: "",
            teamId: teams[0]?.id || "",
          });
          setOpen(false);
          toast.success("Player added successfully!");
        },
        onError: (err) => {
          console.error(err);
          toast.error("Failed to add player.");
        },
      }
    );
  };

  return (
    <>
      {trigger || (
        <button
          onClick={() => setOpen(true)}
          className="w-full py-3 px-4 bg-[#2d3042] hover:bg-[#3b3f54] text-[#ece5d8] rounded-xl font-bold text-xs uppercase tracking-wide border border-[#3b3f54] transition-colors shadow-lg"
        >
          Add Player
        </button>
      )}

      <BaseModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Add Player"
        icon={UserPlus}
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Full Name */}
          <div>
            <label className="block text-xs font-bold mb-1.5 text-[#8a8d99] uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              placeholder="Enter player's full name"
              className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded-lg p-3 text-[#ece5d8] placeholder:text-[#4f5364] focus:border-[#d3bc8e] outline-none transition-colors"
            />
          </div>

          {/* 2. CYS */}
          <div>
            <label className="block text-xs font-bold mb-1.5 text-[#8a8d99] uppercase tracking-wider">
              CYS (Course, Year, Section)
            </label>
            <input
              type="text"
              value={formData.cys}
              onChange={(e) =>
                setFormData({ ...formData, cys: e.target.value })
              }
              placeholder="e.g., BSCS-3A"
              className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded-lg p-3 text-[#ece5d8] placeholder:text-[#4f5364] focus:border-[#d3bc8e] outline-none transition-colors"
            />
          </div>

          {/* 3. Team Selector */}
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
                  setFormData({ ...formData, teamId: e.target.value })
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

          <button
            type="submit"
            disabled={
              createPlayerMutation.isPending ||
              !formData.full_name.trim() ||
              !formData.cys.trim() ||
              !formData.teamId
            }
            className="w-full bg-[#d3bc8e] text-[#1e2130] font-bold py-3 rounded-lg hover:bg-[#e6cfa3] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6 shadow-lg shadow-[#d3bc8e]/10"
          >
            {createPlayerMutation.isPending ? "Adding Player..." : "Add Player"}
          </button>
        </form>
      </BaseModal>
    </>
  );
}
