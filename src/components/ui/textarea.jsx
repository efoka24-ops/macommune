import React from 'react';

export const Textarea = React.forwardRef(({
  className = '',
  ...props
}, ref) => {
  return (
    <textarea
      ref={ref}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed resize-y transition-colors ${className}`}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';
