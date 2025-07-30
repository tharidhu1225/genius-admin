import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ViewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryItem = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/gallery/${id}`);
        setItem(res.data);
      } catch (err) {
        toast.error("Failed to load gallery item.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItem();
  }, [id, API_URL]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-lg">Gallery item not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-blue-600 hover:underline"
        >
          ← Back to Gallery
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">{item.title}</h1>

        {item.description && (
          <p className="text-gray-600 mb-4">{item.description}</p>
        )}

        {item.imageUrl && item.imageUrl.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {item.imageUrl.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Gallery ${index}`}
                className="w-full h-48 object-cover rounded-md shadow-sm"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No images available.</p>
        )}
      </div>
    </div>
  );
}
