import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditPaper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState({
    title: "",
    subject: "",
    medium: "",
    grade: "",
    paperCategory: "",
    downloadLink: "",
  });
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL; 

  // Fetch paper by ID
  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/paper/${id}`);
        setPaper(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching paper:", err);
      }
    };
    fetchPaper();
  }, [id, API_URL]);

  const handleChange = (e) => {
    setPaper({ ...paper, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/paper/${id}`, paper);
      alert("Paper updated successfully!");
      navigate("/papers"); // 👈 Redirect to papers list page
    } catch (err) {
      alert("Error updating paper");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading paper data...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Paper</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "subject", "medium", "grade", "paperCategory", "downloadLink"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={paper[field]}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Paper
        </button>
      </form>
    </div>
  );
}
