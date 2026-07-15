import { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  type = 'text', 
  error, 
  className = '', 
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={props.id} 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`
          w-full px-4 py-3 
          border border-gray-300 rounded-lg
          focus:ring-2 focus:ring-gray-900 focus:border-transparent
          focus:outline-none
          transition-all duration-200
          placeholder-gray-400
          ${error ? 'border-red-500 focus:ring-red-500' : 'hover:border-gray-400'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
