import React from "react";
import CardForCompanysJob from "./CardForCompanysJob";

const JobList = ({ jobs, selectedJobId, onSelect }) => {
  if (!jobs) {
    console.warn("JobList: jobs is undefined or null");
    return <p className="text-gray-500">Loading jobs...</p>;
  }

  const jobArray = Array.isArray(jobs)
    ? jobs
    : jobs.data && Array.isArray(jobs.data)
    ? jobs.data
    : [];

  if (jobArray.length === 0) {
    return <p className="text-gray-500">No jobs found.</p>;
  }

  return (
    <div className="flex overflow-x-auto gap-4 pb-3 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700">
      {jobArray.map((job) => (
        <CardForCompanysJob
          key={job._id || Math.random()}
          job={job}
          isSelected={selectedJobId === job._id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default JobList;
