"use client";

import { useState, useEffect } from "react";
import AdminLogin from "../../components/AdminLogin";
import { authService } from "../../services/auth.service";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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
        return <div className="flex items-center justify-center h-screen bg-[#0c0e16] text-[#ece5d8]">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <AdminLogin onLogin={handleLogin} />;
    }

    return (
        <div className="p-8 bg-[#0c0e16] min-h-screen text-[#ece5d8]">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-[#d3bc8e]">Admin Dashboard</h1>
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
            
            {/* Add your admin components here */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-[#1e2130]/50 border border-[#3b3f54] rounded-xl">
                    <h3 className="text-xl font-bold mb-2">Manage Games</h3>
                    <p className="text-[#8a8d99]">Create, update, or delete games.</p>
                </div>
                <div className="p-6 bg-[#1e2130]/50 border border-[#3b3f54] rounded-xl">
                    <h3 className="text-xl font-bold mb-2">Manage Players</h3>
                    <p className="text-[#8a8d99]">Add or remove players from teams.</p>
                </div>
                <div className="p-6 bg-[#1e2130]/50 border border-[#3b3f54] rounded-xl">
                    <h3 className="text-xl font-bold mb-2">Manage Scores</h3>
                    <p className="text-[#8a8d99]">Update team scores and points.</p>
                </div>
            </div>
        </div>
    );
}