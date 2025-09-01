import React, { useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(""); // store token temporarily
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setToken("");

    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMessage(res.data.message || "Token sent to your email!");
      setToken(res.data.token); // backend should return token for demo or testing
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send reset password email."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-bold">Forgot Password</h2>

      {message && (
        <div className="bg-green-100 text-green-800 p-2 rounded">{message}</div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 p-2 rounded">{error}</div>
      )}

      {!token && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Send Reset Link
          </button>
        </form>
      )}

      {/* Show reset link dynamically after token is sent */}
      {token && (
        <div className="space-y-2">
          <p>✅ Token sent! Click below to reset your password:</p>
          <Link
            to={`/reset-password/${token}`}
            className="text-blue-500 hover:underline"
          >
            Reset Password
          </Link>
        </div>
      )}
    </div>
  );
}
