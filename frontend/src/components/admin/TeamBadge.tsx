import React from 'react';
import { TEAM_ASSETS } from './constants';

interface TeamBadgeProps {
  teamId: string;
  teams: any[];
}

const TeamBadge: React.FC<TeamBadgeProps> = ({ teamId, teams }) => {
  const team = teams.find((t: any) => t.id === teamId);
  if (!team) return <span className="text-xs text-gray-500">Unknown Team</span>;
  
  const assets = TEAM_ASSETS[team.name] || { color: 'bg-gray-500', text: 'text-white', icon: '🏳️' };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-2 border border-white/10 w-fit bg-[#2d3042] shadow-sm`}>
      <span className={`w-3 h-3 rounded-full ${assets.color} shadow-[0_0_5px_currentColor]`}></span>
      <span className="text-[#ece5d8]">{team.name}</span>
    </span>
  );
};

export default TeamBadge;
