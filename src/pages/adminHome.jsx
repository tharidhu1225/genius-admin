import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { BiSolidBookAdd } from "react-icons/bi";
import {
  BsGraphUp,
  BsList,
  BsX,
} from "react-icons/bs";

import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import DashboardPage from "./dashbord";
import { TbDeviceIpadHorizontalPlus } from "react-icons/tb";
import { IoBookSharp } from "react-icons/io5";
import { GiBookshelf } from "react-icons/gi";
import { LiaDownloadSolid } from "react-icons/lia";
import Books from "./book";
import AddBook from "./addBook";
import EditBook from "./editBook";
import Paper from "./papers/paper";
import AddPaper from "./papers/addPapers";
import { GrUserAdmin } from "react-icons/gr";
import Admin from "./admin/admin";
import EditPaper from "./papers/editPaper";
import HomeBanner from "./homeBanner/homeBanner";
import { MdOutlinePermMedia } from "react-icons/md";
import AddHomeBanner from "./homeBanner/addHomeBanner";

export default function AdminHomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  

  // 🔒 Logout
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Logout failed!");
    }

    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-black relative">
      {/* Sidebar */}
      <div
        className={`bg-black text-white fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:w-1/5 w-3/4 max-w-xs
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          h-full md:min-h-screen`}
      >
        <div className="flex justify-between items-center px-4 py-3">
          <h2 className="text-lg font-semibold">Admin Menu</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white md:hidden"
            >
              <BsX size={24} />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start space-y-6 px-6 mt-6 md:mt-12">
          <NavItem to="/" icon={<BsGraphUp />} label="Dashboard" />
          <NavItem to="/addbook" icon={<BiSolidBookAdd />} label="Add Books" />
          <NavItem to="/addpaper" icon={<TbDeviceIpadHorizontalPlus />} label="Add Papers" />
          <NavItem to="/books" icon={<GiBookshelf />} label="View Books" />
          <NavItem to="/papers" icon={<IoBookSharp />} label="View Papers" />
          <NavItem to="/admin" icon={<GrUserAdmin />} label="Administrator" />
          <NavItem to="/homeBanner" icon={<MdOutlinePermMedia />} label="Home Banner" />
        </div>
      </div>

      {/* Hamburger toggle for mobile */}
      {!sidebarOpen && (
        <button
          className="absolute top-4 left-4 md:hidden text-black z-50"
          onClick={() => setSidebarOpen(true)}
        >
          <BsList size={28} />
        </button>
      )}

      {/* Main Content */}
      <div className="w-full md:w-4/5 p-4 mt-12 md:mt-0">
        
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/books" element={<Books/>} />
            <Route path="/addbook" element={<AddBook />} />
            <Route path="/editbook/:id" element={<EditBook />} />
            <Route path="/papers" element={<Paper />} />
            <Route path="/addpaper" element={<AddPaper />} />
            <Route path="/editpaper/:id" element={<EditPaper />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/homeBanner" element={<HomeBanner />} />
            <Route path="/addHomeBanner" element={<AddHomeBanner />} />
            {/* Add more admin routes here */}
          </Routes>
      </div>
    </div>
  );
}

// ✅ Reusable Sidebar Link
function NavItem({ to, icon, label }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Link
      to={to}
      onClick={() => setSidebarOpen(false)}
      className="flex items-center gap-2 hover:text-gray-300"
    >
      {icon} {label}
    </Link>
  );
}
