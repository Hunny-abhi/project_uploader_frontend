import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function UploadProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    status: "Pending",
    category: "",
    tags: "",
    description: "",
    content: "",
  });
  const [files, setFiles] = useState({ image: null, video: null, file: null });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) =>
    setFiles({ ...files, [e.target.name]: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (files.image) data.append("image", files.image);
      if (files.video) data.append("video", files.video);
      if (files.file) data.append("file", files.file);

      const res = await API.post("/projects/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message);
      setError("");

      // ✅ Reset all form fields
      setForm({
        name: "",
        status: "Pending",
        category: "",
        tags: "",
        description: "",
        content: "",
      });
      setFiles({ image: null, video: null, file: null });

      // ✅ Redirect after short delay
      setTimeout(() => navigate("/projects"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-blue-50 flex justify-center items-center p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg space-y-4"
      >
        {/* Form Heading */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Upload Project
        </h2>

        {/* Success & Error Messages */}
        {message && <p className="text-green-500 text-sm">{message}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Project Name */}
        <input
          name="name"
          value={form.name}
          placeholder="Project Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Status */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Complete">Complete</option>
        </select>

        {/* Category */}
        <input
          name="category"
          value={form.category}
          placeholder="Category"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Tags */}
        <input
          name="tags"
          value={form.tags}
          placeholder="Tags (comma separated)"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="space-y-4">
          {/* Content */}
          <textarea
            name="content"
            value={form.content}
            placeholder="Content"
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

          {/* Tags */}
          <input
            name="tags"
            value={form.tags}
            placeholder="Tags (comma separated)"
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

          {/* Image */}
          <label className="block text-sm font-normal text-gray-500">
            Image
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="w-full border rounded p-2 mt-1"
            />
          </label>

          {/* Video */}
          <label className="block text-sm font-normal text-gray-500">
            Video
            <input
              name="video"
              type="file"
              accept="video/*"
              onChange={handleFile}
              className="w-full border rounded p-2 mt-1"
            />
          </label>

          {/* File */}
          <label className="block text-sm font-normal text-gray-500">
            File
            <input
              name="file"
              type="file"
              onChange={handleFile}
              className="w-full border rounded p-2 mt-1"
            />
          </label>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
