import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import Home from "./components/Home/home";
import About from "./pages/About/about";
import Login from "./pages/Login";
import './App.css';
import { useSelector } from "react-redux";
import Loading from "./components/Loading";

function App() {
  const { loading, theme } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col justify-between">
        {/* Navbar */}
        <Navbar />

        {/* Global Loading Overlay */}


        {/* Main Routes */}
        <main className="flex-grow">
          {loading && (
            <div
              className={`fixed inset-0 flex items-center justify-center backdrop-blur-md z-50 ${theme === "light" ? "bg-white/40" : "bg-black/40"
                }`}
            >
              <Loading />
            </div>
          )}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
