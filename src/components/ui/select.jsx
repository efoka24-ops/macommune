import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const SelectContext = createContext();

export const Select = ({ children, value, onValueChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen, disabled }}>
      <div className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger = ({ children, className = '' }) => {
  const { isOpen, setIsOpen, disabled } = useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={() => !disabled && setIsOpen(!isOpen)}
      disabled={disabled}
      className={`w-full flex items-center justify-between px-3 py-2 text-left border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gray-400'} ${className}`}
    >
      {children}
      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
};

export const SelectValue = ({ placeholder }) => {
  const { value } = useContext(SelectContext);
  return (
    <span className={!value ? 'text-gray-400' : 'text-gray-900'}>
      {value || placeholder}
    </span>
  );
};

export const SelectContent = ({ children, className = '' }) => {
  const { isOpen, setIsOpen } = useContext(SelectContext);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div ref={ref} className={`absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto py-1 ${className}`}>
      {children}
    </div>
  );
};

export const SelectItem = ({ children, value, disabled = false }) => {
  const { value: selected, onValueChange, setIsOpen } = useContext(SelectContext);
  const isSelected = selected === value;

  const handleSelect = () => {
    if (!disabled) {
      onValueChange(value);
      setIsOpen(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSelect}
      disabled={disabled}
      className={`w-full flex items-center justify-between px-3 py-2 text-left transition-colors ${isSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span>{children}</span>
      {isSelected && <Check className="w-4 h-4 text-blue-600" />}
    </button>
  );
};
