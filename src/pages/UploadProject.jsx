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
    <div className="flex justify-center items-center p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg space-y-3"
      >
        <h2 className="text-lg font-bold">Upload Project</h2>

        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}

        <input
          name="name"
          value={form.name}
          placeholder="Project Name"
          onChange={handleChange}
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
          placeholder="Category"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="tags"
          value={form.tags}
          placeholder="Tags (comma separated)"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="content"
          value={form.content}
          placeholder="Content / README"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input name="image" type="file" onChange={handleFile} />
        <input name="video" type="file" onChange={handleFile} />
        <input name="file" type="file" onChange={handleFile} />

        <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Upload
        </button>
      </form>
    </div>
  );
}
