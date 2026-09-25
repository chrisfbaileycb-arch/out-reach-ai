import axios from 'axios';

// Same-origin by default: Vite proxies /api in development and the backend
// serves the built app in production. Set VITE_API_URL to call another host.
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '' });

let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

// Turns any request failure into a message that's safe to show the user
export const getErrorMessage = (error, fallback = 'Something went wrong. Please try again.') =>
  error?.response?.data?.message || (error?.response ? fallback : 'Cannot reach the server. Check your connection.');

export default api;
