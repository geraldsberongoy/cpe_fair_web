"use client";

import { useState, useEffect } from "react";
import { useUpdateScore } from "@/hooks/useScore";
import { Edit2, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import { Score } from "@/types/score";

import BaseModal from "@/components/ui/base-modal";

interface EditScoreModalProps {
  score: Score;
  trigger?: React.ReactNode;
}

export default function EditScoreModal({
  score,
  trigger,
}: EditScoreModalProps) {
  const [open, setOpen] = useState(false);
  const updateScore = useUpdateScore();

  const [formData, setFormData] = useState({
    points: score.points,
  });

  // Reset form when score changes
  useEffect(() => {
    setFormData({
      points: score.points,
    });
  }, [score]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateScore.mutateAsync({
        id: score.id,
        data: { points: formData.points },
      });
      setOpen(false);
      toast.success("Score updated successfully!");
    } catch (error) {
      toast.error("Failed to update score.");
    }
  };

  return (
    <>
      {trigger ? (
        <div onClick={() => setOpen(true)}>{trigger}</div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="p-1.5 cursor-pointer hover:bg-[#3b3f54] rounded text-[#d3bc8e] transition-all"
          title="Edit score"
        >
          <Edit2 size={14} />
        </button>
      )}

      <BaseModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Edit Score"
        icon={Edit2}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Team (Read-only) */}
          <div>
            <label className="text-xs font-bold text-[#8a8d99] uppercase tracking-wider mb-2 block text-left">
              Team
            </label>
            <input
              type="text"
              value={score.teamName || "Unknown"}
              disabled
              className="w-full bg-[#0c0e16] border border-[#2a2d3a] rounded-xl py-3 px-4 text-[#6b6e7e] cursor-not-allowed"
            />
          </div>

          {/* Game (Read-only) */}
          <div>
            <label className="text-xs font-bold text-[#8a8d99] uppercase tracking-wider mb-2 block text-left">
              Game
            </label>
            <input
              type="text"
              value={score.game}
              disabled
              className="w-full bg-[#0c0e16] border border-[#2a2d3a] rounded-xl py-3 px-4 text-[#6b6e7e] cursor-not-allowed"
            />
          </div>

          {/* Category (Read-only) */}
          <div>
            <label className="text-xs font-bold text-[#8a8d99] uppercase tracking-wider mb-2 block text-left">
              Category
            </label>
            <input
              type="text"
              value={score.category}
              disabled
              className="w-full bg-[#0c0e16] border border-[#2a2d3a] rounded-xl py-3 px-4 text-[#6b6e7e] cursor-not-allowed"
            />
          </div>

          {/* Contributor (Read-only) */}
          <div>
            <label className="text-xs font-bold text-[#8a8d99] uppercase tracking-wider mb-2 block text-left">
              Contributor
            </label>
            <input
              type="text"
              value={score.contributor}
              disabled
              className="w-full bg-[#0c0e16] border border-[#2a2d3a] rounded-xl py-3 px-4 text-[#6b6e7e] cursor-not-allowed"
            />
          </div>

          {/* Points (Editable) */}
          <div>
            <label className="text-xs font-bold text-[#8a8d99] uppercase tracking-wider mb-2 block text-left">
              Points
            </label>
            <input
              type="number"
              value={formData.points}
              onChange={(e) =>
                setFormData({ ...formData, points: Number(e.target.value) })
              }
              className="w-full bg-[#161822] border border-[#3b3f54] focus:border-[#d3bc8e] rounded-xl py-3 px-4 text-[#ece5d8] outline-none transition-colors"
              autoFocus
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
              disabled={updateScore.isPending}
              className="px-8 py-3 bg-[#d3bc8e] hover:bg-[#e6cfa3] disabled:opacity-50 text-[#1e2130] font-bold uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(211,188,142,0.4)] flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95"
            >
              {updateScore.isPending ? (
                <div className="w-4 h-4 border-2 border-[#1e2130] border-t-transparent rounded-full animate-spin" />
              ) : (
                <Sparkles size={18} />
              )}
              {updateScore.isPending ? "Updating..." : "Update Points"}
            </button>
          </div>
        </form>
      </BaseModal>
    </>
  );
}
