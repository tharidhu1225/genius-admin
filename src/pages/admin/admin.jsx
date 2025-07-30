import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTools, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Admin() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/admin/all`);
      setAdmins(res.data);
    } catch (err) {
      toast.error("Failed to load admins.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this admin account? This action cannot be undone."
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await axios.delete(`${API_URL}/api/admin/${id}`);
      toast.success("Admin deleted successfully.");
      // Refetch admins after delete
      fetchAdmins();
    } catch (err) {
      toast.error("Failed to delete admin.");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
            <FaTools className="text-blue-600" size={32} />
            Admins
          </h1>

          <Link
            to="/add-admin"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
            aria-label="Add new admin account"
          >
            <FaPlus size={18} />
            Add New Admin Account
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            {/* Simple spinner */}
            <svg
              className="animate-spin h-10 w-10 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-label="Loading"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          </div>
        ) : admins.length === 0 ? (
          <p className="text-center text-gray-600 text-xl py-10">No admins found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-auto shadow-sm rounded-lg overflow-hidden">
              <thead className="bg-blue-100 text-gray-700 text-left">
                <tr>
                  <th className="py-3 px-6 border-b border-blue-300 font-semibold">Username</th>
                  <th className="py-3 px-6 border-b border-blue-300 font-semibold">Created At</th>
                  <th className="py-3 px-6 border-b border-blue-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {admins.map(({ _id, username, createdAt }) => (
                  <tr
                    key={_id}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="py-4 px-6 border-b border-blue-200 text-gray-800">{username}</td>
                    <td className="py-4 px-6 border-b border-blue-200 text-gray-600">
                      {new Date(createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 border-b border-blue-200 flex gap-4">
                      <button
                        onClick={() => handleDelete(_id)}
                        disabled={deletingId === _id}
                        className={`text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 rounded ${
                          deletingId === _id ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        aria-label={`Delete admin ${username}`}
                        title="Delete admin"
                      >
                        <FaTrash size={18} />
                      </button>
                      {/* You can add more actions here */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
