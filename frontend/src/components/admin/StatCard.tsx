import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => (
  <div className="bg-[#1e2130]/80 border border-[#d3bc8e]/30 p-6 rounded-xl flex items-center justify-between hover:border-[#d3bc8e] transition-all duration-300 group shadow-[0_0_15px_rgba(0,0,0,0.3)] backdrop-blur-sm relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
       <Icon size={64} />
    </div>
    <div className="relative z-10">
      <p className="text-[#d3bc8e] text-xs font-bold uppercase tracking-wider mb-1 opacity-80">{title}</p>
      <h3 className="text-2xl font-serif font-bold text-[#ece5d8]">{value}</h3>
    </div>
    <div className={`p-3 rounded-full bg-[#d3bc8e]/10 border border-[#d3bc8e]/20 group-hover:bg-[#d3bc8e]/20 transition-colors relative z-10`}>
      <Icon size={24} className="text-[#ece5d8]" />
    </div>
  </div>
);

export default StatCard;
