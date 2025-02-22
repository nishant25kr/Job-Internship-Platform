import React from "react";
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import './Jobs.css'

export default function Jobs() {
  const[jobs,setjobs]=useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/jobs")  
      .then((response) => response.json())
      .then((data) => setjobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

 
  return (
    <>
    <>
    <div className="row">
        <div className="col-md-12 align-center text-center mt-4">
          <h1 className="text-light">Discover the best job</h1>
          <p className="text-light">Start career with the best company in the world,  we ensures <br /> you to get the best job possible.</p>
        </div>
    </div>
    
    </>
      {/* <h1>jobs</h1>
      <div className="text-light">
      <h1>Job Listings</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <h2>{job.title}</h2>
            <p>{job.company}</p>
            <p>Salary: ${job.salary}</p>
          </li>
        ))}
      </ul>
    </div> */}
    </>
  );
}
