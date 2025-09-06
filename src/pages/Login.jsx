import React, { useState, useContext } from "react";
import API from "../api"; // ✅ Make sure axios baseURL set hai
import { UserContext } from "../context/UserContext";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // input change handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error before API call

    try {
      const res = await API.post("/auth/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      // ✅ Token save karo localStorage me
      localStorage.setItem("token", res.data.token);

      // ✅ User context update karo
      setUser({
        userId: res.data.user._id,
        role: res.data.user.role,
        email: res.data.user.email,
      });

      // ✅ Redirect after login
      window.location.href = "/";
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);

      // ✅ Error message dikhana
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-lg max-w-md mx-auto space-y-4 rounded"
    >
      <h2 className="font-bold text-xl text-center">Login</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
      >
        Login
      </button>
    </form>
  );
}
