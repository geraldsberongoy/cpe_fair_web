import React, { useState, useEffect } from 'react';
import { X, Gamepad2, Sparkles } from 'lucide-react';
import { CreateGameDto, GameCategory, Game } from '@/types/game';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateGameDto) => void;
  isLoading?: boolean;
  initialData?: Game | null;
}

const CATEGORIES: GameCategory[] = ["Sports", "Board", "Quiz Bee", "Esports", "Talents", "Mini Games"];

const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose, onSubmit, isLoading = false, initialData = null }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<GameCategory>('Sports');
  const [isGroup, setIsGroup] = useState(false);
  const [details, setDetails] = useState('');

  useEffect(() => {
    if (isOpen && initialData) {
      setName(initialData.name);
      setCategory(initialData.category);
      setIsGroup(initialData.is_group);
      setDetails(initialData.details || '');
    } else if (isOpen && !initialData) {
      setName('');
      setCategory('Sports');
      setIsGroup(false);
      setDetails('');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      category,
      is_group: isGroup,
      details
    });
    if (!initialData) {
        setName('');
        setCategory('Sports');
        setIsGroup(false);
        setDetails('');
    }
    // Don't close here, let parent handle it or close on success
  };

  return (
    <div className="fixed inset-0 bg-[#0c0e16]/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-[#1e2130] border-2 border-[#d3bc8e]/40 rounded-[2rem] w-full max-w-md overflow-hidden shadow-[0_0_50px_rgba(211,188,142,0.1)] relative">
        <div className="bg-[#161822] p-6 flex justify-between items-center border-b border-[#d3bc8e]/20 sticky top-0 z-30">
          <h2 className="text-xl font-serif font-bold text-[#d3bc8e] tracking-widest uppercase flex items-center gap-3">
            <Gamepad2 size={24} />
            {initialData ? 'Edit Game' : 'Add New Game'}
          </h2>
          <button onClick={onClose} className="text-[#8a8d99] hover:text-[#ece5d8] transition-colors bg-[#2d3042] p-2 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="text-xs font-bold text-[#8a8d99] uppercase tracking-wider mb-2 block">Game Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Valorant"
              required
              className="w-full bg-[#161822] border border-[#3b3f54] focus:border-[#d3bc8e] rounded-xl py-3 px-4 text-[#ece5d8] outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#8a8d99] uppercase tracking-wider mb-2 block">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as GameCategory)}
              className="w-full bg-[#161822] border border-[#3b3f54] focus:border-[#d3bc8e] rounded-xl py-3 px-4 text-[#ece5d8] outline-none appearance-none cursor-pointer transition-colors"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
             <label className="text-xs font-bold text-[#8a8d99] uppercase tracking-wider mb-2 block">Details (Optional)</label>
             <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Brief description or rules..."
                className="w-full bg-[#161822] border border-[#3b3f54] focus:border-[#d3bc8e] rounded-xl py-3 px-4 text-[#ece5d8] outline-none transition-colors min-h-[80px]"
             />
          </div>

          <div className="flex items-center gap-3 p-4 bg-[#161822] rounded-xl border border-[#3b3f54]">
            <input
              type="checkbox"
              id="isGroup"
              checked={isGroup}
              onChange={(e) => setIsGroup(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-[#d3bc8e] focus:ring-[#d3bc8e]"
            />
            <label htmlFor="isGroup" className="text-sm font-bold text-[#ece5d8] cursor-pointer select-none">
              Is this a Group/Party Game?
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-[#d3bc8e]/20">
            <button type="button" onClick={onClose} className="px-6 py-3 text-[#8a8d99] font-bold hover:text-[#ece5d8] transition-colors">Cancel</button>
            <button 
              type="submit"
              disabled={isLoading || !name}
              className="px-8 py-3 bg-[#d3bc8e] hover:bg-[#e6cfa3] disabled:opacity-50 text-[#1e2130] font-bold uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(211,188,142,0.4)] flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95"
            >
              {isLoading ? <div className="w-4 h-4 border-2 border-[#1e2130] border-t-transparent rounded-full animate-spin" /> : <Sparkles size={18} />}
              {initialData ? 'Update Game' : 'Create Game'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameModal;
