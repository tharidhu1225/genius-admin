import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// 👇 Subject map by grade
const subjectsByGrade = {
  "06": [
    "Mathematics", "Science", "Sinhala", "English", "History", "Geography", "Tamil",
    "Health and Physical Education", "Art", "Religion (Buddhism/Christianity/Hinduism/Islam)"
  ],
  "07": [
    "Mathematics", "Science", "Sinhala", "English", "History", "Geography", "Tamil",
    "Health and Physical Education", "Art", "Religion (Buddhism/Christianity/Hinduism/Islam)"
  ],
  "08": [
    "Mathematics", "Science", "Sinhala", "English", "History", "Geography", "Tamil",
    "Health and Physical Education", "Art", "Religion (Buddhism/Christianity/Hinduism/Islam)"
  ],
  "09": [
    "Mathematics", "Science", "Sinhala", "English", "History", "Geography", "Tamil",
    "Health and Physical Education", "Art", "Religion (Buddhism/Christianity/Hinduism/Islam)",
    "Information and Communication Technology (ICT)"
  ],
  "10": [
    "Mathematics", "Science", "Sinhala", "English", "History", "Geography", "Tamil",
    "Commerce", "Health and Physical Education", "Art", "Religion (Buddhism/Christianity/Hinduism/Islam)",
    "Information and Communication Technology (ICT)"
  ],
  "11": [
    "Mathematics", "Science", "Sinhala", "English Literature", "History", "Geography", "Tamil",
    "Commerce", "Health and Physical Education", "Art", "Religion (Buddhism/Christianity/Hinduism/Islam)",
    "Information and Communication Technology (ICT)", "Agriculture", "Business Studies", "Economics",
    "Buddhism", "Christianity", "Hinduism", "Islam"
  ],
};

export default function AddBook() {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    medium: "",
    grade: "",
    downloadLink: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset subject if grade changes
    if (name === "grade") {
      setFormData((prev) => ({
        ...prev,
        grade: value,
        subject: "", // Reset subject
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/books`, formData);
      toast.success("Book added successfully!");
      navigate("/books");
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add book");
    }
  };

  const availableSubjects = subjectsByGrade[formData.grade] || [];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Add New Book</h2>

        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />

        {/* Grade Selector */}
        <select
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        >
          <option value="">Select Grade</option>
          <option value="06">Grade 6</option>
          <option value="07">Grade 7</option>
          <option value="08">Grade 8</option>
          <option value="09">Grade 9</option>
          <option value="10">Grade 10</option>
          <option value="11">Grade 11</option>
        </select>

        {/* Subject Selector */}
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
          {availableSubjects.map((subj, index) => (
            <option key={index} value={subj}>
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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}
