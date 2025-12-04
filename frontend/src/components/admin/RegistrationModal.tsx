import React, { useState } from 'react';
import { Scroll, X, UserPlus, Map } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterPlayer: (data: any) => void;
  onRegisterTeam: (data: any) => void;
  teams: any[];
  isLoading?: boolean;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onRegisterPlayer, onRegisterTeam, teams }) => {
  const [activeTab, setActiveTab] = useState('player');
  const [playerName, setPlayerName] = useState('');
  const [playerCYS, setPlayerCYS] = useState('');
  const [playerTeam, setPlayerTeam] = useState<any>(null);
  const [newTeamName, setNewTeamName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (activeTab === 'player' && playerName && playerCYS && playerTeam) {
      onRegisterPlayer({ full_name: playerName, cys: playerCYS, team_id: playerTeam });
      setPlayerName('');
      setPlayerCYS('');
      setPlayerTeam(null);
      onClose();
    } else if (activeTab === 'team' && newTeamName) {
      onRegisterTeam({ name: newTeamName });
      setNewTeamName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0c0e16]/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-[#1e2130] border-2 border-[#d3bc8e]/40 rounded-[2rem] w-full max-w-2xl shadow-[0_0_50px_rgba(211,188,142,0.1)] overflow-hidden relative">
        <div className="bg-[#161822] border-b border-[#d3bc8e]/20">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-serif font-bold text-[#d3bc8e] uppercase tracking-widest flex items-center gap-2"><Scroll size={18} /> Registry</h2>
            <button onClick={onClose} className="text-[#8a8d99] hover:text-[#ece5d8] bg-[#2d3042] p-1 rounded-full"><X size={20} /></button>
          </div>
          <div className="flex border-t border-[#d3bc8e]/10">
            <button onClick={() => setActiveTab('player')} className={`flex-1 py-4 font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${activeTab === 'player' ? 'bg-[#2d3042] text-[#d3bc8e] border-b-2 border-[#d3bc8e]' : 'text-[#8a8d99] hover:bg-[#2d3042]/50'}`}><UserPlus size={18} /> Adventurer</button>
            <button onClick={() => setActiveTab('team')} className={`flex-1 py-4 font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${activeTab === 'team' ? 'bg-[#2d3042] text-[#d3bc8e] border-b-2 border-[#d3bc8e]' : 'text-[#8a8d99] hover:bg-[#2d3042]/50'}`}><Map size={18} /> Nation</button>
          </div>
        </div>
        <div className="p-8">
          {activeTab === 'player' && (
            <div className="space-y-6">
              <div><label className="text-xs font-bold text-[#8a8d99] uppercase mb-2 block">Name</label><input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} className="w-full bg-[#161822] border border-[#3b3f54] rounded-xl p-3 text-[#ece5d8]" /></div>
              <div><label className="text-xs font-bold text-[#8a8d99] uppercase mb-2 block">CYS</label><input type="text" value={playerCYS} onChange={(e) => setPlayerCYS(e.target.value)} className="w-full bg-[#161822] border border-[#3b3f54] rounded-xl p-3 text-[#ece5d8]" /></div>
              <div><label className="text-xs font-bold text-[#8a8d99] uppercase mb-3 block">Nation</label><div className="grid grid-cols-3 gap-3">{teams.map((team: any) => (<button key={team.id} onClick={() => setPlayerTeam(team.id)} className={`p-2 rounded-lg border text-xs font-bold uppercase ${playerTeam === team.id ? 'bg-[#2d3042] text-[#d3bc8e] border-[#d3bc8e]' : 'bg-[#161822] text-[#8a8d99] border-[#3b3f54]'}`}>{team.name}</button>))}</div></div>
            </div>
          )}
          {activeTab === 'team' && (
            <div className="space-y-6"><div><label className="text-xs font-bold text-[#8a8d99] uppercase mb-2 block">Nation Name</label><input type="text" value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} className="w-full bg-[#161822] border border-[#3b3f54] rounded-xl p-3 text-[#ece5d8]" /></div></div>
          )}
          <div className="mt-8 pt-6 border-t border-[#d3bc8e]/20 flex justify-end"><button onClick={handleSubmit} className="bg-[#d3bc8e] hover:bg-[#e6cfa3] text-[#1e2130] px-8 py-3 font-bold uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(211,188,142,0.4)]">Register</button></div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
