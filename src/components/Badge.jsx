import React from 'react';

const Badge = ({
  children,
  className = '',
  variant = 'solid',
  color = 'default',
  size = 'md',
  ...props
}) => {
  // Classes de taille
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  // Variants
  const badgeVariants = {
    solid: 'border-transparent',
    outline: 'bg-transparent border',
  };

  // Couleurs
  const badgeColors = {
    default: {
      solid: 'bg-gray-100 text-gray-900',
      outline: 'border-gray-300 text-gray-700',
    },
    primary: {
      solid: 'bg-blue-100 text-blue-900',
      outline: 'border-blue-300 text-blue-700',
    },
    secondary: {
      solid: 'bg-gray-100 text-gray-900',
      outline: 'border-gray-300 text-gray-700',
    },
    success: {
      solid: 'bg-green-100 text-green-900',
      outline: 'border-green-300 text-green-700',
    },
    warning: {
      solid: 'bg-yellow-100 text-yellow-900',
      outline: 'border-yellow-300 text-yellow-700',
    },
    error: {
      solid: 'bg-red-100 text-red-900',
      outline: 'border-red-300 text-red-700',
    },
    white: {
      solid: 'bg-white text-gray-900',
      outline: 'border-gray-200 text-gray-700 bg-transparent',
    },
  };

  // Classes de base
  const baseClasses = 'inline-flex items-center font-medium rounded-full';

  return (
    <span
      className={`
        ${baseClasses}
        ${badgeVariants[variant]}
        ${badgeColors[color][variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;