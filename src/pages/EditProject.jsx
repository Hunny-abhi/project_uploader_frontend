import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

export default function EditProject() {
  const { id } = useParams(); // project id from URL
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    category: "",
    tags: "",
    description: "",
    content: "",
    image: null,
    video: null,
    file: null,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 🔹 Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/projects/${id}`);
        setProject(res.data);
        setFormData({
          name: res.data.name || "",
          status: res.data.status || "",
          category: res.data.category || "",
          tags: res.data.tags?.join(",") || "",
          description: res.data.description || "",
          content: res.data.content || "",
        });
      } catch (err) {
        setError("❌ Failed to load project");
      }
    };
    fetchProject();
  }, [id]);

  // 🔹 Handle form change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      const res = await API.put(`/projects/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message);
      setError("");
      setTimeout(() => navigate("/projects"), 500);
    } catch (err) {
      setError(err.response?.data?.message || "❌ Something went wrong");
    }
  };

  if (!project) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">✏️ Edit Project</h2>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div>
          <label className="block font-semibold">Upload Image</label>
          <input type="file" name="image" onChange={handleChange} />
        </div>

        <div>
          <label className="block font-semibold">Upload Video</label>
          <input type="file" name="video" onChange={handleChange} />
        </div>

        <div>
          <label className="block font-semibold">Upload File</label>
          <input type="file" name="file" onChange={handleChange} />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Project
        </button>
      </form>

      {/* Show last updated time */}
      {project.updatedAtIndia && (
        <p className="mt-4 text-sm text-gray-600">
          ⏰ Last Updated: {project.updatedAtIndia}
        </p>
      )}
    </div>
  );
}
