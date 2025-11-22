import api from "./axiosClient";

export const fetchScores = () => api.get("/score");
export const createScore = (data) => api.post("/score", data);
export const updateScore = (id, data) => api.put(`/score/${id}`, data);
export const deleteScore = (id) => api.delete(`/score/${id}`);
