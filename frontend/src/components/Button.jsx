import { useSelector } from "react-redux";


function Button({
    children,
    type = 'button',
    disabled = false,
    className = "",
    ...props
}) {
    const {theme} = useSelector((state)=>state.theme)
    return (
        <button
            type={type}
            disabled={disabled}
            className={`
  group relative inline-flex items-center justify-center mx-4 px-7 py-2
  ${theme === 'light' 
    ? 'bg-gradient-to-r from-slate-300 via-purple-300 to-indigo-300 hover:from-slate-400 hover:via-purple-400 hover:to-indigo-400 text-gray-800 border-gray-300/50 hover:shadow-purple-200/25' 
    : 'bg-gradient-to-r from-slate-800 via-purple-900 to-indigo-900 hover:from-slate-800 hover:via-purple-800 hover:to-indigo-800 text-white border-white/20 hover:shadow-purple-500/25'
  }
  font-semibold text-base rounded-2xl
  transition-all duration-300 ease-out transform
  hover:scale-105 hover:-translate-y-0.5
  focus:outline-none focus:ring-4 focus:ring-purple-500/50
  active:scale-95 active:translate-y-0
  disabled:opacity-60 disabled:cursor-not-allowed 
  disabled:hover:scale-100 disabled:hover:translate-y-0
  shadow-lg hover:shadow-2xl
  border overflow-hidden
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
