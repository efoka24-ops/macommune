    // src/components/Button.jsx
    import React from 'react';

    const Button = ({ children, onClick, className = '', ...props }) => {
      const baseStyles = 'px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-75';
      const defaultStyles = 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500';

      return (
        <button
          onClick={onClick}
          className={`${baseStyles} ${defaultStyles} ${className}`}
          {...props}
        >
          {children}
        </button>
      );
    };

    export default Button;