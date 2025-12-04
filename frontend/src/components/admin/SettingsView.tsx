import React from 'react';

interface SettingsViewProps {
  teams: any[];
  logs: any[];
}

const SettingsView: React.FC<SettingsViewProps> = ({ teams, logs }) => (
  <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
    <div className="mb-8"><h2 className="text-2xl font-serif font-bold text-[#ece5d8] uppercase tracking-widest mb-2">Akasha System Config</h2><p className="text-[#8a8d99]">Manage Irminsul data.</p></div>
    <div className="bg-[#1e2130]/80 border border-[#d3bc8e]/20 rounded-xl p-8 mb-6"><div className="flex justify-between"><h3 className="text-lg font-bold text-[#ece5d8]">Data Export</h3><button className="px-6 py-2 bg-[#2d3042] text-[#ece5d8] rounded-lg border border-[#3b3f54]">Download CSV</button></div></div>
  </div>
);

export default SettingsView;
