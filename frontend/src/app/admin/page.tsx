"use client";

import { useState, useEffect } from "react";
import AdminLogin from "../../components/AdminLogin";
import ManageGamesScreen from "../../components/admin/manageGames";
import ManagePlayersScreen from "../../components/admin/managePlayers";
import ManageScoresScreen from "../../components/admin/manageScores";
import { authService } from "../../services/auth.service";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";

type Section = "games" | "players" | "scores";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState<Section>("games");

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated();
      setIsAuthenticated(isAuth);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = (key: string) => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    toast.info("Logged out successfully");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0c0e16] text-[#ece5d8]">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="p-8 bg-[#0c0e16] min-h-screen text-[#ece5d8]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-serif text-[#d3bc8e]">
            Admin Dashboard
          </h1>
          <p className="text-[#8a8d99]">Welcome, Admin!</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-[#1e2130] border border-[#3b3f54] hover:border-[#d3bc8e] rounded-lg text-[#ece5d8] transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* button group */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => setActive("games")}
          aria-pressed={active === "games"}
          className={`w-full sm:w-auto flex-1 text-left p-6 rounded-xl border transition ${
            active === "games"
              ? "bg-[#d3bc8e] text-[#0c0e16] border-[#d3bc8e]"
              : "bg-[#1e2130]/50 border-[#3b3f54] text-[#ece5d8]"
          }`}
        >
          <h3 className="text-xl font-bold mb-1">Manage Games</h3>
          <p className="text-[#8a8d99]">Create, update, or delete games.</p>
        </button>

        <button
          onClick={() => setActive("players")}
          aria-pressed={active === "players"}
          className={`w-full sm:w-auto flex-1 text-left p-6 rounded-xl border transition ${
            active === "players"
              ? "bg-[#d3bc8e] text-[#0c0e16] border-[#d3bc8e]"
              : "bg-[#1e2130]/50 border-[#3b3f54] text-[#ece5d8]"
          }`}
        >
          <h3 className="text-xl font-bold mb-1">Manage Players</h3>
          <p className="text-[#8a8d99]">Add or remove players from teams.</p>
        </button>

        <button
          onClick={() => setActive("scores")}
          aria-pressed={active === "scores"}
          className={`w-full sm:w-auto flex-1 text-left p-6 rounded-xl border transition ${
            active === "scores"
              ? "bg-[#d3bc8e] text-[#0c0e16] border-[#d3bc8e]"
              : "bg-[#1e2130]/50 border-[#3b3f54] text-[#ece5d8]"
          }`}
        >
          <h3 className="text-xl font-bold mb-1">Manage Scores</h3>
          <p className="text-[#8a8d99]">Update team scores and points.</p>
        </button>
      </div>

      {/* active management screen */}
      <div className="mt-4">
        {active === "games" && (
          <div className="p-6 bg-[#1e2130]/50 border border-[#3b3f54] rounded-xl">
            <ManageGamesScreen />
          </div>
        )}

        {active === "players" && (
          <div className="p-6 bg-[#1e2130]/50 border border-[#3b3f54] rounded-xl">
            <ManagePlayersScreen />
          </div>
        )}

        {active === "scores" && (
          <div className="p-6 bg-[#1e2130]/50 border border-[#3b3f54] rounded-xl">
            <ManageScoresScreen />
          </div>
        )}
      </div>
    </div>
  );
}