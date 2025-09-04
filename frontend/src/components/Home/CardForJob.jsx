import React from 'react';
import Button from '../Button';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CardForJob = ({ jobData }) => {
  const { theme } = useSelector((state) => state.theme);

  // Add default values and validation
  if (!jobData) {
    return (
      <div className={`p-6 text-center rounded-xl ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'
        }`}>
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-300 flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m13 0H5" />
          </svg>
        </div>
        No job data available
      </div>
    );
  }

  const {
    experienceLevel = 'Not specified',
    skills = [],
    isOpen = false,
    _id,
    name = 'Unknown Company',
    title = 'Job Title',
    description = 'No description available',
    Type = 'Not specified',
    place = 'Not specified',
    salary = 0,
    createdAt,
  } = jobData;

  const formatSalary = (salary) => {
    if (!salary || salary === 0) return 'Competitive';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(salary);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const now = new Date();
    const posted = new Date(dateString);
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return posted.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getCompanyInitials = (companyName) => {
    return companyName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleApply = () => {
    console.log(jobData._id)
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/application/create/a/${jobData._id}`,
        {},
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.success) {
            alert(`success fully applied for ${response.data.data.companyDetail.name}`)
        }
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  // Enhanced theme classes
  const cardClasses = theme === 'dark'
    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 hover:border-blue-500/30 hover:shadow-blue-500/10'
    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-blue-300 hover:shadow-blue-100';

  return (
    <div className={`${cardClasses} relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-6 max-w-sm border group`}>

      {/* Floating Background Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 -translate-y-16 translate-x-16 opacity-5 pointer-events-none">
        <div className={`w-full h-full rounded-full ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
      </div>

      {/* Header with Company Avatar */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start space-x-4 flex-1">
          {/* Company Avatar */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shadow-md ${theme === 'dark'
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
            : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
            }`}>
            {getCompanyInitials(name)}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
              {name}
            </h3>
            <h2 className={`text-lg font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
              {title}
            </h2>
          </div>
        </div>

        {/* Status Badge */}
        {isOpen && (
          <div className="relative">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${theme === 'dark'
              ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/50'
              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
              <div className={`w-1.5 h-1.5 rounded-full mr-2 animate-pulse ${theme === 'dark' ? 'bg-emerald-300' : 'bg-emerald-500'
                }`}></div>
              Open
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className={`text-sm leading-relaxed mb-6 line-clamp-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
        {description}
      </p>

      {/* Job Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}>
          <div className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
            Experience
          </div>
          <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
            }`}>
            {experienceLevel}
          </div>
        </div>

        <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}>
          <div className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
            Work Type
          </div>
          <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
            }`}>
            {Type}
          </div>
        </div>

        <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}>
          <div className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
            Location
          </div>
          <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
            }`}>
            {place}
          </div>
        </div>

        <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border border-emerald-700/30' : 'bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200'
          }`}>
          <div className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'
            }`}>
            Salary
          </div>
          <div className={`text-sm font-bold ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'
            }`}>
            {formatSalary(salary)}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
          <div className={`text-xs font-medium mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
            Required Skills
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className={`text-xs px-3 py-1.5 rounded-full font-medium ${theme === 'dark'
                  ? 'bg-blue-900/30 text-blue-300 border border-blue-700/50'
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
              >
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className={`text-xs px-3 py-1.5 rounded-full ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                +{skills.length - 4}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-opacity-20 border-gray-400">
        <div className="flex items-center space-x-2">
          <svg className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            {formatDate(createdAt)}
          </span>
        </div>

        {/* Bookmark Button */}
        <button className={`p-2 rounded-lg transition-all duration-200 ${theme === 'dark'
          ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300'
          : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
          }`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <Button
          onClick={handleApply}
          className="flex-1 group-hover:scale-[1.02] transition-transform duration-200">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Apply Now
        </Button>
        <button className={`px-4 py-2 rounded-lg border transition-all duration-200 ${theme === 'dark'
          ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
          : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400'
          }`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CardForJob;
