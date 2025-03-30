// src/components/common/QuantitySelector.jsx
import React from 'react';

const QuantitySelector = ({ quantity, maxQuantity, onChange, size = 'md' }) => {
  // Define size classes
  const sizeClasses = {
    sm: {
      container: 'w-24',
      button: 'w-6 h-6 text-xs',
      input: 'w-10 text-xs'
    },
    md: {
      container: 'w-32',
      button: 'w-8 h-8',
      input: 'w-14'
    },
    lg: {
      container: 'w-40',
      button: 'w-10 h-10 text-lg',
      input: 'w-16'
    }
  };
  
  // Get classes based on size
  const classes = sizeClasses[size] || sizeClasses.md;
  
  // Handle increment and decrement
  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      onChange(quantity + 1);
    }
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };
  
  // Handle direct input change
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      onChange(value);
    }
  };

  return (
    <div className={`flex items-center border border-gray-300 rounded-md ${classes.container}`}>
      <button
        type="button"
        className={`flex-shrink-0 ${classes.button} bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center rounded-l-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={handleDecrement}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <span>-</span>
      </button>
      
      <input
        type="number"
        min="1"
        max={maxQuantity}
        value={quantity}
        onChange={handleInputChange}
        className={`${classes.input} py-1 text-center border-0 focus:outline-none focus:ring-0`}
        aria-label="Quantity"
      />
      
      <button
        type="button"
        className={`flex-shrink-0 ${classes.button} bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center rounded-r-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={handleIncrement}
        disabled={quantity >= maxQuantity}
        aria-label="Increase quantity"
      >
        <span>+</span>
      </button>
    </div>
  );
};

export default QuantitySelector;