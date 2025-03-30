// src/components/common/SearchBar.jsx
import React, { useState, useRef, useEffect } from 'react';

const SearchBar = ({ 
  onSearch, 
  placeholder = 'Search products...',
  initialValue = '',
  autoFocus = false,
  className = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(autoFocus);
  const inputRef = useRef(null);
  
  // Set focus on input if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  
  // Handle search term change
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  // Handle clear search
  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
    
    // Focus input after clearing
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg 
              className="w-5 h-5 text-gray-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          
          {/* Search Input */}
          <input
            ref={inputRef}
            type="text"
            className={`
              block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${isFocused ? 'bg-white' : 'bg-gray-50'}
              transition-colors duration-200
            `}
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          
          {/* Clear Button (only visible when input has text) */}
          {searchTerm && (
            <button
              type="button"
              className="absolute inset-y-0 right-10 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <svg 
                className="w-5 h-5" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                  clipRule="evenodd" 
                />
              </svg>
            </button>
          )}
          
          {/* Search Button */}
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center px-3 text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:outline-none"
            aria-label="Search"
          >
            <svg 
              className="w-5 h-5" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;