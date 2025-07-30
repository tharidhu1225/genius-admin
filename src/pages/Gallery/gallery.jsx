import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/gallery`);
      setGalleryItems(res.data);
    } catch (err) {
      toast.error("Failed to fetch gallery.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this item?");
    if (!confirm) return;

    try {
      await axios.delete(`${API_URL}/api/gallery/${id}`);
      toast.success("Item deleted");
      setGalleryItems(galleryItems.filter((item) => item._id !== id));
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Gallery</h1>
        <Link
          to="/addGallery"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : galleryItems.length === 0 ? (
        <p className="text-center text-gray-600">No gallery items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
            >
              <button
                className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 p-1 rounded-full"
                onClick={() => handleDelete(item._id)}
              >
                <FaTrash size={14} />
              </button>

              {item.imageUrl[0] && (
                <img
                  src={item.imageUrl[0]}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h2>
                {item.description && (
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                )}
                <Link
                  to={`/gallery/${item._id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
