"use client";

import React from "react";
import MainLogo from "@/assets/images/logos/archons_logo.svg";
import AccessLogo from "@/assets/images/access_logo.png";
import FormulaLogo from "@/assets/images/formula_logo.png";
import Teams from "@/components/Teams";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#222222] flex flex-col justify-center items-center gap-6 px-4 pt-0">
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
      <img src={MainLogo.src} alt="Cpe Fair Logo" className="max-w-100"/>
      
      <div className="w-full max-w-[1200px] flex flex-col gap-4">
                
        <Teams />
        
      </div>
    </div>
  );
}
