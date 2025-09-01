import React, { useEffect, useState, useContext } from "react";
import API from "../api";
import { motion } from "framer-motion";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Projects() {
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // modal state
  const [editingProject, setEditingProject] = useState(null);
  const [files, setFiles] = useState({ image: null, video: null, file: null });

  const isOwner = (p) => {
    const ownerId =
      typeof p.createdBy === "string" ? p.createdBy : p.createdBy?._id;
    return user?.userId === ownerId;
  };

  const fetchProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const res = search
        ? await API.get(`/projects/search?name=${encodeURIComponent(search)}`)
        : await API.get("/projects/all");
      setProjects(res.data || []);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError("Failed to fetch projects.");
      toast.error("❌ Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [search]);

  const openEditModal = (p) => {
    setEditingProject({
      ...p,
      tags: Array.isArray(p.tags)
        ? p.tags
        : typeof p.tags === "string"
        ? p.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    });
    setFiles({ image: null, video: null, file: null });
  };

  const closeEditModal = () => {
    setEditingProject(null);
    setFiles({ image: null, video: null, file: null });
  };

  const handleField = (key, value) =>
    setEditingProject((prev) => ({ ...prev, [key]: value }));

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
      toast.success("🗑️ Project deleted successfully");
    } catch (err) {
      console.error("Failed to delete project:", err);
      toast.error("❌ Failed to delete project");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      console.log("Token:", token);

      formData.append("name", editingProject.name || "");
      formData.append("category", editingProject.category || "");
      formData.append("description", editingProject.description || "");
      formData.append("content", editingProject.content || "");
      formData.append("status", editingProject.status || "Pending");

      const tagArray = Array.isArray(editingProject.tags)
        ? editingProject.tags
        : (editingProject.tags || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

      formData.append("tags", tagArray.join(","));

      if (files.image) formData.append("image", files.image);
      if (files.video) formData.append("video", files.video);
      if (files.file) formData.append("file", files.file);

      await API.put(`/projects/${editingProject._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("✅ Project updated successfully");
      closeEditModal();
      fetchProjects();
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("❌ Failed to update project");
    }
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <input
        type="text"
        placeholder="Search projects"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      {loading && <p className="mb-4">Loading projects...</p>}
      {error && <p className="mb-4 text-red-500">{error}</p>}
      {!loading && projects.length === 0 && (
        <p className="mb-4 text-gray-500">No projects found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <motion.div
            key={p._id}
            className="bg-white shadow-lg rounded-lg p-4 space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="font-bold text-lg">{p.name}</h3>
            <p>{p.description}</p>
            <p>Status: {p.status}</p>
            <p>Tags: {(p.tags && p.tags.join(", ")) || "No tags"}</p>

            {p.image && (
              <img
                src={p.image}
                alt="project"
                className="w-full h-40 object-cover rounded"
              />
            )}
            {p.video && (
              <video
                src={p.video}
                controls
                className="w-full h-40 object-cover rounded"
              />
            )}

            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">
                By: {typeof p.createdBy === "object" ? p.createdBy.email : ""}
              </span>

              {isOwner(p) && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(p)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Responsive Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Edit Project</h2>

            {/* current previews */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              {editingProject.image && (
                <img
                  src={editingProject.image}
                  alt="current"
                  className="w-full h-32 object-cover rounded border"
                />
              )}
              {editingProject.video && (
                <video
                  src={editingProject.video}
                  controls
                  className="w-full h-32 object-cover rounded border"
                />
              )}
            </div>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                value={editingProject.name || ""}
                onChange={(e) => handleField("name", e.target.value)}
                placeholder="Name"
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                value={editingProject.category || ""}
                onChange={(e) => handleField("category", e.target.value)}
                placeholder="Category"
                className="w-full border p-2 rounded"
              />

              <select
                value={editingProject.status || "Pending"}
                onChange={(e) => handleField("status", e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Complete">Complete</option>
              </select>

              <textarea
                value={editingProject.description || ""}
                onChange={(e) => handleField("description", e.target.value)}
                placeholder="Description"
                className="w-full border p-2 rounded"
              />

              <textarea
                value={editingProject.content || ""}
                onChange={(e) => handleField("content", e.target.value)}
                placeholder="Content"
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                value={
                  Array.isArray(editingProject.tags)
                    ? editingProject.tags.join(",")
                    : editingProject.tags || ""
                }
                onChange={(e) =>
                  handleField(
                    "tags",
                    e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                  )
                }
                placeholder="Tags (comma separated)"
                className="w-full border p-2 rounded"
              />

              {/* file pickers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <label className="block text-sm">
                  Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFiles((f) => ({ ...f, image: e.target.files[0] }))
                    }
                    className="w-full border p-2 rounded mt-1"
                  />
                </label>
                <label className="block text-sm">
                  Video
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      setFiles((f) => ({ ...f, video: e.target.files[0] }))
                    }
                    className="w-full border p-2 rounded mt-1"
                  />
                </label>
                <label className="block text-sm">
                  File
                  <input
                    type="file"
                    onChange={(e) =>
                      setFiles((f) => ({ ...f, file: e.target.files[0] }))
                    }
                    className="w-full border p-2 rounded mt-1"
                  />
                </label>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 w-full sm:w-auto"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
