"use client";

import React from "react";
import MainLogo from "@/assets/images/logo.png";
import AccessLogo from "@/assets/images/access_logo.png";
import FormulaLogo from "@/assets/images/formula_logo.png";
import Teams from "@/components/Teams";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#222222] flex flex-col justify-center items-center gap-6 py-7 px-4">
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
      <img src={MainLogo.src} alt="Cpe Fair Logo" className="max-w-[180px]" />
      
      <div className="w-full max-w-[1200px] flex flex-col gap-4">
        <div className="text-white flex flex-col text-center">
          <h1 className="font-formula1Bold text-4xl sm:text-5xl">
            THE CPE GRAND PRIX
          </h1>
          <p className="font-formula1 text-md sm:text-lg">LEADERBOARDS</p>
        </div>
        
        <Teams />
        
        <div className="flex justify-around items-center mt-8">
          <img
            src={AccessLogo.src}
            alt="Access Logo"
            className="max-w-[40px] sm:max-w-[60px] object-cover"
          />
          <Link href="/admin" className="text-white">Admin</Link>
          <img
            src={FormulaLogo.src}
            alt="Formula 1 Logo"
            className="max-w-[80px] sm:max-w-[100px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
