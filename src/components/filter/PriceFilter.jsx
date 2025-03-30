// src/components/filter/PriceFilter.jsx
import React, { useState, useEffect } from 'react';

const PriceFilter = ({ minPrice = 0, maxPrice = 100000, currentRange = null, onChange }) => {
  // Initialize with default values or from currentRange if provided
  const [localMin, setLocalMin] = useState(currentRange?.min ?? minPrice);
  const [localMax, setLocalMax] = useState(currentRange?.max ?? maxPrice);
  
  // Update local state when props change
  useEffect(() => {
    if (currentRange) {
      setLocalMin(currentRange.min ?? minPrice);
      setLocalMax(currentRange.max ?? maxPrice);
    }
  }, [currentRange, minPrice, maxPrice]);
  
  // Format price to currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  // Handle slider change
  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    setLocalMin(value);
    
    // Ensure min is not greater than max
    if (value <= localMax) {
      onChange({ min: value, max: localMax });
    }
  };
  
  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    setLocalMax(value);
    
    // Ensure max is not less than min
    if (value >= localMin) {
      onChange({ min: localMin, max: value });
    }
  };
  
  // Handle input change
  const handleMinInputChange = (e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ''));
    if (!isNaN(value)) {
      setLocalMin(value);
      
      // Apply the change only if it's valid
      if (value >= minPrice && value <= localMax) {
        onChange({ min: value, max: localMax });
      }
    }
  };
  
  const handleMaxInputChange = (e) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ''));
    if (!isNaN(value)) {
      setLocalMax(value);
      
      // Apply the change only if it's valid
      if (value <= maxPrice && value >= localMin) {
        onChange({ min: localMin, max: value });
      }
    }
  };
  
  // Apply the filter when input loses focus
  const handleBlur = () => {
    // Ensure the values are within bounds
    let validMin = Math.max(minPrice, Math.min(localMin, localMax));
    let validMax = Math.min(maxPrice, Math.max(localMax, localMin));
    
    setLocalMin(validMin);
    setLocalMax(validMax);
    onChange({ min: validMin, max: validMax });
  };
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Price Range</h3>
      
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={formatPrice(localMin)}
          onChange={handleMinInputChange}
          onBlur={handleBlur}
          className="w-24 px-2 py-1 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="mx-2 text-gray-500">to</span>
        <input
          type="text"
          value={formatPrice(localMax)}
          onChange={handleMaxInputChange}
          onBlur={handleBlur}
          className="w-24 px-2 py-1 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="relative pt-1">
        <div className="h-1 bg-gray-200 rounded-full">
          <div
            className="absolute h-1 bg-blue-600 rounded-full"
            style={{
              left: `${((localMin - minPrice) / (maxPrice - minPrice)) * 100}%`,
              width: `${((localMax - localMin) / (maxPrice - minPrice)) * 100}%`
            }}
          ></div>
        </div>
        
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={localMin}
          onChange={handleMinChange}
          className="absolute top-0 h-1 w-full appearance-none bg-transparent pointer-events-none"
          style={{
            // Custom styles for the range input thumb
            WebkitAppearance: 'none',
            zIndex: 3
          }}
        />
        
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={localMax}
          onChange={handleMaxChange}
          className="absolute top-0 h-1 w-full appearance-none bg-transparent pointer-events-none"
          style={{
            // Custom styles for the range input thumb
            WebkitAppearance: 'none',
            zIndex: 4
          }}
        />
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>{formatPrice(minPrice)}</span>
        <span>{formatPrice(maxPrice)}</span>
      </div>
      
      {/* Style for range input thumbs */}
      <style jsx="true">{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          pointer-events: auto;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #2563eb;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        
        input[type=range]::-moz-range-thumb {
          pointer-events: auto;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #2563eb;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default PriceFilter;