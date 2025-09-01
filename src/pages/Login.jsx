import React, { useState, useContext } from "react";
import API from "../api"; // ensure baseURL set hai
import { UserContext } from "../context/UserContext";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // error state

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error
    try {
      const res = await API.post("/auth/login", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Save token & set user
      localStorage.setItem("token", res.data.token);
      setUser({ userId: res.data.user._id, role: res.data.user.role });

      // Redirect
      window.location.href = "/";
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      // show error to user
      setError(
        err.response?.data?.message || "Login failed. Check credentials."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-lg max-w-md mx-auto space-y-3 rounded"
    >
      <h2 className="font-bold text-lg">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
        Login
      </button>
    </form>
  );
}
