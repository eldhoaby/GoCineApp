// Centralized API base URL configuration
// In development: falls back to http://localhost:3000
// In production: set VITE_API_URL environment variable to your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default API_BASE_URL;
