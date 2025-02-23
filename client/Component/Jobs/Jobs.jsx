import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './Jobs.css'

export default function Jobs() {
  const [jobs, setjobs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((response) => response.json())
      .then((data) => setjobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  return (

    <div className="text-light">

      <div className="row">
        <div className="col-md-12 align-center text-center mt-4">
          <h1 className="text-light">Discover the best job</h1>
          <p className="text-light">Start career with the best company in the world,  we ensures <br /> you to get the best job possible.</p>
        </div>
        <hr />
      </div>
      <div className="row ">
        <div className="col-md-12 d-flex justify-content-center">
          <button className="btn text-light border m-2 rounded-5">Technical</button>
          <button className="btn text-light border m-2 rounded-5">Technical</button>
          <button className="btn text-light border m-2 rounded-5">Technical</button>
          <button className="btn text-light border m-2 rounded-5">Technical</button>
          <button className="btn text-light border m-2 rounded-5">Technical</button>
          <button className="btn text-light border m-2 rounded-5">Technical</button>
          <button className="btn text-light border m-2 rounded-5">Technical</button>
          <button className="btn text-light border m-2 rounded-5">Technical</button>
        </div>
      </div>

      <div className="job-div row  m-2 p-2">
        <div className="row">
          {jobs.map((job) => (
            <div key={job._id} className="col-md-3 col-sm-6 mb-4">
              <div className="discover-job-collection border p-3">
                <div className="row discover-job-top-wrapper">
                  <div className="col-md-4">
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/64943f2a36915879aa1daef2/649a810bc03a310f12a71638_Logomark%20(8).svg"
                      alt="Company Logo"
                      className="company-logo img-fluid"
                    />
                  </div>

                  <div className="col-md-8 position-wrapper">
                    <h5 className="job-link">{job.title}</h5>
                    <p className="company-title">{job.company}</p>
                  </div>
                </div>

                <p className="job-short-info">
                  Collaborate with cross-functional teams to gather requirements.
                </p>
                <hr />
                <p>Salary: ${job.salary}</p>

                <div className="row location-type-wrapper">

                  <div className="col-md-6 location-item-wrap">
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/64943f2936915879aa1dae17/6499704a3e6957bb58863309_globe-01.svg"
                      alt="Location Icon"
                    />
                    <p className="jobs-paragraph">{job.location}</p>
                  </div>

                  <div className="col-md-6 location-item-wrap">
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/64943f2936915879aa1dae17/64997063d4816cfd4fcfaefd_home-smile.svg"
                      alt="Remote Icon"
                    />
                    <p className="jobs-paragraph">Remote</p>
                  </div>
                </div>

                <div className="apply-button-wrapper text-center">
                  <button className="btn btn-primary">Apply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>


    // <div>
    //   <h1>jobs</h1>
    //   <div className="text-light">
    //     <h1>Job Listings</h1>
    //     <ul>
    //       {jobs.map((job) => (
    //         <li key={job._id}>
    //           <h2>{job.title}</h2>
    //           <p>{job.company}</p>
    //           <p>Salary: ${job.salary}</p>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>



  );
}
