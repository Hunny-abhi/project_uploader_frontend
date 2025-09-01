import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // backend ka base URL
});

// Token attach karne ke liye middleware
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
