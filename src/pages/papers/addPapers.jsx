import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Grade → Subject mapping
const subjectsByGrade = {
  "06": ["Mathematics", "Science", "Sinhala", "English", "History", "Geography", "Tamil", "Health and Physical Education", "Art", "Religion (Buddhism/Christianity/Hinduism/Islam)"],
  "07": ["Mathematics", "Science", "Sinhala", "English", "History", "Geography", "Tamil", "Health and Physical Education", "Art", "Religion (Buddhism/Christianity/Hinduism/Islam)"],
  "08": ["Mathematics", "Science", "Sinhala", "English", "History", "Geography", "Tamil", "Health and Physical Education", "Art", "Religion (Buddhism/Christianity/Hinduism/Islam)"],
  "09": ["Mathematics", "Science", "Sinhala", "English", "History", "Geography", "Tamil", "Health and Physical Education", "Art", "Religion (Buddhism/Christianity/Hinduism/Islam)", "Information and Communication Technology (ICT)"],
  "10": ["Mathematics", "Science", "Sinhala", "English", "History", "Geography", "Tamil", "Commerce", "Health and Physical Education", "Art", "Religion (Buddhism/Christianity/Hinduism/Islam)", "Information and Communication Technology (ICT)"],
  "11": ["Mathematics", "Science", "Sinhala", "English Literature", "History", "Geography", "Tamil", "Commerce", "Health and Physical Education", "Art", "Religion (Buddhism/Christianity/Hinduism/Islam)", "Information and Communication Technology (ICT)", "Agriculture", "Business Studies", "Economics", "Buddhism", "Christianity", "Hinduism", "Islam"],
};

export default function AddPaper() {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    medium: "",
    grade: "",
    paperCategory: "",
    downloadLink: "",
  });

  const navigate = useNavigate();
  const subjectOptions = subjectsByGrade[formData.grade] || [];

  const categoryOptions = () => {
    const base = ["Term Test I", "Term Test II", "Term Test III", "Model Paper"];
    return formData.grade === "11" ? [...base, "O/L Past Papers"] : base;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If grade changes, reset subject
    if (name === "grade") {
      setFormData((prev) => ({
        ...prev,
        grade: value,
        subject: "",
        paperCategory: "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, subject, medium, grade, paperCategory, downloadLink } = formData;

    if (!title || !subject || !medium || !grade || !paperCategory || !downloadLink) {
      return toast.error("Please fill in all fields.");
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/paper`, formData);
      toast.success("Paper added successfully!");
      navigate("/papers");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to add paper");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Add New Paper</h2>

        <input
          type="text"
          name="title"
          placeholder="Paper Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />

        <select
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        >
          <option value="">Select Grade</option>
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
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
          disabled={!formData.grade}
        >
          <option value="">
            {formData.grade ? "Select Subject" : "Select Grade First"}
          </option>
          {subjectOptions.map((subj, i) => (
            <option key={i} value={subj}>
              {subj}
            </option>
          ))}
        </select>

        <select
          name="medium"
          value={formData.medium}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        >
          <option value="">Select Medium</option>
          <option value="Sinhala">Sinhala</option>
          <option value="English">English</option>
          <option value="Tamil">Tamil</option>
        </select>

        <select
          name="paperCategory"
          value={formData.paperCategory}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
          disabled={!formData.grade}
        >
          <option value="">
            {formData.grade ? "Select Category" : "Select Grade First"}
          </option>
          {categoryOptions().map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="downloadLink"
          placeholder="Download Link (PDF URL)"
          value={formData.downloadLink}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Paper
        </button>
      </form>
    </div>
  );
}
