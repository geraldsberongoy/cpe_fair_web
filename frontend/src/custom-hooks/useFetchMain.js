import { useEffect, useState } from "react";
import { fetchMain } from "../api/scoreApi";

const useFetchMain = () => {
  const [mainData, setMainData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMainData = async () => {
      try {
        const data = await fetchMain();
        console.log("Fetched main data:", data);
        setMainData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMainData();
  }, []);

  return { mainData, loading, error };
};

export default useFetchMain;
