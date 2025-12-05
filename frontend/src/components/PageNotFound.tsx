"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import StarryBackground from "@/components/StarryBackground";

// Import oculus icons
import AnemoIcon from "@/assets/images/oculus/anemo.svg";
import CryoIcon from "@/assets/images/oculus/cryo.svg";
import DendroIcon from "@/assets/images/oculus/dendro.svg";
import ElectroIcon from "@/assets/images/oculus/electro.svg";
import GeoIcon from "@/assets/images/oculus/geo.svg";
import HydroIcon from "@/assets/images/oculus/hydro.svg";
import PyroIcon from "@/assets/images/oculus/pyro.svg";

export default function NotFound() {
  const router = useRouter();

  const elements = [
    { icon: AnemoIcon, color: "from-cyan-400/30 to-teal-300/30", glow: "rgba(34, 211, 238, 0.4)" },
    { icon: PyroIcon, color: "from-red-400/30 to-orange-400/30", glow: "rgba(239, 68, 68, 0.4)" },
    { icon: HydroIcon, color: "from-blue-400/30 to-sky-300/30", glow: "rgba(59, 130, 246, 0.4)" },
    { icon: ElectroIcon, color: "from-purple-400/30 to-violet-400/30", glow: "rgba(168, 85, 247, 0.4)" },
    { icon: DendroIcon, color: "from-green-400/30 to-lime-400/30", glow: "rgba(34, 197, 94, 0.4)" },
    { icon: CryoIcon, color: "from-cyan-300/30 to-blue-300/30", glow: "rgba(103, 232, 249, 0.4)" },
    { icon: GeoIcon, color: "from-yellow-400/30 to-amber-400/30", glow: "rgba(251, 191, 36, 0.4)" },
  ];

  return (
    <div className="bg-gradient-to-b from-[#050425] to-[#000000] flex flex-col relative overflow-hidden">
      <StarryBackground />
      
      {/* Floating Elements Background - Responsive */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {elements.map((element, i) => (
          <div
            key={i}
            className="absolute opacity-5"
            style={{
              left: `${(i * 14) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animation: `float ${8 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${element.color} blur-xl md:blur-2xl`}></div>
            <img
              src={element.icon.src}
              alt=""
              className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 opacity-30"
            />
          </div>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="min-h-screen relative z-10 flex flex-col items-center justify-center gap-4 md:gap-8 px-4 text-center max-w-4xl mx-auto py-8 md:py-12">
        {/* Ornate Card Container */}
        <div className="relative w-full">
          {/* Outer glow */}
          <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-br from-[#d3bc8e]/20 via-[#f0e6d2]/10 to-[#d3bc8e]/20 rounded-2xl md:rounded-3xl blur-xl md:blur-2xl opacity-50 animate-pulse"></div>
          
          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-[#2a2640]/80 to-[#1a1630]/90 border-2 md:border-4 border-[#d3bc8e]/50 rounded-xl md:rounded-2xl p-6 md:p-10 lg:p-12 backdrop-blur-xl shadow-2xl">
            {/* Corner ornaments - Responsive */}
            <div className="absolute top-1 left-1 md:top-2 md:left-2 w-4 h-4 md:w-8 md:h-8 border-t-2 border-l-2 md:border-t-4 md:border-l-4 border-[#f0e6d2]"></div>
            <div className="absolute top-1 right-1 md:top-2 md:right-2 w-4 h-4 md:w-8 md:h-8 border-t-2 border-r-2 md:border-t-4 md:border-r-4 border-[#f0e6d2]"></div>
            <div className="absolute bottom-1 left-1 md:bottom-2 md:left-2 w-4 h-4 md:w-8 md:h-8 border-b-2 border-l-2 md:border-b-4 md:border-l-4 border-[#f0e6d2]"></div>
            <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-4 h-4 md:w-8 md:h-8 border-b-2 border-r-2 md:border-b-4 md:border-r-4 border-[#f0e6d2]"></div>

            {/* Decorative pattern overlay */}
            <div className="absolute inset-0 opacity-5 rounded-xl md:rounded-2xl" style={{
              backgroundImage: `radial-gradient(circle, #d3bc8e 1px, transparent 1px)`,
              backgroundSize: '15px 15px',
            }}></div>

            {/* 404 Text with Glow Effect - Responsive */}
            <div className="relative mb-4 md:mb-6">
              <div className="absolute inset-0 blur-2xl md:blur-3xl bg-gradient-to-r from-[#d3bc8e]/40 via-[#f0e6d2]/40 to-[#d3bc8e]/40 animate-pulse"></div>
              <h1 className="relative text-[80px] sm:text-[100px] md:text-[140px] lg:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#f0e6d2] via-[#d3bc8e] to-[#9d8f6f] drop-shadow-[0_0_30px_rgba(211,188,142,0.8)] md:drop-shadow-[0_0_40px_rgba(211,188,142,0.8)] leading-none tracking-wider">
                404
              </h1>
            </div>

            {/* Title with decorative elements - Responsive */}
            <div className="flex flex-col gap-2 md:gap-3 mb-4 md:mb-6">
              <div className="flex items-center justify-center gap-2 md:gap-3">
                <div className="h-[1.5px] md:h-[2px] w-8 md:w-12 bg-gradient-to-r from-transparent to-[#d3bc8e]"></div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#f0e6d2] drop-shadow-[0_0_12px_rgba(240,230,210,0.6)] md:drop-shadow-[0_0_15px_rgba(240,230,210,0.6)]">
                  Page Not Found
                </h2>
                <div className="h-[1.5px] md:h-[2px] w-8 md:w-12 bg-gradient-to-l from-transparent to-[#d3bc8e]"></div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#d3bc8e] rounded-full shadow-[0_0_6px_rgba(211,188,142,0.8)] md:shadow-[0_0_8px_rgba(211,188,142,0.8)]"></div>
                <div className="h-[1px] w-16 md:w-24 bg-gradient-to-r from-transparent via-[#d3bc8e] to-transparent"></div>
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#d3bc8e] rounded-full shadow-[0_0_6px_rgba(211,188,142,0.8)] md:shadow-[0_0_8px_rgba(211,188,142,0.8)]"></div>
              </div>
            </div>

            {/* Description - Responsive */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#c8b896] max-w-md mx-auto leading-relaxed mb-6 md:mb-8 px-2">
              It seems you've wandered into an unexplored region... This page doesn't exist in our archives.
            </p>

            {/* Decorative Elements Container - Responsive */}
            <div className="flex gap-3 md:gap-6 my-4 md:my-6 justify-center">
              {[
                { icon: AnemoIcon, color: "from-cyan-400/60 to-teal-400/60" },
                { icon: PyroIcon, color: "from-red-400/60 to-orange-400/60" },
                { icon: HydroIcon, color: "from-blue-400/60 to-sky-400/60" }
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-full blur-md md:blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="relative w-10 h-10 md:w-14 md:h-14 p-2 md:p-2.5 bg-gradient-to-br from-[#2a2640]/60 to-[#1a1630]/60 border-2 border-[#d3bc8e]/40 rounded-full animate-pulse shadow-lg"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  >
                    <img src={item.icon.src} alt="" className="w-full h-full opacity-70" />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons - Responsive */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8">
              <button
                onClick={() => router.push("/")}
                className="group relative px-4 py-3 md:px-8 md:py-4 bg-gradient-to-br from-[#d3bc8e]/30 to-[#9d8f6f]/20 border-2 border-[#d3bc8e] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#f0e6d2] hover:shadow-[0_0_20px_rgba(211,188,142,0.6)] md:hover:shadow-[0_0_25px_rgba(211,188,142,0.6)] hover:scale-105"
              >
                {/* Inner corners */}
                <div className="absolute top-0.5 left-0.5 md:top-1 md:left-1 w-1.5 h-1.5 md:w-2 md:h-2 border-t border-l border-[#f0e6d2]/60"></div>
                <div className="absolute top-0.5 right-0.5 md:top-1 md:right-1 w-1.5 h-1.5 md:w-2 md:h-2 border-t border-r border-[#f0e6d2]/60"></div>
                <div className="absolute bottom-0.5 left-0.5 md:bottom-1 md:left-1 w-1.5 h-1.5 md:w-2 md:h-2 border-b border-l border-[#f0e6d2]/60"></div>
                <div className="absolute bottom-0.5 right-0.5 md:bottom-1 md:right-1 w-1.5 h-1.5 md:w-2 md:h-2 border-b border-r border-[#f0e6d2]/60"></div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-[#d3bc8e]/0 via-[#f0e6d2]/30 to-[#d3bc8e]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative text-[#f0e6d2] font-bold text-sm md:text-base lg:text-lg flex items-center justify-center gap-2 drop-shadow-[0_0_6px_rgba(240,230,210,0.5)] md:drop-shadow-[0_0_8px_rgba(240,230,210,0.5)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4 md:w-5 md:h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  <span className="hidden sm:inline">Return to Archon's Hall</span>
                  <span className="sm:hidden">Return Home</span>
                </span>
              </button>

              <button
                onClick={() => router.back()}
                className="group relative px-4 py-3 md:px-8 md:py-4 bg-gradient-to-br from-[#4a4460]/30 to-[#2a2640]/40 border-2 border-[#7a7090] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#9a90b0] hover:shadow-[0_0_15px_rgba(122,112,144,0.4)] md:hover:shadow-[0_0_20px_rgba(122,112,144,0.4)] hover:scale-105"
              >
                {/* Inner corners */}
                <div className="absolute top-0.5 left-0.5 md:top-1 md:left-1 w-1.5 h-1.5 md:w-2 md:h-2 border-t border-l border-[#9a90b0]/60"></div>
                <div className="absolute top-0.5 right-0.5 md:top-1 md:right-1 w-1.5 h-1.5 md:w-2 md:h-2 border-t border-r border-[#9a90b0]/60"></div>
                <div className="absolute bottom-0.5 left-0.5 md:bottom-1 md:left-1 w-1.5 h-1.5 md:w-2 md:h-2 border-b border-l border-[#9a90b0]/60"></div>
                <div className="absolute bottom-0.5 right-0.5 md:bottom-1 md:right-1 w-1.5 h-1.5 md:w-2 md:h-2 border-b border-r border-[#9a90b0]/60"></div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-[#7a7090]/0 via-[#9a90b0]/20 to-[#7a7090]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative text-[#c8b8d8] font-bold text-sm md:text-base lg:text-lg flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4 md:w-5 md:h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                    />
                  </svg>
                  Go Back
                </span>
              </button>
            </div>

            {/* Flavor Text - Responsive */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-[#d3bc8e]/20">
              <p className="text-xs sm:text-sm text-[#9d8f6f] italic max-w-lg mx-auto px-2">
                "Even the greatest adventurers sometimes lose their way. But every detour is just another story waiting to be told."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
          }
          25% { 
            transform: translateY(-30px) translateX(20px) rotate(5deg); 
          }
          50% { 
            transform: translateY(-50px) translateX(-20px) rotate(-5deg); 
          }
          75% { 
            transform: translateY(-30px) translateX(20px) rotate(5deg); 
          }
        }
      `}</style>
      
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

