import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import './Home.css'

export default function Home() {
 
  return (
    <>
      <div className="home-vendor">
        <div className="home-sec">
          <h1 className="home-head">The Best Jobsite for Your Future</h1>
          <p className="text-light">Growing a business means having the right people on your team.</p>
          
          <div className="search-box">
            <input type="text" placeholder="Search jobs..." />
            <FaSearch className="search-icon" />
          </div>
        </div>
      </div>
      <hr/>

      <div className="mid-sec  ">
        <div className="mid-main-container">
          <div className="mid-main">
            <section className="centered-box ">
              <h3>Job Search</h3>
              <p>Explore a wide range of job openings tailored to your skills.</p>
            </section>
            <section className="centered-box  ">
              <h3>Salary Estimate</h3>
              <p>Provide your profile details to receive an accurate estimate.</p>
            </section>
          </div>
          <div className="mid-main">
            <section className="centered-box  ">
              <h3>Read Reviews</h3>
              <p>Gain insights about potential employers from real reviews.</p>
            </section>
            <section className="centered-box  ">
              <h3>Apply and Connect</h3>
              <p>Connect with employers and schedule interviews seamlessly.</p>
            </section>
          </div>
        </div>

        <div className="mid-side">
          <h2>How It Works</h2>
          <p className="highlight-text">Getting started is easy</p>
          <p>
            Join JobBoard and begin by entering the positions you're looking
            for. Get connected with top employers effortlessly.
          </p>
          <Link to="/login">
            <button className="home-btn" >Get Started</button>
          </Link>
        </div>
      </div>
    </>
  );
}
