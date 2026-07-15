const Button = ({ 
  children, 
  loading = false, 
  disabled = false, 
  className = '', 
  ...props 
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`
        w-full
        bg-gray-900
        text-white
        py-3
        px-4
        rounded-lg
        font-medium
        hover:bg-gray-800
        focus:outline-none
        focus:ring-2
        focus:ring-gray-900
        focus:ring-offset-2
        transition-all
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:bg-gray-900
        flex
        items-center
        justify-center
        gap-2
        ${className}
      `}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin h-5 w-5 text-white" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
