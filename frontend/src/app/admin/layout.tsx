"use client";

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Users, 
  Settings, 
  LogOut,
  Sparkles,
  Gamepad
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import AdminLogin from '@/components/AdminLogin';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  // Check Auth
  useEffect(() => {
    const key = localStorage.getItem('celestia_admin_key');
    if (key) {
      setIsAuthenticated(true);
      setAdminKey(key);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (key: string) => {
    localStorage.setItem('celestia_admin_key', key);
    setAdminKey(key);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('celestia_admin_key');
    setIsAuthenticated(false);
    setAdminKey('');
    router.push('/admin');
  };

  const navigateTo = (path: string) => {
    router.push(`/admin/${path}`);
  };

  const isActive = (path: string) => pathname.includes(path);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#0c0e16] text-[#ece5d8] font-sans selection:bg-[#d3bc8e] selection:text-[#1e2130] relative overflow-x-hidden">
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e2130] via-[#0c0e16] to-[#0c0e16]"></div></div>

      <aside className="fixed left-0 top-0 h-full w-20 bg-[#161822]/90 border-r border-[#d3bc8e]/20 flex flex-col items-center py-8 z-20 backdrop-blur-md">
        <div className="mb-12"><div className="w-12 h-12 bg-gradient-to-br from-[#d3bc8e] to-[#a48b60] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(211,188,142,0.4)]"><Sparkles size={24} className="text-[#1e2130]" /></div></div>
        <nav className="flex flex-col gap-8 flex-1">
          <button onClick={() => navigateTo('overview')} className={`p-3 rounded-2xl transition-all ${isActive('overview') ? 'bg-[#2d3042] text-[#d3bc8e] shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]' : 'text-[#8a8d99] hover:text-[#ece5d8]'}`}><Activity size={24} /></button>
          <button onClick={() => navigateTo('registry')} className={`p-3 rounded-2xl transition-all ${isActive('registry') ? 'bg-[#2d3042] text-[#d3bc8e] shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]' : 'text-[#8a8d99] hover:text-[#ece5d8]'}`}><Users size={24} /></button>
          <button onClick={() => navigateTo('settings')} className={`p-3 rounded-2xl transition-all ${isActive('settings') ? 'bg-[#2d3042] text-[#d3bc8e] shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]' : 'text-[#8a8d99] hover:text-[#ece5d8]'}`}><Settings size={24} /></button>
          <button onClick={() => navigateTo('games')} className={`p-3 rounded-2xl transition-all ${isActive('games') ? 'bg-[#2d3042] text-[#d3bc8e] shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]' : 'text-[#8a8d99] hover:text-[#ece5d8]'}`}><Gamepad size={24} /></button>
        </nav>
        <button onClick={handleLogout} className="p-3 text-[#8a8d99] hover:text-red-400"><LogOut size={24} /></button>
      </aside>

      <main className="pl-20 relative z-10">
        <header className="h-20 border-b border-[#d3bc8e]/20 flex items-center justify-between px-8 bg-[#0c0e16]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-baseline gap-3"><h1 className="text-2xl font-serif font-bold tracking-wider uppercase text-[#ece5d8]">Celestia Terminal</h1><span className="text-[#d3bc8e] font-serif italic tracking-wide text-sm opacity-80">/// CPE FAIR 2024</span></div>
          <div className="flex items-center gap-4"><div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-[#d3bc8e]/10 border border-[#d3bc8e]/30 rounded-full text-xs text-[#d3bc8e] font-serif tracking-widest"><div className="w-2 h-2 bg-[#d3bc8e] rounded-full animate-[pulse_3s_infinite]"></div>AKASHA NETWORK CONNECTED</div></div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
