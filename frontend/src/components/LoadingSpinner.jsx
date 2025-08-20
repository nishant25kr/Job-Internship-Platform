import React from 'react'
import { useSelector } from 'react-redux'

function LoadingSpinner() {
    const {theme} = useSelector((state)=>state.theme)
    return (

        <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center space-y-4">
                <div className={`animate-spin rounded-full h-16 w-16 border-4 border-t-transparent ${theme === 'dark'
                    ? 'border-blue-400'
                    : 'border-blue-600'
                    }`}></div>
                <p className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                    Loading amazing opportunities...
                </p>
            </div>
        </div>

    )
}

export default LoadingSpinner
