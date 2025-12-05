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

  return (
    <div className="text-white flex flex-wrap justify-center gap-6 px-2 py-4">
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
          {category.logo && <img src={category.logo} alt={category.name} loading="lazy" />}
          <span className="text-[10px] text-center md:text-base whitespace-pre-line">{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoriesBar;
