import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import Home from "./components/Home/home";
import About from "./pages/About/about";
import Login from "./pages/Login";
import AuthProvider from "./hooks/AuthProvider.jsx";
import PrivateRoute from "./hooks/PrivateRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col justify-between">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/home" element={<Home />} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="/" element={<div>Landing Page</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
