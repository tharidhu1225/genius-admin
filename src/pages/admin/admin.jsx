import React from "react";
import { FaTools } from "react-icons/fa";

export default function Admin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full text-center animate-fadeIn">
        <FaTools className="text-5xl text-blue-500 mb-4 mx-auto animate-pulse" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h1>
        <p className="text-gray-600 mb-4">
          The admin dashboard is currently under construction.
        </p>
        <p className="text-sm text-gray-500 mb-1">
          🚧 Features like Admin Account management, reports & analytics are on the way.
        </p>
        <p className="text-sm text-gray-400 mb-6">
          Thank you for your patience!
        </p>

        {/* 🌀 Animated Loading Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-full w-1/2 animate-loadingBar rounded-full" />
        </div>

        <div className="mt-6">
          <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
            ⚠️ Update in Progress
          </span>
        </div>
      </div>
    </div>
  );
}
