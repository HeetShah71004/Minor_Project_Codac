import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Editor1 from "./Editor";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

// Loader component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <div className="animate-spin rounded-full h-60 w-60 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

// Success component with redirect and toast
const Success = () => {
  const navigate = useNavigate();
  useEffect(() => {
    toast.success("Payment Successful! 🎉");
    const timer = setTimeout(() => navigate("/"), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="text-center text-green-600 p-10">
      Payment Successful! 🎉<br />
      Redirecting to Home...
      <Loader />
    </div>
  );
};

// Cancel component with redirect and toast
const Cancel = () => {
  const navigate = useNavigate();
  useEffect(() => {
    toast.error("Payment Cancelled. ❌");
    const timer = setTimeout(() => navigate("/"), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="text-center text-red-600 p-10">
      Payment Cancelled. ❌<br />
      Redirecting to Home...
      <Loader />
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/api/create-room" element={<Editor1 />} />
        <Route path="/api/editor" element={<Editor1 />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
