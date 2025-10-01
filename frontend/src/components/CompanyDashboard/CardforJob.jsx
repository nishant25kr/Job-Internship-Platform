export default function JobCard({ job }) {
  return (
    <div className="group w-full max-w-md bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 relative overflow-hidden">
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            job.isOpen
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-red-100 text-red-700 border border-red-200"
          }`}
        >
          {job.isOpen ? "Open" : "Closed"}
        </span>
      </div>

      {/* Header Section */}
      <div className="mb-4 pr-16">
        <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
          {job.title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {job.description}
        </p>
      </div>

      {/* Job Details Grid */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-b-0">
          <span className="text-sm font-medium text-gray-500">Experience</span>
          <span className="text-sm font-semibold text-gray-900">
            {job.experienceLevel}
          </span>
        </div>
        
        <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-b-0">
          <span className="text-sm font-medium text-gray-500">Type</span>
          <span className="text-sm font-semibold text-gray-900">
            {job.Type}
          </span>
        </div>
        
        <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-b-0">
          <span className="text-sm font-medium text-gray-500">Location</span>
          <span className="text-sm font-semibold text-gray-900">
            {job.place}
          </span>
        </div>
        
        <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-b-0">
          <span className="text-sm font-medium text-gray-500">Salary</span>
          <span className="text-sm font-bold text-green-600">
            ₹{job.salary.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-medium text-gray-500">Posted</span>
          <span className="text-xs text-gray-500">
            {new Date(job.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 shadow-sm hover:shadow-md">
          Edit Job
        </button>
        
        <button className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 active:bg-gray-300 transition-colors duration-200">
          View Applications
        </button>
        
        <button
          className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors duration-200 shadow-sm hover:shadow-md ${
            job.isOpen
              ? "bg-red-600 text-white hover:bg-red-700 active:bg-red-800"
              : "bg-green-600 text-white hover:bg-green-700 active:bg-green-800"
          }`}
        >
          {job.isOpen ? "Close Job" : "Reopen Job"}
        </button>
      </div>
    </div>
  );
}
