import axios from "axios";

// ✅ Backend ka baseURL env se read karo
// Local:   VITE_API_URL=http://localhost:8000/api
// Prod:    VITE_API_URL=https://contain-loader.onrender.com/api
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: true, // agar cookies use karni ho (JWT/session)
});

// ✅ Request Interceptor → Token attach automatically
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor → Error handling
API.interceptors.response.use(
  (res) => res,
  (err) => {
    // Agar token expire ho gaya hai → logout & redirect
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    // Agar server down hai ya CORS block → generic message
    if (!err.response) {
      console.error("⚠️ Network error ya CORS issue:", err.message);
      alert("Backend se connect nahi ho pa rahe. Thodi der baad try karein.");
    }

    return Promise.reject(err);
  }
);

export default API;
