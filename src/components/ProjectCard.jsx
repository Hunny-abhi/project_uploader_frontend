import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

export default function Projects() {
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      {projects.length === 0 ? (
        <p>No projects available</p>
      ) : (
        <ul className="space-y-3">
          {projects.map((p) => (
            <li
              key={p._id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                {/* ✅ use `p.name` instead of `p.title` */}
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-gray-600">{p.description}</p>
                <p className="text-sm text-gray-500">
                  Status: {p.status} | Category: {p.category}
                </p>
              </div>

              {/* ✅ Only show Edit button if logged in user is owner */}
              {user?.userId === p.owner && (
                <Link
                  to={`/projects/update/${p._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
