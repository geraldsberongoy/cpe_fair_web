import { toast } from "react-toastify";
import { supabase } from "../supabase/config";

const useCreateTeam = async (teamData, teamPlayers) => {
  try {
    // Check if the team already exists
    const { data: existingTeam, error: teamError } = await supabase
      .from("main")
      .select("*")
      .eq("id", teamData.id)
      .single();

    if (existingTeam) {
      // If team exists, update the team details
      const { error: updateError } = await supabase
        .from("main")
        .update(teamData)
        .eq("id", teamData.id);

      if (updateError) throw updateError;

      // Now update the players in the team_players table
      const { error: playerDeleteError } = await supabase
        .from("team_players")
        .delete()
        .eq("team_name", teamData.team_name);

      if (playerDeleteError) throw playerDeleteError;

      const playerData = teamPlayers.map((player) => ({
        team_name: teamData.team_name,
        player_name: player,
      }));

      const { error: playerInsertError } = await supabase
        .from("team_players")
        .insert(playerData);

      if (playerInsertError) throw playerInsertError;

      toast.success("Team and players successfully updated!");
    } else {
      // If team does not exist, create new team
      const { data: mainData, error: mainError } = await supabase
        .from("main")
        .insert({
          team_name: teamData.team_name,
          section_team: teamData.section_team,
          game: teamData.game,
        });

      if (mainError) throw mainError;

      // Insert players into the team_players table
      const playerData = teamPlayers.map((player) => ({
        team_name: teamData.team_name,
        player_name: player,
      }));

      const { error: playerError } = await supabase
        .from("team_players")
        .insert(playerData);

      if (playerError) throw playerError;

      toast.success("Team and players successfully registered!");
    }
  } catch (error) {
    console.error("Error handling team:", error);
    toast.error("An error occurred while processing the team.");
  }
};

export default useCreateTeam;
