import React from "react";
import axios from "axios";
import Button from "../Button";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function CardForCompanysJob({ job, onDelete, isSelected, onSelect }) {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  // Delete job
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${job.title}"?`)) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/${job._id}`);
        alert("Job deleted successfully!");
        if (onDelete) onDelete(job._id);
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Failed to delete job");
      }
    }
  };

  // View applicants
  const handleViewApplicants = () => {
    navigate(`applicants/jobId?id=${job._id}`);
    if (onSelect) onSelect(job._id);
  };

  const cardClasses = theme === 'dark'
    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 hover:border-blue-500/30 hover:shadow-blue-500/10'
    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-blue-300 hover:shadow-blue-100';


  return (
    <div
      className={`${cardClasses} min-w-[280px] m-2 \ flex-shrink-0 p-5 rounded-xl shadow-md transition-all duration-200 `}
    >
      
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
        {job.title || "Untitled Job"}
      </h2>
      

      {/* Info */}
      <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1 mb-4">
        <p>
          <span className="font-semibold">Type:</span> {job.Type || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Location:</span> {job.place || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Salary:</span> ₹{job.salary || "N/A"}
        </p>
      </div>


      {/* Buttons */}
      <div className="flex justify-between gap-2">
        <Button className="text-sm" onClick={handleViewApplicants}>
          View Applicants
        </Button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CardForCompanysJob;
