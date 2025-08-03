import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import Signup from "../Component/Signup/Signup";
// import Login from "../Component/Login/Login";
import Home from "./component/Home/Home"
// import Navbar from "../Component/Navbar/Navbar";
// import Jobs from "../Component/Jobs/Jobs";
// import Internships from "../Component/Internships/Internships";
// import CreateJobs from "../Component/CreateJobs/CreateJobs";
// import About from "../Component/About/About";

// import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          {/* <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/createjobs" element={<CreateJobs />} />
          <Route path="/about" element={<About />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
