import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useContext(UserContext);

  // If the user is logged in, redirect to projects page
  if (user) {
    window.location.href = "/projects";
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        🚀 Welcome to ProjectUploader
      </h1>
      <p className="mb-4 text-gray-600 text-center">
        Please register or login to manage your projects
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        <Link
          to="/register"
          className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="bg-green-500 text-white px-6 py-3 rounded shadow hover:bg-green-600 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
