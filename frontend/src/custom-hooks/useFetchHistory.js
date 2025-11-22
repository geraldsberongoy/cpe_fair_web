import { useEffect, useState } from "react";
import { supabase } from "../supabase/config";
import { toast } from "react-toastify";

const useFetchHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        // Fetch data from 'history' table and join with 'main' to get team/player details
        const { data, error } = await supabase
          .from("history")
          .select(
            "id, points_gained, created_at, reference_main_id, main(full_name, team_name)"
          )
          .order("created_at", { ascending: false });

        if (error) {
          toast.error("Error fetching history:", error);
          setLoading(false);
          return;
        }

        // Process the fetched data
        const formattedHistory = data.map((item) => {
          const isPointsGained = item.points_gained > 0;
          const date = new Date(item.created_at);

          // Format the date to "December 04, 2024"
          const formattedDate = date.toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          });

          // Format the time to "3:00 PM"
          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          return {
            fullNameOrTeam: item.main.full_name || item.main.team_name,
            points: item.points_gained,
            formattedDate,
            formattedTime,
            action: isPointsGained ? "accumulated" : "deducted",
          };
        });

        setHistoryData(formattedHistory);
        setLoading(false);
      } catch (error) {
        toast.error("Error:", error);
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, []);

  return { historyData, loading };
};

export default useFetchHistory;
