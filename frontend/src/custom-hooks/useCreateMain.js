import { toast } from "react-toastify";
import { createMain } from "../api/scoreApi";

const useCreateMain = async (newMainData) => {
  try {
    await createMain(newMainData);
    toast.success("Successfully added the player");
    console.log("Successfully added the player");
  } catch (error) {
    toast.error("An error occurred while saving the player");
  }
};

export default useCreateMain;
