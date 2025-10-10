import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function ViewApplicants() {
    const [searchParams] = useSearchParams();
    const jobid = searchParams.get("id");
    const [applicants, setApplicants] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!jobid) return;

        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/application/get-application/${jobid}`)
            .then((res) => {
                console.log("Applicants data:", res.data.data);
                setApplicants(res.data.data || []);
            })
            .catch((err) => {
                console.error("Error fetching applicants:", err);
                setError("Failed to load applicants");
            })
            .finally(() => setLoading(false));
    }, [jobid]);

    if (!jobid) {
        return <div className="text-center text-red-500 mt-5">Invalid or missing Job ID.</div>;
    }

    if (loading) {
        return <div className="text-center mt-5">Loading applicants...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-5">{error}</div>;
    }

    if (applicants.length === 0) {
        return <div className="text-center mt-5">No applicants found for this job.</div>;
    }

    return (
        <div className="space-y-4">
            {applicants.map((applicant) => (
                <div
                    key={applicant._id}
                    className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
                >
                    {/* Applicant Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {applicant?.applicantDetail?.fullname || "Unknown Applicant"}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {applicant?.applicantDetail?.email || "No email provided"}
                        </p>
                    </div>

                    {/* Additional Details */}
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <p><strong>Phone:</strong> {applicant?.applicantDetail?.phone || "N/A"}</p>
                        <p><strong>Experience:</strong> {applicant?.applicantDetail?.experience || "N/A"}</p>
                        {applicant?.applicantDetail?.skills?.length > 0 && (
                            <p><strong>Skills:</strong> {applicant.applicantDetail.skills.join(", ")}</p>
                        )}
                    </div>

                    {/* Resume Button */}
                    {applicant?.applicantDetail?.resume && (
                        <div className="mt-4">
                            <a
                                href={applicant.applicantDetail.resume}
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
    );
}

export default ViewApplicants;
