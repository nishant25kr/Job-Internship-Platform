import React from "react";
import { useSelector } from "react-redux";

const Inputt = React.forwardRef(function Inputt(
    { label, type = 'text', className = "", ...props },
    ref
) {
    const { theme } = useSelector((state) => state.theme)
    return (
        <div className="w-full flex">
            {label && (
                <label className="inline-block m-3 pl-1" >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={
                    `outline-none bg-gray-100 text-gray-800
                    rounded-lg focus:ring-2 focus:ring-purple-500 
                     transition-all duration-200 border-gray-200 
                     w-full px-4 py-3 border
                     
                     ${className}`}
                ref={ref}
                {...props}

            />
        </div>
    );

})

export default Inputt;