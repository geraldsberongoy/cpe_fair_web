import { useState, useEffect } from "react";

const MOCK_PLAYERS = [
  { id: "1", team_name: "Team A", player_name: "Player 1" },
  { id: "2", team_name: "Team A", player_name: "Player 2" },
  { id: "3", team_name: "Team B", player_name: "Player 3" },
];

const useFetchTeamPlayers = (teamName: string[]) => {
  const [playersData, setPlayersData] = useState<any[]>([]);

  useEffect(() => {
     setPlayersData(MOCK_PLAYERS.filter(p => teamName.includes(p.team_name)));
  }, [JSON.stringify(teamName)]);


  return { playersData };
};

export default useFetchTeamPlayers;
