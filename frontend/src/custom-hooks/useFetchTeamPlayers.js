import { useState, useEffect } from "react";
import { supabase } from "../supabase/config";

const useFetchTeamPlayers = (teamName) => {
  const [playersData, setPlayersData] = useState([]);

  useEffect(() => {
    if (!teamName) return;

    const fetchPlayersData = async () => {
      const { data, error } = await supabase
        .from("team_players")
        .select("*")
        .eq("team_name", teamName);

      if (data) {
        setPlayersData(data);
      } else {
        console.error(error);
      }
    };

    fetchPlayersData();

    const subscription = supabase
      .channel("realtime:team_players")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "team_players" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setPlayersData((prev) => [...prev, payload.new]);
          } else if (payload.eventType === "UPDATE") {
            setPlayersData((prev) =>
              prev.map((player) =>
                player.id === payload.new.id ? payload.new : player
              )
            );
          } else if (payload.eventType === "DELETE") {
            setPlayersData((prev) =>
              prev.filter((player) => player.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [teamName]);

  return { playersData };
};

export default useFetchTeamPlayers;
