import { useState } from "react";
import Image from "next/image";
import OverallLogo from "@/assets/images/logos/categories/overall.svg";
import SportsLogo from "@/assets/images/logos/categories/sports.svg";
import BoardLogo from "@/assets/images/logos/categories/boardgames.svg";
import EsportsLogo from "@/assets/images/logos/categories/esports.svg";
import AcademicsLogo from "@/assets/images/logos/categories/quiz-bee.svg";
import TalentsLogo from "@/assets/images/logos/categories/talents.svg";
import MiniGamesLogo from "@/assets/images/logos/categories/minigames.svg";
import Banner from "@/assets/images/category_banner.svg";
import { GameCategory } from "@/types/game";

interface CategoriesBarProps {
  selectedCategory: GameCategory | "Overall";
  onSelect: (category: GameCategory | "Overall") => void;
}

const CategoriesBar = ({ selectedCategory, onSelect }: CategoriesBarProps) => {
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const [showRightIndicator, setShowRightIndicator] = useState(true);

  const categories: {
    name: string;
    logo: string;
    value: GameCategory | "Overall";
  }[] = [
    {
      name: "Overall\nRanking",
      logo: OverallLogo.src,
      value: "Overall",
    },
    {
      name: "Sports Competition",
      logo: SportsLogo.src,
      value: "Sports",
    },
    {
      name: "Logic & Board Competition",
      logo: BoardLogo.src,
      value: "Board",
    },
    {
      name: "Esports Competition",
      logo: EsportsLogo.src,
      value: "Esports",
    },
    {
      name: "Academics Competition",
      logo: AcademicsLogo.src,
      value: "Quiz Bee",
    },
    {
      name: "Talents Competition",
      logo: TalentsLogo.src,
      value: "Talents",
    },
    {
      name: "Mini\nGames",
      logo: MiniGamesLogo.src,
      value: "Mini Games",
    },
  ];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollLeft = target.scrollLeft;
    const maxScroll = target.scrollWidth - target.clientWidth;

    setShowLeftIndicator(scrollLeft > 10);
    setShowRightIndicator(scrollLeft < maxScroll - 10);
  };

  return (
    <div className="px-3 relative">
      {/* Left scroll indicator - Genshin style */}
      {showLeftIndicator && (
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#1a1630] via-[#1a1630]/80 to-transparent z-10 pointer-events-none lg:hidden flex items-center justify-start pl-2">
          <div className="relative">
            <div className="absolute inset-0 blur-md bg-[#d3bc8e] opacity-60 animate-pulse"></div>
            <svg
              className="w-6 h-6 text-[#f0e6d2] relative z-10 drop-shadow-[0_0_8px_rgba(211,188,142,0.8)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Right scroll indicator - Genshin style */}
      {showRightIndicator && (
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#1a1630] via-[#1a1630]/80 to-transparent z-10 pointer-events-none lg:hidden flex items-center justify-end pr-2">
          <div className="relative">
            <div className="absolute inset-0 blur-md bg-[#d3bc8e] opacity-60 animate-pulse"></div>
            <svg
              className="w-6 h-6 text-[#f0e6d2] relative z-10 drop-shadow-[0_0_8px_rgba(211,188,142,0.8)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      )}

      <div
        className="relative overflow-x-auto hide-scrollbar"
        onScroll={handleScroll}
      >
        <div className="text-white flex lg:flex lg:justify-center gap-1 lg:gap-6 px-2 py-4 w-max lg:w-full">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => onSelect(category.value)}
              className={`w-20 flex justify-center items-center flex-col transition-all duration-300 bg-position-[center_-10px] md:bg-position-[center_-15px] md:w-35 ${
                selectedCategory === category.value
                  ? "hover:drop-shadow-[0_0_1px_rgb(255,215,50)] drop-shadow-[0_0_1px_rgb(250,215,50)]"
                  : "opacity-50 hover:opacity-100"
              }`}
              style={{
                backgroundImage: `url(${Banner.src})`,
                backgroundSize: "cover",
              }}
            >
              {category.logo && (
                <img src={category.logo} alt={category.name} loading="lazy" />
              )}
              <span className="text-[10px] text-center md:text-base whitespace-pre-line">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesBar;
