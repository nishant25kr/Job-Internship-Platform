import React from "react";

const Inputt = React.forwardRef(function Inputt(
    { label, type = 'text', className = "", ...props },
    ref
) {
    return (
        <div className="w-full flex">
            {label && (
                <label className="inline-block m-3 pl-1" >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}

            />
        </div>
    );

})

export default Inputt;