import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UploadProject from "./pages/UploadProject";
import UpdateProject from "./pages/UpdateProject";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Projects from "./pages/Projects"; // Make sure you create this component
import Profile from "./pages/Profile";
import EditProject from "./pages/EditProject";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />{" "}
        {/* Projects list page */}
        <Route path="/projects/update/:id" element={<UpdateProject />} />
        <Route path="/upload" element={<UploadProject />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/projects/:id/edit" element={<EditProject />} />
        <Route
          path="*"
          element={<div className="p-6 text-center">Page Not Found</div>}
        />{" "}
        {/* 404 fallback */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
