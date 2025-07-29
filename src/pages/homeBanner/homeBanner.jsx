import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { Trash2 } from "lucide-react";

export default function HomeBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchBanners = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/upload/uploads`
      );
      setBanners(res.data);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    try {
      setDeletingId(id);
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/upload/${id}`);
      toast.success("🗑️ Banner deleted successfully");
      setBanners((prev) => prev.filter((banner) => banner._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete banner");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🏠 Home Banners</h1>
        <Link
          to="/addHomeBanner"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          ➕ Add New Banner
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-gray-600 text-lg">Loading banners...</div>
      ) : banners.length === 0 ? (
        <div className="text-center text-gray-500 italic py-10">
          No banners uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <motion.div
              key={banner._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden relative"
            >
              <img
                src={banner.thumbnailUrl}
                alt={banner.title}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => handleDelete(banner._id)}
                disabled={deletingId === banner._id}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete Banner"
              >
                <Trash2 size={18} />
              </button>

              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">{banner.title}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {banner.description || "No description"}
                </p>
                <p className="text-xs text-gray-400 mt-3">
                  📅 {new Date(banner.createdAt).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
