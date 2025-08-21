import { useSelector } from "react-redux";
import { useState } from "react";

function ProfileAbout() {
    const { user } = useSelector((state) => state.auth);
    const { theme } = useSelector((state) => state.theme);
    const [isEditing, setIsEditing] = useState(false);
    const [editedBio, setEditedBio] = useState('');
    
    const isDark = theme === 'dark';
    
    const containerClasses = `row-span-2 w-full h-full border rounded-lg p-6 ${
        isDark 
            ? 'border-gray-700 bg-gray-800 text-white' 
            : 'border-gray-200 bg-white text-gray-900'
    }`;
    
    const sectionClasses = `p-4 rounded-lg mb-4 ${
        isDark ? 'bg-gray-700' : 'bg-gray-50'
    }`;
    
    const labelClasses = `text-sm font-medium mb-2 ${
        isDark ? 'text-gray-300' : 'text-gray-700'
    }`;
    
    const valueClasses = `${
        isDark ? 'text-gray-100' : 'text-gray-900'
    }`;
    
    const emptyStateClasses = `text-sm italic ${
        isDark ? 'text-gray-400' : 'text-gray-500'
    }`;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleSaveBio = () => {
        // Add your save bio logic here (API call, Redux action, etc.)
        console.log('Saving bio:', editedBio);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedBio('');
        setIsEditing(false);
    };

    return (
        <div className={containerClasses}>
            <div className="h-full overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Profile Details</h3>
                    <button 
                        className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                            isDark 
                                ? 'text-blue-400 hover:bg-blue-900/20' 
                                : 'text-blue-600 hover:bg-blue-50'
                        }`}
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        {isEditing ? 'Cancel' : 'Add Bio'}
                    </button>
                </div>

                {/* Bio/Description Section */}
                <div className={sectionClasses}>
                    <div className={labelClasses}>About Me</div>
                    {isEditing ? (
                        <div className="space-y-3">
                            <textarea
                                value={editedBio}
                                onChange={(e) => setEditedBio(e.target.value)}
                                placeholder="Tell us about yourself..."
                                rows={4}
                                className={`w-full p-3 rounded-lg border resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    isDark 
                                        ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                }`}
                            />
                            <div className="flex space-x-2">
                                <button 
                                    onClick={handleSaveBio}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Save Bio
                                </button>
                                <button 
                                    onClick={handleCancelEdit}
                                    className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                                        isDark 
                                            ? 'text-gray-300 hover:bg-gray-600' 
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={valueClasses}>
                            <p className={emptyStateClasses}>
                                No bio added yet. Click "Add Bio" to share something about yourself.
                            </p>
                        </div>
                    )}
                </div>

                {/* Available User Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Basic Information */}
                    <div className={sectionClasses}>
                        <div className={labelClasses}>Basic Information</div>
                        <div className="space-y-3">
                            <div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Full Name</span>
                                <p className={valueClasses}>{user?.fullname || 'Not provided'}</p>
                            </div>
                            <div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Username</span>
                                <p className={valueClasses}>@{user?.username || 'Not provided'}</p>
                            </div>
                            <div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</span>
                                <p className={valueClasses}>{user?.email || 'Not provided'}</p>
                            </div>
                            <div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">User Type</span>
                                <p className={valueClasses}>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        user?.userType === 'Admin' 
                                            ? 'bg-purple-100 text-purple-800'
                                            : 'bg-blue-100 text-blue-800'
                                    }`}>
                                        {user?.userType || 'User'}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Account Information */}
                    <div className={sectionClasses}>
                        <div className={labelClasses}>Account Information</div>
                        <div className="space-y-3">
                            <div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Member Since</span>
                                <p className={valueClasses}>
                                    {user?.createdAt 
                                        ? formatDate(user.createdAt)
                                        : 'Not available'
                                    }
                                </p>
                            </div>
                            <div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Last Updated</span>
                                <p className={valueClasses}>
                                    {user?.updatedAt 
                                        ? formatDate(user.updatedAt)
                                        : 'Not available'
                                    }
                                </p>
                            </div>
                            <div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Account Status</span>
                                <p className={valueClasses}>
                                    <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                        <div className="w-2 h-2 rounded-full mr-1 bg-green-400"></div>
                                        Active
                                    </span>
                                </p>
                            </div>
                            <div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">User ID</span>
                                <p className={`text-xs font-mono ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {user?._id || 'Not available'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Placeholder for Future Features */}
                <div className={sectionClasses}>
                    <div className={labelClasses}>Additional Information</div>
                    <div className="text-center py-8">
                        <svg className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <p className={emptyStateClasses}>
                            More profile information will be available as you complete your profile.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileAbout;
