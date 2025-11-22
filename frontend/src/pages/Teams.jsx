import React, { useEffect, useState } from "react";
import useScore from "../custom-hooks/useScore";
import useFetchTeamPlayers from "../custom-hooks/useFetchTeamPlayers";
import SpecificArea from "./SpecificArea";

const Teams = () => {
  const teams = [
    { name: "Ferrari", value: "ferrari", color: "bg-[#ff7900]" },
    { name: "Aston Martin", value: "aston_martin", color: "bg-[#006833]" },
    { name: "Redbull", value: "redbull", color: "bg-[#e11b4c]" },
    { name: "Alpine", value: "alpine", color: "bg-[#006fb9]" },
    { name: "Haas", value: "haas", color: "bg-[#ffffff]" },
    { name: "Mercedes", value: "mercedes", color: "bg-[#3b3b3b]" },
    { name: "McLaren", value: "mclaren", color: "bg-[#ffbc1d]" },
  ];

  const gameNames = {
    all: "Overall",
    dress_to_impress: "Dress to Impress",
    block_blast: "Block Blast",
    flip_cup: "Flip Cup",
    chinese_garter: "Chinese Garter",
  };

  const excludedGames = [
    "dress_to_impress",
    "block_blast",
    "flip_cup",
    "chinese_garter",
  ];

  const { scores: mainData } = useScore();
  const [teamPoints, setTeamPoints] = useState([]);
  const [selectedGame, setSelectedGame] = useState("all");

  useEffect(() => {
    const filteredData =
      selectedGame === "all"
        ? mainData.filter((entry) => !excludedGames.includes(entry.game))
        : mainData.filter((entry) => entry.game === selectedGame);

    // Initialize team points
    const initialTeamPoints = teams.map((team) => ({
      ...team,
      points: 0,
      rank: null,
      highestContributor: { name: null, points: 0 },
      contributors: [],
    }));

    // Map contributors by team
    filteredData.forEach((entry) => {
      const teamIndex = initialTeamPoints.findIndex(
        (team) => team.value === entry.section_team
      );

      if (teamIndex !== -1) {
        const team = initialTeamPoints[teamIndex];
        team.points += entry.points;
        team.contributors.push(entry);

        // Update the highest contributor
        if (entry.points > team.highestContributor.points) {
          team.highestContributor = {
            name: entry.full_name || entry.team_name || "none",
            points: entry.points,
          };
        }
      }
    });

    // Sort teams by points and assign ranks
    initialTeamPoints
      .sort((a, b) => b.points - a.points)
      .forEach((team, index) => {
        team.rank = index + 1;
      });

    setTeamPoints(initialTeamPoints);
  }, [mainData, selectedGame]);

  return (
    <div className="p-4">
      {/* Game Selector */}
      <div className="flex justify-around mb-4 overflow-x-scroll sm:overflow-x-hidden">
        {Object.keys(gameNames).map((game) => (
          <button
            key={game}
            className={`px-4 py-2 relative group text-nowrap font-protipoIcons ${
              selectedGame === game ? "text-[#ee0000]" : ""
            }`}
            onClick={() => setSelectedGame(game)}
          >
            {gameNames[game]}
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#ee0000] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                selectedGame === game ? "scale-x-100" : ""
              }`}
            />
          </button>
        ))}
      </div>

      {/* Team Cards */}
      <div className="grid gap-4">
        {teamPoints.map((team) => (
          <SpecificArea
            key={team.value}
            team={team}
            selectedGame={selectedGame}
          />
        ))}
      </div>
    </div>
  );
};

export default Teams;
