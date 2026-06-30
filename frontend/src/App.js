import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import Landing from "@/pages/Landing";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetail from "@/pages/ServiceDetail";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import { Toaster } from "sonner";

function Shell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <div className="App grain min-h-screen">
      {!isAdmin && <Navbar />}
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/service/:slug" element={<ServiceDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <Chatbot />}
      <Toaster theme="dark" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}

export default App;
