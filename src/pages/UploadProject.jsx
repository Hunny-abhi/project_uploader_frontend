import React from "react";
import { useState } from "react";
import API from "../api";
import { i } from "framer-motion/client";

export default function UploadProject() {
  const [form, setForm] = useState({
    name: "",
    status: "Pending",
    category: "",
    tags: "",
    description: "",
    content: "",
  });
  const [files, setFiles] = useState({ image: null, video: null, file: null });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = (e) =>
    setFiles({ ...files, [e.target.name]: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (files.image) data.append("image", files.image);
    if (files.video) data.append("video", files.video);
    if (files.file) data.append("file", files.file);

    await API.post("/projects/upload", data);
    alert("✅ Project uploaded");
  };

  return (
    <div className="flex justify-center items-center p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg space-y-3"
      >
        <h2 className="text-lg font-bold">Upload Project</h2>
        <input
          name="name"
          placeholder="Project Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <select
          name="status"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Complete">Complete</option>
        </select>
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="content"
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
