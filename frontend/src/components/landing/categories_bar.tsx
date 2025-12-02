import { useState } from "react";
import SportsLogo from "@/assets/images/logos/categories/sports.svg";
import BoardLogo from "@/assets/images/logos/categories/boardgames.svg";
import EsportsLogo from "@/assets/images/logos/categories/esports.svg";
import AcademicsLogo from "@/assets/images/logos/categories/quiz-bee.svg";
import TalentsLogo from "@/assets/images/logos/categories/talents.svg";
import MiniGamesLogo from "@/assets/images/logos/categories/minigames.svg";
import Banner from "@/assets/images/category_banner.svg";

const CategoriesBar = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const categories = [
        {
            name: "Overall Ranking", 
            logo: SportsLogo.src
        },
        {
            name: "Sports Competition", 
            logo: SportsLogo.src
        },
        {
            name: "Logic & Board Competition", 
            logo: BoardLogo.src
        },
        {
            name: "Esports Competition", 
            logo: EsportsLogo.src
        },
        {
            name: "Academics Competition", 
            logo: AcademicsLogo.src
        },
        {
            name: "Talents Competition",
            logo: TalentsLogo.src
        },
        {
            name: "Mini Games",
            logo: MiniGamesLogo.src
        }

    ]

    return (
        <div className="text-white flex flex-wrap justify-center gap-6 px-2 py-4" 
            >
            {categories.map((category, index) => (
                <button key={index} 
                    onClick={() => setSelectedIndex(index)}
                    className={`w-35 flex justify-center items-center flex-col transition-all duration-300 ${
                        selectedIndex === index 
                            ? 'hover:drop-shadow-[0_0_1px_rgb(255,215,50)] drop-shadow-[0_0_1px_rgb(250,215,50)]' 
                            : 'opacity-50 hover:opacity-100'
                    }`}
                    style={{
                        backgroundImage: `url(${Banner.src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center -20px',
                    }}
                >
                    {category.logo && (
                        <img src={category.logo} alt={category.name} />
                    )}
                    <span className="text-center">{category.name}</span>
                </button>
            ))}
        </div>
    )
}

export default CategoriesBar;