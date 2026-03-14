import React from 'react';

const Input = ({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  label,
  error,
  helperText,
  ...props
}) => {
  // Classes de base
  const baseClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none transition-colors duration-200';

  // États du input
  const stateClasses = 
    disabled 
      ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300' 
      : error 
        ? 'border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500' 
        : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500';

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label 
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input */}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          ${baseClasses}
          ${stateClasses}
          ${className}
        `}
        {...props}
      />

      {/* Message d'erreur */}
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Texte d'aide */}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;