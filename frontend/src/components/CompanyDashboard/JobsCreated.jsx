import axios from "axios";
import React, { useEffect, useState } from "react";
import JobList from "./JobList";
import { Outlet } from "react-router-dom";

function JobsCreated() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/jobs/created-jobs`,
          { withCredentials: true }
        );
        setJobs(response.data.data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6  min-h-screen space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Jobs Created
      </h1>

      {/* Horizontal Scrollable Job List */}
      <JobList
        jobs={jobs}
        selectedJobId={selectedJobId}
        onSelect={(id) => setSelectedJobId(id)}
      />

      {/* Applicants Section */}
      <div >
        <Outlet />
      </div>
    </div>
  );
}

export default JobsCreated;
