import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Internships";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]); // State for filtered jobs
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to "All"

  useEffect(() => {
    fetch("http://localhost:3000/internships")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data); 
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const filterJobs = (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredJobs(jobs); // Show all jobs
    } else {
      const filtered = jobs.filter((job) => job.category === category);
      setFilteredJobs(filtered);
    }
  };

  return (
    <div className="text-light">
      <div className="row">
        <div className="col-md-12 text-center mt-4">
          <h1 className="text-light">Discover the Best Job</h1>
          <p className="text-light">
            Start your career with the best companies in the world. We ensure
            you get the best job possible.
          </p>
        </div>
        <hr />
      </div>

      {/* Job Categories */}
      <div className="row">
        <div className="col-md-12 d-flex justify-content-center flex-wrap">
          {["All", "Engineering", "Marketing", "Finance", "Design", "IT Support", "Data Science", "HR", "Sales"].map(
            (category) => (
              <button
                key={category}
                className={`btn text-light border m-2 rounded-5 ${
                  selectedCategory === category ? "btn-primary" : ""
                }`}
                onClick={() => filterJobs(category)}
              >
                {category}
              </button>
            )
          )}
        </div>
      </div>

      {/* Job Listings */}
      <div className="job-div row m-2 p-2">
        <div className="row">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((internship) => (
              <div key={internship._id} className="col-md-3 col-sm-6 mb-4">
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
                      <h5 className="job-link">{internship.title}</h5>
                      <p className="company-title">{internship.company}</p>
                    </div>
                  </div>

                  <p className="job-short-info">{internship.description}</p>
                  <hr />
                  {/* <p>Stipend: ${internship.salary}</p> */}

                  <div className="row location-type-wrapper">
                    <div className="col-md-6 location-item-wrap">
                      <img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/64943f2936915879aa1dae17/6499704a3e6957bb58863309_globe-01.svg"
                        alt="Location Icon"
                      />
                      <p className="jobs-paragraph">{internship.location}</p>
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
            ))
          ) : (
            <p className="text-center">No jobs available for {selectedCategory}</p>
          )}
        </div>
      </div>
    </div>
  );
}
