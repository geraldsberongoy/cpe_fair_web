"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import StarryBackground from "@/components/StarryBackground";
import Image from "next/image";
import EarlImage from "@/assets/images/contributors/Earl.png";
import TimmyImage from "@/assets/images/contributors/Timmy.png";
import CharlesImage from "@/assets/images/contributors/Charles.png";
import IanImage from "@/assets/images/contributors/Ian.png";
import GeraldImage from "@/assets/images/contributors/Gerald.png";
import EltonImage from "@/assets/images/contributors/Elton.jpg";

// Mock contributors data
const contributors = [
  {
    id: 5,
    name: "Charles DG Nudalo",
    role: "Project Lead",
    nation: "Inazuma",
    element: "Electro",
    color: "#9d7ad1",
    glow: "rgba(157, 122, 209, 0.4)",
    image: EarlImage,
  },
  {
    id: 3,
    name: "Gerald Berongoy",
    role: "Fullstack Developer",
    nation: "Inazuma",
    element: "Electro",
    color: "#9d7ad1",
    glow: "rgba(157, 122, 209, 0.4)",
    image: GeraldImage,
  },
  {
    id: 1,
    name: "Earl Clyde Bañez",
    role: "Frontend Developer",
    nation: "Snezhnaya",
    element: "Anemo",
    color: "#4fb3a8",
    glow: "rgba(79, 179, 168, 0.4)",
    image: EarlImage,
  },
  {
    id: 2,
    name: "Elton James Donato",
    role: "Frontend Developer",
    nation: "Snezhnaya",
    element: "Geo",
    color: "#f4a950",
    glow: "rgba(244, 169, 80, 0.4)",
    image: EltonImage,
  },

  {
    id: 4,
    name: "Timmy Gregorio",
    role: "Design & Assets Contributor",
    nation: "Inazuma",
    element: "Electro",
    color: "#9d7ad1",
    glow: "rgba(157, 122, 209, 0.4)",
    image: EarlImage,
  },

  {
    id: 6,
    name: "Ian Kylle Caones",
    role: "Design & Assets Contributor",
    nation: "Inazuma",
    element: "Electro",
    color: "#9d7ad1",
    glow: "rgba(157, 122, 209, 0.4)",
    image: EarlImage,
  },
];

export default function ContributorsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050425] to-[#000000] relative">
      <StarryBackground />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-[#c8b896] hover:text-[#d3bc8e] mb-8 transition-colors group"
        >
          <ChevronLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm font-semibold">Back to Home</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-[#f0e6d2] mb-4 drop-shadow-[0_0_30px_rgba(211,188,142,0.8)]">
            The Seven Archons
          </h1>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px flex-1 max-w-48 bg-gradient-to-r from-transparent via-[#d3bc8e] to-transparent" />
            <span className="text-sm text-[#d3bc8e] uppercase tracking-wider">
              Contributors
            </span>
            <div className="h-px flex-1 max-w-48 bg-gradient-to-r from-transparent via-[#d3bc8e] to-transparent" />
          </div>
          <p className="text-[#c8b896] text-sm md:text-base max-w-2xl mx-auto">
            Meet the legendary Archons who brought this project to life. Each
            wielding their unique powers to create this magnificent experience.
          </p>
        </div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 max-w-12xl mx-auto">
          {contributors.map((contributor, index) => (
            <div
              key={contributor.id}
              className="group relative bg-gradient-to-br from-[#2a2640]/80 to-[#1a1630]/90 border-2 border-[#d3bc8e]/30 rounded-lg overflow-hidden backdrop-blur-sm hover:border-[#d3bc8e]/60 transition-all duration-300 hover:scale-[1.03]"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Glow Effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl"
                style={{
                  background: `radial-gradient(circle at center, ${contributor.glow}, transparent)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Portrait Image Container */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-b from-[#2a2f4a] to-[#1a1f3a]">
                  <Image
                    src={contributor.image}
                    alt={contributor.name}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    style={{
                      objectPosition: "center 20%",
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1630] via-transparent to-transparent opacity-60" />
                  
                </div>

                {/* Info Section */}
                <div className="p-6 space-y-3">
                  {/* Name */}
                  <h3 className="text-xl font-bold text-[#f0e6d2] group-hover:text-white transition-colors text-center">
                    {contributor.name}
                  </h3>
                  
                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-[#d3bc8e]/50 to-transparent" />
                  
                  {/* Role */}
                  <p className="text-sm text-[#c8b896] text-center font-semibold">
                    {contributor.role}
                  </p>


                </div>
              </div>

              {/* Corner Decorations */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#f0e6d2]/30 group-hover:border-[#f0e6d2]/70 transition-colors duration-300" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#f0e6d2]/30 group-hover:border-[#f0e6d2]/70 transition-colors duration-300" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#f0e6d2]/30 group-hover:border-[#f0e6d2]/70 transition-colors duration-300" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#f0e6d2]/30 group-hover:border-[#f0e6d2]/70 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <div className="inline-block px-6 py-3 bg-gradient-to-br from-[#2a2640]/60 to-[#1a1630]/70 border border-[#d3bc8e]/40 rounded-lg backdrop-blur-sm">
            <p className="text-sm text-[#c8b896]">
              Special thanks to all contributors who made this project
              possible
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

