import { toast } from "react-toastify";
import { supabase } from "../supabase/config";
import { useEffect } from "react";

const usePointsCrud = () => {
  const updatePoints = async (mainId, pointsChange) => {
    try {
      // Fetch current points
      const { data: mainEntry, error: fetchError } = await supabase
        .from("main")
        .select("points")
        .eq("id", mainId)
        .single();

      if (fetchError) throw fetchError;

      const newPoints = Math.max(0, (mainEntry.points || 0) + pointsChange);

      // Update points in the "main" table
      const { error: updateError } = await supabase
        .from("main")
        .update({ points: newPoints })
        .eq("id", mainId);

      if (updateError) throw updateError;

      // Insert history record
      const { error: historyError } = await supabase.from("history").insert({
        points_gained: pointsChange,
        reference_main_id: mainId,
        created_at: new Date(),
      });

      if (historyError) throw historyError;

      toast.success("Points updated successfully!");
    } catch (error) {
      console.error("Error updating points:", error);
    }
  };

  return { updatePoints };
};

export default usePointsCrud;
