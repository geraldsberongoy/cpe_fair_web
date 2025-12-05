"use client";



import React, { useState, useEffect } from "react";
import Image from "next/image";
import CloudImage from "@/assets/images/clouds/cloud.png";

interface GateEntranceProps {
  onComplete?: () => void;
  showOnce?: boolean; // Only show once per session
}

const GateEntrance: React.FC<GateEntranceProps> = ({ 
  onComplete, 
  showOnce = false 
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    // Check if we should show the entrance based on session storage
    if (showOnce && typeof window !== "undefined") {
      const hasShown = sessionStorage.getItem("gateEntranceShown");
      if (hasShown) {
        setShouldShow(false);
        setIsComplete(true);
        return;
      }
      sessionStorage.setItem("gateEntranceShown", "true");
    }

    // Start opening after a brief delay
    const startTimer = setTimeout(() => {
      setIsOpening(true);
    }, 800);

    // Complete the animation
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }, 3500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, showOnce]);

  if (!shouldShow || isComplete) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none">
      {/* Mystical Glow Background */}
      <div
        className={`absolute inset-0 bg-gradient-radial from-[#d3bc8e]/20 via-transparent to-transparent transition-opacity duration-1000 ${
          isOpening ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Expanding Energy Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full border-2 border-[#d3bc8e] transition-all duration-1000 ${
              isOpening ? "opacity-0" : "opacity-60"
            }`}
            style={{
              width: `${100 + i * 100}px`,
              height: `${100 + i * 100}px`,
              animation: `pulse-ring ${2 + i * 0.5}s ease-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Center Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`w-96 h-96 bg-[#d3bc8e]/30 rounded-full blur-[100px] transition-all duration-1000 ${
            isOpening ? "scale-[3] opacity-0" : "scale-100 opacity-100"
          }`}
        />
      </div>

      {/* Animated Light Rays */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-full bg-gradient-to-t from-transparent via-[#f0e6d2]/20 to-transparent transition-all duration-1000 ${
              isOpening ? "opacity-0 scale-y-150" : "opacity-100 scale-y-100"
            }`}
            style={{
              transform: `rotate(${i * 30}deg)`,
              transformOrigin: "center",
              transitionDelay: `${i * 50}ms`,
            }}
          />
        ))}
      </div>

      {/* Left Gate */}
      <div
        className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-[1.5s] ease-in-out ${
          isOpening ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        }}
      >
        {/* Left Gate Cloud */}
        <div className="relative h-full w-full overflow-hidden">
          {/* Animated Cloud Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0820] via-[#1a1640] to-[#0a0820]" />
          
          <Image
            src={CloudImage}
            alt="Left Gate"
            fill
            className="object-cover object-right scale-150 opacity-90"
            style={{
              filter: "brightness(0.8) contrast(1.2) drop-shadow(0 0 30px rgba(211, 188, 142, 0.6))",
              mixBlendMode: "screen",
            }}
            priority
          />
          
          {/* Energy Flow Effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-l from-[#d3bc8e]/10 to-transparent"
            style={{
              animation: "energy-flow 2s ease-in-out infinite",
            }}
          />
          
          {/* Golden Border */}
          <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#d3bc8e] to-transparent shadow-[0_0_20px_rgba(211,188,142,0.8)]" />
          
          {/* Glowing Edge */}
          <div 
            className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-[#f0e6d2]/30 to-transparent"
            style={{
              filter: "blur(10px)",
            }}
          />
          
          {/* Ornate Edge Pattern */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-64 w-8">
            <div className="relative h-full w-full">
              {/* Diamond patterns */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute right-0 w-4 h-4 border-2 border-[#f0e6d2] rotate-45 bg-[#d3bc8e]/20"
                  style={{
                    top: `${i * 12.5}%`,
                    boxShadow: "0 0 15px rgba(240, 230, 210, 0.5)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Gate */}
      <div
        className={`absolute top-0 right-0 h-full w-1/2 transition-all duration-[1.5s] ease-in-out ${
          isOpening ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        }}
      >
        {/* Right Gate Cloud */}
        <div className="relative h-full w-full overflow-hidden">
          {/* Animated Cloud Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a0820] via-[#1a1640] to-[#0a0820]" />
          
          <Image
            src={CloudImage}
            alt="Right Gate"
            fill
            className="object-cover object-left scale-150 opacity-90"
            style={{
              filter: "brightness(0.8) contrast(1.2) drop-shadow(0 0 30px rgba(211, 188, 142, 0.6))",
              mixBlendMode: "screen",
            }}
            priority
          />
          
          {/* Energy Flow Effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#d3bc8e]/10 to-transparent"
            style={{
              animation: "energy-flow 2s ease-in-out infinite",
            }}
          />
          
          {/* Golden Border */}
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#d3bc8e] to-transparent shadow-[0_0_20px_rgba(211,188,142,0.8)]" />
          
          {/* Glowing Edge */}
          <div 
            className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-[#f0e6d2]/30 to-transparent"
            style={{
              filter: "blur(10px)",
            }}
          />
          
          {/* Ornate Edge Pattern */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-64 w-8">
            <div className="relative h-full w-full">
              {/* Diamond patterns */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 w-4 h-4 border-2 border-[#f0e6d2] rotate-45 bg-[#d3bc8e]/20"
                  style={{
                    top: `${i * 12.5}%`,
                    boxShadow: "0 0 15px rgba(240, 230, 210, 0.5)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Text */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className={`text-center transition-all duration-700 ${
            isOpening
              ? "opacity-0 translate-y-10"
              : "opacity-100 translate-y-0"
          }`}
          style={{
            transitionDelay: "200ms",
          }}
        >
          <h1 
            className="text-4xl md:text-6xl font-bold text-[#f0e6d2] mb-2"
            style={{
              textShadow: "0 0 20px rgba(211, 188, 142, 0.8), 0 0 40px rgba(211, 188, 142, 0.4)",
              fontFamily: "var(--font-genshin)",
            }}
          >
            Archons of Innovation
          </h1>
          <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-[#d3bc8e] to-transparent" />
          <p 
            className="text-lg md:text-xl text-[#c8b896] mt-2"
            style={{
              textShadow: "0 0 10px rgba(200, 184, 150, 0.5)",
            }}
          >
          </p>
        </div>
      </div>

      {/* Center Emblem */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className={`relative transition-all duration-1000 ${
            isOpening
              ? "scale-150 opacity-0 rotate-180"
              : "scale-100 opacity-100 rotate-0"
          }`}
        >
          {/* Outer Ring */}
          <div className="w-32 h-32 rounded-full border-4 border-[#d3bc8e] relative animate-spin-slow"
            style={{ animation: "spin 4s linear infinite" }}
          >
            {/* Inner Glow */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#f0e6d2]/30 to-[#d3bc8e]/10 blur-sm" />
            
            {/* Center Symbol */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 relative">
                {/* Star Pattern */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[#f0e6d2] clip-star opacity-80"
                    style={{
                      clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                      filter: "drop-shadow(0 0 10px rgba(240, 230, 210, 0.8))",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Orbiting Particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#f0e6d2]"
              style={{
                animation: `orbit 2s linear infinite`,
                animationDelay: `${i * 0.3}s`,
                boxShadow: "0 0 10px rgba(240, 230, 210, 0.8)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-[#f0e6d2] rounded-full transition-all duration-1000 ${
              isOpening ? "opacity-0 scale-0" : "opacity-70"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              boxShadow: "0 0 5px rgba(240, 230, 210, 0.6)",
            }}
          />
        ))}
      </div>

      {/* Fade Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-700 ${
          isOpening ? "opacity-0" : "opacity-0"
        }`}
      />

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(60px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(60px) rotate(-360deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes energy-flow {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default GateEntrance;

