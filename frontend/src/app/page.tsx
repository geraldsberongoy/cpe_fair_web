"use client";

import React from "react";

import MainLogo from "@/assets/images/logos/archons_logo.svg";
import CategoriesBar from "@/components/landing/categories_bar";
import Leaderboard from "@/components/landing/leaderboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#010010] flex flex-col items-center">
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
      
      {/* Main Logo */}
      <img src={MainLogo.src} alt="CPE Fair Logo" className="max-w-120"/>
      
      <div className="w-full flex flex-col gap-4">

        <CategoriesBar />
        
        <Leaderboard />
        
      </div>
    </div>
  );
}
