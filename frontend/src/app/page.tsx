"use client";

import React, { useState } from "react";

import MainLogo from "@/assets/images/logos/archons_logo.svg";
import CategoriesBar from "@/components/landing/CategoriesBar";
import Leaderboard from "@/components/landing/leaderboard";
import MainLogoArchon from "@/components/MainLogo";
import Footer from "@/components/Footer";
import GateEntrance from "@/components/GateEntrance";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { GameCategory } from "@/types/game";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<
    GameCategory | "Overall"
  >("Overall");

  return (
    <div className="min-h-screen bg-linear-to-b from-[#050425] to-[#000000] flex flex-col items-center">
      {/* Grand Entrance - Shows once per session */}
      <GateEntrance />
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="min-h-screen flex flex-col items-center w-full">
        {/* Main Logo */}
        <MainLogoArchon />

        <div className="w-full flex flex-col gap-4">
          <CategoriesBar
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <Leaderboard selectedCategory={selectedCategory} />
        </div>
      </div>

      <Footer onCategorySelect={setSelectedCategory} />
    </div>
  );
  
}