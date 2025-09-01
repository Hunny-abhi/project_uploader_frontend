import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        const res = await API.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
      <p>
        <strong>Role:</strong> {userData.role}
      </p>
      <p>
        <strong>ID:</strong> {userData._id}
      </p>

      <button
        onClick={() => navigate("/forgot-password")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Reset Password
      </button>
    </div>
  );
}
