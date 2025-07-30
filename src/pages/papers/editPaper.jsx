import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const subjectsByGrade = {
  "06": ["Mathematics",
    "Science",
    "Sinhala",
    "English"],
  "07": ["Mathematics",
    "Science",
    "Sinhala",
    "English"],
  "08": ["Mathematics",
    "Science",
    "Sinhala",
    "English"],
  "09": ["Mathematics",
    "Science",
    "Sinhala",
    "English"],
  "10": ["Mathematics",
    "Science",
    "Sinhala",
    "English"],
  "11": ["Mathematics",
    "Science",
    "Sinhala",
    "English"],
};

const baseCategories = ["Term Test I", "Term Test II", "Term Test III", "Model Paper"];

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

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/paper/${id}`);
        setPaper(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching paper:", err);
        toast.error("Failed to load paper data");
        setLoading(false);
      }
    };

    fetchPaper();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "grade") {
      setPaper((prev) => ({ ...prev, grade: value, subject: "" }));
    } else {
      setPaper((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/paper/${id}`, paper);
      toast.success("Paper updated successfully!");
      navigate("/papers");
    } catch (err) {
      toast.error("Error updating paper.");
      console.error(err);
    }
  };

  const availableSubjects = subjectsByGrade[paper.grade] || [];
  const categoryOptions = [
    ...baseCategories,
    ...(paper.grade === "11" ? ["O/L Past Papers"] : []),
  ];

  if (loading) return <div className="p-6 text-center text-lg">Loading paper data...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">📄 Edit Paper</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={paper.title}
          onChange={handleChange}
          placeholder="Paper Title"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          required
        />

        <select
          name="grade"
          value={paper.grade}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          required
        >
          <option value="">📚 Select Grade</option>
          {Object.keys(subjectsByGrade).map((g) => (
            <option key={g} value={g}>
              Grade {g}
            </option>
          ))}
        </select>

        <select
          name="subject"
          value={paper.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          required
        >
          <option value="">📝 Select Subject</option>
          {availableSubjects.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        <select
          name="medium"
          value={paper.medium}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          required
        >
          <option value="">🌐 Select Medium</option>
          <option value="Sinhala">Sinhala</option>
          <option value="English">English</option>
          <option value="Tamil">Tamil</option>
        </select>

        <select
          name="paperCategory"
          value={paper.paperCategory}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          required
        >
          <option value="">🗂️ Select Paper Category</option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="downloadLink"
          value={paper.downloadLink}
          onChange={handleChange}
          placeholder="Download Link (Google Drive etc.)"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          ✅ Update Paper
        </button>
      </form>
    </div>
  );
}
