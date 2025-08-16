import React, { useEffect } from 'react';
import { changetheme } from '../features/ThemeSlice';
import { useDispatch, useSelector } from 'react-redux';

function ThemeIcon() {
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);

    useEffect(() => {
        const htmlEl = document.documentElement;
        htmlEl.classList.remove("light", "dark");
        htmlEl.classList.add(theme);
    }, [theme]); 

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        console.log(newTheme)
        
        dispatch(changetheme(newTheme));
    };

    return (
        <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 
                       dark:bg-gray-800 dark:hover:bg-gray-700 
                       flex items-center justify-center 
                       transition-all duration-300 hover:scale-110 
                       active:scale-95 shadow-md hover:shadow-lg"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <span className="text-xl">
                {theme === 'dark' ? '☀️' : '🌙'}
            </span>
        </button>
    );
}

export default ThemeIcon;
