import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateJobs.css"; // Import CSS file for styling

export default function CreateJobs() {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");  // Fixed state naming

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/createjobs", { 
                title, 
                company, 
                location, 
                salary: parseInt(salary), // Ensure salary is a number
                description, 
                category 
            });
            console.log(response.data);
            alert("Job created successfully!");
            navigate('/admin'); // Redirect after success
        } catch (error) {
            console.error("Error creating job:", error);
            alert("Failed to create job. Please try again.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-image">
            <div className="card form-container p-5">
                <h2 className="text-center mb-4 text-light">Create Job</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Job Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Company Name"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Job Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        className="form-control mb-3"
                        placeholder="Salary (in USD)"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                    />
                    <textarea
                        className="form-control mb-3"
                        placeholder="Job Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="5"
                        required
                    ></textarea>

                    {/* Category Dropdown (Added) */}
                    <select 
                        className="form-control mb-3"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Developer">Developer</option>
                        <option value="Management">Management</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Design">Design</option>
                    </select>

                    <button type="submit" className="btn btn-primary w-100">Post Job</button>
                </form>
                <div className="text-center mt-3">
                    <Link to="/jobs" className="text-decoration-none">View All Jobs</Link>
                </div>
            </div>
        </div>
    );
}
