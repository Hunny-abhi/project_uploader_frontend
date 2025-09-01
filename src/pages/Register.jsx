import React, { useState } from "react";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", avatar: null });

  const handleChange = (e) => {
    if (e.target.name === "avatar")
      setForm({ ...form, avatar: e.target.files[0] });
    else setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("email", form.email);
      data.append("password", form.password);
      if (form.avatar) data.append("avatar", form.avatar);

      await API.post("/auth/register", data);
      alert("✅ Registered! Please login");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-lg max-w-md mx-auto space-y-3 rounded mt-10"
    >
      <h2 className="font-bold text-lg">Register</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input name="avatar" type="file" onChange={handleChange} />
      <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Register
      </button>
    </form>
  );
}
