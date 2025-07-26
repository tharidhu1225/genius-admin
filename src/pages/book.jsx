import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { MdLibraryBooks } from "react-icons/md";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [grade, setGrade] = useState("");
  const [medium, setMedium] = useState("");
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, [grade, medium, subject]);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/books`,
        {
          params: { grade, medium, subject },
        }
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/books/${id}`);
      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📚 Books</h1>
        <Link
          to="/addbook"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow transition"
        >
          + Add Book
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
      </div>

      {/* Book list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          // 🔄 Loading Skeleton
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
        ) : books.length > 0 ? (
          books.map((book) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded shadow p-4 border relative group"
            >
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <Link to={`/editbook/${book._id}`}>
                  <FiEdit className="text-blue-600 hover:text-blue-800 cursor-pointer" />
                </Link>
                <FiTrash2
                  onClick={() => handleDelete(book._id)}
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {book.title}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                🎓 Grade: {book.grade}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                🌐 Medium: {book.medium}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                📖 Subject: {book.subject}
              </p>
              <a
                href={book.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline font-medium"
              >
                📥 Download PDF
              </a>
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
    <p className="text-lg font-medium">No books found for the selected filters.</p>
    <p className="text-sm text-gray-400">Try adjusting your filters or adding new books.</p>
  </motion.div>
        )}
      </div>
    </div>
  );
}
