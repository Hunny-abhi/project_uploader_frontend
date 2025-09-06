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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://cdn.pixabay.com/video/2020/03/13/33628-397860881_large.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Optional Dark Overlay for better contrast */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">
          Welcome to ContentUploader
        </h1>
        <p className="mb-4 text-gray-200">
          Please register or login to manage your ContentUploader
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
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
    </div>
  );
}
