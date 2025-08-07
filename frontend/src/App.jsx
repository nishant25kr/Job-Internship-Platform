import { useState } from "react";
import { Route, Router, Routes } from "react-router-dom";

import "./App.css";
import Home from "./components/Home/home.jsx";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import About from "./pages/About/about";
import Login from "./pages/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
