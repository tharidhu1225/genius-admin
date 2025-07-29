import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { Loader2, ImagePlus } from "lucide-react";

export default function AddHomeBanner() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("fileUrl", "N/A");
    formData.append("thumbnail", thumbnail);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("✅ Upload successful!");
      setTitle("");
      setDescription("");
      setThumbnail(null);

      setTimeout(() => navigate("/homebanner"), 1500);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 bg-white border border-gray-200 rounded-3xl shadow-xl px-8 py-10">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        📸 Add Home Banner
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Banner Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Mid-Year Sale Banner"
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Description <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe this banner briefly..."
            rows={4}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Upload Thumbnail <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            required
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-xl cursor-pointer bg-gray-50 file:bg-blue-50 file:border-none file:text-blue-600 file:py-2 file:px-4 hover:file:bg-blue-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 text-white font-semibold px-4 py-3 rounded-xl transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" /> Uploading...
            </>
          ) : (
            <>
              <ImagePlus className="w-5 h-5" /> Upload Banner
            </>
          )}
        </button>
      </form>
    </div>
  );
}
