function Button({
    children,
    type = 'button',
    disabled = false,
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`
                group relative inline-flex items-center justify-center mt-4 px-7 py-2
                bg-gradient-to-r from-slate-800 via-purple-900 to-indigo-900
                hover:from-slate-800 hover:via-purple-800 hover:to-indigo-800
                text-white font-semibold text-base rounded-2xl
                transition-all duration-300 ease-out transform
                hover:scale-105 hover:-translate-y-0.5
                focus:outline-none focus:ring-4 focus:ring-purple-500/50
                active:scale-95 active:translate-y-0
                disabled:opacity-60 disabled:cursor-not-allowed 
                disabled:hover:scale-100 disabled:hover:translate-y-0
                shadow-lg hover:shadow-2xl hover:shadow-purple-500/25
                border border-white/20
                overflow-hidden
                ${className}
            `}
            {...props}
        >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </button>
    );
}

export default Button;
