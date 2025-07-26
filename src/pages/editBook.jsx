import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const subjectsByGrade = {
  "06": ["Mathematics", "Science", "Sinhala", "English", "History", "Geography", "Tamil", "Health and Physical Education", "Art", "Religion (Buddhism/Christianity/Hinduism/Islam)"],
  "07": ["Mathematics", "Science", "Sinhala", "English", "History", "Geography", "Tamil", "Health and Physical Education", "Art", "Religion (Buddhism/Christianity/Hinduism/Islam)"],
  "08": ["Mathematics", "Science", "Sinhala", "English", "History", "Geography", "Tamil", "Health and Physical Education", "Art", "Religion (Buddhism/Christianity/Hinduism/Islam)"],
  "09": ["Mathematics", "Science", "Sinhala", "English", "History", "Geography", "Tamil", "Health and Physical Education", "Art", "Religion (Buddhism/Christianity/Hinduism/Islam)", "Information and Communication Technology (ICT)"],
  "10": ["Mathematics", "Science", "Sinhala", "English", "History", "Geography", "Tamil", "Commerce", "Health and Physical Education", "Art", "Religion (Buddhism/Christianity/Hinduism/Islam)", "Information and Communication Technology (ICT)"],
  "11": ["Mathematics", "Science", "Sinhala", "English Literature", "History", "Geography", "Tamil", "Commerce", "Health and Physical Education", "Art", "Religion (Buddhism/Christianity/Hinduism/Islam)", "Information and Communication Technology (ICT)", "Agriculture", "Business Studies", "Economics", "Buddhism", "Christianity", "Hinduism", "Islam"],
};

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    medium: "",
    grade: "",
    downloadLink: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/books/${id}`);
        setFormData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load book data", err);
        toast.error("Failed to load book");
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If grade is changed, reset subject
    if (name === "grade") {
      setFormData((prev) => ({
        ...prev,
        grade: value,
        subject: "", // reset subject when grade changes
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/books/${id}`, formData);
      toast.success("Book updated successfully!");
      navigate("/books");
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Error updating book.");
    }
  };

  if (loading) return <div className="p-6 text-center text-lg">Loading book data...</div>;

  const availableSubjects = subjectsByGrade[formData.grade] || [];

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">📘 Edit Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book Title"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          required
        />

        <select
          name="grade"
          value={formData.grade}
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
          value={formData.subject}
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
          value={formData.medium}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          required
        >
          <option value="">🌐 Select Medium</option>
          <option value="Sinhala">Sinhala</option>
          <option value="English">English</option>
          <option value="Tamil">Tamil</option>
        </select>

        <input
          type="text"
          name="downloadLink"
          value={formData.downloadLink}
          onChange={handleChange}
          placeholder="Download Link (Google Drive, etc)"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          ✅ Update Book
        </button>
      </form>
    </div>
  );
}
