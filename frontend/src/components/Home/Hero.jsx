import React from 'react'
import { useSelector } from "react-redux";
import Button from '../Button';

function Hero() {
  const { theme } = useSelector((state) => state.theme);
  
  return (
    <section className="relative transition-all duration-300 flex items-center justify-center px-4 py-20 min-h-screen overflow-hidden">
      
      <div className="relative max-w-6xl mx-auto text-center space-y-12">
        
        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className={`
            text-5xl sm:text-4xl md:text-7xl lg:text-8xl xl:text-9xl
            font-black leading-[0.9] tracking-tight
            ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
          `}>
            Easy and fast way
            <br />
            for you to get your{" "}
            <span className={`
              relative inline-block
              ${theme === "dark"
                ? "bg-gradient-to-r from-slate-800 via-purple-800 to-indigo-900"
                : "bg-gradient-to-r from-slate-400 via-purple-400 to-indigo-400"
              } 
              bg-clip-text text-transparent
            `}>
              Dream
              {/* Underline decoration */}
              <div className={`absolute -bottom-2 left-0 right-0 h-1 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-slate-800 via-purple-800 to-indigo-900' 
                  : 'bg-gradient-to-r from-slate-400 via-purple-400 to-indigo-400'
              } opacity-30 rounded-full`}></div>
            </span>{" "}
            Job
          </h1>
        </div>

        {/* Subtitle with enhanced typography */}
        <p className={`
          text-xl sm:text-2xl md:text-3xl lg:text-4xl 
          font-light max-w-4xl mx-auto leading-relaxed
          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
        `}>
          Discover <span className={`font-semibold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>thousands</span> of job opportunities with all the information you need
        </p>

        {/* Enhanced Search Bar */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className={`
            relative p-2 rounded-3xl border-2 transition-all duration-300
            hover:shadow-2xl backdrop-blur-sm
            ${theme === 'dark' 
              ? 'border-gray-600 hover:border-purple-500' 
              : 'border-gray-300 hover:border-purple-400'
            }
          `}>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className={`
                    w-full pl-12 pr-4 py-4 rounded-2xl border-0 outline-none text-lg
                    focus:ring-2 focus:ring-purple-500/50 transition-all
                    ${theme === 'dark' 
                      ? 'bg-gray-800/50 text-white placeholder-gray-400' 
                      : 'bg-white text-gray-900 placeholder-gray-500'
                    }
                  `}
                />
              </div>
              
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Location"
                  className={`
                    w-full pl-12 pr-4 py-4 rounded-2xl border-0 outline-none text-lg
                    focus:ring-2 focus:ring-purple-500/50 transition-all
                    ${theme === 'dark' 
                      ? 'bg-gray-800/50 text-white placeholder-gray-400' 
                      : 'bg-white text-gray-900 placeholder-gray-500'
                    }
                  `}
                />
              </div>
              
              <Button>
                Search
              </Button>
            </div>
          </div>
        </div>

        

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12">
          <button className={`
            px-8 py-4 border-2 rounded-full text-lg font-semibold
            transition-all duration-300 transform hover:scale-105
            ${theme === 'dark'
              ? 'border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-400'
              : 'border-gray-400 text-gray-700 hover:border-purple-500 hover:text-purple-600'
            }
          `}>
            Post a Job
          </button>
          
          <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            or
          </div>
          
          <button className={`
            px-8 py-4 border-2 rounded-full text-lg font-semibold
            transition-all duration-300 transform hover:scale-105
            ${theme === 'dark'
              ? 'border-purple-400 text-purple-400 hover:bg-purple-400/10'
              : 'border-purple-500 text-purple-600 hover:bg-purple-50'
            }
          `}>
            Browse Categories
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
