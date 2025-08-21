import React from 'react'
import { useSelector } from 'react-redux'

function EmptyState({error}) {
    const {theme} = useSelector((state)=>state.theme)
    return (
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
                
            </div>
        </div>
    )
}

export default EmptyState
