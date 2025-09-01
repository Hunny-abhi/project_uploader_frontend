import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import API from "../api";

// ==========================
// Forgot Password Component
// ==========================
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      {message && <p className="text-green-500 mb-2">{message}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Send Reset Link
        </button>
      </form>
      <p className="text-sm mt-2">
        Remembered your password?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

// ==========================
// Reset Password Component
// ==========================
function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await API.post(`/auth/reset-password/${token}`, { password });
      setMessage(res.data.message);
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      {message && <p className="text-green-500 mb-2">{message}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Reset Password
        </button>
      </form>
    </div>
  );
}

// ==========================
// Update Password Component
// ==========================
function UpdatePassword() {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPass !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await API.put(
        "/auth/update-password",
        { currentPassword: current, newPassword: newPass },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setError("");
      setCurrent("");
      setNewPass("");
      setConfirm("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Update Password</h2>
      {message && <p className="text-green-500 mb-2">{message}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="password"
          placeholder="Current Password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
          Update Password
        </button>
      </form>
    </div>
  );
}

// ==========================
// Main Router Component
// ==========================
export default function PasswordManagement() {
  return (
    <Router>
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Routes>
    </Router>
  );
}
