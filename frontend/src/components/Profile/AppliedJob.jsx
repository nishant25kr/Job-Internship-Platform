import React, { useState, useEffect } from "react";
import axios from "axios";
import CardForAppliedJob from "./CardForAppliedJob";
import LoadingSpinner from "../LoadingSpinner";

function AppliedJobList({ jobs }) {
  if (jobs.length === 0) {
    return <p className="text-center text-gray-500 mt-20">No applied jobs found.</p>;
  }

  return (
    <ul className="space-y-6">
      {jobs.map((job) => {
        const company = job.companyDetail || {};
        return (
          <li key={job._id} className="transform transition duration-300 hover:scale-[1.01]">
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
  );
}

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

  if (loading)
    return (
      <main className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </main>
    );

  if (error)
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-red-600 font-semibold text-lg">Error: {error}</p>
      </main>
    );

  return (
    <section className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Applied Jobs</h1>
      <AppliedJobList jobs={appliedJobs} />
    </section>
  );
}

export default AppliedJob;
