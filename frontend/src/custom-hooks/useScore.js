import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  fetchScores,
  createScore,
  updateScore,
  deleteScore,
} from "../api/scoreApi";

const useScore = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all scores
  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchScores();
      setScores(data);
    } catch (err) {
      setError(err?.message || "Failed to load scores");
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new score
  const create = useCallback(
    async (newScoreData) => {
      try {
        setLoading(true);
        setError(null);

        await createScore(newScoreData);
        toast.success("Score added successfully");

        await fetchAll();
      } catch (err) {
        setError(err?.message || "Failed to create score");
        toast.error("An error occurred while adding the score");
      } finally {
        setLoading(false);
      }
    },
    [fetchAll]
  );

  // Update a score
  const update = useCallback(
    async (id, updatedData) => {
      try {
        setLoading(true);
        setError(null);

        await updateScore(id, updatedData);
        toast.success("Score updated successfully");

        await fetchAll();
      } catch (err) {
        setError(err?.message || "Failed to update score");
        toast.error("An error occurred while updating the score");
      } finally {
        setLoading(false);
      }
    },
    [fetchAll]
  );

  // Delete a score
  const remove = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);

        await deleteScore(id);
        toast.success("Score deleted successfully");

        await fetchAll();
      } catch (err) {
        setError(err?.message || "Failed to delete score");
        toast.error("An error occurred while deleting the score");
      } finally {
        setLoading(false);
      }
    },
    [fetchAll]
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { scores, loading, error, fetchAll, create, update, remove };
};

export default useScore;
