import { useState, useEffect } from "react";

const MOCK_PLAYERS = [
  { id: "1", team_name: "Ferrari Team", player_name: "Charles Leclerc" },
  { id: "2", team_name: "Ferrari Team", player_name: "Carlos Sainz" },
  { id: "3", team_name: "Mercedes Team", player_name: "Lewis Hamilton" },
  { id: "4", team_name: "Mercedes Team", player_name: "George Russell" },
  { id: "5", team_name: "Red Bull Racing", player_name: "Max Verstappen" },
  { id: "6", team_name: "Red Bull Racing", player_name: "Sergio Perez" },
  { id: "7", team_name: "McLaren Team", player_name: "Lando Norris" },
  { id: "8", team_name: "McLaren Team", player_name: "Oscar Piastri" },
  { id: "9", team_name: "Aston Martin Team", player_name: "Fernando Alonso" },
  { id: "10", team_name: "Aston Martin Team", player_name: "Lance Stroll" },
  { id: "11", team_name: "Alpine Team", player_name: "Pierre Gasly" },
  { id: "12", team_name: "Alpine Team", player_name: "Esteban Ocon" },
];


const useFetchSpecificArea = (teamNames: string[]) => {
  const [playersData, setPlayersData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching data
    setPlayersData(MOCK_PLAYERS.filter(p => teamNames.includes(p.team_name)));
  }, [JSON.stringify(teamNames)]);


  return { playersData };
};

export default useFetchSpecificArea;
