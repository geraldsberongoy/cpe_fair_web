import { Score } from "@/types/score";
// Restoring original imports for regional backgrounds
import FontaineBG from "@/assets/images/backgrounds/fontaine.jpg";
import InazumaBG from "@/assets/images/backgrounds/inazuma.jpg";
import LiyueBG from "@/assets/images/backgrounds/liyue.jpg";
import MondstadtBG from "@/assets/images/backgrounds/mondstadt.jpg";
import NatlanBG from "@/assets/images/backgrounds/natlan.jpg";
import SumeruBG from "@/assets/images/backgrounds/sumeru.jpg";
import SnezhnayaBG from "@/assets/images/backgrounds/snezhnaya.jpg";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TeamScoreModal } from "./leaderboard";

// Restoring the original BG_MAP using .src properties
const BG_MAP: Record<string, string> = {
  fontaine: FontaineBG.src,
  inazuma: InazumaBG.src,
  liyue: LiyueBG.src,
  mondstadt: MondstadtBG.src,
  natlan: NatlanBG.src,
  sumeru: SumeruBG.src,
  snezhnaya: SnezhnayaBG.src,
};

// Restoring the original pickBg function
const pickBg = (name?: string | null) => {
  if (!name) return undefined;
  const key = name.toLowerCase();
  for (const k of Object.keys(BG_MAP)) {
    if (key.includes(k)) return BG_MAP[k];
  }
  return undefined;
};

interface PodiumProps {
  topTeams: Array<{
    section_team: string;
    totalPoints: number;
    scores: Score[];
  }>;
}

