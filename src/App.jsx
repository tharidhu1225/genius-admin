import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import AdminHomePage from "./pages/adminHome";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} />
    <Routes>
      <Route path="/*" element={<ProtectedRoute>
        <AdminHomePage/>
      </ProtectedRoute>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
    </BrowserRouter>
  )
}