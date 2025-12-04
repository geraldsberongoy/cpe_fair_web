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
      name: "Overall Ranking",
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
      name: "Mini Games",
      logo: MiniGamesLogo.src,
      value: "Mini Games",
    },
  ];

          onClick={() => onSelect(category.value)}
          className={`w-35 flex justify-center items-center flex-col transition-all duration-300 ${
              : "opacity-50 hover:opacity-100"
          }`}
          style={{
            backgroundImage: `url(${Banner.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center -20px",
          }}
        >
          {category.logo && <img src={category.logo} alt={category.name} loading="lazy" />}
          <span className="text-center">{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoriesBar;
