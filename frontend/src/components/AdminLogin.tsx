import React, { useState } from 'react';
import { Shield, Lock, ChevronRight, AlertCircle } from 'lucide-react';
import { authService } from '../services/auth.service';
import { toast } from 'react-toastify';

interface AdminLoginProps {
  onLogin: (key: string) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const isValid = await authService.login(password);

      if (isValid) {
        toast.success('Access Granted: Welcome, Admin.');
        // Success! Pass the key up to the parent
        onLogin(password);
      } else {
        const errorMsg = 'Access Denied: Invalid Celestia Code';
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      const errorMsg = 'Connection Error: Is the backend running?';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0c0e16] flex items-center justify-center z-50 p-4 font-sans text-[#ece5d8]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#d3bc8e] rounded-full filter blur-[100px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-10 animate-pulse delay-75"></div>
      </div>

      <div className="bg-[#1e2130]/80 border border-[#d3bc8e]/30 p-8 rounded-[2rem] w-full max-w-md backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.5)] relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#d3bc8e] to-[#a48b60] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg rotate-3 hover:rotate-6 transition-transform">
            <Shield size={32} className="text-[#1e2130]" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#ece5d8] tracking-widest uppercase">
            Celestia Gate
          </h1>
          <p className="text-[#8a8d99] text-sm mt-2">Restricted Access: Irminsul Admins Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#d3bc8e] uppercase tracking-wider ml-1">Access Code</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-[#8a8d99] group-focus-within:text-[#d3bc8e] transition-colors" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full bg-[#161822] border border-[#3b3f54] focus:border-[#d3bc8e] rounded-xl py-3 pl-12 pr-4 text-[#ece5d8] outline-none transition-all placeholder:text-[#4e5266]"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs mt-2 ml-1 animate-in slide-in-from-left-1">
                <AlertCircle size={12} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <button 
            type="submit"
            disabled={isLoading || !password}
            className="w-full py-4 bg-[#d3bc8e] hover:bg-[#e6cfa3] disabled:opacity-50 disabled:cursor-not-allowed text-[#1e2130] font-bold uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(211,188,142,0.3)] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <span className="animate-pulse">Verifying...</span>
            ) : (
              <>
                <span>Enter Terminal</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
