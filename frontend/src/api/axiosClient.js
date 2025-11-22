import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
});

// Optional: Add interceptors later for token
api.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error.response?.data || error.message)
);

export default api;
