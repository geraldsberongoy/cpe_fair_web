import { useState, useEffect } from "react";

const MOCK_SCORES = [
  {
    id: "1",
    game: "Overall", // Changed to Overall to show in main view
    section_team: "ferrari",
    points: 120,
    full_name: "Charles Leclerc",
    team_name: "Ferrari Team",
  },
  {
    id: "2",
    game: "Overall",
    section_team: "mercedes",
    points: 100,
    full_name: "Lewis Hamilton",
    team_name: "Mercedes Team",
  },
  {
    id: "3",
    game: "Overall",
    section_team: "redbull",
    points: 150,
    full_name: "Max Verstappen",
    team_name: "Red Bull Racing",
  },
  {
    id: "4",
    game: "Overall",
    section_team: "mclaren",
    points: 90,
    full_name: "Lando Norris",
    team_name: "McLaren Team",
  },
  {
    game: "Overall",
    section_team: "aston_martin",
    points: 70,
    full_name: "Fernando Alonso",
    team_name: "Aston Martin Team",
  },
  {
    id: "6",
    game: "Overall",
    section_team: "alpine",
    points: 40,
    full_name: "Fernando Lorenz",
    team_name: "Alpine Team",
  },
  {
    id: "7",
    game: "Overall",
    section_team: "haas",
    points: 20,
    full_name: "Fernando Lorenz",
    team_name: "Haas Team",
  },
];

const useScore = () => {

  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setScores(MOCK_SCORES);
      setLoading(false);
    }, 500);
  };

  const create = async (data: any) => {
    console.log("Mock create:", data);
  };

  const update = async (id: string, data: any) => {
    console.log("Mock update:", id, data);
  };

  const remove = async (id: string) => {
    console.log("Mock remove:", id);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { scores, loading, error, fetchAll, create, update, remove };
};

export default useScore;
