import React, { useState, useEffect } from 'react';
import { Sparkles, X, User, Tent, Gamepad2, Search, Check } from 'lucide-react';
import { TEAM_ASSETS, SOLO_GAMES, GROUP_GAMES } from './constants';

interface ScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  teams: any[];
  availablePlayers: any[];
  initialData?: any;
  isLoading?: boolean;
}

const ScoreModal: React.FC<ScoreModalProps> = ({ isOpen, onClose, onSubmit, teams, availablePlayers, initialData = null, isLoading = false }) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [points, setPoints] = useState('');
  const [game, setGame] = useState('');
  const [isGroup, setIsGroup] = useState(false);
  const [contributorName, setContributorName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]); 
  const [memberSearch, setMemberSearch] = useState('');

  useEffect(() => {
    if (isOpen && initialData) {
      setSelectedTeam(initialData.teamId);
      setPoints(String(initialData.points));
      setContributorName(initialData.contributor || '');
      setIsGroup(initialData.isGroup || false);
      setSelectedMembers(initialData.members || []);
      
      const allGames = [...SOLO_GAMES, ...GROUP_GAMES];
      // Try to match label to value if stored as label
      const gameObj = allGames.find(g => g.label === initialData.game || g.value === initialData.game);
      setGame(gameObj ? gameObj.value : initialData.game);
    } else if (isOpen && !initialData) {
      setSelectedTeam(null);
      setPoints('');
      setContributorName('');
      setIsGroup(false);
      setSelectedMembers([]);
      setGame('');
    }
  }, [isOpen, initialData]);

  const handleGameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setGame(selectedValue);
    const isGroupGame = GROUP_GAMES.some(g => g.value === selectedValue);
    const isSoloGame = SOLO_GAMES.some(g => g.value === selectedValue);
    if (isGroupGame) setIsGroup(true);
    else if (isSoloGame) setIsGroup(false);
  };

  const toggleMember = (playerFullName: string) => {
    if (selectedMembers.includes(playerFullName)) {
      setSelectedMembers(selectedMembers.filter(m => m !== playerFullName));
    } else {
      setSelectedMembers([...selectedMembers, playerFullName]);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selectedTeam && points && game) {
      const allGames = [...SOLO_GAMES, ...GROUP_GAMES];
      const gameObj = allGames.find(g => g.value === game);
      const gameLabel = gameObj?.label || game;
      const gameCategory = gameObj?.category || "General";
      const finalContributor = contributorName || (isGroup ? 'Unnamed Party' : 'Traveler');

      onSubmit({
        teamId: selectedTeam,
        points: Number(points),
        game: gameLabel,
        category: gameCategory,
        contributor: finalContributor,
        isGroup,
        members: selectedMembers 
      });
      
      if (!initialData) {
        setPoints('');
        setContributorName('');
        setSelectedMembers([]);
        setSelectedTeam(null);
        setGame('');
        setIsGroup(false);
      }
      onClose();
    }
  };

  const selectedTeamObj = teams.find(t => t.id === selectedTeam);
  const targetSection = selectedTeamObj?.section_represented || selectedTeamObj?.name;

  const filteredPlayers = availablePlayers.filter((p: any) => {
    const matchesSearch = p.full_name.toLowerCase().includes(memberSearch.toLowerCase()) || 
                          p.cys.toLowerCase().includes(memberSearch.toLowerCase());
    
    // If a team is selected, only show players from that team's section (checking both name and section_represented)
    const matchesTeam = targetSection ? (
      p.team?.name === targetSection || 
      p.team?.section_represented === targetSection
    ) : true;
    
    return matchesSearch && matchesTeam;
  });

  return (
    <div className="fixed inset-0 bg-[#0c0e16]/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-[#1e2130] border-2 border-[#d3bc8e]/40 rounded-[2rem] w-full max-w-3xl overflow-hidden shadow-[0_0_50px_rgba(211,188,142,0.1)] relative max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="bg-[#161822] p-6 flex justify-between items-center border-b border-[#d3bc8e]/20 sticky top-0 z-30">
          <h2 className="text-xl font-serif font-bold text-[#d3bc8e] tracking-widest uppercase flex items-center gap-3">
            <Sparkles size={18} />
            {initialData ? 'Edit Log' : 'Log Commission'}
          </h2>
          <button onClick={onClose} className="text-[#8a8d99] hover:text-[#ece5d8] transition-colors bg-[#2d3042] p-2 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 relative z-10 overflow-y-auto">
          <div className="flex justify-center mb-8">
            <div className="bg-[#0c0e16] p-1 rounded-full border border-[#3b3f54] flex">
              <button
                onClick={() => setIsGroup(false)}
                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2
                  ${!isGroup ? 'bg-[#d3bc8e] text-[#1e2130] shadow-lg' : 'text-[#8a8d99] hover:text-[#ece5d8]'}
                `}
              >
                <User size={16} /> Solo
              </button>
              <button
                onClick={() => setIsGroup(true)}
                className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2
                  ${isGroup ? 'bg-[#d3bc8e] text-[#1e2130] shadow-lg' : 'text-[#8a8d99] hover:text-[#ece5d8]'}
                `}
              >
                <Tent size={16} /> Party
              </button>
            </div>
          </div>

          <label className="text-xs font-bold text-[#8a8d99] uppercase tracking-wider mb-4 block">Select Nation</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {teams.map((team: any) => {
                const assets = TEAM_ASSETS[team.name] || { color: 'bg-gray-500', text: 'text-white', icon: '🏳️' };
                return (
                  <button
                    key={team.id}
                    onClick={() => setSelectedTeam(team.id)}
                    className={`
                      relative h-16 rounded-xl font-serif font-bold text-sm transition-all duration-200
                      flex items-center justify-center gap-2 shadow-md
                      ${selectedTeam === team.id 
                        ? `${assets.color} ${assets.text} scale-105 ring-2 ring-[#d3bc8e]` 
                        : 'bg-[#2d3042] text-[#ece5d8] border border-[#3b3f54] hover:bg-[#3b3f54] hover:border-[#d3bc8e]/50'}
                    `}
                  >
                    <span className="text-lg">{assets.icon}</span>
                    {team.name}
                  </button>
                );
            })}
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-[#8a8d99] uppercase tracking-wider mb-2 block">Event</label>
                <div className="relative group">
                  <Gamepad2 className="absolute left-4 top-3.5 text-[#8a8d99] group-focus-within:text-[#d3bc8e] transition-colors" size={20} />
                  <select 
                    value={game}
                    onChange={handleGameChange}
                    className="w-full bg-[#161822] border border-[#3b3f54] focus:border-[#d3bc8e] rounded-xl py-3 pl-12 pr-4 text-[#ece5d8] outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a Game...</option>
                    <optgroup label="Solo Quests">
                      {SOLO_GAMES.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
                    </optgroup>
                    <optgroup label="Party Commissions">
                      {GROUP_GAMES.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
                    </optgroup>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#8a8d99] uppercase tracking-wider mb-2 block">
                  {isGroup ? "Party Name" : "Adventurer Name"}
                </label>
                <input
                  type="text"
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  placeholder={isGroup ? "e.g. Sumeru Wizards" : "e.g. Aether"}
                  className="w-full bg-[#161822] border border-[#3b3f54] focus:border-[#d3bc8e] rounded-xl py-3 px-4 text-[#ece5d8] outline-none"
                />
              </div>
            </div>

            {isGroup && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300 bg-[#161822] border border-[#3b3f54] rounded-xl p-4">
                <label className="text-xs font-bold text-[#d3bc8e] uppercase tracking-wider mb-3 block flex justify-between">
                  <span>Squad Roster</span>
                  <span className="text-[#8a8d99]">{selectedMembers.length} Selected</span>
                </label>
                
                <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
                  {selectedMembers.length === 0 && <span className="text-[#4e5266] text-sm italic py-1">No members added yet...</span>}
                  {selectedMembers.map(m => (
                    <span key={m} className="bg-[#2d3042] text-[#ece5d8] text-xs px-3 py-1 rounded-full flex items-center gap-2 border border-[#3b3f54]">
                      {m} <button onClick={() => toggleMember(m)}><X size={12} className="hover:text-red-400"/></button>
                    </span>
                  ))}
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-3 text-[#8a8d99]" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search adventurers..." 
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    className="w-full bg-[#0c0e16] border border-[#3b3f54] rounded-lg pl-10 pr-4 py-2 text-sm text-[#ece5d8] mb-2 focus:border-[#d3bc8e] outline-none"
                  />
                  
                  <div className="max-h-32 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
                    {filteredPlayers.map((p: any) => {
                      const isSelected = selectedMembers.includes(p.full_name);
                      return (
                        <button 
                          key={p.id}
                          onClick={() => toggleMember(p.full_name)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between transition-colors
                            ${isSelected ? 'bg-[#d3bc8e]/20 text-[#d3bc8e] border border-[#d3bc8e]/30' : 'text-[#8a8d99] hover:bg-[#2d3042]'}
                          `}
                        >
                          <span>{p.full_name} <span className="opacity-50 text-xs ml-2">({p.cys})</span></span>
                          {isSelected && <Check size={14} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex gap-2">
              {[100, 500, 1000].map((val) => (
                <button 
                  key={val}
                  onClick={() => setPoints(String(val))}
                  className="px-4 py-3 bg-[#161822] border border-[#3b3f54] text-[#00ffcc] font-serif font-bold hover:bg-[#2d3042] rounded-xl"
                >
                  +{val}
                </button>
              ))}
              <button onClick={() => setPoints('-50')} className="px-4 py-3 bg-[#161822] border border-[#3b3f54] text-[#ff5555] font-serif font-bold hover:bg-[#2d3042] rounded-xl">
                -50
              </button>
            </div>
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="0"
              className="flex-1 bg-[#0c0e16] border-2 border-[#3b3f54] focus:border-[#d3bc8e] rounded-xl py-3 px-4 text-[#ece5d8] font-mono text-xl text-right outline-none"
            />
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-[#d3bc8e]/20">
            <button onClick={onClose} className="px-6 py-3 text-[#8a8d99] font-bold hover:text-[#ece5d8] transition-colors">Cancel</button>
            <button 
              onClick={handleSubmit}
              disabled={!selectedTeam || !points || !game || isLoading}
              className="px-8 py-3 bg-[#d3bc8e] hover:bg-[#e6cfa3] disabled:opacity-50 text-[#1e2130] font-bold uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(211,188,142,0.4)] flex items-center gap-2"
            >
              {isLoading && <div className="w-4 h-4 border-2 border-[#1e2130] border-t-transparent rounded-full animate-spin" />}
              {initialData ? 'Update' : 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreModal;
