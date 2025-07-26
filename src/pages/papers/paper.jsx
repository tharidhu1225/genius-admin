// src/pages/Paper.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { MdLibraryBooks } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Paper() {
  const [papers, setPapers] = useState([]);
  const [grade, setGrade] = useState("");
  const [medium, setMedium] = useState("");
  const [subject, setSubject] = useState("");
  const [paperCategory, setPaperCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPapers();
  }, [grade, medium, subject, paperCategory]);

  const fetchPapers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/paper`,
        {
          params: { grade, medium, subject, paperCategory },
        }
      );
      setPapers(response.data);
    } catch (error) {
      console.error("Error fetching papers:", error);
      toast.error("Failed to load papers.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this paper?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/paper/${id}`);
      toast.success("Paper deleted successfully!");
      fetchPapers();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete paper.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/editpaper/${id}`);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📄 Papers</h1>
        <Link
          to="/addpaper"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow transition"
        >
          + Add Paper
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="px-4 py-2 border rounded shadow-sm"
        >
          <option value="">All Grades</option>
          {["06", "07", "08", "09", "10", "11"].map((g) => (
            <option key={g} value={g}>
              Grade {g}
            </option>
          ))}
        </select>

        <select
          value={medium}
          onChange={(e) => setMedium(e.target.value)}
          className="px-4 py-2 border rounded shadow-sm"
        >
          <option value="">All Mediums</option>
          <option value="Sinhala">Sinhala</option>
          <option value="English">English</option>
          <option value="Tamil">Tamil</option>
        </select>

        <input
          type="text"
          placeholder="Search by Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="px-4 py-2 border rounded shadow-sm flex-1 min-w-[200px]"
        />

        <select
          value={paperCategory}
          onChange={(e) => setPaperCategory(e.target.value)}
          className="px-4 py-2 border rounded shadow-sm"
        >
          <option value="">All Categories</option>
          <option value="Term Test I">Term Test I</option>
          <option value="Term Test II">Term Test II</option>
          <option value="Term Test III">Term Test III</option>
          <option value="O/L Past Papers">O/L Past Papers</option>
          <option value="Model Paper">Model Paper</option>
        </select>
      </div>

      {/* Paper list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white border rounded p-4 shadow"
              >
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 w-1/3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
              </div>
            ))
        ) : papers.length > 0 ? (
          papers.map((paper) => (
            <motion.div
              key={paper._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded shadow p-4 border relative group"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {paper.title}
              </h2>
              <p className="text-sm text-gray-600 mb-1">🎓 Grade: {paper.grade}</p>
              <p className="text-sm text-gray-600 mb-1">🌐 Medium: {paper.medium}</p>
              <p className="text-sm text-gray-600 mb-1">📖 Subject: {paper.subject}</p>
              <p className="text-sm text-gray-600 mb-2">
                📂 Category: {paper.paperCategory}
              </p>
              <div className="flex items-center justify-between mt-3">
                <a
                  href={paper.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium text-sm"
                >
                  📥 Download Paper
                </a>
                <div className="flex gap-3 text-gray-500 group-hover:text-gray-800">
                  <button
                    onClick={() => handleEdit(paper._id)}
                    title="Edit"
                    className="focus:outline-none"
                  >
                    <FiEdit2 className="hover:text-blue-600 transition" size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(paper._id)}
                    title="Delete"
                    className="focus:outline-none"
                  >
                    <FiTrash2 className="hover:text-red-600 transition" size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="col-span-full flex flex-col items-center justify-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MdLibraryBooks className="text-5xl mb-2 text-gray-400" />
            <p className="text-lg font-medium">
              No papers found for the selected filters.
            </p>
            <p className="text-sm text-gray-400">
              Try changing filters or check back later.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
