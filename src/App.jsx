import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Internships from "./pages/Internships";
import Tools from "./pages/Tools";
import Contact from "./pages/Contact";
import Login from "./pages/Login"; // Login page is not used, but kept for future use

export default function App() {
  return (
    <BrowserRouter>
      {/* Header is positioned with sticky/top CSS, so place it here */}
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}