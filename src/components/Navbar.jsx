import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserContext } from "../context/UserContext";
import Projects from "../pages/Projects";
import Profile from "../pages/Profile";
// import ResetPassword from "../pages/ResetPassword";
// import ForgotPassword from "../pages/ForgotPassword";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <motion.nav
      className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo / App name */}
      <h1 className="font-bold text-xl">🚀 ProjectUploader</h1>

      {/* Menu Items */}
      <div className="flex space-x-4 items-center">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>

        {user && (
          <>
            <Link to="/projects" className="hover:text-blue-400">
              Projects
            </Link>
            <Link to="/upload" className="hover:text-blue-400">
              Upload
            </Link>
            <Link to="/profile" className="hover:text-blue-400">
              Profile
            </Link>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-400">
              Register
            </Link>
            <Link to="/forgot-password" className="hover:text-yellow-400">
              Forgot Password?
            </Link>
            <Link to="/reset-password" className="hover:text-green-400">
              Reset Password
            </Link>
          </>
        )}

        {user && (
          <button
            onClick={logout}
            className="hover:text-red-500 font-semibold px-2 py-1 rounded border border-red-500"
          >
            Logout
          </button>
        )}
      </div>
    </motion.nav>
  );
}
