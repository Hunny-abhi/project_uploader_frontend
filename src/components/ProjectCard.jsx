{
  /* project list */
}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects
    .filter((p) => p.name?.toLowerCase().includes(search.toLowerCase()))
    .map((p) => {
      // 📎 File icon detect
      const getFileIcon = (filePath) => {
        if (!filePath) return "📎";
        const ext = filePath.split(".").pop().toLowerCase();
        if (ext === "pdf") return "📄";
        if (["doc", "docx"].includes(ext)) return "📝";
        if (["ppt", "pptx"].includes(ext)) return "📊";
        if (["xls", "xlsx"].includes(ext)) return "📑";
        if (["zip", "rar"].includes(ext)) return "📦";
        if (["mp4", "mkv", "mov"].includes(ext)) return "🎬";
        return "📎";
      };

      return (
        <motion.div
          key={p._id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transform transition-all"
        >
          {/* Media section */}
          {p.image && (
            <img
              src={p.image}
              alt="project"
              className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition"
            />
          )}
          {!p.image && p.video && (
            <video
              src={p.video}
              controls
              className="w-full h-48 object-cover cursor-pointer rounded-t-xl"
            />
          )}

          <div className="p-4 space-y-2">
            {/* Title */}
            <h3 className="font-bold text-xl text-gray-800">{p.name}</h3>

            {/* Description */}
            <p className="text-gray-600 line-clamp-2">{p.description}</p>

            {/* Category + Status */}
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                {p.category || "Uncategorized"}
              </span>
              <span
                className={`px-2 py-1 rounded-full ${
                  p.status === "Complete"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {p.status}
              </span>
            </div>

            {/* Tags */}
            <div className="text-sm text-gray-500">
              {p.tags && p.tags.length > 0 ? (
                <span>#{p.tags.join(" #")}</span>
              ) : (
                "No tags"
              )}
            </div>

            {/* File section */}
            {p.file && (
              <motion.a
                href={p.file}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 mt-3 p-2 bg-gray-100 rounded-md text-blue-600 hover:underline text-sm"
              >
                <span className="text-xl">{getFileIcon(p.file)}</span>
                <span className="truncate">Download File</span>
              </motion.a>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t mt-3">
              <span className="text-xs text-gray-400">
                By:{" "}
                {typeof p.createdBy === "object"
                  ? p.createdBy.email
                  : "Unknown"}
              </span>

              {isOwner(p) && (
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openEditModal(p)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      );
    })}
</div>;
