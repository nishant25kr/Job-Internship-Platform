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
import Profile from "./components/Profile/Profile";
import ProfileAbout from "./components/CompanyDashboard/ProfileAbout";
import AppliedJob from "./components/Profile/AppliedJob";
import EditProfile from "./components/Profile/EditProfile";
import ProfileTopSection from "./components/Profile/ProfileTopView";
import ChangePass from "./components/Profile/ChangePass";
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginForCompany from "./components/LoginForCompany";
import CompanyDashboard from "./components/CompanyDashboard/CompanyDashboard";
import CreateJob from "./components/CompanyDashboard/CreateJob";
import ViewJob from "./components/CompanyDashboard/ViewJob";
import CardForCompanysJob from "./components/CompanyDashboard/CardForCompanysJob";
import JobsCreated from "./components/CompanyDashboard/JobsCreated";
import ViewApplicants from "./components/CompanyDashboard/ViewApplicants";


function App() {
  const { loading, theme } = useSelector((state) => state.auth);
  const clientid = import.meta.env.VITE_GOOGLE_CLIENT_ID

  return (
    <GoogleOAuthProvider clientId={clientid}>

      <BrowserRouter>
        <div className="min-h-screen flex flex-col justify-between">
          {/* Navbar */}
          <Navbar />

          {/* Main Routes */}
          <main >
            {loading ? (
              <div
                className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 ${theme === "light" ? "bg-white/40" : "bg-black/40"
                  }`}
              >
                <Loading />
              </div>
            ) : (
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />}>
                    <Route path="about" element={<ProfileTopSection />} />
                    <Route path="applied-job" element={<AppliedJob />} />
                    <Route path="edit-profile" element={<EditProfile />} />
                    <Route path="change-password" element={<ChangePass />} />
                  </Route>

                  <Route path="/CompanyLogin-signup" element={<LoginForCompany />} />
                  <Route path="/company" element={<CompanyDashboard />}>
                    <Route path="about" element={<ProfileAbout />} />
                    <Route path="create-job" element={<CreateJob />} />
                    <Route path="getall-jobs" element={<JobsCreated />} >
                      <Route path="applicants/:jobId" element={<ViewApplicants/>} />
                    </Route>
                  </Route>
                  <Route path="/about" element={<About />} />
                </Routes>

              </main>
            )}
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </BrowserRouter>

    </GoogleOAuthProvider>
  );
}

export default App;
