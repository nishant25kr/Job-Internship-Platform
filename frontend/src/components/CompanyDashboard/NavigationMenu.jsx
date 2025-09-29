import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function NavigationMenu() {
  const { company } = useSelector((state) => state.companyauth)
  const { theme } = useSelector((state) => state.theme)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Dynamic classes based on theme
  const isDark = theme === 'dark';

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const containerClasses = `w-full lg:min-h-[85vh] ${isDark ? 'text-white' : 'text-black'}`;
  const sidebarClasses = ` rounded-lg p-4 lg:p-6  h-full `;
  const avatarBorderClasses = `w-16 h-16 lg:w-24 lg:h-24 rounded-full mx-auto object-cover border-4 ${isDark ? 'border-gray-600' : 'border-gray-100'
    }`;
  const statusIndicatorClasses = `absolute bottom-0 right-0 w-4 h-4 lg:w-6 lg:h-6 bg-green-500 rounded-full border-2 ${isDark ? 'border-gray-800' : 'border-white'
    }`;
  const linkHoverClasses = `flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
    }`;
  const headingClasses = `text-xs font-semibold uppercase tracking-wide mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'
    }`;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleProfileClick = (e) => {
    if (isMobile) {
      e.preventDefault()

      // Find the about section and scroll to it
      const aboutSection = document.getElementById('about-section')
      if (aboutSection) {
        aboutSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      } else {
        // If about section doesn't exist, navigate to about route
        window.location.href = '/profile/about'
      }
      closeMenu()
    }
  }

  return (
    <div className={containerClasses}>
      <div className={sidebarClasses}>
        {/* Mobile Header with Hamburger */}
        <div className="lg:hidden flex justify-between items-center ">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={company?.avatar || '/default-avatar.png'}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
            </div>
            <div>
              <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {company?.name || 'Company Name'}
              </h3>
            </div>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Profile Section */}
        <div className="hidden lg:block text-center mb-6">
          <div className="relative inline-block mb-4">
            <img
              src={company?.avatar || '/default-avatar.png'}
              alt="Profile"
              className={avatarBorderClasses}
            />
            <div className={statusIndicatorClasses}></div>
          </div>
          <h2 className={`text-xl font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {company?.name || 'Company Name'}
          </h2>

        </div>

        {/* Navigation Menu - Hidden on mobile unless menu is open */}
        <nav className={`mb-6 ${isMobile && !isMenuOpen ? 'hidden' : 'block'}`}>
          <ul className="space-y-2">
            <li>
              <Link
                to="about"
                className={linkHoverClasses}
                onClick={handleProfileClick}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="applied-job"
                className={linkHoverClasses}
                onClick={closeMenu}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                Registered Companies
              </Link>
            </li>
            <li>
              <Link
                to="edit-profile"
                className={linkHoverClasses}
                onClick={closeMenu}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Edit Profile
              </Link>
            </li>
            <li>
              <Link
                to="change-password"
                className={linkHoverClasses}
                onClick={closeMenu}
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3" />
                </svg>
                Change Password

              </Link>
            </li>
          </ul>
        </nav>

        {/* Quick Actions - Hidden on mobile unless menu is open */}
        <div className={`mb-6 ${isMobile && !isMenuOpen ? 'hidden' : 'block'}`}>
          <h3 className={headingClasses}>Quick Actions</h3>
          <div className="space-y-2">
            <button
              className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${isDark
                ? 'text-blue-400 hover:bg-blue-900/20'
                : 'text-blue-600 hover:bg-blue-50'
                }`}
              onClick={closeMenu}
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>
            <button
              className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${isDark
                ? 'text-gray-300 hover:bg-gray-700'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
              onClick={closeMenu}
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </button>
            <button
              className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${isDark
                ? 'text-green-400 hover:bg-green-900/20'
                : 'text-green-600 hover:bg-green-50'
                }`}
              onClick={closeMenu}
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share Profile
            </button>
          </div>
        </div>

        {/* Social Links - Hidden on mobile unless menu is open */}
        <div className={`${isMobile && !isMenuOpen ? 'hidden' : 'block'}`}>
          <h3 className={headingClasses}>Connect</h3>
          <div className="flex space-x-3 justify-center lg:justify-start">
            <a
              href={company?.social?.twitter || '#'}
              className={`p-2 transition-colors ${isDark
                ? 'text-gray-400 hover:text-blue-400'
                : 'text-gray-400 hover:text-blue-500'
                }`}
              onClick={closeMenu}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a
              href={company?.social?.linkedin || '#'}
              className={`p-2 transition-colors ${isDark
                ? 'text-gray-400 hover:text-blue-400'
                : 'text-gray-400 hover:text-blue-700'
                }`}
              onClick={closeMenu}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={company?.social?.github || '#'}
              className={`p-2 transition-colors ${isDark
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-400 hover:text-gray-900'
                }`}
              onClick={closeMenu}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href={company?.social?.website || '#'}
              className={`p-2 transition-colors ${isDark
                ? 'text-gray-400 hover:text-purple-400'
                : 'text-gray-400 hover:text-purple-600'
                }`}
              onClick={closeMenu}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationMenu;
