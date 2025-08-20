import axios from "axios";
import { AnimatedTestimonialsDemo } from "./AnimatedTestimonialsDemo";
import { fetchingStart, fetchingSuccess, fetchingFailed } from "../../features/JobAuthSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "./Hero";
import CardForJob from "./CardForJob";
import LoadingSpinner from "../LoadingSpinner";
import Button from "../Button";


export default function Home() {
  const dispatch = useDispatch();
  const { jobs, jobLoading, jobError } = useSelector((state) => state.job);
    const { user } = useSelector((state) => state.auth);
  
  const { theme } = useSelector((state) => state.theme);
  const [isScrolled, setIsScrolled] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      console.log(window.scrollY.length)
      // if(window.scrollY > 500 && !user){
      //   alert('please login')
      // }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])



  useEffect(() => {
    const fetchJobs = async () => {
      try {
        dispatch(fetchingStart());
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/jobs/getall-jobs`
        );
        dispatch(fetchingSuccess(response.data.data));
      } catch (err) {
        console.error("Error fetching jobs:", err);
        dispatch(fetchingFailed(err.response?.data?.message || err.message));
      }
    };

    fetchJobs();
  }, [dispatch]);

  // Error Component
  const ErrorState = ({ error, onRetry }) => (
    <div className="flex items-center justify-center py-20">
      <div className="text-center max-w-md">
        <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-red-900/20' : 'bg-red-100'
          }`}>
          <svg className={`w-12 h-12 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
          }`}>
          Oops! Something went wrong
        </h3>
        <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
          {error}
        </p>
        <button
          onClick={onRetry}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${theme === 'dark'
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
        >
          Try Again
        </button>
      </div>
    </div>
  );

  // Empty State Component
  const EmptyState = () => (
    <div className="flex items-center justify-center py-20">
      <div className="text-center max-w-md">
        <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
          <svg className={`w-12 h-12 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
          </svg>
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
          }`}>
          No Jobs Available
        </h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
          We couldn't find any job openings at the moment. Check back later!
        </p>
      </div>
    </div>
  );

  // Retry function
  const handleRetry = () => {
    dispatch(fetchingStart());
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/getall-jobs`)
      .then((response) => {
        dispatch(fetchingSuccess(response.data.data));
      })
      .catch((err) => {
        dispatch(fetchingFailed(err.response?.data?.message || err.message));
      });
  };

  return (
    <div className={`${theme === "dark"
      ? `border-gray-700/50 ${isScrolled ? ' shadow-2xl shadow-purple-500/10 border-0 m-3' : 'border-2 m-3 bg-gray-900/50'}`
      : `border-gray-300/50 ${isScrolled ? ' shadow-2xl shadow-blue-500/10 border-0 m-3' : 'border-2 m-3 bg-white/50'}`
      } min-h-screen  rounded-3xl transition-all duration-300 overflow-hidden`}>

      {/* Hero Section */}
      <Hero />

      {/* Jobs Section */}
      <section className="px-6 py-6">
        {jobLoading ? (
          <LoadingSpinner />
        ) : jobError ? (
          <ErrorState error={jobError} onRetry={handleRetry} />
        ) : jobs && jobs.length > 0 ? (
          <div className="max-w-9xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                Latest Job Opportunities
              </h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                Discover {jobs.length} amazing career opportunities
              </p>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {jobs.map((job) => (
                <div key={job._id} className="flex justify-center">
                  <CardForJob jobData={job} />
                </div>
              ))}
            </div>

            {/* View More Button */}
            {jobs.length > 8 && (
              <div className="text-center mt-12">

                <Button>
                  View All Jobs
                </Button>
              </div>
            )}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>


    </div>
  );
}