const Podium = ({ topTeams }: PodiumProps) => {
  // Get top 3 teams sorted by total points
  const sortedTeams = [...topTeams].sort(
    (a, b) => b.totalPoints - a.totalPoints
  );
  const topThree = sortedTeams.slice(0, 3);

  // Reorder to [2nd, 1st, 3rd] for classic podium layout
  const podiumOrder = [topThree[1], topThree[0], topThree[2]].filter(Boolean);

  const getRankData = (index: number) => {
    // Determine the actual rank (1st, 2nd, 3rd) based on the podium order [2nd, 1st, 3rd]
    let rank = 0;
    if (index === 0) rank = 2; // Position in array is 0 -> 2nd place
    else if (index === 1) rank = 1; // Position in array is 1 -> 1st place
    else if (index === 2) rank = 3; // Position in array is 2 -> 3rd place

    // Fallback for cases where a team doesn't exist (e.g., if topTeams.length < 3)
    if (!podiumOrder[index]) return null;

    // Define colors, heights, and labels for the podium blocks
    switch (rank) {
      case 1:
        return {
          rankLabel: "1st",
          height: "md:h-70", // Tallest (320px)
          bgColor: "bg-yellow-600", // Darker gold for top of block
          ringColor: "ring-yellow-800", // Dark gold base
          shadow: "drop-shadow-[0_0_10px_rgb(250,215,50)]",
          textColor: "text-yellow-300",
          borderColor: "border-yellow-400",
          sideDecorColor: "from-yellow-400/60",
          rank: 1,
        };
      case 2:
        return {
          rankLabel: "2nd",
          height: "md:h-60", // Medium (256px)
          bgColor: "bg-gray-500", // Darker silver for top of block
          ringColor: "ring-gray-700", // Dark silver base
          shadow: "drop-shadow-[0_0_10px_rgb(189,187,187)]",
          textColor: "text-gray-200",
          borderColor: "border-gray-400",
          sideDecorColor: "from-gray-400/60",
          rank: 2,
        };
      case 3:
        return {
          rankLabel: "3rd",
          height: "md:h-50", // Shortest (224px)
          bgColor: "bg-amber-700", // Darker bronze for top of block
          ringColor: "ring-amber-900", // Dark bronze base
          shadow: "drop-shadow-[0_0_10px_rgb(181,122,51)]",
          textColor: "text-[#c98138]",
          borderColor: "border-amber-500",
          sideDecorColor: "from-amber-400/60",
          rank: 3,
        };
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-2 px-2 mb-4 md:flex md:justify-center md:items-end gap-4 md:gap-8 ">
        
        {podiumOrder.map((team, index) => {
          // Use the restored pickBg function to get the actual image src
          const bg = pickBg(team?.section_team || null);
          const rankData = getRankData(index);
          if (!rankData) return null; // Handle missing teams gracefully

          return (
            <Dialog key={team.section_team}>
              <DialogTrigger asChild>
                <div
                  key={team.section_team}
                  // Increased width here: w-40 (10rem) and sm:w-56 (14rem)
                  className={`flex flex-col items-center transition-all duration-300 ${rankData.height} md:w-75
                      ${index === 0 ? "col-span-1 order-2 md:order-1" : ""}
                      ${index === 1 ? "col-span-2 order-1 md:order-2" : ""}
                      ${index === 2 ? "col-span-1 order-3 md:order-3" : ""}`}
                >
                    
                  {/* Rank Label (Above Block) */}
                  <div className={`text-xl font-bold mb-2 ${rankData.textColor} drop-shadow-lg`}>
                    {rankData.rankLabel}
                  </div>
                  

                  {/* Podium Block - The wider, themed block */}
                  <div
                    className={`w-full ${rankData.height} h-40 rounded-t-xl flex flex-col items-center justify-end p-3 md:p-5 ${rankData.ringColor} ${rankData.shadow} transform hover:scale-[1.03] transition-transform duration-200 cursor-pointer overflow-hidden relative
                    drop-shadow-[0_0_1px_rgb(250,215,50)]`}
                  >
                    {/* BORDER DESIGNS */}
              <div
                className={`absolute z-10 inset-0 border-4 ${rankData.borderColor} group-hover:border-amber-400 transition-colors duration-300`}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                }}
              ></div>
              <div className="absolute inset-2 border-2 border-amber-600/40 z-10"></div>

              {/* Corner Ornaments - Top Left */}
              <div className="absolute top-0 left-0 w-12 h-12 z-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-amber-300 to-transparent"></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-amber-300 to-transparent"></div>
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-400/60"></div>
                <div
                  className={`absolute top-0 left-0 w-3 h-3 bg-linear-to-br group-hover:scale-125 transition-transform duration-300`}
                ></div>
              </div>

              {/* Corner Ornaments - Top Right */}
              <div className="absolute top-0 right-0 w-12 h-12 z-10">
                <div className="absolute top-0 right-0 w-full h-1 bg-linear-to-l from-amber-300 to-transparent"></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-linear-to-b from-amber-300 to-transparent"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-400/60"></div>
                <div
                  className={`absolute top-0 right-0 w-3 h-3 bg-linear-to-bl group-hover:scale-125 transition-transform duration-300`}
                ></div>
              </div>

              {/* Corner Ornaments - Bottom Left */}
              <div className="absolute bottom-0 left-0 w-12 h-12 z-10">
                <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-amber-300 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-1 h-full bg-linear-to-t from-amber-300 to-transparent"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-400/60"></div>
                <div
                  className={`absolute bottom-0 left-0 w-3 h-3 bg-linear-to-tr group-hover:scale-125 transition-transform duration-300`}
                ></div>
              </div>

              {/* Corner Ornaments - Bottom Right */}
              <div className="absolute bottom-0 right-0 w-12 h-12 z-10">
                <div className="absolute bottom-0 right-0 w-full h-1 bg-linear-to-l from-amber-300 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-1 h-full bg-linear-to-t from-amber-300 to-transparent"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-400/60"></div>
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 bg-linear-to-tl  group-hover:scale-125 transition-transform duration-300`}
                ></div>
              </div>

              {/* Side Decorations */}
              <div className={`absolute top-1/2 left-0 transform -translate-y-1/2 w-2 h-16 bg-linear-to-r ${rankData.sideDecorColor} to-transparent z-10`}></div>
              <div className={`absolute top-1/2 right-0 transform -translate-y-1/2 w-2 h-16 bg-linear-to-l ${rankData.sideDecorColor} to-transparent z-10`}></div>
              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 h-2 w-16 bg-linear-to-b ${rankData.sideDecorColor} to-transparent z-10`}></div>
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-2 w-16 bg-linear-to-t ${rankData.sideDecorColor} to-transparent z-10`}></div>

              {/* END BORDER DESIGNS */}
                    {/* Background Image Layer */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-all duration-500 hover:scale-105 z-0"
                      // Use style for background image derived from the restored imports
                      style={{ backgroundImage: bg ? `url(${bg})` : "none" }}
                    />

                    {/* Color/Gradient Overlay (to apply the metallic color and keep content readable) */}
                    <div
                      className={`absolute inset-0 ${rankData.bgColor}/70`}
                    ></div>

                    {/* Content Layer */}
                    <div className="relative z-10 flex flex-col items-center">
                      {/* Team Name */}
                      <span
                        className={`font-extrabold text-lg md:text-2xl text-center px-1 mb-1 truncate w-full drop-shadow-lg ${rankData.textColor}`}
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
                      >
                        {team.section_team}
                      </span>

                      {/* Total Points */}
                      <span
                        className="text-white/90 text-lg md:text-4xl font-black mb-1 drop-shadow-lg"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
                      >
                        {team.totalPoints.toLocaleString()}
                      </span>

                      {/* Score Label */}
                      <span className="text-white/70 text-[10px] md:text-sm uppercase font-medium">
                        Points
                      </span>
                      <p className="text-white/70 text-[10px] md:text-sm text-center">
                        {team.scores.length} Games Played
                      </p>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <TeamScoreModal
                teamName={team.section_team}
                scores={team.scores}
              />
            </Dialog>
          );
        })}
      </div>
    </div>
  );
};

export default Podium;
