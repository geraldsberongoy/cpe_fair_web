"use client";

import { useRouter } from "next/navigation";
import MainLogo from "@/assets/images/logos/archons_logo.svg";

const MainLogoArchon = () => {
  const router = useRouter();

  return (
    <div className="relative">
      <div className="fixed inset-0 blur-2xl bg-linear-to-r from-cyan-400/20 via-amber-400/20 to-purple-400/20 pointer-events-none z-0"></div>
      <div className="drop-shadow-[0_0_4px_rgb(255,215,50)] relative z-10">
        <button
          type="button"
          aria-label="Go to home"
          onClick={() => router.push("/")}
          className="transition-all duration-200 hover:drop-shadow-[0_0_1px_rgb(255,215,50)]"
        >
          <img
            src={MainLogo.src}
            alt="CPE Fair Logo"
            className="w-60 mt-7 md:mt-2 sm:w-80 md:w-100 lg:w-100 xl:w-100 max-w-full h-auto"
          />
        </button>
      </div>
    </div>
  );
};

export default MainLogoArchon;
