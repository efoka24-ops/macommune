import React from 'react';

const Label = ({
  htmlFor,
  children,
  className = '',
  required = false,
  disabled = false,
  size = 'md',
  ...props
}) => {
  // Classes de taille
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  // Classes de base
  const baseClasses = 'block font-medium text-gray-900 transition-colors duration-200';

  // État disabled
  const stateClasses = disabled ? 'text-gray-500 cursor-not-allowed' : 'cursor-pointer';

  return (
    <label
      htmlFor={htmlFor}
      className={`
        ${baseClasses}
        ${stateClasses}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {children}
      {required && !disabled && (
        <span className="text-red-600 ml-1">*</span>
      )}
    </label>
  );
};

export default Label;