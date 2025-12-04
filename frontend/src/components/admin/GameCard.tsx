import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Game } from '@/types/game';

interface GameCardProps {
  game: Game;
  onEdit: (game: Game) => void;
  onDelete: (id: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onEdit, onDelete }) => {
  return (
    <div className="bg-[#1e2130]/80 border border-[#d3bc8e]/20 rounded-xl p-4 shadow-lg backdrop-blur-sm hover:border-[#d3bc8e]/50 transition-all group relative min-h-[100px]">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-[#ece5d8] font-bold font-serif">
          {game.name}
        </h3>
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
      
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute right-3 bottom-3 translate-y-2 group-hover:translate-y-0 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(game);
          }}
          className="p-2 text-[#8a8d99] hover:text-[#d3bc8e] bg-[#161822]/80 hover:bg-[#161822] backdrop-blur-sm rounded-full shadow-lg border border-[#d3bc8e]/10 hover:border-[#d3bc8e]/40 transition-all transform hover:scale-110"
        >
          <Edit2 size={14} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(game.id);
          }}
          className="p-2 text-[#8a8d99] hover:text-red-400 bg-[#161822]/80 hover:bg-[#161822] backdrop-blur-sm rounded-full shadow-lg border border-[#d3bc8e]/10 hover:border-red-500/30 transition-all transform hover:scale-110"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="text-xs text-[#8a8d99] uppercase tracking-wider">
        {game.category}
      </div>
    </div>
  );
};

export default GameCard;
