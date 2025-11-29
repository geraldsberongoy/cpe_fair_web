import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import useFetchSpecificArea from "@/hooks/useFetchSpecificArea";
import Ferrari from "@/assets/images/ferrari.png";
import AstonMartin from "@/assets/images/aston_martin.png";
import Mercedes from "@/assets/images/mercedes.png";
import Haas from "@/assets/images/haas.png";
import Mclaren from "@/assets/images/mclaren.png";
import Alpine from "@/assets/images/alpine.png";
import Redbull from "@/assets/images/redbull.png";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define types for props
interface Team {
  name: string;
  value: string;
  color: string;
  points: number;
  rank: number | null;
  highestContributor: { name: string | null; points: number };
  contributors: any[];
}

interface SpecificAreaProps {
  team: Team;
  selectedGame: string;
}

const SpecificArea = ({ team, selectedGame }: SpecificAreaProps) => {
  const contributors = team.contributors || [];
  const [isTeam, setIsTeam] = useState(false);

  const teamNames = React.useMemo(() => contributors
    .filter((contributor) => contributor.team_name)
    .map((contributor) => contributor.team_name), [contributors]);


  const { playersData: teamPlayers } = useFetchSpecificArea(teamNames);

  useEffect(() => {
    const checkIfTeam = contributors.some(
      (contributor) => contributor.team_name
    );
    setIsTeam(checkIfTeam);
  }, [contributors]);

  // Dynamically set the image URL based on team name
  let imageUrl: any;
  switch (team.name) {
    case "Ferrari":
      imageUrl = Ferrari;
      break;
    case "Aston Martin":
      imageUrl = AstonMartin;
      break;
    case "Redbull":
      imageUrl = Redbull;
      break;
    case "Haas":
      imageUrl = Haas;
      break;
    case "Alpine":
      imageUrl = Alpine;
      break;
    case "McLaren":
      imageUrl = Mclaren;
      break;
    case "Mercedes":
      imageUrl = Mercedes;
      break;
  }

  // Determine placement for "all" game
  let placement = "";
  if (selectedGame === "all") {
    if (team.points === 0) {
      placement = "No Ranking Yet";
    } else {
      switch (team.rank) {
        case 1:
          placement = "Champion";
          break;
        case 2:
          placement = "1st Runner Up";
          break;
        case 3:
          placement = "2nd Runner Up";
          break;
        case 4:
          placement = "3rd Runner Up";
          break;
        default:
          placement = "";
      }
    }
  }

  // Split contributors into individuals and teams
  const individualContributors = contributors.filter(
    (contributor) => !contributor.team_name
  );
  const teamContributors = contributors.filter(
    (contributor) => contributor.team_name
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`cursor-pointer relative text-white font-bold overflow-hidden flex gap-3 rounded-md ${team.color}`}
        >
          {imageUrl && (
            <img
              src={imageUrl.src}
              alt={team.name}
              className={`absolute top-[-150px] object-cover opacity-10 ${
                team.name === "Haas" ? "filter invert" : ""
              }`}
            />
          )}

          <div className="bg-black/20 isolate flex items-center justify-center w-20 ">
            <h1
              className="font-protipoIcons uppercase text-5xl text-white"
            >
              {team.rank}
            </h1>
          </div>
          <div className="flex isolate flex-col sm:flex-row gap-2 justify-between w-full px-6 py-4 ">
            <div className="flex flex-col gap-2">
              <h1
                className={`font-formula1Bold uppercase text-2xl sm:text-3xl ${
                  team.name === "Haas" ? "text-black" : "text-white"
                }`}
              >
                {team.name || "none"}
              </h1>
              <span
                className={`font-protipoIcons font-normal text-md sm:text-lg ${
                  team.name === "Haas" ? "text-black" : "text-white"
                }`}
              >
                {selectedGame === "all" ? (
                  <div>
                    <span className="font-bold">{placement}</span>
                  </div>
                ) : isTeam ? (
                  <div>
                    Team Top Contributor:{" "}
                    <span className="font-bold">
                      {team.highestContributor?.name || "None"}
                    </span>
                  </div>
                ) : (
                  <div className="font-bold">
                    Top Contributor:{" "}
                    <span className="font-bold">
                      {team.highestContributor?.name || "None"}
                    </span>
                  </div>
                )}
              </span>
            </div>
            <span
              className={`font-formula1Bold text-2xl sm:text-3xl ${
                team.name === "Haas" ? "text-black" : "text-white"
              }`}
            >
              {team.points}
            </span>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="min-h-[200px] bg-[#222222] text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="font-formula1Bold uppercase text-2xl text-white">
            {team.name}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {isTeam
              ? "List of all contributors and players in this team."
              : "Details about the contributors and their points."}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <div className="px-4 py-2">
            {/* Individuals Section */}

            {individualContributors.length === 0 &&
              teamContributors.length === 0 && (
                <p className="text-center text-gray-500">
                  There are no contributions from this team yet.
                </p>
              )}

            {individualContributors.length > 0 && (
              <>
                <h2 className="font-bold text-xl mb-3 border-b pb-2">
                  Individuals
                </h2>
                <div className="flex justify-between mb-3 font-bold text-lg">
                  <h1>Name</h1>
                  <h1>Points</h1>
                </div>
                {individualContributors.map((contributor, index) => (
                  <div key={index} className="flex justify-between px-2">
                    <div className="flex flex-col">
                      <div>{contributor.full_name || "none"}</div>
                      <div className="text-[#ee0000] text-sm ml-2">
                        {contributor.game
                          ?.split("_")
                          .map(
                            (word: string) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}{" "}
                      </div>
                    </div>
                    <div className="font-formula1Bold">
                      {contributor.points || "0"}
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Teams Section */}
            {teamContributors.length > 0 && (
              <>
                <h2 className="font-bold text-xl mt-4 mb-3 border-b pb-2">
                  Teams
                </h2>
                {teamContributors.map((contributor, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <div className="text-xl font-semibold">
                          {contributor.team_name || "none"}
                        </div>
                        <div className="text-[#ee0000] text-sm ml-2">
                          {contributor.game
                            ?.split("_")
                            .map(
                              (word: string) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}{" "}
                        </div>
                      </div>
                      <div className="font-formula1Bold">
                        {contributor.points || "0"}
                      </div>
                    </div>
                    <ul className="ml-6 list-disc text-gray-400 mb-4">
                      {teamPlayers
                        .filter(
                          (player) => player.team_name === contributor.team_name
                        )
                        .map((player, playerIndex) => (
                          <li key={playerIndex}>
                            {player.player_name || "none"}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SpecificArea;
