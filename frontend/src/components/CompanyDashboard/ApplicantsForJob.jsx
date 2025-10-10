import React, { useEffect, useState } from "react";
import axios from "axios";

function ApplicantsForJob({ jobId }) {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}/applicants`);
        setApplicants(response.data.data || []);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) fetchApplicants();
  }, [jobId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading applicants...</p>;
  }

  if (applicants.length === 0) {
    return <p className="text-center text-gray-600">No applicants yet for this job.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800 dark:text-white text-center">
        Applicants for Job
      </h2>

      <div className="space-y-4">
        {applicants.map((applicant) => (
          <div
            key={applicant._id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
          >
            {/* Applicant Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {applicant.name || "Unknown Applicant"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {applicant.email || "No email provided"}
              </p>
            </div>

            {/* Applicant Info */}
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <p>
                <span className="font-semibold">Experience:</span>{" "}
                {applicant.experience || "Not specified"}
              </p>
              <p>
                <span className="font-semibold">Skills:</span>{" "}
                {applicant.skills?.length > 0
                  ? applicant.skills.join(", ")
                  : "No skills listed"}
              </p>
              <p>
                <span className="font-semibold">Applied on:</span>{" "}
                {new Date(applicant.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Resume Button */}
            {applicant.resume && (
              <div className="mt-4">
                <a
                  href={applicant.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition"
                >
                  View Resume
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicantsForJob;
