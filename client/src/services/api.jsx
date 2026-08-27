import axios from "axios";

const apiOrigin = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
const apiBaseURL = apiOrigin.endsWith("/api") ? apiOrigin : `${apiOrigin}/api`;

const API = axios.create({
  baseURL: apiBaseURL,
});

export default API;