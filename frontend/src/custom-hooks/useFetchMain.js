import { useEffect, useState } from "react";

const useFetchMain = () => {
  const [mainData, setMainData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMainData = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/main");
        if (!res.ok) throw new Error("Failed to fetch main data");
        const data = await res.json();
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
