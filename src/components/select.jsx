import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';

// Context pour gérer l'état du Select
const SelectContext = createContext();

const Select = ({ children, value, onValueChange, required, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const contextValue = {
    value,
    onValueChange,
    isOpen,
    setIsOpen,
    required,
    disabled
  };

  return (
    <SelectContext.Provider value={contextValue}>
      <div className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within a Select');
  }
  return context;
};

// Trigger du Select
const SelectTrigger = ({ children, className = '' }) => {
  const { isOpen, setIsOpen, disabled } = useSelect();
  const triggerRef = useRef(null);

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={() => !disabled && setIsOpen(!isOpen)}
      disabled={disabled}
      className={`
        w-full flex items-center justify-between px-3 py-2 text-left
        border border-gray-300 rounded-md bg-white
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition-all duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gray-400'}
        ${className}
      `}
    >
      {children}
      <ChevronDownIcon 
        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
          isOpen ? 'transform rotate-180' : ''
        }`}
      />
    </button>
  );
};

// Valeur affichée du Select
const SelectValue = ({ placeholder }) => {
  const { value } = useSelect();
  
  return (
    <span className={`${!value ? 'text-gray-500' : 'text-gray-900'}`}>
      {value ? value : placeholder}
    </span>
  );
};

// Contenu du Select (dropdown)
const SelectContent = ({ children, className = '' }) => {
  const { isOpen, setIsOpen } = useSelect();
  const contentRef = useRef(null);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={contentRef}
      className={`
        absolute top-full left-0 right-0 z-50 mt-1
        bg-white border border-gray-200 rounded-md shadow-lg
        max-h-60 overflow-auto
        animate-in fade-in-0 zoom-in-95
        ${className}
      `}
    >
      <div className="py-1">
        {children}
      </div>
    </div>
  );
};

// Item du Select
const SelectItem = ({ children, value, disabled = false }) => {
  const { value: selectedValue, onValueChange, setIsOpen } = useSelect();
  const isSelected = selectedValue === value;

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
      className={`
        w-full flex items-center justify-between px-3 py-2 text-left
        transition-colors duration-150
        ${isSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        focus:outline-none focus:bg-blue-50
      `}
    >
      <span>{children}</span>
      {isSelected && (
        <CheckIcon className="w-4 h-4 text-blue-600" />
      )}
    </button>
  );
};

// Exporter tous les composants
export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
};