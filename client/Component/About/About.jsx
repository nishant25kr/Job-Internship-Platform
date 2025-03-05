import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Us</h1>
        <p>
          Welcome to <strong>Job Platform</strong>, your ultimate destination for job and internship opportunities. 
          We connect job seekers with top companies, making career growth easier and more accessible.
        </p>

        <h2>🌟 Our Mission</h2>
        <p>
          Our mission is to bridge the gap between job seekers and employers by providing a seamless and efficient
          job search experience.
        </p>

        <h2>🚀 Why Choose Us?</h2>
        <div className="features">
          <div className="feature-card">✔️ Wide range of job listings</div>
          <div className="feature-card">✔️ Verified companies & employers</div>
          <div className="feature-card">✔️ Simple and quick application process</div>
          <div className="feature-card">✔️ Career resources & guidance</div>
        </div>

        <h2>🎯 Get Started</h2>
        <p>
          Whether you're a student looking for an internship or a professional seeking career growth, 
          <strong>Job Platform</strong> is here to help. Start your journey today!
        </p>

        <button className="explore-btn">Explore Jobs</button>
      </div>
    </div>
  );
}
