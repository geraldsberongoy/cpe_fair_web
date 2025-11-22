import { useState } from "react";
import { toast } from "react-toastify";
import { deleteMain } from "../api/scoreApi";

const useDeleteMain = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteMain(id);
      toast.success("Successfully deleted the player");
    } catch (err) {
      setError(err);
      toast.error("An error occurred while deleting the player");
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading, error };
};

export default useDeleteMain;
