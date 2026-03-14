import React from 'react';

const badgeVariants = {
  default: 'bg-blue-100 text-blue-800 border-transparent',
  secondary: 'bg-gray-100 text-gray-800 border-transparent',
  destructive: 'bg-red-100 text-red-800 border-transparent',
  outline: 'bg-transparent border-gray-300 text-gray-700',
};

export const Badge = ({ children, className = '', variant = 'default', ...props }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeVariants[variant] || badgeVariants.default} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
