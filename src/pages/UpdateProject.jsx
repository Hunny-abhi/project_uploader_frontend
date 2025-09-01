import React, { useState, useEffect } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    status: "Pending",
    category: "",
    tags: [],
    description: "",
    content: "",
  });
  const [files, setFiles] = useState({ image: null, video: null, file: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem("token");
      try {
        setLoading(true);
        const res = await API.get(`/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setForm({
          name: res.data.name || "",
          status: res.data.status || "Pending",
          category: res.data.category || "",
          tags: res.data.tags || [],
          description: res.data.description || "",
          content: res.data.content || "",
        });
      } catch (err) {
        console.error(err);
        setError(
          err.response?.status === 403
            ? "You do not have permission to edit this project."
            : "Failed to fetch project data."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // 🔹 Text input handler
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 🔹 File input handler
  const handleFile = (e) =>
    setFiles({ ...files, [e.target.name]: e.target.files[0] });

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("name", form.name);
    data.append("status", form.status);
    data.append("category", form.category);
    data.append("description", form.description);
    data.append("content", form.content);

    // ✅ tags ko array → string
    if (form.tags && form.tags.length > 0) {
      data.append(
        "tags",
        Array.isArray(form.tags) ? form.tags.join(",") : form.tags
      );
    }

    // ✅ files add karo agar user ne choose kiya hai
    if (files.image) data.append("image", files.image);
    if (files.video) data.append("video", files.video);
    if (files.file) data.append("file", files.file);

    try {
      await API.put(`/projects/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("✅ Project updated successfully");
      navigate("/projects");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.status === 403
          ? "You do not have permission to update this project."
          : "Failed to update project."
      );
    }
  };

  if (loading) return <p className="p-6">Loading project data...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-3 max-w-lg mx-auto bg-white rounded shadow-lg"
    >
      <h2 className="font-bold text-lg">Update Project</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full border p-2 rounded"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="Pending">Pending</option>
        <option value="Complete">Complete</option>
      </select>

      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full border p-2 rounded"
      />

      <input
        name="tags"
        value={form.tags ? form.tags.join(",") : ""}
        onChange={(e) =>
          setForm({
            ...form,
            tags: e.target.value.split(",").map((t) => t.trim()),
          })
        }
        placeholder="Tags (comma separated)"
        className="w-full border p-2 rounded"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />

      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        className="w-full border p-2 rounded"
      />

      <label className="block">
        Image:
        <input name="image" type="file" onChange={handleFile} />
      </label>
      <label className="block">
        Video:
        <input name="video" type="file" onChange={handleFile} />
      </label>
      <label className="block">
        File:
        <input name="file" type="file" onChange={handleFile} />
      </label>

      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Update
      </button>
    </form>
  );
}
