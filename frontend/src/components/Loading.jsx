// loading.jsx
import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[400px] w-full">
      <div className="flex space-x-1 mb-4">
        <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
      <span className="text-gray-600 font-large">Loading...</span>
    </div>
  );
};

export default Loading;
