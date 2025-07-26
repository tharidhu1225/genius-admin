import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        { username, password }
      );
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-white to-green-100 px-4">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          {/* Left - Image / Illustration */}
          <div className="md:w-1/2 hidden md:flex bg-green-50 p-6 items-center justify-center">
            <img
              src="https://img.freepik.com/free-photo/computer-security-with-login-password-padlock_107791-16191.jpg"
              alt="Secure Login"
              className="w-full max-w-sm"
            />
          </div>

          {/* Right - Form */}
          <div className="w-full md:w-1/2 p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Admin Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username */}
              <div className="relative">
                <FiUser className="absolute top-4 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>

              {/* Password with Show/Hide */}
              <div className="relative">
                <FiLock className="absolute top-4 left-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-3.5 right-3 text-gray-500 hover:text-gray-800 focus:outline-none"
                >
                  {showPassword ?<FiEye />  : <FiEyeOff />}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              {/* Error Message */}
              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
