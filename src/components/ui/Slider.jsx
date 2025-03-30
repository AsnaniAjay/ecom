// src/components/ui/Slider.jsx
import React, { useState, useEffect, useRef } from 'react';

const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  value = 0,
  onChange,
  showLabels = true,
  showInput = false,
  disabled = false,
  formatLabel = (value) => value,
  className = ''
}) => {
  const [localValue, setLocalValue] = useState(value);
  const sliderRef = useRef(null);
  
  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  
  // Handle slider change
  const handleSliderChange = (e) => {
    const newValue = Number(e.target.value);
    setLocalValue(newValue);
    onChange && onChange(newValue);
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    
    // Allow for empty input
    if (inputValue === '') {
      setLocalValue('');
      return;
    }
    
    const newValue = Number(inputValue);
    
    // Check if input is a valid number
    if (!isNaN(newValue)) {
      // Constrain the value to min/max range
      const constrainedValue = Math.min(Math.max(newValue, min), max);
      setLocalValue(constrainedValue);
      onChange && onChange(constrainedValue);
    }
  };
  
  // Handle blur event for input
  const handleBlur = () => {
    // If value is empty, reset to min
    if (localValue === '') {
      setLocalValue(min);
      onChange && onChange(min);
    }
  };
  
  // Calculate percentage for the slider position and track width
  const calculatePercentage = () => {
    return ((localValue - min) / (max - min)) * 100;
  };

  return (
    <div className={`${className}`}>
      {/* Slider Labels */}
      {showLabels && (
        <div className="flex justify-between text-xs text-gray-600 mb-2">
          <span>{formatLabel(min)}</span>
          <span>{formatLabel(max)}</span>
        </div>
      )}
      
      {/* Slider Track and Thumb */}
      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-2 bg-blue-600 rounded-full"
            style={{ width: `${calculatePercentage()}%` }}
          ></div>
        </div>
        <input
          ref={sliderRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue}
          onChange={handleSliderChange}
          disabled={disabled}
          className={`
            absolute top-0 left-0 w-full h-2 appearance-none bg-transparent pointer-events-auto
            ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          `}
          style={{
            // Custom styles for the range input thumb
            WebkitAppearance: 'none',
            zIndex: 3
          }}
        />
      </div>
      
      {/* Value Input */}
      {showInput && (
        <div className="mt-4">
          <input
            type="text"
            value={localValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            disabled={disabled}
            className={`
              w-full px-2 py-1 border border-gray-300 rounded-md text-sm text-gray-900 
              focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            `}
          />
        </div>
      )}
      
      {/* Style for range input thumb */}
      <style jsx="true">{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #2563eb;
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        
        input[type=range]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #2563eb;
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default Slider;