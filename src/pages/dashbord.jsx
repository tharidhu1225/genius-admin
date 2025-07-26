import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBook, FaFileAlt } from "react-icons/fa";

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("");
  const [username, setUsername] = useState("Admin");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalPapers: 0,
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else if (hour < 20) setGreeting("Good Evening");
    else setGreeting("Good Night");

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/stack`);
      setStats(res.data.stats);
      setUsername(res.data.username);
    } catch (err) {
      console.error("Failed to fetch stats", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          {greeting}, <span className="text-green-700">{username}</span> 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Here's a quick summary of your platform today.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-500 animate-pulse">
          Loading dashboard...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <StatCard
            label="Total Books"
            value={stats.totalBooks}
            color="blue"
            icon={<FaBook size={28} />}
          />
          <StatCard
            label="Total Papers"
            value={stats.totalPapers}
            color="purple"
            icon={<FaFileAlt size={28} />}
          />
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color, icon }) {
  const colorStyles = {
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <motion.div
      className={`rounded-2xl shadow-md p-6 ${colorStyles[color]} transition duration-300 ease-in-out`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">{label}</div>
        {icon}
      </div>
      <div className="text-4xl font-bold mt-3">{value}</div>
    </motion.div>
  );
}
