
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { GiPoliceBadge } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name,setname]=useState("")
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user); // Ensure valid JSON
        setIsLoggedIn(true);
        setname(parsedUser.username || "Guest"); // Fallback if username is missing
        // setname(parsedUser.username); // Set username from localStorage
      }
    } catch (error) {
      console.error("Error parsing localStorage user data:", error);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");  // Clear user session
    setIsLoggedIn(false);  // Update state
    navigate("/");  // Redirect to homepage
    window.location.reload();  // Force UI update
  };

  return (
    <nav className="navbar">
      <div className="logo">JobBoard</div>
      {isLoggedIn ? (
        <>
          <nav className="navbar navbar-expand-lg navbar-light ">

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon mx-auto"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-item nav-link px-5 text-light" to="/">Home</Link>
                <Link className="nav-item nav-link px-5 text-light" to="/jobs">Jobs</Link>
                <Link className="nav-item nav-link px-5 text-light" to="/internships">Internships</Link>
                <Link className="nav-item nav-link px-5 text-light " to="/about">About Us</Link>
              </div>
            </div>
          </nav>
          <div className="nav-buttons">
            
            <button className="signup-btn"><CgProfile size="30px" color="white" className="mx-1" />{name}</button>
            <button className="signup-btn" onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <div className="nav-buttons">
          <button className="login-btn" onClick={() => navigate("/login")}>LogIn/Signup</button>
        </div>
        
      )}
    </nav>
  );
}
