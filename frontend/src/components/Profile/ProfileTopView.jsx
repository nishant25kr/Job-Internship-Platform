import { useSelector } from "react-redux";

function ProfileTopSection() {
    const { user } = useSelector((state) => state.auth);
    const { theme } = useSelector((state) => state.theme);
    
    const isDark = theme === 'dark';
    
    const containerClasses = `row-span-1 h-full w-full border rounded-lg p-4 md:p-6 ${
        isDark 
            ? 'border-gray-700 text-white' 
            : 'border-gray-200 text-gray-900'
    }`;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getAccountAge = (createdAt) => {
        const created = new Date(createdAt);
        const now = new Date();
        const diffTime = Math.abs(now - created);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 30) {
            return `${diffDays} days`;
        } else if (diffDays < 365) {
            return `${Math.floor(diffDays / 30)} months`;
        } else {
            return `${Math.floor(diffDays / 365)} years`;
        }
    };

    return (
        <div className={containerClasses}>
            <div className=" flex flex-col">
                {/* Header with User Type Badge */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4 md:mb-6">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 md:mb-2 truncate">
                            Welcome back, {user?.fullname?.split(' ')[0] || 'User'}!
                        </h3>
                        <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Here's your profile overview
                        </p>
                    </div>
                    <div className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium border-2 self-start sm:self-center ${
                        user?.userType === 'Admin' 
                            ? isDark 
                                ? 'border-purple-500 text-purple-400' 
                                : 'border-purple-500 text-purple-600'
                            : isDark 
                                ? 'border-blue-500 text-blue-400' 
                                : 'border-blue-500 text-blue-600'
                    }`}>
                        {user?.userType || 'User'}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Profile Summary Card */}
                    <div className={`lg:col-span-2 border rounded-lg md:rounded-xl p-4 md:p-6 ${
                        isDark ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 mb-4">
                            <h4 className={`text-base md:text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Account Details
                            </h4>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                                <span className={`text-xs sm:text-sm ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                                    Active
                                </span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                            <div className="space-y-3 md:space-y-4">
                                <div className="flex items-start xs:items-center space-x-3">
                                    <div className={`p-1.5 md:p-2 rounded-lg flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Full Name</p>
                                        <p className={`font-medium text-sm md:text-base truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {user?.fullname || 'Not provided'}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start xs:items-center space-x-3">
                                    <div className={`p-1.5 md:p-2 rounded-lg flex-shrink-0 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                                        <p className={`font-medium text-sm md:text-base truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {user?.email || 'Not provided'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-3 md:space-y-4">
                                <div className="flex items-start xs:items-center space-x-3">
                                    <div className={`p-1.5 md:p-2 rounded-lg flex-shrink-0 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Username</p>
                                        <p className={`font-medium text-sm md:text-base truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            @{user?.username || 'username'}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start xs:items-center space-x-3">
                                    <div className={`p-1.5 md:p-2 rounded-lg flex-shrink-0 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Account Type</p>
                                        <p className={`font-medium text-sm md:text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {user?.userType || 'User'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Activity Timeline Card */}
                    <div className={`border rounded-lg md:rounded-xl p-4 md:p-6 ${
                        isDark ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                        <h4 className={`text-base md:text-lg font-semibold mb-3 md:mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Account Timeline
                        </h4>
                        
                        <div className="space-y-3 md:space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full mt-1 md:mt-2 flex-shrink-0 ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
                                <div className="min-w-0 flex-1">
                                    <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Account Created
                                    </p>
                                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} truncate`}>
                                        {user?.createdAt ? formatDate(user.createdAt) : 'Unknown'}
                                    </p>
                                    <p className={`text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                                        {user?.createdAt ? getAccountAge(user.createdAt) + ' ago' : ''}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                                <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full mt-1 md:mt-2 flex-shrink-0 ${isDark ? 'bg-green-400' : 'bg-green-500'}`}></div>
                                <div className="min-w-0 flex-1">
                                    <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Last Updated
                                    </p>
                                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} truncate`}>
                                        {user?.updatedAt ? formatDate(user.updatedAt) : 'Unknown'}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full mt-1 md:mt-2 bg-yellow-500 flex-shrink-0"></div>
                                <div className="min-w-0 flex-1">
                                    <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Status
                                    </p>
                                    <p className={`text-xs ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                                        Active & Online
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats Bar */}
                <div className={`mt-4 md:mt-6 pt-4 md:pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        <div className="text-center">
                            <div className={`text-lg sm:text-xl md:text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                                {user?.createdAt ? getAccountAge(user.createdAt).split(' ')[0] : '0'}
                            </div>
                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {user?.createdAt ? getAccountAge(user.createdAt).split(' ')[1] : 'days'} old
                            </div>
                        </div>
                        <div className="text-center">
                            <div className={`text-lg sm:text-xl md:text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                                100%
                            </div>
                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Profile Setup
                            </div>
                        </div>
                        <div className="text-center">
                            <div className={`text-lg sm:text-xl md:text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                                {user?._id ? user._id.slice(-4).toUpperCase() : 'N/A'}
                            </div>
                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                User ID
                            </div>
                        </div>
                        <div className="text-center">
                            <div className={`text-lg sm:text-xl md:text-2xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                                ✓
                            </div>
                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Verified
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileTopSection;
