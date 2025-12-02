import axios from 'axios';

// Create a base axios instance
const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Use environment variable in production
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor (optional, for auth tokens later)
api.interceptors.request.use(
  (config) => {
    // Attach the admin key if it exists
    if (typeof window !== 'undefined') {
      const secret = localStorage.getItem('celestia_admin_key');
      if (secret) {
        config.headers['x-admin-key'] = secret;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional, for global error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors (e.g., 401 Unauthorized)
    return Promise.reject(error);
  }
);

export default api;
