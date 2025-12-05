"use client";

import { useState, useEffect } from "react";
import { useUpdatePlayer } from "@/hooks/usePlayer";
import { Edit2, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import { Player } from "@/types/player";
import BaseModal from "@/components/ui/base-modal";

interface EditPlayerModalProps {
  player: Player;
  trigger?: React.ReactNode;
}

export default function EditPlayerModal({
  player,
  trigger,
}: EditPlayerModalProps) {
  const [open, setOpen] = useState(false);
  const updatePlayer = useUpdatePlayer();

  const [formData, setFormData] = useState({
    full_name: player.full_name,
    cys: player.cys,
    teamId: player.teamId || "",
  });

  // Reset form when player changes
  useEffect(() => {
    setFormData({
      full_name: player.full_name,
      cys: player.cys,
      teamId: player.teamId || "",
    });
  }, [player]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.full_name.trim()) {
      toast.error("Player name is required");
      return;
    }

    try {
      await updatePlayer.mutateAsync({
        id: player.id,
        data: {
          full_name: formData.full_name,
          // CYS and teamId are read-only, don't update them
        },
      });
      setOpen(false);
      toast.success("Player updated successfully!");
    } catch (error) {
      toast.error("Failed to update player.");
    }
  };

  return (
    <>
      {trigger ? (
        <div onClick={() => setOpen(true)}>{trigger}</div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="p-1.5 hover:bg-[#3b3f54] rounded text-[#d3bc8e] transition-all"
          title="Edit player"
        >
          <Edit2 size={14} />
        </button>
      )}

      <BaseModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Edit Player"
        icon={Edit2}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Player Name */}
          <div>
            <label className="text-xs font-bold text-[#8a8d99] uppercase tracking-wider mb-2 block text-left">
              Player Name
            </label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              className="w-full bg-[#161822] border border-[#3b3f54] focus:border-[#d3bc8e] rounded-xl py-3 px-4 text-[#ece5d8] outline-none transition-colors"
              placeholder="Enter player name"
              autoFocus
            />
          </div>

          {/* CYS (Read-only) */}
          <div>
            <label className="text-xs font-bold text-[#8a8d99] uppercase tracking-wider mb-2 block text-left">
              CYS
            </label>
            <input
              type="text"
              value={formData.cys}
              disabled
              className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded-xl py-3 px-4 text-[#8a8d99] outline-none cursor-not-allowed opacity-60"
              placeholder="e.g., 1st Year - A Section"
            />
          </div>

          {/* Team (Read-only) */}
          <div>
            <label className="text-xs font-bold text-[#8a8d99] uppercase tracking-wider mb-2 block text-left">
              Team / Section
            </label>
            <input
              type="text"
              value={player.teamName ? `${player.teamName} (${player.sectionRepresented})` : "Unassigned"}
              disabled
              className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded-xl py-3 px-4 text-[#8a8d99] outline-none cursor-not-allowed opacity-60"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-[#d3bc8e]/20">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-6 py-3 text-[#8a8d99] font-bold hover:text-[#ece5d8] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updatePlayer.isPending}
              className="px-8 py-3 bg-[#d3bc8e] hover:bg-[#e6cfa3] disabled:opacity-50 text-[#1e2130] font-bold uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(211,188,142,0.4)] flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95"
            >
              {updatePlayer.isPending ? (
                <div className="w-4 h-4 border-2 border-[#1e2130] border-t-transparent rounded-full animate-spin" />
              ) : (
                <Sparkles size={18} />
              )}
              {updatePlayer.isPending ? "Updating..." : "Update Player"}
            </button>
          </div>
        </form>
      </BaseModal>
    </>
  );
}
