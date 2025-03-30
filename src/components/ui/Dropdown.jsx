// src/components/ui/Dropdown.jsx
import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({
  trigger,
  items,
  align = 'right',
  width = 'w-48',
  onSelect,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  // Handle item selection
  const handleSelect = (item) => {
    onSelect && onSelect(item);
    setIsOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Alignment styles
  const alignmentStyles = {
    left: 'left-0',
    right: 'right-0'
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <div onClick={toggleDropdown}>
        {typeof trigger === 'function' ? trigger({ isOpen }) : trigger}
      </div>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className={`
            origin-top-${align} absolute ${alignmentStyles[align]} mt-2 ${width}
            rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50
          `}
        >
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === 'divider' ? (
                  <div className="h-px bg-gray-200 my-1"></div>
                ) : item.type === 'header' ? (
                  <div className="px-4 py-2 text-xs text-gray-500 uppercase font-semibold">
                    {item.label}
                  </div>
                ) : (
                  <button
                    onClick={() => handleSelect(item)}
                    className={`
                      ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:text-gray-900'}
                      block w-full text-left px-4 py-2 text-sm text-gray-700
                    `}
                    role="menuitem"
                    disabled={item.disabled}
                  >
                    {item.icon && (
                      <span className="mr-2">{item.icon}</span>
                    )}
                    {item.label}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;