import axios from "axios";

const API = axios.create({
  baseURL: "https://contain-loader.onrender.com/api", // backend ka base URL
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
