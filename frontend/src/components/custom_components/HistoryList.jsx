import React from "react";
import useFetchHistory from "../../custom-hooks/useFetchHistory";

export function HistoryList() {
  const { historyData, loading } = useFetchHistory();

  if (loading) {
    return <p>Loading history...</p>;
  }

  return (
    <div>
      <h2>Points History</h2>
      {historyData.length > 0 ? (
        <ul>
          {historyData.map((entry, index) => (
            <li key={index}>
              <p>{entry.fullNameOrTeam}</p>
              <p>
                {entry.points} points {entry.action} on {entry.formattedDate} at{" "}
                {entry.formattedTime}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No history available.</p>
      )}
    </div>
  );
}
