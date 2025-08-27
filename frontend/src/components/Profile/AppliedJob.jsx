import React, { useState, useEffect } from "react";
import axios from "axios";
import CardForAppliedJob from "./CardForAppliedJob";
import LoadingSpinner from "../LoadingSpinner";

function AppliedJob() {
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/application/get-application`,
          { withCredentials: true }
        );

        setAppliedJobs(res.data?.data || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  if (loading) return <LoadingSpinner/>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (appliedJobs.length === 0) return <p>No applied jobs found.</p>;

  return (
    <div className="overflow-scroll max-h-screen m-2 p-4">
      <h1 className="text-xl font-bold mb-4">Applied Jobs</h1>
      <ul className="space-y-4">
        {appliedJobs.map((job) => {
          const company = job.companyDetail || {};
          return (
            <li
              key={job._id}

            >
              <CardForAppliedJob
                data={{
                  title: company.title,
                  name: company.name,
                  Type: company.Type,
                  place: company.place,
                  experienceLevel: company.experienceLevel,
                  salary: company.salary,
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AppliedJob;
