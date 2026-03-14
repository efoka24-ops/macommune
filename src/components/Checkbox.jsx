import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

const Checkbox = ({
  id,
  checked = false,
  onCheckedChange,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const handleChange = (event) => {
    if (onCheckedChange) {
      onCheckedChange(event.target.checked);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        className="absolute opacity-0 w-0 h-0"
        {...props}
      />
      
      {/* Checkbox personnalisée */}
      <div
        className={`
          relative flex items-center justify-center
          w-5 h-5 border-2 rounded-md transition-all duration-200
          cursor-pointer
          ${checked 
            ? 'bg-blue-600 border-blue-600' 
            : 'bg-white border-gray-300 hover:border-gray-400'
          }
          ${disabled 
            ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-50' 
            : ''
          }
          ${className}
        `}
      >
        {/* Icône de check */}
        {checked && (
          <CheckIcon className="w-3.5 h-3.5 text-white stroke-[3]" />
        )}
      </div>
    </div>
  );
};

export default Checkbox;