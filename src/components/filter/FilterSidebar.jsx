// src/components/filter/FilterSidebar.jsx
import React, { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';

const FilterSidebar = ({ categories, filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Find min and max prices from the products (would normally come from props)
  const minPrice = 0;
  const maxPrice = 100000;
  
  // Handle category filter change
  const handleCategoryChange = (selectedCategories) => {
    onFilterChange({ categories: selectedCategories });
  };
  
  // Handle price range filter change
  const handlePriceChange = (priceRange) => {
    onFilterChange({ priceRange });
  };
  
  // Handle in-stock filter change
  const handleInStockChange = (e) => {
    onFilterChange({ inStock: e.target.checked });
  };
  
  // Handle ratings filter change
  const handleRatingsChange = (rating) => {
    onFilterChange({ ratings: rating });
  };
  
  // Handle clear all filters
  const handleClearAll = () => {
    onFilterChange({
      categories: [],
      priceRange: { min: minPrice, max: maxPrice },
      inStock: false,
      ratings: 0
    });
  };
  
  // Toggle mobile filter sidebar
  const toggleMobileFilters = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={toggleMobileFilters}
          className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          <span className="font-medium">Filters</span>
          <svg
            className={`h-5 w-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar Content */}
      <div className={`bg-white p-4 rounded-lg shadow-md ${isOpen ? 'block' : 'hidden md:block'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <button
            onClick={handleClearAll}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
          >
            Clear All
          </button>
        </div>

        {/* Categories */}
        <CategoryFilter
          categories={categories}
          selectedCategories={filters.categories}
          onChange={handleCategoryChange}
        />

        {/* Price Range */}
        <PriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          currentRange={filters.priceRange}
          onChange={handlePriceChange}
        />

        {/* In Stock Only */}
        <div className="mb-6">
          <div className="flex items-center">
            <input
              id="in-stock"
              type="checkbox"
              checked={filters.inStock}
              onChange={handleInStockChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="in-stock"
              className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-blue-600"
            >
              In Stock Only
            </label>
          </div>
        </div>

        {/* Ratings */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Ratings</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <input
                  id={`rating-${rating}`}
                  type="radio"
                  checked={filters.ratings === rating}
                  onChange={() => handleRatingsChange(rating)}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="ml-2 text-sm text-gray-700 flex items-center cursor-pointer hover:text-blue-600"
                >
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1">& Up</span>
                </label>
              </div>
            ))}
            <div className="flex items-center">
              <input
                id="rating-all"
                type="radio"
                checked={filters.ratings === 0}
                onChange={() => handleRatingsChange(0)}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="rating-all"
                className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-blue-600"
              >
                Show All
              </label>
            </div>
          </div>
        </div>
        
        {/* Mobile Apply Filters Button */}
        <div className="md:hidden mt-6">
          <button 
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            onClick={toggleMobileFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;