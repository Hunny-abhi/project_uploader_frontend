import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await API.post("/auth/verify-email", { token });
        setMessage(res.data.message);
        setError("");
        setTimeout(() => navigate("/login"), 3000); // ✅ 3 sec baad login page
      } catch (err) {
        setError(err.response?.data?.message || "Verification failed");
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setError("Invalid verification link.");
    }
  }, [token, navigate]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg mt-10 text-center">
      <h2 className="text-xl font-bold mb-4">Email Verification</h2>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
