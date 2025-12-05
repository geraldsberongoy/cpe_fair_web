"use client";

import { Plus, Trash2, Users } from "lucide-react";
import PlayerSelector from "./PlayerSelector";
import { Player } from "@/services/player.service";

interface GroupSectionProps {
  groupName: string;
  onGroupNameChange: (val: string) => void;
  members: string[];
  setMembers: (members: string[]) => void;
  players: Player[];
}

export default function GroupSection({
  groupName,
  onGroupNameChange,
  members,
  setMembers,
  players,
}: GroupSectionProps) {
  const handleMemberChange = (index: number, val: string) => {
    const newMembers = [...members];
    newMembers[index] = val;
    setMembers(newMembers);
  };

  const handleAddMember = () => {
    setMembers([...members, ""]);
  };

  const handleRemoveMember = (index: number) => {
    const newMembers = [...members];
    newMembers.splice(index, 1);
    setMembers(newMembers);
  };

  return (
    <div className="bg-[#161822] p-4 rounded-lg border border-[#3b3f54]/50 space-y-4">
      <div className="flex items-center gap-2 mb-2 border-b border-[#3b3f54] pb-2">
        <Users size={16} className="text-[#d3bc8e]" />
        <span className="text-sm font-bold text-[#d3bc8e]">Group Details</span>
      </div>

      {/* Group Name */}
      <div>
        <label className="block text-xs font-bold mb-1.5 text-[#8a8d99]">
          Group / Team Name
        </label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => onGroupNameChange(e.target.value)}
          placeholder="e.g. Team Alpha, The Warriors"
          className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded p-2 text-[#ece5d8] focus:border-[#d3bc8e] outline-none text-sm"
        />
      </div>

      {/* Dynamic Members List */}
      <div>
        <label className="block text-xs font-bold mb-1.5 text-[#8a8d99]">
          Members
        </label>
        <div className="space-y-2">
          {members.map((member, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="grow">
                <PlayerSelector
                  value={member}
                  onChange={(val) => handleMemberChange(index, val)}
                  players={players}
                  placeholder={`Member ${index + 1}`}
                  showIcon={true}
                />
              </div>

              {members.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMember(index)}
                  className="p-2 text-[#8a8d99] hover:text-red-400 hover:bg-red-900/20 rounded transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddMember}
          className="mt-3 text-xs flex items-center gap-1 text-[#d3bc8e] hover:text-[#e6cfa3] font-bold"
        >
          <Plus size={14} /> Add Another Member
        </button>
      </div>
    </div>
  );
}
