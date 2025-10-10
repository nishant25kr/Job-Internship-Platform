import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CreateJob = () => {
  const { theme } = useSelector((state) => state.theme);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    Type: "",
    place: "",
    salary: "",
    employmentType: "",
    experienceLevel: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:8000/api/jobs/create-jobs",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(res.data.message || "Job created successfully!");
      setFormData({
        name: "",
        title: "",
        description: "",
        Type: "",
        place: "",
        salary: "",
        employmentType: "",
        experienceLevel: "",
      });
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Error while creating job."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = `w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
    theme === "dark"
      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
  } focus:outline-none`;

  const labelClasses = `block text-sm font-semibold mb-2 ${
    theme === "dark" ? "text-gray-200" : "text-gray-700"
  }`;

  return (
    <div className="min-h-[90vh] flex items-center justify-around mx-auto px-4 py-12">
      <div
        className={`w-full max-w-2xl rounded-2xl  p-8 ${
          theme === "dark"
            ? ""
            : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="mb-8">
          <h2
            className={`text-3xl font-bold mb-2 ${
              theme === "dark"
                ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                : "text-gray-900"
            }`}
          >
            Create New Job
          </h2>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Fill in the details to post a new job opportunity
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Name */}
          <div>
            <label htmlFor="name" className={labelClasses}>
              Company Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="Enter company name"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>

          {/* Job Title */}
          <div>
            <label htmlFor="title" className={labelClasses}>
              Job Title
            </label>
            <input
              id="title"
              name="title"
              placeholder="e.g., Senior Software Engineer"
              value={formData.title}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>

          {/* Job Description */}
          <div>
            <label htmlFor="description" className={labelClasses}>
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the role, responsibilities, and requirements..."
              value={formData.description}
              onChange={handleChange}
              className={`${inputClasses} resize-none`}
              rows="4"
              required
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Employment Type */}
            <div>
              <label htmlFor="employmentType" className={labelClasses}>
                Employment Type
              </label>
              <select
                id="employmentType"
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className={inputClasses}
                required
              >
                <option value="">Select type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label htmlFor="experienceLevel" className={labelClasses}>
                Experience Level
              </label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className={inputClasses}
                required
              >
                <option value="">Select level</option>
                <option value="Entry">Entry Level</option>
                <option value="Mid">Mid Level</option>
                <option value="Senior">Senior Level</option>
              </select>
            </div>
          </div>

          {/* Location and Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div>
              <label htmlFor="place" className={labelClasses}>
                Location
              </label>
              <input
                id="place"
                name="place"
                placeholder="e.g., New York, Remote"
                value={formData.place}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            {/* Salary */}
            <div>
              <label htmlFor="salary" className={labelClasses}>
                Salary (₹)
              </label>
              <input
                id="salary"
                name="salary"
                placeholder="e.g., 800000"
                type="number"
                value={formData.salary}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
          </div>

          {/* Job Type (keeping it separate as it seems different from employment type) */}
          <div>
            <label htmlFor="Type" className={labelClasses}>
              Job Type
            </label>
            <input
              id="Type"
              name="Type"
              placeholder="e.g., Engineering, Marketing, Design"
              value={formData.Type}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : theme === "dark"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/50"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/30"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              theme === "dark" ? "focus:ring-offset-gray-900" : ""
            } transform hover:scale-[1.02] active:scale-[0.98]`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Job...
              </span>
            ) : (
              "Create Job Posting"
            )}
          </button>
        </form>

        {/* Success/Error Message */}
        {message && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              message.includes("success")
                ? theme === "dark"
                  ? "bg-green-900/30 border border-green-700 text-green-300"
                  : "bg-green-50 border border-green-200 text-green-800"
                : theme === "dark"
                ? "bg-red-900/30 border border-red-700 text-red-300"
                : "bg-red-50 border border-red-200 text-red-800"
            } text-center font-medium`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateJob;
